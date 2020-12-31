// EXTERNAL
//L https://cdn.jsdelivr.net/npm/vue@2.6.8/dist/vue.esm.browser.js
// import Vue from './vendor/vue.esm.browser.js';
import {createApp} from 'vue/dist/vue.esm-bundler.js'; //TODO Figure out how to get the runtime-only version working.
//L https://unpkg.com/vue-router@3.0.2/ //! manually converted to esm (remove closure & export default instead of return)
// import VueRouter from './vendor/vue-router.esm.browser.js';
import {createRouter, createWebHistory} from 'vue-router';
//L https://unpkg.com/vuex@3.1.0/dist/vuex.esm.js //! manually converted to browser (removed process.env.NODE_ENV !== 'production' references)
// import VueX from './vendor/vuex.esm.browser.js';
import {createStore} from 'vuex/dist/vuex.esm-bundler.js';

import SocketIO from 'socket.io-client';

// INTERNAL
import liveData from './live-data-client.js';
import universalPlaybackModule from './universal-playback-module.js';


//OLD //L global mixins: https://vuejs.org/v2/guide/mixins.html#Global-Mixin, so that sj does not have to be imported into every component
//OLD //G to access mixin before component creation (ie inside data function), use this.$root.x instead of this.x

import AppMain          from './ui/vue/main/AppMain.vue';
import HomePage         from './ui/vue/page/HomePage.vue';
import UserPage         from './ui/vue/page/UserPage.vue';
import PlaylistPage     from './ui/vue/page/PlaylistPage.vue';
import TrackPage        from './ui/vue/page/TrackPage.vue';
import AddPlaylistPage  from './ui/vue/page/AddPlaylistPage.vue';
import TestPage         from './ui/vue/page/TestPage.vue';
import EntryPage        from './ui/vue/page/EntryPage.vue';
import AuthRedirectPage from './ui/vue/page/AuthRedirectPage.vue';
import ErrorPage        from './ui/vue/page/ErrorPage.vue';
import NotFoundPage     from './ui/vue/page/NotFoundPage.vue';
import DatabasePage     from './ui/vue/page/DatabasePage.vue';

// Vue
const app = createApp({
	devtools: true,
	async created() {
		await this.$store.dispatch('start', new SocketIO('/live-data'));
		await this.$store.dispatch('player/startClock');
	},
});
const router = createRouter({
	//L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
	history: createWebHistory(),
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
			// login is outside the AppMain component (it doesn't have a menu bar, player bar, etc.), its a barebones entry point
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
			// catch invalid url paths
			//TODO Test new match all path.
			path: '/:pathMatch(.*)*',
			component: NotFoundPage,
		},
	],
});
const store = createStore({
	modules: {
		liveData, //TODO consider name-spacing liveData module, just remember to add the namespace where its functions are used
		player: {
			...universalPlaybackModule,
			namespaced: true,
		},
	},
	state: {
		//L handle page refreshes: https://github.com/robinvdvleuten/vuex-persistedstate
		//R Don't store the user here. Server-side authorization uses session.user, client-side should fetch one's own user.
	},
	actions: {
		//G all actions are async via dispatch('functionName', payload)
		//TODO errors should be handled in these actions
	},
	mutations: {
		//G these are bare-bones setters, data should already be checked and formatted
	},
	getters: {},
});

app.use(router);
app.use(store);
app.mount('#app');
//TODO
// app.config.devtools = false;
