// Takes a value (that should've been thrown), re-throws it if its already an Error, otherwise wraps it in an error instance and throws that.
//G Use in the final .catch() of a Promise chain to handle any unexpected values or errors thrown.
//! Be aware of JSON.stringify()'s interaction with Error instances and non-enumerable properties:
//L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify

import UnexpectedValueThrown from './errors/unexpected-value-thrown.js';
import {UnknownError, UnreachableError} from './errors/index.js';
import {sharedRegistry} from './class-registry.js';
import reconstructError from './reconstruct-error.js';

// Register the built-in Error class
// The registry id will be manually assigned to errors.
export const errorSharedRegistryId = 'Error';
sharedRegistry.register(Error, errorSharedRegistryId, reconstructError);

// Wraps the passed value in an Error instance if it isn't one. Then throws it.
// All instances will be registered with the sharedRegistry so that they can be identified as errors when passed between the client and server.
export default function propagate(thrownValue) {
	if (thrownValue instanceof Error) {
		if (sharedRegistry.isRegistered(thrownValue)) {
			throw thrownValue;
		} else if (thrownValue.constructor === Error) {
			// If the error is a direct instance of Error, manually register it and throw it.
			try {
				sharedRegistry.defineId(thrownValue, errorSharedRegistryId);
			} catch (error) {
				// An Error instance should never have a non-configurable sharedRegistryIdKey but not be registered.
				throw new UnreachableError(thrownValue);
			}
			throw thrownValue;
		} else {
			throw new UnknownError(thrownValue);
		}
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
	console.error(propagate(thrownValue));
}
