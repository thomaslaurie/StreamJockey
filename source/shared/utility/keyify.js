//G Casts any value as an object key, using the exact same method.

import {getKeysOf} from './object/keys-of.js';

export default function keyify(value) {
	// Create a null object with only one property.
	const nullObject = Object.create(null);
	nullObject[value] = true;

	// Find that objects only key.
	const [keyifiedValue] = getKeysOf(nullObject, {
		own:        true,
		named:      true,
		symbol:     true,
		enumerable: true,

		nonEnumerable: false,
		inherited:     false,
	});

	return keyifiedValue;
}
