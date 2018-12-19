//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

//! this file was manually renamed from .js to .mjs
import Vue from './vue.esm.browser.mjs';
import VueRouter from './vue-router.mjs';
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


//L https://vuejs.org/v2/cookbook/form-validation.html
//? is v-model secure? it updates a variable with whatever is in the input
Vue.component('user-crud', {
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
Vue.component('track-list-item', {
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
	}
    template: /*html*/`
        <li class='track-list-item'>
            <p v-for='artist in track.artists'>{{artist}}</p>
            <h3>{{track.name}}</h3>
            <button>Play</button>
        </li>
    `,
});
Vue.component('track-list',  {
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


Vue.component('playlist-list-item', {
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
Vue.component('playlist-list', {
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
});