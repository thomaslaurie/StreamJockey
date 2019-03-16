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

				query: undefined,
                data: {},
                error: {}, //C store error separately so that it doesn't overwrite previously fetched data
            };
        },
        props: {
			pQuery: [Object, Array],
			pData:  [Object],
		},
		watch: {
			//L https://vuejs.org/v2/api/#vm-watch
			//C these will initially pass props to query and data and then update everytime they are updated
			//R simple props aren't here because both data and query need to be modifiable (in the case of the need for a non-prop query, see page components)
			//R v-bind.sync isn't used here either because query and data might not always come directly from these props, also it would require having to declare both props every time these are used
			pQuery: {
				handler(value) {
					this.query = value || this.query;
				},
				deep: true,
				immediate: true,
			},
			pData: {
				handler(value) {
					this.data = value || this.data;
				},
				deep: true,
				immediate: true,
			},
		},
        methods: {
			// timeouts
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

			// async data
			alternateQuery() {
				//C used for passing a custom value (other than pQuery) to query before load() is called, this is neccesary because child calls to created() happen after their parent's
				//! should only return an object or an array
				return undefined;
			},
            async getData() { 
				//! getData() should only use this.query for queries, update it instead of using passing another variable so that load() can ignore this call if undefined
				return {};
            },

			// handlers
            handleSuccess(resolved) {
                this.clearTimeouts();
                this.data = resolved;
				this.state = 'display';
				//console.log(this.$options.name, 'RECEIVED ASYNC DATA:', JSON.stringify(this.data));
            },
            handleError(rejected) {
                this.clearTimeouts();
                this.error = rejected;
				this.state = 'error';
				//console.error(this.$options.name, 'RECEIVED ASYNC ERROR:', JSON.stringify(this.error));
            },

            load() {
				//console.log(this.$options.name, 'QUERYING:', JSON.stringify(this.query));
				if (this.sj.isType(this.query, Object) || this.sj.isType(this.query, Array)) { //C ignores getData() if no query is provided, will not error or overwrite existing data when load() is called
					this.clearTimeouts();
					this.state = 'delay';
					this.startTimeouts();
					this.getData().then(this.handleSuccess, this.handleError);
				} else {
					this.state = 'display';
				}
            },
		},
		created() {
			this.query = this.alternateQuery() || this.query;
			this.load();
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>