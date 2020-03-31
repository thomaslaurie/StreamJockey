//R setTimeout has a maximum delay of MAX_32_BIT_INTEGER past which the timeout will execute immediately.
//G Use this timer instead to support longer timeouts.

import {MAX_32_BIT_INTEGER} from '../constants.js';

/**
 * Executes a function after a delay time, similar to setTimeout.
 * 
 * @param  {number}   delay - Delay in milliseconds.
 * @param  {function} func  - Function executed after delay.
 * @param  {...any}   args  - Arguments passed to the function.
 * 
 * @returns {function}        Function that clears the timer.
 */
export default function (delay, func, ...args) {
	//TODO Add validation, maybe remove support for negative numbers and NaN as they don't semantically make sense.

	// If delay is 0, negative, or NaN (similar to setTimeout).
	if (delay <= 0 || NaN) {
		// Execute function immediately.
		func(...args);
		// Return empty function, as an instantaneous timeout cannot be cleared.
		return function () {};
	}
	// If delay is infinite.
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
			timeoutId = setTimeout(func, remainder, ...args);
		}
	})();

	return function() {
		clearTimeout(timeoutId);
	};
};
