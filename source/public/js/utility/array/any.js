// Wraps a value in an array. If the value is already an array, its items get spread into a fresh one.

import {rules} from '../validation/index.js';

export default function (value) {
	return rules.array.test(value) ? [...value] : [value];
} 