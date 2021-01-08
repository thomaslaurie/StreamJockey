import test from 'ava';
import useAsyncGetter from './async-getter.js';
import {
	ref,
	watch,
} from 'vue';
import {
	Deferred,
	promiseStates,
	wait,
} from '../../../../shared/utility/index.js';

test('updates upon fulfillment', async (t) => {
	t.plan(6);

	const dataValue = 'foo';
	const getterRef = ref(async () => dataValue);

	const {
		data,
		error,
		state,
	} = useAsyncGetter(getterRef);

	const steps = [new Deferred(), new Deferred()];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(data.value, undefined);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(data.value, dataValue);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.fulfilled);
			steps[1].resolve();
		}
	}, {immediate: true});

	await Promise.all(steps);
});

test('updates upon rejection', async (t) => {
	t.plan(6);

	const errorValue = 'foo';
	const getterRef = ref(async () => {
		throw errorValue;
	});

	const {
		data,
		error,
		state,
	} = useAsyncGetter(getterRef);

	const steps = [new Deferred(), new Deferred()];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(data.value, undefined);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(data.value, undefined);
			t.is(error.value, errorValue);
			t.is(state.value, promiseStates.rejected);
			steps[1].resolve();
		}
	}, {immediate: true});

	await Promise.all(steps);
});

test('updates twice', async (t) => {
	t.plan(12);

	const dataValue = 'foo';
	const dataValue2 = 'bar';
	const getterRef = ref(async () => dataValue);
	const getter2 = async () => dataValue2;

	const {
		data,
		error,
		state,
	} = useAsyncGetter(getterRef);

	const steps = [new Deferred(), new Deferred(), new Deferred(), new Deferred()];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(data.value, undefined);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(data.value, dataValue);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.fulfilled);
			steps[1].resolve();
		} else if (steps[2].isPending) {
			t.is(data.value, dataValue);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[2].resolve();
		} else if (steps[3].isPending) {
			t.is(data.value, dataValue2);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.fulfilled);
			steps[3].resolve();
		}
	}, {immediate: true});

	await Promise.all([steps[0], steps[1]]);

	getterRef.value = getter2;

	await Promise.all([steps[2], steps[3]]);
});

test('old updates do not overwrite new updates', async (t) => {
	t.plan(9);

	const delay = 200;
	const shorterDelay = 100;
	const dataValue1 = 'foo';
	const dataValue2 = 'bar';
	const getter1 = async () => {
		await wait(delay);
		return dataValue1;
	};
	const getter2 = async () => {
		await wait(shorterDelay);
		return dataValue2;
	};

	const getterRef = ref(getter1);

	const {
		data,
		error,
		state,
		promise,
	} = useAsyncGetter(getterRef);

	const steps = [new Deferred(), new Deferred()];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(data.value, undefined);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(data.value, dataValue2);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.fulfilled);
			steps[1].resolve();
		}
	}, {immediate: true});

	const firstPromise = promise.value;

	// After passing the first getter above.
	// Pass the second getter.
	getterRef.value = getter2;

	// Wait for the first (longer) getter's promise to resolve.
	//G The timing of this can be verified by removing the conditions from the data, error, & state updates. This test should then fail.
	await firstPromise;

	// Then verify that the values are from the second getter.
	t.is(data.value, dataValue2);
	t.is(error.value, undefined);
	t.is(state.value, promiseStates.fulfilled);
});

test('promise is updated synchronously', async (t) => {
	t.plan(3);

	const dataValue = 'foo';
	const getterRef = ref(async () => dataValue);

	const {
		promise,
	} = useAsyncGetter(getterRef);

	const promise1 = promise.value;

	t.not(promise1, undefined);

	getterRef.value = () => {};

	const promise2 = promise.value;

	t.not(promise2, undefined);
	t.not(promise2, promise1);
});

test('refresh calls getter, updates state, and changes promise', async (t) => {
	t.plan(15);

	const dataValue = 'foo';
	const getterRef = ref(async () => {
		t.pass();
		return dataValue;
	});

	const {
		data,
		error,
		state,
		promise,
		refresh,
	} = useAsyncGetter(getterRef);

	const steps = [
		new Deferred(),
		new Deferred(),
		new Deferred(),
		new Deferred(),
	];

	watch(state, () => {
		if (steps[0].isPending) {
			t.is(data.value, undefined);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[0].resolve();
		} else if (steps[1].isPending) {
			t.is(data.value, dataValue);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.fulfilled);
			steps[1].resolve();
		} else if (steps[2].isPending) {
			t.is(data.value, dataValue);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.pending);
			steps[2].resolve();
		} else if (steps[3].isPending) {
			t.is(data.value, dataValue);
			t.is(error.value, undefined);
			t.is(state.value, promiseStates.fulfilled);
			steps[3].resolve();
		}
	}, {immediate: true});

	const promise1 = promise.value;
	await promise1;

	refresh();

	const promise2 = promise.value;
	await promise2;

	t.not(promise1, promise2);
});
