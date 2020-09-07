// Used for errors that are caused by internal mistakes in the code.
// ie. Not the user's fault.

import CustomError from './custom-error.js';

export default class InternalError extends CustomError {
	constructor({
		userMessage = 'An internal error has occurred.',
		...rest
	} = {}) {
		super({
			userMessage,
			...rest,
		});
	}
}
