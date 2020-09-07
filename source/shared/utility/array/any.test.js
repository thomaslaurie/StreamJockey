import test from 'ava';
import any from './any.js';

test('array to array', (t) => {
	t.assert(any([]) instanceof Array);
});
test('value to array', (t) => {
	t.assert(any('foo') instanceof Array);
});
test('value in array', (t) => {
	const x = Symbol();
	t.assert(any(x)[0] === x);
});
