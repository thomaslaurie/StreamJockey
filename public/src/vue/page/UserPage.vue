<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';
    import PlaylistDisplayList from '../playlist/PlaylistDisplayList.vue';

    export default {
        name: 'user-page',
        extends: AsyncDisplay,
        components: {
            PlaylistDisplayList,
        },
        methods: {
            async getData() {
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
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <button @click='logout'>Logout</button>
        <h4>user #{{data.id}}</h4>
        <h1>{{data.name}}</h1>
        <h3>{{data.email}}</h3>
        <playlist-display-list :query='{userId: data.id}'></playlist-display-list>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>