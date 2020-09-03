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
