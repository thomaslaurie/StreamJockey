// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	THOUGHT PROCESS
		PROBLEM

			How do I sync server data with VueX? Updating parent components, unrelated components, etc. is a nightmare. This is what I'm using VueX is for anyways.
			//L https://forum.vuejs.org/t/vuejs-vuex-data-synchronization-with-server-backend/16340/2

			Maybe a global event bus that calls the object type (user, playlist, track, etc) and its id when updated. This would prompt anything using that object to refresh.

			Maybe a store of 'watched' objects, when a GET request is called it adds the item to the list and the component itself to the item's watchers list. The component then uses this item in the object's store and any updates are propagated. When the component is destroyed the watcher is removed. when the last watcher is removed the item is removed. when an item is deleted the parent item (a playlist or something) will also have to watch it and update somehow. If its just the single item the component refreshes as normal and displays a not found error.

			Or just find an existing library that does this.

			The entire database must not be synced, it must just be the data that is currently used by components. Anything that is destroyed and recreated will update when it fetches its data.


		CLIENT-SIDE LIVE DATA

			If an item in a list is refreshed and manually retrieves its own unique query (query only by id), it will add its own query in the mirrored database, if the parent list updates, then it switches back reactively based on p-data (the switch will have to include a destroy for the individual query), but this creates duplicate data and wont this mess up other foreign components representing the same data?

			What if any queries with multiple results just have references to single queries?

			The key should be the query itself.

			Encoding keys into a string could mess up types by converting them all into strings, however this shouldn't be an issue as each column in the database only ever has one type.

			How will the mirrored database interact with non-async components, those that have been passed data without querying it via p-data? maybe still give it a reference but put it in a different list than 'watchers'?

			Maybe have the table as another parameter in the encoded query? A good reason not to is that table is a property that all entities will have, so making it part of the data structure will make searches faster.


			someGetMethod = () {
				Send http get method with subscribe parameter set to context.state.socket.id.
					Or this could also be sent as a second request through the socket. Because it can run through the same validation and therefore should be exactly the same.
				Receive the data. Store it in the mirrored database, add itself to the watcher list.
				Return the reference to the data in the mirrored database.

			}
			onUnneeded = () {
				When the data is no longer needed, the component destroys itself, and should call the unGet function. This removes the watcher from the mirrored data.
				If all watchers are gone, destroy the mirrored data.
				Send an event to the server to remove the subscription.
			}
			onServe = () {
				Filters down to database method.
				After validating return to be got values.
				Add the socket id to a room with the same name as the stringified query.
			}

		
		SERVER SIDE CONSIDERATIONS

			In every create, edit, and delete database method, before returning, send the returned values to a notification queue, all of these should be the changed entries.

			This will not catch some items if there are permission limitations, so maybe the entire object has to be returned and then filtered script-side? But even then wont this just call updates on items the subscriber doesn't even have access to? Would a permission check need to be implemented?
			
			For each item in the notification queue, sort through open rooms and see if they match the item, if they do, send an event to every socket in the room.

			To match multiple queries, the socket subscription must parse the multiQuery and split it into single queries, to do direct string matching - do this client side.

			Socket and http methods must go through the same validator on the server side

			How do I prevent events being broadcast to clients for private entities (ie clients that don't have permission to view them), this works as it is but it will trigger the client to update whenever something that matches updates server-side, but that is private so the client receives no new information. Maybe consider putting permissions as part of the database query so it also applies to the rooms?


		PROCEDURES
			server-side database changes:

			--> any user changes the database
				adds an entity
				edits an entity
				removes an entity
				get can be ignored
			the function executes as normal, but also dispatches (without awaiting) the event to [somewhere]
				this event includes the entity with all of its (query-able) properties (not just id, because get may query by any property)
				add 	- dispatches the entity after the change
				remove 	- dispatches the entity before the change
				edit 	- dispatches both the entity before and after the change
			this entity is sent to [where ever query subscriptions are stored] where its compared against each query
				try to compare in reverse order of frequency of properties, so that comparisons will short circuit as fast as possible
				use a timeout for each query that is checked against the timestamp of the database change, remove subscription if exceeding (maybe like a day or something?)
				//? more things in here (property filter, permission check, )
			<-- if it matches, send a socket event to the connected client that the query has updated
				//? or could just send the new data directly (makes validation + permissions a bit harder)


			server-side subscription:

			--> socket event received
				includes a table property and the query entity
			query is validated, modified
			query is also stored along with the user id (permissions) and socket id in [some query store], also with a timestamp
				somehow also calculate the needed properties (ie don't return password)
				//R it doesn't matter too much that the queries are grouped - because users won't often be using the same queries anyways
			<-- query is transformed into a string query, and returned

			--> socket event received to unsubscribe from a query with query string
			<-- find the query string in the store, validate user id & socket id, and delete it, return success


			client-side subscription:
				make a module that offers spreads for VueX

			-> component calls VueX to subscribe to a query
			<-- query is sent to server via socket to subscribe
			--> validated query gets returned from socket
			setup query mirror in VueX
			send get request for initial data
			give the query mirror the data
			<- return the reference to the query mirror data

			--> socket receives an event that a query has updated
			<-- trigger a new get request for the query identified by the table, & query
			--> receive new data
			update

			-> component calls VueX to unsubscribe from a query (on destroy, or query change)
			<-- send a socket message to unsubscribe
			--> receive success
			remove the query mirror
			<- return success


		SUBSCRIBE - REST vs SOCKET
			
			Two approaches: use a rest request to subscribe and start the socket process, or using a socket request to subscribe and fetch via rest
			Rest doesn't make as much sense as no method matches exactly what is being done (need to add a subscriber by sending a query and a socket id)
			Maybe use a subscribe request, which returns the initial query results, then updates via the socket - completely bypassing any get request
			Or keep rest requests for transmitting data, just use the socket to transmit changes


		QUERY ENCODING		
			I initially thought that encoding a query object as a string and using it as the subscription key would increase performance by decreasing lookup time, however, I'm thinking now that it won't as on the client-side, there won't be very many subscriptions. on the server side, this can't be done because in order to notify a change, these queries need to be subset matched which would require a loop of all subscriptions & subsequent decoding of query stings anyways. just having a list of objects with a query property makes the structure consistent across client and server and shouldn't have too big of a performance cost

	NEW
		what do I want?
	
		I want the subscription system to be simpler and more clear to understand
			that involves either joining EntitySubscription and QuerySubscription classes, or separating them more
				maybe have all subscriptions have a main QuerySubscription that then must refer to any number of 'EntityCache's
		I want to be able to attach subscribe and unsubscribe methods to sj.Entities
			this involves being able to reference the vue store from these entities
				these can simply be augmented in this module
		I want to be able to have events/callbacks on subscriptions for when a query has: something added to it, one of its items edited, or something removed from it (ie CRUD without retrieve)
			this involves having each subscriber have its own set of callbacks, which means each subscriber has its own subscriber/subscription object

		right now as it works
			a query can be a QuerySubscription or an EntitySubscription depending on if it is targeting a single entity
			both trigger a get command to refresh their data when notified
			EntitySubscriptions (via normal subscriber) update themselves, QuerySubscriptions update their EntitySubscriptions (via QuerySubscription subscriber)
			all can have multiple subscribers so that events/lookup/etc. isn't repeated when the same query is subscribed to

		maybe:
			have a query list
				which contains queries that have a list of subscribers
				and a list of references to entities in the entity cache list
					this list can contain any amount of references 
						//! remember to not just do a direct reference, because if the entity is deleted from the cache, but still referenced in this list - it wont be removed, instead use a reactive getter
					this object also has a reactive getter that determines if it is for a single entity or not - though why would this be needed if the entire system is made the same? - it seemed like there was only a separation to served as an inferred property
			and an entity cache list
				which contains single entities
				which also have a list of queries that include this
					when it no longer matches any queries (ie the old, no subscribers situation) it gets removed
				entities are required to have a list of their subscribers/subscriptions so that when one is removed, it knows whether or not to delete the whole thing

		would end up looking like:

		queries: { (map)
			query: {
				subscriptions: [
					{
						onSubscribe: f
						onUnsubscribe: f

						onAdd: f
						onEdit: f
						onRemove: f
					}
				],
				results: [
					cachedEntityReference,
					cachedEntityReference,
					cachedEntityReference,
					...
				],
			}
		},
		entityCache: [
			{ (entity)
				entity: {},
				subscribers: #,
				subscribers: [

				],
			},
		]

		remember, the query list must be where the subscriptions are listened to on the server, not each individual entity

		queries: { (map)
			{query}: {
				subscriptions: [
					references,
					...
				],
				entities: [

				],
			},
			...
		},
		subscriptions: [
			{
				onSubscribe: f //? these could just be the promises returned from the .subscribe() and .unsubscribe() methods
				onUnsubscribe: f

				onAdd: f
				onEdit: f
				onRemove: f

				getData: f, -> goes to parent query and gets the proper data from entities
			},
			...
		],
		entities: [
			{
				data: {},
				watchedBy: #,
			}
			...
		],

		my problem right now is that while the query object can call events for all of its subscribers because it contains them, how do subscribers call the getData function? 
		what if the parent query is just baked in as a closure property of their own getData function?
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

import sj from './global-client.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

sj.LiveTable = sj.Base.makeClass('LiveTable', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			Entity: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				liveQueries: [],
				cachedEntities: [],
			});
		},
	}),
	staticProperties: parent => ({
		makeTables(tableKeys) {
			return new Map(sj.Entity.children.map(Entity => [Entity, new this({Entity})]));
		},
	}),
});

