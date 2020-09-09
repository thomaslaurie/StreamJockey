import test from 'ava';
import dynamicClass from './dynamic-class.js';
import deepCompare  from '../source/shared/utility/object/deep-compare.js';
import boolCatch    from '../source/shared/utility/bool-catch.js';

// LINKS
const ClassA = class ClassA {
};
const ClassB = class ClassB extends ClassA {
};
const DynamicA = dynamicClass.create('DynamicA', {
	prototype: () => ({
		test: Symbol(),
	}),
	static: () => ({
		test: Symbol(),
	}),
});
const DynamicB = dynamicClass.create('DynamicB', {
	extends: DynamicA,
	prototype: ({duper}) => ({
		getSuperTest() {
			return duper.test;
		},
	}),
	static: ({duper}) => ({
		getSuperTest() {
			return duper.test;
		},
	}),
});
const ClassBX = class ClassBX extends DynamicA {
	getSuperTest() {
		return super.test;
	}
	static getSuperTest() {
		return super.test;
	}
};
const DynamicBX = dynamicClass.create('DynamicBX', {
	extends: ClassA,
});

// ROOT LINKS
test('root prototype', (t) => {
	t.assert(Object.getPrototypeOf(ClassA) === Object.getPrototypeOf(DynamicA));
});
test('root.constructor', (t) => {
	t.assert(ClassA.constructor === DynamicA.constructor);
});
// ROOT.PROTOTYPE LINKS
test('root.prototype prototype', (t) => {
	t.assert(Object.getPrototypeOf(ClassA.prototype) === Object.getPrototypeOf(DynamicA.prototype));
});
test('root.prototype.prototype', (t) => {
	t.assert(ClassA.prototype.prototype === DynamicA.prototype.prototype);
});
test('root.prototype.constructor', (t) => {
	t.assert(DynamicA.prototype.constructor === DynamicA);
});

// ROOT.PROTOTYPE DESCRIPTOR
const ClassAProtoPDesc   = Object.getOwnPropertyDescriptor(ClassA,   'prototype');
const DynamicAProtoPDesc = Object.getOwnPropertyDescriptor(DynamicA, 'prototype');
test('root.prototype writable', (t) => {
	t.assert(ClassAProtoPDesc.writable     === DynamicAProtoPDesc.writable);
});
test('root.prototype enumerable', (t) => {
	t.assert(ClassAProtoPDesc.enumerable   === DynamicAProtoPDesc.enumerable);
});
test('root.prototype configurable', (t) => {
	t.assert(ClassAProtoPDesc.configurable === DynamicAProtoPDesc.configurable);
});

// ROOT.PROTOTYPE.CONSTRUCTOR DESCRIPTOR
const ClassAProtoPConstDesc   = Object.getOwnPropertyDescriptor(ClassA.prototype,  'constructor');
const DynamicAProtoPConstDesc = Object.getOwnPropertyDescriptor(DynamicA.prototype, 'constructor');
test('root.prototype.constructor writable', (t) => {
	t.assert(ClassAProtoPConstDesc.writable     === DynamicAProtoPConstDesc.writable);
});
test('root.prototype.constructor enumerable', (t) => {
	t.assert(ClassAProtoPConstDesc.enumerable   === DynamicAProtoPConstDesc.enumerable);
});
test('root.prototype.constructor configurable', (t) => {
	t.assert(ClassAProtoPConstDesc.configurable === DynamicAProtoPConstDesc.configurable);
});

// CHILD LINKS
test('child prototype', (t) => {
	t.is(Object.getPrototypeOf(ClassB), Object.getPrototypeOf(DynamicBX));
	t.is(Object.getPrototypeOf(ClassBX), Object.getPrototypeOf(DynamicB));
});
test('child.constructor', (t) => {
	t.assert(ClassB.constructor === DynamicB.constructor);
});
// CHILD.PROTOTYPE LINKS
test('child.prototype prototype', (t) => {
	t.assert(Object.getPrototypeOf(ClassB.prototype)  === Object.getPrototypeOf(DynamicBX.prototype));
	t.assert(Object.getPrototypeOf(ClassBX.prototype) === Object.getPrototypeOf(DynamicB.prototype));
});
test('child.prototype.prototype', (t) => {
	t.assert(ClassB.prototype.prototype === DynamicB.prototype.prototype);
});
test('child.prototype.constructor', (t) => {
	t.assert(DynamicB.prototype.constructor === DynamicB);
});

