<script>
    //TODO consider adding different display types (for components representing the same type of data eg. track) instead of different components?

    //TODO it would be nice if async and static display were the same component so that async could be use solo, static in a list where data is already provided, but then items in the list could be refreshed and they change to async - however this would mean the extra loading and error components would be multipled for every instance if they are not destroyed (//TODO)

    import AsyncSwitch from './AsyncSwitch.vue';
    import AsyncDelay from './AsyncDelay.vue';
    import AsyncLoading from './AsyncLoading.vue';
    import AsyncError from './AsyncError.vue';

    export default {
        name: 'async-display',
        components: {
            AsyncSwitch,
            DelayComponent: AsyncDelay,
            LoadingComponent: AsyncLoading,
            ErrorComponent: AsyncError,
            //TODO make actual default components
            //TODO consider making a delay component (where no loading graphics are shown), this is definitely needed as I can see the loading component flickering before load
        },
        data() {
            return {
                state: 'delay',

                delay: 1000, //TODO i can still see delay flickering
                delayId: null,
                timeout: 2147483647, //C cannot be larger than this, don't use Infinity, //L: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
                timeoutId: null,

                data: {},
                error: {}, //C store error separately so that it doesn't overwrite previously fetched data
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
                return {};
            },

            handleSuccess(resolved) {
                this.clearTimeouts();
                this.data = resolved;
                this.state = 'display';
            },
            handleError(rejected) {
                this.clearTimeouts();
                this.error = rejected;
                this.state = 'error';
            },

            load() {
                this.clearTimeouts();
                this.state = 'delay';
                this.startTimeouts();
                this.getData().then(this.handleSuccess, this.handleError);
            },

            startTimeouts() {
                //TODO what happens if an old timed-out request comes back and replaces new data that was fetched?
                this.delayId = setTimeout(() => {
                    this.state = 'loading';
                }, this.delay);
                this.timeoutId = setTimeout(() => { 
                    this.handleError(new this.sj.Error({
                        log: true,
                        origin: 'AsyncDisplay.load()',
                        message: 'data request timed out',
                    }));
                }, this.timeout);
            },
            clearTimeouts() {
                clearTimeout(this.delayId);
                clearTimeout(this.timeoutId);
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