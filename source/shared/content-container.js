//G Should have a 'content' property, but can also be used to include metadata, like a timestamp.
//TODO Expand into specific classes. Eg. TimestampedContent

import {define} from './utility';

export default class ContentContainer {
	constructor(options = {}) {
		define.writable(this, {
			...options,
		});
	}
}
