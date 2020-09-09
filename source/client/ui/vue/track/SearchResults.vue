<script>
import {
	one,
	keyCode,
	rules,
} from '../../../../shared/utility/index.js';
import Source from '../../../../client/source.js';
import TrackDisplayList from '../track/TrackDisplayList.vue';
import {
	Track,
} from '../../../entities/index.js';

export default {
	name: 'search-results',
	components: {
		TrackDisplayList,
	},
	data() {
		return {
			term: '',
			results: [],
		};
	},
	props: {
		source: {
			default: null,
			validator(value) {
				return Source.instances.includes(value);
			},
		},
		// target playlist to add to
		playlistId: {
			default: null,
			validator(value) {
				//! validator cannot reference this, must use a separately imported sj reference
				return value === null || rules.positiveInteger.test(value);
			},
		},
	},
	methods: {
		async search() {
			this.results = await this.source.search({
				term: this.term,
				startIndex: 0,
				amount: 5,
			});
		},

		async add(track) {
			// add must be here and not on TrackDisplayList because TrackDisplayList doesn't have access to the target playlist
			track.playlistId = this.playlistId;
			await Track.add(track);
		},

		/* //R having search results be a temporary database playlist

				deleting the playlist on window close is difficult and doesn't trigger vue destory hooks

				an option is to create a temporary entity type
				however, it is still difficult to ensure their destruction if the server closes/crashes

				also, the only reason this was being done was so that next/prev behavior works with the search list
				however, this isn't super neccessary, and the name displayed for the currently playing playlist will be weird (search key)
			*/
		/* //OLD
				//! existing playlist prop gets swapped to 'targetPlaylist'

				//! this goes into data
				playlist: null,

				//! this goes into computed
				playlistId() {
					const id = this.sj.deepAccess(this, ['playlist', 'id']);
					if (this.sj.Rule2.positiveInteger.check(id)) return id;
					else return null;
				},

				async search() {
					// get existing searched tracks
					const searchedTracks = await Track.get({
						playlistId: this.playlistId,
					}).then(this.sj.content);

					// remove them all
					await Track.remove(this.sj.shake(searchedTracks, Track.filters.id));

					// search the new term
					this.results = await this.source.search({
						term: this.term,
						startIndex: 0,
						amount: 5,
					});

					// give them the search playlist id
					for (const result of this.results) {
						result.playlistId = this.playlistId;
					}

					// add them all
					await Track.add(this.results);
				},

				async addPlaylist() {
					console.log('ADD PLAYLIST CALLED');
					// add a search result playlist to store and play search results from
					const currentUser = await session.get().then(this.sj.content);
					this.playlist = await new this.sj.Playlist({
						userId: currentUser.id,
						name: `searchPlaylist${keyCode.create(10)}`,
					}).add().then(this.sj.content).then(one);
					console.log('PLAYLIST ADDED', this.sj.deepAccess(this, 'playlist', 'id'), this.sj.deepAccess(this, 'playlist', 'name'));
				},
				async removePlaylist() {
					console.log('REMOVE PLAYLIST CALLED', this.sj.deepAccess(this, 'playlist', 'id'), this.sj.deepAccess(this, 'playlist', 'name'));
					// remove the search result playlist
					await this.playlist.remove();
				},


				//! these are part of options
				created() {
					this.addPlaylist();
				},

				beforeDestroy() {
					this.removePlaylist();
				},

				//! this is an attribute of track-display-list
				:p-query:'{playlistId}'
			*/
	},
};
</script>

<template>
	<div>
		<input v-model='term' @keyup.enter='search'>
		<button @click='search'>Search</button>

		<track-display-list :p-content='results' addButton @add='add'></track-display-list>
	</div>
</template>

<style lang='scss'>
</style>
