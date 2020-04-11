<script>
	import {
		one,
	} from '../../js/utility/index.js';
    import VueX, {mapState} from '../../js/vendor/vuex.esm.browser.js'; 

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
				const currentUser = await this.sj.session.get().then(this.sj.content);
                const playlist = await this.sj.Playlist.add({
                    userId: currentUser.id,
                    ...this,
				}).then(this.sj.content).then(one).catch(rejected => {
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


<style lang='scss'>
</style>