<script>
	import SearchResults from '../track/SearchResults.vue';
	import Source from '../../../source.js';
	
    export default {
		name: 'search-panel',
		components: {
            SearchResults,
        },
        data() { return {
			//C just use the first source instance
			source: Source.instances[0],
			Source,
		}; },
		props: {
			playlistId: Number,
		},
    };
</script>``

<template>
	<div>
		<!-- //!//G two v-for directives at the same level, cannot use the same keys, just differentiate them by adding onto the string -->
		<div v-for='(sourceInstance, index) in Source.instances' :key='`${sourceInstance.name}Radio`'>
			<input 
				type='radio' 
				:id='`${sourceInstance.name}SearchRadio`'
				:value='sourceInstance'
				v-model='source'
			>
        	<label 
				:for='`${sourceInstance.name}SearchRadio`'
			>
				{{sourceInstance.name}}
			</label>
		</div>

		<div v-for='sourceInstance in Source.instances' :key='`${sourceInstance.name}Search`'>
			<search-results v-show='sourceInstance === source' :source='sourceInstance' :playlistId='playlistId'></search-results>
		</div>
	</div>
</template>

<style lang='scss'>
</style>