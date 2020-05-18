import {
	dynamicClass,
	define,
	rules,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default dynamicClass.create('HTTPError', {
	extends: CustomError,
	instance({
		code = 400,            // HTTPS Response Status Code
		type = 'Bad Request',  // Human-readable code name.
	} = {}) {
		define.validatedVariable(this, {
			code: {
				value: code,
				validator: rules.integer.validate.bind(rules.integer),
			},
			type: {
				value: type,
				validator: rules.string.validate.bind(rules.string),
			},
		});
	},
});
