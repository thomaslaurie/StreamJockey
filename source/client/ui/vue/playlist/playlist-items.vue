<script>
import PlaylistItem from './playlist-item.vue';

export default {
	name: 'playlist-items',
	components:  {
		PlaylistItem,
	},
	props: {
		playlists: {
			type: Array,
			required: true,
		},
	},
};
</script>

<template>
	<ul class='playlist-items'>
		<li
			v-for='playlist in playlists'
			:key='playlist.id'
			:display='playlist'
		>
			<playlist-item :playlist='playlist' v-bind='$attrs'></playlist-item>
		</li>
	</ul>
</template>

<style lang='scss'>
	.playlist-items {
		$margin: 5px;
		ul {
			padding: 0;
			margin: $margin 0 $margin 0;
		}
		li {
			padding: 0;
			margin: $margin 0 $margin 0;
		}
	}
</style>
