<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';
	import TrackDisplayList from '../track/TrackDisplayList.vue';
	import SearchPanel from '../track/SearchPanel.vue';

	import {
		rules,
	} from '../../../shared/utility/index.js';

	import {
		Playlist,
		Track,
	} from '../../../client/entities/index.js';

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
				Entity: Playlist,
				sQuery: {id: rules.nonNegativeInteger.validateCast(this.$route.params.id)[0]},

				// NEW
                edit: true,
				searchTerm: '',
				searchResults: [],
            };
		},
        methods: {
			// NEW
            async search() {
				this.searchResults = await this.sj.spotify.search(this.searchTerm).then((result) => result.content);
			},
			async add(track) { //C add cant be on SearchTrackDisplayList because it can't see TrackDisplayList
				track.playlistId = this.content.id;
				await Track.add(track);
				await this.refresh(); //TODO
			},
		},
    }
</script>

<template>
    <async-switch 
		:state='state' 
		:error='error' 
		@refresh='refresh' 
		:loading-component='$options.components.LoadingComponent' 
		:error-component='$options.components.ErrorComponent'
		v-slot='slotProps'
	class='playlist-page'>
        <h4>playlist #{{content.id}}, user #{{content.userId}}</h4>
        <h1>{{content.name}}</h1>
        <h2>{{content.visibility}}</h2>
        <p>{{content.description}}</p>

        <button @click='edit = !edit'>Edit</button>

        <div id='main'>
            <track-display-list id='playlist' :p-query='{playlistId: content.id}' removeButton></track-display-list>

			<search-panel v-if='edit' :playlistId='content.id'></search-panel>
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