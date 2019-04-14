<script>
	import TrackDisplayList from '../track/TrackDisplayList.vue';
	import PlaylistDisplayList from '../playlist/PlaylistDisplayList.vue';

    export default {
		name: 'database-page',
		components: {
			TrackDisplayList,
			PlaylistDisplayList,
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
					source: '',
					sourceId: '',
					name: '',
					duration: '',
					artists: '',
				},
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

				retrievedTracks: [],
				retrievedPlaylists: [],
				retrievedUsers: [],

				result: {},
            };
		},
		computed: {
			entity: function () {
				if (this.entityType === 'track') return this.sj.Track;
				else if (this.entityType === 'playlist') return this.sj.Playlist;
				else if (this.entityType === 'user') return this.sj.User;
			},
			input: function () {
				if (this.entityType === 'track') return this.inputTrack;
				else if (this.entityType === 'playlist') return this.inputPlaylist;
				else if (this.entityType === 'user') return this.inputUser;
			},
			retrieved:  {
				get: function () {
					if (this.entityType === 'track') return this.retrievedTracks;
					else if (this.entityType === 'playlist') return this.retrievedPlaylists;
					else if (this.entityType === 'user') return this.retrievedUsers;
				},
				set: function (value) {
					if (this.entityType === 'track') this.retrievedTracks = value;
					else if (this.entityType === 'playlist') this.retrievedPlaylists = value;
					else if (this.entityType === 'user') this.retrievedUsers = value;
				},
			},
		},
		methods: {
            async login() {
                this.currentUser = await this.sj.login({name: this.name, password: this.password}).then(this.sj.content).catch(rejected => {
                    console.error(rejected);
				});
				this.isLoggedIn = true;
			},
			async logout() {
				await this.sj.logout().catch(rejected => {
					console.error(rejected);
				});
				this.isLoggedIn = false;
				this.currentUser = {};
			},
			
			async add() {
				this.result = await this.entity.add(this.input).catch(rejected => {
                    console.error(rejected);
				});
				this.retrieved = this.result.content;
			},
			async get() {
				this.result = await this.entity.get(this.input).catch(rejected => {
                    console.error(rejected);
				});
				this.retrieved = this.result.content;
			},
			async edit() {
				this.result = await this.entity.edit(this.input).catch(rejected => {
                    console.error(rejected);
				});
				this.retrieved = this.result.content;
			},
			async remove() {
				this.result = await this.entity.delete(this.input).catch(rejected => {
                    console.error(rejected);
				});
				this.retrieved = this.result.content;
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
			<button @click='add'>Add</button>
			<button @click='get'>Get</button>
			<button @click='edit'>Edit</button>
			<button @click='remove'>Remove</button>
			<!-- 
				<input type='radio' name='methodType' v-model='method' value='add' id='addRadio'>
				<label for='addRadio'>Add</label>

				<input type='radio' name='methodType' v-model='method' value='get' id='getRadio' checked>
				<label for='getRadio'>Get</label>
				
				<input type='radio' name='methodType' v-model='method' value='edit' id='editRadio'>
				<label for='editRadio'>Edit</label>

				<input type='radio' name='methodType' v-model='method' value='delete' id='deleteRadio'>
				<label for='deleteRadio'>Delete</label> 
			-->
		</section>

		<section>
			<input type='radio' name='entityType' v-model='entityType' value='track' id='trackRadio'>
			<label for='trackRadio'>Track</label>

			<input type='radio' name='entityType' v-model='entityType' value='playlist' id='playlistRadio'>
			<label for='playlistRadio'>Playlist</label>

			<input type='radio' name='entityType' v-model='entityType' value='user' id='userRadio'>
			<label for='userRadio'>User</label>
		</section>

		<keep-alive>
			<section v-if='entityType === "track"'>
				<input class='property' v-model='inputTrack.id'			placeholder='id'>
				<input class='property' v-model='inputTrack.playlistId'	placeholder='playlistId'>
				<input class='property' v-model='inputTrack.position'	placeholder='position'>
				<input class='property' v-model='inputTrack.source'		placeholder='source'>
				<input class='property' v-model='inputTrack.sourceId'	placeholder='sourceId'>
				<input class='property' v-model='inputTrack.name'		placeholder='name'>
				<input class='property' v-model='inputTrack.duration'	placeholder='duration'>
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
				<input class='property' v-model='inputUser.password2'	placeholder='password2'>
			</section>
		</keep-alive>

		<h3>Result</h3>
		<p>{{JSON.stringify(this.result)}}</p>

		<h3>Content</h3>
		<track-display-list v-if='entityType === "track"' :p-data='retrievedTracks'></track-display-list>
		<playlist-display-list  v-else-if='entityType === "playist"' :p-data='retrievedPlaylists'></playlist-display-list>
		<!-- <user-display-list  v-else-if='entityType === "user"' :p-data='retrievedUsers'></user-display-list> -->
		
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
</style>