// CHILD.PROTOTYPE DESCRIPTOR
const ClassBProtoPDesc   = Object.getOwnPropertyDescriptor(ClassB,   'prototype');
const DynamicBProtoPDesc = Object.getOwnPropertyDescriptor(DynamicB, 'prototype');
test('child.prototype writable', (t) => {
	t.assert(ClassBProtoPDesc.writable     === DynamicBProtoPDesc.writable);
});
test('child.prototype enumerable', (t) => {
	t.assert(ClassBProtoPDesc.enumerable   === DynamicBProtoPDesc.enumerable);
});
test('child.prototype configurable', (t) => {
	t.assert(ClassBProtoPDesc.configurable === DynamicBProtoPDesc.configurable);
});

// CHILD.PROTOTYPE.CONSTRUCTOR.DESCRIPTOR
const ClassBProtoPConstDesc   = Object.getOwnPropertyDescriptor(ClassB.prototype,   'constructor');
const DynamicBProtoPConstDesc = Object.getOwnPropertyDescriptor(DynamicB.prototype, 'constructor');
test('child.prototype.constructor writable', (t) => {
	t.assert(ClassBProtoPConstDesc.writable     === DynamicBProtoPConstDesc.writable);
});
test('child.prototype.constructor enumerable', (t) => {
	t.assert(ClassBProtoPConstDesc.enumerable   === DynamicBProtoPConstDesc.enumerable);
});
test('child.prototype.constructor configurable', (t) => {
	t.assert(ClassBProtoPConstDesc.configurable === DynamicBProtoPConstDesc.configurable);
});

// SUPER INTERACTION
test('prototype duper works', (t) => {
	t.is((new DynamicB()).getSuperTest(), (new ClassBX()).getSuperTest());
});
test('static duper works', (t) => {
	t.is(DynamicB.getSuperTest(), ClassBX.getSuperTest());
});

// DIRECT & SHORTHAND ASSIGNMENT
const instanceValue = Symbol();
const instanceFunc = function () {};
const instanceAccessorResult = Symbol();

const protoValue = Symbol();
const protoFuncResult = Symbol();
const protoAccessorResult = Symbol();

const staticValue = Symbol();
const staticFuncResult = Symbol();
const staticAccessorResult = Symbol();

const ClassD = class ClassD {
	constructor() {
		this.instanceValue = instanceValue;
		this.instanceFunc = instanceFunc;
		Object.defineProperty(this, 'instanceAccessor', {get: () => instanceAccessorResult});
	}
	protoFunc() {
		return protoFuncResult;
	}
	get protoAccessor() {
		return protoAccessorResult;
	}
	static staticFunc() {
		return staticFuncResult;
	}
	static get staticAccessor() {
		return staticAccessorResult;
	}
};
ClassD.prototype.protoValue = protoValue;
ClassD.staticValue = staticValue;

