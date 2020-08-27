import {define} from './utility/index.js';

export default class Credentials {
	constructor(options = {}) {
		//TODO allowUnknown: true,
		const {
			//TODO This part should only be server-side.
			//TODO Consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials.
			authRequestKey = Symbol(), //! This shouldn't break checkKey(), but also shouldn't match anything.
			authRequestTimestamp = 0,
			authRequestTimeout = 300000, // default 5 minutes
			authRequestURL = '',
			authCode = Symbol(),

			accessToken = Symbol(),
			expires = 0,
			refreshToken = Symbol(),
			refreshBuffer = 60000, // 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value

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
