// Appends more query parameters to a URL that may or may not already have query parameters.
//TODO Consider fully validating.

import {string} from '../validation/rules/strings.js';

export default function appendQueryParameters(url, ...queryParameters) {
	string.validate(url);
	for (const queryParameter of queryParameters) {
		string.validate(queryParameter);
	}

	const appendCharacter = url.includes('?') ? '&' : '?';
	return `${url}${appendCharacter}${queryParameters.join('&')}`;
}
