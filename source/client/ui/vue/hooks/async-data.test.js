import test from 'ava';
import useAsyncData from './async-data.js';
import {
	ref,
	watch,
} from 'vue';
import {
	Deferred,
	forOwnKeysOf,
	getOwnKeysOf,
	promiseStates,
	wait,
} from '../../../../shared/utility/index.ts';


// Watches a property and tests provided states for each update step.
async function testStates(t, asyncData, watchedKey, statesList) {
	const steps = [];
	let testCount = 0;
	for (const states of statesList) {
		steps.push(new Deferred());
		testCount += getOwnKeysOf(states).length;
	}

	t.plan(testCount);

	let stepIndex = 0;
	watch(() => asyncData[watchedKey], () => {
		if (stepIndex >= statesList.length) {
			t.fail('More changes than planned.');
			return;
		}

		forOwnKeysOf(statesList[stepIndex], (states, key) => {
			t.is(asyncData[key], states[key], `step: ${stepIndex}, key: ${key}`);
		});

		steps[stepIndex].resolve();
		stepIndex++;
	}, {immediate: true});

	await Promise.all(steps);
}

const defaultInitialState = {
	data:  undefined,
	error: undefined,

	state: promiseStates.pending,

	isPending:     true,
	isFulfilled:   false,
	isRejected:    false,

	lastFulfilled: false,
	lastRejected:  false,

	isDelayed:     false,
	isTimedOut:    false,
};

test('updates upon fulfillment', async t => {
	const dataValue = 'foo';
	const getterRef = ref(async () => dataValue);
	const asyncData = useAsyncData(getterRef);

	await testStates(t, asyncData, 'state', [
		defaultInitialState,
		{
			...defaultInitialState,
			data: dataValue,
			state: promiseStates.fulfilled,
			isPending: false,
			isFulfilled: true,
			lastFulfilled: true,
		},
	]);
});

test('updates upon rejection', async t => {
	const errorValue = 'foo';
	const getterRef = ref(async () => {
		throw errorValue;
	});
	const asyncData = useAsyncData(getterRef);

	await testStates(t, asyncData, 'state', [
		defaultInitialState,
		{
			...defaultInitialState,
			error: errorValue,
			state: promiseStates.rejected,
			isPending: false,
			isRejected: true,
			lastRejected: true,
		},
	]);
});

test('updates twice', async t => {
	const dataValue = 'foo';
	const dataValue2 = 'bar';
	const getterRef = ref(async () => dataValue);
	const getter2 = async () => dataValue2;
	const asyncData = useAsyncData(getterRef);

	const testStatesPromise = testStates(t, asyncData, 'state', [
		defaultInitialState,
		{
			...defaultInitialState,
			data: dataValue,
			state: promiseStates.fulfilled,
			isPending: false,
			isFulfilled: true,
			lastFulfilled: true,
		},
		{
			...defaultInitialState,
			data: dataValue,
			state: promiseStates.pending,
			isPending: true,
			isFulfilled: false,
			lastFulfilled: true,
		},
		{
			...defaultInitialState,
			data: dataValue2,
			state: promiseStates.fulfilled,
			isPending: false,
			isFulfilled: true,
			lastFulfilled: true,
		},
	]);

	await asyncData.promise;
	getterRef.value = getter2;
	await testStatesPromise;
});

test('old updates do not overwrite new updates', async t => {
	// This test can be tested by removing the promise equality check from the data and error updates in the usePromiseData watcher. This test should then fail.

	const longerDelay = 200;
	const shorterDelay = 100;
	const dataValue1 = 'foo';
	const dataValue2 = 'bar';
	const getter1 = async () => {
		await wait(longerDelay);
		return dataValue1;
	};
	const getter2 = async () => {
		await wait(shorterDelay);
		return dataValue2;
	};
	const getterRef = ref(getter1);
	const asyncData = useAsyncData(getterRef);

	const testStatesPromise = testStates(t, asyncData, 'data', [
		defaultInitialState,
		{
			...defaultInitialState,
			data: dataValue2,
			state: promiseStates.fulfilled,
			isPending: false,
			isFulfilled: true,
			lastFulfilled: true,
		},
	]);
	const firstLongerPromise = asyncData.promise;
	getterRef.value = getter2;
	const secondShorterPromise = asyncData.promise;

	await secondShorterPromise;
	await firstLongerPromise;

	await testStatesPromise;
});

test('promise is updated synchronously', async t => {
	const dataValue = 'foo';
	const getterRef = ref(async () => dataValue);
	const asyncData = useAsyncData(getterRef);

	const promise1 = asyncData.promise;
	t.not(promise1, undefined);

	getterRef.value = () => {};

	const promise2 = asyncData.promise;
	t.not(promise2, undefined);
	t.not(promise2, promise1);
});

test('refresh calls getter, updates state, and changes promise', async t => {
	const dataValue = 'foo';
	const getterRef = ref(async () => {
		t.pass();
		return dataValue;
	});
	const asyncData = useAsyncData(getterRef);

	const testStatesPromise = testStates(t, asyncData, 'state', [
		defaultInitialState,
		{
			...defaultInitialState,
			data: dataValue,
			state: promiseStates.fulfilled,
			isPending: false,
			isFulfilled: true,
			lastFulfilled: true,
		},
		{
			...defaultInitialState,
			data: dataValue,
			state: promiseStates.pending,
			isPending: true,
			isFulfilled: false,
			lastFulfilled: true,
		},
		{
			...defaultInitialState,
			data: dataValue,
			state: promiseStates.fulfilled,
			isPending: false,
			isFulfilled: true,
			lastFulfilled: true,
		},
	]);

	const firstPromise = asyncData.promise;
	await firstPromise;

	asyncData.refresh();

	const secondPromise = asyncData.promise;
	await secondPromise;

	t.not(firstPromise, secondPromise);

	await testStatesPromise;

	// testStates 40 + getter calls 2 + not assertion 1 = 43
	t.plan(43);
});

