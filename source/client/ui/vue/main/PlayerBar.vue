<script>
// EXTERNAL
import fclone from 'fclone';

import {
	Track,
} from '../../../entities/index.js';
import {
	Subscription,
} from '../../../../shared/live-data.js';
import {
	rules,
} from '../../../../shared/utility/index.ts';

export default {
	name: 'player-bar',

	data() {
		return {
			drag: false,
			manualProgress: 0,

			playlistTracksSubscription: null,
		};
	},
	computed: {
		currentTrack() {
			return this.$store.getters['player/commandQueue']?.getDesiredState().track;
		},
		playlistId() {
			//TODO replace with playlistId rule
			return (rules.object.test(this.currentTrack) && rules.integer.test(this.currentTrack.playlistId))
				? this.currentTrack.playlistId
				: null;
		},
		playlistTracks() {
			return (this.playlistTracksSubscription instanceof Subscription)
				? this.$store.getters.getLiveData(this.playlistTracksSubscription)
				: null;
		},
		//TODO These might be unused.
		prevTrack() {
			const prevIndex = this.currentTrack?.position - 1;
			return this.playlistTracks?.[prevIndex] ?? null;
		},
		nextTrack() {
			const nextIndex = this.currentTrack?.position + 1;
			return this.playlistTracks?.[nextIndex] ?? null;
		},

		sliderProgress() {
			if (!this.drag) {
				return this.$store.getters['player/actualPlayback'].progress; //? should this be desired progress?
			}
			return this.manualProgress; // this makes the slider use its own value
		},
	},
	watch: {
		playlistId: {
			// ensure the playlistTracksSubscription is always the same as the currentTrack
			async handler(id, oldId) {
				// if playlistId doesn't exist
				if (id === null) {
					// wipe playlistTracksSubscription
					this.playlistTracksSubscription = await this.$store.dispatch('unsubscribe', {subscription: this.playlistTracksSubscription});

					// if the playlistId has changed or the playlistTracksSubscription doesn't exist
				} else if (id !== oldId || !(this.playlistTracksSubscription instanceof Subscription)) {
					// update the playlistTracksSubscription to the proper playlistId
					this.playlistTracksSubscription = await this.$store.dispatch('resubscribe', {
						subscription: this.playlistTracksSubscription,
						Entity: Track,
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

			console.log('prevTrack', fclone(this.prevTrack));
			console.log('nextTrack', fclone(this.nextTrack));
		},

		// BUTTONS
		async toggle() {
			await this.$store.dispatch('player/toggle');
		},

		//TODO //? How does the PlayerBar know that the desired track isn't part of some other playlist?
		//TODO //? How is a null track handled?
		async prev() {
			// Cloning array so that it doesn't mutate before the action is dispatched.
			const tracks = [...(this.playlistTracks ?? [])];
			await this.$store.dispatch('player/prev', tracks);
		},
		async next() {
			const tracks = [...(this.playlistTracks ?? [])];
			await this.$store.dispatch('player/next', tracks);
		},

		// SLIDER
		async input(event) {
			this.manualProgress = event.target.value;
		},
		async mousedown(event) {
			this.manualProgress = event.target.value; // prevents slider from flickering to 0 on first mousedown
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
};
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
		<div id='youtubeIFrame'></div>
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
