<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';
	import TrackDisplayList from '../track/TrackDisplayList.vue';
	import SearchPanel from '../track/SearchPanel.vue';

    export default {
        name: 'playlist-page',
        extends: AsyncDisplay,
        components: {
			TrackDisplayList,
			SearchPanel,
        },
        data() {
            return {
				// OVERWRITES
				Entity: this.$root.sj.Playlist,
				sQuery: {id: this.$route.params.id},

				// NEW
                edit: true,
				searchTerm: '',
				searchResults: [],
            };
        },
        methods: {
			// NEW
            async search() {
				this.searchResults = await this.sj.spotify.search(this.searchTerm).then(this.sj.content);
			},
			async add(track) { //C add cant be on SearchTrackDisplayList because it can't see TrackDisplayList
				track.playlistId = this.data.id;
				await this.sj.Track.add(track);
				await this.refreshData(); //TODO
			},
		},
    }
</script>

<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'
	class='playlist-page'>
        <h4>playlist #{{data.id}}, user #{{data.userId}}</h4>
        <h1>{{data.name}}</h1>
        <h2>{{data.visibility}}</h2>
        <p>{{data.description}}</p>

        <button @click='edit = !edit'>Edit</button>

        <div id='main'>
            <track-display-list id='playlist' :p-query='{playlistId: data.id}' removeButton></track-display-list>

			<search-panel v-if='edit' :playlistId='data.id'></search-panel>
        </div>
    </async-switch>
</template>

<style lang='scss'>
	.playlist-page {
		#main {
        	display: flex;
		}
		#playlist {
			flex: 1 1 0;
		}
		#search-div {
			flex: 1 1 0;
		}
	}
</style>