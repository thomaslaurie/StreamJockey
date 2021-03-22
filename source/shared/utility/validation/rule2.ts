//G The validator returns the passed value so that it can be used inline for initialization.
//G Rules for primitives should use a nominal type. Casting to this type should always be done via rule.validate. //R That way incorrectly casting a nominal value doesn't happen.
//G The passed validator should not reference 'this' as Rule.validate and Rule.test methods are meant to be assigned to other variables. //R As a redundancy, validate and test are bound to the instance upon initialization, so they will call identically even if copied to another object.
/* //R No async rules because:
	Async rules are rare.
	Async rules introduce unnecessary complexity.
*/
/* //R No casting functions because:
	Casting is rare.
	Casting often differs between implementations.
	Casting functions introduce opinion.
	Casting logic introduces unnecessary complexity.
*/
//R Do not need to use ReturnType<typeof rule.validator> to get the correct type of a rule because if the incorrect type is used, then Typescript will raise an error anyways.
//L Type Predicate: https://dev.to/daveturissini/aha-understanding-typescript-s-type-predicates-40ha


//TODO How to make an instanceof Rule with proper typing?
// Something like: type Test<T> = <U extends T = T>(value: unknown, ...args: unknown[]) => value is U; ?

import boolCatch from '../bool-catch';

// Functions must be passed at least one argument so that a predicate can be used.
// Optional generic V is used so that return type doesn't wipe out an existing type if passed.
type Validator<T> =              (value: unknown, ...args: unknown[]) => T;
type Validate<T>  = <V = unknown>(value: V,       ...args: unknown[]) => V & T;
type Test<T>      = <V = unknown>(value: V,       ...args: unknown[]) => value is V & T;

export default class Rule<T> {
	readonly validator: Validator<T>;
	readonly validate:  Validate<T>;
	readonly test: Test<T>;
	constructor(validator: Validator<T>) {
		this.validator = validator;

		// Arrow function wrapper binds functions to this instance.
		this.validate = <V>(value, ...args) => {
			return this.validator(value, ...args) as V & T;
		};
		this.test = <V>(value, ...args): value is V & T => {
			return boolCatch(() => this.validate(value, ...args));
		};
	}
}
