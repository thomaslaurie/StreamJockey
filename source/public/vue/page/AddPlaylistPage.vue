<script>
	import {
		one,
	} from '../../../shared/utility/index.js';
	import * as session from '../../../client/session-methods.js';
	import VueX, {mapState} from '../../js/vendor/vuex.esm.browser.js'; 
	
	import {
		Playlist,
	} from '../../../client/entities/index.js';

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
				const currentUser = await session.get().then((result) => result.content);
                const playlist = await Playlist.add({
                    userId: currentUser.id,
                    ...this,
				}).then((result) => result.content).then(one).catch(rejected => {
                    //TODO handle error
                    console.error(rejected);
				});
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