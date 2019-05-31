<script>
    export default {
		name: 'player-bar',

		data() { return {
			drag: false,
			manualProgress: 0,

			prevTrack: null,
			nextTrack: null,

		}; },

		computed: {
			sliderProgress() {
				if (!this.drag) {
					return this.$store.getters["player/actualPlayback"].progress; //? should this be desired progress?
				} else {
					return this.manualProgress; //C this makes the slider use its own value
				}
			},
			//---------- add functionality to start prev/next track
			currentTrack() {
				return this.$store.getters['player/desiredPlayback'].track;
			},

			currentTrackLocalMetadata() {
				//console.log('CALLED');
				const currentTrack = this.$store.getters['player/desiredPlaybackNoProgress'].track;
				if (!this.sj.isType(currentTrack, Object)) return null;
				else return this.sj.shake(currentTrack, this.sj.Track.filters.localMetadata);
			},

			prevAvailable() {
				return this.prevTrack !== null;
			},
			nextAvailable() {
				return this.nextTrack !== null;
			},


			//TODO temporary prev/next functionality
			/*
				I want to have the current and prev/next tracks be reactive/subscriptions inside the player module
				furthermore, I think the subscription vuex part can be simplified (subscriptions moved onto sj.Entities) and itself moved into a module (with onCreate() stuff for the socketIO)
			*/
		},
		watch: {
			currentTrackLocalMetadata: { //C localMetadata is used over the entire track object because the track object it contains a reference to its source which contains a reference to the player which has a clock that updates very fast, causing this function update very fast too
				async handler(track, pTrack) {
					//console.log(track === pTrack);
					if (!this.sj.isType(track, Object))  {
						this.prevTrack = null;
						this.nextTrack = null;
						return;
					}

					//console.log('called');
					//console.log(this.sj.image(track));

					//TODO these are bad catches, they group end-track errors (0 & last index) with actual errors

					this.prevTrack = await this.sj.Track.get({
						playlistId: track.playlistId,
						position: track.position-1,
					}).then(this.sj.content).then(this.sj.one).catch(rejected => {
						//console.log('caught prev');
						return null;
					});

					this.nextTrack = await this.sj.Track.get({
						playlistId: track.playlistId,
						position: track.position+1,
					}).then(this.sj.content).then(this.sj.one).catch(rejected => {
						//console.log('caught next');
						return null;
					});
				},
				deep: true,
				immediate: true,
			},
		},
		
		methods: {
			async test() {
				//console.log(this.sj.image(this.$store.getters['player/desiredPlayback'].track));

				//console.log(this.sj.image(this.prevTrack));
				//console.log(this.sj.image(this.nextTrack));
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
			

			async prev(track) {
				await this.$store.dispatch('player/start', this.prevTrack);
			},
			async next(track) {
				await this.$store.dispatch('player/start', this.nextTrack);
			},
		},
	}
</script>


<template>
    <div>
		<button @click='test'>Test</button>
		<button @click='prev' :class='{notAvailable: !prevAvailable}'>Prev</button>
		<button @click='next' :class='{notAvailable: !nextAvailable}'>Next</button>
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
	.notAvailable {
		background-color: red;
	}

	#slider {
		width: 100%;
	}
</style>