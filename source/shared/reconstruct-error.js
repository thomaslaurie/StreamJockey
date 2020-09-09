//TODO Create custom reconstruction option.

import {forOwnKeysOf, copyProperty} from './utility/index.js';

export default function reconstructError(Class, error) {
	const newError = new Class(error.message);

	// Copy all properties.
	forOwnKeysOf(error, (key) => {
		if (key !== 'message') {
			copyProperty(key, error, newError);
		}
	});

	return newError;
}
