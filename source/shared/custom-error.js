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
		let _code;
		let _type;
		let _reason;

		define.accessor(this, {
			get code() {
				return _code;
			},
			set code(value) {
				rules.integer.validate(value);
				_code = value;
			},
			get type() {
				return _type;
			},
			set type(value) {
				rules.string.validate(value);
				_type = value;
			},
			get reason() {
				return _reason;
			},
			set reason(value) {
				rules.string.validate(value);
				_reason = value;
			},
		});

		Object.assign(this, {
			code,
			type,
			reason,
		});
	},
});
