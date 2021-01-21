//TODO Create test for define.nonWritable.
//TODO Add tests that ensure the target is returned.

import test from 'ava';
import define from './define.js';

const object = {};

// CONSTANT
define.constant(object, {c: 'c'});
test('cannot set constant', t => {
	t.throws(() => {
		object.c = 'not c';
	});
});
test('cannot redefine constant', t => {
	t.throws(() => {
		Object.defineProperty(object, 'c', {enumerable: false});
	});
});

// VARIABLE
define.writable(object, {v: 'v'});
test('can set variable', t => {
	t.notThrows(() => {
		object.v = 'not v';
	});
	t.assert(object.v === 'not v');
});
test('can redefine variable', t => {
	t.notThrows(() => {
		Object.defineProperty(object, 'v', {enumerable: false});
	});
});

// GETTER
define.getter(object, {get go() {}});
const descriptorGO = Object.getOwnPropertyDescriptor(object, 'go');
test('getter has getter', t => {
	t.assert(typeof descriptorGO.get === 'function');
});
test('getter does not have setter', t => {
	t.assert(descriptorGO.set === undefined);
});

// SETTER
define.setter(object, {set so(v) {}});
const descriptorSO = Object.getOwnPropertyDescriptor(object, 'so');
test('setter has setter', t => {
	t.assert(typeof descriptorSO.set === 'function');
});
test('setter does not have getter', t => {
	t.assert(descriptorSO.get === undefined);
});

// ACCESSOR
define.accessor(object, {get a() {}, set a(v) {}});
const descriptorA = Object.getOwnPropertyDescriptor(object, 'a');
test('accessor has getter', t => {
	t.assert(typeof descriptorA.get === 'function');
});
test('accessor has setter', t => {
	t.assert(typeof descriptorA.set === 'function');
});

// MULTIPLES
define.writable(object, {
	one: 'one',
	two: 'two',
	three: 'three',
});
test('handles multiples', t => {
	t.assert('one' in object && 'two' in object && 'three' in object);
});

test('validated variable throws on invalid', t => {
	const obj = {};
	define.validatedVariable(obj, {
		foo: {
			value: 'foo',
			validator: value => {
				if (typeof value !== 'string') throw new Error();
			},
		},
	});
	t.throws(() => {
		obj.foo = 4;
	});
});
test('validated variable succeeds on valid', t => {
	const obj = {};
	define.validatedVariable(obj, {
		foo: {
			value: 'foo',
			validator: value => typeof value === 'string',
		},
	});
	t.notThrows(() => {
		obj.foo = '4';
	});
});
test('validated variable is defined, not set', t => {
	t.plan(1);
	const obj = new Proxy({}, {
		set() {
			t.pass();
			return true;
		},
	});
	define.validatedVariable(obj, {
		foo: {
			value: 'foo',
			validator: value => typeof value === 'string',
		},
	});
	obj.foo = 'some string';
});
