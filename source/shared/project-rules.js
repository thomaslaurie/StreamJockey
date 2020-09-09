//G This file is for global rules that are opinionated for this project.
// For example: all identifiers shall be non-negative integers.

//TODO Create test file. Had an error where value was being compared rather than value.length.

//----------
//TODO : server source maps, better route error handling, fix error handling specifically in session.login

import {
	Rule,
	rules,
	Enum,
} from './utility/index.js';

export const id = new Rule({
	validator(value) {
		rules.nonNegativeInteger.validate(value);
	},
	caster(reference) {
		rules.nonNegativeInteger.validateCast(reference);
		// Cannot cast any further than a nonNegativeInteger.
	},
});

//TODO Consider renaming this and have 'position' refer to 1-based indices.
export const position = new Rule({
	validator(value) {
		rules.nonNegativeInteger.validate(value);
	},
	caster(reference) {
		rules.nonNegativeInteger.validateCast(reference);
		// Cannot cast any further than a nonNegativeInteger.
	},
});


// Extracted Rules
//TODO Move these to a better location.

// stringMaxLength: 100,
// bigStringMaxLength: 2000,
// nameMinLength: 3,
// nameMaxLength: 16,

const nameMinLength = 3;
const nameMaxLength = 100;

export const name = new Rule({
	validator(value) {
		rules.trimmedString.validate(value);
		if (!(nameMinLength <= value.length && value.length <= nameMaxLength)) {
			throw new Error(`Name is not between ${nameMinLength} and ${nameMaxLength} characters long.`);
		}
	},
});

const descriptionMaxLength = 2000;

export const description = new Rule({
	validator(value) {
		rules.trimmedString.validate(value);
		if (!(value.length <= descriptionMaxLength)) {
			throw new Error(`Description is not under ${descriptionMaxLength} characters long.`);
		}
	},
});

export const color = new Rule({
	filter: '/#([a-f0-9]{3}){1,2}\b/', //TODO is this correct?
	filterMessage: 'Color must be in hex format #XXXXXX',
	validator(value) {
		if (!/^#([a-f0-9]{3}){1,2}$/.test(value)) {
			throw new Error('Value is not a color.');
		}
	},
});

const passwordMinLength = 6;
const passwordMaxLength = 72; //! As per bcrypt.

export const password = new Rule({
	validator(value) {
		rules.trimmedString.validate(value);

		if (!(passwordMinLength <= value.length && value.length <= passwordMaxLength)) {
			throw new Error(`Password is not between ${passwordMinLength} and ${passwordMaxLength} characters long.`);
		}
	},
});


// Very Opinionated

const visibilityStates = new Enum(
	'public',
	'private',
	'linkOnly',
);

// Basically an enum.
export const visibilityState = new Rule({
	validator(value) {
		if (!Enum.hasKey(visibilityStates, value)) {
			throw new Error('Value is not a valid visibility state.');
		}
	},
});
