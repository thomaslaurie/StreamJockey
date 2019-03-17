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
                return await this.sj.getTrack(this.query).then(this.sj.returnContent);
            },
            async open(id) {
                this.$router.push(`/track/${id}`);
            },
            async play() {
            },
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <ul>
            <li
                v-for='track in data' 
                :key='track.id' 
                :display='track'
            >
				<track-display :p-data='track'></track-display>
            </li>
        </ul>
    </async-switch>
</template>


<style scoped lang='scss'>
	$margin: 5px;
	ul {
		padding: 0;
		margin: $margin 0 $margin 0;
	}
	li {
		padding: 0;
		margin: $margin 0 $margin 0;
	}
</style>