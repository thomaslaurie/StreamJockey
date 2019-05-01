<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'playlist-display',
		extends: AsyncDisplay,
		data() { return {
			//OVERWRITES
			Entity: this.$root.sj.Playlist,
		}; },
        methods: {
			// NEW
            async open(id) {
                this.$router.push(`/playlist/${id}`);
            },
		},
		created() {
			this.sj.wait(3000).then(resolved => console.log(this.state));
		}
    }
</script>

<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
		<p>{{data.id}}</p>
		<p>{{data.name}}</p>
		<button @click='open(data.id)'>Open</button>
		<button>Play</button>
    </async-switch>
</template>


<style lang='scss'>
</style>