<script>
    import BaseLoader from '../async/BaseLoader.vue';

    export default {
        name: 'track-page',
        mixins: [BaseLoader],
        methods: {
            async getDisplay() {
                let result = await this.sj.getTrack({id: this.$route.params.id}).then(this.sj.returnContent);
                return this.sj.one(result);
            },
        },
        template: this.sj.dynamicTemplate(/*html*/`
            <div>
                <h4>track #{{display.id}}, playlist #{{display.playlistId}}</h4>
                <h4>position #</h4>
                <h1>{{display.name}}</h1>
                <h2>{{display.position}} - {{display.duration}}</h2>
                <h2>{{display.source}} {{display.sourceId}}</h2>

                <button>Info</button>
                <button>Play</button>
            </div>
        `),
    }
</script>


<style scoped lang='scss'>
</style>