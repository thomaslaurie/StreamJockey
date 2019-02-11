<script>
    import VueX, {mapState} from '../../js/vuex.esm.browser.mjs'; 

    export default {
        name: 'add-playlist-page',
        data() {
            return {
                name: null,
                description: null,
            };
        },
        computed: {
            ...mapState(['me']),
        },
        methods: {
            async submit() {
                let result = await this.sj.addPlaylist({
                    userId: this.me.id, //TODO security issue here, maybe get the user from the server?
                    ...this,
                }).catch(rejected => {
                    //TODO handle error
                    console.error(rejected);
                });

                let playlist = this.sj.one(result.content);
                this.$router.push(`/playlist/${playlist.id}`);
            },
        },
    }
</script>


<template>
    <form @submit.prevent='submit'> 
        <input v-model='name'           placeholder='name'>
        <input v-model='description'    placeholder='description'>
        <input type='submit' value='Add'>
    </form>
</template>


<style scoped lang='scss'>
</style>