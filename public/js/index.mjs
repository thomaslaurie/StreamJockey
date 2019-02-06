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
	
	//TODO//L list transitions: https://medium.freecodecamp.org/an-introduction-to-dynamic-list-rendering-in-vue-js-a70eea3e321
*/

//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

//L https://unpkg.com/vue@2.5.21/ //! renamed from .js to .mjs
import Vue from './vue.esm.browser.mjs'; 
//L https://unpkg.com/vue-router@3.0.2/ //! renamed from .js to .mjs, manually converted to esm (remove closure & export default instead of return)
import VueRouter from './vue-router.esm.browser.mjs';
//L https://unpkg.com/vuex@3.1.0/dist/vuex.esm.js //! renamed from .js to .mjs, manually converted to browser (removed process.env.NODE_ENV !== 'production' references)
import VueX, {mapState, mapGetters, mapMutations} from './vuex.esm.browser.mjs'; 

import sj from './global-client.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

Vue.use(VueRouter);
Vue.use(VueX);


//   ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗███████╗
//  ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
//  ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
//  ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
//  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   ███████║
//   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//                                                                                            

/* old initial crud testing
	//L https://vuejs.org/v2/cookbook/form-validation.html
	//? is v-model secure? it updates a variable with whatever is in the input
	let UserCrud = Vue.component('user-crud', {
		//! DONT USE ARROW FUNCTIONS: //L https://vuejs.org/v2/guide/instance.html#Data-and-Methods
		data: function () {
			return {
				id: '',
				name: '',
				password: '',
				password2: '',
				email: '',
			}
		},
		methods: {
			wrapUser: function () {
				return new sj.User({
					id: this.id,
					name: this.name,
					password: this.password,
					password2: this.password2,
					email: this.email,
				});
			},
			
			addUser: async function () {
				let result = await sj.addUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			getUser: async function () {
				let result = await sj.getUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			editUser: async function () {
				let result = await sj.editUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			deleteUser: async function () {
				let result = await sj.deleteUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			
			login: async function () {
				let result = await sj.login(this.wrapUser());
				console.log('RESULT: ', result);
			},
			logout: async function () {
				let result = await sj.logout(this.wrapUser());
				console.log('RESULT: ', result);
			},

			//TODO getMe might actually just be getUser with extra permissions - leaving login and logout the neat two session accessors (without retrieve or update)
			getMe: async function () {
				send('me', this.wrapUser(), 'get');
			},
		},
		template: `
			<div>
				<h2>User</h2>

				<input id='userId'          placeholder='id'        v-model='id'>
				<input id='userName'        placeholder='name'      v-model='name'>
				<input id='userPassword'    placeholder='password'  v-model='password'>
				<input id='userPassword2'   placeholder='password2' v-model='password2'>
				<input id='userEmail'       placeholder='email'     v-model='email'>

				<button id='addUser'   		v-on:click='addUser()' 		>Register</button>
				<button id='getUser'        v-on:click='getUser()'  	>Get User</button>
				<button id='editUser'       v-on:click='editUser()'     >Edit User</button>
				<button id='deleteUser'     v-on:click='deleteUser()'   >Delete User</button>
				
				<h2>Session</h2>

				<button id='login'	v-on:click='login()'>Login</button>
				<button id='getMe'	v-on:click='getMe()'>Get Me</button>
				<button id='-'							>-</button>
				<button id='logout'	v-on:click='logout()'>Logout</button>
			</div>
		`,
	});

	//L https://vuejs.org/v2/guide/components-registration.html
	let TrackListItem = Vue.component('track-list-item', {
		props: {
			track: Object,
		},
		methods: {
			addTrack: async function () {
				let result = await sj.addUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			getTrack: async function () {
				let result = await sj.getUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			editTrack: async function () {
				let result = await sj.editUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
			deleteTrack: async function () {
				let result = await sj.deleteUser(this.wrapUser());
				console.log('RESULT: ', result);
			},
		},
		template: `
			<li class='track-list-item'>
				<p v-for='artist in track.artists'>{{artist}}</p>
				<h3>{{track.name}}</h3>
				<button>Play</button>
			</li>
		`,
	});
	let TrackList = Vue.component('track-list',  {
		data: function () {
			return {
				playlist: new sj.Playlist({
					content: [
						new sj.Track({
							id: '1234',
							name: 'title1',
							artists: ['artist'],
						}),
						new sj.Track({
							id: '7654',
							name: 'title2',
							artists: ['artist2', 'artist3'],
						}),
						new sj.Track({
							id: '8293',
							name: 'title3',
							artists: ['artist4',],
						}),
					],
				}),
			};
		},
		template: `
			<ul class='track-list'>
				<track-list-item v-for='track in playlist.content' :key='track.id' v-bind:track='track'></track-list-item>
			</ul>
		`,
	});
*/