sj.CachedEntity = sj.Base.makeClass('CachedEntity', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			table: undefined,
			entity: undefined,
			//C queryCount keeps track of how many liveQueries are using the cachedEntity so that it doesn't go missing when one of multiple liveQueries is removed
			liveQueryRefs: [],
		},
	}),
});
sj.LiveQuery = sj.Base.makeClass('LiveQuery', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			table: undefined,

			query: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				cachedEntityRefs: [],
				subscriptions: [],

				timestamp: 0,
			});
		},
	}),
});
sj.Subscription = sj.Base.makeClass('Subscription', sj.Base, {
	//? should this inherit from sj.Success since it will be returned from a function>
	constructorParts: parent => ({
		defaults: {
			liveQuery: undefined,

			onAdd() {},
			onEdit() {},
			onRemove() {},
		},
	}),
});


//  ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗
//  ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██║     ██╔════╝
//  ██╔████╔██║██║   ██║██║  ██║██║   ██║██║     █████╗  
//  ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║██║     ██╔══╝  
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝

export default {
	state: {
		tables: sj.LiveTable.makeTables(),
		socket: null,
		timeout: 10000, //C 10 seconds
	},
	getters: {
		// FINDERS //! return undefined when not found
		findTable: state => (Entity) => {
			return state.tables[Entity];
		},
		findCachedEntity: state => ({table, entity}) => {
			return table.cachedEntities.find(cachedEntity => cachedEntity.entity.id === entity.id);
		},
		findLiveQuery: state => ({table, query}) => {
			return table.liveQueries.find(liveQuery => sj.deepMatch(liveQuery.query, query, {matchOrder: false}));
		},
		
		isSingle: state => subscription => {
			//TODO not used, yet
			const query = subscription.liveQuery.query;
			return query.length === 1 && Object.keys(query[0]) === 1 && sj.isType(query[0].id, 'integer');
		},
	},
	mutations: {
		setSocket(state, socket) {
			state.socket = socket;
		},

		// CACHED ENTITY
		pushCachedEntity(		state, {cachedEntities, cachedEntity}) {
			cachedEntities.push(cachedEntity);
		},
		spliceCachedEntity(		state, {cachedEntities, index}) {
			cachedEntities.slice(index, 1);
		},
		pushLiveQueryRef(		state, {liveQueryRefs, liveQuery}) {
			liveQueryRefs.push(liveQuery);
		},
		spliceLiveQueryRef(		state, {liveQueryRefs, index}) {
			liveQueryRefs.slice(index, 1);
		},

		setCachedEntity(		state, {cachedEntity, entity, timestamp}) {
			cachedEntity.entity = entity;
			cachedEntity.timestamp = timestamp;
		},

		// LIVE QUERY
		pushLiveQuery(			state, {liveQueries, liveQuery}) {
			liveQueries.push(liveQuery);
		},
		spliceLiveQuery(		state, {liveQueries, index}) {
			liveQueries.slice(index, 1);
		},
		pushCachedEntityRef(	state, {cachedEntityRefs, cachedEntity}) {
			cachedEntityRefs.push(cachedEntity);
		},
		spliceCachedEntityRef(	state, {cachedEntityRefs, index}) {
			cachedEntityRefs.slice(index, 1);
		},

		// SUBSCRIPTION
		pushSubscription(		state, {subscriptions, subscription}) {
			subscriptions.push(subscription);
		},
		spliceSubscription(		state, {subscriptions, index}) {
			subscriptions.slice(index, 1);
		},
	},
	actions: {
		// ENDPOINTS
		async subscribe(context, {Entity, query, options = {}}) {
			//C validate
			if (!sj.isType(Entity, sj.Entity)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'Entity is not an sj.Entity',
				content: Entity,
			});
			if (!sj.isType(query, Object)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'query is not an Object',
				content: query,
			});
			if (!sj.isType(options, Object)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'options is not an Object',
				content: options,
			});

			const table = context.getters.findTable(Entity);
			if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'table is not an sj.LiveTable',
				content: table,
			});
			

			//C subscribe on server 
			const preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
			const processedQuery = await context.dispatch('serverSubscribe', preparedQuery);

			//C add subscriber, from this point data will live-update
			const subscription = await context.dispatch('addSubscription', {table, query: processedQuery, options});

			//C trigger the initial update, no need to worry about flickering because the function resolves only after this
			await context.dispatch('update', {table, query: processedQuery, callTimestamp: Date.now()});

			//C return the subscription
			return subscription;
		},
		async unsubscribe(context, {subscription}) {
			//C validate
			if (!sj.isType(subscription, sj.Subscription)) throw new sj.Error({
				origin: 'unsubscribe()', 
				reason: 'subscription is not an sj.Subscription',
				content: subscription,
			});

			const table = subscription.table;
			if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
				origin: 'unsubscribe()', 
				reason: 'table is not an sj.LiveTable',
				content: table,
			});
			const Entity = table.Entity;
			if (!sj.isType(Entity, sj.Entity)) throw new sj.Error({
				origin: 'unsubscribe()', 
				reason: 'Entity is not an sj.LiveTable',
				content: Entity,
			});
			

			//C unsubscribe on server
			const preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
			const processedQuery = await context.dispatch('serverUnsubscribe', preparedQuery);

			//C remove subscription from it's liveQuery
			await context.dispatch('removeSubscription', subscription);
		},
		async update(context, {Entity, query, callTimestamp}) {
			//C validate
			if (!sj.isType(Entity, sj.Entity)) throw new sj.Error({
				origin: 'update()', 
				reason: 'Entity is not an sj.Entity',
				content: Entity,
			});
			if (!sj.isType(query, Object)) throw new sj.Error({
				origin: 'update()', 
				reason: 'query is not an Object',
				content: query,
			});
			if (!sj.isType(callTimestamp, 'integer')) callTimestamp = Date.now();

			const table = context.getters.findTable(Entity);
			if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
				origin: 'update()', 
				reason: 'table is not an sj.LiveTable',
				content: table,
			});
			const liveQuery = context.getters.findLiveQuery({table, query});
			if (!sj.isType(liveQuery, sj.LiveQuery)) throw new sj.Error({
				origin: 'update()',
				reason: `liveQuery is not an sj.LiveQuery`,
				content: liveQuery,
			});


			//C don't trigger update if the call to update is already older than the last received data
			if (callTimestamp <= liveQuery.timestamp) return sj.Warn({
				origin: 'update()',
				message: 'cachedEntities not updated because newer data has already been received',
				reason: `data timestamp: ${liveQuery.timestamp}, update timestamp: ${callTimestamp}`
			});

			//C send get request //TODO maybe put a timeout here? or just on the global Entity crud functions
			const {content: entities, timestamp} = await Entity.get(query);

			
			//C for each existing cachedEntity
			//C toggle used so that callbacks only get called once per update
			let entitiesRemoved = false; 
			await sj.asyncForEach(liveQuery.cachedEntityRefs, async cachedEntity => {
				//C if it is no longer included in the result entities
				if (entities.every(entity => entity.id !== cachedEntity.entity.id)) {
					//C remove it from the liveQuery
					await context.dispatch('removeCachedEntity', {cachedEntity, liveQuery});
					entitiesRemoved = true;
				}
			});
			if (entitiesRemoved) await context.dispatch('executeCallback', {liveQuery, callbackName: 'onRemove'});

			//C for each entity
			let entitiesAdded = false;
			let entitiesEdited = false;
			await sj.asyncForEach(entities, async entity => {
				//C if it isn't cached, add a cachedEntity for it
				if (!sj.isType(context.getters.findCachedEntity({table, entity})), sj.CachedEntity) {
					await context.dispatch('addCachedEntity', {entity, liveQuery});
					entitiesAdded = true;
				}

				//C find it's cachedEntity
				const cachedEntity = await context.getters.findCachedEntity({table, entity});
				if (!sj.isType(cachedEntity, sj.CachedEntity)) throw new sj.Unreachable({origin: 'update()'});

				//C if the entity data is new
				if (timestamp > cachedEntity.timestamp) {
					//C update it
					await context.dispatch('updateCachedEntity', {cachedEntity, entity, timestamp});
					if (!sj.deepMatch(entity, cachedEntity.entity)) entitiesEdited = true;
				}
			});
			if (entitiesAdded) await context.dispatch('executeCallback', {liveQuery, callbackName: 'onAdd'});
			if (entitiesEdited) await context.dispatch('executeCallback', {liveQuery, callbackName: 'onEdit'});
		},

		// SERVER
		async serverSubscribe(context, query) {
			return await new Promise((resolve, reject) => {
				const timeoutId = sj.setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket subscription timed out',
					}));
				}, context.state.timeout);

				context.state.socket.emit('subscribe', {table: table.Entity.table, query}, result => {
					clearTimeout(timeoutId);
					if (sj.isType(result, sj.Error)) reject(result);
					else resolve(result);
				});
			}).then(sj.content).catch(sj.propagate);
		},
		async serverUnsubscribe(context, query) {
			await new Promise((resolve, reject) => {
				const timeoutId = sj.setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket unsubscription timed out',
					}));
				}, context.state.timeout);

				context.state.socket.emit('unsubscribe', {table: table.Entity.table, query}, result => {
					clearTimeout(timeoutId);
					if (sj.isType(result, sj.Error)) reject(result);
					else resolve(result);
				});
			}).then(sj.content).catch(sj.propagate);
		},
		async reconnect(context) {
			for (const table in context.state.tables) {
				for (const liveQuery of table.liveQueries) {
					await context.dispatch('serverSubscribe', liveQuery.query);
				}
			}
		},
		async disconnect(context) {
			for (const table in context.state.tables) {
				for (const liveQuery of table.liveQueries) {
					await context.dispatch('serverUnsubscribe', liveQuery.query);
				}
			}
		},
		
		// CACHED ENTITY
		async addCachedEntity(context, {entity, liveQuery}) {
			const table = liveQuery.table;


			//C add cachedEntity to table if it doesn't exist
			if (!sj.isType(context.getters.findCachedEntity({table, entity}), sj.CachedEntity)) {
				context.commit('pushCachedEntity', new sj.CachedEntity({table, entity}));
			}

			//C find cachedEntity by entity
			const cachedEntity = context.getters.findCachedEntity({table, entity});
			if (!sj.isType(cachedEntity, sj.CachedEntity)) throw new sj.Unreachable({origin: 'addCachedEntity()'});

			//C shorthand
			const liveQueryRefs = cachedEntity.liveQueryRefs;
			const cachedEntityRefs = liveQuery.cachedEntityRefs;

			//C add refs to both liveQuery and cachedEntity if they don't exist
			if (liveQueryRefs.find(liveQuery) === undefined) context.commit('pushLiveQueryRef', {liveQueryRefs, liveQuery});
			if (cachedEntityRefs.find(cachedEntity) === undefined) context.commit('pushCachedEntityRef', {cachedEntityRefs, cachedEntity});
		},
		async removeCachedEntity(context, {cachedEntity, liveQuery}) {
			//C remove cachedEntityRef from liveQuery
			const cachedEntityRefIndex = liveQuery.cachedEntityRefs.indexOf(cachedEntity);
			if (cachedEntityRefIndex >= 0) context.commit('spliceCachedEntityRef', {
				cachedEntityRefs: liveQuery.cachedEntityRefs, 
				index: cachedEntityRefIndex
			});
			else console.warn('cachedEntityRef not found in liveQuery');
			

			//C remove liveQueryRef from cachedEntity
			const liveQueryRefIndex = cachedEntity.liveQueryRefs.indexOf(liveQuery);
			if (liveQueryRefIndex >= 0) context.commit('spliceLiveQueryRef', {
				liveQueryRefs: cachedEntity.liveQueryRefs, 
				index: liveQueryRefIndex
			});
			else console.warn('liveQueryRef not found in cachedEntity');


			//C if cachedEntity no longer has any liveQueryRefs
			if (cachedEntity.liveQueryRefs.length <= 0) {
				//C remove the cachedEntity
				const cachedEntityIndex = cachedEntity.table.cachedEntities.indexOf(cachedEntity);
				if (cachedEntityIndex >= 0) context.commit('spliceCachedEntity', {
					cachedEntities: cachedEntity.table.cachedEntities, 
					index: cachedEntityIndex
				});
				else console.warn('cachedEntity not found in table');
			}
		},
		async updateCachedEntity(context, {cachedEntity, entity, timestamp}) {
			context.commit('setCachedEntity', {cachedEntity, entity, timestamp});
		},

		// LIVE QUERY
		async addLiveQuery(context, {table, query}) {
			context.commit('pushLiveQuery', {liveQueries: table.liveQueries, liveQuery: new sj.LiveQuery({table, query})});
		},
		async removeLiveQuery(context, liveQuery) {
			const table = liveQuery.table;

			//C remove the liveQuery
			const liveQueryIndex = table.liveQueries.indexOf(liveQuery);
			if (liveQueryIndex >= 0) context.dispatch('removeLiveQuery', {
				liveQueries: table.liveQueries,
				index: liveQueryIndex,
			});
			else console.warn('liveQuery not found in table');

			context.commit('spliceLiveQuery', {liveQueries: table.liveQueries, index: liveQueryIndex});
		},

		// SUBSCRIPTION 
		async addSubscription(context, {table, query, options}) {
			//C create a new liveQuery if one doesn't exist for the desired query
			if (context.getters.findLiveQuery({table, query}) === undefined) {
				await context.dispatch('addLiveQuery', {table, query});
			}

			//C find the liveQuery
			const liveQuery = context.getters.findLiveQuery({table, query}); //! this should never fail
			if (!sj.isType(liveQuery, sj.LiveQuery)) throw new sj.Unreachable({
				origin: 'addSubscription()',
				content: liveQuery,
			});

			//C create a new subscription
			const subscription = new sj.Subscription({
				...options,
				liveQuery, //C parent reference
			});
			
			//C push and return
			context.commit('pushSubscription', {subscriptions: liveQuery.subscriptions, subscription});
			return subscription;
		},
		async removeSubscription(context, subscription) {
			const liveQuery = subscription.liveQuery;

			//C remove subscription
			const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);
			if (subscriptionIndex >= 0) context.commit('spliceSubscription', {
				subscriptions: liveQuery.subscriptions,
				index: subscriptionIndex,
			});
			else console.warn('subscription not found in liveQuery');

			//C if liveQuery no longer has any subscriptions
			if (liveQuery.subscriptions.length <= 0) await context.dispatch('removeLiveQuery', liveQuery);
		},
		
		async executeCallback(context, {liveQuery, callbackName}) {
			for (const subscription of liveQuery.Subscriptions) {
				subscription[callbackName]();
			}
		},

		async start(context, socket) { 
			//G this should be called in the main vue created()

			//C set socket
			context.commit('setSocket', socket);

			//C set listeners
			context.state.socket.on('connect', async () => {
				await context.dispatch('reconnect');
			});
			context.state.socket.on('disconnect', async (reason) => {
				await context.dispatch('disconnect');
			});

			context.state.socket.on('notify', async ({table, query, timestamp}) => {
				const Entity = sj.Entity.tableToEntity(table);
				context.dispatch('update', {Entity, table: context.state.subscriptions[Entity.table], query, timestamp});
			});

			//C test
			context.state.socket.test = async function () {
				sj.Track.placeholder = {
					playlistId: 2, 
					name: 'placeholder name', 
					duration: 1234, 
					source: sj.spotify, 
					sourceId: 'placeholderSourceId', 
					artists: ['foo', 'bar'],
				};
				sj.Playlist.placeholder = {
					userId: 3,
					name: 'placeholder name',
					description: 'placeholder description',
				};
				sj.User.placeholder = {
					name: 'placeholder name',
					email: 'placeholder email',
					password: 'placeholder password',
				};
			
				let wrap = async function (Entity, queryPack, data, predoF, doF, undoF, data2) {
					//C subscribe
					let subscribeResult = await new Promise((resolve, reject) => {
						context.state.socket.emit('subscribe', queryPack, result => {
							if (sj.isType(result, sj.Success)) {
								resolve(result);
							} else {
								reject(result);
							}
						});
					});
			
					let accessory = {};
					let predoResult = await predoF(Entity, data, accessory, data2);
			
					//C make listener
					let notified = false;
					let notifiedResult = {};
					context.state.socket.on('notify', notifyResult => { //? when is this listener removed?
						console.log('CALLED');
						notifiedResult = notifyResult;
						if (sj.deepMatch(queryPack.query, notifyResult.changed, {matchIfSubset: true})) notified = true;
					});
			
					//C do
					let mainResult = await doF(Entity, data, accessory, data2);
			
					//C wait some time for notification to come back
					await sj.wait(1000);
			
					//C undo
					let undoResult = await undoF(Entity, data, accessory, data2);
			
					//C unsubscribe
					let unsubscribeResult = await new Promise((resolve, reject) => {
						context.state.socket.emit('unsubscribe', queryPack, result => {
							if (sj.isType(result, sj.Success)) {
								resolve(result);
							} else {
								reject(result);
							}
						});
					});
			
					if (!notified) console.log('query:', queryPack.query, 'changed:', notifiedResult.changed)
					return notified;
				};
			
				let add = async function (Entity, queryPack, data) {
					return await wrap(Entity, queryPack, data,
						async () => undefined, 
						async (Entity, data, accessory) => {
							let addResult = await Entity.add({
								...Entity.placeholder, //C fill in missing data
								...data,
							});
							accessory.id = sj.one(addResult.content).id;
							return addResult;
						}, 
						async (Entity, data, accessory) => {
							return await Entity.remove({id: accessory.id}); //C delete generated id
						}
					);
				};
				let edit = async function (Entity, queryPack, dataBefore, dataAfter) {
					dataAfter.id = dataBefore.id; //C enforce before and after to have the same id
			
					return await wrap(Entity, queryPack, dataBefore,
						async (Entity, dataBefore, accessory, dataAfter) => {
							let addResult = await Entity.add({
								...Entity.placeholder,
								...dataBefore,
							});
							accessory.id = sj.one(addResult.content).id;
							return addResult;
						},
						async (Entity, dataBefore, accessory, dataAfter) => {
							return await Entity.edit({
								...dataAfter,
								id: accessory.id,
							});
						}, async (Entity, dataBefore, accessory, dataAfter) => {
							return await Entity.remove({id: accessory.id});
						},
						dataAfter,
					);
				};
				let remove = async function (Entity, queryPack, data) {
					return await wrap(Entity, queryPack, data,
						async (Entity, data, accessory) => {
							let addResult = await Entity.add({
								...Entity.placeholder,
								...data,
							});
							accessory.id = sj.one(addResult.content).id;
							return addResult;
						},
						async (Entity, data, accessory) => {
							return await Entity.remove({id: accessory.id});
						},
						async() => undefined,
					);
				};
			
			
				sj.test([
					//['add track name', 			true === await add(sj.Track, {table: 'tracks', query: {name: 'new name'}}, {name: 'new name'})],
					//['add playlist name', 		true === await add(sj.Playlist, {table: 'playlists', query: {name: 'new name'}}, {name: 'new name'})],
					//['add user name', 			true === await add(sj.User, {table: 'users', query: {name: 'new name'}}, {name: 'new name'})],
			
					//['edit existing name', 		true === await edit(sj.Track, {table: 'tracks', query: {name: 'new name'}}, {name: 'new name'}, {name: 'not new name'})],
					//['edit to new name', 		true === await edit(sj.Track, {table: 'tracks', query: {name: 'new name'}}, {name: 'not new name'}, {name: 'new name'})],
			
			
					['remove track name', 		true === await remove(sj.Track, {table: 'tracks', query: {name: 'some name'}}, {name: 'some name'})],
					['remove playlist name', 	true === await remove(sj.Playlist, {table: 'playlists', query: {name: 'some name'}}, {name: 'some name'})],
					['remove user name', 		true === await remove(sj.User, {table: 'users', query: {name: 'some name'}}, {name: 'some name'})],
					
				], 'context.state.socket.test()');
			
			
				delete sj.Track.placeholder;
				delete sj.Playlist.placeholder;
				delete sj.User.placeholder;
			};

			// await context.state.socket.test();
			//TODO await context.dispatch('test');
		},

		async test(context) {
			/*
				const Entity = sj.Track;
				const query = [{playlistId: 2}];
				const changedName = sj.makeKey(10);
			
				const change = [{id: 65, name: changedName}]; //TODO I deleted track 65
				const subscriber = 'test subscriber';
			
				let pass = true;
			
				if (context.state.subscriptions[Entity.table].length !== 0) {
					console.error("subscriptions didn't start out empty")
					pass = false;
				}
				console.log('initial query:', query);
			
				let result = await context.dispatch('subscribe', {Entity, query, subscriber});
				if (!sj.deepMatch(context.state.subscriptions[Entity.table][0].query, query)) {
					console.error('stored query is not the same as input query');
					pass = false;
				}
				console.log('subscribed to query:', context.state.subscriptions[Entity.table][0].query);
				console.log('before content:', context.state.subscriptions[Entity.table][0].content);
			
				await Entity.edit(change);
				await sj.wait(1000);
				console.log('after content:', context.state.subscriptions[Entity.table][0].content);
			
				await context.dispatch('unsubscribe', {Entity, query, subscriber});
				if (context.state.subscriptions[Entity.table].length !== 0) {
					console.error("subscriptions didn't end empty");
					pass = false;
				}
				console.log(context.state.subscriptions[Entity.table]);
				console.log('none remaining:', context.state.subscriptions[Entity.table].length === 0);
				console.log('pass:', pass);
				console.log('result', result);
				
				const testFunction = function ({
					Entity,
					query,
					query2,
					subscriber,
				}) {
					//C subscriptions must start out empty
					if (context.state.subscriptions[Entity.table].length !== 0) return false;

					const subscription = await context.dispatch('subscribe', {Entity, query, subscriber});

					//TODO
				};
			*/

			//TODO
			await sj.test([
			], 'liveQuery')
		},
	},
};

