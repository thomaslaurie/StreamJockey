<script>
    import LoginForm from './entry-page/LoginForm.vue';
    import RegisterForm from './entry-page/RegisterForm.vue';
    import GuestForm from './entry-page/GuestForm.vue';

    export default {
        name: 'entry-page',
        components: {
            LoginForm,
            RegisterForm,
            GuestForm,
        },
        data() {
            return {
                entryType: 'login',
            };
        },
        computed: {
            dynamicComponent() {
                if(this.entryType === 'login') {
                    return this.$options.components.LoginForm;
                } else if (this.entryType === 'register') {
                    return this.$options.components.RegisterForm;
                } else if (this.entryType === 'guest') {
                    return this.$options.components.GuestForm;
                }
            },
        },
    }
</script>


<template>
    <div>
        <!-- //L radio name is apparently not needed with v-model https://vuejs.org/v2/guide/forms.html#Radio -->
        <input type='radio' v-model='entryType' value='login' id='loginEntryTypeRadio' checked>
        <label for='loginEntryTypeRadio'>Login</label>

        <input type='radio' v-model='entryType' value='register' id='registerEntryTypeRadio'>
        <label for='registerEntryTypeRadio'>Register</label>

        <input type='radio' v-model='entryType' value='guest' id='guestEntryTypeRadio'>
        <label for='guestEntryTypeRadio'>Guest</label>

        <keep-alive>
            <component :is='dynamicComponent'></component>
        </keep-alive>
    </div>
</template>


<style scoped lang='scss'>
</style>