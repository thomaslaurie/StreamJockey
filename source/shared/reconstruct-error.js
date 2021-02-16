//TODO Create custom reconstruction option.

import {forOwnKeysOf, copyOwnProperty} from './utility/index.js';

export default function reconstructError(Class, error) {
	const newError = new Class(error.message);

	// Copy all properties.
	forOwnKeysOf(error, (obj, key) => {
		if (key !== 'message') {
			copyOwnProperty(key, error, newError);
		}
	});

	return newError;
}
