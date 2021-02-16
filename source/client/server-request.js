// Encodes all request bodies as Flatted JSON.
// GET requests use a reserved query parameter whereas all other requests use the body.
/* //R
	Using JSON for all server requests so that primitive types can be preserved.
	This also applies to GET requests for consistency.
*/

/* //TODO Test
	Registered objects get reconstructed.
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
import {sharedRegistry} from '../shared/class-registry.js';

export default async function serverRequest(method, url, body) {
	let [workingURL] = rules.string.validate(url);

	// Turn relative URL into absolute URL.
	workingURL = new URL(workingURL, `${API_URL}/`).toString();

	rules.string.validate(method);
	urlRule.validate(workingURL);
	// Body will be stringified and is allowed to be anything.

	let JSONBody;
	// For GET requests with a body, put the body in a query parameter.
	if (method === 'GET' && body !== undefined) {
		// Ensure the URL doesn't contain the reserved query parameter.
		if ((new RegExp(`[?&]${escapeRegExp(GET_BODY)}`, 'u')).test(workingURL)) {
			throw new HTTPError({
				message: `Server request URL cannot use the query parameter '${GET_BODY}' as it is reserved.`,
			});
		}

		// Encode as flatted JSON. //? Where is flatted used?
		const flattedBody = encodeURIComponent(safeStringify(body));
		workingURL = appendQueryParameters(workingURL, `${GET_BODY}=${flattedBody}`);

		// Leave actualBody as undefined so that nothing is sent with the GET request.
	} else {
		// Otherwise put the body in the body.
		JSONBody = body;
	}

	// Ensure URL length is reasonable.
	if (workingURL.length > constants.MAX_URL_LENGTH) {
		throw new HTTPError({
			message: `HTTP request URL has ${workingURL.length} characters. This is longer than the recommended maximum of ${constants.MAX_URL_LENGTH} and may not be supported in some contexts.`,
		});
	}

	// Always use the JSON_HEADER for server requests.
	const result = await request(method, workingURL, {
		JSONBody,
		headers: constants.JSON_HEADER,
	});

	// Reconstruct if possible.
	//! Only auto-constructs the root object. Any nested objects must be constructed by their callers.
	const constructedResult = sharedRegistry.autoConstruct(result);

	// Throw if the result is an error.
	if (constructedResult instanceof Error) {
		throw constructedResult;
	}

	// Otherwise return the result.
	return constructedResult;
}
