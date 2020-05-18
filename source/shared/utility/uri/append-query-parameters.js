// Appends more query parameters to a URL that may or may not already have query parameters.
//TODO Consider fully validating.

import {
	rules,
} from '../index.js';

export default function (url, ...queryParameters) {
	rules.string.validate(url);
	for (const queryParameter of queryParameters) {
		rules.string.validate(queryParameter);
	}

	const appendCharacter = url.includes('?') ? '&' : '?';
	return `${url}${appendCharacter}${queryParameters.join('&')}`;
};