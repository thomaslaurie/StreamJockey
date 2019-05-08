<script>
	import AsyncDisplayList from '../async/AsyncDisplayList.vue';
	import TrackDisplay from './TrackDisplay.vue';
	
    export default {
        name: 'track-display-list',
		extends: AsyncDisplayList,
		components: {
			TrackDisplay,
		},
		data() { return {
			Entity: this.$root.sj.Track,
		}; },
		methods: {
			log() {
				console.log(this.sj.isType(this.data[0], this.sj.Track));
				console.log(this.sj.isType(this.data[0].source, this.sj.spotify));
				console.log(this.data[0].source);
			},
		},
    }
</script>


<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'
	class='track-display-list'>
        <ul>
			<button @click='log'>log</button>
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