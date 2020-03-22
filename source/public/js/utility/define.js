import getKeys from './get-keys.js';

const ownKeys = function (object) {
	return getKeys(object, {
		own: true,
		named: true,
		symbol: true,
		enumerable: true,
		nonEnumerable: true,

		inherited: false,
	});
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
	variable(target, properties) {
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
	hiddenVariable(target, properties) {
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
			Object.defineProperty(target, key, Object.getOwnPropertyKey(properties, key));
		}
		return target;
	},
};