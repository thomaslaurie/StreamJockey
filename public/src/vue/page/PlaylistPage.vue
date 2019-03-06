<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';
    import TrackDisplayList from '../track/TrackDisplayList.vue';

    export default {
        name: 'playlist-page',
        extends: AsyncDisplay,
        components: {
            TrackDisplayList,
        },
        methods: {
            async getData() {
                let result = await this.sj.getPlaylist({id: this.$route.params.id}).then(this.sj.returnContent);
                return this.sj.one(result);
            },
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <h4>playlist #{{data.id}}, user #{{data.userId}}</h4>
        <h1>{{data.name}}</h1>
        <h2>{{data.visibility}}</h2>
        <p>{{data.description}}</p>
        <track-display-list :query='{playlistId: data.id}'></track-display-list>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>