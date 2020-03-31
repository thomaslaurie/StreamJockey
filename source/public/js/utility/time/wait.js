//G Used for basic async waiting.
//! Cannot be canceled.

/**
 * Asynchronously waits a period of time, then resolves.
 * 
 * @param {number} duration - Time to wait, in milliseconds.
 * 
 * @returns {Promise} Promise that resolves after wait duration.
 */
export default async function (duration) {
	return new Promise((resolve) => {
		setTimer(duration, () => {
			resolve();
		});
	});
};