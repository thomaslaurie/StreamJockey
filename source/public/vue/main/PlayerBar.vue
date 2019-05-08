<script>
    export default {
		name: 'player-bar',
		
		methods: {
			async toggle() {
				await this.$store.dispatch('player/toggle');
			},
		},
	}
</script>


<template>
    <div>
		<button>Prev</button>
		<button>Next</button>
		<button @click='toggle'>Toggle</button>
		<input type='range' min='0' max='1' step='0.0001' value='0' id='slider'>
	</div>
</template>


<style lang='scss'>
	#slider {
		width: 100%;
	}
</style>