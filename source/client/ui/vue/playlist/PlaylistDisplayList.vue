<script>
import AsyncDisplayList from '../async/AsyncDisplayList.vue';
import PlaylistDisplay from './PlaylistDisplay.vue';
import {
	Playlist,
} from '../../../entities/index.js';

export default {
	name: 'playlist-display-list',
	extends: AsyncDisplayList,
	components:  {
		PlaylistDisplay,
	},
	data() {
		return {
		// OVERWRITES
			Entity: Playlist,
		};
	},
};
</script>


<template>
    <async-switch
		:state='state'
		:error='error'
		@refresh='refresh'
		:loading-component='$options.components.LoadingComponent'
		:error-component='$options.components.ErrorComponent'
		v-slot='slotProps'
		class='playlist-display-list'
	>
        <ul>
            <li
                v-for='playlist in content'
                :key='playlist.id'
                :display='playlist'
            >
				<playlist-display :p-content='playlist' v-bind='attrs' v-on='listeners'></playlist-display>
            </li>
        </ul>
    </async-switch>
</template>


<style lang='scss'>
	.playlist-display-list {
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
