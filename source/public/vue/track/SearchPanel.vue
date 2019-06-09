<script>
	import TrackDisplayList from '../track/TrackDisplayList.vue';

    export default {
        name: 'search-panel',
        components: {
            TrackDisplayList,
        },
        data() {
            return {
				// NEW
				playlist: null,

				source: this.$root.sj.spotify, //TODO
				term: '',
				results: [],
            };
		},
		props: {
			targetPlaylistId: {
				default: null,
				type: Number, //C the target playlist that tracks should be added to
			},
		},
		computed: {
			playlistId() {
				if (this.sj.isType(this.playlist, Object)) return this.playlist.id;
				else return null;
			},
		},


        methods: {
            async search() {
				this.results = await this.source.search(this.term);
			},
			async add(track) { //C add cant be on SearchTrackDisplayList because it can't see TrackDisplayList
				track.playlistId = this.targetPlaylistId;
				await this.sj.Track.add(track);
			},

			async addPlaylist() {
				//C add a search result playlist to store and play search results from
				const currentUser = await this.sj.session.get().then(this.sj.content);
				this.playlist = await new this.sj.Playlist({
					userId: currentUser.id,
					name: `searchPlaylist${this.sj.makeKey(10)}`,
				}).add().then(this.sj.content).then(this.sj.one);
			},
			async removePlaylist() {
				//C remove the search result playlist
				await this.playlist.remove();
			},
		},

		created() {
			this.addPlaylist();
		},

		beforeDestroy() {
			this.removePlaylist();
		},
    }
</script>

<template>
	<div>
		<input v-model='term' @keyup.enter='search'>
		<button @click='search'>Search</button>

		<!-- //TODO pass created playlist to this, somehow -->
		<track-display-list :p-query='{id: playlistId}' addButton @add='add'></track-display-list>
	</div>
</template>

<style lang='scss'>
</style>