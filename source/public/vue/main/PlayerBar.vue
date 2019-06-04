<script>
    export default {
		name: 'player-bar',

		data() { return {
			drag: false,
			manualProgress: 0,

			prevTrackSubscription: null,
			nextTrackSubscription: null,
		}; },

		computed: {
			currentTrack() {
				return this.$store.getters['player/desiredTrack'];
			},
			prevTrack() {
				if (this.sj.isType(this.prevTrackSubscription, this.sj.Subscription)) {
					const tracks = this.$store.getters.getLiveData(this.prevTrackSubscription);
					if (tracks.length === 1) return this.sj.one(tracks);
				}
				return null;
			},
			nextTrack() {
				if (this.sj.isType(this.nextTrackSubscription, this.sj.Subscription)) {
					const tracks = this.$store.getters.getLiveData(this.nextTrackSubscription);
					if (tracks.length === 1) return this.sj.one(tracks);
				}
				return null;
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
			currentTrack: {
				//C updates subscriptions for prev/next track when currentTrack changes
				async handler(currentTrack) {
					await this.updateOffsetTrack({
						currentTrack,
						offset: -1,
						trackKey: 'prevTrack',
						subscriptionKey: 'prevTrackSubscription',
					});
					await this.updateOffsetTrack({
						currentTrack,
						offset: 1,
						trackKey: 'nextTrack',
						subscriptionKey: 'nextTrackSubscription',
					});
				},
				
				deep: true,
				immediate: true,
			},
		},
		
		methods: {
			async test() {
				//console.log(this.sj.image(this.$store.getters['player/desiredPlayback'].track));

				console.log('prevTrack', this.sj.image(this.prevTrack));
				console.log('nextTrack', this.sj.image(this.nextTrack));
			},


			async updateOffsetTrack({
				currentTrack,
				offset, 
				trackKey,
				subscriptionKey,
			}) {
				//TODO subscribe/unsubscribe are being called many times for the prev/next track, when changning from a playing track to another

				//C if currentTrack doesn't exist
				if (!this.sj.isType(currentTrack, this.sj.Track)) {
					//C wipe subscription
					this[subscriptionKey] = await this.$store.dispatch('unsubscribe', {subscription: this[subscriptionKey]});
					return;
				}

				//C calculate offsetPosition
				const offsetPosition = currentTrack.position + offset;

				//C if the subscription needs to be updated
				if ( 
					!this.sj.isType(this[trackKey], this.sj.Track) ||
					this[trackKey].playlistId !== currentTrack.playlistId ||
					this[trackKey].position !== offsetPosition
				) {
					//C if the offsetPosition (and possibly other values) pass validation
					//! these just have to not throw validation errors on the server-side, they can still be bad queries that don't return anything, that case is checked by the track getters
					//TODO replace with the same validation as this.sj.Track.position, after the new rule class is implemented, this should be the same rule that the query gets validated with on the server, because we don't want the subscription query to error
					if (offsetPosition >= 0) {
						//C add/change to a new subscription
						this[subscriptionKey] = await this.$store.dispatch('change', {
							subscription: this[subscriptionKey],

							Entity: this.sj.Track,
							query: {
								playlistId: currentTrack.playlistId,
								position: offsetPosition,
							},
						});
					} else {
						//C wipe the subscription (as something is out of bounds)
						this[subscriptionKey] = await this.$store.dispatch('unsubscribe', {subscription: this[subscriptionKey]});
					}
				}
			},


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
		<button @click='prev' :class='{notAvailable: prevTrack === null}'>Prev</button>
		<button @click='next' :class='{notAvailable: nextTrack === null}'>Next</button>
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