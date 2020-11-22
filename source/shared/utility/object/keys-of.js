// forKeysOf calls a function for all keys of an object that match the specified attributes.
// getKeysOf returns an array of  all keys of an object that match the specified attributes and filter.
// Attributes default to own, named, enumerable keys. This is the same as Object.keys().

//R These functions have no short-circuiting and probably can be optimized, but objects shouldn't be having excessively large amounts of keys anyways.
//G To check if a key is in an object with a filter. Use getKeysOf(...args).includes(key);
//! Duplicated code in define.js to remove a circular dependency.

import flexTest from '../validation/flex-test.js';
// Importing directly instead of from ../validation/rules/index.js to avoid circular reference.
import object from '../validation/rules/objects/object.js';
import {func}   from '../validation/rules/functions.js';
const rules = {object, func};

// Configurations
const simple = {
	// Equivalent to Object.keys
	own:           true,
	named:         true,
	enumerable:    true,

	inherited:     false,
	symbol:        false,
	nonEnumerable: false,
};
const own = {
	own:           true,
	named:         true,
	symbol:        true,
	enumerable:    true,
	nonEnumerable: true,

	inherited:     false,
};

export function forKeysOf(object, optionsOrCallback = {}) {
	// OPTIONS / VALIDATION
	const options = (
		typeof optionsOrCallback === 'function'
			? {callback: optionsOrCallback}
			: optionsOrCallback
	);

	rules.object.validate(object);
	rules.object.validate(options);

	const {
		own           = simple.own,
		inherited     = simple.inherited,
		named         = simple.named,
		symbol        = simple.symbol,
		enumerable    = simple.enumerable,
		nonEnumerable = simple.nonEnumerable,

		callback = () => {},
	} = options;

	rules.func.validate(callback);


	// OWN / INHERITED
	const chain = [];
	if (own) chain.push(object);
	if (inherited) {
		let target = Object.getPrototypeOf(object);
		while (target !== null) {
			chain.push(target);
			target = Object.getPrototypeOf(target);
		}
	}

	const visitedKeys = [];
	for (const target of chain) {
		const targetKeys = [];

		// NAMED / SYMBOL
		if (named)  targetKeys.push(...Object.getOwnPropertyNames(target));
		if (symbol) targetKeys.push(...Object.getOwnPropertySymbols(target));

		for (const targetKey of targetKeys) {
			// ENUMERABLE / NON-ENUMERABLE
			const isEnumerable = Object.prototype.propertyIsEnumerable.call(target, targetKey);
			const keyMatchesAttributes = (enumerable && isEnumerable) || (nonEnumerable && !isEnumerable);

			// UNIQUE
			if (keyMatchesAttributes && !visitedKeys.includes(targetKey)) {
				// Don't iterate over the same key more than once.
				visitedKeys.push(targetKey);

				// Execute callback.
				callback(target, targetKey);
			}
		}
	}
}
export function getKeysOf(object, optionsOrFilter = {}) {
	// OPTIONS / VALIDATION
	const options = (
		typeof optionsOrFilter === 'function'
			? {filter: optionsOrFilter}
			: optionsOrFilter
	);

	rules.object.validate(object);
	rules.object.validate(options);

	const {
		filter = (object, key) => true,
		...rest
	} = options;

	rules.func.validate(filter);


	// ARRAY
	const keys = [];

	// undefined & null return empty array
	if (object == null) return keys;

	// FILTER
	forKeysOf(object, {
		callback(object, key) {
			if (flexTest(filter, object, key)) {
				keys.push(key);
			}
		},
		...rest,
	});

	return keys;
}

// Same as the default, but explicit.
export const forSimpleKeysOf = (object, callback) => forKeysOf(object, {...simple, callback});
export const getSimpleKeysOf = (object, filter)   => getKeysOf(object, {...simple, filter});

export const forOwnKeysOf = (object, callback) => forKeysOf(object, {...own, callback});
export const getOwnKeysOf = (object, filter)   => getKeysOf(object, {...own, filter});
