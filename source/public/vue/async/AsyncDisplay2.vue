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
			
			//TODO make actual default components
            DelayComponent: AsyncDelay,
            LoadingComponent: AsyncLoading,
            ErrorComponent: AsyncError,
        },
        data() {
            return {
				// BEHAVIOR
				//C used with AsyncSwitch to switch the display of the delay, loading, error components, and the slotted content from this component
                state: 'delay',
				//C delay before displaying the loading component
				//TODO I can still see delay flickering
                delay: 1000,
				delayId: null,
				//C time before throwing a timeout error and displaying the error component
                timeout: Infinity,
				timeoutId: null,
				
				// STORAGE
				//C subscription Entity type
				Entity: null,
				subscription: null,
				deadData: null,

				// RETRIEVAL - SELF
				sQuery: null,
				sDead: false,
				sStatic: null,
				sError: null,				
			};
        },
        props: {
			// RETRIEVAL - PARENT
			pQuery: [Object, Array],
			pDead: {
				//R errors arent passed from the parent because the only time this will happen is with propData, in this case, the parent should handle the error. but just in case, implement error 
				default: false,
				type: [Boolean],
			},
			pStatic: [Object], //! one item here, is an array in AsyncDisplayList
			pError: [Object, Error],
		},
		computed: {
			// STORAGE
			liveData() {
				//! one item here, uses sj.any() in AsyncDisplayList
				if (this.sj.isType(this.subscription, this.sj.Subscription)) return this.sj.one(this.$store.getters.getLiveData(this.subscription));
				else return null;
			},

			// RETRIEVAL - SORTING
			usingParent() {
				//C if any prop from the parent is filled in, use the parent
				//! pDead does not trigger usingParent as it would never need to be used without an existing pQuery
				return !!(this.pQuery || this.pData || this.pError);
			},
			usingQuery() {
				return !!(
					(this.usingParent && this.pQuery) ||
					(!this.usingParent && this.sQuery)
				);
			},
			usingLive() {
				return !!(
					(this.usingParent && !this.pDead) || 
					(!this.usingParent && !this.sDead)
				);
			},

			// RETRIEVAL - GENERAL
			//R setters aren't used here as they would only be setting the self properties, just set the self properties directly for clarity
			query() {
				if (!this.usingQuery) return null;

				else if (this.usingParent) return this.pQuery;
				else return this.sQuery;
			},
			dead() {
				//? I don't know why this would be used, but its just here for consistency
				return !this.usingLive;
			},
			data() {
				if (this.usingQuery) {
					if (this.usingLive) return this.liveData;
					else return this.deadData;
				} else {
					if (this.usingParent) return this.pData;
					else return this.sData;
				}
			},
			error() {
				if (this.usingParent) return this.pError;
				else return this.sError;
			},
		},
        methods: {
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

			async refresh() {
				this.clearTimeouts();
				this.state = 'delay';
				this.startTimeouts();

				if (this.usingQuery) {
					//C this.Entity must be a child class of sj.Entity
					//TODO though this wont catch grand children, this functionality should either be added to sj.isType() or a new function
					if (Object.getPrototypeOf(this.Entity) !== this.sj.Entity)  throw new sj.Error({
						origin: 'AsyncDisplay deadRefresh()',
						reason: 'attempting to use a query but Entity is not a child class of sj.Entity',
						content: this.sj.image(this.Entity),
					});

					await (this.usingLive 
						? this.liveRefresh() 
						: this.deadRefresh()
					).then(this.handleSuccess, this.handleError);
				} else this.handleSuccess();
			},

			async liveRefresh() {
				return await this.$store.dipsatch('change', {
					subscription: this.subscription,

					Entity: this.Entity, 
					query: this.query,
					options: {}, //TODO
				});
			},
			async deadRefresh() {
				//! one item here, uses sj.any() in AsyncDisplayList
				this.deadData = await this.Entity.get(this.query).then(this.sj.content).then(this.sj.one);
			},


			// HANLDERS
            handleSuccess(resolved) {
				this.clearTimeouts();
				//? why isn't this just in the refresh functions? is clearTimeouts() important to have before the data transfer?
				if (this.usingQuery) {
					if (this.usingLive)	this.subscription = resolved;
					else this.deadData = resolved;
				}
				this.state = 'display';
            },
            handleError(rejected) {
				this.clearTimeouts();
				//---------- //? what if using parent query but gets an error? this is a good case against taking a parent's error
				this.sError = rejected;
				this.state = 'error';
			},
		},
		watch: {
			//C refresh() will be called when this.query changes
			query: {
				handler() {
					this.refresh();
				},

				//C using immediate: true here removes the need to call refresh() in the created() hook
				immediate: true,
				deep: true,
			},
		},
    }
</script>


<template>
    <async-switch :state='state' :error='error' @refresh='refresh' :loading-component='$options.components.LoadingComponent' :error-component='$options.components.ErrorComponent'>
    </async-switch>
</template>


<style scoped lang='scss'>
</style>