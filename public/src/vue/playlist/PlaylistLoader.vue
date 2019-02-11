<script>
    import BaseLoader from '../async/BaseLoader.vue';

    export default {
        name: 'playlist-loader',
        extends: BaseLoader,
        methods: {
            //C getDisplay() should overwrite BaseLoader's getDisplay() method, it is called by the inherited created() method
            async getDisplay() {
                let list = await this.sj.getPlaylist(this.query).then(this.sj.returnContent);
                return this.sj.one(list);
            },
            async open() {
            },
        },
        template: this.sj.dynamicTemplate(`
            <li>
                <p>{{display.id}}</p>
                <p>{{display.name}}</p>
                <button @click='open'>Open</button>
                <button>Play</button>
            </li>
        `),
    }
</script>


<style scoped lang='scss'>
</style>