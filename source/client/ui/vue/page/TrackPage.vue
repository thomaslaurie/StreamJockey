<script>
import AsyncError from '../async/AsyncError.vue';
import AsyncLoading from '../async/AsyncLoading.vue';

import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {one, rules} from '../../../../shared/utility/index.ts';
import {
	Track,
} from '../../../entities/index.js';
import {useSubscription} from '../hooks/index.js';

export default {
	name: 'track-page',
	components: {
		AsyncError,
		AsyncLoading,
	},
	setup() {
		const route = useRoute();

		const track = useSubscription({
			entity: Track,
			query: computed(() => ({id: rules.nonNegativeInteger.validateCast(route.params.id)[0]})),
			transform: data => one(data),
		});

		return {
			track,
		};
	},
};
</script>

<template>
	<template v-if='track.lastFulfilled'>
        <h4>track #{{track.data.id}}, playlist #{{track.data.playlistId}}</h4>
        <h4>position #</h4>
        <h1>{{track.data.name}}</h1>
        <h2>{{track.data.position}} - {{track.data.duration}}</h2>
        <h2>{{track.data.source.name}}}</h2>

        <button>Info</button>
        <button>Play</button>
	</template>
	<template v-else-if='track.lastRejected'>
		<async-error :error='track.error'></async-error>
	</template>
	<template v-else-if='track.isPending && !track.isDelayed'>
		<async-loading></async-loading>
	</template>
</template>

<style lang='scss'>
</style>
