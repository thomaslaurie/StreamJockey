// Wraps a value in an array. If the value is already an array, its items get spread into a fresh one.

import {array} from '../common-rules.js';

export default function (value) {
	return array.test(value) ? [...value] : [value];
} 