const DynamicD = dynamicClass.create('DynamicD', {
	instance() {
		this.instanceValue = instanceValue;
		this.instanceFunc = instanceFunc;
		Object.defineProperty(this, 'instanceAccessor', {
			get() {
				return instanceAccessorResult;
			}
		});
		return {
			instanceValueShort: instanceValue,
			instanceFuncShort: instanceFunc,
			get instanceAccessorShort() {
				return instanceAccessorResult;
			},
		};
	},
	prototype() {
		this.protoValue = protoValue;
		this.protoFunc = function () {
			return protoFuncResult;
		};
		Object.defineProperty(this, 'protoAccessor', {
			get() {
				return protoAccessorResult;
			}
		});
		return {
			protoValueShort: protoValue,
			protoFuncShort() {
				return protoFuncResult;
			},
			get protoAccessorShort() {
				return protoAccessorResult;
			},
		};
	},
	static() {
		this.staticValue = staticValue;
		this.staticFunc = function () {
			return staticFuncResult;
		};
		Object.defineProperty(this, 'staticAccessor', {
			get() {
				return staticAccessorResult;
			}
		});
		return {
			staticValueShort: staticValue,
			staticFuncShort() {
				return staticFuncResult;
			},
			get staticAccessorShort() {
				return staticAccessorResult;
			},
		};
	},
});
/* //OLD
	const DynamicCustomD = dynamicClass.create('DynamicCustomD', {
		instance() {
			this.instanceValue = instanceValue;
			this.instanceFunc = instanceFunc;
			Object.defineProperty(this, 'instanceAccessor', {
				get() {
					return instanceAccessorResult;
				}
			});
			return {
				instanceValueShort: instanceValue,
				instanceFuncShort: instanceFunc,
				get instanceAccessorShort() {
					return instanceAccessorResult;
				},
			};
		},
		prototype() {
			this.protoValue = protoValue;
			this.protoFunc = function () {
				return protoFuncResult;
			};
			Object.defineProperty(this, 'protoAccessor', {
				get() {
					return protoAccessorResult;
				}
			});
			return {
				protoValueShort: protoValue,
				protoFuncShort() {
					return protoFuncResult;
				},
				get protoAccessorShort() {
					return protoAccessorResult;
				},
			};
		},
		static() {
			this.staticValue = staticValue;
			this.staticFunc = function () {
				return staticFuncResult;
			};
			Object.defineProperty(this, 'staticAccessor', {
				get() {
					return staticAccessorResult;
				}
			});
			return {
				staticValueShort: staticValue,
				staticFuncShort() {
					return staticFuncResult;
				},
				get staticAccessorShort() {
					return staticAccessorResult;
				},
			};
		},
		// enumerable, configurable are opposite the defaults
		instanceTransfer(properties, target) {
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

				Object.defineProperty(target, key, {
					...descriptor,
					enumerable: false,
					configurable: false,
				});
			}
		},
		prototypeTransfer(properties, target) {
			for (const key of getKeysOf(properties, {
				own:           true,
				named:         true,
				symbol:        true,
				enumerable:    true,
				nonEnumerable: true,
		
				inherited:     false,
			})) {
				const descriptor = Object.getOwnPropertyDescriptor(properties, key);

				Object.defineProperty(target, key, {
					...descriptor,
					enumerable: true,
					configurable: false,
				});
			}
		},
		staticTransfer(properties, target) {
			for (const key of getKeysOf(properties, {
				own:           true,
				named:         true,
				symbol:        true,
				enumerable:    true,
				nonEnumerable: true,
		
				inherited:     false,
			})) {
				const descriptor = Object.getOwnPropertyDescriptor(properties, key);

				Object.defineProperty(target, key, {
					...descriptor,
					enumerable: (descriptor.writable === undefined || typeof properties[key] === 'function'),
					configurable: false,
				});
			}
		},
	});
*/

// INSTANCE
const IVS = Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceValueShort');
const IV  = Object.getOwnPropertyDescriptor((new ClassD()),   'instanceValue');
const IFS = Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceFuncShort');
const IF  = Object.getOwnPropertyDescriptor((new ClassD()),   'instanceFunc');
const IAS = Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceAccessorShort');
// no equivalent class instance accessor

/* //OLD
	const IVC = Object.getOwnPropertyDescriptor((new DynamicCustomD()), 'instanceValueShort');
	const IFC = Object.getOwnPropertyDescriptor((new DynamicCustomD()), 'instanceFuncShort');
	const IAC = Object.getOwnPropertyDescriptor((new DynamicCustomD()), 'instanceAccessorShort');
*/

// ASSIGNMENT
test('instance value assignment', (t) => {
	t.is((new DynamicD()).instanceValue, (new ClassD()).instanceValue);
});
test('instance value short assignment', (t) => {
	t.is((new DynamicD()).instanceValueShort, (new ClassD()).instanceValue);
});
test('instance func assignment', (t) => {
	t.is((new DynamicD()).instanceFunc, (new ClassD()).instanceFunc);
});
test('instance func short assignment', (t) => {
	t.is((new DynamicD()).instanceFuncShort, (new ClassD()).instanceFunc);
});
test('instance accessor assignment', (t) => {
	t.is((new DynamicD()).instanceAccessor, (new ClassD()).instanceAccessor);
});
test('instance accessor short assignment', (t) => {
	t.is((new DynamicD()).instanceAccessorShort, (new ClassD()).instanceAccessor);
});

