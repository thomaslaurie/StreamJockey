import {
	dynamicClass,
	define, //TODO evaluate if these things can be constants
} from './utility/index.js';

export default dynamicClass.create('Credentials', {
	instance: ({
		//TODO this part should only be server-side 
		//TODO consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials
		//! this shouldn't break sj.checkKey(), but also shouldn't match anything
		authRequestKey = Symbol(), 
		authRequestTimestamp = 0,
		//C default 5 minutes
		authRequestTimeout = 300000, 
		authRequestURL = '',
		authCode = Symbol(),
		
		accessToken = Symbol(),
		expires = 0,
		refreshToken = Symbol(),
		//C 1 minute 
		//TODO figure out what the expiry time is for these apis and change this to a more useful value
		refreshBuffer = 60000, 
		
		scopes = [],
	} = {}) => ({
		//TODO allowUnknown: true, //?

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
	}),
});
