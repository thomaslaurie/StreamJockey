import Rule from '../rule.js';

export const string = new Rule({
	validator(value) {
		if (typeof value !== 'string') {
			throw new Error('Value is not a string.');
		}
	},
	caster(reference) {
		// Stringify if able to.
		if (typeof reference.value === 'object') {
			try {
				reference.value = JSON.stringify(reference.value);
			} catch (e) {}
		}
		reference.value = String(reference.value);
	},
});
export const trimmedString = new Rule({
	validator(value) {
		string.validate(value);
		//TODO Create a thorough test for this.
		//TODO See https://en.wikipedia.org/wiki/Whitespace_character
		//! If this gets changed, ensure the caster .trim() function is updated too.
		//L from the trim() polyfill at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
		if (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g.test(value)) {
			throw new Error('String has leading and/or trailing whitespace.');
		}
	},
	caster(reference) {
		string.validateCast(reference);
		reference.value = reference.value.trim();
	},
});
export const visibleString = new Rule({
	validator(value) {
		string.validate(value);
		if (trimmedString.validateCast(value) === '') {
			throw 'String is not visible.';
		}
	},
	caster(reference) {
		string.validateCast(reference);
		// Cannot cast any further than a string.
	},
});
export const populatedString = new Rule({
	validator(value) {
		string.validate(value);
		if (value === '') {
			throw 'String is not populated.';
		}
	},
	caster(reference) {
		string.validateCast(reference);
		// Cannot cast any further than a string.
	},
});