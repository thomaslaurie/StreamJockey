<script>
    import BaseDisplay from './BaseDisplay.vue';

    export default {
       name: 'base-list-display',
        extends: BaseDisplay,
        props: {
            //C change display from Object to Array type
            display: Array,
        },
    }
</script>

<template>
    <div>
        <p v:for='item in display'>Default Display Component for {{item}}</p>
    </div>
</template>


<style scoped lang='scss'>
</style>