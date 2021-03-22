// Holds timestamp metadata for data to be transferred.

import {define} from './utility/index.ts';

export default class MetadataContainer {
	constructor(options = {}) {
		const {
			data,
			timestamp = null,
		} = options;

		define.constant(this, {
			data,
			timestamp,
		});
	}
}
