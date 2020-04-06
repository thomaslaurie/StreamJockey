import test from 'ava';
import define from './define.js';

const object = {};

// CONSTANT
define.constant(object, {c: 'c'});
test('cannot set constant', (t) => {
	t.throws(() => { 
		object.c = 'not c'; 
	});
});
test('cannot redefine constant', (t) => {
	t.throws(() => {
		Object.defineProperty(object, 'c', {enumerable: false});
	});
});

// VARIABLE
define.variable(object, {v: 'v'});
test('can set variable', (t) => {
	t.notThrows(() => {
		object.v = 'not v';
	});
	t.assert(object.v === 'not v');
});
test('can redefine variable', (t) => {
	t.notThrows(() => {
		Object.defineProperty(object, 'v', {enumerable: false});
	});
});

// GETTER
define.getter(object, {get go() {}});
const descriptorGO = Object.getOwnPropertyDescriptor(object, 'go');
test('getter has getter', (t) => {
	t.assert(typeof descriptorGO.get === 'function');
});
test('getter does not have setter', (t) => {
	t.assert(descriptorGO.set === undefined);
});

// SETTER
define.setter(object, {set so(v) {}});
const descriptorSO = Object.getOwnPropertyDescriptor(object, 'so');
test('setter has setter', (t) => {
	t.assert(typeof descriptorSO.set === 'function');
});
test('setter does not have getter', (t) => {
	t.assert(descriptorSO.get === undefined);
});

// ACCESSOR
define.accessor(object, {get a() {}, set a(v) {}});
const descriptorA = Object.getOwnPropertyDescriptor(object, 'a');
test('accessor has getter', (t) => {
	t.assert(typeof descriptorA.get === 'function');
});
test('accessor has setter', (t) => {
	t.assert(typeof descriptorA.set === 'function');
});

// MULTIPLES
define.variable(object, {
	one: 'one',
	two: 'two',
	three: 'three',
});
test('handles multiples', (t) => {
	t.assert('one' in object && 'two' in object && 'three' in object);
});
