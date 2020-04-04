import Rule from '../rule.js';

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

//! Defining 0 as neither positive or negative.
//L Don't worry about NaN: https://stackoverflow.com/a/26982925 (//!but be careful about negating comparisons)
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
