import sourceParts from '../shared/source-parts.js';
import {define} from '../shared/utility/index.ts';

export default class Source {
	constructor(...args) {
		sourceParts.intercept(...args);
		sourceParts.instance(this, ...args);

		const [{
			serverTestProp = null,
		}] = args;

		define.constant(this, {
			serverTestProp,
		});
	}
}

sourceParts.prototype(Source);
sourceParts.static(Source);