// DEFAULT DESCRIPTORS
//? Not sure how these are different from the test with the same name below.
test('instance value short descriptor ?', (t) => {
	t.assert(deepCompare(
		Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceValueShort'),
		Object.getOwnPropertyDescriptor((new ClassD()), 'instanceValue'),
	));
});
test('instance func short descriptor ?', (t) => {
	t.assert(deepCompare(
		Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceFuncShort'),
		Object.getOwnPropertyDescriptor((new ClassD()), 'instanceFunc'),
	));
});
test('instance value short descriptor', (t) => {
	t.assert(
		IVS.writable     === IV.writable   &&
		IVS.enumerable   === IV.enumerable &&
		IVS.configurable === IV.configurable
	);
});
test('instance func short descriptor', (t) => {
	t.assert(
		IFS.writable     === IF.writable   &&
		IFS.enumerable   === IF.enumerable &&
		IFS.configurable === IF.configurable
	);
});
test('instance accessor short descriptor', (t) => {
	t.assert(
		IAS.enumerable   === true &&
		IAS.configurable === true
	);
});

/* //OLD
	// CUSTOM DESCRIPTORS
	test.skip('instance value custom descriptor', (t) => {
		t.assert(
			IVC.enumerable   !== IV.enumerable &&
			IVC.configurable !== IV.configurable
		);
	});
	test.skip('instance func custom descriptor', (t) => {
		t.assert(
			IFC.enumerable   !== IF.enumerable &&
			IFC.configurable !== IF.configurable
		);
	});
	test.skip('instance accessor custom descriptor', (t) => {
		t.assert(
			IAC.enumerable   !== true &&
			IAC.configurable !== true
		);
	});
*/

// PROTOTYPE
const PVS = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicD())), 'protoValueShort');
// no equivalent class prototype value
const PFS = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicD())), 'protoFuncShort');
const PF  = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new ClassD())),   'protoFunc');
const PAS = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicD())), 'protoAccessorShort');
const PA  = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new ClassD())),   'protoAccessor');

/* //OLD
	const PVC = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicCustomD())), 'protoValueShort');
	const PFC = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicCustomD())), 'protoFuncShort');
	const PAC = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicCustomD())), 'protoAccessorShort');
*/

// ASSIGNMENT
test('prototype value assignment', (t) => {
	t.assert((new DynamicD()).protoValue         === (new ClassD()).protoValue);
});
test('prototype value short assignment', (t) => {
	t.assert((new DynamicD()).protoValueShort    === (new ClassD()).protoValue);
});
test('prototype func assignment', (t) => {
	t.assert((new DynamicD()).protoFunc()        === (new ClassD()).protoFunc());
});
test('prototype func short assignment', (t) => {
	t.assert((new DynamicD()).protoFuncShort()   === (new ClassD()).protoFunc());
});
test('prototype accessor assignment', (t) => {
	t.assert((new DynamicD()).protoAccessor      === (new ClassD()).protoAccessor);
});
test('prototype accessor short assignment', (t) => {
	t.assert((new DynamicD()).protoAccessorShort === (new ClassD()).protoAccessor);
});

// DEFAULT DESCRIPTORS
test('prototype value short descriptor', (t) => {
	t.assert(
		PVS.writable     === true  &&
		PVS.enumerable   === false &&
		PVS.configurable === true
	);
});
test('prototype func short descriptor', (t) => {
	t.assert(
		PFS.writable     === PF.writable   && 
		PFS.enumerable   === PF.enumerable && 
		PFS.configurable === PFS.configurable
	);
});
test('prototype accessor short descriptor', (t) => {
	t.assert(
		PAS.enumerable   === PA.enumerable && 
		PAS.configurable === PA.configurable
	);
});

/* //OLD	
	// CUSTOM DESCRIPTORS
	test.skip('prototype value custom descriptor', (t) => {
		t.assert(
			PVC.enumerable   !== false &&
			PVC.configurable !== true
		);
	});
	test.skip('prototype func custom descriptor', (t) => {
		t.assert(
			PFC.enumerable   !== PF.enumerable &&
			PFC.configurable !== PF.configurable
		);
	});
	test.skip('prototype accessor custom descriptor', (t) => {
		t.assert(
			PAC.enumerable   !== PA.enumerable &&
			PAC.configurable !== PA.configurable
		);
	});
*/

