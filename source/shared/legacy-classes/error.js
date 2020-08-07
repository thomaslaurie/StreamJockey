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

// CUSTOM ERROR

export class SilentError extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			log = false,
		} = options;
		define.writable(this, {
			log,
		});
	}
}

// Used to communicate to client that the server does not have the required tokens and that the client must authorize.
export class AuthRequired extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			message = 'authorization required',
		} = options;
		define.writable(this, {
			message,
		});
	}
}

// Used to indicate an unreachable place in the code.
export class Unreachable extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			message = 'code reached a place that should be unreachable',
		} = options;
		define.writable(this, {
			message,
		});
	}
}

// Used to indicate a timed-out function.
export class Timeout extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			message = 'request timed out',
		} = options;
		define.writable(this, {
			message,
		});
	}
}
