// forKeysOf calls a function for all keys of an object that match the specified attributes.
// getKeysOf returns an array of  all keys of an object that match the specified attributes and filter.
// Attributes default to own, named, enumerable keys. This is the same as Object.keys().

//! Duplicated code in define.js to remove a circular dependency.

import {
	object as objectRule, 
	func as functionRule,
} from '../validation/common-rules.js';
import flexValidate from '../validation/flex-validate.js';

export function forKeysOf(object, optionsOrCallback = {}) {
	// OPTIONS / VALIDATION
	const options = (
		typeof optionsOrCallback === 'function' 
			? {callback: optionsOrCallback}
			: optionsOrCallback
	);

	objectRule.validate(object);
	objectRule.validate(options);
	
	const {
		own = true,
		inherited = false,
		
		named = true,
		symbol = false,
		
		enumerable = true,
		nonEnumerable = false,

		callback = () => {},
	} = options;

	functionRule.validate(callback);


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
		if (named)  targetKeys.push(...Object.getOwnPropertyNames  (target));
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
};

export function getKeysOf(object, optionsOrFilter = {}) {
	// OPTIONS / VALIDATION
	const options = (
		typeof optionsOrFilter === 'function' 
			? {filter: optionsOrFilter}
			: optionsOrFilter
	);

	objectRule.validate(object);
	objectRule.validate(options);
	
	const {
		filter = (object, key) => true, 
		...rest
	} = options;

	functionRule.validate(filter);


	// ARRAY
	const keys = [];

	// undefined & null return empty array
	if (object == null) return keys;

	// FILTER
	forKeysOf(object, {
		callback(object, key) {
			if (flexValidate(filter, object, key)) {
				keys.push(key);
			}
		},
		...rest,
	});

	return keys;
};