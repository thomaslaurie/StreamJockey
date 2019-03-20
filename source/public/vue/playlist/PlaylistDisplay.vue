<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'playlist-display',
        extends: AsyncDisplay,
        methods: {
            async getData() {
                let list = await this.sj.getPlaylist(this.query).then(this.sj.content);
                return this.sj.one(list);
            },
            async open(id) {
                this.$router.push(`/playlist/${id}`);
            },
		},
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
		<p>{{data.id}}</p>
		<p>{{data.name}}</p>
		<button @click='open(data.id)'>Open</button>
		<button>Play</button>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>