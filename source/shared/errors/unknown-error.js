// Used for unknown errors. Those which cannot be reconstructed.
// Keeps the own, named, enumerable properties of the original error intact.
//! Intentionally extends from Error and not CustomError so that the original error can be mimicked as closely as possible.
//! Will throw an error if the passed value is not an object.

import {
	forOwnKeysOf,
	copyProperty,
} from '../utility/index.js';
import {sharedRegistry} from '../class-registry.js';

const sharedRegistryId = 'UnknownError';

export default class UnknownError extends Error {
	constructor(error = {}) {
		super(error.message);

		// Copy all properties.
		forOwnKeysOf(error, (key) => {
			if (key !== 'message') {
				copyProperty(key, error, this);
			}
		});

		sharedRegistry.defineId(this, sharedRegistryId);
	}
}

sharedRegistry.register(UnknownError, sharedRegistryId);
