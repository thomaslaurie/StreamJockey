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

// Define is a container for less verbose versions of Object.defineProperty()
//G //! If using in Typescript classes, make sure to use the Definite Assignment Assertions to force Typescript to recognize the type as defined.
//G If modifications are required, write a different define function
/* //R
	Initially thought it would be useful to have configurable (loose) constants and non-configurable variables. However:

	{writable: true, configurable: false} (permanent variable)
	These don't function as desired, because even when configurable is set to false, writable can be changed from true to false.
	//L https://stackoverflow.com/questions/52892105/why-configurablefalse-allows-to-change-writable-flag-but-doesnt-for-enumerable

	{writable: false, configurable: true} (loose constant)
	These don't really have a use-case and only existed to form a clean pair with permanent variables, and therefore have also been excluded.
*/

export default {
	//G Same as object property assignment.
	//! Can be re-configured.
	writable(target, properties) {
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
	//G Intended for properties that will soon be re-defined as constants.
	//! Can be re-configured.
	nonWritable(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     false,
				enumerable:   true,
				configurable: true,
			});
		}
		return target;
	},
	// Guaranteed to be variable.
	//! Has an accessor-descriptor.
	//! Will cause Vue's (at least version 2) reactivity to break if used in a place where a normal property is expected.
	//R A data descriptor with {writable: true, configurable: false} is not used here because the ECMAScript standard still allows writable to be set to false, despite configurable being false.
	variable(target, properties) {
		for (const key of ownKeys(properties)) {
			let closureValue = properties[key];
			Object.defineProperty(target, key, {
				get() { return closureValue },
				set(value) { closureValue = value },
				enumerable:   true,
				configurable: false,
			});
		}
		return target;
	},
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

	// Non-enumerable versions.
	hiddenWritable(target, properties) {
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
	hiddenNonWritable(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     false,
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
				get() { return closureValue },
				set(value) { closureValue = value },
				enumerable:   false,
				configurable: false,
			});
		}
		return target;
	},
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
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(properties, key));
		}
		return target;
	},

	validatedVariable(target, properties) {
		//? It doesn't seem possible to modify this variable's descriptor to writable: false, because its not a data property. Wouldn't this make it even more variable-like than a variable it self? Maybe consider this approach for a 'guaranteed variable'? Then consider renaming define.variable to define.property.
		//TODO Change 'value' to 'initialValue' as that is more clear.

		for (const key of ownKeys(properties)) {
			const config = properties[key];
			//! Duplicated from ../validation/rules/objects/object.js
			if (config === null || !(typeof config === 'object' || typeof config === 'function')) {
				throw new Error('Config is not an object.');
			}
			const {validator} = config;
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
		return target;
	},

	//G Intended to be used in places where 'constant' should be used but cannot because of issues with Vue proxies. Works the same as 'nonWritable'.
	//R Defining non-configurable properties causes issues with Vue proxies. Not sure if this is a bug or as designed. Using this temporary property definition to separate areas that have this issue.
	vueConstant(target, properties) {
		for (const key of ownKeys(properties)) {
			Object.defineProperty(target, key, {
				value: properties[key],
				writable:     false,
				enumerable:   true,
				configurable: true,
			});
		}
		return target;
	},
};
