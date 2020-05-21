import Base from './base.js';

export const Err = Base.makeClass('Error', Base, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: true, //TODO remove log: true from errors
			code: 400,
			type: 'Bad Request',
		},
	}),
});
export const ErrorList = Base.makeClass('ErrorList', Err, {
	constructorParts: parent => ({
		//C wrapper for an array with one or more errors
		defaults: {
			// OVERWRITE
			reason: 'one or more errors occurred with items',
			content: [],
		},
	}),
});

// CUSTOM ERROR
export const SilentError = Base.makeClass('SilentError', Err, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: false,
		},
	}),
});
export const AuthRequired = Base.makeClass('AuthRequired', Err, {
	//C used to communicate to client that the server does not have the required tokens and that the client must authorize
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			message: 'authorization required',
		},
	}),
});
export const Unreachable = Base.makeClass('Unreachable', Err, {
	//C used to indicate an unreachable place in the code
	constructorParts: parent => ({
		defaults: {
			message: 'code reached a place that should be unreachable',
		},	
	}),
});
export const Timeout = Base.makeClass('Timeout', Err, {
	//C used to indicate a timed-out function
	constructorParts: parent => ({
		defaults: {
			message: 'request timed out',
		},
	}),
});