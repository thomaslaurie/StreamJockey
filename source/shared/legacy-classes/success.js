// SUCCESS //C success and error objects are returned from functions (mostly async ones)
import BaseResult from './base-result.js';
import {define} from '../utility/index.js';

export class Success extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {timestamp} = options;
		define.writable(this, {timestamp});
	}
}
