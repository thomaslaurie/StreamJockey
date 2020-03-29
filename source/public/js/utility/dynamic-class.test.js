import test from './test.js';
import dynamicClass from './dynamic-class.js';
import deepCompare from './object/deep-compare.js';
import boolCatch from './bool-catch.js';
import {getKeysOf} from './object/keys-of.js';

export default function dynamicClassTest() {
	const tests = [];


	// LINKS
	const ClassA = class ClassA {
	};
	const ClassB = class ClassB extends ClassA {
	};
	const DynamicA = dynamicClass.create({
		name: 'DynamicA',
		prototype: () => ({
			test: Symbol(),
		}),
		static: () => ({
			test: Symbol(),
		}),
	});
	const DynamicB = dynamicClass.create({
		name: 'DynamicB',
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
	const DynamicBX = dynamicClass.create({
		name: 'DynamicBX',
		extends: ClassA,
	});

	// ROOT
	tests.push(...[
		// ROOT LINKS
		['root prototype', Object.getPrototypeOf(ClassA) === Object.getPrototypeOf(DynamicA)],
		['root.constructor', ClassA.constructor === DynamicA.constructor],

		// ROOT.PROTOTYPE LINKS
		['root.prototype prototype',   Object.getPrototypeOf(ClassA.prototype) === Object.getPrototypeOf(DynamicA.prototype)],
		['root.prototype.prototype',   ClassA.prototype.prototype === DynamicA.prototype.prototype],
		['root.prototype.constructor', DynamicA.prototype.constructor === DynamicA],
	]);

	// ROOT.PROTOTYPE DESCRIPTOR
	const ClassAProtoPDesc  = Object.getOwnPropertyDescriptor(ClassA,  'prototype');
	const DynamicAProtoPDesc = Object.getOwnPropertyDescriptor(DynamicA, 'prototype');
	tests.push(...[
		['root.prototype writable',     ClassAProtoPDesc.writable     === DynamicAProtoPDesc.writable],
		['root.prototype enumerable',   ClassAProtoPDesc.enumerable   === DynamicAProtoPDesc.enumerable],
		['root.prototype configurable', ClassAProtoPDesc.configurable === DynamicAProtoPDesc.configurable],
	]);

	// ROOT.PROTOTYPE.CONSTRUCTOR DESCRIPTOR
	const ClassAProtoPConstDesc  = Object.getOwnPropertyDescriptor(ClassA.prototype,  'constructor');
	const DynamicAProtoPConstDesc = Object.getOwnPropertyDescriptor(DynamicA.prototype, 'constructor');
	tests.push(...[
		['root.prototype.constructor writable',     ClassAProtoPConstDesc.writable     === DynamicAProtoPConstDesc.writable],
		['root.prototype.constructor enumerable',   ClassAProtoPConstDesc.enumerable   === DynamicAProtoPConstDesc.enumerable],
		['root.prototype.constructor configurable', ClassAProtoPConstDesc.configurable === DynamicAProtoPConstDesc.configurable],
	]);

	// CHILD
	tests.push(...[
		// CHILD LINKS
		['child prototype', 
			Object.getPrototypeOf(ClassB)  === Object.getPrototypeOf(DynamicBX) && 
			Object.getPrototypeOf(ClassBX) === Object.getPrototypeOf(DynamicB)
		],
		['child.constructor', ClassB.constructor === DynamicB.constructor],

		// CHILD.PROTOTYPE LINKS
		['child.prototype prototype',   
			Object.getPrototypeOf(ClassB.prototype)  === Object.getPrototypeOf(DynamicBX.prototype) && 
			Object.getPrototypeOf(ClassBX.prototype) === Object.getPrototypeOf(DynamicB.prototype)
		],
		['child.prototype.prototype',   ClassB.prototype.prototype === DynamicB.prototype.prototype],
		['child.prototype.constructor', DynamicB.prototype.constructor === DynamicB],
	]);

	// CHILD.PROTOTYPE DESCRIPTOR
	const ClassBProtoPDesc  = Object.getOwnPropertyDescriptor(ClassB,  'prototype');
	const DynamicBProtoPDesc = Object.getOwnPropertyDescriptor(DynamicB, 'prototype');
	tests.push(...[
		['child.prototype writable',     ClassBProtoPDesc.writable     === DynamicBProtoPDesc.writable],
		['child.prototype enumerable',   ClassBProtoPDesc.enumerable   === DynamicBProtoPDesc.enumerable],
		['child.prototype configurable', ClassBProtoPDesc.configurable === DynamicBProtoPDesc.configurable],
	]);

	// CHILD.PROTOTYPE.CONSTRUCTOR DESCRIPTOR
	const ClassBProtoPConstDesc  = Object.getOwnPropertyDescriptor(ClassB.prototype,  'constructor');
	const DynamicBProtoPConstDesc = Object.getOwnPropertyDescriptor(DynamicB.prototype, 'constructor');
	tests.push(...[
		['child.prototype.constructor writable',     ClassBProtoPConstDesc.writable     === DynamicBProtoPConstDesc.writable],
		['child.prototype.constructor enumerable',   ClassBProtoPConstDesc.enumerable   === DynamicBProtoPConstDesc.enumerable],
		['child.prototype.constructor configurable', ClassBProtoPConstDesc.configurable === DynamicBProtoPConstDesc.configurable],
	]);


	// SUPER INTERACTION
	tests.push(...[
		['prototype duper works', (new DynamicB()).getSuperTest() === (new ClassBX()).getSuperTest()],
		['static duper works', DynamicB.getSuperTest() === ClassBX.getSuperTest()],
	]);


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

	const DynamicD = dynamicClass.create({
		name: 'DynamicD',
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
	const DynamicCustomD = dynamicClass.create({
		name: 'DynamicCustomD',
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
		transferToInstance(properties, target) {
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
		transferToPrototype(properties, target) {
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
		transferToStatic(properties, target) {
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

	// INSTANCE
	const IVS = Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceValueShort');
	const IV  = Object.getOwnPropertyDescriptor((new ClassD()),   'instanceValue');
	const IFS = Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceFuncShort');
	const IF  = Object.getOwnPropertyDescriptor((new ClassD()),   'instanceFunc');
	const IAS = Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceAccessorShort');
	// no equivalent class instance accessor

	const IVC = Object.getOwnPropertyDescriptor((new DynamicCustomD()), 'instanceValueShort');
	const IFC = Object.getOwnPropertyDescriptor((new DynamicCustomD()), 'instanceFuncShort');
	const IAC = Object.getOwnPropertyDescriptor((new DynamicCustomD()), 'instanceAccessorShort');

	tests.push(...[
		// ASSIGNMENT
		['instance value assignment',          (new DynamicD()).instanceValue         === (new ClassD()).instanceValue],
		['instance value short assignment',    (new DynamicD()).instanceValueShort    === (new ClassD()).instanceValue],
		['instance func assignment',           (new DynamicD()).instanceFunc          === (new ClassD()).instanceFunc],
		['instance func short assignment',     (new DynamicD()).instanceFuncShort     === (new ClassD()).instanceFunc],
		['instance accessor assignment',       (new DynamicD()).instanceAccessor      === (new ClassD()).instanceAccessor],
		['instance accessor short assignment', (new DynamicD()).instanceAccessorShort === (new ClassD()).instanceAccessor],

		// DEFAULT DESCRIPTORS
		['instance value short descriptor', deepCompare(
			Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceValueShort'),
			Object.getOwnPropertyDescriptor((new ClassD()), 'instanceValue'),
		)],
		['instance func short descriptor', deepCompare(
			Object.getOwnPropertyDescriptor((new DynamicD()), 'instanceFuncShort'),
			Object.getOwnPropertyDescriptor((new ClassD()), 'instanceFunc'),
		)],

		['instance value short descriptor',
			IVS.writable     === IV.writable   &&
			IVS.enumerable   === IV.enumerable &&
			IVS.configurable === IV.configurable
		],
		['instance func short descriptor', 
			IFS.writable     === IF.writable   &&
			IFS.enumerable   === IF.enumerable &&
			IFS.configurable === IF.configurable
		],
		['instance accessor short descriptor', 
			IAS.enumerable   === true &&
			IAS.configurable === true
		],

		// CUSTOM DESCRIPTORS
		['instance value custom descriptor',
			IVC.enumerable   !== IV.enumerable &&
			IVC.configurable !== IV.configurable
		],
		['instance func custom descriptor',
			IFC.enumerable   !== IF.enumerable &&
			IFC.configurable !== IF.configurable
		],
		['instance accessor custom descriptor',
			IAC.enumerable   !== true &&
			IAC.configurable !== true
		],
	]);

	// PROTOTYPE
	const PVS = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicD())), 'protoValueShort');
	// no equivalent class prototype value
	const PFS = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicD())), 'protoFuncShort');
	const PF  = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new ClassD())),   'protoFunc');
	const PAS = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicD())), 'protoAccessorShort');
	const PA  = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new ClassD())),   'protoAccessor');

	const PVC = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicCustomD())), 'protoValueShort');
	const PFC = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicCustomD())), 'protoFuncShort');
	const PAC = Object.getOwnPropertyDescriptor(Object.getPrototypeOf((new DynamicCustomD())), 'protoAccessorShort');

	tests.push(...[
		// ASSIGNMENT
		['prototype value assignment',          (new DynamicD()).protoValue         === (new ClassD()).protoValue],
		['prototype value short assignment',    (new DynamicD()).protoValueShort    === (new ClassD()).protoValue],
		['prototype func assignment',           (new DynamicD()).protoFunc()        === (new ClassD()).protoFunc()],
		['prototype func short assignment',     (new DynamicD()).protoFuncShort()   === (new ClassD()).protoFunc()],
		['prototype accessor assignment',       (new DynamicD()).protoAccessor      === (new ClassD()).protoAccessor],
		['prototype accessor short assignment', (new DynamicD()).protoAccessorShort === (new ClassD()).protoAccessor],

		// DEFAULT DESCRIPTORS
		['prototype value short descriptor',
			PVS.writable     === true  &&
			PVS.enumerable   === false &&
			PVS.configurable === true
		],
		['prototype func short descriptor', 
			PFS.writable     === PF.writable   && 
			PFS.enumerable   === PF.enumerable && 
			PFS.configurable === PFS.configurable
		],
		['prototype accessor short descriptor', 
			PAS.enumerable   === PA.enumerable && 
			PAS.configurable === PA.configurable
		],

		// CUSTOM DESCRIPTORS
		['prototype value custom descriptor',
			PVC.enumerable   !== false &&
			PVC.configurable !== true
		],
		['prototype func custom descriptor',
			PFC.enumerable   !== PF.enumerable &&
			PFC.configurable !== PF.configurable
		],
		['prototype accessor custom descriptor',
			PAC.enumerable   !== PA.enumerable &&
			PAC.configurable !== PA.configurable
		],
	]);

	// STATIC
	const SVS = Object.getOwnPropertyDescriptor(DynamicD, 'staticValueShort');
	const SV  = Object.getOwnPropertyDescriptor(ClassD,   'staticValue');
	const SFS = Object.getOwnPropertyDescriptor(DynamicD, 'staticFuncShort');
	const SF  = Object.getOwnPropertyDescriptor(ClassD,   'staticFunc');
	const SAS = Object.getOwnPropertyDescriptor(DynamicD, 'staticAccessorShort');
	const SA  = Object.getOwnPropertyDescriptor(ClassD,   'staticAccessor');

	const SVC = Object.getOwnPropertyDescriptor(DynamicCustomD, 'staticValueShort');
	const SFC = Object.getOwnPropertyDescriptor(DynamicCustomD, 'staticFuncShort');
	const SAC = Object.getOwnPropertyDescriptor(DynamicCustomD, 'staticAccessorShort');

	tests.push(...[
		// ASSIGNMENT
		['static value assignment',          DynamicD.staticValue         === ClassD.staticValue],
		['static value short assignment',    DynamicD.staticValueShort    === ClassD.staticValue],
		['static func assignment',           DynamicD.staticFunc()        === ClassD.staticFunc()],
		['static func short assignment',     DynamicD.staticFuncShort()   === ClassD.staticFunc()],
		['static accessor assignment',       DynamicD.staticAccessor      === ClassD.staticAccessor],
		['static accessor short assignment', DynamicD.staticAccessorShort === ClassD.staticAccessor],

		// DEFAULT DESCRIPTORS
		['static value short descriptor',
			SVS.writable     === SV.writable   &&
			SVS.enumerable   === SV.enumerable &&
			SVS.configurable === SV.configurable
		],
		['static func short descriptor', 
			SFS.writable     === SF.writable   && 
			SFS.enumerable   === SF.enumerable && 
			SFS.configurable === SFS.configurable
		],
		['static accessor short descriptor', 
			SAS.enumerable   === SA.enumerable && 
			SAS.configurable === SA.configurable
		],

		// CUSTOM DESCRIPTORS
		['static value custom descriptor',
			SVC.enumerable   !== SV.enumerable &&
			SVC.configurable !== SV.configurable
		],
		['static func custom descriptor',
			SFC.enumerable   !== SF.enumerable &&
			SFC.configurable !== SF.configurable
		],
		['static accessor custom descriptor',
			SAC.enumerable   !== SA.enumerable &&
			SAC.configurable !== SA.configurable
		],
	]);


	// CALLABLE
	const ClassNotCallable = class ClassE {};
	const DynamicNotCallable = dynamicClass.create();
	tests.push(['class is not directly callable', (() => {
		return boolCatch(() => {
			ClassNotCallable();
		}) === boolCatch(() => {
			DynamicNotCallable();
		});
	})]);


	// INTERCEPT THIS
	const InterceptThis = dynamicClass.create({
		intercept() {
			return [this];
		},
		instance(that) {
			return {that};
		},
	});
	tests.push(['no intercept this', (new InterceptThis()).that !== InterceptThis]);

	
	// NAME
	const name = '?uhjko8uyhjko98u';
	const Named = dynamicClass.create({name});
	const EmptyNamed = dynamicClass.create();
	tests.push(...[
		['dynamic name', Named.name === name],
		['empty name', EmptyNamed.name === ''],
	]);


	test(tests, 'dynamicClass');
};
