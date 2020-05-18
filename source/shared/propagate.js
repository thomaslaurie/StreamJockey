// Takes an input (which was thrown), re-throws it if its already an Error, otherwise wraps it in an error instance and throws that.
//G Use in the final .catch() of a Promise chain to handle any unexpected values or errors thrown.
//! Be aware of JSON.stringify()'s interaction with Error instances and non-enumerable properties:
//L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify

import safeStringify from './derived-utility/safe-stringify.js';
import UnexpectedValueThrown from './errors/unexpected-value-thrown.js';

export default function (value, overwriteOptions) {
	if (value instanceof Error) {
		throw value;
	} else {
		throw new UnexpectedValueThrown({
			message: `An unexpected value has been thrown: ${safeStringify(value)}`,
			userMessage: 'An unexpected error has occurred.',
			...overwriteOptions,
			value,
		});
	}
};
