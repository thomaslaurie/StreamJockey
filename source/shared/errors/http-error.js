import {
	define,
	rules,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default class HTTPError extends CustomError {
	constructor({
		code = 400,            // HTTPS Response Status Code
		type = 'Bad Request',  // Human-readable code name.
		...rest
	} = {}) {
		super(rest);
		define.validatedVariable(this, {
			code: {
				value: code,
				validator: rules.integer.validate,
			},
			type: {
				value: type,
				validator: rules.string.validate,
			},
		});
	}
}
