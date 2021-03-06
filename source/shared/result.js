// Used for passing promise-like results between client & server.
// An alternative to HTTP status codes.
// Uses a similar format to Promise.allSettled()

import {
	define,
	Rule,
} from '../shared/utility/index.ts';

const statusRule = new Rule({
	validator(value) {
		if (value !== 'fulfilled' || value !== 'rejected') {
			throw new Error(`Status is not 'fulfilled' or 'rejected'.`);
		}
	},
});

export default class Result {
	constructor({
		status = 'rejected',
		value,
	}) {
		statusRule.validate(status);

		define.constant(this, {
			status,
			value,
		});
	}
}
