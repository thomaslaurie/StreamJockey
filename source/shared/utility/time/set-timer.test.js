import test from 'ava';
import setTimer from './set-timer.js';

test('synchronous if 0 delay', t => {
	let x = 'foo';
	setTimer(0, () => x = 'bar');
	t.is(x, 'bar');
});

test('asynchronous if + delay', t => {
	let x = 'foo';
	setTimer(0.000000001, () => x = 'bar');
	t.is(x, 'foo');
});

test('can be canceled', async t => {
	let x = 'foo';
	await new Promise((resolve, reject) => {
		const cancel = setTimer(1000, () => x = 'bar');
		cancel();
		resolve();
	});
	t.is(x, 'foo');
});

test('throws negative, NaN delays, non-function callbacks', t => {
	t.throws(() => {
		setTimer(-1, () => {});
	});
	t.throws(() => {
		setTimer(NaN, () => {});
	});
	t.throws(() => {
		setTimer(0);
	});
});
