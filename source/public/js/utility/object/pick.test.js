import test from '../test.js';
import pick from './pick.js';
import deepCompare from './deep-compare.js';

export default function () {
	return test([
		['simple', deepCompare(pick({a: 'foo', b: 'bar'}, ['a']), {a: 'foo'})],
	], 'pick');
};