//G Constructor size can be reduced if the class is simple enough by simply passing the entire options parameter to the intercept/instance parts and letting them do the destructuring. (Though this could duplicate validation, if two parts use the same option).
//R Using a baked-in .call() because its shorter and it reduces the risk of using the part without a target.
//R Decided against shorthands because the default syntax can just be used if a less-explicit/quicker definition is desired.
//R Augmenting a class with prototype and static parts does not count as a 'side-effect' as described in this explanation: //L https://stackoverflow.com/a/49776306

import define from './object/define.js';
import {SymbolInterface} from './validation/interface.js';
import {rules} from './validation/index.js';

const wrappedPartInterface = new SymbolInterface({
	marker: SymbolInterface.exists,
});

// Marks the passed function as wrapped.
function mark(func) {
	define.constant(func, {
		[wrappedPartInterface.keys.marker]: true,
	});
	return func;
}

// Validate, wrap, and marks the passed part.
function wrapIntercept(interceptor) {
	rules.func.validate(interceptor);
	return mark((...args) => {
		return interceptor.call(null, ...args);
	});
}
function wrapInstance(initializer) {
	rules.func.validate(initializer);
	return mark((instance, ...args) => {
		rules.object.validate(instance);
		return initializer.call(instance, ...args);
	});
}
function wrapPrototype(initializer) {
	rules.func.validate(initializer);
	return mark((Class) => {
		rules.object.validate(Class?.prototype);
		return initializer.call(Class.prototype);
	});
}
function wrapStatic(initializer) {
	rules.func.validate(initializer);
	return mark((Class) => {
		rules.object.validate(Class);
		return initializer.call(Class);
	});
}

export default class ClassParts {
	constructor({
		intercept = () => {},
		instance  = () => {},
		prototype = () => {},
		static: s = () => {},
	} = {}) {
		// Wrapping & Validation
		const wrappedIntercept = wrappedPartInterface.test(intercept) ? intercept : wrapIntercept(intercept);
		const wrappedInstance  = wrappedPartInterface.test(instance)  ? instance  : wrapInstance(instance);
		const wrappedPrototype = wrappedPartInterface.test(prototype) ? prototype : wrapPrototype(prototype);
		const wrappedStatic    = wrappedPartInterface.test(s)         ? s         : wrapStatic(s);

		// Initialization
		define.constant(this, {
			intercept: wrappedIntercept,
			instance:  wrappedInstance,
			prototype: wrappedPrototype,
			static:    wrappedStatic,
		});
	}
}

// Immediately wraps and invokes the passed part.
//G Only useful for cases where a ClassParts instance has not been created.
//? Not sure if this is even really necessary.
//R Intercept and instance parts not included because they can be called directly from the constructor.
export function initPrototype(Class, initializer) {
	return wrapPrototype(initializer)(Class);
}
export function initStatic(Class, initializer) {
	return wrapStatic(initializer)(Class);
}

// Replacements for the 'super' keyword inside prototype and static methods.
//R Intercept and instance parts not included because super is different in the constructor and should be called separately from these parts.
//G //! Methods will have to be used with .call() because super methods' this will refer to the prototype.
//TODO This is a significant limitation.
export function getSuperPrototypeOf(Class) {
	return Object.getPrototypeOf(Class.prototype);
}
export function getSuperClassOf(Class) {
	return Object.getPrototypeOf(Class);
}

// EXAMPLE
/*
	import partsA from 'somewhere.js';
	import partsB from 'somewhereElse.js';

	class X {
		constructor(a, b, c) {
			partsB.intercept(a, c);
			const {x, y, z} = partsA.intercept(a, b, c);
			<some interception without parts>

			super(x, y);

			partsA.instance(this, z);
			partsB.instance(this, a, c);
			<some instance initialization without parts>
		}
	}

	partsA.prototype(X);
	partsB.prototype(X);
	initPrototype(X, () => {
		<some prototype initialization without parts>
	});

	partsA.static(X);
	partsB.static(X);
	initStatic(X, () => {
		<some static initialization without parts>
	});
*/
