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

//L https://cdn.jsdelivr.net/npm/vue@2.6.8/dist/vue.esm.browser.js //! renamed from .js to .mjs
import Vue from './vue.esm.browser.mjs'; 
//L https://unpkg.com/vue-router@3.0.2/ //! renamed from .js to .mjs, manually converted to esm (remove closure & export default instead of return)
import VueRouter from './vue-router.esm.browser.mjs';
//L https://unpkg.com/vuex@3.1.0/dist/vuex.esm.js //! renamed from .js to .mjs, manually converted to browser (removed process.env.NODE_ENV !== 'production' references)
import VueX from './vuex.esm.browser.mjs'; 

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
    //? if user needs to be stored here (they dont, that happens with sessions atm) //L handle page refreshes: https://github.com/robinvdvleuten/vuex-persistedstate
	state: {
		//me: null, //TODO probably replace this with a NoUser object so that functions don't break
	},
	mutations: {
		// setMe(state, user) {
		// 	state.me = user;
		// },
	},

});
const vm = new Vue({
	el: '#app',
	router,
	store,
});