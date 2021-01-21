//TODO add tests for forKeysOf, and filter

import test from 'ava';
import {getKeysOf} from './keys-of.js';
import combinations from '../combinations.js';
import deepCompare from './deep-compare.js';

test('correct combinations', t => {
	const locations = {
		one: {
			k: 'one',
			a: {
				own: true,
				named: true,
				enumerable: true,
			},
		},
		onn: {
			k: 'onn',
			a: {
				own: true,
				named: true,
				nonEnumerable: true,
			},
		},
		ose: {
			k: Symbol('ose'),
			a: {
				own: true,
				symbol: true,
				enumerable: true,
			},
		},
		osn: {
			k: Symbol('osn'),
			a: {
				own: true,
				symbol: true,
				nonEnumerable: true,
			},
		},
		ine: {
			k: 'ine',
			a: {
				inherited: true,
				named: true,
				enumerable: true,
			},
		},
		inn: {
			k: 'inn',
			a: {
				inherited: true,
				named: true,
				nonEnumerable: true,
			},
		},
		ise: {
			k: Symbol('ise'),
			a: {
				inherited: true,
				symbol: true,
				enumerable: true,
			},
		},
		isn: {
			k: Symbol('isn'),
			a: {
				inherited: true,
				symbol: true,
				nonEnumerable: true,
			},
		},
	};

	const parent = {};
	const child = Object.create(parent);

	for (const location in locations) {
		const target = locations[location].a.own ? child : parent;
		const key = locations[location].k;
		const isEnumerable = Boolean(locations[location].a.enumerable);

		Object.defineProperty(target, key, {
			value: null,
			enumerable: isEnumerable,
		});
	}

	const options = [true, false];
	const propertyOptions = {
		own:           options,
		inherited:     options,
		named:         options,
		symbol:        options,
		enumerable:    options,
		nonEnumerable: options,
	};

	const propertyCombinations = combinations(propertyOptions);

	for (const propertyCombination of propertyCombinations) {
		const keys = getKeysOf(child, propertyCombination);
		const retrievedLocations = keys.map(p => {
			if (typeof p === 'symbol') {
				return p.toString().slice(7, -1);
			}
			return p;
		});

		for (const location in locations) {
			if (retrievedLocations.includes(location)) {
				// If location was found, it should match the requested attributes.
				t.assert(deepCompare(locations[location].a, propertyCombination, {subset: true}));
			} else {
				// If location was not found, it shouldn't match the requested attributes.
				t.assert(!deepCompare(locations[location].a, propertyCombination, {subset: true}));
			}
		}
	}
});
test('long chain', t => {
	const same = 'same';

	const grandparent = {};
	grandparent.foo = 'foo';
	grandparent.same = same;
	const parent = Object.create(grandparent);
	parent.bar = 'bar';
	parent.same = same;
	const child = Object.create(parent);
	child.baz = 'baz';
	child.same = same;

	const keys = getKeysOf(child, {
		own: true,
		inherited: true,

		named: true,
		symbol: false,

		enumerable: true,
		nonEnumerable: false,
	});

	for (const testKey of [same, 'foo', 'bar', 'baz']) {
		t.assert(keys.includes(testKey));
	}
});
test('duplicate', t => {
	const same = 'same';

	const grandparent = {};
	grandparent.same = same;
	const parent = Object.create(grandparent);
	parent.same = same;
	const child = Object.create(parent);
	child.same = same;


	const keys = getKeysOf(child, {
		own: true,
		inherited: true,

		named: true,
		symbol: false,

		enumerable: true,
		nonEnumerable: false,
	});

	let count = 0;
	for (const key of keys) {
		if (key === same) count++;
	}

	t.assert(count === 1);
});
