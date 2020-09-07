// Encodes all request bodies as Flatted JSON.
// GET requests use a reserved query parameter whereas all other requests use the body.
/* //R
	Using JSON for all server requests so that primitive types can be preserved.
	This also applies to GET requests for consistency.
*/

// INTERNAL
import {
	rules,
	escapeRegExp,
	constants,
	appendQueryParameters,
} from '../shared/utility/index.js';
import {
	safeStringify,
} from '../shared/derived-utility/index.js';
import {
	HTTPError,
} from '../shared/errors/index.js';
import {
	GET_BODY,
	API_URL,
} from '../shared/constants.js';
import request from '../shared/request.js';
import urlRule from '../shared/derived-utility/url.js';

export default async function (method, url, body) {
	rules.string.validate(url);

	// Turn relative URL into absolute URL.
	url = new URL(url, `${API_URL}/`).toString();

	rules.string.validate(method);
	urlRule.validate(url);
	// Body will be stringified and is allowed to be anything.

	let JSONBody;
	// For GET requests with a body, put the body in a query parameter.
	if (method === 'GET' && body !== undefined) {
		// Ensure the URL doesn't contain the reserved query parameter.
		if ((new RegExp(`[?&]${escapeRegExp(GET_BODY)}`, 'u')).test(url)) {
			throw new HTTPError({
				message: `Server request URL cannot use the query parameter '${GET_BODY}' as it is reserved.`,
			});
		}

		// Encode as flatted JSON.
		const flattedBody = encodeURIComponent(safeStringify(body));
		url = appendQueryParameters(url, `${GET_BODY}=${flattedBody}`);

		// Leave actualBody as undefined so that nothing is sent with the GET request.
	} else {
		// Otherwise put the body in the body.
		JSONBody = body;
	}

	// Ensure URL length is reasonable.
	if (url.length > constants.MAX_URL_LENGTH) {
		throw new HTTPError({
			message: `HTTP request URL has ${url.length} characters. This is longer than the recommended maximum of ${MAX_URL_LENGTH} and may not be supported in some contexts.`,
		});
	}

	// Always use the JSON_HEADER for server requests.
	return request(method, url, {
		JSONBody,
		headers: constants.JSON_HEADER,
	});
}
