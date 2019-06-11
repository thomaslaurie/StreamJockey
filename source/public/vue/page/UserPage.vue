<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';
    import PlaylistDisplayList from '../playlist/PlaylistDisplayList.vue';

    export default {
        name: 'user-page',
        extends: AsyncDisplay,
        components: {
            PlaylistDisplayList,
		},
		data() { return {
			//OVERWRITES
			Entity: this.$root.sj.User,
			sQuery: {id: this.$route.params.id},
		}; },
        methods: {
			// NEW
            async logout() {
                await this.sj.session.logout().catch(rejected => {
                    //TODO handle error
                    console.error(rejected);
                });

                this.$router.push('/login');
            },
		},
    }
</script>


<template>
    <async-switch 
		:state='state' 
		:error='error' 
		@refresh='refresh' 
		:loading-component='$options.components.LoadingComponent' 
		:error-component='$options.components.ErrorComponent'>
        <button @click='logout'>Logout</button>
        <h4>user #{{data.id}}</h4>
        <h1>{{data.name}}</h1>
        <h3>{{data.email}}</h3>
        <playlist-display-list :p-query='{userId: data.id}'></playlist-display-list>
    </async-switch>
</template>


<style lang='scss'>
</style>