// errors
let NotFound = Vue.component('not-found', {
    //TODO communicate this to the server
    template: /*html*/`
        <h1>Page Not Found</h1>
    `,
});
let ErrorPage = Vue.component('error-page', {
    template: /*html*/`
        <h1>THERE WAS AN ERROR</h1>
    `,
});


let LoginForm = {
	name: 'login-form',
    data: function () {
        return {
            //TODO these are temporary, should normally be null
            name: 'jon',
            password: 'password',
        };
    },
    methods: {
        submit: async function() {
			//C passes all data to login(), unnecessary values will be stripped away
			let me = await sj.login(new sj.User(this)).catch(rejected => {
				//TODO handle error
                console.error(rejected);
			});

			this.$store.commit('setMe', me);
			this.$router.push('/');
        }
	},
	computed: {
		...mapState(['me']),
	},
    //L reasons to use html form submit over javascript function: https://stackoverflow.com/questions/16050798/html-form-submit-using-javascript-vs-submit-button, however these aren't good enough - a javascript function will do the job and be more consistent
    template: /*html*/`
        <!-- //L .prevent modifier keeps page from reloading on submit https://vuejs.org/v2/guide/events.html#Event-Modifiers -->
        <form v-on:submit.prevent='submit'> 
            <input v-model='name'       placeholder='name'>
            <input v-model='password'   placeholder='password'>
            <input type='submit' value='Login'>
        </form>
    `,
};
let RegisterForm = {
	name: 'register-form',
    data: function () {
        return {
            name: null,
            password: null,
            password2: null,
            email: null,
        };
    },
    methods: {
        submit: async function() {
            let user = new sj.User(this);
            let temp = await sj.addUser(user);

            console.log(temp);
        }
    },
    template: /*html*/`
        <form v-on:submit.prevent='submit'> 
            <input v-model='name'       placeholder='name'      >
            <input v-model='password'   placeholder='password'  >
            <input v-model='password2'  placeholder='password2' >
            <input v-model='email'      placeholder='email'     >
            <input type='submit' value='Register'>
        </form>
    `,
};
let GuestForm = {
	name: 'guest-form',
    methods: {
        submit: async function() {
            //TODO
            console.warn('TODO guest form');
        }
    },
    template: /*html*/`
        <form v-on:submit.prevent='submit'>
            <p>Try it out as a guest, you may save your account at a later time</p>
            <input type='submit' value='Continue as Guest'>
        </form>
    `,
};
// login
let EntryOptions = {
	name: 'entry-options',
	components: {
		LoginForm,
		RegisterForm,
		GuestForm,
	},
    data: function () {
        return {
            entryType: 'login',
        };
    },
	computed: {
		dynamicComponent() {
			if(this.entryType === 'login') {
				return this.$options.components.LoginForm;
			} else if (this.entryType === 'register') {
				return this.$options.components.RegisterForm;
			} else if (this.entryType === 'guest') {
				return this.$options.components.GuestForm;
			}
		},
	},
    template: /*html*/`
        <div>
            <!-- //L radio name is apparently not needed with v-model https://vuejs.org/v2/guide/forms.html#Radio -->
            <input type='radio' v-model='entryType' value='login' id='loginEntryTypeRadio' checked>
            <label for='loginEntryTypeRadio'>Login</label>

            <input type='radio' v-model='entryType' value='register' id='registerEntryTypeRadio'>
            <label for='registerEntryTypeRadio'>Register</label>

            <input type='radio' v-model='entryType' value='guest' id='guestEntryTypeRadio'>
			<label for='guestEntryTypeRadio'>Guest</label>

			<component :is='dynamicComponent'></component>
        </div>
    `,
};


