/* //TODO This isn't 100% complete:
	Are non-enumerable / symbol properties used?
	Are all strings compatible 'ByteString's?
*/

//R Not using the native Header interface here because it doesn't validate header names or values.

import Rule from '../../rule.js';
import object from '../objects/object.js';
import {string} from '../strings.js';

export default new Rule({
	validator(value) {
		object.validate(value);

		for (const key in value) {
			const headerValue = value[key];

			// Header value must be a string.
			string.validate(headerValue);

			// Header name must not be forbidden.
			//L Forbidden header names: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
			if (key.startsWith('Proxy-')) {
				throw new Error(`The HTTP header ${key} is invalid because it starts with 'Proxy-'`);
			}
			if (key.startsWith('Sec-')) {
				throw new Error(`The HTTP header ${key} is invalid because it starts with 'Sec-'`);
			}
			for (const forbiddenName of [
				'Accept-Charset',
				'Accept-Encoding',
				'Access-Control-Request-Headers',
				'Access-Control-Request-Method',
				'Connection',
				'Content-Length',
				'Cookie',
				'Cookie2',
				'Date',
				'DNT',
				'Expect',
				'Feature-Policy',
				'Host',
				'Keep-Alive',
				'Origin',
				'Referer',
				'TE',
				'Trailer',
				'Transfer-Encoding',
				'Upgrade',
				'Via',
			]) {
				if (key === forbiddenName) {
					throw new Error(`The HTTP header ${key} is forbidden.`);
				}
			}
		}
	},
});
