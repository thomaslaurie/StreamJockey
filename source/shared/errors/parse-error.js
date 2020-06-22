import {
	define,
} from '../utility/index.js';
import CustomError from './custom-error.js';

export default class ParseError extends CustomError {
	constructor({
		input,
		...rest
	} = {}) {
		super(rest);
		define.constant(this, {
			input,
		});
	}
}
