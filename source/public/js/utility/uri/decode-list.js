import decodeProperties from './decode-properties.js';
import {integer, object} from '../common-rules.js';

export default function (encoded) {
	//C decodes a list of encoded objects with '-i' suffixed property keys
	//! any key not matching the format will be discarded
	const indexed = decodeProperties(encoded);
	const list = [];
	const indexedKeys = Object.keys(indexed);
	for (const i = 0; i < indexedKeys.length; i++) {
		//C validate delimiter
		const delimiterIndex = indexedKeys[i].lastIndexOf('-');
		if (delimiterIndex < 0) {break}

		//C validate index
		const objectIndex = parseInt(indexedKeys[i].slice(delimiterIndex + 1)); //C handles multiple digits & no digits properly
		if (!integer.test(objectIndex)) { break }

		//C get the real key
		const key = indexedKeys[i].slice(0, delimiterIndex);

		if (!object.test(list[objectIndex])) {
			//C if the obj doesn't exist yet, add it with the prop
			list[objectIndex] = {
				[key]: indexed[indexedKeys[i]],
			};
		} else {
			//C otherwise add the prop to the existing object
			list[objectIndex][key] = indexed[indexedKeys[i]];
		}
	}
	return list;
};