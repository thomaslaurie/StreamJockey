// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //L don't use arrow functions on any component options properties (created, data, etc.) as this will not be available: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
    //L methods vs computed vs watch: https://flaviocopes.com/vue-methods-watchers-computed-properties/

    //R use null in places where there should be an manually placed empty value - distinguishes between unintentional empty values: undefined, and intentional empty values: null
    //L "To distinguish between the two, you may want to think of undefined as representing an unexpected absence of value and null as representing an expected absence of value."
    //L http://ryanmorr.com/exploring-the-eternal-abyss-of-null-and-undefined/
    
    //L using computed to swap dynamic components: https://alligator.io/vuejs/dynamic-components
    //L referencing registered components: https://forum.vuejs.org/t/list-registered-vue-components/7556

    //L https://vuejs.org/v2/cookbook/form-validation.html
	
    //! DONT USE ARROW FUNCTIONS: //L https://vuejs.org/v2/guide/instance.html#Data-and-Methods




    //R figuring out async loading of data, and how to handle display, laoding, and error states
	//C async components
		async components are created by using 'factory functions' in place of the component object, 
		these return promises which are only resolved when the component needs to be rendered.
		furthermore - for error handling, this factory function can also return an object with 
		{
			component: [promise], 
			loading: [component], 
			error: [component], 
			delay: [number ms], 
			timeout: [number ms],
		}
		which renders the respective component based on the state of the component promise (resolved, loading, or rejected)
		
		//L https://vuejs.org/v2/guide/components-dynamic-async.html#Handling-Loading-State


	//C arrow functions can have an implicit return, but for object literals, they need to be wrapped in parenthesis to be distinguished from the function block 
	//L https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

	//R async components don't seem to have any way to pass props, they seem to only be meant to load components from files,
	//R i want to use them because the loading, error, delay, etc. stuff sounds great - might have to manually create an asyc data loader like this however, or maybe try to access props outside/before component is created? 
	//L this way? https://stackoverflow.com/questions/38344091/vuejs-can-we-give-props-to-async-component-via-dynamic-component-pattern-compo

    old
    let PlaylistListItem = Vue.component('playlist-list-item', () => {
            return {
                //C The component to load (should be a Promise)
                //! immediately invoking async function because component must receive a promise, not a function (unlike the surrounding factory function)
                //L parenthesis around function turns it from a definition into an expression (which is then invoked): https://flaviocopes.com/javascript-iife/
                component: (async function {
                    // let playlist = await sj.getPlaylist(new sj.Playlist({
                    //     id: //TODO,
                    // }));
                    await sj.wait(2000);
                    
                    // let _this = this;
                    // this.$nextTick(() => {
                    //     console.log('HERE: ', JSON.stringify(_this.$options._parentVnode.data));
                    // });

                    //console.log('ID:', id);

                    let playlist = new sj.Playlist({
                        //id: id,
                        name: 'test',
                    });

                    return {
                        data: () => ({
                            playlist: playlist,
                        }),
                        props: {
                            id: Number,
                        },
                        template: `
                            <li class='playlist-list-item'>
                                <p>blah{{id}}blah</p>
                                <p>{{playlist.name}}</p>
                                <button>Open</button>
                                <button>Play</button>
                            </li>
                        `,
                    }
                })(),

                //C A component to use while the async component is loading
                loading: {
                    template: `
                        <p>LOADING</p>
                    `,
                },

                //C A component to use if the load fails
                error: {
                    template: `
                        <p>ERROR</p>
                    `,
                },

                //C Delay before showing the loading component. Default: 200ms.
                delay: 500,

                //C The error component will be displayed if a timeout is provided and exceeded. Default: Infinity.
                //! though this cannot be 'Infinity' or large numbers(?) because of how setTimeout() works: 
                //L https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
                //timeout: 10000,
            }
    });


	//L how to use dynamic components: https://alligator.io/vuejs/dynamic-components/

	//R locally registering a component doesn't instance it into the parent component, it just makes it available to use as a html tag that vue will recognize, therefore for dynamic components which only use the <component> tag, is it even necessary to register them?
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
	//TODO//L list transitions: https://medium.freecodecamp.org/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321

    //TODO //L dynamic list rendering: https://medium.freecodecamp.org/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321
    
    
	//? is v-model secure? it updates a variable with whatever is in the input
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// external
//L https://cdn.jsdelivr.net/npm/vue@2.6.8/dist/vue.esm.browser.js //! renamed from .js to .mjs
import Vue from './vue.esm.browser.mjs'; 
//L https://unpkg.com/vue-router@3.0.2/ //! renamed from .js to .mjs, manually converted to esm (remove closure & export default instead of return)
import VueRouter from './vue-router.esm.browser.mjs';
//L https://unpkg.com/vuex@3.1.0/dist/vuex.esm.js //! renamed from .js to .mjs, manually converted to browser (removed process.env.NODE_ENV !== 'production' references)
import VueX from './vuex.esm.browser.mjs'; 

