<script>
    import BaseLoader from '../async/BaseLoader.vue';
    import TrackListLoader from '../track/TrackListLoader.vue';

    export default {
        name: 'playlist-page',
        mixins: [BaseLoader],
        components: {
            TrackListLoader,
        },
        methods: {
            async getDisplay() {
                let result = await this.sj.getPlaylist({id: this.$route.params.id}).then(this.sj.returnContent);
                return this.sj.one(result);
            },
        },
        template: this.sj.dynamicTemplate(/*html*/`
            <div>
                <h4>playlist #{{display.id}}, user #{{display.userId}}</h4>
                <h1>{{display.name}}</h1>
                <h2>{{display.visibility}}</h2>
                <p>{{display.description}}</p>
                <track-list-loader :query='{playlistId: display.id}'></track-list-loader>
            </div>
        `),
    }
</script>


<style scoped lang='scss'>
</style>