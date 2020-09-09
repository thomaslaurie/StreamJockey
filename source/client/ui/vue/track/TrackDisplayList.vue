<script>
import AsyncDisplayList from '../async/AsyncDisplayList.vue';
import TrackDisplay from './TrackDisplay.vue';

import {
	Track,
} from '../../../entities/index.js';

export default {
	name: 'track-display-list',
	extends: AsyncDisplayList,
	components: {
		TrackDisplay,
	},
	data() {
		return {
			Entity: Track,
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
		class='track-display-list'
	>
        <ul>
            <li
                v-for='track in content'
                :key='track.id'
                :display='track'
            >
				<track-display :p-content='track' v-bind='attrs' v-on='listeners'></track-display>
            </li>
        </ul>
    </async-switch>
</template>


<style lang='scss'>
	.track-display-list {
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
