import Rule from './rule.js';

//TODO ensure that import * can be tree shaken
//R should be useful to write rules for even basic types, because then custom casting and errors can be used, plus consistency

//L Doesn't seem proper to distinguish async vs sync functions: https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
// sync func
// async func

// BUILT-IN RULES

// FUNCTIONS
export const func = new Rule({
	validator(value) {
		if (typeof value !== 'function') throw new Error('Value is not a function.')
	},
});

// STRINGS
export const string = new Rule({
	validator(value) {
		if (typeof value !== 'string') throw new Error('Value is not a string.');
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
			throw 'String is empty.';
		}
	},
	caster(reference) {
		string.validateCast(reference);
		// Cannot cast any further than a string.
	},
});

// NUMBERS
export const number = new Rule({
	validator(value) {
		if (typeof value !== 'number') {
			throw new Error('Value is not a number.');
		}
	},
	caster(reference) {
		// Parse strings for floats.
		const n = Number.parseFloat(reference.value);
		// But do not cast non-numbers to NaN.
		if (!Number.isNaN(n)) reference.value = n;
	},
});
export const nonNaNNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (Number.isNaN(value)) {
			throw new Error('Number is NaN.');
		}
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const integer = new Rule({
	validator(value) {
		number.validate(value);
		if (!Number.isInteger(value)) throw new Error('Number is not an integet.');
	},
	caster(reference) {
		number.validateCast(reference);
		reference.value = Number.parseInt(reference.value);
	},
});

// Defining 0 as neither positive or negative.
//L Don't worry about NaN: https://stackoverflow.com/a/26982925
export const nonNegativeNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (value < 0) throw new Error('Number is negative.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const nonPositiveNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (value > 0) throw new Error('Number is positive.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const positiveNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (value <= 0) throw new Error('Number is not positive.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const negativeNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (value >= 0) throw new Error('Number is not negative.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});


//? This calls the number validator twice, any way to optimize this?
export const nonNegativeInteger = new Rule({
	validator(value) {
		nonNegativeNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		nonNegativeNumber.validateCast(reference.value);
		integer.validateCast(reference.value);
	},
});
export const nonPositiveInteger = new Rule({
	validator(value) {
		nonPositiveNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		nonPositiveNumber.validateCast(reference.value);
		integer.validateCast(reference.value);
	},
});
export const positiveInteger = new Rule({
	validator(value) {
		positiveNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		positiveNumber.validateCast(reference.value);
		integer.validateCast(reference.value);
	},
});
export const negativeInteger = new Rule({
	validator(value) {
		negativeNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		negativeNumber.validateCast(reference.value);
		integer.validateCast(reference.value);
	},
});

// COMPLEX
export const constructor = new Rule({
	validator(value) {
		try { 
			const Test = class extends value {}; 
		} catch (e) { 
			throw new Error('Value is not a constructor.');
		}
	},
});

