<script>
import SearchResults from '../track/SearchResults.vue';
import Source from '../../../source.js';

export default {
	name: 'search-panel',
	components: {
		SearchResults,
	},
	data() {
		return {
			sources: Source.instances,
			targetSource: Source.instances[0],
			x: Source,
		};
	},
	props: {
		playlistId: {
			type: Number,
			required: true,
		},
	},
};
</script>

<template>
	<div>
		<!-- //! //G two v-for directives at the same level, cannot use the same keys, just differentiate them by adding onto the string -->
		<div v-for='source of sources' :key='`${source.name}Radio`'>
			<input
				type='radio'
				:id='`${source.name}SearchRadio`'
				:value='source'
				v-model='targetSource'
			>
			<label :for='`${source.name}SearchRadio`'>
				{{source.name}}
			</label>
		</div>
		<div v-for='(source, index) of sources' :key='`${source.name}Search`'>
			<search-results
				v-show='source === targetSource'
				:source='x.instances[index]'
				:playlistId='playlistId'
			></search-results>
		</div>
	</div>
</template>

<style lang='scss'>
</style>
