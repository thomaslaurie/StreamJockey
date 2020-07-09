// Used for errors that get thrown in parallel.

import {
	define,
	rules,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default class MultipleErrors extends CustomError {
	constructor({
		userMessage = 'Some errors have occurred.',
		errors,
		...rest
	} = {}) {
		super({
			userMessage,
			...rest,
		});

		define.validatedVariable(this, {
			errors: {
				value: errors,
				validator: rules.array.validate,
			},
		});
	}
}

define.constant(MultipleErrors, {
	throw(errors) {
		throw new MultipleErrors({errors});
	},
});
