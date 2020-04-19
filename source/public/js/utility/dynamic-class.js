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
				this.constructor[iface.instanceTransfer](transfers, this);
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

//TODO should it be possible to change the class parent? it would effectively only allow changing it to a subclass (unless already defined layers should be redefined), or maybe augmentation in general is just a bad idea.

import define from './object/define.js';
import {forOwnKeysOf} from './object/keys-of.js';
import Rule from './validation/rule.js';
import {rules} from './validation/index.js';
import {Interface, SymbolInterface} from './validation/interface.js';

// VALIDATION
const customRules = {};
define.constant(customRules, {
	layers: new Rule({
		validator(value) {
			rules.array.validate(value);
	
			let currentExtends;
			for (const layer of value) {
				customRules.layer.validate(layer);
	
				// If layers define an extension class, they must be the same as or descend from all extension classes of higher layers.
				if (
					layer.extends !== undefined && 
					currentExtends !== undefined
				) {
					
					if (
						layer.extends === currentExtends || 
						currentExtends.isPrototypeOf(layer.extends)
					) {
						currentExtends = layer.extends;
					} else {
						//TODO write test
						throw new Error('Dynamic Class layer cannot extend a class that is not equal to or the descendant of a class extended by a higher layer.');
					}
				}
			}
		},
		caster(reference) {
			// Undefined defaults to empty array.
			if (reference.value === undefined) reference.value = [];
			// Cast all items in array to layers.
			if (reference.value instanceof Array) {

				reference.value = reference.value.map((layer) => {
					return customRules.layer.validateCast(layer)[0];
				});
			}
			// Else cannot cast non-undefined, non-arrays.
		},
	}),
	layer: new Interface({
		//R Wrap the test functions to ensure that they doesn't get modified.
		extends:   (value) => customRules.extends.validate(value),
		intercept: (value) => customRules.intercept.test(value),
		instance:  (value) => customRules.instance.test(value),
		prototype: (value) => customRules.prototype.test(value),
		static:    (value) => customRules.static.test(value),
	}, {
		caster(reference) {
			// Undefined defaults to empty object.
			if (reference.value === undefined) reference.value = {};
			// Set defaults for undefined properties.
			if (rules.object.test(reference.value)) {
				const {
					extends: e,
	
					//G Any changes to 'this' inside intercept() cannot impact the true instance.
					intercept = (...args) => ([...args]),
					instance  = () => ({}),
					prototype = () => ({}),
					static: s = () => ({}),
	
					//R Passing an existing class is not supported because it won't aid augmentation and static properties on the class would interfere with the part defaults.
					//R Object literals for the prototype and static options are not supported because it would allow mutation of the part functions. It's also more consistent to require all parts to be functions.

					// Ensure other //! enumerable properties are preserved.
					...rest
				} = reference.value;
	
				// Replace with new object.
				reference.value = {
					extends: e,
					intercept,
					instance,
					prototype,
					static: s,
					...rest,
				};
			}
			// Else, not possible to cast non-undefined, non-object to layer.
		},
	}),
	name: new Rule({
		validator(value) {
			if (!rules.string.test(value)) {
				throw new Error(`'name' option must be a string, not a ${typeof value}`);
			}
		},
	}),

	//! These must use the same keys that are expected on a layer object.
	extends: new Rule({
		validator(value) {
			// Must be undefined or a constructor.
			if (!(value === undefined || rules.constructor.test(value))) {
				throw new Error(`'extends' option must be undefined or a constructor, not a ${typeof value}`);
			}
		},
	}),
	intercept: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'intercept' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	instance: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'instance' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	prototype: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'prototype' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	static: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'static' option must be a function, not a ${typeof value}`);
			}
		},
	}),

	instanceTransfer: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'instanceTransfer' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	prototypeTransfer: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'prototypeTransfer' option must be a function, not a ${typeof value}`);
			}
		},
	}),
	staticTransfer: new Rule({
		validator(value) {
			if (!rules.func.test(value)) {
				throw new Error(`'staticTransfer' option must be a function, not a ${typeof value}`);
			}
		},
	}),
});

