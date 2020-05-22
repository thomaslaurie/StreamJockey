/* //! Duplicated functionality avoid circular dependencies:
	keys-of.js,
	../validation/rules/objects/object.js,
	../validation/rules/functions.js,
*/

const ownKeys = function (object) {
	//! Duplicated from keys-of.js
	return [
		...Object.getOwnPropertyNames(object),
		...Object.getOwnPropertySymbols(object),
	];
};

//C define is a container for less verbose versions of Object.defineProperty()
//G if modifications are required, write a different define function
/* //R
	Initially thought it would be useful to have configurable (loose) constants and non-configurable variables. However:

	{writable: true, configurable: false} (permanent variable)
	These don't function as desired, because even when configurable is set to false, writable can be changed from true to false.
	//L https://stackoverflow.com/questions/52892105/why-configurablefalse-allows-to-change-writable-flag-but-doesnt-for-enumerable

	{writable: false, configurable: true} (loose constant)
	These don't really have a use-case and only existed to form a clean pair with permanent variables, and therefore have also been excluded.
*/

export default {
	// Guaranteed to be constant.
	constant(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     false,
				enumerable:   true,
				configurable: false,
			});
		}
		return target;
	},
	// Same as object property assignment. //! Can be set to {writable: false}
	property(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     true,
				enumerable:   true,
				configurable: true,
			});
		}
		return target;
	},
	// Guaranteed to be variable. //! Has an accessor-descriptor.
	variable(target, properties) { 
		for (const key of ownKeys(properties)) {
			let closureValue = properties[key];
			Object.defineProperty(target, key, {
				get() { return closureValue; },
				set(value) { closureValue = value; },
				enumerable:   true,
				configurable: false,
			});
		}
	},

	// Non-enumerable versions.
	hiddenConstant(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     false,
				enumerable:   false,
				configurable: false,
			});
		}
		return target;
	},
	hiddenProperty(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     true,
				enumerable:   false,
				configurable: true,
			});
		}
		return target;
	},
	hiddenVariable(target, properties) {
		for (const key of ownKeys(properties)) {
			let closureValue = properties[key];
			Object.defineProperty(target, key, {
				get() { return closureValue; },
				set(value) { closureValue = value; },
				enumerable:   false,
				configurable: false,
			});
		}
	},

	getter(target, properties) {
		for (const key of ownKeys(properties)) {
			// enforce getter, strip setter
			const {get} = Object.getOwnPropertyDescriptor(properties, key);
			if (typeof get !== 'function') throw new Error('getter property is missing a getter function');

			Object.defineProperty(target, key, {
				get,
				enumerable:   true,
				configurable: false,
			});
		}
		return target;
	},
	setter(target, properties) {
		for (const key of ownKeys(properties)) {
			// enforce setter, strip getter
			const {set} = Object.getOwnPropertyDescriptor(properties, key);
			if (typeof set !== 'function') throw new Error('setter property is missing a setter function');

			Object.defineProperty(target, key, {
				set,
				enumerable:   true,
				configurable: false,
			});
		}
		return target;
	},
	accessor(target, properties) {
		for (const key of ownKeys(properties)) {
			// enforce getter and setter
			const {get, set} = Object.getOwnPropertyDescriptor(properties, key);
			const noGetter = typeof get !== 'function';
			const noSetter = typeof set !== 'function';
			if (noGetter || noSetter) {
				throw new Error(`accessor property ${key} is missing a ${noGetter ? 'getter' : ''} ${noGetter && noSetter ? 'and' : ''} ${noSetter ? 'setter' : ''} function`);
			}

			Object.defineProperty(target, key, {
				get,
				set,
				enumerable:   true,
				configurable: false,
			});
		}
		return target;
	},

	identity(target, properties) {
		for(const key of ownKeys(properties)) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(properties, key));
		}
		return target;
	},

	validatedVariable(target, properties) {
		//? It doesn't seem possible to modify this variable's descriptor to writable: false, because its not a data property. Wouldn't this make it even more variable-like than a variable it self? Maybe consider this approach for a 'guaranteed variable'? Then consider renaming define.variable to define.property.

		for (const key of ownKeys(properties)) {
			const config = properties[key];
			//! Duplicated from ../validation/rules/objects/object.js
			if (config === null || !(typeof config === 'object' || typeof config === 'function')) {
				throw new Error('Config is not an object.');
			}
			const validator = config.validator;
			//! Duplicated from ../validation/rules/functions.js
			if (typeof validator !== 'function') {
				throw new Error('Validator is not a function.');
			}

			// Create a closure value for the accessor.
			let closureValue = config.value;

			// Validate the initial value.
			//R Without the setter because these functions use 'define' semantics.
			validator(closureValue);

			Object.defineProperty(target, key, {
				get() {
					return closureValue;
				},
				set(value) {
					validator(value);
					closureValue = value;
				},
				enumerable: true,
				configurable: false,
			});
		}
	},
};