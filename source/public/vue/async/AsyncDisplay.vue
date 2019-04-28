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

                delay: 1000, //TODO I can still see delay flickering
                delayId: null,
                timeout: 2147483647, //C cannot be larger than this, don't use Infinity, //L: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
                timeoutId: null,

				subscriptionEntity: undefined,
				subscription: undefined,
				subscriptionData: undefined,

				query: undefined,
				
                data: {},
                error: {}, //C store error separately so that it doesn't overwrite previously fetched data
            };
        },
        props: {
			pQuery: [Object, Array],
			pData:  [Object],
		},
		computed: {
			subscriptionData() {
				return this.sj.any(this.$store.getters.getSubscriptionData(this.subscription));
			},

			/*
				what do I want?
				I want a single component that can handle loading of static and async data - both from itself, and from its parent


				if a subscription exists, always return the subscription data
				if pData was last passed, return it
				if data was last loaded, return it
			*/

			//? is there a situation where a get request would ever be desired over a subscription?
			//? maybe the components can either be passed semi-static data, or get their own live data?
			// when a component is being passed data it is either because the data is to be displayed statically (cannot be retrieved from the database or shouldnt change, or some reason), or its because the data is being retrieved in a group at a higher level so that multiple api requests or subscriptions don't have to be made for each component
			// there might have to be another prop that states the type of data retrieval, because im having a hard time figuring out how to distinguish between subscription load and get load
			// look at existing components and see how pQuery and pData are being used, //? when is pQuery used without pData? when is pData used without pQuery?

			//TODO consider using a setter for data which sends an edit request if the data is an entity and the property matches the editIn filter

			// if its queryable, its subscribable, if its subscribable, everything inside of it can be edited via .edit()

			//----------
			data() {
				if (this.subscription) return this.subscriptionData;
				else return this.data;
			},
		},
		watch: {
			//L https://vuejs.org/v2/api/#vm-watch

			//C these will initially pass props to query and data and then update everytime they are updated
			//R simple props aren't here because both data and query need to be modifiable (in the case of the need for a non-prop query, like page components)
			//R v-bind.sync isn't used here either because query and data might not always come directly from these props, also it would require having to declare both props every time these are used
			//C uses a || conditional because these props will always be objects
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
			//? should there be a pError?
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
				//C used for setting a custom value (other than pQuery) to query before load() is called, this is neccesary because child calls to created() happen after their parent's
				//! should only return an object or an array
				return undefined;
			},
            async getData() { 
				//G getData() should only use this.query for queries, update it instead of using passing another variable so that load() can ignore this call if undefined
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

				//C will not load new data via getData() if no query exists
				if (this.sj.isType(this.query, Object) || this.sj.isType(this.query, Array)) {
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
			//? what if subscribe fails?
			this.subscription = await this.$store.dispatch('subscribe', {Entity: this.subscriptionEntity, query: this.query, subscriber: this}).catch(this.handleError);

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