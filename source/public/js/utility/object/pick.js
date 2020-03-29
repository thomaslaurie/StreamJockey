// Copies all non-undefined properties of an object onto a new object.
//! Invokes getters.
//! Does not copy descriptors.
//! Copies inherited properties directly onto the new object.

//R Why not use destructuring?
//R It wouldn't be possible to store a preset list of properties to pick.

import {
	object as objectRule,
	array  as arrayRule,
	key    as keyRule,
} from '../validation/common-rules.js';

export default function (oldObject, keys) {
	objectRule.validate(oldObject);
	arrayRule.validate(keys);

	const newObject = {};
	for (const key of keys) {
		const value = oldObject[key];
		if (value !== undefined) newObject[key] = value;
	}
	return newObject;
};