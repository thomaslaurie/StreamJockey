<script>
	import SearchTrackDisplayList from '../track/SearchTrackDisplayList.vue';

    export default {
        name: 'search-panel',
        components: {
            SearchTrackDisplayList,
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
			targetPlaylist: {
				default: null,
				type: Object, //C the target playlist that tracks should be added to
			},
		},
		computed: {
			playlistId() {
				const id = this.sj.deepAccess(this, ['playlist', 'id']);
				if (this.sj.Rule2.positiveInteger.check(id)) return id;
				else return null;
			},
			targetPlaylistId() {
				const id = this.sj.deepAccess(this, ['targetPlaylist', 'id']);
				if (this.sj.Rule2.positiveInteger.check(id)) return id;
				else return null;
			},
		},

        methods: {
            async search() {
				//C get existing searched tracks
				const searchedTracks = await this.sj.Track.get({
					playlistId: this.playlistId,
				}).then(this.sj.content);

				//C remove them all
				await this.sj.Track.remove(this.sj.shake(searchedTracks, this.sj.Track.filters.id));
				
				//C search the new term
				this.results = await this.source.search({
					term: this.term, 
					startIndex: 0, 
					amount: 5,
				});

				//C give them the search playlist id
				for (const result of this.results) {
					result.playlistId = this.playlistId;
				}

				//C add them all
				await this.sj.Track.add(this.results);
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

		<search-track-display-list :p-query='{playlistId}' addButton @add='add'></search-track-display-list>
	</div>
</template>

<style lang='scss'>
</style>