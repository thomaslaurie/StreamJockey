/* TODO Casting ideas
	Consider changing the method name 'validateCast' it is not intuitive that this is the main casting function and that it returns a value. That or make validate return the passed values.
	Consider adding the cast modifier onto the end of the validate/test functions like: rule.validate.cast() and rule.test.cast()
	Ensure that validate and validateCast both return values
	Rename to .validate(), .test(), .cast(), .testCast()
*/
//TODO consider duplicating define here, so that define can use rules

import define from '../object/define.js';
import {formReferences, extractValues} from '../reference.js';
import boolCatch from '../bool-catch.ts';

export class Rule {
	constructor({
		/* //G
			Should do nothing on success, throw on failure.
			Should have one or many sequential and/or parallel conditions.
			May be sync or async.

			If using other rules' validators, use validate() and pass the same arguments.
		*/
		validator = function () {
			throw new Error('A validator has not been created for this rule.');
		},
		/* //G
			Receives Reference instances as its arguments.
			Should modify Reference instance 'value' property on success, throw on failure.
			Should have one or many sequential mutations.
			May be sync or async.
			//! Caster does not implicitly exclude redundant casts. Ie, for a symbol rule, if x is already a symbol, the caster for the symbol will still execute and throw a type error as symbols cannot be converted to strings. Must include a redundancy check for rules that require it.

			If using other rules' casters, use validateCast() and pass the same References.
			Do not pass reference.value and do not set any reference.value as the result of a validateCast(), the nested caster will mutate the passed arguments directly.

			//! If the References are mutated or passed incorrectly validateCast() may not have the correct value to validate could throw incorrect errors for upstream values: '4' validateCasted to an odd number would fail as 'not a number' instead of 'not odd'.
		*/
		caster = function () {},

		//R Indexed reasons, placeholder reasons, etc. should not be used, its too complicated. Just create sub-rules for each failure type or store custom, identifiable errors directly on the rule by including more option properties.
		//? Why not just use closure values?
		...rest
	}) {
		const errors = [];
		if (typeof validator !== 'function') errors.push('validator is not a function');
		if (typeof caster !== 'function') errors.push('caster is not a function');
		if (errors.length > 0) throw new Error(errors.join(' and '));


		// store
		define.identity(this, rest);
		define.constant(this, {validator, caster});

		// false when x.constructor.name === 'AsyncFunction'
		const validatorIsSynchronous = this.validator.constructor.name === 'Function';
		const casterIsSynchronous    = this.caster.constructor.name === 'Function';

		// Validate/test functions are bound to the instance because they may be copied to another object.

		if (validatorIsSynchronous) {
			define.constant(this, {
				validate: (function validate(...args) {
					this.validator(...args);
					return args;
				}).bind(this),
				test: (function test(...args) {
					return boolCatch(() => this.validate(...args));
				}).bind(this),
			});
		} else {
			define.constant(this, {
				validate: (async function validate(...args) {
					await this.validator(...args);
					return args;
				}).bind(this),
				test: (async function test(...args) {
					return boolCatch(async () => this.validate(...args));
				}).bind(this),
			});
		}

		if (validatorIsSynchronous && casterIsSynchronous) {
			define.constant(this, {
				validateCast: (function validateCast(...args) {
					// If call is the entry-point, will convert values to reference-values. If call is nested, nothing will change.
					const references = formReferences(args);

					try {
						this.caster(...references);
					} catch (e) {} // Suppress casting errors, just get as far as possible.

					const values = extractValues(references);
					this.validate(...values);
					return values;
				}).bind(this),
				testCast: (function testCast(...args) {
					return boolCatch(() => this.validateCast(...args));
				}).bind(this),
			});
		} else {
			define.constant(this, {
				validateCast: (async function validateCast(...args) {
					const references = formReferences(args);

					try {
						await this.caster(...references);
					} catch (e) {}

					const values = extractValues(references);
					await this.validate(...values);
					return values;
				}).bind(this),
				testCast: (async function testCast(...args) {
					return boolCatch(async () => this.validateCast(...args));
				}).bind(this),
			});
		}
	}
}

export default Rule;
