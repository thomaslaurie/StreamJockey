import test from '../test.js';
import deepCompare from './deep-compare.js';

export default function deepCompareTest() {
	const oA = {
		a: 'a',
		b: 'b',
	};
	const oB = {
		a: 'a',
		b: 'b',
	};
	const oC = {
		a: 'a',
		b: 'b',
		c: 'c',
	};
	const oD = {
		a: 'a',
		b: 'not b',
	};

	const aA = ['a', 'b'];
	const aB = ['a', 'b'];
	const aC = ['a', 'b', 'c'];
	const aD = ['a', 'not b'];
	const aE = ['a', 'c', 'b'];

	const nA = {
		a: {
			a: {
				a: {
					a: 'a',
				}
			}
		}
	};
	const nB = {
		a: {
			a: {
				a: {
					a: 'a',
				}
			}
		}
	};

	//C aF is subset of aG at first level, but then aG is a subset of aF at second level, this should fail subset
	const aF = [
		{
			a: 'a',
			b: 'b',
		},
	];
	const aG = [
		{
			a: 'a',
		},
		{
			b: 'b',
		},
	];

	const parentA = {foo: 'foo'};
	const childA = Object.create(parentA);
	childA.bar = 'bar';

	const parentB = {bar: 'bar'};
	const childB = Object.create(parentB);
	childB.foo = 'foo';

	const parentC = {bar: 'bar'};
	const childC = Object.create(parentC);

	const gA = {
		a: 100,
		b: -50,
		c: Infinity,
	};
	const gB = {
		a: 50,
		b: -100,
		c: -Infinity,
	};
	const gC = {
		a: 200,
		b: -200,
		c: 0,
	};

	const s = Symbol();
	const sA = {s: 'foo'};
	const sB = {s: 'foo'};

	return test([
		// PRIMITIVES
		['match positive number',        true  === deepCompare(1, 1)],
		['match zero',                   true  === deepCompare(0, 0)],
		['match negative number',        true  === deepCompare(-1, -1)],
		['match infinity',               true  === deepCompare(Infinity, Infinity)],
		['match negative infinity',      true  === deepCompare(-Infinity, -Infinity)],
		['mismatch NaN',                 false === deepCompare(NaN, NaN)],
		['mismatch positive number',     false === deepCompare(4, 3193)],
		['mismatch positive negative',   false === deepCompare(-3, 0)],
		['mismatch infinity, number',    false === deepCompare(Infinity, 2345678909875498765456789)],
		['mismatch infinity, -infinity', false === deepCompare(Infinity, -Infinity)],
		['mismatch NaN, zero',           false === deepCompare(NaN, 0)],
		['match true',                   true  === deepCompare(true, true)],
		['match false',                  true  === deepCompare(false, false)],
		['mismatch true, false',         false === deepCompare(true, false)],
		['match string',                 true  === deepCompare('test', 'test')],
		['match empty',                  true  === deepCompare('', '')],
		['match "undefined"',            true  === deepCompare('undefined', 'undefined')],
		['match "null"',                 true  === deepCompare('null', 'null')],
		['mismatch string',              false === deepCompare('string', 'test')],
		['mismatch empty and filled',    false === deepCompare('', 'test')],

		// OBJECTS
		['match object reference',       true  === deepCompare(oA, oA)],
		['match object items',           true  === deepCompare(oA, oB)],
		['match object subset',          true  === deepCompare(oA, oC, {subset: true})],
		['mismatch object, not subset',  false === deepCompare(oA, oC)],
		['mismatch object props',        false === deepCompare(oA, oD)],

		// ARRAYS
		['match array reference',        true  === deepCompare(aA, aA)],
		['match array items',            true  === deepCompare(aA, aB)],
		['match array subset',           true  === deepCompare(aA, aC, {subset: true})],
		['mismatch array, not subset',   false === deepCompare(aA, aC)],
		['mismatch array items',         false === deepCompare(aA, aD)],
		['mismatch array, order',        false === deepCompare(aC, aE)],
		['match object and array',       true  === deepCompare({}, [])],

		// NESTING
		['match nested',                 true  === deepCompare(nA, nB)],
		['match nested if too deep',     true  === deepCompare(nA, nB, {depth: 2, resultIfTooDeep: true})],
		['mismatch nested if too deep',  false === deepCompare(nA, nB, {depth: 2})],

		// SUBSET
		['mismatch subset switch',       false === deepCompare(aF, aG, {subset: true})],

		// ANYWHERE
		['match anywhere',               true  === deepCompare(childA, childB, {anywhere: true})],
		['mismatch not anywhere',        false === deepCompare(childA, childB, {anywhere: false})],
		['match anywhere subset',        true  === deepCompare(childA, childC, {anywhere: true, subset: true})],
		['mismatch anywhere subset',     false === deepCompare(childB, childC, {anywhere: true, subset: true})],

		// COMPARE FUNCTION
		['match greater than',           true  === deepCompare(gA, gB, {compareFunction: (a, b) => a > b})],
		['mismatch greater than',        false === deepCompare(gA, gC, {compareFunction: (a, b) => a > b})],

		// SELECT FUNCTION
		['match symbol property',        true  === deepCompare(sA, sB, {selectFunction: Object.getOwnPropertySymbols})],

	], 'deepCompare');
};