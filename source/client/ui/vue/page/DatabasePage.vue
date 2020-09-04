<script>
	import {
		any,
	} from '../../../../shared/utility/index.js';

	import {
		User,
		Playlist,
		Track,
	} from '../../../entities/index.js';
	import {
		Subscription,
	} from '../../../../shared/live-data.js';
	import * as session from '../../../session-methods.js';
	import isInstanceOf from '../../../../shared/is-instance-of.js';
	
	import TrackDisplayList from '../track/TrackDisplayList.vue';
	import PlaylistDisplayList from '../playlist/PlaylistDisplayList.vue';
	import UserDisplayList from '../user/UserDisplayList.vue';

    export default {
		name: 'database-page',
		components: {
			TrackDisplayList,
			PlaylistDisplayList,
			UserDisplayList,
		},
        data() {
            return {
				isLoggedIn: false,
				currentUser: {},
				name: 'jon',
				password: 'password',

				entityType: 'track',
				methodType: 'get',
				
				inputTrack: {
					id: '',
					playlistId: '',
					position: '',
					source: {name: ''},
					sourceId: '',
					name: '',
					duration: '',
					artists: [],
				},
				inputSource: '',
				inputArtists: '',

				inputPlaylist: {
					id: '',
					userId: '',
					name: '',
					description: '',
				},
				inputUser: {
					id: '',
					name: '',
					email: '',
					password: '',
					password2: '',
				},

				result: [],
				subscription: undefined,
            };
		},
		computed: {
			Entity: function () {
				if (this.entityType === 'track') return Track;
				else if (this.entityType === 'playlist') return Playlist;
				else if (this.entityType === 'user') return User;
			},
			input: function () {
				if (this.entityType === 'track') return {...this.defaultTrack, ...this.inputTrack};
				else if (this.entityType === 'playlist') return {...this.defaultPlaylist, ...this.inputPlaylist};
				else if (this.entityType === 'user') return {...this.defaultUser, ...this.inputUser};
			},

			subscriptionData: function () {
				//TODO I think this is old, transition to the new AsyncDisplay
				if (isInstanceOf(this.subscription, Subscription, 'Subscription')) return any(this.$store.getters.getLiveData(this.subscription));
			},
		},
		watch: {
			inputSource: function (value) {
				this.inputTrack.source.name = value;
			},
			inputArtists: function (value) {
				this.inputTrack.artists = value.split(',');
			},
		},
		methods: {
			// ...mapActions([
			// 	'subscribe',
			// 	'unsubscribe',
			// ]),

			handle(rejected) {
				console.warn('error occured, result unchanged');
				// don't change
				return this.retrieved;
			},

			autoFill() {
				if (this.entityType === 'track') {
					Object.assign(this.inputTrack, {
						id: 0,
						playlistId: 1,
						position: 1000,
						sourceId: 'abcdefg',
						name: 'default name',
						duration: 1000,
					});
					this.inputSource = 'spotify';
					this.inputArtists = 'default artist A,default artist B';
				}
				else if (this.entityType === 'playlist') Object.assign(this.inputPlaylist, {
					id: 0,
					userId: 1,
					name: 'default name',
					description: 'default description',
				});
				else if (this.entityType === 'user') Object.assign(this.inputUser, {
					id: 0,
					name: 'default name',
					email: 'default email',
					password: 'default password',
					password2: 'default password',
				});
			},


            async login() {
                this.currentUser = await session.login({name: this.name, password: this.password}).catch(rejected => {
                    console.error(rejected);
				});
				this.isLoggedIn = true;
			},
			async logout() {
				await session.logout().catch(rejected => {
					console.error(rejected);
				});
				this.isLoggedIn = false;
				this.currentUser = {};
			},
			

			async add() {
				this.result = await this.Entity.add(this.input).then((result) => result.content).catch(this.handle);
			},
			async get() {
				this.result = await this.Entity.get(this.input).then((result) => result.content).catch(this.handle);
			},
			async edit() {
				this.result = await this.Entity.edit(this.input).then((result) => result.content).catch(this.handle);
			},
			async remove() {
				this.result = await this.Entity.remove(this.input).then((result) => result.content).catch(this.handle);
			},

			async subscribe() {
				this.subscription = await this.$store.dispatch('subscribe', {Entity: this.Entity, query: this.input, subscriber: this});
			},

		},
    }