// STATIC
const SVS = Object.getOwnPropertyDescriptor(DynamicD, 'staticValueShort');
const SV  = Object.getOwnPropertyDescriptor(ClassD,   'staticValue');
const SFS = Object.getOwnPropertyDescriptor(DynamicD, 'staticFuncShort');
const SF  = Object.getOwnPropertyDescriptor(ClassD,   'staticFunc');
const SAS = Object.getOwnPropertyDescriptor(DynamicD, 'staticAccessorShort');
const SA  = Object.getOwnPropertyDescriptor(ClassD,   'staticAccessor');

/* //OLD
	const SVC = Object.getOwnPropertyDescriptor(DynamicCustomD, 'staticValueShort');
	const SFC = Object.getOwnPropertyDescriptor(DynamicCustomD, 'staticFuncShort');
	const SAC = Object.getOwnPropertyDescriptor(DynamicCustomD, 'staticAccessorShort');
*/

// ASSIGNMENT
test('static value assignment', (t) => {
	t.assert(DynamicD.staticValue         === ClassD.staticValue);
});
test('static value short assignment', (t) => {
	t.assert(DynamicD.staticValueShort    === ClassD.staticValue);
});
test('static func assignment', (t) => {
	t.assert(DynamicD.staticFunc()        === ClassD.staticFunc());
});
test('static func short assignment', (t) => {
	t.assert(DynamicD.staticFuncShort()   === ClassD.staticFunc());
});
test('static accessor assignment', (t) => {
	t.assert(DynamicD.staticAccessor      === ClassD.staticAccessor);
});
test('static accessor short assignment', (t) => {
	t.assert(DynamicD.staticAccessorShort === ClassD.staticAccessor);
});

// DEFAULT DESCRIPTORS
test('static value short descriptor', (t) => {
	t.assert(
		SVS.writable     === SV.writable   &&
		SVS.enumerable   === SV.enumerable &&
		SVS.configurable === SV.configurable
	);
});
test('static func short descriptor', (t) => {
	t.assert(
		SFS.writable     === SF.writable   && 
		SFS.enumerable   === SF.enumerable && 
		SFS.configurable === SFS.configurable
	);
});
test('static accessor short descriptor', (t) => {
	t.assert(
		SAS.enumerable   === SA.enumerable && 
		SAS.configurable === SA.configurable
	);
});

/* //OLD
	// CUSTOM DESCRIPTORS
	test.skip('static value custom descriptor', (t) => {
		t.assert(
			SVC.enumerable   !== SV.enumerable &&
			SVC.configurable !== SV.configurable
		);
	});
	test.skip('static func custom descriptor', (t) => {
		t.assert(
			SFC.enumerable   !== SF.enumerable &&
			SFC.configurable !== SF.configurable
		);
	});
	test.skip('static accessor custom descriptor', (t) => {
		t.assert(
			SAC.enumerable   !== SA.enumerable &&
			SAC.configurable !== SA.configurable
		);
	});
*/

// CALLABLE
const ClassNotCallable = class ClassE {};
const DynamicNotCallable = dynamicClass.create();
test('class is not directly callable', (t) => {
	t.assert((() => {
		return boolCatch(() => {
			ClassNotCallable();
		}) === boolCatch(() => {
			DynamicNotCallable();
		});
	}));
});

// INTERCEPT THIS
const InterceptThis = dynamicClass.create({
	intercept() {
		return {
			instanceArguments: [this],
		};
	},
	instance(that) {
		return {that};
	},
});
test('no intercept this', (t) => {
	t.not((new InterceptThis()).that, InterceptThis);
});

// NAME
const name = '?uhjko8uyhjko98u';
const Named = dynamicClass.create(name);
const EmptyNamed = dynamicClass.create();
test('dynamic name', (t) => {
	t.assert(Named.name === name);
});
test('empty name', (t) => {
	t.assert(EmptyNamed.name === '');
});
test('first argument is layer', (t) => {
	const value = Symbol();
	const Class = dynamicClass.create({
		instance: () => ({
			value,
		}),
	});
	const instance = new Class();
	t.is(instance.value, value);
	t.is(instance.constructor.name, '');
});

// AUGMENT
test('augment returns class', (t) => {
	const Class = dynamicClass.create();
	const Augmented = dynamicClass.augment(Class);
	t.is(Augmented, Class);
});

