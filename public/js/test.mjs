//! this file was manually renamed from .js to .mjs
import Vue from './vue.esm.browser.mjs'; 
import sj from './global-client.mjs';

async function send(objType, obj, method) {
    let temp = {};

    if (method === 'get') {
        if (objType === 'me') {
            temp = await fetch(`http://localhost:3000/api/${objType}`, {
                method: 'get',
            }).then(resolved => {
                return resolved.json();
            }, rejected => {
                return rejected.json();
            });
        } else {
            temp = await fetch(`http://localhost:3000/api/${objType}/${obj.id}`, {
                method: 'get',
            }).then(resolved => {
                return resolved.json();
            }, rejected => {
                return rejected.json();
            });
        }
    } else {
        temp = await fetch(`http://localhost:3000/api/${objType}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }).then(resolved => {
            return resolved.json();
        }, rejected => {
            return rejected.json();
        });
    }

    console.log(temp);
}

function wrapUser() {
    return new sj.User({
        id: $('#userId').val(),
        name: $('#userName').val(),
        password: $('#userPassword').val(),
        password2: $('#userPassword2').val(),
        email: $('#userEmail').val(),
    });
}
function wrapPlaylist() {
    return new sj.Playlist({
        id: $('#playlistId').val(),
        userId: $('#playlistUserId').val(),
        name: $('#playlistName').val(),
        visibility: $('#playlistVisibility').val(),
        description: $('#playlistDescription').val(),
        image: $('#playlistImage').val(),
        color: $('#playlistColor').val(),
    });
}
function wrapTrack() {
    return new sj.Track({
        id: $('#trackId').val(),
        playlistId: $('#trackPlaylistId').val(),
        position: $('#trackPosition').val(),
        source: $('#trackSource').val(),
        sourceId: $('#trackSourceId').val(),
        name: $('#trackName').val(),
        duration: $('#trackDuration').val(),
        artists: [],
    });
}

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
		
        registerUser: function () {
            send('user', this.wrapUser(), 'post');
        },
        getUser: async function () {
			//send('user', this.wrapUser(), 'get');

			let user = this.wrapUser();
			console.log('INPUT USER: ', user);
			
			// let temp = await fetch(`http://localhost:3000/api/user?id=${user.id}&name=${user.name}&email=${user.email}`, {
			// 	method: 'get',
			// }).then(resolved => {
			// 	return resolved.json();
			// }, rejected => {
			// 	return rejected.json();
			// });


			const SERVER_URL = `http://localhost:3000`;
			const API_URL = `${SERVER_URL}/api`;
			const JSON_HEADER = {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			};

			async function request(method, url, body) {
				return await fetch(url, {
					method: method,
					headers: JSON_HEADER,
					body: JSON.stringify(body),
				}).then(resolved => {
					return resolved.json();
				}, rejected => {
					return rejected.json();
				});
			}

			let temp = await request('get', `${API_URL}/user?id=${user.id}&name=${user.name}&email=${user.email}`);

			console.log('OUTPUT USER: ', temp);
        },
        editUser: function () {
            send('user', this.wrapUser(), 'patch');
        },
        deleteUser: function () {
            send('user', this.wrapUser(), 'delete');
		},
		
		login: function () {
            send('login', this.wrapUser(), 'put');
		},
		//TODO getMe might actually just be getUser with extra permissions - leaving login and logout the neat two session accessors (without retrieve or update)
		getMe: function () {
            send('me', this.wrapUser(), 'get');
		},
		logout: function () {
            send('logout', this.wrapUser(), 'delete');
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

			<button id='registerUser'   v-on:click='registerUser()' >Register</button>
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
    template: `
        <div class='list-item'>
            <p v-for='artist in track.artists'>{{artist}}</p>
            <h3>{{track.name}}</h3>
            <button>Play</button>
        </div>
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
    template: `
        <div>
            <track-list-item v-for='track in playlist.content' :key='track.id' v-bind:track='track'></track-list-item>
        </div>
    `,
});


Vue.component('playlist-list-item', {
    props: {
        playlist: Object,
    },
    template: `
        <div class='list-item'>
            <p>{{playlist.name}}</p>
            <button>Open</button>
            <button>Play</button>
        </div>
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
    template: `
        <div>
            <playlist-list-item v-for='playlist in playlistList' :key='playlist.id' v-bind:playlist='playlist'></playlist-list-item>
        </div>
    `,
});


let vm = new Vue({
    el: '#app',
    data: {
        foo: 'hey im some words',
        baz: 'blah im some other words',
    },
});