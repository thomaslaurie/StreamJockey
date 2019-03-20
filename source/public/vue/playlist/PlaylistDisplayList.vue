<script>
	import AsyncDisplayList from '../async/AsyncDisplayList.vue';
	import PlaylistDisplay from './PlaylistDisplay.vue';

    export default {
        name: 'playlist-display-list',
		extends: AsyncDisplayList,
		components:  {
			PlaylistDisplay,
		},
        methods: {
            async getData() {
				return await this.sj.getPlaylist(this.query).then(this.sj.content);
            },
		},
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <ul>
            <li
                v-for='playlist in data' 
                :key='playlist.id' 
                :display='playlist'
            >
				<playlist-display :p-data='playlist'></playlist-display>
            </li>
        </ul>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>