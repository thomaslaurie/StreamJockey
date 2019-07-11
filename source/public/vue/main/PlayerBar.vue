<script>
    export default {
		name: 'player-bar',

		data() { return {
			drag: false,
			manualProgress: 0,

			playlistTracksSubscription: null,
		}; },
		computed: {
			currentTrack() {
				return this.$store.getters['player/desiredTrack'];
			},
			playlistId() {
				//TODO replace with playlistId rule
				return (this.sj.isType(this.currentTrack, Object) && this.sj.isType(this.currentTrack.playlistId, 'integer'))
					? this.currentTrack.playlistId
					: null;
			},
			playlistTracks() {
				return this.sj.isType(this.playlistTracksSubscription, this.sj.Subscription) 
					? this.$store.getters.getLiveData(this.playlistTracksSubscription)
					: null;
			},
			prevTrack() {
				return (
					this.sj.isType(this.currentTrack, this.sj.Track) &&			//C currentTrack exists
					this.sj.isType(this.playlistTracks, Array) &&				//C playlistTrack exists
					0 < this.currentTrack.position && 							//C//! currentTrack is after first track
					this.currentTrack.position < this.playlistTracks.length		//C currentTrack is not above bounds
						? this.playlistTracks[this.currentTrack.position-1] //!
						: null
				);
			},
			nextTrack() {
				return (
					this.sj.isType(this.currentTrack, this.sj.Track) &&			//C currentTrack exists
					this.sj.isType(this.playlistTracks, Array) &&				//C playlistTrack exists
					0 <= this.currentTrack.position && 							//C currentTrack is not below bounds
					this.currentTrack.position < this.playlistTracks.length-1	//C//! currentTrack is before last track
						? this.playlistTracks[this.currentTrack.position+1] //!
						: null
				);
			},

			sliderProgress() {
				if (!this.drag) {
					return this.$store.getters["player/actualPlayback"].progress; //? should this be desired progress?
				} else {
					return this.manualProgress; //C this makes the slider use its own value
				}
			},
		},
		watch: {
			playlistId: {
				//C ensure the playlistTracksSubscription is always the same as the currentTrack
				async handler(id, oldId) {
					//C if playlistId doesn't exist
					if (id === null) {
						//C wipe playlistTracksSubscription
						this.playlistTracksSubscription = await this.$store.dispatch('unsubscribe', {subscription: this.playlistTracksSubscription});

					//C if the playlistId has changed or the playlistTracksSubscription doesn't exist
					} else if (id !== oldId || !this.sj.isType(this.playlistTracksSubscription, this.sj.Subscription)) {
						//C update the playlistTracksSubscription to the proper playlistId
						this.playlistTracksSubscription = await this.$store.dispatch('resubscribe', {
							subscription: this.playlistTracksSubscription,
							Entity: this.sj.Track,
							query: {playlistId: id},
						});
					}
				},
				deep: true,
				immediate: true,
			},
		},
		methods: {
			async test() {
				console.log('%c---------', 'background-color: orange');
				
				console.log('prevTrack', this.sj.image(this.prevTrack));
				console.log('nextTrack', this.sj.image(this.nextTrack));
			},

			// BUTTONS
			async toggle() {
				await this.$store.dispatch('player/toggle');
			},
			async prev(track) {
				await this.$store.dispatch('player/start', this.prevTrack);
			},
			async next(track) {
				await this.$store.dispatch('player/start', this.nextTrack);
			},

			// SLIDER
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
		<button @click='prev' :disabled='prevTrack === null' :class='{notAvailable: prevTrack === null}'>Prev</button>
		<button @click='next' :disabled='nextTrack === null' :class='{notAvailable: nextTrack === null}'>Next</button>
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
		<div id='youtube'></div>
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