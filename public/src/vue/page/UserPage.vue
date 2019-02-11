<script>
    import BaseLoader from '../async/BaseLoader.vue';
    import PlaylistListLoader from '../playlist/PlaylistListLoader.vue';

    export default {
        name: 'user-page',
        mixins: [BaseLoader],
        components: {
            PlaylistListLoader,
        },
        methods: {
            async getDisplay() {
                let result = await this.sj.getUser({id: this.$route.params.id}).then(this.sj.returnContent);
                return this.sj.one(result);
            },
            async logout() {
                await this.sj.logout().catch(rejected => {
                    //TODO handle error
                    console.error(rejected);
                });

                this.$store.commit('setMe', null);
                this.$router.push('/login');
            },
        },
        template: this.sj.dynamicTemplate(/*html*/`
            <div>
                <button @click='logout'>Logout</button>
                <h4>user #{{display.id}}</h4>
                <h1>{{display.name}}</h1>
                <h3>{{display.email}}</h3>
                <playlist-list-loader :query='{userId: display.id}'></playlist-list-loader>
            </div>
        `),
    }
</script>


<style scoped lang='scss'>
</style>