let LogoutButton = {
	name: 'logout-button',
    methods: {
        click: async function() {
			await sj.logout().catch(rejected => {
                //TODO handle error
				console.error(rejected);
			});

			this.$store.commit('setMe', null);
			this.$router.push('/login');
        }
    },
    template: /*html*/`
        <button @click='click'>Logout</button>
    `,
};


/* //R figuring out async loading of data, and how to handle display, laoding, and error states
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

//C default handler components
let BaseDisplay = {
    props: {
        display: Object,
    },
    template: /*html*/ `<p>Default Display Component</p>`,
}
let BaseLoading = {
    template: /*html*/ `<p>Default Loading Component</p>`,
}
let BaseError = {
    props: {
        error: Object,
    },
    template: /*html*/ `<p>Default Error Component</p>`,
}
//C loads a resource and switches to one of it's handler components based on the result, it hands them the display and/or error data from the result
let BaseLoader = {
    name: 'base-loader', //! this is optional (for templates the name is inferred), but providing this manually allows it's name to show up in debugging
    components: {
        //TODO make actual default components
        //TODO consider making a delay component (where no loading graphics are shown)
        DisplayComponent: BaseDisplay,
        LoadingComponent: BaseLoading,
        ErrorComponent: BaseError,
	},
	props: {
		query: [Object, Array],
	},
    data() {
        return {
            state: 'loading',
            delay: 500,
            timeout: Infinity,

            display: null,
            error: null, //R keep error separate from display because we don't want error data to overwrite existing display if there is a refresh error
        };
    },
    computed: {
        dynamicComponent() {
            //L using computed to swap dynamic components: https://alligator.io/vuejs/dynamic-components
            //L referencing registered components: https://forum.vuejs.org/t/list-registered-vue-components/7556
            if(this.state === 'display') {
                return this.$options.components.DisplayComponent;
            } else if (this.state === 'loading') {
                return this.$options.components.LoadingComponent;
            } else if (this.state === 'error') {
                return this.$options.components.ErrorComponent;
            }
        },
    },
    created() {
        this.getDisplay().then(this.handleSuccess, this.handleError);
    },
    methods: {
        async getDisplay() {
            return null;
        },
        handleSuccess(resolved) {
            this.display = resolved;
            this.state = 'display';
        },
        handleError(rejected) {
            this.error = rejected;
            this.state = 'error';
        },
    },
    template: /*html*/`
        <component :is='dynamicComponent' :display='display' :error='error'></component>
    `
}

//C default handler component for a list of items
let BaseListDisplay = {
	name: 'base-list-display',
	extends: BaseDisplay,
	props: {
		//C change display from Object to Array type
		display: Array,
	},
	template: /*html*/ `<p v:for='item in display'>Default Display Component for {{item + ''}}</p>`,
}
//C same as BaseLoader but gives an array to its handler components, this array is ordered based on its orderProp and ascending properties
let BaseListLoader = {
    name: 'list-loader',
	extends: BaseLoader,
	props: {
		orderBy: String, //TODO consider making this take an array, which then is able to sort by multiple columns 
		ascending: Boolean,
	},
    data() {
        return {
			//C change display default to empty list so that sj.dynamicSort() wont fail while display is loading
			display: [],
        };
	},
	computed: {
        orderedDisplay() {
            return sj.dynamicSort(this.display, this.ascending, this.orderBy);
        },
	},
	//C replace display with computed list: orderedDisplay
	template: /*html*/`
        <component :is='dynamicComponent' :display='orderedDisplay' :error='error'></component>
    `
}

let tracksToDelete; 

sj.getTrack(new sj.Track({
	playlistId: 1,
})).then(resolved => {
	console.log('get', resolved);
	return resolved.content;
}).then(resolved => {
	return sj.deleteTrack(resolved);
}).then(resolved => {
	console.log('success deletion');
	return sj.addTrack([
		new sj.Track({
			playlistId: 1,
			position: 0,
			source: 'b',
			sourceId: 'b',
			name: 'ccc',
			duration: 100,
		}),
		new sj.Track({
			playlistId: 1,
			position: 1,
			source: 'a',
			sourceId: 'c',
			name: 'bbb',
			duration: 300,
		}),
		new sj.Track({
			playlistId: 1,
			position: 2,
			source: 'c',
			sourceId: 'a',
			name: 'aaa',
			duration: 200,
		}),
	]);
}).then(resolved => {
	console.log(resolved);
}).catch(rejected => {
	console.error(rejected);
});




