// Used for errors that get thrown in parallel.
//TODO Consider replacing with AggregateError (remember to add it to sharedRegistry like CustomError is)

import {
	define,
	rules,
} from '../utility/index.ts';
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
	// Used for promise handler shorthand .catch(MultipleErrors.throw)
	throw(errors) {
		throw new MultipleErrors({errors});
	},
});
