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
        },
        data() {
            return {
				//C used with AsyncSwitch to switch the display of the delay, loading, error components, and the slotted content from this component
                state: 'delay',

				//C delay before displaying the loading component
                delay: 1000, //TODO I can still see delay flickering
				delayId: null,
				//C time before throwing a timeout error and displaying the error component
                timeout: Infinity,
				timeoutId: null,
				
				Entity: undefined, //C used for components that target an sj.Entity type
				subscription: undefined, //C stores subscription reference
				deadQueryData: undefined, //C stores data from deadQuery

				//C self
				sQuery: undefined,
				sDeadQuery: undefined,
				sData: undefined,
				sError: undefined, //C store error separately so that it doesn't overwrite previously fetched data
            };
        },
        props: {
			//! only one query, dead query, or data object should ever be passed, or else one or more will be overridden
			//C parent queryies used when this component should get it's own data
			pQuery: [Object, Array], 
			pDeadQuery: [Object, Array],
			//C parent data used when this component is given data 
			//! is a single item here, is an array in AsyncDisplayList 
			pData: [Object], 

			//? if the parent's data is errored, and passed via pError, how will this component know to display error?
			//R I dont think errors should be passed from parent, cause the parent is either also an async display - in which it will display its error component, or its not, and the data is static - in which the data itself is just wrong
			//pError,
		},
		computed: {
			// QUERY/DATA SHORTHANDS
			isDataLive() {
				return !!(this.pQuery || this.sQuery);
			},
			isDataDead() {
				return !!(!this.isDataLive && (this.pDeadQuery || this.sDeadQuery));
			},
			isDataStatic() {
				return !!(!this.isDataLive && !this.isDataDead);
			},
			isDataFromParent() {
				return !!(this.pQuery || this.pDeadQuery || this.pData);
			},


			queryData() {
				//! AsyncDisplay uses sj.one(subscription data)
				if (this.sj.isType(this.subscription, this.sj.Subscription)) return this.sj.one(this.$store.getters.getLiveData(this.subscription));
				else return {}; 
				//TODO this is a hack right now to suppress undefined property errors, it should really just return undefined. because of slotted markup, even though the elements aren't rendering, they still require their references to the data - but while that data is being retrieved they throw undefined property errors
				//L custom directive as a possible solution: https://stackoverflow.com/questions/43293401/conditionally-rendering-parent-element-keep-inner-html/43299828, https://vuejs.org/v2/guide/custom-directive.html
			},	

			query: {
				get() {
					//C live query prioritized over dead query, parent queries prioritized over self queries
					if 		(this.isDataFromParent && this.isDataLive) return this.pQuery;
					else if	(this.isDataFromParent && this.isDataDead) return this.pDeadQuery;
					else if (!this.isDataFromParent && this.isDataLive) return this.sQuery;
					else if (!this.isDataFromParent && this.isDataDead) return this.sDeadQuery;
					else throw new this.sj.Error({
						origin: 'AsyncDisplay',
						reason: 'component query was referenced but no query was passed to or defined on this component',
						content: {
							pQuery: this.pQuery,
							pDeadQuery: this.pDeadQuery,
							sQuery: this.sQuery,
							sDeadQuery: this.sDeadQuery,
						},
					});
				},
				set(value) {
					this.sQuery = value;
				},
			},
			data: {
				get() {
					//C live prioritized over dead, prioritized over static, parent priortized over self
					if 		(this.isDataLive) return this.queryData;
					else if (this.isDataDead) return this.deadQueryData;
					else if (this.isDataStatic && this.isDataFromParent) return this.pData;
					else if (this.isDataStatic && !this.isDataFromParent) return this.sData;
					else throw new this.sj.Unreachable({
						content: {
							isDataLive: this.isDataLive,
							isDataDead: this.isDataDead,
							isDataStatic: this.isDataStatic,
							isDataFromParent: this.isDataFromParent,
						},
					});
				},
				set(value) {
					this.sData = value;
				},
			},
			error: {
				get() {
					return this.sError;
					// if (this.pError) return this.pError;
					// else return this.sError;
				},
				set(value) {
					this.sError = value;
				},
			},
		},
        methods: {
			async refresh() {
				let method;
				if 		(this.isDataLive) method = this.refreshSubscription;
				else if (this.isDataDead) method = this.refreshData;
				else return new this.sj.Warn({
					origin: 'AsyncDisplay component',
					reason: 'refresh called but component is using static data',
					content: {
						pData: this.pData,
						sData: this.sData,
					},
				});

				this.clearTimeouts();
				this.state = 'delay';
				this.startTimeouts();
				await method().then(this.handleSuccess, this.handleError);
			},

			// TIMEOUTS
			startTimeouts() {
                //TODO what happens if an old timed-out request comes back and replaces new data that was fetched?
                this.delayId = this.sj.setTimeout(() => {
                    this.state = 'loading';
                }, this.delay);
                this.timeoutId = this.sj.setTimeout(() => { 
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

			// REFRESH
			async refreshSubscription() {
				if (this.sj.isType(this.subscription, this.sj.Subscription)) await this.$store.dispatch('unsubscribe', this.subscription);	

				return await this.$store.dispatch('subscribe', {
					Entity: this.Entity, 
					query: this.query,
					options: {}, //TODO
				});
			},
			async refreshData() {
				if (!this.Entity) return undefined;
				return await this.Entity.get(this.query).then(this.sj.content).then(this.sj.one);
			},

			// HANLDERS
            handleSuccess(resolved) {
				this.clearTimeouts();
				if 		(this.isDataLive) this.subscription = resolved;
				else if (this.isDataDead) this.deadQueryData = resolved;
				else throw new this.sj.Error({
					origin: 'AsyncDisplay',
					reason: 'handleSuccess was called, but component is neither live nor dead, this should never happen',
				});
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
			if (this.isDataLive || this.isDataDead) this.refresh();
			else this.state = 'display';
        },
    }
</script>


<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>