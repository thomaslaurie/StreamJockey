//TODO How to prevent non-valid enum values from being referenced? If Enum.notInEnum is referenced, it resolves to undefined, which would equal all the other invalid enum key values.

import define      from './object/define.js';
import Rule        from './validation/rule.js';
import {getKeysOf} from './object/keys-of.js';
import keyify      from './keyify.js';

export default class Enum {
	constructor(...keys) {
		// Non-key values are keyified.
		// Symbol-keys stay intact.
		// Duplicate keys are squashed.
		for (const key of keys) {
			this[key] = Symbol();
		}

		Object.freeze(this);
	}
}

define.constant(Enum, {
	instanceRule: new Rule({
		validator(value) {
			if (!(value instanceof Enum)) {
				throw new Error(`Value is not an Enum.`);
			}
		},
	}),
	keyAttributes: {
		own:        true,
		named:      true,
		enumerable: true,

		inherited:     false,
		symbol:        false,
		nonEnumerable: false,
	},
	//G Useful for validating Enum values in internal code.
	hasValue(e, value) {
		this.instanceRule.validate(e);

		const enumKeys = getKeysOf(e, this.keyAttributes);

		return enumKeys.some(key => e[key] === value);
	},
	//G Useful for validating Enum keys from external data (JSON).
	//! Matching values in this method have no guarantee of originating from the enum. Ie. they can be fabricated.
	hasKey(e, value) {
		this.instanceRule.validate(e);

		const enumKeys = getKeysOf(e, this.keyAttributes);
		const key = keyify(value);

		return enumKeys.includes(key);
	},
	// Converts a unique enum value to its key.
	//G Useful for preparing an enum value for external data (JSON).
	//! Will return a symbol if the enum value was keyed with one.
	valueToKey(e, value) {
		this.instanceRule.validate(e);

		const enumKeys = getKeysOf(e, this.keyAttributes);
		const foundKey = enumKeys.find(key => e[key] === value);

		if (foundKey === undefined) {
			throw new Error('Enum does not contain the passed value.');
		}

		return foundKey;
	},
	getKeys(e) {
		this.instanceRule.validate(e);

		return getKeysOf(e, this.keyAttributes);
	},
});
