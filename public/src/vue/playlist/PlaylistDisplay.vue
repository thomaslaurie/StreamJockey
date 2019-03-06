<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'playlist-display',
        extends: AsyncDisplay,
        methods: {
            async getData() {
                let list = await this.sj.getPlaylist(this.query).then(this.sj.returnContent);
                return this.sj.one(list);
            },
            async open() {
            },
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <li>
            <p>{{display.id}}</p>
            <p>{{display.name}}</p>
            <button @click='open'>Open</button>
            <button>Play</button>
        </li>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>