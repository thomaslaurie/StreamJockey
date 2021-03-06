import {define} from './utility/index.ts';

export default class Warn {
	constructor(options = {}) {
		const {
			log = true,
			message,
			reason,
			content,
		} = options;
		define.writable(this, {
			log,
			message,
			reason,
			content,
		});
	}
}
