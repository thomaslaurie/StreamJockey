// Basic wait promise.
//! Does not resolve if timeout is larger than MAX_SAFE_32_BIT_INTEGER
//TODO Maybe think about functionality for handling larger numbers, infinity, negative numbers, etc.

import { MAX_SAFE_32_BIT_INTEGER } from './constants.js';

export default async function (ms) {
    //C used for basic waiting, //! should not be used if the callback needs to be canceled
	return new Promise(resolve => {
		//L maximum timeout length: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
		if (ms <= MAX_SAFE_32_BIT_INTEGER) { 
			sj.setTimeout(() => { resolve() }, ms);
		}
	});
};