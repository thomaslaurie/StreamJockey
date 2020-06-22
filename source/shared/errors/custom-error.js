import {
	define,
	rules,
} from '../utility/index.js';

export default class CustomError extends Error {
	constructor({
		// Extract message from options and pass it properly to Error.
		message,
		// User-readable message.
		// Alternative to the native Error class' 'message' property which should not be exposed to the user by default.
		//! //G sj.Error.message -> CustomError.userMessage, sj.Error.reason => CustomError.message
		userMessage = '',
	} = {}) {
		super(message);

		define.validatedVariable(this, {
			reason: {
				value: userMessage,
				validator: rules.string.validate.bind(rules.string),
			},
		});
	}
}
