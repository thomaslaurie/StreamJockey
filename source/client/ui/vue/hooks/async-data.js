import {
	ref,
	computed,
	watch,
	unref,
	readonly,
} from 'vue';
import {
	promiseStates,
	rules,
	setTimer,
} from '../../../../shared/utility/index.js';

/* //R Allowing non-function values to be passed and function-wrapped leads to complications:
	What if a ref is passed?
	If the value is unwrapped, then it looses its reactivity.
	If its not unwrapped, then the initial data value must be passed the non-function value, outside of the wrapper function. Updating the value wouldn't be possible because it would create a recursive reference to itself.

	If the ref is maintained but non-function values are wrapped and function values are not, then the semantics of the value could change if changing between non-function and function values. Ie: (getter) <---> (getter value). This is confusing and bad.

	Function-only support is nice because when passed as a component prop, the DOM-unwrapped ref will not get re-wrapped, the containing function will, which can be handled easily since its ref is only initialized once.
*/

//! //G Do not pass a function that returns a ref. This ref will will not be unwrapped, and cannot translate its reactivity to the data ref.

// Provides a promise ref for a function.
// Calls immediately and upon updating.
// Updates upon changing the function (if passed a function ref) or calling refresh().
function usePromiseRef(func) {
	rules.func.validate(unref(func));

	// Allows a raw or ref function to be passed.
	//R If ref() is passed a ref, it will return that ref.
	const funcRef = ref(func);

	//TODO Should refresh return the current promise?
	const computeFunction = ref();
	function refresh() {
		// Changes the identity of the computeFunction.
		// This forces the computed promise to update.
		computeFunction.value = () => funcRef.value();
	}
	refresh();

	// Calls the function upon update.
	// Synchronous results will be handled the same as asynchronous results.
	const promise = computed(async () => computeFunction.value());

	return {
		promise,
		refresh,
	};
}

// Provides refs to the last fulfilled and rejected values of the passed function.
// Provides a ref to the state of the current promise.
function usePromiseData(promiseRef) {
	const data = ref();
	const error = ref();
	const state = ref(promiseStates.pending);

	watch(promiseRef, promiseValue => {
		state.value = promiseStates.pending;

		// Upon settling, update only if this is the last promise.
		//R //? Seems like state needs to be updated before data so that watchers of data can use the correct state. This passes the atomic update test. Not sure why it doesn't fail the other way around.
		promiseValue.then(
			nextFulfilled => {
				if (promiseRef.value === promiseValue) {
					state.value = promiseStates.fulfilled;

					data.value = nextFulfilled;
					// Keep the existing error value.
				}
			},
			nextRejected => {
				if (promiseRef.value === promiseValue) {
					state.value = promiseStates.rejected;

					// Keep the existing result value.
					error.value = nextRejected;
				}
			},
		);
	}, {immediate: true});

	//TODO //? Why using separate readonly properties? Why not just a readonly object?
	return {
		data:  readonly(data),
		error: readonly(error),
		state: readonly(state),
	};
}

// Provides boolean refs for the state of the current promise.
// Provides boolean refs for the last resolved state.
function usePromiseStates(stateRef) {
	const isPending = ref(true);
	const isFulfilled = ref(false);
	const isRejected = ref(false);

	const lastFulfilled = ref(false);
	const lastRejected = ref(false);

	watch(stateRef, stateValue => {
		if (stateValue === promiseStates.pending) {
			isPending.value = true;
			isFulfilled.value = false;
			isRejected.value = false;
		} else if (stateValue === promiseStates.fulfilled) {
			isPending.value = false;
			isFulfilled.value = true;
			isRejected.value = false;

			lastFulfilled.value = true;
			lastRejected.value = false;
		} else if (stateValue === promiseStates.rejected) {
			isPending.value = false;
			isFulfilled.value = false;
			isRejected.value = true;

			lastFulfilled.value = false;
			lastRejected.value = true;
		}
	}, {immediate: true});

	return {
		isPending:     readonly(isPending),
		isFulfilled:   readonly(isFulfilled),
		isRejected:    readonly(isRejected),

		lastFulfilled: readonly(lastFulfilled),
		lastRejected:  readonly(lastRejected),
	};
}

// Provides delay and timeout boolean refs which start upon calling the getter.
//R initiallyDelayed, initiallyTimedOut, initiallyPending values are do-able however they're probably not needed because the 'initial' states can be determined as a fallback from lastFulfilled = false and lastRejected = false.
function usePromiseTimer(stateRef, {
	delay = 0,
	timeout = Infinity,
} = {}) {
	const isDelayed = ref(true);
	const isTimedOut = ref(false);

	let clearDelay;
	let clearTimeout;

	watch(stateRef, value => {
		if (value === promiseStates.pending) {
			isDelayed.value = true;
			isTimedOut.value = false;

			clearDelay = setTimer(delay, () => {
				isDelayed.value = false;
			});
			clearTimeout = setTimer(timeout, () => {
				isTimedOut.value = true;
			});
		} else {
			isDelayed.value = false;
			// Timeout don't get reset upon resolution. This distinguishes promises that resolved before vs after the timeout.

			clearDelay?.();
			clearTimeout?.();
		}
	}, {immediate: true});

	return {
		isDelayed: readonly(isDelayed),
		isTimedOut: readonly(isTimedOut),
	};
}

export default function useAsyncData(getter, options) {
	const {
		promise,
		refresh,
	} = usePromiseRef(getter);
	const {
		data,
		error,
		state,
	} = usePromiseData(promise);
	const {
		isPending,
		isFulfilled,
		isRejected,

		lastFulfilled,
		lastRejected,
	} = usePromiseStates(state);
	const {
		isDelayed,
		isTimedOut,
	} = usePromiseTimer(state, options);

	const asyncData = readonly({
		data,
		error,

		state,

		isPending,
		isFulfilled,
		isRejected,

		lastFulfilled,
		lastRejected,

		isDelayed,
		isTimedOut,

		/* //R
			The current promise is exported so that the same promise can be awaited by external code. This has been useful for testing. Relying on watch is insufficient because the other refs won't update if another getter is passed before this promise resolves.
		*/
		promise,
		refresh,
	});

	return asyncData;
}
