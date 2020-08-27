// Returns a deep-cloned value for the purposes of debugging.
//! Will destroy any data not compatible with JSON.

import safeStringify from './safe-stringify.js';

export default function image(value) {
	return JSON.parse(safeStringify(value));
}
