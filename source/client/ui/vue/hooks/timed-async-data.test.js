import test from 'ava';
import {useTimedAsyncData} from './async-data.js';
import {
	ref,
	watch,
} from 'vue';
import {
	Deferred,
	promiseStates,
	wait,
} from '../../../../shared/utility/index.js';

/* eslint-disable no-magic-numbers */

const timeUnit = 50;

test('0 time', async t => {
	t.plan(12);

	const getterRef = ref(() => {});

	const {
		state,
		promise,
		refresh,
		delayed,
		timedOut,
	} = useTimedAsyncData(getterRef, {
		delay: 0,
		timeout: 0,
	});

	const steps = [
		new Deferred(),
		new Deferred(),
		new Deferred(),
		new Deferred(),
	];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(state.value, promiseStates.pending);
			t.false(delayed.value);
			t.true(timedOut.value);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(state.value, promiseStates.fulfilled);
			t.false(delayed.value);
			t.true(timedOut.value);
			steps[1].resolve();
		} else if (steps[2].isPending) {
			t.is(state.value, promiseStates.pending);
			t.false(delayed.value);
			t.true(timedOut.value);
			steps[2].resolve();
		} else if (steps[3].isPending) {
			t.is(state.value, promiseStates.fulfilled);
			t.false(delayed.value);
			t.true(timedOut.value);
			steps[3].resolve();
		} else {
			t.fail();
		}
	}, {immediate: true});

	await promise.value;

	refresh();

	await Promise.all(steps);
});

test('shorter time', async t => {
	t.plan(12);

	const shorterTime = timeUnit;
	const time = timeUnit * 2;

	const getterRef = ref(async () => {
		await wait(time);
	});

	const {
		state,
		promise,
		refresh,
		delayed,
		timedOut,
	} = useTimedAsyncData(getterRef, {
		delay: shorterTime,
		timeout: shorterTime,
	});

	const steps = [
		new Deferred(),
		new Deferred(),
		new Deferred(),
		new Deferred(),
	];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(state.value, promiseStates.pending);
			t.true(delayed.value);
			t.false(timedOut.value);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(state.value, promiseStates.fulfilled);
			t.false(delayed.value);
			t.true(timedOut.value);
			steps[1].resolve();
		} else if (steps[2].isPending) {
			t.is(state.value, promiseStates.pending);
			t.true(delayed.value);
			t.false(timedOut.value);
			steps[2].resolve();
		} else if (steps[3].isPending) {
			t.is(state.value, promiseStates.fulfilled);
			t.false(delayed.value);
			t.true(timedOut.value);
			steps[3].resolve();
		} else {
			t.fail();
		}
	}, {immediate: true});

	await promise.value;

	refresh();

	await Promise.all(steps);
});

test('longer time', async t => {
	t.plan(12);

	const longerTime = timeUnit * 2;
	const time = timeUnit;

	const getterRef = ref(async () => {
		await wait(time);
	});

	const {
		state,
		promise,
		refresh,
		delayed,
		timedOut,
	} = useTimedAsyncData(getterRef, {
		delay: longerTime,
		timeout: longerTime,
	});

	const steps = [
		new Deferred(),
		new Deferred(),
		new Deferred(),
		new Deferred(),
	];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(state.value, promiseStates.pending);
			t.true(delayed.value);
			t.false(timedOut.value);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(state.value, promiseStates.fulfilled);
			t.false(delayed.value);
			t.false(timedOut.value);
			steps[1].resolve();
		} else if (steps[2].isPending) {
			t.is(state.value, promiseStates.pending);
			t.true(delayed.value);
			t.false(timedOut.value);
			steps[2].resolve();
		} else if (steps[3].isPending) {
			t.is(state.value, promiseStates.fulfilled);
			t.false(delayed.value);
			t.false(timedOut.value);
			steps[3].resolve();
		} else {
			t.fail();
		}
	}, {immediate: true});

	await promise.value;

	refresh();

	await Promise.all(steps);
});