//TODO consider adding different display types instead of just different components?
let PlaylistDisplay = {
    name: 'playlist-display',
    extends: BaseDisplay,
    template: /*html*/`
        <li>
            <p>{{display.id}}</p>
            <p>{{display.name}}</p>
            <button>Open</button>
            <button>Play</button>
        </li>
    `,
};
let PlaylistLoading = {
    name: 'playlist-loading',
    extends: BaseLoading,
    template: /*html*/ `
        <p>... loading ...</p>
    `,
};
let PlaylistError = {
    name: 'playlist-error',
    extends: BaseError,
    template: /*html*/ `
        <p>{{error}}</p>
    `,
};
let PlaylistLoader = {
    name: 'playlist-loader',
    extends: BaseLoader,
    components: {
        DisplayComponent: PlaylistDisplay,
        LoadingComponent: PlaylistLoading,
        ErrorComponent: PlaylistError,
    },
    methods: {
        //C getDisplay() should overwrite BaseLoader's getDisplay() method, it is called by the inherited created() method
        async getDisplay() {
            let list = await sj.getPlaylist(this.query).then(sj.returnContent);
            return sj.one(list);
        }
    },
}

let PlaylistListDisplay = {
	name: 'playlist-list-display',
	extends: BaseListDisplay,
	components: {
        PlaylistDisplay,
	},
	template: /*html*/`
        <ul>
            <playlist-display
                v-for='playlist in display' 
                :key='playlist.id' 
                :display='playlist'
            ></playlist-display>
        </ul>
    `,
}
let PlaylistListLoader = {
    name: 'playlist-list-loader',
    extends: BaseListLoader,
    components: {
        DisplayComponent: PlaylistListDisplay,
    },
    methods: {
        async getDisplay() {
            return await sj.getPlaylist(this.query).then(sj.returnContent);
        },
    },
};


let TrackDisplay = {
    name: 'track-display',
    extends: BaseDisplay,
    template: /*html*/`
        <li>
            <p>{{display.playlistId}}</p>
			<p>{{display.position}}</p>
			<p>{{display.source}}</p>
			<p>{{display.name}}</p>
            <button>Info</button>
            <button>Play</button>
        </li>
    `,
}

let TrackListDisplay = {
	name: 'track-list-display',
	extends: BaseListDisplay,
	components: {
		TrackDisplay,
	},
	template: /*html*/`
		<ul>
			<track-display
				v-for='track in display' 
				:key='track.id' 
				:display='track'
			></track-display>
		</ul>
	`
}
let TrackListLoader = {
	name: 'track-list-loader',
	extends: BaseListLoader,
	components: {
		DisplayComponent: TrackListDisplay,
	},
	methods: {
		async getDisplay() {
			return await sj.getTrack(this.query).then(sj.returnContent);
		},
	},
}



const store = new VueX.Store({
	state: {
		me: null,
	},
	mutations: {
		setMe(state, user) {
			state.me = user;
		},
	},

});

const router = new VueRouter({
	//L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
	mode: 'history',
	routes: [
		{
			path: '/login',
			component: EntryOptions,
		},
		{
			path: '/',
			component: TrackListLoader,
			props: {
				query: new sj.Track({
					playlistId: 2,
				}),
				orderBy: 'name',
				ascending: true,
			}
		},
		{
			path: '/error',
			component: ErrorPage,
		},
		{ 
			//C catch invalid url paths 
			path: '*',
			component: NotFound,
		}
	],
});

let vm = new Vue({
	el: '#app',
	store,
    components: {
        EntryOptions,

        PlaylistListLoader,

        ErrorPage,
        NotFound,
	},
	data() {
		return {
			self: null,
		};
	},
	methods: {
		async getSelf() {

		},
	},
    router,
});