// Copies spreadable properties of an object to a new object if they are not undefined.
// Intended for use with object spread where declared-undefined-properties should be treated as undeclared-properties.

import {rules} from '../validation/index.ts';
import {forSpreadableKeysOf} from './keys-of.js';

export default function undeclareUndefined(object) {
	rules.object.validate(object);

	const newObject = {};

	forSpreadableKeysOf(object, (obj, key) => {
		const value = obj[key];
		if (value !== undefined) {
			newObject[key] = value;
		}
	});

	return newObject;
}