import SocketIo from 'socket.io-client';

// internal
import sj from './global-client.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

Vue.use(VueRouter);
Vue.use(VueX);
Vue.mixin({
    //L global mixins: https://vuejs.org/v2/guide/mixins.html#Global-Mixin, so that sj does not have to be imported into every component
    data() {
        return {
            sj,
        };
    },
});


const databaseSocket = new SocketIo('/database');

// databaseSocket.on('update', data => {
// 	store.dispatch('updateMirror', data);
// });

sj.testRun = async function (store) {
	let queryEntity = new sj.Track({id: 65});
	let subscriber = 'test subscriber';
	console.log('DB MIRROR BEFORE:', JSON.stringify(store.state.databaseMirror.tracks));
	await store.dispatch('subscribe', {queryEntity, subscriber});
	console.log('DB MIRROR DURING:', JSON.stringify(store.state.databaseMirror.tracks));
	await store.dispatch('unsubscribe', {queryEntity, subscriber});
	console.log('DB MIRROR AFTER:', JSON.stringify(store.state.databaseMirror.tracks));
}

/* //R  
	how to sync server data with vuex? updating parent components, unrelated components, etc. is a nightmare - which is what vuex is for anyways
	//L https://forum.vuejs.org/t/vuejs-vuex-data-synchronization-with-server-backend/16340/2

	global event bus that calls the object type (user, playlist, track, etc) and its id when updated - this prompts anything using that object to refresh

	vuex store of 'watched' objects, when getSomething is called it adds the item to the list and the component itself to the item's watchers list - the component then uses this item in the object's store, any updates are propagated - when the component is destroyed the watcher is removed, when the last watcher is remove the item is removed, when an item is deleted the parent item (a playlist or something) will also have to watch it and update somehow, if its just the single item the component refreshes as normal and displays a not found error

	or just find an existing library that does this

	//! the entire database must not be synced, it must just be the data that is currently used by components, anything that is destroyed and reappears will update when it fetches its data
*/
/* //R live database: 
	//C if an item in a list is refreshed and manually retrieves its own unique query (query only by id), it will add its own query in the mirrored database, if the parent list updates, then it switches back reactively based on p-data (the switch will have to include a destroy for the individual query), but this creates duplicate data and wont this mess up other foreign components representing the same data?

	//C what if any queries with multiple results just have references to single queries?

	//C the key should be the query itself

	//C encoding keys into a string could mess up types by converting them all into strings, however this shouldn't be an issue as each column in the database only ever has one type

	//? how will the mirrored database interact with non-async components, those that have been passed data without querying it via p-data? maybe still give it a reference but put it in a different list than 'watchers'?

	//someGetMethod = () {
		//send http get method with subscribe parameter set to databaseSocket.id
		// or this could also be sent as a second request throught he socket - because it can run through the same validation and therefroe shoud be exactly the same
		// get the data, store it in the mirrored database, add itself to the watcher list
		// return the refrence to the data in the mirrored database

	//}
	//onUnneeded = () {
		// when the data is no longer needed, the component destroys itself, and should call the unGet function - the removes the watcher from the mirrored data
		// if all watchers are gone, destroy the mirrored data
		// send an event to the server to remove the subscription
	//}

	//onServe = () {
		// filters down to database method, 
		//after validating return to be got values, 
		//add the socket id to a room with the same name as the stringified query
	//}

	// in every create, edit, and delete database method, before returning, send the returned values to a notification queue (all of these should be the changed entries)
	//TODO this will not catch some items if there are permission limitations - so maybe the enire object has to be returned and then filtered script-side? but even then wont this just call updates on items the subscriber doesn't even have access to? would a permission check need to be implemented?
	// for each item in the notification queue, sort through open rooms and see if they match the item, if they do, send an event to every socket in the room

	//C to match multiple queries, the socket subscription must parse the multiQuery and split it into single queries, to do direct string matching - do this client side
	//! socket and http methods must go through the same validator on the server side

	//? one more issue: how do i prevent events being broadcast to clients for private entries (ie clients dont have permission to view), this works as it is but basically it will trigger the client to update whenever something that matches updates server-side, but that is private so the client receives no new information- maybe consider putting permissions as part of the database query so it also applies to the rooms?
*/
sj.QueryMirror = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.giveParent(options));

		this.objectType = 'sj.QueryMirror';

		sj.Object.init(this, options, {
			query: undefined,
			subscribers: [], 
			timestamp: 0, 
			content: [],
		});

		this.onCreate();
	}
}
sj.EntityMirror = class extends sj.QueryMirror {
	//! query should only have one id parameter
	//! subscribers list can include both component subscribers and parent QueryMirror subscribers
	//C EntityMirrors without any component subscribers won't be subscribed to on the server, they will be only updated by their parent QueryMirror
	//G if an entity is referenced by multiple parent QueryMirrors - it will be called to update multiple times - to avoid this, ensure the same timestamp is generated once on the server when an entity is changed, that way it's mirror on the client will only update once per server update

	//C same as QueryMirror
	constructor(options = {}) {
		super(sj.Object.giveParent(options));

		this.objectType = 'sj.EntityMirror';

		sj.Object.init(this, options, {});

		this.onCreate();
	}
}


