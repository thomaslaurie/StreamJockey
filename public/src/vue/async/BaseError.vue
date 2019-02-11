<script>
    export default {
        name: 'base-error',
        props: {
            error: [Object, Error],
        },
    }
</script>


<template>
    <div>
        <h2>Default Error Component</h2>
        <p>{{error + ''}}</p>
    </div>
</template>


<style scoped lang='scss'>
</style>