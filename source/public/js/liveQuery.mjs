import sj from './global-client.mjs';

/* //R	Live Data - Thought Process
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
*/

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
				const Entity = sj.tableToEntity(table);
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