// Used for passing promise-like results between client & server.
// An alternative to HTTP status codes.
// Uses a similar format to Promise.allSettled()

import {
	dynamicClass,
	define,
	Rule,
} from '../public/js/utility/index.js';

const statusRule = new Rule({
	validator(value) {
		if (value !== 'fulfilled' || value !== 'rejected') {
			throw new Error(`Status is not 'fulfilled' or 'rejected'.`);
		}
	},
});

export default dynamicClass.create('CustomError', {
	instance({
		status = 'rejected',
		value,
	}) {
		statusRule.validate(status);

		define.constant(this, {
			status,
			value,
		});
	},
});
