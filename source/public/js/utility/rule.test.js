import test from './test.js';
import boolCatch from './bool-catch.js';
import Rule from './rule.js';

export function testRule() {
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
				throw new Error('String is empty.')
			}
		},
		caster(reference) {
			string.validateCast(reference.value);
			//! Cannot cast any further than a string.
		},
	});


	return test([
		['validate pass', boolCatch(() => string.validate('asdf'))],
		['validate fail', !boolCatch(() => string.validate(12345))],
		['check pass', string.check('asdf')],
		['check fail', !string.check(12345)],

		['validate cast pass', boolCatch(() => {
			const [result] = populatedString.validateCast('  asdf  ');
			if (typeof result !== 'string' || result.trim() === '') {
				throw 'x';
			}
		})],
		['validate cast fail', !boolCatch(() => populatedString.validateCast(''))],
		['check cast pass', populatedString.check('   asdf   ')],
		['check cast fail', !populatedString.check('')],
	], 'Rule');
};

testRule();