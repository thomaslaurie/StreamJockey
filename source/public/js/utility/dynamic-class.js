/* //R
	CLASS COMPOSITION (
		This module seem like it would work well with composition: 'class composition'.
		Use for shallow but present class structures.
	)

	CLASS V FUNCTION DIFFERENCES (
		//L https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420
		//L Native classes are actually different: see classtraphobic

		class             <---> function
		super(...args);   <---> Parent.call(this, ...args);

		if child:
		_                 <---> prototype of Class is Parent.
		_                 <---> Class           has a non-writable, non-enumerable, non-configurable prototype property that is an object with its prototype as Parent.prototype.
		_                 <---> Class.prototype has a non-writable, non-enumerable, non-configurable constructor property that points to Class.
		if not child:
		_                 <---> Class.prototype must have it's writable attribute changed from true to false.

		not reproducible:
		this before super <---> All interactions except direct references to this can be trapped with a Proxy.
		Class() cannot be called directly <---> Cannot reproduce this behaviour without wrapping the Class itself in a proxy.

		FUNCTIONAL IMPLEMENTATION (
			const Class = {[name]: function (...args) {
				// INTERCEPT
				const interceptedArgs = this.constructor[iface.intercept].call(proxy, ...args);

				// EXTEND
				if (isChild) Parent.call(this, ...interceptedArgs);

				// INSTANCE
				const transfers = this.constructor[iface.instance].call(this, ...interceptedArgs);
				this.constructor[iface.transferToInstance](transfers, this);
			}}[name];

			if (isChild) {
				// Set prototype.
				Object.setPrototypeOf(Class, Parent);
				// Set Class.prototype to a new object that inherits from Parent.prototype and set writable, enumerable, configurable as false.
				define.hiddenConstant(Class, {prototype: Object.create(Parent.prototype)});
				// Give Class.prototype a constant constructor property.
				define.hiddenConstant(Class.prototype, {constructor: Class});
			} else {
				// Set Class.prototype to itself and set writable to false. function prototypes are writable but Class prototypes are not.
				define.hiddenConstant(Class, {prototype: Class.prototype});
			}
		)
	)

	//OLD INTERCEPT PROXY (
		Removed this from intercept.call(proxy, ...args); because Proxy cannot be as easily poly-filled as classes can.

		This is also more consistent: referencing this in any way will work, but not actually point to this. Instead of throwing an error in all cases except when it is directly referenced.

		const throwOnThisReference = function () {
			throw new ReferenceError(`Cannot use 'this' keyword in intercept.`);
		};
		const proxy = new Proxy({}, {
			// all possible traps
			getPrototypeOf:           throwOnThisReference,
			setPrototypeOf:           throwOnThisReference,
			isExtensible:             throwOnThisReference,
			preventExtensions:        throwOnThisReference,
			getOwnPropertyDescriptor: throwOnThisReference,
			defineProperty:           throwOnThisReference,
			has:                      throwOnThisReference,
			get:                      throwOnThisReference,
			set:                      throwOnThisReference,
			deleteProperty:           throwOnThisReference,
			ownKeys:                  throwOnThisReference,
			apply:                    throwOnThisReference,
			construct:                throwOnThisReference,
		});
	)
*/

import define from './object/define.js';
import {getKeysOf} from './object/keys-of.js';
import Rule from './validation/rule.js';
import {rules} from './validation/index.js';
import { SymbolInterface } from './interface.js';

// INTERFACE
const dynamicClass = new SymbolInterface({
	intercept: (value) => rules.func.test(value),
	instance:  (value) => rules.func.test(value),
	prototype: (value) => rules.func.test(value),
	static:    (value) => rules.func.test(value),
});

