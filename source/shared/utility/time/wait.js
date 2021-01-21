//G Used for basic async waiting.
//! Cannot be canceled.

import setTimer from './set-timer.js';

/**
 * Asynchronously waits a period of time, then resolves.
 *
 * @param {number} duration - Time to wait, in milliseconds.
 *
 * @returns {Promise} Promise that resolves after wait duration.
 */
export default async function wait(duration) {
	return new Promise(resolve => {
		setTimer(duration, () => {
			resolve();
		});
	});
}
