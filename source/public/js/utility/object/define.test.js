import test from '../test.js';
import define from './define.js';

export default function defineTest() {
	const tests = [];

	const object = {};


	// CONSTANT
	define.constant(object, {c: 'c'});

	let cannotSetConstant = false;
	try { object.c = 'not c'; } catch (e) { cannotSetConstant = true; }
	tests.push(['cannot set constant', cannotSetConstant]);

	let cannotRedefineConstant = false;
	try { Object.defineProperty(object, 'c', {enumerable: false}); } catch (e) { cannotRedefineConstant = true; }
	tests.push(['cannot redefine constant', cannotRedefineConstant]);


	// VARIABLE
	define.variable(object, {v: 'v'});

	let canSetVariable = true;
	try { object.v = 'not v'; } catch (e) { canSetVariable = false; }
	if (object.v !== 'not v') canSetVariable = false;
	tests.push(['can set variable', canSetVariable]);

	let canRedefineVariable = true;
	try { Object.defineProperty(object, 'v', {enumerable: false}); } catch (e) { canRedefineVariable = false; }
	tests.push(['can redefine variable', canRedefineVariable]);


	// GET ter
	define.getter(object, {get go() {}});
	const descriptorGO = Object.getOwnPropertyDescriptor(object, 'go');
	tests.push(['getter has getter', typeof descriptorGO.get === 'function']);
	tests.push(['getter does not have setter', descriptorGO.set === undefined]);


	// SET ter
	define.setter(object, {set so(v) {}});
	const descriptorSO = Object.getOwnPropertyDescriptor(object, 'so');
	tests.push(['setter has setter', typeof descriptorSO.set === 'function']);
	tests.push(['setter does not have getter', descriptorSO.get === undefined]);

	
	// ACCESSOR
	define.accessor(object, {get a() {}, set a(v) {}});
	const descriptorA = Object.getOwnPropertyDescriptor(object, 'a');
	tests.push(['accessor has setter', typeof descriptorA.get === 'function']);
	tests.push(['accessor has getter', typeof descriptorA.set === 'function']);


	// MULTIPLES
	define.variable(object, {
		one: 'one',
		two: 'two',
		three: 'three',
	});
	tests.push(['handles multiples', 'one' in object && 'two' in object && 'three' in object])
	

	return test([
		...tests,
	], 'define');
};
