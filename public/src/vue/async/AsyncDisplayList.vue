<script>
    import sj from '../../js/global-client.mjs';
    import AsyncDisplay from './AsyncDisplay.vue';

    export default {
        name: 'async-display-list',
        extends: AsyncDisplay,
        data() {
            return {
                //C change data default to empty list so that sj.dynamicSort() wont fail while data is loading
                data: [],
            };
        },
        props: {
            //TODO consider making this take an array, which then is able to sort by multiple columns
            orderBy: String,  
            ascending: Boolean,

            //C change data from Object to Array type, if used //TODO
            //data2: Array,
        },
        methods: {
            async getData() {
                return [];
            },
        },
        computed: {
            orderedData() {
                return this.sj.dynamicSort(this.data, this.ascending, this.orderBy);
            },
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='LoadingComponent' :error-component='ErrorComponent'>
        <h2>Default List Display Component</h2>
        <p v:for='item in orderedData'>Default Item: {{item}}</p>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>