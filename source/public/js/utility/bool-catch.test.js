import test from './test.js';
import boolCatch from './bool-catch.js';

export default function testBoolCatch() {
	test([
		['any return passes', boolCatch(() => 'asdf')],
		['false return passes', boolCatch(() => false)],
		['any throw fails', !boolCatch(() => { throw 'asdf' })],
		['true throw fails', !boolCatch(() => { throw true })],
	], 'bool-catch');
};

testBoolCatch();