<script>
    export default {
        name: 'guest-form',
        methods: {
            async submit() {
                //TODO
                console.warn('TODO guest form');
            }
        },
    }
</script>


<template>
    <form @submit.prevent='submit'>
        <p>Try it out as a guest, you may save your account at a later time</p>
        <input type='submit' value='Continue as Guest'>
    </form>
</template>


<style lang='scss'>
</style>