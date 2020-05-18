//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// EXTERNAL
import http from 'http'; //TODO consider changing to the https module?
import fclone from 'fclone';

// INTERNAL
import deepCompare, {compareUnorderedArrays} from '../shared/utility/object/deep-compare.js';
//! depends on the common global.js not the global-server.js because global-server.js uses this module
import sj from '../public/js/global.js';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

//TODO there is a stack overflow error here somewhere, recursive loop?, usually lead by this error: 'no subscriber found for this user'
// when refreshing the playlist page, all the lists will subscribe fine, until at some point unsubscribe is called (for an empty query [ {} ] , or maybe could be anything) upon which no subscriber is called, and the thing goes to a 'RangeError: Maximum call stack size exceeded' error

//TODO this may be unrelated but it seems the liveQueries here are also piling up

//TODO It seems like many subscriptions are being called but not as many un-subscriptions.

sj.Subscription.augmentClass({
	constructorParts: parent => ({
		defaults: {
			user: null,
		},
	}),
});

export default {
	app: null,
	socket: null,
	tables: sj.LiveTable.makeTables(),

	start({
		app,
		socket,
	}) {
		this.app = app;
		this.socket = socket;

		this.socket.use((socket, next) => {
			//C give the cookie session to the socket
			//C uses a temporary koa context to decrypt the session
			//L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
			//L https://github.com/koajs/session/issues/53#issuecomment-311601304
			//!//? socket.session is static, whereas koa ctx.session is dynamic, that is I'm not sure that this is linked in any way to the cookie session
			//L https://socket.io/docs/server-api/#namespace-use-fn
			socket.session = this.app.createContext(socket.request, new http.OutgoingMessage()).session;
			next();
		});

		this.socket.on('connect', (socket) => {
			console.log('CONNECT', socket.id);
			
			//C if user is logged in, give the socketId to the session
			//! I don't think the cookie session receives this, though it isn't needed there so far
			if (sj.isType(socket.session.user, sj.User)) socket.session.user.socketId = socket.id;

			socket.on('disconnect', async (reason) => {
				console.log('DISCONNECT', socket.id);

				await sj.liveData.disconnect(socket.id).catch(rejected => { 
					//TODO handle better
					if (sj.isType(rejected, sj.Base)) rejected.announce();
					else console.error('subscription disconnect error:', rejected);
				});
				
				//? socket won't be used anymore, so does anything really need to be deleted here?
				if (sj.isType(socket.session.user, sj.User)) socket.session.user.socketId = sj.User.defaults.socketId;
			});

			socket.on('subscribe', async ({table, query}, callback) => {
				console.log('SUBSCRIBE', socket.id);

				//C if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
				//TODO socketId validator, this is all that really matters here
				const user = sj.isType(socket.session.user, sj.User)
					? socket.session.user
					: new sj.User({socketId: socket.id});
					
				//! using sj.Entity.tableToEntity(table) instead of just a table string so that the function can basically function as a validator
				const result = await sj.liveData.add(sj.Entity.tableToEntity(table), query, user).catch(sj.andResolve);

				//!//G do not send back circular data in the acknowledgment callback, SocketIO will cause a stack overflow
				//L https://www.reddit.com/r/node/comments/8diy81/what_is_rangeerror_maximum_call_stack_size/dxnkpf7?utm_source=share&utm_medium=web2x
				//C using fclone to drop circular references
				callback(fclone(result));		
			});
			socket.on('unsubscribe', async ({table, query}, callback) => {
				console.log('UNSUBSCRIBE', socket.id);

				const user = sj.isType(socket.session.user, sj.User)
					? socket.session.user
					: new sj.User({socketId: socket.id});

				const result = await sj.liveData.remove(sj.Entity.tableToEntity(table), query, user).catch(sj.andResolve);
				callback(fclone(result));
			});

			socket.on('error', (reason) => {
				console.error('ERROR', socket.id, reason);
			});
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
	
	//C subscribers/users are identified by their socketId, this is so that not-logged-in clients can still subscribe to data, while still allowing the full user object to be the subscriber
	async add(Entity, query, user) {
		//C process query
		//TODO//? getMimic was being called with this query: [{playlistId: null}], twice, very rapidly, however even though they are the same query, the one called second resolves before the first one, why? afaik this isn't causing any issues, but it could later
		const processedQuery = await Entity.getMimic(query);

		//C find table
		const table = this.findTable(Entity);
		if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
			origin: 'sj.liveData.add()',
			reason: 'table is not an sj.LiveTable',
		});

		//C find liveQuery, add if it doesn't exist
		let liveQuery = this.findLiveQuery(table, processedQuery);
		if (!sj.isType(liveQuery, sj.LiveQuery)) {
			liveQuery = new sj.LiveQuery({
				table,
				query: processedQuery,
			});
			this.findTable(Entity).liveQueries.push(liveQuery);
		}

		//C find subscription, add if it doesn't exist
		let subscription = this.findSubscription(liveQuery, user);
		if (!sj.isType(subscription, sj.Subscription)) {
			subscription = new sj.Subscription({
				liveQuery,
				user,
			});
			liveQuery.subscriptions.push(subscription);
		}

		//C update user
		Object.assign(subscription.user, user);

		return new sj.Success({
			origin: 'sj.addSubscriber()',
			message: 'added subscriber',
			content: processedQuery,
		});
	},
	async remove(Entity, query, user) {
		//? if the client unsubscribes on the client-side but is unable to unsubscribe on the server-side, the subscription will sit there (and send messages) until the client disconnects, is this ok? maybe consider a timeout system?

		//C process query
		const processedQuery = await Entity.getMimic(query);
		
		//C find table
		const table = this.findTable(Entity);
		if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
			origin: 'sj.liveData.remove()',
			reason: 'table is not an sj.LiveTable',
		});

		//C find liveQuery index
		const liveQuery = this.findLiveQuery(table, processedQuery);
		const liveQueryIndex = this.findTable(Entity).liveQueries.indexOf(liveQuery);
		if (!sj.isType(liveQuery, sj.LiveQuery) || liveQueryIndex < 0) return new sj.Warn({
			origin: 'sj.subscriptions.remove()',
			message: 'no subscription found for this query',
			content: {
				Entity,
				query: processedQuery,
				liveQueryIndex,
			},
		});

		//C find subscription
		const subscription = this.findSubscription(liveQuery, user);
		const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);
		if (!sj.isType(subscription, sj.Subscription) || subscriptionIndex < 0) return new sj.Warn({
			origin: 'sj.subscriptions.remove()',
			message: 'no subscriber found for this user',
			content: {
				liveQuerySubscriptions: liveQuery.subscriptions,
				socketId: user.socketId,
				subscriptionIndex,
			},
		});

		//C remove subscription
		liveQuery.subscriptions.splice(subscriptionIndex, 1);

		//C if no more subscriptions, remove liveQuery
		if (liveQuery.subscriptions.length <= 0) {
			this.findTable(Entity).liveQueries.splice(liveQueryIndex, 1);
		}
	
		return new sj.Success({
			origin: 'sj.removeSubscriber()',
			message: 'removed subscriber',
			content: processedQuery,
		});
	},

	async notify(Entity, entities, timestamp) {
		//C for each liveQuery
		const table = this.findTable(Entity);
		if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
			origin: 'sj.liveData.notify()',
			reason: 'table is not an sj.LiveTable',
		});

		for (const liveQuery of table.liveQueries) {
			//C for each passed entity
			for (const entity of entities) {
				//C if any part of the liveQuery.query matches the entity as a subset && if the notification timestamp is new
				//R query is an array of object queries, must iterate each then subset match, or else nothing will match because query switches from superset to subset
				if (
					liveQuery.query.some(part => deepCompare(part, entity, {
						compareFunction: compareUnorderedArrays,
						subset: true,
						resultIfTooDeep: true,
					})) &&
					timestamp > liveQuery.timestamp
				) {
					//C set the new timestamp
					liveQuery.timestamp = timestamp;

					//C for each subscription
					for (const subscription of liveQuery.subscriptions) {
						//C emit a socket notification to the subscriber
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

		for (const pair of this.tables) {
			const table = pair[1];
			for (let i = table.liveQueries.length-1; i > -1; i--) {
				const liveQuery = table.liveQueries[i];
				//C for each subscription
				for (let j = liveQuery.subscriptions.length-1; j > -1; j--) {
					const subscription = liveQuery.subscriptions[j];
					//C if it matches the passed user (by socketId), remove it
					if (subscription.user.socketId === socketId) {
						liveQuery.subscriptions.splice(j, 1);
					}
				}

				//C if the liveQuery no longer has any subscriptions, remove it
				if (liveQuery.subscriptions.length <= 0) table.liveQueries.splice(i, 1);
			}
		}
	},
};

/* //TODO test:
	no duplicate live queries
	subscriptions get removed on disconnect
	single refreshed liveQuery only ever has one subscription (user)
*/
