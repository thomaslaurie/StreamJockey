<script>
    import emitRefresh from '../mixins/emitRefresh.mjs';

    export default {
        name: 'async-error',
        mixins: [emitRefresh],
        props: {
            error: [Object, Error],
        },
    }
</script>


<template>
    <div>
        <h2>Default Error Component</h2>
        <p>Error: {{error.toString()}}</p>
		<p>Stack: {{error.stack}}</p>
		<button @click='reload()'>Reload</button>
    </div>
</template>


<style scoped lang='scss'>
</style>