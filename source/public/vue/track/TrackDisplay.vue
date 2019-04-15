<script>
	import AsyncDisplay from '../async/AsyncDisplay.vue';
	
    export default {
        name: 'track-display',
		extends: AsyncDisplay,
		props: {
			addButton: Boolean,
			removeButton: Boolean,
		},
        methods: {
            async getData() {
				return await this.sj.getTrack(this.query).then(this.sj.content).then(this.sj.one);
			},
			async open(id) {
                this.$router.push(`/track/${id}`);
            },
            async play() {
			},
			async del() { //! shortened to del to avoid delete reserved word
				await this.sj.removeTrack(this.data);
				this.$emit('update'); //C communicates to the parent that this has updated, and that the parent should refresh too, //? however this is only really useful for removes because this component can get it's own data
			},
			async add() {
				//C does not manupulate database because this component doesn't know what its being added too, will just send itself to the parent to be handled
				this.$emit('add', this.data);
			},
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent' 
	class='track-display'>
		<div id='left'>
			<button id='play-button' @click='play()'>Play</button>

			<div id='content'>
				<p id='artists'>{{data.artists.join(', ')}}</p>
				<p id='name'>{{data.name}}</p>
			</div>
		</div>
		<div id='right'>
			<button v-if='addButton' @click='add'>Add</button>
			<button v-if='removeButton' @click='del'>Delete</button>
		</div>
		<!-- //TODO <button @click='open(data.id)'>Info</button> -->
    </async-switch>
</template>

<style lang='scss'>
	$track-height: 50px;

	.track-display{
		height: $track-height;
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
		#play-button {
			width: $track-height;
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