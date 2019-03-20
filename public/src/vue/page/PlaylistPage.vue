<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';
    import TrackDisplayList from '../track/TrackDisplayList.vue';

    export default {
        name: 'playlist-page',
        extends: AsyncDisplay,
        components: {
            TrackDisplayList,
        },
        data() {
            return {
                edit: true,
				searchTerm: '',
				searchResults: [],
            };
        },
        methods: {
			alternateQuery() {
				return {id: this.$route.params.id};
			},
            async getData() {
                return await this.sj.getPlaylist(this.query).then(this.sj.content).then(this.sj.one);
            },

            async search() {
				this.searchResults = await this.sj.spotify.search(this.searchTerm).then(this.sj.content);
			},
			async add(track) { //C add cant be on SearchTrackDisplayList because it can't see TrackDisplayList
				track.playlistId = this.data.id;
				await this.sj.addTrack(track);
				await this.getData();
			},
		},
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'
	class='playlist-page'>
        <h4>playlist #{{data.id}}, user #{{data.userId}}</h4>
        <h1>{{data.name}}</h1>
        <h2>{{data.visibility}}</h2>
        <p>{{data.description}}</p>

        <button @click='edit = !edit'>Edit</button>

        <div id='main'>
            <track-display-list id='playlist' :p-query='{playlistId: data.id}' deleteButton @update='getData'></track-display-list>

            <div id='search-div' v-if='edit'>
                <input v-model='searchTerm'>
                <button @click='search'>Search</button>
				<track-display-list :p-data='searchResults' addButton @add='add'></track-display-list>
            </div>
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