//---------- write tests, refactor implementation of actions

/*
	export default {
		modules: {},

		
		state: {
			socket: null,
			subscriptions: new sj.Subscriptions(),
		},
		actions: {
			//TODO update should not fire if the current data's timestamp is newer than the notify's timestamp - overall just keep thinking about timestamps with scalability in mind

			//TODO consider using Map() for lookup

			async subscribe(context, {Entity, query, subscriber, timeout = 10000}) {
				//C subscribe on server 
				const preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
				const processedQuery = await new Promise((resolve, reject) => {
					const timeoutId = sj.setTimeout(() => {
						reject(new sj.Error({
							log: true,
							reason: 'socket subscription timed out',
						}));
					}, timeout);

					context.state.socket.emit('subscribe', {table: Entity.table, query: preparedQuery}, result => {
						clearTimeout(timeoutId);
						if (sj.isType(result, sj.Error)) reject(result);
						else resolve(result);
					});
				}).then(sj.content).catch(sj.propagate);

				//C find table, based on Entity
				const table = context.state.subscriptions[Entity.table];

				//C add subscriber, from this point data will live-update
				await context.dispatch('addSubscriber', {table, query: processedQuery, subscriber});

				//C trigger the initial update
				await context.dispatch('update', {Entity, table, query: processedQuery, timestamp: Date.now()});

				//C return the subscription's data, from this point component data will update (no need to worry about flickering from above)
				const subscription = context.getters.findSubscription(table, processedQuery);
				return subscription;
			},
			async unsubscribe(context, {Entity, query, subscriber, timeout = 10000}) { //? could this be simplified to just take the object returned from subscribe?
				//C subscribe on server
				let preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
				let processedQuery = await new Promise((resolve, reject) => {
					const timeoutId = sj.setTimeout(() => {
						reject(new sj.Error({
							log: true,
							reason: 'socket unsubscription timed out',
						}));
					}, timeout);

					context.state.socket.emit('unsubscribe', {table: Entity.table, query: preparedQuery}, result => {
						clearTimeout(timeoutId);
						if (sj.isType(result, sj.Error)) reject(result);
						else resolve(result);
					});
				}).then(sj.content).catch(sj.propagate);

				//C find table, based on Entity
				let table = context.state.subscriptions[Entity.table];

				//C remove subscriber
				//? can this be converted to a subscription parameter?
				await context.dispatch('removeSubscriber', {table, query: processedQuery, subscriber});
			},

			async update(context, {Entity, table, query, timestamp}) {
				//C find subscription
				let existingSubscription = context.getters.findSubscription(table, query);
				if (!existingSubscription) throw new sj.Error({
					origin: 'removeSubscriber()',
					reason: 'could not find subscription to update',
				});

				//C check timestamp to avoid sending redundant get requests
				if (timestamp <= existingSubscription.timestamp) return sj.Warn({
					origin: 'update()',
					message: 'did not update subscription because newer data has already been received',
					reason: `existing timestamp: ${existingSubscription.timestamp}, call timestamp: ${timestamp}`
				});

				//C send get request
				let result = await Entity.get(query);
				let entities = result.content;
				let dataTimestamp = result.timestamp;

				//C if EntitySubscription
				if (sj.isType(existingSubscription, sj.EntitySubscription)) { 
					if (dataTimestamp > existingSubscription.timestamp) {
						//C update EntitySubscription's data directly
						context.commit('editSubscription', {subscription: existingSubscription, properties: {
							content: sj.one(entities),
							timestamp: dataTimestamp,
						}});
					}
				} else { //C if QuerySubscription
					//C QuerySubscriptions are are responsible for updating the EntitySubscriptions they are subscribed to and their content references to these EntitySubscriptions
					
					let updatedEntitySubscriptions = [];

					//C for each entity in the get result
					await sj.asyncForEach(entities, async entity => {
						//C format entity.id as a query for a EntitySubscription
						let entityQuery = sj.any(sj.shake(entity, Entity.filters.id));

						//C add existingSubscription as a subscriber to EntitySubscription
						//! this is one place where the query isn't processed server-side, this shouldn't cause any issue as it only uses the id property
						await context.dispatch('addSubscriber', {table, query: entityQuery, subscriber: existingSubscription});
						let entitySubscription = context.getters.findSubscription(table, entityQuery);
						if (!entitySubscription) throw new sj.Error({
							origin: 'update()',
							reason: 'could not find entity subscription that was just added',
						});

						//C check dataTimestamp to avoid overwriting new data with older data
						if (dataTimestamp > entitySubscription.timestamp) {
							//C update the data
							context.commit('editSubscription', {subscription: entitySubscription, properties: {
								content: entity,
								timestamp: dataTimestamp,
							}});
						}

						//C push reference to a temporary list
						updatedEntitySubscriptions.push(entitySubscription);
					});

					//C if an existing QuerySubscription's EntitySubscription is no longer part of the query results, remove this QuerySubscription as a subscriber
					await sj.asyncForEach(existingSubscription.content, async existingEntitySubscription => {
						if (!updatedEntitySubscriptions.some(updatedEntitySubscription => sj.deepMatch(updatedEntitySubscription.query, existingEntitySubscription.query))) {
							await context.dispatch('removeSubscriber', {table, query: existingEntitySubscription.query, subscriber: existingSubscription});
						}
					});

					//C swap in the new references
					context.commit('editSubscription', {subscription: existingSubscription, properties: {
						content: updatedEntitySubscriptions,
					}});
				}
			},

			async addSubscriber(context, {table, query, subscriber}) { 
				//C find subscription
				let existingSubscription = context.getters.findSubscription(table, query);
				if (!existingSubscription) {
					//C determine if Query or Entity Subscription
					const Type = (query.length === 1 && Object.keys(query).length === 1 && sj.isType(query[0].id, Number)) ? sj.EntitySubscription : sj.QuerySubscription;

					//C create new subscription
					context.commit('addSubscription', {table, subscription: new Type({
						query, //TODO make immutable
						subscribers: [subscriber],
					})});
				} else {
					//C find subscriber
					let existingSubscriber = existingSubscription.subscribers.find(existingSubscriber => existingSubscriber === subscriber);

					if (!existingSubscriber) {
						//C add subscriber //! can't just push here as only mutations should modify state
						context.commit('editSubscription', {subscription: existingSubscription, properties: {
							subscribers: [...existingSubscription.subscribers, subscriber],
						}});
					}
				}
			},
			async removeSubscriber(context, {table, query, subscriber}) {
				//C find subscription
				let existingSubscription = context.getters.findSubscription(table, query);
				if (!existingSubscription) return new sj.Warn({
					origin: 'removeSubscriber()',
					reason: 'could not find subscription to remove',
				});

				//C find subscriber
				existingSubscription.subscribers.forEach((existingSubscriber, index, subscribers) => {
					if (existingSubscriber === subscriber) { 
						//C remove subscriber
						context.commit('editSubscription', {subscription: existingSubscription, properties: {
							subscribers: subscribers.filter(existingSubscriber => existingSubscriber !== subscriber), 
						}});
					}
				});

				//C if no subscribers remain
				if (existingSubscription.subscribers.length <= 0) { 
					//C if QuerySubscription
					if (!sj.isType(existingSubscription, sj.EntitySubscription)) {
						//C unsubscribe self from all EntitySubscriptions
						await sj.asyncForEach(existingSubscription.content, async entitySubscription => {
							await context.dispatch('removeSubscriber', {table, query: entitySubscription.query, subscriber: existingSubscription});
						});
					}

					//C remove self
					context.commit('removeSubscription', {table, subscription: existingSubscription});
				}
			},


			async reconnect(context) {
				//G disconnect all is called server-side
				//C for each table
				await sj.asyncForEach(sj.Entity.children, async child => {
					//C for each subscription
					await sj.asyncForEach(context.state.subscriptions[child.table], async subscription => {
						//C for each subscriber
						await sj.asyncForEach(subscription.subscribers, async subscriber => {
							//C if subscriber is not a QuerySubscription
							if (!sj.isType(subscriber, sj.QuerySubscription)) {
								//C re-subscribe
								await context.dispatch('subscribe', {Entity: child, query: subscription.query, subscriber: subscriber});
							}
						});
					});
				});
			},

			//G this should be called in the main vue created()
			async start(context, socket) {
				context.commit('setSocket', socket);

				context.state.socket.on('connect', async () => {
					await context.dispatch('reconnect');
				});
				context.state.socket.on('disconnect', async (reason) => {
				});

				context.state.socket.on('notify', async ({table, query, timestamp}) => {
					const Entity = sj.Entity.tableToEntity(table);
					context.dispatch('update', {Entity, table: context.state.subscriptions[Entity.table], query, timestamp});
				});

				context.state.socket.test = async function () {
					sj.Track.placeholder = {
						playlistId: 2, 
						name: 'placeholder name', 
						duration: 1234, 
						source: sj.spotify, 
						sourceId: 'placeholderSourceId', 
						artists: ['foo', 'bar'],
					};
					sj.Playlist.placeholder = {
						userId: 3,
						name: 'placeholder name',
						description: 'placeholder description',
					};
					sj.User.placeholder = {
						name: 'placeholder name',
						email: 'placeholder email',
						password: 'placeholder password',
					};
				
					let wrap = async function (Entity, queryPack, data, predoF, doF, undoF, data2) {
						//C subscribe
						let subscribeResult = await new Promise((resolve, reject) => {
							context.state.socket.emit('subscribe', queryPack, result => {
								if (sj.isType(result, sj.Success)) {
									resolve(result);
								} else {
									reject(result);
								}
							});
						});
				
						let accessory = {};
						let predoResult = await predoF(Entity, data, accessory, data2);
				
						//C make listener
						let notified = false;
						let notifiedResult = {};
						context.state.socket.on('notify', notifyResult => { //? when is this listener removed?
							console.log('CALLED');
							notifiedResult = notifyResult;
							if (sj.deepMatch(queryPack.query, notifyResult.changed, {matchIfSubset: true})) notified = true;
						});
				
						//C do
						let mainResult = await doF(Entity, data, accessory, data2);
				
						//C wait some time for notification to come back
						await sj.wait(1000);
				
						//C undo
						let undoResult = await undoF(Entity, data, accessory, data2);
				
						//C unsubscribe
						let unsubscribeResult = await new Promise((resolve, reject) => {
							context.state.socket.emit('unsubscribe', queryPack, result => {
								if (sj.isType(result, sj.Success)) {
									resolve(result);
								} else {
									reject(result);
								}
							});
						});
				
						if (!notified) console.log('query:', queryPack.query, 'changed:', notifiedResult.changed)
						return notified;
					};
				
					let add = async function (Entity, queryPack, data) {
						return await wrap(Entity, queryPack, data,
							async () => undefined, 
							async (Entity, data, accessory) => {
								let addResult = await Entity.add({
									...Entity.placeholder, //C fill in missing data
									...data,
								});
								accessory.id = sj.one(addResult.content).id;
								return addResult;
							}, 
							async (Entity, data, accessory) => {
								return await Entity.remove({id: accessory.id}); //C delete generated id
							}
						);
					};
					let edit = async function (Entity, queryPack, dataBefore, dataAfter) {
						dataAfter.id = dataBefore.id; //C enforce before and after to have the same id
				
						return await wrap(Entity, queryPack, dataBefore,
							async (Entity, dataBefore, accessory, dataAfter) => {
								let addResult = await Entity.add({
									...Entity.placeholder,
									...dataBefore,
								});
								accessory.id = sj.one(addResult.content).id;
								return addResult;
							},
							async (Entity, dataBefore, accessory, dataAfter) => {
								return await Entity.edit({
									...dataAfter,
									id: accessory.id,
								});
							}, async (Entity, dataBefore, accessory, dataAfter) => {
								return await Entity.remove({id: accessory.id});
							},
							dataAfter,
						);
					};
					let remove = async function (Entity, queryPack, data) {
						return await wrap(Entity, queryPack, data,
							async (Entity, data, accessory) => {
								let addResult = await Entity.add({
									...Entity.placeholder,
									...data,
								});
								accessory.id = sj.one(addResult.content).id;
								return addResult;
							},
							async (Entity, data, accessory) => {
								return await Entity.remove({id: accessory.id});
							},
							async() => undefined,
						);
					};
				
				
					sj.test([
						//['add track name', 			true === await add(sj.Track, {table: 'tracks', query: {name: 'new name'}}, {name: 'new name'})],
						//['add playlist name', 		true === await add(sj.Playlist, {table: 'playlists', query: {name: 'new name'}}, {name: 'new name'})],
						//['add user name', 			true === await add(sj.User, {table: 'users', query: {name: 'new name'}}, {name: 'new name'})],
				
						//['edit existing name', 		true === await edit(sj.Track, {table: 'tracks', query: {name: 'new name'}}, {name: 'new name'}, {name: 'not new name'})],
						//['edit to new name', 		true === await edit(sj.Track, {table: 'tracks', query: {name: 'new name'}}, {name: 'not new name'}, {name: 'new name'})],
				
				
						['remove track name', 		true === await remove(sj.Track, {table: 'tracks', query: {name: 'some name'}}, {name: 'some name'})],
						['remove playlist name', 	true === await remove(sj.Playlist, {table: 'playlists', query: {name: 'some name'}}, {name: 'some name'})],
						['remove user name', 		true === await remove(sj.User, {table: 'users', query: {name: 'some name'}}, {name: 'some name'})],
						
					], 'context.state.socket.test()');
				
				
					delete sj.Track.placeholder;
					delete sj.Playlist.placeholder;
					delete sj.User.placeholder;
				};

				await context.dispatch('test');
			},

			async test(context) {
				
				const Entity = sj.Track;
				const query = [{playlistId: 2}];
				const changedName = sj.makeKey(10);
			
				const change = [{id: 65, name: changedName}]; //TODO I deleted track 65
				const subscriber = 'test subscriber';
			
				let pass = true;
			
				if (context.state.subscriptions[Entity.table].length !== 0) {
					console.error("subscriptions didn't start out empty")
					pass = false;
				}
				console.log('initial query:', query);
			
				let result = await context.dispatch('subscribe', {Entity, query, subscriber});
				if (!sj.deepMatch(context.state.subscriptions[Entity.table][0].query, query)) {
					console.error('stored query is not the same as input query');
					pass = false;
				}
				console.log('subscribed to query:', context.state.subscriptions[Entity.table][0].query);
				console.log('before content:', context.state.subscriptions[Entity.table][0].content);
			
				await Entity.edit(change);
				await sj.wait(1000);
				console.log('after content:', context.state.subscriptions[Entity.table][0].content);
			
				await context.dispatch('unsubscribe', {Entity, query, subscriber});
				if (context.state.subscriptions[Entity.table].length !== 0) {
					console.error("subscriptions didn't end empty");
					pass = false;
				}
				console.log(context.state.subscriptions[Entity.table]);
				console.log('none remaining:', context.state.subscriptions[Entity.table].length === 0);
				console.log('pass:', pass);
				console.log('result', result);
				
				const testFunction = function ({
					Entity,
					query,
					query2,
					subscriber,
				}) {
					//C subscriptions must start out empty
					if (context.state.subscriptions[Entity.table].length !== 0) return false;

					const subscription = await context.dispatch('subscribe', {Entity, query, subscriber});

					//TODO
				};
				

				//TODO
				await sj.test([
				], 'liveQuery')
			},
		},
		mutations: {
			addSubscription(state, {table, subscription}) {
				table.push(subscription);
			},
			editSubscription(state, {subscription, properties}) {
				Object.assign(subscription, properties);
			},
			removeSubscription(state, {table, subscription}) {
				let index = table.indexOf(subscription);
				if (index < 0) throw new sj.Error({
					origin: 'removeSubscription()',
					reason: 'could not find subscription to remove',
				});

				table.splice(index, 1);
			},

			setSocket(state, socket) {
				state.socket = socket;
			},
		},
		getters: {
			findSubscription: state => (table, query) => {
				if (!Array.isArray(table)) throw new sj.Error({
					origin: 'findSubscription()',
					reason: `table is not an array: ${typeof table}`,
					content: table,
				});
				return table.find(existingSubscription => sj.deepMatch(existingSubscription.query, query, {matchOrder: false}));
			},
			getSubscriptionData: state => subscription => {
				if (sj.isType(subscription, sj.EntitySubscription)) {
					return subscription.content;
				} else if (sj.isType(subscription, sj.QuerySubscription)) {
					return subscription.content.map(entitySubscription => entitySubscription.content);
				} else {
					throw new sj.Error({
						origin: 'getSubscriptionData()',
						reason: 'subscription is not an EntitySubscription or QuerySubscription',
						content: subscription,
					});
				}
			},
		},
	};
*/