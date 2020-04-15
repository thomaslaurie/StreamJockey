import define         from '../object/define.js';
import {forOwnKeysOf} from '../object/keys-of.js';
import flexTest       from './flex-test.js';
import Rule           from './rule.js';
import * as rules     from './rules/index.js';

class VirtualInterface extends Rule {
	constructor(packs, options = {}) {
		// Throw if a validator option is passed.
		if ('validator' in options) {
			throw new Error('Interface options cannot include a validator, as it will be overwritten with a generated validator for interfaces.');
		}

		const keys  = {};
		const tests = {};

		for (const [key, subKey, test] of packs) {
			rules.func.validate(test);

			// Store subKeys on instance under their original key so that they can be used for implementations: {[interface.keys.<key>]: implementation}
			keys[key] = subKey;

			// Freeze the test length property so that it can be relied upon to determine if the [value] or [object, key] parameters should be passed.
			Object.defineProperty(test, 'length', {
				value: test.length,
				writable:     false,
				enumerable:   false,
				configurable: false,
			});

			// Store tests on instance, also under their original key.
			// Convert tests to use two arguments.
			//R Converting the tests here preserves the benefit of being able to pass single-argument value tests while also knowing that the stored tests always take two arguments.
			tests[key] = (o, k) => {
				return flexTest(test, o, k);
			};
		}

		Object.freeze(keys);
		Object.freeze(tests);

		// Create an pass validator to Rule constructor.
		super({
			// Pass other rule options to Rule.
			...options,
			// Use a custom validator for interfaces.
			validator(object) {
				rules.object.validate(object);
	
				forOwnKeysOf(this.tests, (tests, key) => {
					const test = this.tests[key];
					const subKey = this.keys[key];
	
					if (!test(object, subKey)) {
						throw new Error(`Object does not fully implement interface. Object: ${JSON.stringify(object)}, Key: ${key}, SubKey: ${subKey}`);
					};
				});
				
				/* //OLD
					//R Unnecessarily complicated for a feature that can probably just be permanently set to 'validate'.
					if (precision === 'validate') {
						// Validate all keys on object.
						return testKeys.every((key) => (
							validate(key)
						));
					} else if (precision === 'all') {
						// All keys are present (or valid).
						return testKeys.every((key) => (
							exists(object, key) ||
							validate(key)
						));
					} else if (precision === 'any') {
						// Any key is present (or valid).
						return testKeys.some((key) => (
							exists(object, key) ||
							validate(key)
						));
					} else {
						throw new Error(`Precision argument must be 'validate', 'all', or 'any'`);
					}
				*/
			},
		});

		define.constant(this, {
			keys,
			tests,
		});
	}

	// Minimal test to ensure interface property exists in object.
	static exists(object, key) {
		return key in object;
	};
};

/*
	Interface and SymbolInterface take a single tests object.

	This tests object should have keys as the interface property names and values as the validator functions for those interface properties.

	Tests have two signatures: (value) and (object, key). 
	When they are stored on the interface.tests object, both signatures will be wrapped in a function with a (object, key) signature.
	
	//G Use tests with the (object, key) signature when the getter for object[key] should not be invoked during validation of the interface.
	//! Be aware that default and rest parameters are not counted. 
	//G Manually re-define the validator.length property if a specific behavior is desired.
	//! The validator.length property will be set to non-configurable when it is passed in.

*/
export class Interface extends VirtualInterface {
	// Interface accepts both named and symbol keys. 
	// The same keys must be used for implementations.
	constructor(properties, options) {
		rules.object.validate(properties);

		const packs = [];
		forOwnKeysOf(properties, (properties, key) => {
			const subKey = key;
			const test = properties[key];
			packs.push([key, subKey, test]);
		});

		super(packs, options);
	}
};

export class SymbolInterface extends VirtualInterface {
	// SymbolInterface creates substitute symbols for ALL interface keys.
	// Implementations must use the substituted symbols as the property keys.
	// This prevents name collision on implementations.
	constructor(properties, options) {
		rules.object.validate(properties);

		const packs = [];
		forOwnKeysOf(properties, (properties, key) => {
			const subKey = Symbol(key); // Create a symbol subKey instead.
			const test = properties[key];
			packs.push([key, subKey, test]);
		});

		super(packs, options);
	}
};
