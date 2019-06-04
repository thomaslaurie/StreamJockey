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

//! depends on global-client.mjs because it is used in index.mjs alongside global-client.mjs
import sj from './global-client.mjs';


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
			return state.tables.get(Entity);
		},
		findCachedEntity: state => ({table, entity}) => {
			return table.cachedEntities.find(cachedEntity => cachedEntity.entity.id === entity.id);
		},
		findLiveQuery: state => ({table, query}) => {
			return table.liveQueries.find(liveQuery => sj.deepMatch(liveQuery.query, query, {matchOrder: false}));
		},
		
		getLiveData: state => subscription => {
			//C validate
			if (!sj.isType(subscription, sj.Subscription)) throw new sj.Error({
				origin: 'getLiveData()', 
				reason: 'subscription is not an sj.Subscription',
				content: subscription,
			});

			//C shorten
			const liveQuery = subscription.liveQuery;
			if (!sj.isType(liveQuery, sj.LiveQuery)) throw new sj.Error({
				origin: 'getLiveData()',
				reason: `liveQuery is not an sj.LiveQuery`,
				content: liveQuery,
			});

			//C get all liveQuery.cachedEntityRefs.entity
			return liveQuery.cachedEntityRefs.map(cachedEntityRef => {
				if (!sj.isType(cachedEntityRef, sj.CachedEntity)) throw new sj.Error({
					origin: 'getLiveData()',
					reason: 'cachedEntityRef is not a cachedEntity',
					content: sj.image(cachedEntityRef),
				});
				return cachedEntityRef.entity;
			});
		},
		isSingle: state => subscription => {
			const query = subscription.liveQuery.query;
			return query.length === 1 && Object.keys(query[0]) === 1 && sj.isType(query[0].id, 'integer');
		},
	},
	mutations: {
		// CACHED ENTITY
		pushCachedEntity(		state, {cachedEntities, cachedEntity}) {
			cachedEntities.push(cachedEntity);
		},
		spliceCachedEntity(		state, {cachedEntities, index}) {
			cachedEntities.splice(index, 1);
		},
		pushLiveQueryRef(		state, {liveQueryRefs, liveQuery}) {
			liveQueryRefs.push(liveQuery);
		},
		spliceLiveQueryRef(		state, {liveQueryRefs, index}) {
			liveQueryRefs.splice(index, 1);
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
			liveQueries.splice(index, 1);
		},
		pushCachedEntityRef(	state, {cachedEntityRefs, cachedEntity}) {
			cachedEntityRefs.push(cachedEntity);
		},
		spliceCachedEntityRef(	state, {cachedEntityRefs, index}) {
			cachedEntityRefs.splice(index, 1);
		},
		setLiveQuery(			state, {liveQuery, timestamp}) {
			liveQuery.timestamp = timestamp;
		},

		// SUBSCRIPTION
		pushSubscription(		state, {subscriptions, subscription}) {
			subscriptions.push(subscription);
		},
		spliceSubscription(		state, {subscriptions, index}) {
			subscriptions.splice(index, 1);
		},


		setSocket(state, socket) {
			state.socket = socket;
		},
	},
	actions: {
		// CACHED ENTITY
		//C these return a boolean indicating whether the action happened or if nothing changed
		async addCachedEntity(context, {entity, liveQuery}) {
			let added = false;


			//C shorthand
			const table = liveQuery.table;


			//C add cachedEntity to table if it doesn't exist
			if (!sj.isType(context.getters.findCachedEntity({table, entity}), sj.CachedEntity)) {
				context.commit('pushCachedEntity', {
					cachedEntities: table.cachedEntities, 
					cachedEntity: new sj.CachedEntity({table, entity})
				});
				//! don't set added here, because the cachedEntity could already exist and is just being added to a new liveQuery
			}

			//C find cachedEntity by entity
			const cachedEntity = context.getters.findCachedEntity({table, entity});
			if (!sj.isType(cachedEntity, sj.CachedEntity)) throw new sj.Unreachable({origin: 'addCachedEntity()'});

			//C shorthand
			const liveQueryRefs = cachedEntity.liveQueryRefs;
			const cachedEntityRefs = liveQuery.cachedEntityRefs;

			//C find references
			const foundLiveQueryRef = liveQueryRefs.includes(liveQuery);
			const foundCachedEntityRef = cachedEntityRefs.includes(cachedEntity);
			if (foundLiveQueryRef !== foundCachedEntityRef) throw new sj.Unreachable({
				origin: 'addCachedEntity()',
				reason: 'either cachedEntity or liveQuery had a reference to the other, but not in return, this should never happen',
				content: {
					foundLiveQueryRef,
					foundCachedEntityRef,
					cachedEntity,
					liveQuery,
				},
			});

			//C add refs to both liveQuery and cachedEntity if they don't exist
			if (!foundLiveQueryRef) {
				context.commit('pushLiveQueryRef', {liveQueryRefs, liveQuery});
				context.commit('pushCachedEntityRef', {cachedEntityRefs, cachedEntity});
				added = true;
			}

			//C the entity is considered 'added' if it's cachedEntity and the passed liveQuery are getting new references to each other
			return added;
		},
		async removeCachedEntity(context, {cachedEntity, liveQuery}) {
			//C find both reference indexes
			const cachedEntityRefIndex = liveQuery.cachedEntityRefs.indexOf(cachedEntity);
			if (cachedEntityRefIndex < 0) throw new sj.Error({
				origin: 'removeCachedEntity()',
				reason: 'cachedEntityRef not found in liveQuery',
			});
			const liveQueryRefIndex = cachedEntity.liveQueryRefs.indexOf(liveQuery);
			if (liveQueryRefIndex < 0) throw new sj.Error({
				origin: 'removeCachedEntity()',
				reason: 'liveQueryRef not found in cachedEntity',
			});

			//C remove references from each other
			context.commit('spliceCachedEntityRef', {
				cachedEntityRefs: liveQuery.cachedEntityRefs, 
				index: cachedEntityRefIndex
			});
			context.commit('spliceLiveQueryRef', {
				liveQueryRefs: cachedEntity.liveQueryRefs, 
				index: liveQueryRefIndex
			});

			//C if cachedEntity no longer has any liveQueryRefs
			if (cachedEntity.liveQueryRefs.length <= 0) {
				//C remove the cachedEntity
				const cachedEntityIndex = cachedEntity.table.cachedEntities.indexOf(cachedEntity);
				if (cachedEntityIndex < 0) throw new sj.Error({
					origin: 'removeCachedEntity()',
					reason: 'cachedEntity not found in table',
				});

				context.commit('spliceCachedEntity', {
					cachedEntities: cachedEntity.table.cachedEntities, 
					index: cachedEntityIndex
				});
			}

			

			//C the cachedEntity is considered 'removed' if it and the passed liveQuery losing their references to each other //! this shouldn't fail if proper arguments are passed
			return true;
		},
		async updateCachedEntity(context, {cachedEntity, entity, timestamp}) {
			let edited = false;

			//C if new data
			if (timestamp > cachedEntity.timestamp) {
				//C if different data
				if (!sj.deepMatch(cachedEntity.entity, entity)) {
					//C update data and timestamp
					context.commit('setCachedEntity', {
						cachedEntity, 
						entity, 
						timestamp
					});
					edited = true;
				} else {
					//C only update timestamp
					context.commit('setCachedEntity', {
						cachedEntity, 
						entity: cachedEntity.entity,
						timestamp,
					});
				}
			}

			//C the cachedEntity is considered edited if it's entity data has been changed
			return edited;
		},

		// LIVE QUERY
		async addLiveQuery(context, {table, query}) {
			//C if the liveQuery cannot be found
			if (!sj.isType(context.getters.findLiveQuery({table, query}), sj.LiveQuery)) {
				//C add it
				context.commit('pushLiveQuery', {liveQueries: table.liveQueries, liveQuery: new sj.LiveQuery({table, query})});
				
				//C find liveQuery
				const liveQuery = context.getters.findLiveQuery({table, query});
				if (!sj.isType(liveQuery, sj.LiveQuery)) throw new sj.Unreachable({origin: 'addLiveQuery()'});

				//C trigger the initial update
				await context.dispatch('updateLiveQuery', {liveQuery, callTimestamp: Date.now()});
			};

			//! do not update if it already exists, as this will cause cachedEntities to update without triggering callbacks
		},
		async removeLiveQuery(context, liveQuery) {
			//C shorten
			const table = liveQuery.table;


			//C find the liveQuery index
			const liveQueryIndex = table.liveQueries.indexOf(liveQuery);
			//C if it exists
			if (liveQueryIndex >= 0) {
				//C remove it
				context.commit('spliceLiveQuery', {
					liveQueries: table.liveQueries, 
					index: liveQueryIndex,
				});
			} else throw new sj.Error({
				origin: 'removeLiveQuery',
				reason: 'liveQuery not found in table',
			});
		},
		async updateLiveQuery(context, {liveQuery, callTimestamp = Date.now()}) {
			const pack = {
				updated: false,
				added: false,
				edited: false,
				removed: false,
			};

			//C shorten
			const {table, table: {Entity}, query} = liveQuery;

			//C don't trigger update for calls older than the existing data
			if (callTimestamp <= liveQuery.timestamp) {
				new sj.Warn({
					origin: 'update()',
					message: 'cachedEntities not updated because newer data has already been received',
					reason: `data timestamp: ${liveQuery.timestamp}, update timestamp: ${callTimestamp}`,
				});

				return pack;
			}

			//C fetch entities //TODO maybe put a timeout here? or just on the global Entity crud functions
			const {content: entities, timestamp} = await Entity.get(query);
			//C give the liveQuery the timestamp of the new data
			context.commit('setLiveQuery', {liveQuery, timestamp});
			//C updated is triggered only after entities are successfully retrieved from the server
			pack.updated = true;

			//! do not use asyncForEach loops here, these must be sequential because they use indexes which ended up getting messed up by parallel splices

			//C for each existing cachedEntity
			for (const cachedEntity of liveQuery.cachedEntityRefs) {
				//C if it is no longer included in the fetched entities
				if (entities.every(entity => entity.id !== cachedEntity.entity.id)) {
					//C remove it from the liveQuery
					const removed = await context.dispatch('removeCachedEntity', {cachedEntity, liveQuery});
					if (removed) {
						pack.removed = true;
					}
				}
			}
			
			//C for each retrieved entity
			for (const entity of entities) { //! not async for each, these need to be synchronous
				//C add it's cachedEntity (won't add if it already exists)
				const added = await context.dispatch('addCachedEntity', {entity, liveQuery});
				if (added) {
					pack.added = true;
				}

				//C find it's cachedEntity
				const cachedEntity = await context.getters.findCachedEntity({table, entity});
				if (!sj.isType(cachedEntity, sj.CachedEntity)) throw new sj.Unreachable({origin: 'update()'});

				//C edit the cachedEntity (won't edit if data is old, or unchanged)
				const edited = await context.dispatch('updateCachedEntity', {cachedEntity, entity, timestamp});
				if (edited) {
					pack.edited = true;
				}
			}

			return pack;
		},
		async triggerCallback(context, {liveQuery, callbackName}) {
			for (const subscription of liveQuery.subscriptions) {
				subscription[callbackName]();
			}
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
				reason: 'liveQuery not found in table',
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
			//C shorten
			const liveQuery = subscription.liveQuery;

			//C remove subscription
			const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);
			if (subscriptionIndex >= 0) {
				context.commit('spliceSubscription', {
					subscriptions: liveQuery.subscriptions,
					index: subscriptionIndex,
				});
			} else throw new sj.Error({
				origin: 'removeSubscription',
				reason: 'subscription not found in liveQuery',
			});

			//C if liveQuery no longer has any subscriptions
			if (liveQuery.subscriptions.length <= 0) await context.dispatch('removeLiveQuery', liveQuery);
		},

		// ENDPOINTS
		//C these require argument validation
		async subscribe(context, {
			Entity, 
			query, 
			options = {}
		}) {
			//C validate
			//TODO how to check if class is subclass, because this is getting ridiculous
			//L: https://stackoverflow.com/questions/40922531/how-to-check-if-a-javascript-function-is-a-constructor
			if (!Object.getPrototypeOf(Entity) === sj.Entity) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'Entity is not an sj.Entity',
				content: Entity,
			});
			if (!sj.isType(query, Object) && !sj.isType(query, Array)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'query is not an Object',
				content: query,
			});
			if (!sj.isType(options, Object)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'options is not an Object',
				content: options,
			});

			//C shorten
			const table = context.getters.findTable(Entity);
			if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
				origin: 'subscribe()', 
				reason: 'table is not an sj.LiveTable',
				content: table,
			});
			

			//C subscribe on server 
			const preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
			const processedQuery = await context.dispatch('serverSubscribe', {table, query: preparedQuery});

			//C add subscriber, from this point data will live-update
			const subscription = await context.dispatch('addSubscription', {table, query: processedQuery, options});

			//C return the subscription
			return subscription;
		},
		async unsubscribe(context, {
			subscription,
			strict = false, //C subscription must be an sj.Subscription and must be included in it's liveQuery.subscriptions
		}) {
			//C validate //! return early if not a subscription
			if (!sj.isType(subscription, sj.Subscription)) {
				if (strict) throw new sj.Error({
					origin: 'unsubscribe()', 
					reason: 'subscription is not an sj.Subscription',
					content: subscription,
				});
				else return null;
			}
			
			//C shorten
			const liveQuery = subscription.liveQuery;
			if (!sj.isType(liveQuery, sj.LiveQuery)) throw new sj.Error({
				origin: 'unsubscribe()',
				reason: `liveQuery is not an sj.LiveQuery`,
				content: liveQuery,
			});
			const query = liveQuery.query;
			if (!sj.isType(query, Object) && !sj.isType(query, Array)) throw new sj.Error({
				origin: 'unsubscribe()', 
				reason: 'query is not an Object',
				content: query,
			});
			const table = liveQuery.table;
			if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
				origin: 'unsubscribe()', 
				reason: 'table is not an sj.LiveTable',
				content: table,
			});
			const Entity = table.Entity;
			if (!Object.getPrototypeOf(Entity) === sj.Entity) throw new sj.Error({
				origin: 'unsubscribe()', 
				reason: 'Entity is not an sj.LiveTable',
				content: Entity,
			});
			

			//C unsubscribe on server
			const preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
			const processedQuery = await context.dispatch('serverUnsubscribe', {table, query: preparedQuery});

			//C remove subscription from it's liveQuery
			if (strict || liveQuery.subscriptions.includes(subscription)) await context.dispatch('removeSubscription', subscription);

			//C return null for null subscription
			return null;
		},
		async update(context, {
			Entity, 
			query, 
			timestamp,
		}) {
			//C validate
			if (!Object.getPrototypeOf(Entity) === sj.Entity) throw new sj.Error({
				origin: 'update()', 
				reason: 'Entity is not an sj.Entity',
				content: sj.image(Entity),
			});
			if (!sj.isType(query, Object) && !sj.isType(query, Array)) throw new sj.Error({
				origin: 'update()', 
				reason: 'query is not an Object',
				content: sj.image(query),
			});
			if (!sj.isType(timestamp, 'integer')) timestamp = Date.now();

			//C shorten
			const table = context.getters.findTable(Entity);
			if (!sj.isType(table, sj.LiveTable)) throw new sj.Error({
				origin: 'update()', 
				reason: 'table is not an sj.LiveTable',
				content: {
					Entity: sj.image(Entity),
					table: sj.image(table),
				},
			});
			const liveQuery = context.getters.findLiveQuery({table, query});
			if (!sj.isType(liveQuery, sj.LiveQuery)) throw new sj.Error({
				origin: 'update()',
				reason: `liveQuery is not an sj.LiveQuery`,
				content: {
					query: sj.image(query),
					table: sj.image(table),
					liveQuery: sj.image(liveQuery),
				},
			});

			//C update
			const pack = await context.dispatch('updateLiveQuery', {liveQuery, callTimestamp: timestamp});

			//C trigger callbacks
			if (pack.updated)	await context.dispatch('triggerCallback', {liveQuery, callbackName: 'onUpdate'});
			if (pack.added)		await context.dispatch('triggerCallback', {liveQuery, callbackName: 'onAdd'});
			if (pack.edited)	await context.dispatch('triggerCallback', {liveQuery, callbackName: 'onEdit'});
			if (pack.removed)	await context.dispatch('triggerCallback', {liveQuery, callbackName: 'onRemove'});
		},
		async change(context, {
			// OLD
			subscription,
			strict = false,
				
			// NEW
			Entity,
			query,
			options = {},
		}) {
			//G subscribes to a new subscription, unsubscribes from an old one

			//C strict check here throws or lets function execute //! doesn't early return
			//R strict check is done here in addition to unsubscribe so that the new subscription is not added if the strict check fails
			if (strict && !sj.isType(subscription, sj.Subscription)) throw new sj.Error({
				origin: 'change()', 
				reason: 'subscription is not an sj.Subscription',
				content: subscription,
			});
			//C subscribe to new
			const newSubscription = await context.dispatch('subscribe', {
				Entity, //! Entity cannot be derived from the old subscription as it may not be an sj.Subscription if the function call is not strict
				query,
				options,
			});
			//C unsubscribe from old //! don't await here, we want the swap to happen as quick as possible 
			context.dispatch('unsubscribe', {subscription, strict}); 
			//C return new subscription
			return newSubscription;
		},

		// SERVER
		async serverSubscribe(context, {table, query}) {
			return await new Promise((resolve, reject) => {
				const timeoutId = sj.setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket - subscribe timed out',
					}));
				}, context.state.timeout);

				context.state.socket.emit('subscribe', {table: table.Entity.table, query}, result => {
					clearTimeout(timeoutId);
					if (sj.isType(result, sj.Error)) reject(result);
					else resolve(result);
				});
			}).then(sj.content).catch(sj.propagate);
		},
		async serverUnsubscribe(context, {table, query}) {
			await new Promise((resolve, reject) => {
				const timeoutId = sj.setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket - unsubscribe timed out',
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
					await context.dispatch('serverSubscribe', {table, query: liveQuery.query});
				}
			}
		},
		async disconnect(context) {
			for (const table in context.state.tables) {
				for (const liveQuery of table.liveQueries) {
					await context.dispatch('serverUnsubscribe', {table, query: liveQuery.query});
				}
			}
		},

		//TODO refactor add if not exists to be simpler like the server side (but remember the redundancy check)

		async start(context, socket) { 
			//G this should be called in the main vue created()

			/* this feels wrong, because the context referenced here might not be the same context referenced by a component using these functions, thus there might be two different sets of liveData
				//C sj.Entity classes have a subscribe() method that auto-fills the Entity type
				sj.Entity.augmentClass({
					staticProperties: parent => ({
						async subscribe(query, options) {
							return await context.dispatch('subscribe', {
								Entity: this,
								query,
								options,
							});
						},
						async update(query, timestamp) {
							return await context.dispatch('update', {
								Entity: this,
								query,
								timestamp,
							});
						},	
					}),
				});
				//C sj.Subscription class has an unsubscribe() method that auto-fills the subscription itself
				sj.Subscription.augmentClass({
					prototypeProperties: parent => ({
						async unsubscribe() {
							return await context.dispatch('unsubscribe', {
								subscription: this,
							});
						},
						getLiveData() {
							//TODO this might not be reactive
							return context.getters.getLiveData(this);
						},
					}),
				});
			*/


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
				console.warn('u');
				//---------- subscription isn't being removed on server side
				context.dispatch('update', {Entity, query, timestamp});
			});

			//C socket test
			//TODO rewrite this
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
			//await context.state.socket.test();

			
			//C module test
			await context.dispatch('test');
		},

		async test(context) {
			//C this delay exists to wait for any subscriptions on the page to process before executing these tests, as foreign activity interferes with the success of some of these tests
			await sj.wait(2000);

			const tests = [];

			const uniqueName = () => `liveQuery${sj.makeKey(7)}`;
			const uniqueDuration = () => Math.round(Math.random()*100000);

			let updated = false;
			//C rapidly checks updated until it is true, then resets it
			const waitForUpdate = async function () {
				await sj.recursiveAsyncTime(2000, result => {
					if (updated) {
						updated = false;
						return true;
					} else {
						return false;
					}
				}, async o => {
					await sj.wait(o.delay);
					o.delay = o.delay * 1.25;
					return;
				}, {delay: 50});
			};

			// CREATE
			const user = await new sj.User({
				name: uniqueName(),
				email: uniqueName(),
				password: 'placeholder',
				password2: 'placeholder',
			}).add().then(sj.content).then(sj.one);
			const playlist = await new sj.Playlist({
				userId: user.id,
				name: uniqueName(),
				description: 'placeholder',
			}).add().then(sj.content).then(sj.one);
			const track = await new sj.Track({
				playlistId: playlist.id,
				source: sj.spotify,
				sourceId: 'placeholder',
				name: uniqueName(),
				duration: uniqueDuration(),
			}).add().then(sj.content).then(sj.one);

			
			// MAKE SUBSCRIPTION
			let onAddCount = 0;
			let onEditCount = 0;
			let onRemoveCount = 0;

			
			const trackSubscription = await context.dispatch('subscribe', {
				Entity: sj.Track,
				query: {name: track.name},
				options: {
					onUpdate() {
						updated = true;
					},
					onAdd() {
						onAddCount++;
					},
					onEdit() {
						onEditCount++;
					},
					onRemove() {
						onRemoveCount++;
					},
				},
			});
			tests.push(
				['isSubscription', sj.isType(trackSubscription, sj.Subscription)]
			);

			
			// ITERATE
			const iterations = Math.round(Math.random() * 10) + 5;
			const xTracks = [];

			// BEFORE
			const entityRefsLengthBefore = trackSubscription.liveQuery.cachedEntityRefs.length;
			const entitiesLengthBefore = trackSubscription.liveQuery.table.cachedEntities.length;
			const addedBefore = 0;
			const editedBefore = 0;
			const removedBefore = 0;
			tests.push(
				['cachedEntityRefs length before',
				trackSubscription.liveQuery.cachedEntityRefs.length === entityRefsLengthBefore],
				['cachedEntities length before',
				trackSubscription.liveQuery.table.cachedEntities.length === entitiesLengthBefore],
				['lengthBefore',	context.getters.getLiveData(trackSubscription).length === entityRefsLengthBefore],

				['noneAdded',		onAddCount === addedBefore],
				['noneEdited',		onEditCount === editedBefore],
				['noneRemoved',		onRemoveCount === removedBefore],
			);		
			
			// ADD
			await waitForUpdate();
			for (let i = 0; i < iterations; i++) {
				xTracks[i] = await new sj.Track({
					...track, 
					position: undefined,
				}).add().then(sj.content).then(sj.one);
			}
			await waitForUpdate();
			tests.push(
				['cachedEntityRefs length afterAdd',
				trackSubscription.liveQuery.cachedEntityRefs.length === entityRefsLengthBefore + iterations],
				['cachedEntities length afterAdd',
				trackSubscription.liveQuery.table.cachedEntities.length === entitiesLengthBefore + iterations],
				['lengthAfterAdd',		context.getters.getLiveData(trackSubscription).length === entityRefsLengthBefore + iterations],

				['xAddedAfterAdd',		onAddCount === iterations],
				['xEditedAfterAdd',		onEditCount === editedBefore],
				['xRemovedAfterAdd',	onRemoveCount === removedBefore],
			);

			// EDIT
			for (let i = 0; i < iterations; i++) {
				xTracks[i].duration = uniqueDuration();
				await xTracks[i].edit();
			}
			await waitForUpdate();
			tests.push(
				['cachedEntityRefs length afterEdit',
				trackSubscription.liveQuery.cachedEntityRefs.length === entityRefsLengthBefore + iterations],
				['cachedEntities length afterEdit',
				trackSubscription.liveQuery.table.cachedEntities.length === entitiesLengthBefore + iterations],
				['lengthAfterEdit', context.getters.getLiveData(trackSubscription).length === entityRefsLengthBefore + iterations],

				['xAddedAfterEdit', onAddCount === iterations],
				['xEditedAfterEdit', onEditCount === iterations],
				['xRemovedAfterEdit', onRemoveCount === removedBefore],
			);

			// REMOVE
			for (let i = iterations-1; i > -1; i--) { 
				//! remove in reverse order, as original order caused the re-ordering of track positions, causing an onEdit callback for all tracks
				await xTracks[i].remove();
			}
			await waitForUpdate();
			tests.push(
				['cachedEntityRefs length afterRemove',
				trackSubscription.liveQuery.cachedEntityRefs.length === entityRefsLengthBefore],
				['cachedEntities length afterRemove',
				trackSubscription.liveQuery.table.cachedEntities.length === entitiesLengthBefore],
				['lengthAfterRemove', context.getters.getLiveData(trackSubscription).length === entityRefsLengthBefore],

				['xAddedAfterRemove', onAddCount === iterations],
				['xEditedAfterRemove', onEditCount === iterations],
				['xRemovedAfterRemove', onRemoveCount === iterations],
			);

			await context.dispatch('unsubscribe', {subscription: trackSubscription, strict: true});
			
			// DELETE
			await track.remove();
			await playlist.remove();
			await user.remove();

			//TODO add tests for convergent liveQueries
			await sj.test([
				...tests,
			], 'liveQuery');
		},
	},
};