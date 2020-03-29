//TODO make validator keys the string keys not the literal keys, easier to access
//TODO implement poly-validate.

import {getKeysOf} from './object/keys-of.js';
import define  from './object/define.js';

// EXPORT CONSTANTS
//TODO export these in a better way (maybe attach them to VirtualInterface as static properties).
export const VALIDATORS        = Symbol('VALIDATORS');
export const IS_IMPLEMENTED_BY = Symbol('IS_IMPLEMENTED_BY');

export const ALL_VALID = 'all valid';
export const ALL = 'all';
export const ANY = 'any';

export const exists = function (object, key) {
	return key in object;
};


// PRIVATE UTILITIES
function getValidatorKeys(validators) {
	return getKeysOf(validators, {
		own:           true,
		named:         true,
		symbol:        true,
		enumerable:    true,
	
		inherited:     false,
		nonEnumerable: false,
	});
};
function validateValidator(validator, key) {
	if (key === VALIDATORS || key === IS_IMPLEMENTED_BY) {
		throw new Error(`Using ${key} as a key is forbidden.`);
	}
	if (typeof validator !== 'function') {
		throw new Error(`Interface property ${key} is not a validator function: ${typeof validator}`);
	}
};
function freezeSpecialProperties(object) {
	Object.defineProperties(object, {
		validators: {
			...Object.getOwnPropertyDescriptor(object, 'validators'),
			configurable: false,
		},
		isImplementedBy: {
			...Object.getOwnPropertyDescriptor(object, 'isImplementedBy'),
			configurable: false,
		},
	});
};


// INHERITABLES
function isImplementedBy(object, strength = ALL_VALID) {
	if (object === null || typeof object !== 'object') {
		throw new Error(`First argument is not an object: ${object}`);
	}

	const validatorKeys = getValidatorKeys(this[VALIDATORS]);
	const validate = (key) => {
		const validator = this[VALIDATORS][key];

		if (validator.length === 1) {
			// Pass the value (invokes getter) if the validator has one parameter.
			return validator(object[key]);
		} else {
			// Pass the object and key if the validator has any other number of parameters.
			return validator(object, key);
		}
	}
	
	if (strength === ALL_VALID) {
		// all keys are valid on the object
		return validatorKeys.every((key) => (
			validate(key)
		));
	} else if (strength === ALL) {
		// all keys are present or valid on the object
		return validatorKeys.every((key) => (
			exists(object, key) ||
			validate(key)
		));
	} else if (strength === ANY) {
		// at least one key is present or valid on the object
		return validatorKeys.some((key) => (
			exists(object, key) ||
			validate(key)
		));
	} else {
		throw new Error(`Strength argument must be ${ALL_VALID}, ${ALL}, or ${ANY}`);
	}
};
class VirtualInterface {
	constructor() {
		const validators = {};

		Object.defineProperties(this, {
			validators: {
				value: validators,
				writable:     false,
				enumerable:   false,
				configurable: true,
			},
			isImplementedBy: {
				value: isImplementedBy,
				writable:     false,
				enumerable:   false,
				configurable: true,
			},
		});

		// Special properties are also accessible from a symbol in-case their string key gets used as an interface key.
		define.hiddenConstant(this, {
			[VALIDATORS]: validators,
			[IS_IMPLEMENTED_BY]: isImplementedBy,
		});
	}
};


// EXPORT CLASSES
// Interface and SymbolInterface take a single validators parameter.
// This validators object should have keys as the interface property names and values as the validator functions for those interface properties.
// If a validator has 1 parameter, it will be passed a (value) argument, the evaluation of object[key].
// If a validator has 2 (or any other number of parameters), it will be passed the (object, key) arguments.
//G Use a validator with 2 parameters when the getter for object[key] should not be invoked during isImplementedBy().

//! Be aware that default and rest parameters are not counted. 
//G Manually re-define the validator.length property if a specific behavior is desired.
//! The validator.length property will be set to non-configurable when it is passed in.

export class Interface extends VirtualInterface {
	// Interface accepts both named and symbol keys. 
	// The same keys must be used for implementations.
	constructor(validators) {
		super(validators);

		for (const key of getValidatorKeys(validators)) {
			const validator = validators[key];

			validateValidator(validator, key);

			// Freeze the length property so that it can be relied upon to determine if the [value] or [object, key] parameters should be passed.
			Object.defineProperty(validator, 'length', {
				value: validator.length,
				writable: false,
				enumerable: false,
				configurable: false,
			});

			// Store validators on instance.
			define.constant(this[VALIDATORS], {[key]: validator});
		}

		freezeSpecialProperties(this);
	}
};
export class SymbolInterface extends VirtualInterface {
	// SymbolInterface creates symbols for ALL interface keys.
	// Implementations must use the symbols as the property keys.
	// This prevents name collision on implementations.
	constructor(validators) {
		super(validators);

		for (const key of getValidatorKeys(validators)) {
			const validator = validators[key];

			validateValidator(validator, key);

			Object.defineProperty(validator, 'length', {
				value: validator.length,
				writable: false,
				enumerable: false,
				configurable: false,
			});

			// Create substitute symbol key.
			const symbol = Symbol(key);

			// Store symbol keys on instance under their original key so that they can be used for implementations: {[interface.key]: implementation}
			define.constant(this, {[key]: symbol});
			
			// Store validators on instance.
			define.constant(this[VALIDATORS], {[symbol]: validator});
		}

		freezeSpecialProperties(this);
	}
};