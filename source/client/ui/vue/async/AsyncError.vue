<script>
import emitRefresh from '../mixins/emitRefresh.js';

export default {
	name: 'async-error',
	mixins: [emitRefresh],
	props: {
		error: [Object, Error],
	},
	methods: {
		logError() {
			console.error(this.error);
		},
	},
};
</script>


<template>
    <div>
        <h2>Default Error Component</h2>
        <p>Error: {{error.toString()}}</p>
		<p>Stack: {{error.stack}}</p>
		<button @click='logError'>Log Error</button>
		<button @click='emitRefresh'>Refresh</button>
    </div>
</template>


<style lang='scss'>
</style>
