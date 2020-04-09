import test from 'ava';
import one from './one.js';

test('array to value', (t) => {
	const x = Symbol();
	t.assert(one([x]) === x);
});
test('value to value', (t) => {
	const x = Symbol();
	t.assert(one(x) === x);
});
test('empty array to undefined', (t) => {
	t.assert(one([]) === undefined);
});


