<script>
    import MenuBar from './MenuBar.vue';
    import PlayerBar from './PlayerBar.vue';

    export default {
        name: 'app-main',
        components:  {
            MenuBar,
            PlayerBar,
        },
    }
</script>


<template>
    <div>
        <menu-bar></menu-bar>
        <router-view></router-view>
        <player-bar></player-bar>
    </div>
</template>


<style scoped lang='scss'>
</style>