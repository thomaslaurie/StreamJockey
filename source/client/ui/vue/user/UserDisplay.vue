<script>
import AsyncDisplay from '../async/AsyncDisplay.vue';

import {
	User,
} from '../../../entities/index.js';


export default {
	name: 'user-display',
	extends: AsyncDisplay,
	data() {
		return {
		// OVERWRITES
			Entity: User,
		};
	},
	methods: {
		// NEW
		async open(id) {
			this.$router.push(`/user/${id}`);
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
		v-slot='slotProps'>
		<p>{{content.id}}</p>
		<p>{{content.name}}</p>
		<button @click='open(content.id)'>Profile</button>
    </async-switch>
</template>


<style lang='scss'>
</style>
