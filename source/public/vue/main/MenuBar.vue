<script>
    import {mapState} from '../../js/vuex.esm.browser.js'; 

    export default {
        name: 'menu-bar',
        // computed: {
        //     ...mapState(['me']),
        // },
        methods: {
            home() {
                this.$router.push(`/`);
            },
            add() {
                this.$router.push(`/add`);
            },
            async profile() {
                //C me might have to be async retrieved and stored on the menu bar if info is to be displayed
                const me = await this.sj.session.get().then(this.sj.content);
                this.$router.push(`/user/${me.id}`);
			},
        },
    }
</script>


<template>
    <div class='menu-bar'>
        MENU BAR
        <button @click='home'>Home</button>
        <button @click='add'>Add</button>
        <button @click='profile'>Profile</button>
    </div>
</template>


<style lang='scss'>
    .menu-bar {
        width: 100%;
        // background-color: red;
    }
</style>