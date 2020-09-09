import any from '../array/any.js';
import encodeProperties from './encode-properties.js';

export default function encodeList(list) {
	// return a string of uri encoded key-value pairs for each property of each item, their keys suffixed with '-[index]'
	//! not called automatically by request() because its useful to see when a encodeList exists as it needs to be unpacked on the other end
	const indexed = {};
	any(list).forEach((object, index) => {
		Object.keys(object).forEach((key) => {
			indexed[`${key}-${index}`] = object[key];
		});
	});
	return encodeProperties(indexed);
}
