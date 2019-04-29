<script>
    //TODO consider adding different display types (for components representing the same type of data eg. track) instead of different components?

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
                timeout: Infinity,
                timeoutId: null,

				sQuery: undefined,
				sDeadQuery: undefined,
				sData: undefined,
				sError: {}, //C store error separately so that it doesn't overwrite previously fetched data
				
				Entity: undefined,	//C used for components that target an sj.Entity type
				subscription: undefined, //C used to store subscription reference
            };
        },
        props: { 
			//C queries and data from parent take priority over those from self,
			//C query takes priorty over dead query, which takes priority over data
			//! query, dead query, and data should never be used together
			pQuery: [Object, Array], //C used when this component should get it's own data
			pDeadQuery: [Object, Array],
			pData: [Object], //C used when this component is given data //! is a single item here, is an array in AsyncDisplayList 
			pError,
		},
		computed: {
			query: {
				get() {
					//C query prioritized over dead query, parent queries prioritized over self queries
					if (this.pQuery) return this.pQuery;
					else if (this.pDeadQuery) return this.pDeadQuery;
					else if (this.sQuery) return this.sQuery;
					else return this.sDeadQuery;
				},
				set(value) {
					this.sQuery = value;
				},
			},
			data: {
				get() {
					//C parent data prioritized over self data, subscription data prioritized over self data
					if (this.pData) return this.pData;
					else if (this.pQuery || this.sQuery) return this.subscriptionData;
					else return this.sData;
				},
				set(value) {
					this.sData = value;
				},
			},
			error: {
				get() {
					if (this.pError) return this.pError;
					else return this.sError;
				},
				set(value) {
					this.sError = value;
				},
			},


			subscriptionData() {
				//! this by default is sj.one() object, AsyncDisplayList by default is sj.any() array
				return this.sj.one(this.$store.getters.getSubscriptionData(this.subscription));
			},			
		},
		//----------
        methods: {
			// timeouts
			startTimeouts() {
                //TODO what happens if an old timed-out request comes back and replaces new data that was fetched?
                this.delayId = sj.setTimeout(() => {
                    this.state = 'loading';
                }, this.delay);
                this.timeoutId = sj.setTimeout(() => { 
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

			/*
				// async data
				alternateQuery() {
					//C used for setting a custom value (other than pQuery) to query before load() is called, this is neccesary because child calls to created() happen after their parent's
					//? why cant query just be set directly? i think because pQuery overwrites before created() is called
					return undefined;
				},
			*/




			/*
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
			*/


			
			async refresh() {
				let method;
				if (this.pQuery || this.sQuery) method = this.refreshSubscription;
				else if (this.pDeadQuery || this.sDeadQuery) method = this.getData;
				else return new sj.Warn({
					origin: 'AsyncDisplay component',
					reason: 'refresh called but component is using static data',
				});

				this.clearTimeouts();
				this.state = 'delay';
				this.startTimeouts();
				await method.then(this.handleSuccess, this.handleError);
			},


			async refreshSubscription() {
				await this.$store.dispatch('subscribe', {Entity: this.Entity, query: this.query, subscriber: this});
				return;
			},
			async getData() {
				//G deadQuery() should only use this.query for queries, update it instead of using passing another variable so that load() can ignore this call if undefined
				return {};
			},

			// handlers
            handleSuccess(resolved) {
                this.clearTimeouts();
                if(!(this.pQuery || this.sQuery)) this.sData = resolved;
				this.state = 'display';
				//console.log(this.$options.name, 'RECEIVED ASYNC DATA:', JSON.stringify(this.data));
            },
            handleError(rejected) {
                this.clearTimeouts();
                this.sError = rejected;
				this.state = 'error';
				//console.error(this.$options.name, 'RECEIVED ASYNC ERROR:', JSON.stringify(this.error));
            },
		},
		created() {
			refresh();
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @reload='load' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>