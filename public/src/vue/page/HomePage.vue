<script>
    import EntryPage from './EntryPage.vue';

    export default {
        name: 'home-page',
        methods: {
            async auth() {
                let temp = await this.sj.spotify.auth();
                console.log('AUTH RESULT: ', temp);
            },
            async loadApi() {
                await this.sj.spotify.loadApi();
            },
            async loadPlayer() {
                await this.sj.spotify.loadPlayer();
            },
        },
    }
</script>


<template>
    <div>
        <button @click='auth()'>Auth</button>
        <button @click='loadApi()'>Load Api</button>
        <button @click='loadPlayer()'>Load Player</button>
    </div>
</template>


<style scoped lang='scss'>
</style>