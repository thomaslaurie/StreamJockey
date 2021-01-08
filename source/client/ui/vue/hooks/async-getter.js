import {
	ref,
	computed,
	watch,
} from 'vue';
import {promiseStates} from '../../../../shared/utility/index.js';

export default function useAsyncGetter(getterRef) {
	const data = ref();
	const error = ref();
	const state = ref(promiseStates.pending);

	const computer = ref();
	function refresh() {
		// Force calls the getter.
		// This is done by changing the identity of the function used in the computed promise.
		// Wraps potentially synchronous results in a promise, so they can be handled like async results.
		computer.value = () => Promise.resolve(getterRef.value());
	}
	refresh();

	const promise = computed(() => computer.value());

	watch(promise, async (value) => {
		state.value = promiseStates.pending;

		// Upon settling, update only if this is the last promise.
		value.then(
			(fulfilled) => {
				if (promise.value === value) {
					data.value = fulfilled;
					state.value = promiseStates.fulfilled;
				}
			},
			(rejected) => {
				if (promise.value === value) {
					error.value = rejected;
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
	};
}