//  ██╗   ██╗██╗   ██╗███████╗
//  ██║   ██║██║   ██║██╔════╝
//  ██║   ██║██║   ██║█████╗  
//  ╚██╗ ██╔╝██║   ██║██╔══╝  
//   ╚████╔╝ ╚██████╔╝███████╗
//    ╚═══╝   ╚═════╝ ╚══════╝

import AppMain from '../vue/main/AppMain.vue';
import HomePage from '../vue/page/HomePage.vue';
import UserPage from '../vue/page/UserPage.vue';
import PlaylistPage from '../vue/page/PlaylistPage.vue';
import TrackPage from '../vue/page/TrackPage.vue';
import AddPlaylistPage from '../vue/page/AddPlaylistPage.vue';
import TestPage from '../vue/page/TestPage.vue';
import EntryPage from '../vue/page/EntryPage.vue';
import AuthRedirectPage from '../vue/page/AuthRedirectPage.vue';
import ErrorPage from '../vue/page/ErrorPage.vue';
import NotFoundPage from '../vue/page/NotFoundPage.vue';

const router = new VueRouter({
	//L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
	mode: 'history',
	routes: [
		{
			path: '/',
			component: AppMain,
			children: [
                {
                    path: '/',
					component: HomePage,
                },
				{
					path: '/user/:id',
					component: UserPage,
				},
				{
					path: '/playlist/:id',
					component: PlaylistPage,
				},
				{
					path: '/track/:id',
					component: TrackPage,
                },
                {
                    path: '/add',
                    component: AddPlaylistPage,
                },
                {
                    path: '/test',
                    component: TestPage,
                },
			],
        },
        {
            //C login is outside the AppMain component (it doesn't have a menu bar, player bar, etc.), its a barebones entry point
			path: '/login',
			component: EntryPage,
        },
		{
			path: '/error',
			component: ErrorPage,
        },
        {
            path: '/*/authRedirect',
			component: AuthRedirectPage,
        },
		{ 
			//C catch invalid url paths 
			path: '*',
			component: NotFoundPage,
		}
	],
});
const store = new VueX.Store({
	state: {
		//me: null, //TODO probably replace this with a NoUser object so that functions don't break
		//? if user needs to be stored here (they dont, that happens with sessions atm) //L handle page refreshes: https://github.com/robinvdvleuten/vuex-persistedstate

		//TODO consider having the table as another parameter in the encoded query?
		databaseMirror: {
			[sj.User.table]: {},
			[sj.Playlist.table]: {},
			[sj.Track.table]: {},
		},
	},
	actions: { //! all actions are async via dispatch('functionName', payload)
		async subscribe(context, {queryEntity, subscriber, timeout}) {
			//C submit a query to get from the server, mirror it, and register the subscriber

			//C validate
			if (!sj.isType(queryEntity, sj.Entity)) {
				throw new sj.Error({
					origin: 'vuex subscribe()',
					message: 'queryEntity is not a user, playlist, or track'
				});
			}
						
			//C encode queryEntity
			let query = sj.encodeList(queryEntity.filters.get);
			//C alias
			let table = queryEntity.constructor.table;

			//C subscribe to the query
			query = await new Promise((resolve, reject) => {
				databaseSocket.emit('SUBSCRIBE', query, result => {
					if (sj.isType(result, sj.Error)) {reject(result)}
					resolve(result); //C modified query is returned in the content
				});

				setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket subscription timed out',
					}));
				}, 10000); //TODO default timeout
			}).then(sj.content).catch(sj.propagate);

			//C add subscriber to the mirrored database, from here on it will live update //! sj.Objects must have their table property
			await context.dispatch('addSubscriber', {table, query, subscriber});

			//C trigger a manual update
			await context.dispatch('updateQuery', {table, query, timestamp: Date.now()});

			//C return the query item's data
			//C no components will update until this is done - so no need to worry about flickering
			return context.getters.getQueryData(table, query);
		},
		async unsubscribe(context, {queryEntity, subscriber}) {
			let query = sj.encodeList(queryEntity.filters.get);
			let table = queryEntity.constructor.table;

			await context.dispatch('deleteSubscriber', {table, query, subscriber});
		},
		
		async updateQuery(context, {table, query, timestamp}) {
			//C verify that QueryMirror exists, and that notification is newest
			let queryTable = context.state.databaseMirror[table];
			if (!sj.isType(queryTable[query], sj.QueryMirror)) {
				throw new sj.Error({
					origin: 'vuex update() action',
					message: 'could not find item to update',
					content: queryTable[query],
				});
			}
			if (!(timestamp > queryTable[query].timestamp)) {
				//C don't update if the update notification is older than existing information
				return 'something'; //TODO

				//!//? potential issue here: what if old entities are received and those old entities dont include new entities - then the new ones will be unsubscribed - won't this part also need a timestamp check? also up in the new subscription

				//TODO it seems like theres a ton of potential edge-case issues here with the timestamp checks, 
				//TODO consider the difference between the socket notification timestamp and the http data request timestamp
				//TODO consider the difference between add subscription, edit data, and delete subscription, how are they affected by the timestamp?
			}

			//C decode it's query
			let decoded = sj.decodeList(query);
			//C assign the proper database entity class and send it's http GET request
			let entities;
			if (table === 'users') {
				entities = await sj.User.get(decoded).then(sj.content);
			} else if (table === 'playlists') {
				entities = await sj.Playlist.get(decoded).then(sj.content);
			} else if (table === 'tracks') {
				entities = await sj.Track.get(decoded).then(sj.content);
			}

			if (sj.isType(queryTable[query], sj.EntityMirror)) {
				//C if the QueryMirror is a EntityMirror (unique query to a single database entity), update it's data directly
				context.commit('editQueryMirror', {table, query, props: {
					content: sj.one(entities), //? should this be wrapped in an array? (see sj.EntityMirror class)
				}});
			} else {
				//C otherwise, QueryMirrors are are responsible for updating the EntityMirrors they are subscribed to and their references to these EntityMirrors
				//! always ensure this will create an EntityMirror not a QueryMirror (ie. no nesting of QueryMirrors), or things will break
				
				let newReferences = [];
				await sj.asyncForEach(entities, async entity => {
					let entityQuery = sj.encodeList(sj.shake(entity), ['id']);

					//C if this entity is new to the query results, add this QueryMirror as a subscriber (if it already exists, nothing changes)
					await context.dispatch('addSubscriber', {table, query: entityQuery, subscriber: queryTable[query]});

					//C update the data, though only if it is new
					if (queryTable[entityQuery].timestamp < timestamp) {
						context.commit('editQueryMirror', {table, query: entityQuery, props: {
							content: entity,
						}});
					}

					//C push reference to a temporary list
					newReferences.push(tableMirror[entityQuery]);
				});

				//C if an existing entity reference has been removed from the query results, remove this QueryMirror as a subscriber
				let newReferenceQueries = newReferences.map(reference => reference.query);
				await sj.asyncForEach(queryTable[query].content, async entityMirror => {
					if (!(entityMirror.query in newReferenceQueries)) {
						await context.dispatch('deleteSubscriber', {table, query: entityMirror.query, subscriber: queryTable[query]});
					}
				});

				//C swap in the new references
				context.commit('editQueryMirror', {table, query, props: {
					content: newReferences,
				}});

				//console.log('updateQuery() - updated query', queryTable[query]);
			}
		},

		async addSubscriber(context, {table, query, subscriber}) {
			//! this does not refer directly to the queryMirror because ...[table][query] must be assigned a reference below
			let tableMirror = context.state.databaseMirror[table]; 

			if (!sj.isType(tableMirror[query], sj.QueryMirror)) {
				//C create a new query mirror if it doesn't exist (or replace if not a query mirror)

				let props = {
					query, //C this property exists for readability, //!//TODO should not be changed
					subscribers: [subscriber],
				};

				let queryMirror;
				let decodedQuery = sj.decodeList(query);
				if (decodedQuery.length === 1 && Object.keys(decodedQuery).length === 1 && decodedQuery.id !== undefined) {
					//C initialize an entity mirror if query refers to a single entity, (should have 1 query object with 1 id parameter)
					queryMirror = new sj.EntityMirror(props);
				} else {
					//C otherwise initialize a query mirror
					queryMirror = new sj.QueryMirror(props);
				}
				context.commit('replaceQueryMirror', {table, queryMirror});

				//console.log('addSubscriber() - added new query mirror for new subscriber', tableMirror[query], subscriber);
			} else {
				//C add a new subscriber if a query mirror already exists
				if (!(subscriber in tableMirror[query].subscribers)) {
					context.commit('editQueryMirror', {table, query, props: {
						subscribers: tableMirror[query].subscribers.concat(subscriber),
					}});
				}

				//console.log('addSubscriber() - added new subscriber subscriber', tableMirror[query], subscriber);
			}
		},
		async deleteSubscriber(context, {table, query, subscriber}) {
			let queryTable = context.state.databaseMirror[table];
			if (sj.isType(queryTable[query], sj.QueryMirror)) {
				//C find subscriber in subscribers
				let i = queryTable[query].subscribers.indexOf(subscriber);
				if (i >= 0) {
					context.commit('editQueryMirror', {table, query, props: {
						//! do not use splice here as it modifies the original array
						subscribers: queryTable[query].subscribers.filter(existingSubscriber => existingSubscriber !== subscriber),
					}});
					//console.log('deleteSubscriber() - removed subscriber', queryTable[query], subscriber);
				}
				//C if no more subscribers exist, delete the item
				if (queryTable[query].subscribers.length <= 0) {
					//console.log('deleteSubscriber() - removing item', queryTable[query]);
					context.commit('deleteQueryMirror', {table, query});
				}
			} else {
				//console.warn('VueX: deleteSubscriber() - not found or wrong item query type:', state.databaseMirror[table][query]);
			}
		},

	},
	mutations: { //G these are bare-bones setters, data should already be checked and formatted
		// database sync
		replaceQueryMirror(state, {table, queryMirror}) {
			//console.log(`called replaceQueryMirror(table: ${table}, queryMirror: ${queryMirror})`);
			state.databaseMirror[table][queryMirror.query] = queryMirror;
		},
		editQueryMirror(state, {table, query, props}) {
			//console.log(`called editQueryMirror(table: ${table}, query: ${query}, props: ${props})`);
			Object.keys(props).forEach(key => {
				state.databaseMirror[table][query][key] = props[key];
			});
		},
		deleteQueryMirror(state, {table, query}) {
			//console.log(`called deleteQueryMirror(table: ${table}, query: ${query})`);
			delete state.databaseMirror[table][query];
		},
	},
	getters: {
		// database sync
		getQueryData: state => (table, query) => {
			if (sj.isType(state.databaseMirror[table][query], sj.EntityMirror)) {
				return sj.one(entity.content);
			} else {
				//! QueryMirrors should never be nested, otherwise a recursive data fetch would be required
				return state.databaseMirror[table][query].content.map(entity => {
					return sj.one(entity.content);
				});
			}
		},
	},
});
const vm = new Vue({
	el: '#app',
	router,
	store,
});

sj.testRun(store);