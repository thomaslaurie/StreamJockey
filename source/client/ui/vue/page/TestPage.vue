<script>
import TestComponent from '../test-component.vue';

export default {
	name: 'test-page',
	components: {
		TestComponent,
	},
	setup() {

	},
};
</script>

<template>
	<Suspense>
		<test-component></test-component>
	</Suspense>
</template>


<style lang='scss'>
</style>
