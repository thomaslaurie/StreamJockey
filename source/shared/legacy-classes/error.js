import BaseResult from './base-result.js';
import {define} from '../utility/index.js';

export class Err extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			log = true,
			code = 400,
			type = 'Bad Request',
		} = options;
		define.writable(this, {
			log,
			code,
			type,
		});
	}
}

// Wrapper for an array with one or more errors.
export class ErrorList extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			reason = 'one or more errors occurred with items',
			content = [],
		} = options;
		define.writable(this, {
			reason,
			content,
		});
	}
}
