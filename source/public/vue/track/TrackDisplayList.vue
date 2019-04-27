<script>
	import AsyncDisplayList from '../async/AsyncDisplayList.vue';
	import TrackDisplay from './TrackDisplay.vue';
	
    export default {
        name: 'track-display-list',
		extends: AsyncDisplayList,
		components: {
			TrackDisplay,
		},
        methods: {
            async getData() {
				return await this.sj.Track.get(this.query).then(this.sj.content);
			},
		},
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'
	class='track-display-list'>
        <ul>
            <li
                v-for='track in data' 
                :key='track.id' 
                :display='track'
            >
				<track-display :p-data='track' v-bind='attrs' v-on='listeners'></track-display>
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