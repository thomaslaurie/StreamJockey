<script>
import {
	dynamicSort,
	any,
} from '../../../../shared/utility/index.js';
import {
	Subscription,
} from '../../../../shared/live-data.js';

import AsyncDisplay from './AsyncDisplay.vue';

export default {
	name: 'async-display-list',
	extends: AsyncDisplay,
	data() {
		return {
			// OVERWRITES
			deadContent: [],
			sContent: [],
		};
	},
	props: {
		// OVERWRITES
		pContent: Array,

		// NEW
		//TODO consider making orderBy take an array, which then is able to sort by multiple columns
		orderBy: String,
		ascending: Boolean,
	},
	computed: {
		// OVERWRITES
		liveContent() {
			//! These seem to be incrementally added. Maybe create a more efficient function that adds all at once.
			return (this.subscription instanceof Subscription)
				? any(this.$store.getters.getLiveData(this.subscription))
				: [];
		},

		// NEW
		orderedContent() {
			return dynamicSort(any(this.content), this.ascending, this.orderBy);
		},

		/* //G transparent components
				// child list components may be made transparent, so that any child listener is passed up to AsyncDisplayList and any attribute on AsyncDisplayList will be passed down to the child component
				//G just add v-on='listeners' and v-bind='attrs' to any element that needs to be transparent
				//! $listeners now removed in Vue 3. All are part of attrs.

				//G any listeners/attrs for this AsyncDisplayList component can be pulled out of those that are passed down by adding the name to the destructured object:
				// const {listenerForThisList, ...listeners} = this.$listeners;
				//L https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html
			*/
		attrs() {
			const {...attrs} = this.$attrs;
			return attrs;
		},
	},
	methods: {
		// OVERWRITES
		async deadRefresh() {
			this.deadContent = await this.Entity.get(this.query).then(any);
		},
	},

};
</script>


<template>
    <async-switch
		:state='state'
		:error='error'
		@refresh='refresh'
		:loading-component='LoadingComponent'
		:error-component='ErrorComponent'
	>
        <h2>Default List Display Component</h2>
        <p v:for='item in orderedContent'>Default Item: {{item}}</p>
    </async-switch>
</template>


<style lang='scss'>
</style>
