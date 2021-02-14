<script>
import TrackItem from './track-item.vue';

export default {
	name: 'track-items',
	components: {
		TrackItem,
	},
	props: {
		tracks: {
			type: Array,
			required: true,
		},
	},
};
</script>

<template>
	<ul class='track-items'>
		<li
			v-for='track of tracks'
			:key='track.id'
			:display='track'
		>
			<track-item :track='track' v-bind='$attrs'></track-item>
		</li>
	</ul>
</template>

<style lang='scss'>
	.track-items {
		$margin: 5px;
		padding: 0;
		margin: $margin 0 $margin 0;
		li {
			padding: 0;
			margin: $margin 0 $margin 0;
		}
	}
</style>
