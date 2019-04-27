<script>
    //import {mapState} from '../../../js/vuex.esm.browser.mjs'; 

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
                let result = await this.sj.session.login(this).catch(rejected => {
                    //TODO handle error
                    console.error(rejected);
                });
                
                //let me = this.sj.one(result.content); //TODO this store stuff is old, but also rememer that sesssion doesnt return arrays, it returns just a single object
                //this.$store.commit('setMe', me);
                this.$router.push('/');
            }
        },
        // computed: {
        //     ...mapState(['me']),
        // },
        //L reasons to use html form submit over javascript function: https://stackoverflow.com/questions/16050798/html-form-submit-using-javascript-vs-submit-button, however these aren't good enough - a javascript function will do the job and be more consistent
    }
</script>


<template>
    <!-- //L .prevent modifier keeps page from reloading on submit https://vuejs.org/v2/guide/events.html#Event-Modifiers -->
    <form @submit.prevent='submit'> 
        <input v-model='name'       placeholder='name'>
        <input v-model='password'   placeholder='password'>
        <input type='submit' value='Login'>
    </form>
</template>


<style scoped lang='scss'>
</style>