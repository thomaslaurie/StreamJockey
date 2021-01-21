import test from 'ava';
import asyncMap from './async-map.js';

const fulfilled = Symbol();
const rejected = Symbol();

test('fulfill on all fulfilled', async t => {
	const results = await asyncMap(
		['foo', 'bar', 'baz'],
		async () => fulfilled,
	);
	t.deepEqual(results, [fulfilled, fulfilled, fulfilled]);
});
test('reject on some rejected', async t => {
	const results = await asyncMap(
		['foo', 'bar', 'baz'],
		async value => {
			if (value === 'bar') return fulfilled;
			throw rejected;
		},
	).catch(rejected => rejected);
	t.deepEqual(results, [rejected, rejected]);
});
test('async map function', async t => {
	const x = Symbol();
	const results = await asyncMap(
		['foo'],
		async () => await (async () => x)(),
	);
	t.deepEqual(results, [x]);
});
test('empty fulfills', async t => {
	const results = await asyncMap([], () => 'foo');
	t.deepEqual(results, []);
});
