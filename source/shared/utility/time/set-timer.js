/* //! Differences from setTimeout:
	Delay comes before callback.
	Doesn't accept negative numbers or NaN for the delay.
	Doesn't accept callback arguments. //G Wrap the callback in an arrow function instead.
*/

import {nonNegativeNumber, func} from '../validation/rules/index.js';
import {MAX_32_BIT_INTEGER} from '../constants.js';

/**
 * Executes a function after a delay time. 
 * Supports times longer than 2147483647 milliseconds, unlike setTimeout.
 * 
 * @param  {number}   delay - Delay in milliseconds, or Infinity.
 * @param  {function} callback  - Function executed after delay.
 * 
 * @returns {function}        Function that clears the timer.
 */
export default function (delay, callback) {
	nonNegativeNumber.validate(delay);
	func.validate(callback);

	if (delay === 0) {
		// Execute callback immediately.
		callback();
		// Return empty function, as an instantaneous timeout cannot be cleared.
		return function () {};
	}
	if (delay === Infinity) {
		// Never execute the function.
		// Return empty function, as an infinite timeout is effectively cleared already.
		return function () {};
	}

	// Remainder
	const remainder = delay % MAX_32_BIT_INTEGER;
	// Quotient
	let overflowChunkCount = BigInt((delay - remainder) / MAX_32_BIT_INTEGER);
	// Current timeout ID.
	let timeoutId;

	(function nestTimeout() {
		if (overflowChunkCount > 0) {
			// If there are chunks of overflowed time left:
			// Set a timeout for the full chunk of time.
			timeoutId = setTimeout(() => {
				// Upon finishing:
				// Mark the time chunk as 'finished' by reducing the count.
				overflowChunkCount--; 
				// Evaluate the time state again.
				nestTimeout();
			}, MAX_32_BIT_INTEGER);
		} else {
			// Else, there are no chunks of overflowed time left:
			// Set a timeout for the remaining time.
			timeoutId = setTimeout(callback, remainder);
		}
	})();

	return function() {
		clearTimeout(timeoutId);
	};
};
