import {
	ref,
	computed,
	watch,
} from 'vue';
import {
	promiseStates,
	setTimer,
} from '../../../../shared/utility/index.js';

// Provides a promise ref for a function.
// Calls immediately and upon updating.
// Updates upon changing the function (if passed a function ref) or calling refresh().
function usePromiseRef(func) {
	// Allows a raw or ref function to be passed.
	//R If ref() is passed a ref, it will return that ref.
	const funcRef = ref(func);

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
function usePromiseData(getter) {
	const {
		promise,
		refresh,
		...rest
	} = usePromiseRef(getter);

	const data = ref();
	const error = ref();
	const state = ref(promiseStates.pending);

	watch(promise, (promiseValue) => {
		state.value = promiseStates.pending;

		// Upon settling, update only if this is the last promise.
		promiseValue.then(
			(nextFulfilled) => {
				if (promise.value === promiseValue) {
					data.value = nextFulfilled;
					// Keep the existing error value.
					state.value = promiseStates.fulfilled;
				}
			},
			(nextRejected) => {
				if (promise.value === promiseValue) {
					// Keep the existing result value.
					error.value = nextRejected;
					state.value = promiseStates.rejected;
				}
			},
		);
	}, {immediate: true});

	return {
		data,
		error,
		state,

		/* //R
			The current promise is exported so that the same promise can be awaited by external code. This has been useful for testing. Relying on watch is insufficient because the other refs won't update if another getter is passed before this promise resolves.
		*/
		promise,
		refresh,
		...rest,
	};
}

// Provides boolean refs for the state of the current promise.
// Provides boolean refs for the last resolved state.
export function useAsyncData(getter) {
	const {
		state,
		...rest
	} = usePromiseData(getter);


	const pending = ref(true);
	const fulfilled = ref(false);
	const rejected = ref(false);

	const hasFulfilled = ref(false);
	const hasRejected = ref(false);

	watch(state, (stateValue) => {
		if (stateValue === promiseStates.pending) {
			pending.value = true;
			fulfilled.value = false;
			rejected.value = false;
		} else if (stateValue === promiseStates.fulfilled) {
			pending.value = false;
			fulfilled.value = true;
			rejected.value = false;

			hasFulfilled.value = true;
			hasRejected.value = false;
		} else if (state.value === promiseStates.rejected) {
			pending.value = false;
			fulfilled.value = false;
			rejected.value = true;

			hasFulfilled.value = false;
			hasRejected.value = true;
		}
	}, {immediate: true});

	return {
		pending,
		fulfilled,
		rejected,

		hasFulfilled,
		hasRejected,

		state,
		...rest,
	};
}

// Provides delay and timeout boolean refs which start upon calling the getter.
//R initiallyDelayed, initiallyTimedOut, initiallyPending values are do-able however they're probably not needed because the 'initial' states can be found by fallback from hasFulfilled = false and hasRejected = false.
export function useTimedAsyncData(getter, {
	delay = 0,
	timeout = Infinity,
} = {}) {
	const {
		state,
		...rest
	} = useAsyncData(getter);

	const delayed = ref(true);
	const timedOut = ref(false);

	let clearDelay;
	let clearTimeout;

	watch(state, (value) => {
		if (value === promiseStates.pending) {
			delayed.value = true;
			timedOut.value = false;

			clearDelay = setTimer(delay, () => {
				delayed.value = false;
			});
			clearTimeout = setTimer(timeout, () => {
				timedOut.value = true;
			});
		} else {
			delayed.value = false;
			// Timeout don't get reset upon resolution. This distinguishes promises that resolved before vs after the timeout.

			clearDelay?.();
			clearTimeout?.();
		}
	}, {immediate: true});

	return {
		delayed,
		timedOut,

		state,
		...rest,
	};
}

export default useAsyncData;
