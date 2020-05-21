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