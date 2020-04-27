import {
	dynamicClass,
	define,
	rules,
} from '../shared/utility/index.js';

export default dynamicClass.create('CustomError', {
	extends: Error,
	// Extract message from options and pass it properly to Error.
	intercept: ({message} = {}) => ({superArguments: [message]}),
	instance({
		code = 400,
		type = 'Bad Request', // Human-readable name for code.
		reason = '',          // Human readable message. //! Flipped with 'message' from old sj.Error.
	} = {}) {
		define.validatedVariable(this, {
			code: {
				value: code,
				validator: rules.integer.validate,
			},
			type: {
				value: type,
				validator: rules.string.validate,
			},
			reason: {
				value: reason,
				validator: rules.string.validate,
			},
		});
	},
});
