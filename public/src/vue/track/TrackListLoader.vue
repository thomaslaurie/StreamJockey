<script>
    import BaseListLoader from '../async/BaseListLoader.vue';

    export default {
        name: 'track-list-loader',
        extends: BaseListLoader,
        methods: {
            async getDisplay() {
                return await this.sj.getTrack(this.query).then(this.sj.returnContent);
            },
            async open(id) {
                this.$router.push(`/track/${id}`);
            },
        },
        template: this.sj.dynamicTemplate(/*html*/`
            <ul>
                <li
                    v-for='track in display' 
                    :key='track.id' 
                    :display='track'
                >
                    <p>Playlist ID: {{track.playlistId}}</p>
                    <p>Position: {{track.position}}</p>
                    <p>Source: {{track.source}}</p>
                    <p>Name: {{track.name}}</p>
                    <p>Duration: {{track.duration}}</p>
                    <button @click='open(track.id)'>Info</button>
                    <button>Play</button>
                </li>
            </ul>
        `),
    }
</script>

<style scoped lang='scss'>
</style>