//TODO Error's message property is non-enumerable. This prevents it from being passed to the client.

import {
	define,
	rules,
} from '../utility/index.ts';
import {sharedRegistry} from '../class-registry.js';

// CustomError is registered to communicate an error via socket connection. See live-data-client.js
const sharedRegistryId = 'CustomError';

export default class CustomError extends Error {
	constructor({
		// User-readable message.
		// Alternative to the native Error class' 'message' property which should not be exposed to the user by default.
		//! //G sj.Error.message -> CustomError.userMessage, sj.Error.reason => CustomError.message
		userMessage = '',
		// Extract message from options and pass it properly to Error.
		message = userMessage,
	} = {}) {
		super(message);

		define.validatedVariable(this, {
			userMessage: {
				value: userMessage,
				validator: rules.string.validate,
			},
		});

		sharedRegistry.defineId(this, sharedRegistryId);
	}
}

sharedRegistry.register(CustomError, sharedRegistryId);
