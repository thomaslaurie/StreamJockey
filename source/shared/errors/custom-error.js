import {
	dynamicClass,
	define,
	rules,
} from '../utility/index.js';

export default dynamicClass.create('CustomError', {
	extends: Error,
	// Extract message from options and pass it properly to Error.
	intercept: ({message} = {}) => ({superArguments: [message]}),
	instance({
		// User-readable message.
		// Alternative to the native Error class' 'message' property which should not be exposed to the user by default.
		//!//G sj.Error.message -> CustomError.userMessage, sj.Error.reason => CustomError.message
		userMessage = '',
	} = {}) {
		define.validatedVariable(this, {
			reason: {
				value: userMessage,
				validator: rules.string.validate.bind(rules.string),
			},
		});
	},
});
