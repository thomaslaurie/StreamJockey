<script>
    import AsyncDisplayList from '../async/AsyncDisplayList.vue';
    export default {
        name: 'track-display-list',
        extends: AsyncDisplayList,
        methods: {
            async getData() {
                return await this.sj.getTrack(this.query).then(this.sj.returnContent);
            },
            async open(id) {
                this.$router.push(`/track/${id}`);
            },
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <ul>
            <li
                v-for='track in data' 
                :key='track.id' 
                :display='track'
            >
                <p>Playlist ID: {{track.playlistId}}</p>
                <p>Position: {{track.position}}</p>
                <p>Source: {{track.source}}</p>
                <p>Name: {{track.name}}</p>
                <p>Duration: {{track.duration}}</p>
                <button @click='open(track.id)'>Info</button>
                <button>Play</button>
            </li>
        </ul>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>