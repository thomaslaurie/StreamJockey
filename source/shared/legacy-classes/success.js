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

// Wrapper for an array of successful items.
export class SuccessList extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			reason = 'all items successful',
			content = [],
		} = options;
		define.writable(this, {reason, content});
	}
}

export class Warn extends BaseResult {
	constructor(options = {}) {
		super(options);
		const {
			log = true,
		} = options;
		define.writable(this, {log});
	}
}

export class Credentials extends BaseResult {
	constructor(options = {}) {
		super(options);
		
		//TODO allowUnknown: true,
		const {
			//TODO this part should only be server-side 
			//TODO consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials
			authRequestKey = Symbol(), //! this shouldn't break checkKey(), but also shouldn't match anything
			authRequestTimestamp = 0,
			authRequestTimeout = 300000, //C default 5 minutes
			authRequestURL = '',
			authCode = Symbol(),
			
			accessToken = Symbol(),
			expires = 0,
			refreshToken = Symbol(),
			refreshBuffer = 60000, //C 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value
			
			scopes = [],
		} = options;
		define.writable(this, {
			authRequestKey,
			authRequestTimestamp,
			authRequestTimeout,
			authRequestURL,
			authCode,
			
			accessToken,
			expires,
			refreshToken,
			refreshBuffer,
			
			scopes,
		});
	}
}
