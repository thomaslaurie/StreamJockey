<script>
    import {mapState} from '../../js/vuex.esm.browser.mjs'; 

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
                let me = await this.sj.getMe().then(this.sj.returnContent);
                this.$router.push(`/user/${me.id}`);
			},
			
			async auth() {
                let temp = await this.sj.spotify.auth();
            },
            async loadPlayer() {
                await this.sj.spotify.loadPlayer();
			},
        },
    }
</script>


<template>
    <div>
        MENU BAR
        <button @click='home'>Home</button>
        <button @click='add'>Add</button>
        <button @click='profile'>Profile</button>
		<button @click='auth()'>Auth</button>
        <button @click='loadPlayer()'>Load Player</button>
    </div>
</template>


<style scoped lang='scss'>
    div {
        width: 100%;
        background-color: red;
    }
</style>