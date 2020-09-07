// Returns the first item of an array, or the value otherwise.
//G If exactly one item is required, instead of undefined, use a validator.

import {rules} from '../validation/index.js';

export default function one(value) {
	return rules.array.test(value) ? value[0] : value;
}
