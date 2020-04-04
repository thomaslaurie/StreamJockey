// Executes an async function for each item in an array.
// When all async functions are settled, returns an array of results if all are fulfilled, but throws the array of results if any reject.

//G Callback takes same argument order as Array.map callback.
//! Can mutate the original array.

//TODO The semantics of this might not be correct - why would a mixed list of fulfilled and rejected values be useful? The rejected promises are also all caught so basic throws aren't useful. Maybe explicitly filtering out fulfillments from the thrown array would be better? To fix this would require going in and ensuring all uses work with this change.

import {rules} from '../validation/index.js';

export default async function (array, callback) {
	// Validate.
	rules.array.validate(array);
	rules.func.validate(callback);

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