<script>
    //TODO consider adding different display types (for components representing the same type of data eg. track) instead of different components?

    //TODO it would be nice if async and static display were the same component so that async could be use solo, static in a list where data is already provided, but then items in the list could be refreshed and they change to async - however this would mean the extra loading and error components would be multipled for every instance if they are not destroyed (//TODO)

    import AsyncSwitch from './AsyncSwitch.vue';
    import AsyncLoading from './AsyncLoading.vue';
    import AsyncError from './AsyncError.vue';

    export default {
        name: 'async-display',
        components: {
            AsyncSwitch,
            LoadingComponent: AsyncLoading,
            ErrorComponent: AsyncError,
            //TODO make actual default components
            //TODO consider making a delay component (where no loading graphics are shown)
        },
        data() {
            return {
                state: 'loading',
                //TODO delay: 500,
                //TODO timeout: Infinity,

                data: null, //! descendants must re-define initial values if used differently like referencing data.property
                error: null, //C store error separately so that it doesn't overwrite previously fetched data
            };
        },
        props: {
            query: [Object, Array],

            //data2: Object, //TODO this might be needed for static display in the future, set the display as the passed in prop as default (or null) so this can be used staticly //?            
        },
        created() {
            this.load();
        },
        methods: {
            async getData() {
                //! getData() should usually use the query prop
                return null;
            },
            handleSuccess(resolved) {
                this.data = resolved;
                this.state = 'display';
            },
            handleError(rejected) {
                this.error = rejected;
                this.state = 'error';
            },
            load() {
                this.state = 'loading';
                this.getData().then(this.handleSuccess, this.handleError);
            },
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>