test('synchronously thrown value rejects just like async rejection', async t => {
	const errorValue = 'foo';
	const badSynchronousFunction = () => {
		throw errorValue;
	};
	const asyncData = useAsyncData(badSynchronousFunction);

	await testStates(t, asyncData, 'state', [
		defaultInitialState,
		{
			...defaultInitialState,
			error: errorValue,
			state: promiseStates.rejected,
			isPending: false,
			isRejected: true,
			lastRejected: true,
		},
	]);
});


// TIMERS
const timeUnit = 50;

test('0 time', async t => {
	const getter = async () => {};
	const asyncData = useAsyncData(getter, {
		delay: 0,
		timeout: 0,
	});

	const testStatesPromise = testStates(t, asyncData, 'state', [{
		state: promiseStates.pending,
		isDelayed:  false,
		isTimedOut: true,
	}, {
		state: promiseStates.fulfilled,
		isDelayed:  false,
		isTimedOut: true,
	}, {
		state: promiseStates.pending,
		isDelayed:  false,
		isTimedOut: true,
	}, {
		state: promiseStates.fulfilled,
		isDelayed:  false,
		isTimedOut: true,
	}]);

	await asyncData.promise;
	asyncData.refresh();

	await testStatesPromise;
});

test('shorter time', async t => {
	const shorterTime = timeUnit;
	const time = timeUnit * 2;
	const getter = async () => {
		await wait(time);
	};
	const asyncData = useAsyncData(getter, {
		delay: shorterTime,
		timeout: shorterTime,
	});

	const testStatesPromise = testStates(t, asyncData, 'state', [{
		state: promiseStates.pending,
		isDelayed:  true,
		isTimedOut: false,
	}, {
		state: promiseStates.fulfilled,
		isDelayed:  false,
		isTimedOut: true,
	}, {
		state: promiseStates.pending,
		isDelayed:  true,
		isTimedOut: false,
	}, {
		state: promiseStates.fulfilled,
		isDelayed:  false,
		isTimedOut: true,
	}]);

	await asyncData.promise;
	asyncData.refresh();

	await testStatesPromise;
});

test('longer time', async t => {
	const longerTime = timeUnit * 2;
	const time = timeUnit;
	const getter = async () => {
		await wait(time);
	};
	const asyncData = useAsyncData(getter, {
		delay: longerTime,
		timeout: longerTime,
	});

	const testStatesPromise = testStates(t, asyncData, 'state', [{
		state: promiseStates.pending,
		isDelayed:  true,
		isTimedOut: false,
	}, {
		state: promiseStates.fulfilled,
		isDelayed:  false,
		isTimedOut: false,
	}, {
		state: promiseStates.pending,
		isDelayed:  true,
		isTimedOut: false,
	}, {
		state: promiseStates.fulfilled,
		isDelayed:  false,
		isTimedOut: false,
	}]);

	await asyncData.promise;
	asyncData.refresh();

	await testStatesPromise;
});


// ATOMIC UPDATES
//TODO atomic test for isTimedOut, probably requires a third step.

const timeoutTime = 100;
const functionTime = timeoutTime * 2;
const delayTime = functionTime * 2;

const atomicTestInitialState = {
	data:  undefined,
	error: undefined,

	state: promiseStates.pending,

	isPending:     true,
	isFulfilled:   false,
	isRejected:    false,

	lastFulfilled: false,
	lastRejected:  false,

	isDelayed:     true,
};
const fulfillSequence = data => [atomicTestInitialState, {
	data,
	error: undefined,

	state: promiseStates.fulfilled,

	isPending:     false,
	isFulfilled:   true,
	isRejected:    false,

	lastFulfilled: true,
	lastRejected:  false,

	isDelayed:     false,
}];
const rejectSequence = error => [atomicTestInitialState, {
	data: undefined,
	error,

	state: promiseStates.rejected,

	isPending:     false,
	isFulfilled:   false,
	isRejected:    true,

	lastFulfilled: false,
	lastRejected:  true,

	isDelayed:     false,
}];

// Fulfill Sequences
for (const key of ['data', 'state', 'isPending', 'isFulfilled', 'lastFulfilled', 'isDelayed']) {
	test(`atomic update for '${key}' for fulfillment`, async t => {
		const dataValue = Symbol();
		const getter = async () => {
			await wait(functionTime);
			return dataValue;
		};

		const asyncData = useAsyncData(getter, {
			delay: delayTime,
			timeout: timeoutTime,
		});

		await testStates(t, asyncData, key, fulfillSequence(dataValue));
	});
}

// Reject Sequences
for (const key of ['error', 'isRejected', 'lastRejected', 'isDelayed']) {
	test(`atomic update for '${key}' for rejection`, async t => {
		const error = new Error();
		const getter = async () => {
			await wait(functionTime);
			throw error;
		};

		const asyncData = useAsyncData(getter, {
			delay: delayTime,
			timeout: timeoutTime,
		});

		await testStates(t, asyncData, key, rejectSequence(error));
	});
}
