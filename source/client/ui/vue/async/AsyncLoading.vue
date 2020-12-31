<script>
import emitRefresh from '../mixins/emitRefresh.js';

export default {
	name: 'async-loading',
	mixins: [emitRefresh],
	emits: ['refresh'],
};
</script>


<template>
    <div>
        <h2>Default Loading Component</h2>
    </div>
</template>


<style lang='scss'>
</style>
