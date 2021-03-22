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
		reference.value = Number.parseInt(reference.value, 10);
	},
});

//! Defining 0 as neither positive or negative.
//R //L Using negated comparisons here to catch NaN: https://stackoverflow.com/a/26982925
export const positiveNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (!(value > 0)) throw new Error('Number is not positive.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const negativeNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (!(value < 0)) throw new Error('Number is not negative.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const nonNegativeNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (!(value >= 0)) throw new Error('Number is not non-negative.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});
export const nonPositiveNumber = new Rule({
	validator(value) {
		number.validate(value);
		if (!(value <= 0)) throw new Error('Number is not non-positive.');
	},
	caster(reference) {
		number.validateCast(reference);
		// Cannot cast any further than a number.
	},
});

export const positiveInteger = new Rule({
	validator(value) {
		positiveNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		positiveNumber.validateCast(reference);
		integer.validateCast(reference);
	},
});
export const negativeInteger = new Rule({
	validator(value) {
		negativeNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		negativeNumber.validateCast(reference);
		integer.validateCast(reference);
	},
});
export const nonNegativeInteger = new Rule({
	validator(value) {
		nonNegativeNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		nonNegativeNumber.validateCast(reference);
		integer.validateCast(reference);
	},
});
export const nonPositiveInteger = new Rule({
	validator(value) {
		nonPositiveNumber.validate(value);
		integer.validate(value);
	},
	caster(reference) {
		nonPositiveNumber.validateCast(reference);
		integer.validateCast(reference);
	},
});

//? Is there a better name for this?
export const unitInterval = new Rule({
	validator(value) {
		if (!(0 <= value && value <= 1)) {
			throw new Error('Value is not a number between 0 and 1.');
		}
	},
});
