// Returns the first item of an array, or the value otherwise.
//G If exactly one item is required, instead of undefined, use a validator.

import {array} from '../validation/common-rules.js';

export default function (value) {
	return array.test(value) ? value[0] : value;
} 