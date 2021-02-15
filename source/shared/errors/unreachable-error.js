//G Used when a supposedly unreachable code path has been reached.

import InternalError from './internal-error.js';

export default class UnreachableError extends InternalError {
	constructor({
		message = 'An unreachable code-path has been reached.',
		...rest
	} = {}) {
		super({
			message,
			...rest,
		});
	}
}
