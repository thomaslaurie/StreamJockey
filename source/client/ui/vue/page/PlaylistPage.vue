<script>
import SearchPanel from '../track/SearchPanel.vue';
import TrackItems from '../track/track-items.vue';
import AsyncError from '../async/AsyncError.vue';
import AsyncLoading from '../async/AsyncLoading.vue';

import {
	one,
	rules,
} from '../../../../shared/utility/index.js';

import {
	Playlist,
	Track,
} from '../../../entities/index.js';

import {
	spotify,
} from '../../../sources/index.js';
import {useSubscription} from '../hooks';
import {computed} from 'vue';
import {useRoute} from 'vue-router';

export default {
	name: 'playlist-page',
	components: {
		SearchPanel,
		TrackItems,
		AsyncError,
		AsyncLoading,
	},
	setup() {
		const route = useRoute();

		const playlist = useSubscription({
			entity: Playlist,
			query: computed(() => ({id: rules.nonNegativeInteger.validateCast(route.params.id)[0]})),
			transform: data => one(data),
		});
		const tracks = useSubscription({
			entity: Track,
			query: computed(() => ({playlistId: playlist.data?.id})),
			transform: data => data ?? [],
		});

		return {
			playlist,
			tracks,
		};
	},
	data() {
		return {
			edit: true,
			searchTerm: '',
			searchResults: [],
		};
	},
	methods: {
		async search() {
			this.searchResults = await spotify.search(this.searchTerm);
		},
		async add(track) { // add cant be on SearchDisplay because it can't see TrackItems
			track.playlistId = this.content.id;
			await Track.add(track);
			await this.refresh(); //TODO
		},
	},
};
</script>

<template>
	<template v-if='playlist.lastFulfilled'>
		<div class='playlist-page'>
			<h4>playlist #{{playlist.data?.id}}, user #{{playlist.data?.userId}}</h4>
			<h1>{{playlist.data?.name}}</h1>
			<h2>{{playlist.data?.visibility}}</h2>
			<p>{{playlist.data?.description}}</p>

			<button @click='edit = !edit'>Edit</button>

			<div id='main'>
				<track-items id='playlist' :tracks='tracks.data' removeButton></track-items>
				<search-panel v-if='edit' :playlistId='playlist.data?.id'></search-panel>
			</div>
		</div>
	</template>
	<template v-else-if='playlist.lastRejected'>
		<async-error :error='playlist.error'></async-error>
	</template>
	<template v-else-if='playlist.isPending && !playlist.isDelayed'>
		<async-loading></async-loading>
	</template>
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
