<script>
    export default {
		name: 'player-bar',

		data() { return {
			drag: false,
			manualProgress: 0,
		}; },

		computed: {
			sliderProgress() {
				if (!this.drag) {
					return this.$store.getters["player/actualPlayback"].progress;
				} else {
					return this.manualProgress; //C this makes the slider use its own value
				}
			},
		},
		
		methods: {
			async test() {
				console.log(this.sj.image(this.$store.getters['player/desiredPlayback'].track));
			},
			async toggle() {
				await this.$store.dispatch('player/toggle');
			},

			async input(event) {
				this.manualProgress = event.target.value;
			},
			async mousedown(event) {
				this.manualProgress = event.target.value; //C prevents slider from flickering to 0 on first mousedown
				this.drag = true;
			},
			async mouseup(event) {
				//! drag released here instead of on change because change won't fire on a stationary click
				this.manualProgress = event.target.value;
				await this.$store.dispatch('player/seek', event.target.value);
				this.drag = false;
			},
			async change(event) {
			},
			
		},
	}
</script>


<template>
    <div>
		<button @click='test'>Test</button>
		<button>Prev</button>
		<button>Next</button>
		<button @click='toggle'>Toggle</button>
		<!-- //L https://css-tricks.com/sliding-nightmare-understanding-range-input -->
		<input 
			type='range' 
			min='0' 
			max='1' 
			step='0.0001' 
			:value='sliderProgress' 
			id='slider'

			@mousedown='mousedown($event)'
			@mouseup='mouseup($event)'
			@input='input($event)'
			@change='change($event)'
		>
	</div>
</template>


<style lang='scss'>
	#slider {
		width: 100%;
	}
</style>