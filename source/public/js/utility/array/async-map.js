// Executes an async function for each item in an array.
// When all async functions are settled, returns an array of results if all are fulfilled, but throws the array of results if any reject.

//G Callback takes same argument order as Array.map callback.
//! Can mutate the original array.

import {
	array as arrayRule,
	func as functionRule,
} from '../validation/common-rules.js';

export default async function (array, callback) {
	// Validate.
	arrayRule.validate(array);
	functionRule.validate(callback);

	// Wait for every promise to settle.
	const promises = array.map((item, index, self) => callback(item, index, self));
	const outcomes = await Promise.allSettled(promises);

	// Extract fulfillment and results.
	const allFulfilled = outcomes.every((outcome) => outcome.status === 'fulfilled');
	const results = outcomes.map((outcome) => (
		outcome.status === 'fulfilled' 
			? outcome.value 
			: outcome.reason
	));

	// Return fulfilled results or reject mixed results.
	if (allFulfilled) {
		return results;
	} else {
		throw results;
	}
};