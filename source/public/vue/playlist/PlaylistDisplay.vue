<script>
	import AsyncDisplay from '../async/AsyncDisplay.vue';
	
	import {
		Playlist,
	} from '../../../client/entities/index.js';

    export default {
        name: 'playlist-display',
		extends: AsyncDisplay,
		data() { return {
			//OVERWRITES
			Entity: Playlist,
		}; },
        methods: {
			// NEW
            async open(id) {
                this.$router.push(`/playlist/${id}`);
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
	class='playlist-display'>
		<div id='left'>
			<!-- <button id='play-button' @click='play()'>Play</button> -->

			<div id='content'>
				<p id='name'>{{content.name}}</p>
			</div>
		</div>
		<div id='right'>
			<button @click='open(content.id)'>Open</button>
		</div>
    </async-switch>
</template>


<style lang='scss'>
	$playlist-height: 50px;

	.playlist-display{
		height: $playlist-height;
		background-color: $list-item-color;
		display: flex;
		#left, #right {
			display: inline-flex;
		}
		#left {
			height: 100%;
			justify-content: flex-start;
			flex-grow: 1;
		}
		#right {
			height: 100%;
			justify-content: flex-end;
		}
		#content {
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			#name {
				font-size: 24px;
				padding: 0;
				margin: 0;
			}
		}
		
	}
</style>