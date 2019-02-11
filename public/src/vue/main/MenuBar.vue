<script>
    import {mapState} from '../../js/vuex.esm.browser.mjs'; 

    export default {
        name: 'menu-bar',
        computed: {
            ...mapState(['me']),
        },
        methods: {
            add() {
                this.$router.push(`/add`);
            },
            profile() {
                this.$router.push(`/user/${this.me.id}`);
            },
        },
    }
</script>


<template>
    <div>
        MENU BAR
        <button @click='add'>Add</button>
        <button @click='profile'>Profile</button>
    </div>
</template>


<style scoped lang='scss'>
</style>