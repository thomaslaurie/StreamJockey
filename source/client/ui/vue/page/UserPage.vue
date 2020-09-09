<script>
import {
	User,
} from '../../../entities/index.js';
import * as session from '../../../session-methods.js';

import AsyncDisplay from '../async/AsyncDisplay.vue';
import PlaylistDisplayList from '../playlist/PlaylistDisplayList.vue';

export default {
	name: 'user-page',
	extends: AsyncDisplay,
	components: {
		PlaylistDisplayList,
	},
	data() {
		return {
		// OVERWRITES
			Entity: User,
			sQuery: {id: Number.parseInt(this.$route.params.id)}, //TODO properly cast
		};
	},
	methods: {
		// NEW
		async logout() {
			await session.logout().catch((rejected) => {
				//TODO handle error
				console.error(rejected);
			});

			this.$router.push('/login');
		},
	},
};
</script>


<template>
    <async-switch
		:state='state'
		:error='error'
		@refresh='refresh'
		:loading-component='$options.components.LoadingComponent'
		:error-component='$options.components.ErrorComponent'
		v-slot='slotProps'
	>
        <button @click='logout'>Logout</button>
        <h4>user #{{content.id}}</h4>
        <h1>{{content.name}}</h1>
        <h3>{{content.email}}</h3>
        <playlist-display-list :p-query='{userId: content.id}'></playlist-display-list>
    </async-switch>
</template>


<style lang='scss'>
</style>
