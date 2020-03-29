//TODO add tests for forKeysOf, and filter

import test from '../test.js';
import {getKeysOf} from './keys-of.js';
import combinations from '../combinations.js';
import deepCompare from './deep-compare.js';

export default function testGetKeys() {
	return test([
		['correct combinations', (function () {
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
				const isEnumerable = locations[location].a.enumerable ? true : false;
		
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
				const retrievedLocations = keys.map((p) => {
					if (typeof p === 'symbol') {
						return p.toString().slice(7, -1);
					} else {
						return p;
					}
				});
		
				for (const location in locations) {
					if (retrievedLocations.includes(location)) {
						// if location was found, fail if it doesn't match the requested attributes
						if (!deepCompare(locations[location].a, propertyCombination, {subset: true})) return false;
					} else {
						// if location was not found, fail if it does match the requested attributes
						if ( deepCompare(locations[location].a, propertyCombination, {subset: true})) return false;
					}
				}		
			}
		
			return true;
		})()],
		['long chain', (function () {
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
				if (!keys.includes(testKey)) return false;
			}
		
			return true;
		})()],
		['duplicate', (function () {
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
		
			if (count !== 1) return false;
		
			return true;
		})()],
	], 'keys-of');
};
