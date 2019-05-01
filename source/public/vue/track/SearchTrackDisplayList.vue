<script>
	import TrackDisplayList from './TrackDisplayList.vue';
	import SearchTrackDisplay from './SearchTrackDisplay.vue';
	
    export default {
        name: 'search-track-display-list',
		extends: TrackDisplayList,
		components: {
			SearchTrackDisplay,
		},
    }
</script>


<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
        <ul>
            <li
                v-for='track in data' 
                :key='track.id' 
                :display='track'
            >
				<search-track-display :p-data='track' v-bind='attrs' v-on='listeners'></search-track-display>
            </li>
        </ul>
    </async-switch>
</template>