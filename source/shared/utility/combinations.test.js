import test from 'ava';
import combinations from './combinations.js';

const optionsObjects = [
	{},
	{a: []},
	{a: [], b: [], c: []},
	{
		a: ['a0'],
		b: ['b0', 'b1', 'b2', 'b3', 'b4'],
		c: ['c0', 'c1', 'c2'],
	},
	{
		a: ['a0', 'a1', 'a2', 'a3', 'a4'],
		b: ['b0'],
		c: ['c0', 'c1', 'c2'],
	},
	{
		a: ['a0', 'a1', 'a2'],
		b: ['b0', 'b1', 'b2', 'b3', 'b4'],
		c: ['c0'],
	},
	{
		a: ['a0', 'a1', 'a2'],
		b: ['b0', 'b1', 'b2', 'b3', 'b4'],
		c: [],
	},
	{
		[Symbol('foo')]: ['foo0', 'foo1'],
		[Symbol('bar')]: ['bar0', 'bar1'],
	},
	{
		a: ['a0', 'a1', 'a2'],
		[Symbol('foo')]: ['foo0', 'foo1'],
		[Symbol('bar')]: ['bar0', 'bar1'],
	},
	{ // takes ~ 0.2 seconds
		a: (() => {
			const a = [];
			for (let i = 0; i < 100; i++) {
				a.push(`a${i}`);
			}
			return a;
		})(),
		b: (() => {
			const b = [];
			for (let i = 0; i < 100; i++) {
				b.push(`b${i}`);
			}
			return b;
		})(),
		c: (() => {
			const c = [];
			for (let i = 0; i < 100; i++) {
				c.push(`c${i}`);
			}
			return c;
		})(),
	},
];

// number of combinations = a * b * c ...
optionsObjects.forEach((optionsObject, index) => {
	const optionsList = [];
	optionsList.push(...Object.getOwnPropertyNames(optionsObject).map(key => optionsObject[key]));
	optionsList.push(...Object.getOwnPropertySymbols(optionsObject).map(key => optionsObject[key]));

	let numberOfCombinations = 0;
	if (optionsList.length > 0) {
		numberOfCombinations = 1;
		for (const options of optionsList) {
			numberOfCombinations *= options.length;
		}
	}

	let objectCombinations = [];

	test(`options object ${index} - no runtime errors`, (t) => {
		t.notThrows(() => {
			objectCombinations = combinations(optionsObject);
		});
	});

	test(`options object ${index} - number of combinations`, (t) => {
		t.assert(objectCombinations.length === numberOfCombinations);
	});
});
