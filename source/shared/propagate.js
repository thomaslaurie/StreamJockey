// Takes a value (that should've been thrown), re-throws it if its already an Error, otherwise wraps it in an error instance and throws that.
//G Use in the final .catch() of a Promise chain to handle any unexpected values or errors thrown.
//! Be aware of JSON.stringify()'s interaction with Error instances and non-enumerable properties:
//L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify

import UnexpectedValueThrown from './errors/unexpected-value-thrown.js';
import {UnknownError} from './errors/index.js';
import {sharedRegistry} from './class-registry.js';
import reconstructError from './reconstruct-error.js';

// Register the built-in Error class
// The registry id will be manually assigned to errors.
const sharedRegistryId = 'Error';
sharedRegistry.register(Error, sharedRegistryId, reconstructError);

// Wraps the passed value in an Error instance if it isn't one. Then throws it.
// All instances will be registered with the sharedRegistry so that they can be identified as errors when passed between the client and server.
export default function propagate(thrownValue) {
	if (thrownValue instanceof Error) {
		if (thrownValue.constructor === Error) {
			// If the error is a direct instance of Error, try to add a sharedRegistryId so that it can be reconstructed as an Error.
			if (Object.getOwnPropertyDescriptor(thrownValue, sharedRegistry.idKey).configurable) {
				sharedRegistry.defineId(thrownValue, sharedRegistryId);
				throw thrownValue;
			} else if (sharedRegistry.isRegistered(thrownValue)) {
				throw thrownValue;
			}
		}
		throw new UnknownError(thrownValue);
	} else {
		throw new UnexpectedValueThrown({
			message: `An unexpected value was thrown.`,
			userMessage: 'An unexpected error has occurred.',
			value: thrownValue,
		});
	}
}

// Propagates a value, but returns it instead of throwing it.
export function returnPropagate(thrownValue) {
	try {
		return propagate(thrownValue);
	} catch (error) {
		return error;
	}
}

// Propagates a value, but logs it.
// The error should be considered 'handled'.
export function logPropagate(thrownValue) {
	console.error(logPropagate(thrownValue));
}
