<script>
import {
	User,
} from '../../../../entities/index.js';
import * as session from '../../../../session-methods.js';

export default {
	name: 'register-form',
	data() {
		return {
			name: null,
			password: null,
			password2: null,
			email: null,
		};
	},
	methods: {
		async submit() {
			await User.add(this).catch((rejected) => {
				//TODO handle error
				console.error(rejected);
			});

			const me = await session.login(this).catch((rejected) => {
				//TODO handle error
				console.error(rejected);
            	});

			this.$store.commit('setMe', me);
			this.$router.push('/');
		},
	},
};
</script>


<template>
    <form @submit.prevent='submit'>
        <input v-model='name'       placeholder='name'      >
        <input v-model='password'   placeholder='password'  >
        <input v-model='password2'  placeholder='password2' >
        <input v-model='email'      placeholder='email'     >
        <input type='submit' value='Register'>
    </form>
</template>


<style lang='scss'>
</style>
