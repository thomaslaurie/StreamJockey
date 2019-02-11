<script>
    export default {
        //TODO consider adding different display types instead of just different components?
        name: 'base-display',
        props: {
            display: Object,
        },
    }
</script>


<template>
    <div>
        <h2>Default Display Component</h2>
        <p>{{display + ''}}</p>
    </div>
</template>


<style scoped lang='scss'>
</style>