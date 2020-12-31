//! Side-effects

//TODO there is a stack overflow error here somewhere, recursive loop?, usually lead by this error: 'no subscriber found for this user'
// when refreshing the playlist page, all the lists will subscribe fine, until at some point unsubscribe is called (for an empty query [ {} ] , or maybe could be anything) upon which no subscriber is called, and the thing goes to a 'RangeError: Maximum call stack size exceeded' error

//TODO this may be unrelated but it seems the liveQueries here are also piling up

//TODO It seems like many subscriptions are being called but not as many un-subscriptions.

//TODO sockets need better error handling just like the koa router


// EXTERNAL
import http from 'http'; //TODO consider changing to the https module?
import fclone from 'fclone';

// INTERNAL
import deepCompare, {compareUnorderedArrays} from '../shared/utility/object/deep-compare.js';
import {
	Entity,
	User,
	Playlist,
	Track,
} from './entities/index.js';
import {
	LiveTable,
	LiveQuery,
	subscriptionParts,
} from '../shared/live-data.js';
import {
	logPropagate,
} from '../shared/propagate.js';
import {
	define,
} from '../shared/utility/index.js';
import {defaultSocketId} from '../shared/entityParts/user.js';
import Warn from '../shared/warn.js';
import {CustomError} from '../shared/errors/index.js';
import serverRegistry from './server-registry.js';

class Subscription {
	constructor(options = {}) {
		subscriptionParts.instance(this, options);

		const {user = null} = options;
		define.writable(this, {user});
	}
}

