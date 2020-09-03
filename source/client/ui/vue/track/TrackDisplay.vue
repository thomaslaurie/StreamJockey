<script>
	import AsyncDisplay from '../async/AsyncDisplay.vue';

	import {
		Track,
	} from '../../../entities/index.js';
	
    export default {
        name: 'track-display',
		extends: AsyncDisplay,
		props: {
			addButton: Boolean,
			removeButton: Boolean,
		},
		data() { return {
			//OVERWRITES
			Entity: Track,
		}; },
        methods: {
			// NEW
			async open(id) {
                this.$router.push(`/track/${id}`);
            },
            async play() {
				await this.$store.dispatch('player/start', this.content);
			},
			async remove() { //! shortened to del to avoid delete reserved word
				await Track.remove(this.content);
				this.$emit('update'); // communicates to the parent that this has updated, and that the parent should refresh too, //? however this is only really useful for removes because this component can get it's own content
			},
			async add() {
				// does not manupulate database because this component doesn't know what its being added too, will just send itself to the parent to be handled
				this.$emit('add', this.content);
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
		class='track-display'
	>
		<div id='left'>
			<button id='play-button' @click='play()'>Play</button>

			<div id='content'>
				<p id='artists'>{{content.artists.join(', ')}}</p>
				<p id='name'>{{content.name}}</p>
			</div>
		</div>
		<div id='right'>
			<button v-if='addButton' @click='add'>Add</button>
			<button v-if='removeButton' @click='remove'>Delete</button>
		</div>
		<!-- //TODO <button @click='open(content.id)'>Info</button> -->
    </async-switch>
</template>

<style lang='scss'>
	$track-height: 50px;

	.track-display{
		// height: $track-height;
		background-color: $list-item-color;
		display: flex;
		overflow: auto;
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
		#play-button {
			// width: $track-height;
			height: 100%;
		}
		#content {
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		#artists {
			font-size: 18px;
			padding: 0;
			margin: 0;
		}
		#name {
			font-size: 24px;
			padding: 0;
			margin: 0;
		}
	}
</style>