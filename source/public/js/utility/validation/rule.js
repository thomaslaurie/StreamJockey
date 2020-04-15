//TODO consider changing the method name 'validateCast' it is not intuitive that this is the main casting function and that it returns a value. That or make validate return the passed values.
//TODO consider adding the cast modifier onto the end of the validate/test functions like: rule.validate.cast() and rule.test.cast()
//TODO ensure that validate and validateCast both return values


//TODO rename to .validate(), .test(), .cast(), .testCast()

import define from '../object/define.js';
import {formReferences, extractValues} from '../reference.js';
import boolCatch from '../bool-catch.js';

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

		if (validatorIsSynchronous) {
			define.constant(this, {
				validate(...args) {
					this.validator(...args);
					return args;
				},
				test(...args) {
					return boolCatch(() => this.validate(...args));
				},
			});
		} else {
			define.constant(this, {
				async validate(...args) {
					await this.validator(...args);
					return args;
				},
				async test(...args) {
					return boolCatch(async () => await this.validate(...args));
				},
			});
		}

		if (validatorIsSynchronous && casterIsSynchronous) {
			define.constant(this, {
				validateCast(...args) {
					// If call is the entry-point, will convert values to reference-values. If call is nested, nothing will change.
					const references = formReferences(args);

					try {
						this.caster(...references);
					} catch (e) {} // Suppress casting errors, just get as far as possible.
	
					const values = extractValues(references);
					this.validate(...values);
					return values;
				},
				testCast(...args) {
					return boolCatch(() => this.validateCast(...args));
				},
			});
		} else {
			define.constant(this, {
				async validateCast(...args) {
					const references = formReferences(args);

					try {
						await this.caster(...references);
					} catch (e) {}
	
					const values = extractValues(references);
					await this.validate(...values);
					return values;
				},
				async testCast(...args) {
					return boolCatch(async () => await this.validateCast(...args));
				},
			});
		}
	}
};

export default Rule;


