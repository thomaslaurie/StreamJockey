//TODO Add test for transferred validate/test functions. These should not cause any issues because they are bound to their instance.

import test from 'ava';
import boolCatch from '../bool-catch.js';
import Rule from './rule.js';

const string = new Rule({
	validator(value) {
		if (typeof value !== 'string') {
			throw new Error('Value is not a string.');
		}
	},
	caster(reference) {
		if (typeof reference.value === 'object') {
			try {
				reference.value = JSON.stringify(reference.value);
			} catch (e) {}
		}
		reference.value = String(reference.value);
	},
});
const populatedString = new Rule({
	validator(value) {
		string.validate(value);
		if (value.trim() === '') {
			throw new Error('String is empty.');
		}
	},
	caster(reference) {
		string.validateCast(reference.value);
		//! Cannot cast any further than a string.
	},
});

test('validate pass', (t) => {
	t.assert(boolCatch(() => string.validate('asdf')));
});
test('validate fail', (t) => {
	t.assert(!boolCatch(() => string.validate(12345)));
});
test('test pass', (t) => {
	t.assert(string.test('asdf'));
});
test('test fail', (t) => {
	t.assert(!string.test(12345));
});
test('validate cast pass', (t) => {
	t.assert(boolCatch(() => {
		const [result] = populatedString.validateCast('  asdf  ');
		if (typeof result !== 'string' || result.trim() === '') {
			throw 'x';
		}
	}));
});
test('validate cast fail', (t) => {
	t.assert(!boolCatch(() => populatedString.validateCast('')));
});
test('test cast pass', (t) => {
	t.assert(populatedString.test('   asdf   '));
});
test('test cast fail', (t) => {
	t.assert(!populatedString.test(''));
});
