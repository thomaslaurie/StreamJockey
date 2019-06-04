//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// EXTERNAL
import http from 'http'; //TODO consider changing to the https module?

// INTERNAL
//! depends on the common global.mjs not the global-server.mjs because global-server.mjs uses this module
import sj from '../public/js/global.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

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
			//L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
			//L https://github.com/koajs/session/issues/53#issuecomment-311601304
			//! socket.session is static, whereas koa ctx.session is dynamic //?
			//L https://socket.io/docs/server-api/#namespace-use-fn

			//C uses a temporary koa context to decrypt the session
			socket.session = this.app.createContext(socket.request, new http.OutgoingMessage()).session;
			next();
		});

		this.socket.on('connect', (socket) => {
			console.log('CONNECT', socket.id);
			

			//C give socket id to session.user //? I don't think the actual cookie.session receives this, but for now only the socket.session needs it
			if (sj.isType(socket.session.user, sj.User)) socket.session.user.socketId = socket.id;


			socket.on('disconnect', async (reason) => {
				console.log('DISCONNECT', socket.id);

				await sj.liveData.disconnect(socket.id).catch(rejected => { //TODO better way
					if (sj.isType(rejected, sj.Base)) rejected.announce();
					else console.error('subscription disconnect error:', rejected);
				});
				if (sj.isType(socket.session.user, sj.User)) delete socket.session.user.socketId;
			});

			socket.on('subscribe', async ({table, query}, callback) => {
				console.log('SUBSCRIBE', table, query);

				//C if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
				let subscriber = socket.session.user;
				if (!sj.isType(subscriber), sj.User) subscriber = new sj.User({socketId: socket.id});
				//! using sj.Entity.tableToEntity(table) instead of just a table string so that the function can basically function as a validator
				const result = await sj.liveData.add(sj.Entity.tableToEntity(table), query, subscriber).catch(sj.andResolve);
				callback(result);		
			});
			socket.on('unsubscribe', async ({table, query}, callback) => {
				console.log('UNSUBSCRIBE', query);

				let subscriber = socket.session.user;
				if (!sj.isType(subscriber), sj.User) subscriber = new sj.User({socketId: socket.id});
				//const result = await sj.liveData.remove(sj.Entity.tableToEntity(table), query, subscriber).catch(sj.andResolve);
				const result = true;
				callback(result);
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
		return table.liveQueries.find(liveQuery => sj.deepMatch(query, liveQuery.query, {matchOrder: false}));
	},
	findSubscription(liveQuery, user) {
		return liveQuery.subscriptions.find(subscription => subscription.user.socketId === user.socketId);
	},
	
	//C subscribers/users are identified by their socketId, this is so that not-logged-in clients can still subscribe to data, while still allowing the full user object to be the subscriber
	async add(Entity, query, user) {
		//C process query
		const processedQuery = await Entity.getMimic(query);

		//C find table
		const table = this.findTable(Entity);
		if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
			origin: 'sj.liveData.add()',
			reason: 'table is not an sj.LiveTable',
		});

		//C find liveQuery, add if it doesn't exist
		let liveQuery = this.findLiveQuery(table, query);
		if (!sj.isType(liveQuery), sj.LiveQuery) {
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
		const liveQuery = this.findLiveQuery(table, query);
		const liveQueryIndex = this.findTable(Entity).liveQueries.indexOf(liveQuery);
		if (!sj.isType(liveQuery, sj.LiveQuery) || liveQueryIndex < 0) return new sj.Warn({
			origin: 'sj.subscriptions.remove()',
			message: 'no subscription found for this query',
			content: {
				Entity,
				query,
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
				Entity,
				liveQuery,
				user,
				subscriptionIndex,
			},
		});

		//C remove subscription
		liveQuery.subscriptions.splice(subscriptionIndex, 1);

		//C if no more subscriptions, remove liveQuery
		if (liveQuery.subscriptions.length <= 0) this.findTable(Entity).liveQueries.splice(liveQueryIndex, 1);
	
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
					liveQuery.query.some(part => sj.deepMatch(part, entity, {
						matchOrder: false,
						matchIfSubset: true,
						matchIfTooDeep: true,
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
							changed: entity, //TODO remove this eventually
						});
					}
				}
			}
		}
	},

	async disconnect(user) {
		//? unsubscribe all on disconnect and resubscribe all on connect? or have a timeout system?

		for (const table in this.tables) {
			for (let i = table.liveQueries.length-1; i < -1; i--) {
				const liveQuery = table.liveQueries[i];
				//C for each subscription
				for (let j = liveQuery.subscriptions.length-1; j > -1; j--) {
					const subscription = liveQuery.subscriptions[j];
					//C if it matches the passed user (by socketId), remove it
					if (subscription.user.socketId === user.socketId) liveQuery.subscriptions.splice(j, 1);
				}

				//C if the liveQuery no longer has any subscriptions, remove it
				if (liveQuery.subscriptions.length <= 0) table.liveQueries.splice(i, 1);
			}
		}
	},
};