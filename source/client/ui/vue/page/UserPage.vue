<script>
import PlaylistItems from '../playlist/playlist-items.vue';
import AsyncError from '../async/AsyncError.vue';
import AsyncLoading from '../async/AsyncLoading.vue';

import {computed, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {
	Playlist,
	User,
} from '../../../entities/index.js';
import * as session from '../../../session-methods.js';

import {useSubscription} from '../hooks/index.js';
import {one, rules} from '../../../../shared/utility/index.ts';
import {useStore} from 'vuex';

export default {
	name: 'user-page',
	components: {
		PlaylistItems,
		AsyncError,
		AsyncLoading,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();

		const user = useSubscription({
			entity: User,
			query: computed(() => ({id: rules.nonNegativeInteger.validateCast(route.params.id)[0]})),
			transform: data => one(data),
		});
		const playlists = useSubscription({
			entity: Playlist,
			query: computed(() => ({userId: user.data?.id})),
			transform: data => data ?? [],
		});

		async function logout() {
			await session.logout().catch(rejected => {
				//TODO handle error
				console.error(rejected);
			});

			router.push('/login');
		}

		const store = useStore();

		async function testLiveData() {
			await store.dispatch('test');
		}

		return {
			user,
			playlists,
			logout,
			testLiveData,
		};
	},
};
</script>


<template>
	<template v-if='user.lastFulfilled'>
		<button @click='logout'>Logout</button>
		<button @click='testLiveData'>Test Live Data</button>
        <h4>user #{{user.data.id}}</h4>
        <h1>{{user.data.name}}</h1>
        <h3>{{user.data.email}}</h3>
		<playlist-items :playlists='playlists.data'></playlist-items>
	</template>
	<template v-else-if='user.lastRejected'>
		<async-error :error='user.error'></async-error>
	</template>
	<template v-else-if='user.isPending && !user.isDelayed'>
		<async-loading></async-loading>
	</template>
</template>


<style lang='scss'>
</style>