// INTERCEPT
test('intercept default super arguments', (t) => {
	const SuperClass = class {
		constructor (foo, bar) {
			this.foo = foo;
			this.bar = bar;
		}
	};

	const Class = dynamicClass.create({
		extends: SuperClass,
	});

	const instance = new Class('foo', 'bar');

	t.is(instance.foo, 'foo');
	t.is(instance.bar, 'bar');
});
test('intercept modified super arguments', (t) => {
	const SuperClass = class {
		constructor (foo, bar) {
			this.foo = foo;
			this.bar = bar;
		}
	};

	const Class = dynamicClass.create({
		extends: SuperClass,
		intercept: () => ({
			superArguments: () => ['baz', 'baz'],
		}),
	});

	const instance = new Class('foo', 'bar');

	t.is(instance.foo, 'baz');
	t.is(instance.bar, 'baz');
});
test('intercept modified super arguments shorthand', (t) => {
	const SuperClass = class {
		constructor (foo, bar) {
			this.foo = foo;
			this.bar = bar;
		}
	};

	const Class = dynamicClass.create({
		extends: SuperClass,
		intercept: () => ({
			superArguments: ['baz', 'baz'],
		}),
	});

	const instance = new Class('foo', 'bar');

	t.is(instance.foo, 'baz');
	t.is(instance.bar, 'baz');
});
test('higher layer default arguments', (t) => {
	t.plan(2);

	const Class = dynamicClass.create({
		intercept(foo, bar) {
			t.is(foo, 'foo');
			t.is(bar, 'bar');
		},
	}, {
		intercept() {
			return {};
		},
	});

	new Class('foo', 'bar');
});
test('higher layer modified arguments', (t) => {
	t.plan(2);

	const Class = dynamicClass.create({
		intercept(foo, bar) {
			t.is(foo, 'baz');
			t.is(bar, 'baz');
		},
	}, {
		intercept() {
			return {
				nextArguments: () => ['baz', 'baz'],
			};
		},
	});

	new Class('foo', 'bar');
});
test('higher layer modified arguments shorthand', (t) => {
	t.plan(2);

	const Class = dynamicClass.create({
		intercept(foo, bar) {
			t.is(foo, 'baz');
			t.is(bar, 'baz');
		},
	}, {
		intercept() {
			return {
				nextArguments: ['baz', 'baz'],
			};
		},
	});

	new Class('foo', 'bar');
});
test('instance default arguments', (t) => {
	const Class = dynamicClass.create({
		instance: (foo, bar) => ({
			foo,
			bar,
		}),
	});

	const instance = new Class('foo', 'bar');

	t.is(instance.foo, 'foo');
	t.is(instance.bar, 'bar');
});
test('instance modified arguments', (t) => {
	const Class = dynamicClass.create({
		intercept: () => ({
			instanceArguments: () => ['baz', 'baz'],
		}),
		instance: (foo, bar) => ({
			foo,
			bar,
		}),
	});

	const instance = new Class('foo', 'bar');

	t.is(instance.foo, 'baz');
	t.is(instance.bar, 'baz');
});
test('instance modified arguments shorthand', (t) => {
	const Class = dynamicClass.create({
		intercept: () => ({
			instanceArguments: ['baz', 'baz'],
		}),
		instance: (foo, bar) => ({
			foo,
			bar,
		}),
	});

	const instance = new Class('foo', 'bar');

	t.is(instance.foo, 'baz');
	t.is(instance.bar, 'baz');
});

test('extra intercept options are thrown', (t) => {
	t.throws(() => {
		const Class = dynamicClass.create({
			intercept: () => ({
				notAValidOption: 'foo',
			}),
		});

		new Class();
	});
});

// LAYERS
test('right number of layers are iterated through', (t) => {
	let interceptCount = 0;
	let instanceCount  = 0;
	let prototypeCount = 0;
	let staticCount    = 0;

	const Class = dynamicClass.create({
		intercept() { interceptCount++; },
		instance()  { instanceCount++;  },
		prototype() { prototypeCount++; },
		static()    { staticCount++;    },
	}, {
		intercept() { interceptCount++; },
		instance()  { instanceCount++;  },
		prototype() { prototypeCount++; },
		static()    { staticCount++;    },
	}, {
		intercept() { interceptCount++; },
		instance()  { instanceCount++;  },
		prototype() { prototypeCount++; },
		static()    { staticCount++;    },
	});

	new Class();

	t.is(interceptCount, 3);
	t.is(instanceCount,  3);
	t.is(prototypeCount, 3);
	t.is(staticCount,    3);
});
