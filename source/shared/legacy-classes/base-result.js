import {define} from '../utility/index.js';

export default class BaseResult {
	constructor(options = {}) {
		const {
			// debug
			log = false,

			// info
			code = 200,
			type = 'Ok',
			origin = '',
			trace = '', // //! this traces when the object is created, not where announce is called - this might have to be changed, this on create property could replace origin though

			// content
			message = '',
			reason = '',
			content = {},

			...rest
		} = options;

		define.writable(this, {
			log,

			code,
			type,
			origin,
			trace,

			message,
			reason,
			content,

			// ...rest, this causes issues, child class instances (User) will become very large and take very long to stringify
		});
	}
}

define.writable(BaseResult.prototype, {
	announce() {
		//R this replaces a need to log the result of functions and removes the intermediate steps need to do so (let result = new Object;, log;, return;)
		console.log(`▮\n${this.constructorName} ${this.origin} ${this.message}\n${this.constructor.trace()}\n▮`);
		//OLD//! Don't add these back in, they will be a circular dependency.
		// if (this instanceof Error) {
		// 	console.error(`✗ ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ ✗ `);
		// } else if (this instanceof Warn) {
		// 	console.warn(`W ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ W `);
		// } else {
		// 	console.log(`✓ ▮ ${this.constructorName} ${this.origin} ${this.message}\n${this.trace()}`); //
		// }
	},
});
define.writable(BaseResult, {
	allowUnknown: false,
	trace() {
		try {
			throw Error('');
		} catch (e) {
			//TODO figure out how to properly display newlines as strings inside objects

			//C get stack
			const stackTrace0 = e.stack;
			//C 'file:///' is removed (so that the URIs are clickable in node)
			const stackTrace1 = replaceAll(stackTrace0, 'file:///', '');
			//C remove leading 'Error\n    ', to reduce confusion because trace isn't an error
			const stackTrace2 = replaceAll(stackTrace1, 'Error\n', '');
			//C removes any line with Object.sj.trace

			let ignore = [
				'Object.sj.trace',
				'new Base',
				'new Error',
				'Object.sj.catchUnexpected',
				'Object.sj.propagate',
				'sj.Error.announce',
			];
			ignore = replaceAll(ignore.join('|'), '.', '\.');
			const exp = new RegExp(`(?:(?:\\n|\n|\r|$)* *at(?: |\\n|\n|\r|$))(?:${ignore})(?:.+?(?=\\n|\n|\r|$))`, 'g');
			const stackTrace3 = replaceAll(stackTrace2, exp, '');

			return stackTrace0;
		}
	},
});
