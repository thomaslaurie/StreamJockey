<script>
	import AsyncDisplay from '../async/AsyncDisplay.vue';
	import {
		Track,
	} from '../../../client/entities/index.js';

    export default {
        name: 'track-page',
		extends: AsyncDisplay,
		data() { return {
			// OVERWRITES
			Entity: Track,
			sQuery: {id: this.$route.params.id},
		}; },
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
	>
        <h4>track #{{content.id}}, playlist #{{content.playlistId}}</h4>
        <h4>position #</h4>
        <h1>{{content.name}}</h1>
        <h2>{{content.position}} - {{content.duration}}</h2>
        <h2>{{content.source}} {{content.sourceId}}</h2>

        <button>Info</button>
        <button>Play</button>
    </async-switch>
</template>

<style lang='scss'>
</style>