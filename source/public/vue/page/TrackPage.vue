<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'track-page',
        extends: AsyncDisplay,
        methods: {
			alternateQuery() {
				return {id: this.$route.params.id};
			},
            async getData() {
                let result = await this.sj.getTrack(this.query).then(this.sj.content);
                return this.sj.one(result);
            },
		},
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <h4>track #{{data.id}}, playlist #{{data.playlistId}}</h4>
        <h4>position #</h4>
        <h1>{{data.name}}</h1>
        <h2>{{data.position}} - {{data.duration}}</h2>
        <h2>{{data.source}} {{data.sourceId}}</h2>

        <button>Info</button>
        <button>Play</button>
    </async-switch>
</template>

<style scoped lang='scss'>
</style>