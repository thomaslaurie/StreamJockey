import {
	define,
} from '../utility/index.js';
import CustomError from './custom-error.js';
import {image} from '../derived-utility/index.js';

export default class InvalidStateError extends CustomError {
	constructor({
		state,
		...rest
	} = {}) {
		super(rest);
		define.constant(this, {
			state: image(state),
		});
	}
}
