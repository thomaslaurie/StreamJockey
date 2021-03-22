import decodeProperties from './decode-properties.js';
import {rules} from '../validation/index.ts';

export default function decodeList(encoded) {
	// decodes a list of encoded objects with '-i' suffixed property keys
	//! any key not matching the format will be discarded
	const indexed = decodeProperties(encoded);
	const list = [];
	const indexedKeys = Object.keys(indexed);
	for (let i = 0; i < indexedKeys.length; i++) {
		// validate delimiter
		const delimiterIndex = indexedKeys[i].lastIndexOf('-');
		if (delimiterIndex < 0) { break }

		// validate index
		const objectIndex = parseInt(indexedKeys[i].slice(delimiterIndex + 1)); // handles multiple digits & no digits properly
		if (!rules.integer.test(objectIndex)) { break }

		// get the real key
		const key = indexedKeys[i].slice(0, delimiterIndex);

		if (rules.object.test(list[objectIndex])) {
			// otherwise add the prop to the existing object
			list[objectIndex][key] = indexed[indexedKeys[i]];
		} else {
			// if the obj doesn't exist yet, add it with the prop
			list[objectIndex] = {
				[key]: indexed[indexedKeys[i]],
			};
		}
	}
	return list;
}
