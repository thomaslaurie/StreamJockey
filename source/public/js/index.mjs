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

import SocketIO from 'socket.io-client';

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

// temp
sj.makeKey = function (length) {
    //C use only characters allowed in URLs
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
};

const databaseSocket = new SocketIO('/database');

databaseSocket.test  = async function () {
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
			databaseSocket.emit('SUBSCRIBE', queryPack, result => {
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
		databaseSocket.on('NOTIFY', notifyResult => {
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
			databaseSocket.emit('UNSUBSCRIBE', queryPack, result => {
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
		
	], 'databaseSocket.test()');


	delete sj.Track.placeholder;
	delete sj.Playlist.placeholder;
	delete sj.User.placeholder;
};

databaseSocket.on('connect', async () => {
	//databaseSocket.test();
});

databaseSocket.on('disconnect', async (reason) => {
	//TODO client must re-subscribe everything in the database mirror when the socket disconnects then reconnects
	//C client is responsible for re-subscribing on connect, server is responsible for removing subscriptions on disconnect
});







//TODO consider putting specific listeners into the mirrored database instead of having a generic event listener


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
import DatabasePage from '../vue/page/DatabasePage.vue';


//R two approaches: use a rest request to subscribe and start the socket process, or using a socket request to subscribe and fetch via rest
//R rest doesn't make as much sense as no method matches exactly what is being done (need to add a subscriber by sending a query and a socket id)
//R maybe: use a subscribe request, which returns the initial query results, then updates via the socket - completely bypassing any get request
//R or keep rest requests for transmitting data, just use the socket to transmit changes

/*

	server-side database changes:

	--> any user changes the database
		adds an entity
		edits an entity
		removes an entity
		get can be ignored
	the function executes as normal, but also dispatches (without awaiting) the event to [somewhere]
		this event includes the entity with all of its (queriable) properties (not just id, because get may query by any property)
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
		make a module that offers spreads for vuex

	-> component calls vuex to subscribe to a query
	<-- query is sent to server via socket to subscribe
	--> validated query gets returned from socket
	setup query mirror in vuex
	send get request for initial data
	give the query mirror the data
	<- return the reference to the query mirror data

	--> socket receives an event that a query has updated
	<-- trigger a new get request for the query identified by the table, & query
	--> receive new data
	update

	-> component calls vuex to unsubscribe from a query (on destroy, or query change)
	<-- send a socket message to unsubscribe
	--> receive success
	remove the query mirror
	<- return success
*/

//R I initially thought that encoding a query object as a string and using it as the subscription key would increase performance by decreasing lookup time, however, I'm thinking now that it won't as on the client-side, there won't be very many subscriptions. on the server side, this can't be done because in order to notify a change, these queries need to be subset matched which would require a loop of all subscriptions & subsequent decoding of query stings anyways. just having a list of objects with a query property makes the structure consistent across client and server and shouldn't have too big of a performance cost

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
			path: '/database',
			component: DatabasePage,
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
		//R a good reason not to is that table is a property that all entities will have, so making it part of the data structure will make searches faster
		subscriptions: new sj.Subscriptions(),
	},
	actions: { //! all actions are async via dispatch('functionName', payload)
		//TODO errors should be handled in these actions

		async subscribe(context, {Entity, query, subscriber, timeout = 10000}) {
			console.log('Z');

			//C subscribe on server 
			let preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
			let processedQuery = await new Promise((resolve, reject) => {
				const timeoutId = setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket subscription timed out',
					}));
				}, timeout);

				databaseSocket.emit('SUBSCRIBE', {table: Entity.table, query: preparedQuery}, result => {
					clearTimeout(timeoutId);
					if (sj.isType(result, sj.Error)) reject(result);
					else resolve(result);
				});
			}).then(sj.content).catch(sj.propagate);

			//C find table, based on Entity
			let table = context.state.subscriptions[Entity.table];

			//C add subscriber, from this point data will live-update
			await context.dispatch('addSubscriber', {table, query: processedQuery, subscriber});

			//C trigger the initial update
			await context.dispatch('updateSubscription', {Entity, table, query: processedQuery, timestamp: Date.now()});

			//C return the subscription's data, from this point component data will update (no need to worry about flickering from above)
			let subscription = context.getters.findSubscription(table, processedQuery);
			return subscription;
		},
		async unsubscribe(context, {Entity, query, subscriber, timeout = 10000}) {
			//C subscribe on server
			let preparedQuery = sj.shake(sj.any(query), Entity.filters.getIn);
			let processedQuery = await new Promise((resolve, reject) => {
				const timeoutId = setTimeout(() => {
					reject(new sj.Error({
						log: true,
						reason: 'socket unsubscription timed out',
					}));
				}, timeout);

				databaseSocket.emit('UNSUBSCRIBE', {table: Entity.table, query: preparedQuery}, result => {
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

		async addSubscriber(context, {table, query, subscriber}) { 
			//C find subscription
			let existingSubscription = context.getters.findSubscription(table, query);
			if (!existingSubscription) {
				//C determine if Query or Entity Subscription
				if (query.length === 1 && Object.keys(query).length === 1 && sj.isType(query[0].id, Number)) var Type = sj.EntitySubscription;
				else var Type = sj.QuerySubscription;

				//C create new subscription
				context.commit('addSubscription', {table, subscription: new Type({
					query, //TODO make immutable
					subscribers: [subscriber],
				})});
				//console.log('addSubscriber() - added new query mirror for new subscriber', table[query], subscriber);
			} else {
				//C find subscriber
				let existingSubscriber = existingSubscription.subscribers.find(existingSubscriber => existingSubscriber === subscriber);

				if (!existingSubscriber) {
					//C add subscriber //! can't just push here as only mutations should modify state
					context.commit('editSubscription', {subscription: existingSubscription, properties: {
						subscribers: [...existingSubscription.subscribers, subscriber],
					}});
					//console.log('addSubscriber() - added new subscriber subscriber', table[query], subscriber);
				}
			}
		},
		async removeSubscriber(context, {table, query, subscriber}) {
			//C find subscription
			let existingSubscription = context.getters.findSubscription(table, query);
			if (!existingSubscription) throw new sj.Error({
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
				//console.log('removeSubscriber() - removed subscriber', queryTable[query], subscriber);
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
				//console.log('removeSubscriber() - removing item', queryTable[query]);
			}
		},
		
		async updateSubscription(context, {Entity, table, query, timestamp}) {
			//C find subscription
			let existingSubscription = context.getters.findSubscription(table, query);
			if (!existingSubscription) throw new sj.Error({
				origin: 'removeSubscriber()',
				reason: 'could not find subscription to update',
			});

			//C check timestamp to avoid sending redundant get requests
			if (timestamp <= existingSubscription.timestamp) return sj.Warn({
				origin: 'updateSubscription()',
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
						origin: 'updateSubscription()',
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

				console.log('existing subscriptions', existingSubscription.content);
				console.log('updated subscriptions', updatedEntitySubscriptions);

				//C swap in the new references
				context.commit('editSubscription', {subscription: existingSubscription, properties: {
					content: updatedEntitySubscriptions,
				}});
			}
		},
	},
	mutations: { //G these are bare-bones setters, data should already be checked and formatted
		// database sync
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
});
const vm = new Vue({
	el: '#app',
	router,
	store,
});

//C trigger query updates when notified of change
databaseSocket.on('NOTIFY', async ({table, query, timestamp}) => {
	console.log('NOTIFIED:', table, query);

	let Entity = sj.tableToEntity(table);
	store.dispatch('updateSubscription', {Entity, table: store.state.subscriptions[Entity.table], query, timestamp});
});

//sj.testRun(sj.testRun(store));

sj.testTest = async function (store) {
	let Entity = sj.Track;
	let query = [{playlistId: 2}];
	let changedName = sj.makeKey(10);

	let change = [{id: 65, name: changedName}]; //TODO I deleted track 65
	let subscriber = 'test subscriber';

	let pass = true;

	if (store.state.subscriptions[Entity.table].length !== 0) {
		console.error("subscriptions didn't start out empty")
		pass = false;
	}
	console.log('initial query:', query);

	let result = await store.dispatch('subscribe', {Entity, query, subscriber});
	if (!sj.deepMatch(store.state.subscriptions[Entity.table][0].query, query)) {
		console.error('stored query is not the same as input query');
		pass = false;
	}
	console.log('subscribed to query:', store.state.subscriptions[Entity.table][0].query);
	console.log('before content:', store.state.subscriptions[Entity.table][0].content);

	await Entity.edit(change);
	await sj.wait(1000);
	console.log('after content:', store.state.subscriptions[Entity.table][0].content);

	await store.dispatch('unsubscribe', {Entity, query, subscriber});
	if (store.state.subscriptions[Entity.table].length !== 0) {
		console.error("subscriptions didn't end empty");
		pass = false;
	}
	console.log(store.state.subscriptions[Entity.table]);
	console.log('none remaining:', store.state.subscriptions[Entity.table].length === 0);
	console.log('pass:', pass);
	console.log('result', result);
};

//sj.testTest(store);


