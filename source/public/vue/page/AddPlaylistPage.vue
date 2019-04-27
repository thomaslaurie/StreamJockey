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
                let playlist = await this.sj.Playlist.add({
                    userId: this.me.id, //TODO security issue here, maybe get the user from the server?
                    ...this,
				}).then(this.sj.content).then(this.sj.one).catch(rejected => {
                    //TODO handle error
                    console.error(rejected);
                })
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