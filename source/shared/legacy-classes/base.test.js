import test from '../test.js';
import Base from './base.js';

(async function () {
	let calledConstructorParts 		= false;
	let calledBeforeInitialize 		= false;
	let calledAfterInitialize 		= false;
	let calledPrototypeProperties 	= false;
	let calledStaticProperties 		= false;
	let calledExtraFunction			= false;


	const A = Base.makeClass('A', Base, {
		//C testing options functions and properties
		constructorParts(parent) {
			calledConstructorParts = true;
			return {
				beforeInitialize() {
					calledBeforeInitialize = true;
					this.beforeFoo = Symbol();
				},
				defaults: {
					defaultFoo: Symbol(),
					passedFoo: 'passed as not default',

					undefinedFoo: undefined,
					undefinedOptionFoo: 'passed as undefined',
					// undeclaredFoo is not declared
				},
				afterInitialize() {
					calledAfterInitialize = true;
					this.afterFoo = Symbol();
				},
			};
		},
		prototypeProperties(parent) {
			calledPrototypeProperties = true;
			return {
				prototypeFoo: Symbol(),
			}
		},
		staticProperties(parent) {
			calledStaticProperties = true;
			return {
				staticFoo: Symbol(),
			};
		},

		extraFunction() {
			calledExtraFunction = true;
		},
	}); 
	const a = new A({passedFoo: Symbol(), undefinedOptionFoo: undefined});
	const a2 = new A({passedFoo: Symbol()});

	const AA = Base.makeClass('AA', A, {
		//C testing property inheritance and extension
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeFoo2 = Symbol();
			},
			defaults: {
				defaultFoo2: Symbol(),
			},
			afterInitialize() {
				this.afterFoo2 = Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeFoo2: Symbol(),
		}),
		staticProperties: parent => ({
			staticFoo2: Symbol(),
		}),
	}); 
	const aa = new AA();
	
	const AAA = Base.makeClass('AAA', AA, {}); 
	const aaa = new AAA();

	const AAB = Base.makeClass('AAB', AA, {}); 
	const aab = new AAB();

	const AB = Base.makeClass('AB', A, {
		//C testing child overwrites
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeFoo = Symbol();
			},
			defaults: {
				defaultFoo: Symbol(),
			},
			afterInitialize() {
				this.afterFoo = Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeFoo: Symbol(),
		}),
		staticProperties: parent => ({
			staticFoo: Symbol(),
		}),
	}); 
	const ab = new AB();
		
	const B = Base.makeClass('B', Base, {}); 
	const b = new B();

	const BA = Base.makeClass('BA', B, {}); 
	const ba = new BA();

	const BB = Base.makeClass('BB', B, {}); 
	const bb = new BB();

	const C = Base.makeClass('C', Base, {
		//C testing augmented properties
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeBar =  Symbol();
			},
			defaults: {
				defaultBar: Symbol(),
			},
			afterInitialize() {
				this.afterBar =  Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeBar: Symbol(),
		}),
		staticProperties: parent => ({
			staticBar: Symbol(),
		}),
	});
	const c = new C();

	C.augmentClass({
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeBar =  Symbol();
			},
			defaults: {
				defaultBar: Symbol(),
			},
			afterInitialize() {
				this.afterBar =  Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeBar: Symbol(),
		}),
		staticProperties: parent => ({
			staticBar: Symbol(),
		}),
	});
	const c2 = new C();


	await test([
		// INHERITANCE
		['A prototype is Base', 	Object.getPrototypeOf(A) === Base],
		['AA prototype is A', 		Object.getPrototypeOf(AA) === A],
		['AAAA prototype is AA', 	Object.getPrototypeOf(AAA) === AA],

		['a instanceof Base', 		a instanceof Base],
		['aa instanceof Base', 		aa instanceof Base],
		['aaa instanceof Base', 		aaa instanceof Base],

		// SIBLINGS
		['a !instanceof B', !(a instanceof B)],
		['aa !instanceof AB', !(aa instanceof AB)],
		['aaa !instanceof AAB', !(aaa instanceof AAB)],

		// COUSINS
		['aa !instanceof BA', !(aa instanceof BA)],

		// INSTANCES
		['a.constructor === A',		a.constructor === A],
		['aa.constructor === AA',	aa.constructor === AA],
		['aaa.constructor === AAA',	aaa.constructor === AAA],


		// MAKE CLASS FUNCTIONS
		['called constructorParts',		calledConstructorParts],
		['called beforeInitialize',		calledBeforeInitialize],
		['called afterInitialize',		calledAfterInitialize],
		['called prototypeProperties',	calledPrototypeProperties],
		['called staticProperties',		calledStaticProperties],
		['did not call extraFunction',	!calledExtraFunction],

		// PROPERTIES EXIST
		['a before property',		a.hasOwnProperty('beforeFoo')],
		['a default property',		a.hasOwnProperty('defaultFoo')],
		['a after property',		a.hasOwnProperty('afterFoo')],
		['A.prototype property',	Object.getPrototypeOf(a).hasOwnProperty('prototypeFoo')],
		['A static property',		A.hasOwnProperty('staticFoo')],

		// PROPERTY INHERITANCE
		//! before and after will generate new instances, even if function is inherited
		['aa.beforeFoo === a.beforeFoo',			aa.beforeFoo !== undefined && aa.beforeFoo !== a.beforeFoo], 
		['aa.defaultFoo === a.defaultFoo',			aa.defaultFoo === a.defaultFoo],
		['aa.afterFoo === a.afterFoo',				aa.defaultFoo !== undefined && aa.afterFoo !== a.afterFoo],
		['AA.prototype foo === A.prototype foo',	AA.prototype.prototypeFoo === A.prototype.prototypeFoo],
		['AA static foo === A static foo',			AA.staticFoo === A.staticFoo],

		// PROPERTY EXTENSION
		['aa.beforeFoo2 exists',		aa.afterFoo2 !== undefined && aa.afterFoo2 !== aa.afterFoo],
		['aa.defaultFoo2 exists',		aa.defaultFoo2 !== undefined && aa.defaultFoo2 !== aa.defaultFoo],
		['aa.afterFoo2 exists',			aa.afterFoo2 !== undefined && aa.beforeFoo2 !== aa.beforeFoo],
		['AA.prototype foo2 exists',	AA.prototype.prototypeFoo2 !== undefined && AA.prototype.prototypeFoo2 !== AA.prototype.prototypeFoo],
		['AA static foo2 exists',		AA.staticFoo2 !== undefined && AA.staticFoo2 !== AA.staticFoo],

		// PROPERTY OVERWRITE
		['ab.beforeFoo exists and !== a.beforeFoo',		ab.beforeFoo !== undefined && ab.beforeFoo !== a.beforeFoo],
		['ab.defaultFoo exists and !== a.defaultFoo',	ab.defaultFoo !== undefined && ab.defaultFoo !== a.defaultFoo],
		['ab.afterFoo exists and !== a.afterFoo',		ab.afterFoo !== undefined && ab.afterFoo !== a.afterFoo],
		['AB.prototype foo exists !== B.prototype foo',	AB.prototype.prototypeFoo !== undefined && AB.prototype.prototypeFoo !== A.prototype.prototypeFoo],
		['AB static foo exists !== A static foo',		AB.staticFoo !== undefined && AB.staticFoo !== A.staticFoo],

		// AUGMENT CLASS
		['c2.beforeBar exists and !== c.beforeBar',					c2.beforeBar !== undefined && c2.beforeBar !== c.beforeBar],
		['c2.defaultBar exists and !== c.defaultBar',				c2.defaultBar !== undefined && c2.defaultBar !== c.defaultBar],
		['c2.afterBar exists and !== c.afterBar',					c2.afterBar !== undefined && c2.afterBar !== c.afterBar],
		['c.constructor.prototype === c2.constructor.prototype',	Object.getPrototypeOf(c) === Object.getPrototypeOf(c2)],
		['c.constructor === c2.constructor',						c.constructor === c2.constructor],


		// PASSED OPTIONS
		['a.passedFoo !== a2.passedFoo', a.passedFoo !== a2.passedFoo],
		['undefined default',			!a.hasOwnProperty('undefinedFoo')],
		['undeclared default',			!a.hasOwnProperty('undeclaredFoo')],
		['undefined option',			!a.hasOwnProperty('undefinedFoo')],
	], 'Base Classes');
})();