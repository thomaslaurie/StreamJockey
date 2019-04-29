<script>
    import sj from '../../js/global-client.mjs';
    import AsyncDisplay from './AsyncDisplay.vue';

    export default {
        name: 'async-display-list',
        extends: AsyncDisplay,
        data() {
            return {
                //C change data default to empty list so that sj.dynamicSort() wont fail while data is loading
                data: [],
            };
        },
        props: {
            //TODO consider making this take an array, which then is able to sort by multiple columns
            orderBy: String,  
            ascending: Boolean,

            //C change data from Object to Array type, if used //TODO
            pData: [Array],
        },
        methods: {
            async getData() {
                return [];
            },
        },
        computed: {
            orderedData() {
                return this.sj.dynamicSort(this.data, this.ascending, this.orderBy);
			},
			//C transparent wrapper for list items just apply v-on='listeners' and v-bind='attrs' to any element that needs them
			//C any listeners/attrs for this list component can be pulled out of those that are passed down by adding the name to the destructured object:
			// const {listenerForThisList, ...listeners} = this.$listeners;
			//L https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html

			// v-bind='attrs' v-on='listeners' is used on components inside AsyncDisplayList that should pass their events up to AsyncDisplayList and have its attributes passed down, this is so that AsyncDisplayList can basically represent every component within its list

			attrs() {
    			const {...attrs} = this.$attrs;
    			return attrs;
  			},
			listeners() {
				const {...listeners} = this.$listeners;
				return listeners;
			},
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='LoadingComponent' :error-component='ErrorComponent'>
        <h2>Default List Display Component</h2>
        <p v:for='item in orderedData'>Default Item: {{item}}</p>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>