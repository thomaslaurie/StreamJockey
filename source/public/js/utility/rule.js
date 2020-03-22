import define from './define.js';
import { formReferences, extractValues } from './reference.js';
import boolCatch from './bool-catch.js';

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
		const validatorIsSynchronous = validator.constructor.name === 'Function';
		const casterIsSynchronous    = caster.constructor.name === 'Function';

		if (validatorIsSynchronous) {
			define.constant(this, {
				validate(...args) {
					validator(...args);
				},
				test(...args) {
					return boolCatch(() => this.validate(...args));
				},
			});
		} else {
			define.constant(this, {
				async validate(...args) {
					await validator(...args);
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
						caster(...references);
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
						await caster(...references);
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