const liveDataServer = {
	app: null,
	socket: null,
	tables: LiveTable.makeTables({User, Playlist, Track}),

	start({
		app,
		socket: liveDataSocket,
	}) {
		this.app = app;
		this.socket = liveDataSocket;

		this.socket.use((socket, next) => { //! //TODO Use is removed in socket io 3, need to find another work around.
			// Give the cookie session to the socket.
			// Uses a temporary koa context to decrypt the session.
			//L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
			//L https://github.com/koajs/session/issues/53#issuecomment-311601304
			//! //? socket.session is static, whereas koa ctx.session is dynamic, that is I'm not sure that this is linked in any way to the cookie session
			//L https://socket.io/docs/server-api/#namespace-use-fn
			socket.session = this.app.createContext(socket.request, new http.OutgoingMessage()).session;
			next();
		});

		this.socket.on('connect', (socket) => {
			try {
				console.log('CONNECT', socket.id);

				// If user is logged in, give the socketId to the session.
				//! I don't think the cookie session receives this, though it isn't needed there so far.
				if (serverRegistry.autoConstruct(socket.session.user) instanceof User) {
					socket.session.user.socketId = socket.id;
				}

				socket.on('disconnect', async () => {
					try {
						console.log('DISCONNECT', socket.id);

						await this.disconnect(socket.id).catch((rejected) => {
							//TODO handle better
							console.error('subscription disconnect error:', rejected);
						});

						//? socket won't be used anymore, so does anything really need to be deleted here?
						if (serverRegistry.autoConstruct(socket.session.user) instanceof User) {
							socket.session.user.socketId = defaultSocketId;
						}
					} catch (error) {
						logPropagate(error);
					}
				});

				socket.on('subscribe', async ({table, query}, callback) => {
					try {
						console.log('SUBSCRIBE', socket.id);

						// if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
						//TODO socketId validator, this is all that really matters here
						const user = (serverRegistry.autoConstruct(socket.session.user) instanceof User)
							? socket.session.user
							: new User({socketId: socket.id});

						//! using LiveTable.tableToEntity(table) instead of just a table string so that the function can basically function as a validator
						const result = await this.add(LiveTable.tableToEntity(table), query, user);

						//! //G Do not send back circular data in the acknowledgment callback, SocketIO will cause a stack overflow.
						//L https://www.reddit.com/r/node/comments/8diy81/what_is_rangeerror_maximum_call_stack_size/dxnkpf7?utm_source=share&utm_medium=web2x
						// Using fclone to drop circular reference.s
						callback(fclone(result));
					} catch (error) {
						logPropagate(error);
					}
				});
				socket.on('unsubscribe', async ({table, query}, callback) => {
					try {
						console.log('UNSUBSCRIBE', socket.id);

						const user = (serverRegistry.autoConstruct(socket.session.user) instanceof User)
							? socket.session.user
							: new User({socketId: socket.id});

						const result = await this.remove(LiveTable.tableToEntity(table), query, user);
						callback(fclone(result));
					} catch (error) {
						logPropagate(error);
					}
				});

				socket.on('error', (reason) => {
					try {
						console.error('ERROR', socket.id, reason);
					} catch (error) {
						logPropagate(error);
					}
				});
			} catch (error) {
				logPropagate(error);
			}
		});
	},

	findTable(Entity) {
		return this.tables.get(Entity);
	},
	findLiveQuery(table, query) {
		return table.liveQueries.find(liveQuery => deepCompare(query, liveQuery.query, {compareFunction: compareUnorderedArrays}));
	},
	findSubscription(liveQuery, user) {
		return liveQuery.subscriptions.find(subscription => subscription.user.socketId === user.socketId);
	},

	// Subscribers/users are identified by their socketId, this is so that not-logged-in clients can still subscribe to data, while still allowing the full user object to be the subscriber.
	async add(Entity, query, user) {
		// Process query.
		//TODO //? getMimic was being called with this query: [{playlistId: null}], twice, very rapidly, however even though they are the same query, the one called second resolves before the first one, why? afaik this isn't causing any issues, but it could later.
		const processedQuery = await Entity.getMimic(query);

		// Find table.
		const table = this.findTable(Entity);
		if (!(table instanceof LiveTable)) {
			throw new CustomError({
				message: 'table is not an LiveTable',
			});
		}

		// Find liveQuery, add if it doesn't exist.
		let liveQuery = this.findLiveQuery(table, processedQuery);
		if (!(liveQuery instanceof LiveQuery)) {
			liveQuery = new LiveQuery({
				table,
				query: processedQuery,
			});
			this.findTable(Entity).liveQueries.push(liveQuery);
		}

		// Find subscription, add if it doesn't exist.
		let subscription = this.findSubscription(liveQuery, user);
		if (!(subscription instanceof Subscription)) {
			subscription = new Subscription({
				liveQuery,
				user,
			});
			liveQuery.subscriptions.push(subscription);
		}

		// Update user.
		Object.assign(subscription.user, user);

		return processedQuery;
	},
	async remove(Entity, query, user) {
		//? if the client unsubscribes on the client-side but is unable to unsubscribe on the server-side, the subscription will sit there (and send messages) until the client disconnects, is this ok? maybe consider a timeout system?

		// Process query.
		const processedQuery = await Entity.getMimic(query);

		// Find table.
		const table = this.findTable(Entity);
		if (!(table instanceof LiveTable)) {
			throw new CustomError({
				message: 'table is not an LiveTable',
			});
		}

		// Find liveQuery index.
		const liveQuery = this.findLiveQuery(table, processedQuery);
		const liveQueryIndex = this.findTable(Entity).liveQueries.indexOf(liveQuery);
		if (!(liveQuery instanceof LiveQuery) || liveQueryIndex < 0) {
			return new Warn({
				origin: 'Subscriptions.remove()',
				message: 'no subscription found for this query',
				content: {
					Entity,
					query: processedQuery,
					liveQueryIndex,
				},
			});
		}

		// Find subscription.
		const subscription = this.findSubscription(liveQuery, user);
		const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);
		if (!(subscription instanceof Subscription) || subscriptionIndex < 0) {
			return new Warn({
				origin: 'Subscriptions.remove()',
				message: 'no subscriber found for this user',
				content: {
					liveQuerySubscriptions: liveQuery.subscriptions,
					socketId: user.socketId,
					subscriptionIndex,
				},
			});
		}

		// Remove subscription.
		liveQuery.subscriptions.splice(subscriptionIndex, 1);

		// If no more subscriptions, remove liveQuery.
		if (liveQuery.subscriptions.length <= 0) {
			this.findTable(Entity).liveQueries.splice(liveQueryIndex, 1);
		}

		return processedQuery;
	},

	async notify(Entity, entities, timestamp) {
		// For each liveQuery.
		const table = this.findTable(Entity);
		if (!(table instanceof LiveTable)) {
			throw new CustomError({
				message: 'table is not an LiveTable',
			});
		}

		for (const liveQuery of table.liveQueries) {
			// For each passed entity.
			for (const entity of entities) {
				// If any part of the liveQuery.query matches the entity as a subset && if the notification timestamp is new.
				//R query is an array of object queries, must iterate each then subset match, or else nothing will match because query switches from superset to subset
				if (
					liveQuery.query.some(part => deepCompare(part, entity, {
						compareFunction: compareUnorderedArrays,
						subset: true,
						resultIfTooDeep: true,
					}))
					&& timestamp > liveQuery.timestamp
				) {
					// Set the new timestamp.
					liveQuery.timestamp = timestamp;

					// For each subscription.
					for (const subscription of liveQuery.subscriptions) {
						// Emit a socket notification to the subscriber.
						this.socket.to(subscription.user.socketId).emit('notify', {
							table: Entity.table,
							query: liveQuery.query,
							timestamp,
						});
					}
				}
			}
		}
	},

	async disconnect(socketId) {
		//? unsubscribe all on disconnect and resubscribe all on connect? or have a timeout system?
		//! this doesn't use the remove() method, because the specific subscription (query + user) aren't known, this finds all subscriptions with that user

		for (const [, table] of this.tables) {
			for (let i = table.liveQueries.length - 1; i > -1; i--) {
				const liveQuery = table.liveQueries[i];
				// For each subscription.
				for (let j = liveQuery.subscriptions.length - 1; j > -1; j--) {
					const subscription = liveQuery.subscriptions[j];
					// If it matches the passed user (by socketId), remove it.
					if (subscription.user.socketId === socketId) {
						liveQuery.subscriptions.splice(j, 1);
					}
				}

				// If the liveQuery no longer has any subscriptions, remove it.
				if (liveQuery.subscriptions.length <= 0) table.liveQueries.splice(i, 1);
			}
		}
	},
};

// Supply Entity with its needed dependency to live-data-server.
//R //! This is to avoid a circular dependency, however it is a side-effect.
//TODO Resolve this side-effect.
Entity.notify = liveDataServer.notify.bind(liveDataServer);

export default liveDataServer;

/* //TODO test:
	no duplicate live queries
	subscriptions get removed on disconnect
	single refreshed liveQuery only ever has one subscription (user)
*/
