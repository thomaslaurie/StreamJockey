import test from 'ava';
import pick from './pick.js';
import deepCompare from './deep-compare.js';

test('simple', t => {
	t.assert(deepCompare(pick({a: 'foo', b: 'bar'}, ['a']), {a: 'foo'}));
});
