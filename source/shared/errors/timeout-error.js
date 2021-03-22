import {
	define,
} from '../utility/index.ts';
import CustomError from './custom-error.js';

export default class TimeoutError extends CustomError {
	constructor({
		timeout, // Timeout time in milliseconds.
		...rest
	} = {}) {
		super(rest);
		define.constant(this, {
			timeout,
		});
	}
}
