import {
	define,
} from '../utility/index.ts';
import CustomError from './custom-error.js';

export default class UnexpectedValueThrown extends CustomError {
	constructor({
		value, // The value that was thrown.
		...rest
	} = {}) {
		super(rest);
		define.constant(this, {
			value,
		});
	}
}
