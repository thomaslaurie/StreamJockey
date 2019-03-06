<script>
    import reload from '../mixins/reload.mjs';

    export default {
        name: 'async-error',
        mixins: [reload],
        props: {
            error: [Object, Error],
        },
    }
</script>


<template>
    <div>
        <h2>Default Error Component</h2>
        <p>Error: {{JSON.stringify(error)}}</p>
    </div>
</template>


<style scoped lang='scss'>
</style>