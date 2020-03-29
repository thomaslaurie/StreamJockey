import Rule from './rule.js';
import {getKeysOf} from '../object/keys-of.js';

//G Include anything here that is possible to implement incorrectly, even for basic types.
//R Rules for basic types are also useful for custom casting, errors, and consistency.

//TODO ensure that import * can be tree shaken

//L Doesn't seem proper to distinguish async vs sync functions: https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
// sync func
// async func

// BUILT-IN RULES

// OBJECTS
export const object = new Rule({
	//L https://stackoverflow.com/a/22482737
	validator(value) {
		if (value === null || !(typeof value === 'object' || typeof value === 'function')) {
			throw new Error('Value is not an object.');
		}
	}
});

// ARRAYS
export const array = new Rule({
	//L Why not instanceof? - http://web.mit.edu/jwalden/www/isArray.html
	//TODO Doesn't this then apply to all classes? Should all classes use validators like this or just use instanceof?
	validator(value) {
		if (!Array.isArray(value)) {
			throw new Error('Value is not an array.')
		}
	}
});

// FUNCTIONS
export const func = new Rule({
	validator(value) {
		if (typeof value !== 'function') throw new Error('Value is not a function.')
	},
});

// STRINGS
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
			throw 'String is empty.';
		}
	},
	caster(reference) {
		string.validateCast(reference);
		// Cannot cast any further than a string.
	},
});

// SYMBOLS
export const symbol = new Rule({
	validator(value) {
		//L If transpiling to ES5, an additional check is required: https://stackoverflow.com/questions/46479169/check-if-value-is-a-symbol-in-javascript
		if (typeof value !== 'symbol') {
			throw new Error('Value is not a symbol.');
		}
	},
	caster(reference) {
		// Non-symbol values cast as the stringified description of a new symbol.
		if (!this.validate(reference.value)) {
			// Symbol(x) cannot convert symbols to strings, but String(x) in string.validateCast() can.
			string.validateCast(reference.value);
			reference.value = Symbol(reference.value);
		}
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

// SPECIAL
export const constructor = new Rule({
	validator(value) {
		try { 
			const Test = class extends value {}; 
		} catch (e) { 
			throw new Error('Value is not a constructor.');
		}
	},
});
const keyify = function (value) {
	// Create a null object with only one property.
	const nullObject = Object.create(null);
	nullObject[value] = true;

	// Find that only property's key.
	const [keyifiedValue] = getKeysOf(nullObject, {
		own: true,
		named: true,
		symbol: true,
		enumerable: true,

		nonEnumerable: false,
		inherited: false,
	});

	return keyifiedValue;
};
export const key = new Rule({
	// Keys that won't be cast / have already been cast as a result of being used as a property key.
	//! Does not include numbers, those get cast to strings.
	validator(value) {
		const keyifiedValue = keyify(value);

		if (value !== keyifiedValue) {
			throw 'Value is not keyified.';
		}
	},
	caster(reference) {
		reference.value = keyify(reference.value);
	},
});

