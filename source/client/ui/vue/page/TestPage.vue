<script>
	import {
		wait,
	} from '../../../../shared/utility/index.js';

    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'test-page',
        extends: AsyncDisplay,
        methods: {
			// OVERWRITES
            async refreshData() {
                await wait(1000);
                throw {test: 'test'};
            },
        },
    }
</script>

<template>
    <async-switch 
		:state='state' 
		:error='error' 
		@refresh='refresh' 
		:loading-component='$options.components.LoadingComponent' 
		:error-component='$options.components.ErrorComponent'
		v-slot='slotProps'
	>
        <h2>test display</h2>
    </async-switch>
</template>


<style lang='scss'>
</style>