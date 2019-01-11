//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

//L https://unpkg.com/vue@2.5.21/ //! renamed from .js to .mjs
import Vue from './vue.esm.browser.mjs'; 
//L https://unpkg.com/vue-router@3.0.2/ //! manually converted to esm (remove closure & export default instead of return), renamed from .js to .mjs
import VueRouter from './vue-router.esm.browser.mjs';

import sj from './global-client.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

Vue.use(VueRouter);


//   ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗███████╗
//  ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
//  ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
//  ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
//  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   ███████║
//   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
//                                                                                            

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

let EntryOptions = Vue.component('entry-options', {
    data: function () {
        return {
            entryType: 'login',
        };
    },
    methods: {
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

            <login-form v-if="entryType === 'login'"></login-form>
            <register-form v-if="entryType === 'register'"></register-form>
            <guest-form v-if="entryType === 'guest'"></guest-form>
        </div>
    `,
});
let LoginForm = Vue.component('login-form', {
    data: function () {
        return {
            name: null,
            password: null,
        };
    },
    methods: {
        submit: async function() {
            //C strips away unnecessary variables
            //! requires that data properties are of the same name
            let user = new sj.User(this);
            let temp = await sj.login(user).then(resolved => {
                console.log('RESOLVED: ', resolved);
                console.log('THIS: ', this.$router);
                this.$router.push('/');
            }).catch(rejected => {
                console.log('RESOLVED: ', resolved);
                console.log('THIS: ', this.$router);
                this.$router.push('/');
            });

            console.log(temp);
        }
    },
    //L reasons to use html form submit over javascript function: https://stackoverflow.com/questions/16050798/html-form-submit-using-javascript-vs-submit-button, however these aren't good enough - a javascript function will do the job and be more consistent
    template: /*html*/`
        <!-- //L .prevent modifier keeps page from reloading on submit https://vuejs.org/v2/guide/events.html#Event-Modifiers -->
        <form v-on:submit.prevent='submit'> 
            <input v-model='name'       placeholder='name'      >
            <input v-model='password'   placeholder='password'  >
            <input type='submit' value='Login'>
        </form>
    `,
});
let RegisterForm = Vue.component('register-form', {
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
});
let GuestForm = Vue.component('guest-form', {
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
});

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
	template: /*html*/`
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
    template: /*html*/`
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
    template: /*html*/`
        <ul class='track-list'>
            <track-list-item v-for='track in playlist.content' :key='track.id' v-bind:track='track'></track-list-item>
        </ul>
    `,
});

let PlaylistListItem = Vue.component('playlist-list-item', {
    props: {
        playlist: Object,
    },
    template: /*html*/`
        <li class='playlist-list-item'>
            <p>{{playlist.name}}</p>
            <button>Open</button>
            <button>Play</button>
        </li>
    `,  
});
let PlaylistList = Vue.component('playlist-list', {
    data: function () {
        return {
            playlistList: [
                new sj.Playlist({
                    name: 'playlist1',
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
                new sj.Playlist({
                    name: 'playist2',
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
                new sj.Playlist({
                    name: 'playlist3',
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
            ],
        };
    },
    template: /*html*/`
        <ul class='playlist-list'>
            <playlist-list-item v-for='playlist in playlistList' :key='playlist.id' v-bind:playlist='playlist'></playlist-list-item>
        </ul>
    `,
});


let vm = new Vue({
    el: '#app',
    data: {
        foo: 'hey im some words',
        baz: 'blah im some other words',
    },
    router: new VueRouter({
        //L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
        mode: 'history',
        routes: [
            {
                path: '/login',
                component: EntryOptions,
            },
            {
                path: '/',
                component: PlaylistList,
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
    }),
});