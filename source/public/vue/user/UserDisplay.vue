<script>
    import AsyncDisplay from '../async/AsyncDisplay.vue';

    export default {
        name: 'user-display',
		extends: AsyncDisplay,
		data() { return {
			// OVERWRITES
			Entity: this.$root.sj.User,
		}; },
        methods: {
			// NEW
            async open(id) {
                this.$router.push(`/user/${id}`);
            },
		},
    }
</script>

<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
		<p>{{data.id}}</p>
		<p>{{data.name}}</p>
		<button @click='open(data.id)'>Profile</button>
    </async-switch>
</template>


<style lang='scss'>
</style>