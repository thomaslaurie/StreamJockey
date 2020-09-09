<script>
import {
	one,
} from '../../../../../shared/utility/index.js';
import * as session from '../../../../session-methods.js';
// import {mapState} from '../../../../client/vendor/vuex.esm.browser.js';

export default {
	name: 'login-form',
	data() {
		return {
			//TODO these are temporary, should normally be null
			name: 'jon',
			password: 'password',
		};
	},
	methods: {
		async submit() {
			const result = await session.login(this).catch((rejected) => {
				//TODO handle error
				throw rejected;
				// console.error(rejected); //TODO//! If the login is invalid or the quest fails for some reason, this would've still continue to the home page.
			});


			// let me = one(result.content); //TODO this store stuff is old, but also rememer that sesssion doesnt return arrays, it returns just a single object
			// this.$store.commit('setMe', me);
			this.$router.push('/');
		},
	},
	// computed: {
	//     ...mapState(['me']),
	// },
	//L reasons to use html form submit over javascript function: https://stackoverflow.com/questions/16050798/html-form-submit-using-javascript-vs-submit-button, however these aren't good enough - a javascript function will do the job and be more consistent
};
</script>


<template>
    <!-- //L .prevent modifier keeps page from reloading on submit https://vuejs.org/v2/guide/events.html#Event-Modifiers -->
    <form @submit.prevent='submit'>
        <input v-model='name'       placeholder='name'>
        <input v-model='password'   placeholder='password'>
        <input type='submit' value='Login'>
    </form>
</template>


<style lang='scss'>
</style>
