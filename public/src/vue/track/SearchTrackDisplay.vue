<script>
	import TrackDisplay from './TrackDisplay.vue';
	
    export default {
        name: 'track-display',
        extends: TrackDisplay,
        methods: {
        },
    }
</script>

<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent' 
	class='track-container'>
		<div id='left'>
			<button id='play-button' @click='play()'>Play</button>

			<div id='content'>
				<p id='artists'>{{data.artists.join(', ')}}</p>
				<p id='name'>{{data.name}}</p>
			</div>
		</div>
		<div id='right'>
			<button>Delete</button>
		</div>
		<button @click='$emit("add", data)'>Add</button>
    </async-switch>
</template>