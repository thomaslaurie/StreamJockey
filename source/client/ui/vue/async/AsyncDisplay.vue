<script>
	// EXTERNAL
	import fclone from 'fclone';

	// INTERNAL
	import {
		setTimer,
		Deferred,
		one,
		any,
	} from '../../../../shared/utility/index.js';
	import {
		Entity,
	} from '../../../entities/index.js';
	import {
		Subscription,
	} from '../../../../shared/live-data.js';
	import isInstanceOf from '../../../../shared/is-instance-of.js';

	import AsyncSwitch from './AsyncSwitch.vue';
	
    import AsyncDelay from './AsyncDelay.vue';
    import AsyncLoading from './AsyncLoading.vue';
	import AsyncError from './AsyncError.vue';
import { CustomError, InvalidStateError } from '../../../../shared/errors/index.js';


	//TODO consider adding different display types (for components representing the same type of data eg. track) instead of different components?

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
				// SWITCH BEHAVIOR
				// used with AsyncSwitch to switch between delay, loading, error components, and the slotted display makrup from this component
				//! at the moment, the 'delay' state will only appear at the start of the component's creation as it blends the transition from no-content to loading-content, however when there is already existing content, delay is not used as it would cause flickering when refreshing content
				state: 'delay',
				// refresh promise is stored so that refresh requests can't ovelap (that is a old request won't resolve after a new one has, thus overwriting with probably timed-out content), this also prevents refresh requests from messing up each other's clearDelay and clearTieout
				refreshPromise: null, 
				// ms before switching to 'loading'
				//TODO I can still see delay flickering
                delay: 1000,
				clearDelay: null,
				// ms before throwing a timeout error and switching to 'error'
                timeout: Infinity,
				clearTimeout: null,
				
				// GENERAL
				Entity: null, // subscription Entity type
				subscription: null,
				deadContent: null,
				// error store so that a failed query doesn't overwrite older, good content
				//R errors can't come from the parent as this would only happen with pContent, where in that case, the parent should handle the error
				error: null,

				// PASSABLE - SELF
				sQuery: null, // query for live & dead content
				sDead: false, // boolean indicating live or dead
				sContent: null, // static content
			};
        },
        props: {
			// PASSABLE - PARENT
			pQuery: [Object, Array],
			pDead: {type: [Boolean], default: false}, //G omit for live, include p-dead for dead
			pContent: [Object], //! one item here, is an array in AsyncDisplayList
		},
		computed: {
			// GENERAL
			liveContent() {
				//! one item here, uses any() in AsyncDisplayList
				//? should this type check go into usingLive?
				if (isInstanceOf(this.subscription, Subscription, 'Subscription')) return one(this.$store.getters.getLiveData(this.subscription));
				else return null;

				//R there should be an issue here with properties of content erroring when accessed, a hacky fix was to just return an empty object here, but that only solves the problem for the top layer, and now it would just be beter to use optional chaining
				//R however the real issue was that because I am using slotted content, even though it isn't rendering due to the state property, the elements still require their data references (unlike v-if and other methods)
				//L using a custom directive was a possible solution: https://stackoverflow.com/questions/43293401/conditionally-rendering-parent-element-keep-inner-html/43299828, https://vuejs.org/v2/guide/custom-directive.html
			},

			// PASSABLE - SORTING
			// parent prioritized over self
			usingParent() {
				// if any prop from the parent is filled in, use parent as the origin
				//! pDead does not trigger usingParent as it would never need to be used without an existing pQuery
				return !!(this.pQuery || this.pContent);
			},
			// query prioritized over static content
			usingQuery() {
				//TODO Inlined this function because it was only being used here. Figure out if this can be removed.
				function isSubclass (a, b) {
					if (typeof a !== 'function' || typeof b !== 'function') return false;
					else return (a.prototype instanceof b);
				};

				if (!isSubclass(this.Entity, Entity)) throw new InvalidStateError({
						message: 'attempting to use a query but Entity is not a child class of Entity',
						state: this.fclone(this.Entity),
					});
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

			// PASSABLE - ACCESSORS
			//R setters aren't used here as they would only be setting the self origin properties, just set these directly for clairty
			query() {
				if (!this.usingQuery) return null;
				else if (this.usingParent) return this.pQuery;
				else return this.sQuery;
			},
			dead() {
				//? afaik this isn't used anywhere, but it exists for consistency
				return !this.usingLive;
			},
			content() {
				if (this.usingQuery) {
					if (this.usingLive) return this.liveContent;
					else return this.deadContent;
				} else {
					if (this.usingParent) return this.pContent;
					else return this.sContent;
				}
			},
		},
        methods: {
			async refresh(switchToState = 'delay') {
				// clear any old request
				this.clearTimeouts();

				// using a deferred promise here so that success, failure, and timeouts can all funnel into the same promise and handlers
				this.refreshPromise = new Deferred();
				this.state = switchToState;
				
				this.startTimeouts();

				if (this.usingQuery) {
					await (this.usingLive 
						? this.liveRefresh()
						: this.deadRefresh()
					).then(this.refreshPromise.resolve, this.refreshPromise.reject);
				} else {
					this.refreshPromise.resolve();
				}

				//! don't await here, because if refreshPromise is canceled, refresh will never resolve
				//? what happens to then? if this promise doesn't resolve or reject is this eventually garbage collected?
				if (isInstanceOf(this.refreshPromise, Deferred, 'Deferred')) this.refreshPromise.then(this.handleSuccess, this.handleError);
			},

			startTimeouts() {
				if (!isInstanceOf(this.refreshPromise, Deferred, 'Deferred')) throw new CustomError({
					message: 'refresh promise must be an instance of Deferred',
				});

                this.clearDelay = setTimer(this.delay, () => {
					// switch state to 'loading' after delay time
					this.state = 'loading';
                });
                this.clearTimeout = setTimer(this.timeout, () => {
					// reject after timeout time
					this.refreshPromise.reject(new CustomError({
                        userMessage: 'content request timed out',
                    }));
				});
            },
            clearTimeouts() {
				// clear
				this.clearDelay?.();
				this.clearTimeout?.();
				if (isInstanceOf(this.refreshPromise, Deferred, 'Deferred')) this.refreshPromise.cancel();

				// reset
				this.clearDelay = null;
				this.clearTimeout = null;
				this.refreshPromise = null;
            },

			async liveRefresh() {
				return await this.$store.dispatch('resubscribe', {
					subscription: this.subscription,

					Entity: this.Entity, 
					query: this.query,
					options: {}, //TODO
				});
			},
			async deadRefresh() {
				//! one item here, uses any() in AsyncDisplayList
				this.deadContent = await this.Entity.get(this.query).then((result) => result.content).then(one);
			},

            handleSuccess(resolved) {
				this.clearTimeouts();
				if (this.usingQuery) {
					if (this.usingLive)	this.subscription = resolved;
					else this.deadContent = resolved;
				}
				this.state = 'display';
            },
            handleError(rejected) {
				this.clearTimeouts();
				this.error = rejected;
				this.state = 'error';
			},
		},
		watch: {
			query: {
				handler(value) {
					// refresh() will be called when this.query changes, don't change the state to avoid flickering
					this.refresh(this.state);
				},

				//R using immediate: true here removes the need to call refresh() in the created() hook
				immediate: true,
				deep: true,
			},
		},
    }
</script>


<template>
    <async-switch 
		:state='state' 
		:error='error' 
		@refresh='refresh' 
		:loading-component='$options.components.LoadingComponent' 
		:error-component='$options.components.ErrorComponent'
		v-slot='slotProps'
	>
	<!-- //C//! 
		async-switch should be a scoped slot via the v-slot directive so that the slot template is evaluated inside async-switch and not this parent component, this keeps content.properties from erroring when content has not loaded and is null
		however, the slotProps aren't actually used for anything
		//L https://forum.vuejs.org/t/defer-evaluation-of-conditionally-rendered-slots/32869
	 -->
    </async-switch>
</template>


<style lang='scss'>
</style>