<script>
    import sj from '../../js/global-client.mjs';
    import AsyncDisplay from './AsyncDisplay.vue';

    export default {
        name: 'async-display-list',
        extends: AsyncDisplay,
        data() {
            return {
				// OVERWRITES
                sData: [],
            };
        },
        props: {
			// OVERWRITES
			//C change data from Object to Array type, if used //TODO
            pData: [Array],

			// NEW
            //TODO consider making this take an array, which then is able to sort by multiple columns
            orderBy: String,  
            ascending: Boolean,
		},
		computed: {
			// OVERWRITES
			queryData() {
				//! AsyncDisplayList uses sj.any(subscription data)
				if (this.subscription) return this.sj.any(this.$store.getters.getSubscriptionData(this.subscription));
			},

			// NEW
            orderedData() {
                return this.sj.dynamicSort(sj.any(this.data), this.ascending, this.orderBy);
			},

			/* //G transparent components
				//C child list components may be made transparent, so that any child listener is passed up to AsyncDisplayList and any attribute on AsyncDisplayList will be passed down to the child component
				//G just add v-on='listeners' and v-bind='attrs' to any element that needs to be transparent

				//G any listeners/attrs for this AsyncDisplayList component can be pulled out of those that are passed down by adding the name to the destructured object:
				// const {listenerForThisList, ...listeners} = this.$listeners;
				//L https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html
			*/
			attrs() {
    			const {...attrs} = this.$attrs;
    			return attrs;
  			},
			listeners() {
				const {...listeners} = this.$listeners;
				return listeners;
			},
        },
        methods: {
			// OVERWRITES
			async refreshData() {
				if (!this.Entity) return [];
				return await this.Entity.get(this.query).then(this.sj.content).then(this.sj.any);
			},			
        },

    }
</script>


<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='LoadingComponent' :error-component='ErrorComponent'>
        <h2>Default List Display Component</h2>
        <p v:for='item in orderedData'>Default Item: {{item}}</p>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>