// UTILITY FUNCTIONS
function processArguments(arg0 = '', ...args) {
	let name;
	let layers;

	if (rules.string.test(arg0)) {
		// If first argument is a string, consider it the name.
		name = arg0;
		layers = [...args];
	} else {
		// Else consider it a layer.
		name = ''; // Native function and class' 'name' property defaults to an empty string.
		layers = [arg0, ...args];
	}

	return {
		name: customRules.name.validate(name)[0],
		layers: customRules.layers.validateCast(layers)[0],
	};
};
function getParent(layers) {
	// Returns the last defined 'extends' property.
	for (let i = layers.length - 1; i >= 0; i--) {
		const Parent = layers[i].extends;
		if (Parent !== undefined) return Parent;
	}
	return undefined;
};


// INTERFACE
const dynamicClass = new SymbolInterface({
	layers: (value) => customRules.layers.test(value),
});

// FACTORIES
// Stored directly on the dynamicClass interface for ease of access.
define.constant(dynamicClass, {
	baseCreate(...args) {
		const {name, layers} = processArguments(...args);
		const Parent = getParent(layers);
		const isChild = Parent !== undefined;

		// Freeze the layers so that they cannot be further modified.
		//G If augmentation is desired it should be done non-destructively by adding to the layers array.
		for (const layer of layers) {
			Object.freeze(layer);
		}

		// DEFINITION
		//R class syntax was necessary because it doesn't seem possible to replicate the non-callable nature of classes without using a Proxy.
		//R This ensures that no undiscovered differences slip by.
		//R Definition still had to be duplicated because optional extension and super calls don't seem possible.
		let Class;
		if (isChild) {
			Class = {[name]: class extends Parent {
				constructor(...args) {
					const layers = Class[dynamicClass.keys.layers];

					// INTERCEPT
					let interceptedArgs = args;
					// Iterate over layer.intercept in reverse order.
					for (let i = layers.length - 1; i > 0; i--) {
						// Call with null as this to throw on any object-like operations on this.
						// Update interceptedArgs with each call so they can be fed into each other.
						interceptedArgs = layers[i].intercept.call(null, ...interceptedArgs);
					}

					super(...interceptedArgs);

					// INSTANCE
					for (const layer of layers) {
						layer.instance.call(this, ...interceptedArgs);
					}
				}
			}}[name];
		} else {
			Class = {[name]: class {
				constructor(...args) {
					const layers = Class[dynamicClass.keys.layers];

					// INTERCEPT
					let interceptedArgs = args;
					// Iterate over layer.intercept in reverse order.
					for (let i = layers.length - 1; i > 0; i--) {
						// Call with null as this to throw on any object-like operations on this.
						// Update interceptedArgs with each call so they can be fed into each other.
						interceptedArgs = layers[i].intercept.call(null, ...interceptedArgs);
					}

					// INSTANCE
					for (const layer of layers) {
						layer.instance.call(this, ...interceptedArgs);
					}
				}
			}}[name];
		}

		// STORE PARTS
		//R The reason class parts are stored on the class then referenced directly instead of with a closure is to make augmentation easier. Augmenting with closures only was turning out to be a hassle and complicated how the 'augmentation' tree would be preserved. Mutating the class parts directly is much easier to reason about. This way the constructor parts can be modified while also keeping the reference to the same class.
		define.hiddenVariable(Class, {
			[dynamicClass.keys.layers]: layers,
		});

		/* //G//!
			The 'duper' parameter should replace uses of 'super' in methods.
			Unlike 'super', 'duper' can also be used on regular functions.

			Because 'duper' is a closure, it is a valid replacement for 'super' because they both are not dynamic. 
			The object that they reference does not change even if the method assigned on a different object.

			If a dynamic behavior is desired, use Object.getPrototypeOf(Object.getPrototypeOf(this)); instead.
		*/
		//TODO consider not putting duper in an options container, I don't believe there should be any more arguments
		for (const layer of layers) {
			// PROTOTYPE
			layer.prototype.call(Class.prototype, {duper: Object.getPrototypeOf(Class.prototype)});
			// STATIC
			layer.static.call(Class, {duper: Object.getPrototypeOf(Class)});
		}
		
		return Class;
	},
	/* //R
		The augmentation function exists for two main reasons:
		It brings any closure setup back inside to the single function call.
		It removes the risk of implementing the augmentation wrong (say by forgetting to use a closure and instead referencing the class that is being mutated, this would cause a recursive function).

		//! If a layers' intercept function discards arguments, layers above it won't be able to recover them.
		//G The safest way is to always return the same signature.
	*/
	baseAugment(Class, ...args) {
		const currentParent = Object.getPrototypeOf(Class);

		const [newLayers] = customRules.layers.validateCast(args);
		const newLayersParent = getParent(newLayers);

		// Ensure new layers do not extend a different class.
		if (!(newLayersParent === undefined || newLayersParent === currentParent)) {
			throw new Error('Cannot augment class to extend another class.')
		}

		// New prototype and static parts must be called immediately, as they are only called once when the class is created.
		//! There is a chance that the class may have been modified between creation and augmentation, avoid doing this as it could create inconsistencies when augmenting.
		for (const newLayer of newLayers) {
			// PROTOTYPE
			newLayer.prototype.call(Class.prototype, {duper: Object.getPrototypeOf(Class.prototype)});
			// STATIC
			newLayer.static.call(Class, {duper: Object.getPrototypeOf(Class)});
		}

		Class[dynamicClass.keys.layers].push(...newLayers);

		return Class;
	},
});

