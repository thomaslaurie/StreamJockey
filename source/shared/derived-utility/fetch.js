// Dynamically imports fetch from 'node-fetch' if it is not available.
//! Cannot name the function fetch because it creates a recursion issue.

export default async function (...args) {
	// Must use typeof because it won't throw a reference error. https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
	// Fetch requires
	if (typeof fetch === 'undefined') return import('node-fetch').then(m => m.default(...args));
	return fetch(...args);
}