</script>


<template>
    <div>
		<section>
			<form @submit.prevent='login' v-if='!isLoggedIn'> 
				<input v-model='name'       placeholder='name'		>
				<input v-model='password'   placeholder='password'	>
				<input type='submit' value='Login'>
			</form>
			<div v-else>
				<p>Logged in as {{currentUser.name}}</p>
				<button @click='logout'>Logout</button>
			</div>
		</section>

		<section>
			<input type='radio' name='entityType' v-model='entityType' value='track' id='trackRadio'>
			<label for='trackRadio'>Track</label>

			<input type='radio' name='entityType' v-model='entityType' value='playlist' id='playlistRadio'>
			<label for='playlistRadio'>Playlist</label>

			<input type='radio' name='entityType' v-model='entityType' value='user' id='userRadio'>
			<label for='userRadio'>User</label>

			<button @click='autoFill'>Auto Fill</button>
		</section>

		<keep-alive>
			<section v-if='entityType === "track"'>
				<input class='property' v-model='inputTrack.id'			placeholder='id'>
				<input class='property' v-model='inputTrack.playlistId'	placeholder='playlistId'>
				<input class='property' v-model='inputTrack.position'	placeholder='position'>
				<input class='property' v-model='inputSource'			placeholder='source'>
				<input class='property' v-model='inputTrack.sourceId'	placeholder='sourceId'>
				<input class='property' v-model='inputTrack.name'		placeholder='name'>
				<input class='property' v-model='inputTrack.duration'	placeholder='duration'>
				<input class='property' v-model='inputArtists'			placeholder='artists'>
			</section>
			<section v-else-if='entityType === "playlist"'>
				<input class='property' v-model='inputPlaylist.id'		placeholder='id'>
				<input class='property' v-model='inputPlaylist.userId'	placeholder='userId'>
				<input class='property' v-model='inputPlaylist.name'		placeholder='name'>
				<input class='property' v-model='inputPlaylist.description'	placeholder='description'>
			</section>
			<section v-else-if='entityType === "user"'>
				<input class='property' v-model='inputUser.id'			placeholder='id'>
				<input class='property' v-model='inputUser.name'		placeholder='name'>
				<input class='property' v-model='inputUser.email'		placeholder='email'>
				<input class='property' v-model='inputUser.password'	placeholder='password'>
			</section>
		</keep-alive>

		<section>
			
			
			<!-- 
				<input type='radio' name='methodType' v-model='method' value='add' id='addRadio'>
				<label for='addRadio'>Add</label>

				<input type='radio' name='methodType' v-model='method' value='get' id='getRadio' checked>
				<label for='getRadio'>Get</label>
				
				<input type='radio' name='methodType' v-model='method' value='edit' id='editRadio'>
				<label for='editRadio'>Edit</label>

				<input type='radio' name='methodType' v-model='method' value='remove' id='removeRadio'>
				<label for='removeRadio'>Delete</label> 
			-->
		</section>

		<div class='twoColumn'>
			<section>
				<button @click='add'>Add</button>
				<button @click='get'>Get</button>
				<button @click='edit'>Edit</button>
				<button @click='remove'>Remove</button>

				<h3>Result</h3>
				<track-display-list v-if='entityType === "track"' :p-content='result'></track-display-list>
				<playlist-display-list  v-else-if='entityType === "playlist"' :p-content='result'></playlist-display-list>
				<user-display-list  v-else-if='entityType === "user"' :p-content='result'></user-display-list>
			</section>

			<section>
				<button @click='subscribe'>Subscribe</button>

				<h3>Subscription</h3>
				<track-display-list v-if='entityType === "track"' :p-content='subscriptionData'></track-display-list>
				<playlist-display-list  v-else-if='entityType === "playlist"' :p-content='subscriptionData'></playlist-display-list>
				<user-display-list  v-else-if='entityType === "user"' :p-content='subscriptionData'></user-display-list>
			</section>
		</div>
    </div>
</template>


<style lang='scss'>
	$section-space: 10px;

	.property {
		display: block;
	}

	section {
		margin-top: $section-space;
		margin-bottom: $section-space;
	}

	.twoColumn {
		display: flex;
		align-content: stretch;
		section {
			flex-grow: 1;
			flex-basis: 0;
		}
	}
</style>