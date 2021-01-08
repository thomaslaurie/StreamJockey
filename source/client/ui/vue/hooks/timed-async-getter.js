// Adds delay and timeout boolean refs to the async getter hook.

import {
	ref,
	watch,
} from 'vue';

import useAsyncGetter from './async-getter.js';
import {
	setTimer,
	promiseStates,
} from '../../../../shared/utility/index.js';

export default function useTimedAsyncGetter(getterRef, {
	delay = 0,
	timeout = Infinity,
} = {}) {
	const {
		error,
		state,
		...rest
	} = useAsyncGetter(getterRef);

	const delayed = ref(true);
	const timedOut = ref(false);
	const initiallyDelayed = ref(true);
	const initiallyTimedOut = ref(false);

	let clearDelay;
	let clearTimeout;

	watch(state, (value) => {
		if (value === promiseStates.pending) {
			delayed.value = true;
			timedOut.value = false;
			// Initial values do not get reset.

			clearDelay = setTimer(delay, () => {
				delayed.value = false;
				initiallyDelayed.value = false;
			});
			clearTimeout = setTimer(timeout, () => {
				timedOut.value = true;
				initiallyTimedOut.value = true;
			});
		} else {
			delayed.value = false;
			initiallyDelayed.value = false;
			// Timeout values don't get reset upon resolution. This distinguishes promises that resolved before vs after the timeout.

			clearDelay?.();
			clearTimeout?.();
		}
	}, {immediate: true});

	return {
		error,
		state,
		...rest,
		delayed,
		timedOut,
		initiallyDelayed,
		initiallyTimedOut,
	};
}