// VALIDATION
const customRules = {
	name: new Rule({
		validator(value) {
			if (!rules.string.test(value)) {
				throw new Error(`'name' option must be a string, not a ${typeof value}`);
			}
		},
	}),
	extends: new Rule({
		validator(value) {
			if (!rules.constructor.test(value)) {
				throw new Error(`'extends' option must be a constructor, not a ${typeof value}`);
			}
		},
	}),
	intercept: new Rule({
		validator(value) {
			if (!dynamicClass.validators[dynamicClass.intercept](value)) {
				throw new Error(`'intercept' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	instance: new Rule({
		validator(value) {
			if (!dynamicClass.validators[dynamicClass.instance](value)) {
				throw new Error(`'instance' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	prototype: new Rule({
		validator(value) {
			if (!dynamicClass.validators[dynamicClass.prototype](value)) {
				throw new Error(`'prototype' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	static: new Rule({
		validator(value) {
			if (!dynamicClass.validators[dynamicClass.static](value)) {
				throw new Error(`'static' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	transferToInstance: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'transferToInstance' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	transferToPrototype: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'transferToPrototype' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	transferToStatic: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'transferToStatic' option must be a function, not a ${typeof value}`);
			}
		},
	}),
};

// TRANSFER FUNCTIONS
const baseTransfer = (properties, target, enumerableCondition) => {
	//TODO replace with forKeysOf()
	for (const key of getKeysOf(properties, {
		own:           true,
		named:         true,
		symbol:        true,
		enumerable:    true,
		nonEnumerable: true,

		inherited:     false,
	})) {
		const descriptor = Object.getOwnPropertyDescriptor(properties, key);

		/* force descriptors
			writable:     true (for data descriptors),
			configurable: true,
			enumerable:   conditional (
				instance value     = enumerable    - [[Define]] semantics of the class fields proposal, same as assignment
				instance function  = enumerable    - ? deferred to value, same as assignment
				instance accessor  = enumerable    - ? deferred to value/function, same as object literal

				prototype value    = nonEnumerable - ? deferred to method/accessor
				prototype function = nonEnumerable - class method
				prototype accessor = nonEnumerable - class accessor

				static value       = enumerable    - static class field of the class fields proposal
				static function    = nonEnumerable - static class method
				static accessor    = nonEnumerable - static accessor
			)
		*/
		if (descriptor.writable === false) descriptor.writable = true;
		descriptor.configurable = true;
		descriptor.enumerable = enumerableCondition(descriptor);

		Object.defineProperty(target, key, descriptor);
	}
};
const defaultTransferToInstance  = (properties, target) => baseTransfer(properties, target, () => true);
const defaultTransferToPrototype = (properties, target) => baseTransfer(properties, target, () => false);
const defaultTransferToStatic    = (properties, target) => baseTransfer(properties, target, (descriptor) => {
	return (descriptor.writable !== undefined && typeof descriptor.value !== 'function');
});
const wrapParts = function (parts) {
	for (const [key, transferKey, defaultTransfer] of [
		['instance',  'transferToInstance',  defaultTransferToInstance],
		['prototype', 'transferToPrototype', defaultTransferToPrototype],
		['static',    'transferToStatic',    defaultTransferToStatic],
	]) {
		//C If a part is defined,
		if (parts[key] !== undefined) {
			if (parts[transferKey] === undefined) {
				parts[transferKey] = defaultTransfer;
			}

			//C validate it and it's transfer function,
			customRules[key]        .validate(parts[key]);
			customRules[transferKey].validate(parts[transferKey]);

			//C then wrap.
			const coreFunction = parts[key];
			const transferFunction = parts[transferKey];
			parts[key] = function (...args) {
				const transfers = coreFunction.call(this, ...args);
				transferFunction(transfers, this);
			};
		}
	}
};

// UTILITY
function joinFunctions(oldFunction, newFunction) {
	return function (...args) {
		oldFunction.call(this, ...args);
		newFunction.call(this, ...args);
	};
};

// FACTORY
define.constant(dynamicClass, {
	baseCreate({
		//C function and class default 'name' property is an empty string.
		name = '',
		extends: Parent,

		//G Any changes to 'this' inside intercept() cannot impact the true instance.
		intercept       = () => ([]),
		instance        = () => ({}),
		prototype       = () => ({}),
		static: $static = () => ({}),

		//R Passing an existing class is not supported because it won't aid augmentation and static properties on the class would interfere with the part defaults.
		//R Object literals for the prototype and static options are not supported because it would allow mutation of the part functions. It's also more consistent to require all parts to be functions.
	} = {}) {
		const isChild = Parent !== undefined;

		// VALIDATION
		customRules.name.validate(name);
		if (isChild) customRules.extends.validate(Parent);
		customRules.intercept.validate(intercept);
		customRules.instance .validate(instance);
		customRules.prototype.validate(prototype);
		customRules.static   .validate($static);

		// DEFINITION
		//R class syntax was necessary because it doesn't seem possible to replicate the non-callable nature of classes without using a Proxy.
		//R This ensures that no undiscovered differences slip by.
		//R Definition still had to be duplicated because optional extension and super calls don't seem possible.
		let Class;
		if (isChild) {
			Class = {[name]: class extends Parent {
				constructor(...args) {
					// INTERCEPT
					const interceptedArgs = Class[dynamicClass.intercept].call({}, ...args);

					super(...interceptedArgs);

					// INSTANCE
					Class[dynamicClass.instance].call(this, ...interceptedArgs);
				}
			}}[name];
		} else {
			Class = {[name]: class {
				constructor(...args) {
					// INTERCEPT
					const interceptedArgs = Class[dynamicClass.intercept].call({}, ...args);

					// INSTANCE
					Class[dynamicClass.instance].call(this, ...interceptedArgs);
				}
			}}[name];
		}

		// STORE PARTS
		//R The reason class parts are stored on the class then referenced directly instead of with a closure is to make augmentation easier. Augmenting with closures only was turning out to be a hassle and complicated how the 'augmentation' tree would be preserved. Mutating the class parts directly is much easier to reason about. This way the constructor parts can be modified while also keeping the reference to the same class.
		define.hiddenVariable(Class, {
			[dynamicClass.intercept]: intercept,
			[dynamicClass.instance]:  instance,
			[dynamicClass.prototype]: prototype,
			[dynamicClass.static]:    $static,
		});

		/* //G//!
			The 'duper' parameter should replace uses of 'super' in methods.
			Unlike 'super', 'duper' can also be used on regular functions.

			Because 'duper' is a closure, it is a valid replacement for 'super' because they both are not dynamic. 
			The object that they reference does not change even if the method assigned on a different object.

			If a dynamic behavior is desired, use Object.getPrototypeOf(Object.getPrototypeOf(this)); instead.
		*/
		//TODO consider not putting duper in an options container, I don't believe there should be any more arguments
		// PROTOTYPE
		Class[dynamicClass.prototype].call(Class.prototype, {duper: Object.getPrototypeOf(Class.prototype)});
		// STATIC
		Class[dynamicClass.static].call(Class, {duper: Object.getPrototypeOf(Class)});

		return Class;
	},
	create(parts = {}) {
		//G If custom transfer functions are desired, create a container object and spread it over the parts.
		wrapParts(parts);
		return dynamicClass.baseCreate(parts);
	},

	/* //R
		The augmentation function exists for two main reasons:
		It brings any closure setup back inside to the single function call.
		It removes the risk of implementing the augmentation wrong (say by forgetting to use a closure and instead referencing the class that is being mutated, this would cause a recursive function).
	*/
	baseAugment(Class, {
		intercept,
		instance,
		prototype,
		static: $static,
	} = {}) {
		if (intercept !== undefined) {
			customRules.intercept.validate(intercept);
			//C//! If the previous intercept function discarded arguments, it isn't possible to recover them in a subsequent intercept function.
			Class[dynamicClass.intercept] = joinFunctions(Class[dynamicClass.intercept], intercept);
		}
		if (instance  !== undefined) {
			customRules.instance.validate(instance);
			Class[dynamicClass.instance] = joinFunctions(Class[dynamicClass.instance], instance);
		}
		if (prototype !== undefined) {
			customRules.prototype.validate(prototype);
			Class[dynamicClass.prototype] = joinFunctions(Class[dynamicClass.prototype], prototype);
			//C New prototype and static parts must be called immediately, as they are only called once. They get stored on the class for reference.
			prototype.call(Class.prototype, {duper: Object.getPrototypeOf(Class.prototype)});
		}
		if ($static   !== undefined) {
			customRules.static.validate($static);
			Class[dynamicClass.static]    = joinFunctions(Class[dynamicClass.static],    $static);
			$static.call(Class, {duper: Object.getPrototypeOf(Class)})
		}
	},
	augment(Class, parts = {}) {
		wrapParts(parts);
		return dynamicClass.baseAugment(Class, parts);
	},
});

export default dynamicClass;
