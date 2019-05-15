<script>
    export default {
		name: 'player-bar',
		
		methods: {
			async test() {
				await this.$store.dispatch('player/checkPlayback');
			},
			async toggle() {
				await this.$store.dispatch('player/toggle');
			},
			async rapid() {
				for (let i = 0; i < 11; i++) {
					this.$store.dispatch('player/toggle');
				}
			},
		},
	}
</script>


<template>
    <div>
		<button @click='test'>Test</button>
		<button @click='rapid'>Rapid</button>
		<button>Prev</button>
		<button>Next</button>
		<button @click='toggle'>Toggle</button>
		<input type='range' min='0' max='1' step='0.0001' :value='$store.getters["player/inferredProgress"]' id='slider'>
	</div>
</template>


<style lang='scss'>
	#slider {
		width: 100%;
	}
</style>