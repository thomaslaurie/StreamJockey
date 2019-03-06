<script>
    import sj from '../../js/global-client.mjs';

    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'test-page',
        extends: AsyncDisplay,
        methods: {
            async getData() {
                await sj.wait(1000);
                throw 'test';
            },
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <h2>test display</h2>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>