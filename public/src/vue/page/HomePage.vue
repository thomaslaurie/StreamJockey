<script>
    import EntryPage from './EntryPage.vue';

    export default {
        name: 'home-page',
        methods: {
            async auth() {
                let temp = await this.sj.spotify.auth();
            },
            async loadPlayer() {
                await this.sj.spotify.loadPlayer();
			},
			async search() {
				await this.sj.spotify.search('test');
            },
        },
    }
</script>


<template>
    <div>
        <button @click='auth()'>Auth</button>
        <button @click='loadPlayer()'>Load Player</button>
		<button @click='search()'>Search</button>
    </div>
</template>


<style scoped lang='scss'>
</style>