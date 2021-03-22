// Wrapper for the fetch function.
// Has better validations for inputs.
// Has an extra queryParameters option that can be used to add query parameters to the URL.
// Has an extra JSONBody option that can be used to stringify an input and use it as the body.
// Interprets the fetch API's return values.

import {
	constants,
	rules,
	getKeysOf,
	encodeProperties,
	appendQueryParameters,
} from './utility/index.ts';
import {
	urlRule,
	fetch,
	safeStringify,
} from './derived-utility/index.js';
import propagate from './propagate.js';
import {
	CustomError,
	InternalError,
} from './errors/index.js';

export default async function request(method, URL, {
	// Custom
	queryParameters,
	JSONBody,

	// Fetch
	headers = constants.JSON_HEADER,
	body,
	...rest
}) {
	/* //!//G use UPPERCASE HTTP methods.
		In the fetch API, 'PATCH' is case-sensitive where GET, POST, DELETE aren't
		//L Its absurd, but apparently intentional:
		//L https://stackoverflow.com/questions/34666680/fetch-patch-request-is-not-allowed
		//L https://github.com/whatwg/fetch/issues/50
		//L https://github.com/github/fetch/pull/243
	*/

	// Transform jsonBody to body string.
	if (JSONBody !== undefined) {
		if (body !== undefined) {
			throw new InternalError({message: 'Request may not use both a string body and a JSONBody.'});
		}
		body = safeStringify(JSONBody);
	}

	// Encode and append queryParameters to the URL.
	if (queryParameters !== undefined) {
		rules.queryParameters.validate(queryParameters);
		const encodedParameters = encodeProperties(queryParameters);
		URL = appendQueryParameters(URL, encodedParameters);
	}

	// VALIDATION
	rules.string.validate(method);
	urlRule.validate(URL);
	rules.headers.validate(headers);
	if (body !== undefined) rules.body.validate(body);
	// Check that rest doesn't have any unused options.
	for (const key of getKeysOf(rest, {
		own: true,
		named: true,
		enumerable: true,

		inherited: false,
		symbol: false,
		nonEnumerable: false,
	})) {
		if (![
			//L From: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
			// Except 'method', 'headers', 'body'.
			'mode',
			'credentials',
			'cache',
			'redirect',
			'referrer',
			'referrerPolicy',
			'integrity',
			'keepalive',
			'signal',
		].includes(key)) {
			throw new InternalError({
				message: `Request has an unused option ${key}. This is a mistake.`,
				userMessage: 'Request failed due to an internal error.',
			});
		}
	}

	//L fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	//L When fetch throws: https://www.tjvantoll.com/2015/09/13/fetch-and-errors
	const result = await fetch(URL, {
		...rest,
		method,
		headers,
		body,
	}).catch(propagate); //TODO Add custom handlers for fetch errors.

	// Return undefined if request was successful with no content returned.
	if (result.status === 204) return undefined;

	//TODO Consider adding custom handlers for other return types.

	// Extract raw and parsed results.
	//L fetch parsing: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
	const rawResult = await result.clone().text().catch(rejected => {
		// Record the raw result for easier debugging.
		throw new CustomError({
			message: 'Failed to parse fetch response as raw text.',
			userMessage: 'Request failed.',
			value: {
				error: rejected,
				rawResult,
			},
		});
	});

	// Throw non-ok status codes.
	if (!result.ok) throw propagate(rawResult);

	//TODO consider custom handlers for http errors (ie 404s etc.);

	// If the parse fails, throw an error containing the raw result.
	const parsedResult = await result.clone().json().catch(() => propagate(rawResult));

	return parsedResult;
}
