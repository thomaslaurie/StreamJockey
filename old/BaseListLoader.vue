//! no longer needed because the new BaseDisplay handles its own data completely - BaseListDisplay replaces this

<script>
    import BaseLoader from './BaseLoader.vue';
    import BaseListDisplay from './BaseListDisplay.vue';

    export default {
        //C same as BaseLoader but has orderBy and ascending properties, it gives these and an array to its list display component
        //! these are(possibly were) only required because I didn't know how to easily pass these props to the display component - now I do with transparent wrapper components (see sj.dynamicTemplate());
        name: 'base-list-loader',
        extends: BaseLoader,
        components: {
            DefaultDisplay: BaseListDisplay,
        },
        props: {
            orderBy: String, //TODO consider making this take an array, which then is able to sort by multiple columns 
            ascending: Boolean,
        },
        data() {
            return {
                //C change display default to empty list so that sj.dynamicSort() wont fail while display is loading
                display: [],
            };
        },
        methods: {
            async getDisplay() {
                return [];
            },
        },
        computed: {
            orderedDisplay() {
                //return this.sj.dynamicSort(this.display, this.ascending, this.orderBy);
            },
        },
        template: this.sj.dynamicTemplate(/*html*/`
            <display-component :display='orderedDisplay'></display-component>
        `)
    }
</script>

<style lang='scss'>
</style>