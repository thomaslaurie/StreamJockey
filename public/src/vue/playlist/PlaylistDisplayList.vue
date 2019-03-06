<script>
    import AsyncDisplayList from '../async/AsyncDisplayList.vue';

    export default {
        name: 'playlist-display-list',
        extends: AsyncDisplayList,
        methods: {
            async getData() {
                return await this.sj.getPlaylist(this.query).then(this.sj.returnContent);
            },
            async open(id) {
                this.$router.push(`/playlist/${id}`);
            },
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <ul>
            <li
                v-for='playlist in display' 
                :key='playlist.id' 
                :display='playlist'
            >
                <p>{{playlist.id}}</p>
                <p>{{playlist.name}}</p>
                <button @click='open(playlist.id)'>Open</button>
                <button>Play</button>
            </li>
        </ul>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>