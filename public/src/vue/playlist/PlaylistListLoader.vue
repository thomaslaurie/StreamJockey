<script>
    import BaseListLoader from '../async/BaseListLoader.vue';

    export default {
        name: 'playlist-list-loader',
        extends: BaseListLoader,
        methods: {
            async getDisplay() {
                return await this.sj.getPlaylist(this.query).then(this.sj.returnContent);
            },
            async open(id) {
                this.$router.push(`/playlist/${id}`);
            },
        },
        template: this.sj.dynamicTemplate(`
            <ul>
                <li
                    v-for='playlist in display' 
                    :key='playlist.id' 
                    :display='playlist'
                >
                    <p>{{playlist.id}}</p>
                    <p>{{playlist.name}}</p>
                    <button @click='open(playlist.id)'>Open</button>
                    <button>Play</button>
                </li>
            </ul>
        `),
    }
</script>


<style scoped lang='scss'>
</style>