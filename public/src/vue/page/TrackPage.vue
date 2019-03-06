<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'track-page',
        extends: AsyncDisplay,
        methods: {
            async getData() {
                let result = await this.sj.getTrack({id: this.$route.params.id}).then(this.sj.returnContent);
                return this.sj.one(result);
            },
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='LoadingComponent' :error-component='ErrorComponent'>
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