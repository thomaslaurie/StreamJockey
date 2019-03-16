<script>
	import AsyncDisplay from '../async/AsyncDisplay.vue';
	
    export default {
        name: 'track-display',
        extends: AsyncDisplay,
        methods: {
            async getData() {
				let list = await this.sj.getTrack(this.query).then(this.sj.returnContent);
				return this.sj.one(list);
            },
            async play() {
            },
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
		<p>Playlist ID: {{data.playlistId}}</p>
		<p>Position: {{data.position}}</p>
		<p>Source: {{data.source}}</p>
		<p>Name: {{data.name}}</p>
		<p>Duration: {{data.duration}}</p>
		<button @click='open(data.id)'>Info</button>
		<button @click='play()'>Play</button>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>