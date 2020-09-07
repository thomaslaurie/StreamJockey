import test from 'ava';
import boolCatch from './bool-catch.js';

test('any return passes', (t) => {
	t.assert(boolCatch(() => 'asdf'));
});

test('false return passes', (t) => {
	t.assert(boolCatch(() => false));
});

test('any throw fails', (t) => {
	t.assert(!boolCatch(() => { throw 'asdf' }));
});

test('true throw fails', (t) => {
	t.assert(!boolCatch(() => { throw true }));
});