// SHORT-HAND WRAPPERS
function wrapParts(layers, keyWrapperPairs) {
	const [newLayers] = customRules.layers.validateCast(layers);

	return newLayers.map((layer) => {
		// Clone the layer to avoid mutation.
		const newLayer = {...layer};

		for (const [key, wrapper] of keyWrapperPairs) {
			// Create a closure for the layer part.
			const part = newLayer[key];

			// Validate layer part and wrapper.
			customRules[key].validate(part);
			rules.func.validate(wrapper);

			// Replace the part.
			newLayer[key] = function (...args) {
				return wrapper.call(this, part, ...args);
			};
		}

		// Replace the layer.
		return newLayer;
	});
};

function baseVanillaShorthandWrapper(part, enumerableCondition, ...args) {
	const transfers = part.call(this, ...args) ?? {};

	forOwnKeysOf(transfers, (transfers, key) => {
		const descriptor = Object.getOwnPropertyDescriptor(transfers, key);

		/* force descriptors
			writable:     true (data descriptors) - fresh assignment
			configurable: true                    - fresh assignment
			enumerable:   conditional (
				instance value:     enumerable    - fresh assignment, 
														[[Define]] semantics of the class fields proposal
				instance function:  enumerable    ~ object literal declaration (both functions and methods),
														same as instance value
				instance accessor:  enumerable    ~ object literal declaration
														same as instance value

				prototype value:    nonEnumerable ~ same as method and accessor
				prototype function: nonEnumerable - class method
				prototype accessor: nonEnumerable - class accessor

				static value:       enumerable    - static class field of the class fields proposal
				static function:    nonEnumerable - static class method
				static accessor:    nonEnumerable - static accessor
			)
		*/
		if (descriptor.writable === false) descriptor.writable = true;
		descriptor.configurable = true;
		descriptor.enumerable = enumerableCondition(descriptor);

		Object.defineProperty(this, key, descriptor);
	});
};

function instanceVanillaShorthandWrapper(part, ...args) {
	return baseVanillaShorthandWrapper.call(
		this,
		part,
		() => true,
		...args
	);
};
function prototypeVanillaShorthandWrapper(part, ...args) {
	return baseVanillaShorthandWrapper.call(
		this,
		part,
		() => false,
		...args
	);
};
function staticVanillaShorthandWrapper(part, ...args) {
	return baseVanillaShorthandWrapper.call(
		this,
		part,
		(descriptor) => (descriptor.writable !== undefined && typeof descriptor.value !== 'function'),
		...args
	);
};

function applyVanillaShorthandWrappers(layer) {
	return wrapParts(layer, [
		['instance',  instanceVanillaShorthandWrapper], 
		['prototype', prototypeVanillaShorthandWrapper],
		['static',    staticVanillaShorthandWrapper], 
	]);
};

// SHORT-HAND FACTORIES
define.constant(dynamicClass, {
	/* Enables the use of shorthand return objects for layer parts.
		//R These functions use 'vanilla' shorthands, which try to stay as close to the native class behavior as possible. This is so that converting between vanilla classes and dynamic classes is as easy as possible.
		//G If a different set of shorthands are desired, create new functions that mutate the layers array similar to the applyVanillaShorthandWrappers function.
	*/
	create(...args) {
		const {name, layers} = processArguments(...args);
		const wrappedLayers = applyVanillaShorthandWrappers(layers);
		return dynamicClass.baseCreate(name, ...wrappedLayers);
	},
	augment(Class, ...layers) {
		const wrappedLayers = applyVanillaShorthandWrappers(layers);
		return dynamicClass.baseAugment(Class, ...wrappedLayers);
	},
});

export default dynamicClass;
