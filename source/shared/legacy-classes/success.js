// SUCCESS //C success and error objects are returned from functions (mostly async ones)

import Base from './base.js';

export const Success = Base.makeClass('Success', Base, {
	constructorParts: parent => ({
		defaults: {
			// NEW
			timestamp: undefined,
		},
	}),	
});

export const SuccessList = Base.makeClass('SuccessList', Success, {
	constructorParts: parent => ({
		//C wrapper for an array of successful items
		defaults: {
			// OVERWRITE
			reason: 'all items successful',
			content: [],
		},
	}),
});
export const Warn = Base.makeClass('Warn', Success, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: true,
		},
	}),
});

export const Credentials = Base.makeClass('Credentials', Success, {
	constructorParts: parent => ({
		//TODO allowUnknown: true,

		defaults: {
			//TODO this part should only be server-side 
			//TODO consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials
			authRequestKey: Symbol(), //! this shouldn't break checkKey(), but also shouldn't match anything
			authRequestTimestamp: 0,
			authRequestTimeout: 300000, //C default 5 minutes
			authRequestURL: '',
			authCode: Symbol(),
			
			accessToken: Symbol(),
			expires: 0,
			refreshToken: Symbol(),
			refreshBuffer:  60000, //C 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value
			
			scopes: [],
		},
	}),
});