import test from 'ava';
import deepCompare from './deep-compare.js';

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

// aF is subset of aG at first level, but then aG is a subset of aF at second level, this should fail subset
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

const sA = {s: 'foo'};
const sB = {s: 'foo'};

// PRIMITIVES
test('match positive number',        (t) => { t.assert( deepCompare( 1,           1));          });
test('match zero',                   (t) => { t.assert( deepCompare( 0,           0));          });
test('match negative number',        (t) => { t.assert( deepCompare(-1,          -1));          });
test('match infinity',               (t) => { t.assert( deepCompare( Infinity,    Infinity));   });
test('match negative infinity',      (t) => { t.assert( deepCompare(-Infinity,   -Infinity));   });
test('mismatch NaN',                 (t) => { t.assert(!deepCompare( NaN,         NaN));        });
test('mismatch positive number',     (t) => { t.assert(!deepCompare( 4,           3193));       });
test('mismatch positive negative',   (t) => { t.assert(!deepCompare(-3,           0));          });
test('mismatch infinity, number',    (t) => { t.assert(!deepCompare( Infinity,    2345678909875498765456789)); });
test('mismatch infinity, -infinity', (t) => { t.assert(!deepCompare( Infinity,   -Infinity));   });
test('mismatch NaN, zero',           (t) => { t.assert(!deepCompare( NaN,         0));          });
test('match true',                   (t) => { t.assert( deepCompare( true,        true));       });
test('match false',                  (t) => { t.assert( deepCompare( false,       false));      });
test('mismatch true, false',         (t) => { t.assert(!deepCompare( true,        false));      });
test('match string',                 (t) => { t.assert( deepCompare('test',      'test'));      });
test('match empty',                  (t) => { t.assert( deepCompare('',          ''));          });
test('match "undefined"',            (t) => { t.assert( deepCompare('undefined', 'undefined')); });
test('match "null"',                 (t) => { t.assert( deepCompare('null',      'null'));      });
test('mismatch string',              (t) => { t.assert(!deepCompare('string',    'test'));      });
test('mismatch empty and filled',    (t) => { t.assert(!deepCompare('',          'test'));      });

// OBJECTS
test('match object reference',       (t) => { t.assert( deepCompare(oA, oA)); });
test('match object items',           (t) => { t.assert( deepCompare(oA, oB)); });
test('match object subset',          (t) => { t.assert( deepCompare(oA, oC, {subset: true})); });
test('mismatch object, not subset',  (t) => { t.assert(!deepCompare(oA, oC)); });
test('mismatch object props',        (t) => { t.assert(!deepCompare(oA, oD)); });

// ARRAYS
test('match array reference',        (t) => { t.assert( deepCompare(aA, aA)); });
test('match array items',            (t) => { t.assert( deepCompare(aA, aB)); });
test('match array subset',           (t) => { t.assert( deepCompare(aA, aC, {subset: true})); });
test('mismatch array, not subset',   (t) => { t.assert(!deepCompare(aA, aC)); });
test('mismatch array items',         (t) => { t.assert(!deepCompare(aA, aD)); });
test('mismatch array, order',        (t) => { t.assert(!deepCompare(aC, aE)); });
test('match object and array',       (t) => { t.assert( deepCompare({}, [])); });

// NESTING
test('match nested',                 (t) => { t.assert( deepCompare(nA, nB)); });
test('match nested if too deep',     (t) => { t.assert( deepCompare(nA, nB, {depth: 2, resultIfTooDeep: true})); });
test('mismatch nested if too deep',  (t) => { t.assert(!deepCompare(nA, nB, {depth: 2})); });

// SUBSET
test('mismatch subset switch',       (t) => { t.assert(!deepCompare(aF, aG, {subset: true})); });

// ANYWHERE
test('match anywhere',               (t) => { t.assert( deepCompare(childA, childB, {anywhere: true})); });
test('mismatch not anywhere',        (t) => { t.assert(!deepCompare(childA, childB, {anywhere: false})); });
test('match anywhere subset',        (t) => { t.assert( deepCompare(childA, childC, {anywhere: true, subset: true})); });
test('mismatch anywhere subset',     (t) => { t.assert(!deepCompare(childB, childC, {anywhere: true, subset: true})); });

// COMPARE FUNCTION
test('match greater than',           (t) => { t.assert( deepCompare(gA, gB, {compareFunction: (a, b) => a > b})); });
test('mismatch greater than',        (t) => { t.assert(!deepCompare(gA, gC, {compareFunction: (a, b) => a > b})); });

// SELECT FUNCTION
test('match symbol property',        (t) => { t.assert( deepCompare(sA, sB, {selectFunction: Object.getOwnPropertySymbols})); });
