// Executes an async function for each item in an array.
// When all async functions are settled, returns an array of results if all are fulfilled, but throws the array of results if any reject.

//G Callback takes same argument order as Array.map callback.
//! Can mutate the original array.
//! The thrown value will not be an Error object.
//G If an Error object is desired use a wrapper like .catch(MultipleErrors.throw);

//TODO The semantics of this might not be correct - why would a mixed list of fulfilled and rejected values be useful? The rejected promises are also all caught so basic throws aren't useful. Maybe explicitly filtering out fulfillments from the thrown array would be better? To fix this would require going in and ensuring all uses work with this change.

import {rules} from '../validation/index.js';

export default async function asyncMap(array, mapFunction) {
	// Validate.
	rules.array.validate(array);
	rules.func.validate(mapFunction);

	// Wait for every promise to settle.
	const promises = array.map((item, index, self) => mapFunction(item, index, self));
	const outcomes = await Promise.allSettled(promises);

	// Extract results and fulfillment.
	const fulfilledResults = [];
	const rejectedResults = [];
	let allFulfilled = true;
	for (const outcome of outcomes) {
		if (outcome.status === 'fulfilled') {
			fulfilledResults.push(outcome.value);
		} else {
			rejectedResults.push(outcome.reason);
			allFulfilled = false;
		}
	}

	// Return fulfilled results or throw rejected results.
	if (allFulfilled) {
		return fulfilledResults;
	}
	throw rejectedResults;
}
