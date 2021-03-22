//TODO //? Currently all rules redundantly execute the validator for types they extend, however in some cases this isn't necessary as the condition for the rule also filters for that type. Should these rules just cast to the type without validating (for performance benefits) or does that create too much potential for mistakes?
//TODO Test rules against values.
/* //! //G Manual testing checklist:
	Type extends the correct parent type.
	Type references the correct symbol.
	Constructor is passed that type.
	Validator uses the correct parent validator.
	Validator casts to the passed type.
	Instance references that type.
*/

import Rule2 from '../rule2';
import type {Nominal} from '../../types/index';

// Number
export const number = new Rule2<number>(value => {
	if (typeof value !== 'number') {
		throw new Error('Value is not a number.');
	}
	return value;
});

// Non-NaN Number
const nonNaNNumberSymbol = Symbol();
export type NonNaNNumber = Nominal<number, typeof nonNaNNumberSymbol>;
export const nonNaNNumber = new Rule2<NonNaNNumber>(value => {
	const numberValue = number.validate(value);
	if (Number.isNaN(numberValue)) {
		throw new Error('Number is NaN.');
	}
	return numberValue as NonNaNNumber;
});

// Integer
const integerSymbol = Symbol();
export type Integer = Nominal<NonNaNNumber, typeof integerSymbol>;
export const integer = new Rule2<Integer>(value => {
	const nonNaNNumberValue = nonNaNNumber.validate(value);
	if (!Number.isInteger(nonNaNNumberValue)) {
		throw new Error('Number is not an integer.');
	}
	return nonNaNNumberValue as Integer;
});

//! Defining 0 as neither positive or negative.
//R Using nonNaNNumber validator for its error message, nominal type, and for redundancy.
//G //! //L If not using the nonNanValidator in the future, ensure that the comparisons catch NaN: https://stackoverflow.com/a/26982925

// Positive Number
const positiveNumberSymbol = Symbol();
export type PositiveNumber = Nominal<NonNaNNumber, typeof positiveNumberSymbol>;
export const positiveNumber = new Rule2<PositiveNumber>(value => {
	const nonNaNNumberValue = nonNaNNumber.validate(value);
	if (!(nonNaNNumberValue > 0)) {
		throw new Error('Number is not positive.');
	}
	return nonNaNNumberValue as PositiveNumber;
});

// Negative Number
const negativeNumberSymbol = Symbol();
export type NegativeNumber = Nominal<NonNaNNumber, typeof negativeNumberSymbol>;
export const negativeNumber = new Rule2<NegativeNumber>(value => {
	const nonNaNNumberValue = nonNaNNumber.validate(value);
	if (!(nonNaNNumberValue < 0)) {
		throw new Error('Number is not negative.');
	}
	return nonNaNNumberValue as NegativeNumber;
});

// Non-Negative Number
const nonNegativeNumberSymbol = Symbol();
export type NonNegativeNumber = Nominal<NonNaNNumber, typeof nonNegativeNumberSymbol>;
export const nonNegativeNumber = new Rule2<NonNegativeNumber>(value => {
	const nonNaNNumberValue = nonNaNNumber.validate(value);
	if (!(nonNaNNumberValue >= 0)) {
		throw new Error('Number is not non-negative.');
	}
	return nonNaNNumberValue as NonNegativeNumber;
});

// Non-Positive Number
const nonPositiveNumberSymbol = Symbol();
export type NonPositiveNumber = Nominal<NonNaNNumber, typeof nonPositiveNumberSymbol>;
export const nonPositiveNumber = new Rule2<NonPositiveNumber>(value => {
	const nonNaNNumberValue = nonNaNNumber.validate(value);
	if (!(nonNaNNumberValue <= 0)) {
		throw new Error('Number is not non-positive.');
	}
	return nonNaNNumberValue as NonPositiveNumber;
});

// Positive Integer
export type PositiveInteger = PositiveNumber & Integer;
export const positiveInteger = new Rule2<PositiveInteger>(value => {
	const positiveNumberValue = positiveNumber.validate(value);
	const positiveNumberIntegerValue = integer.validate<PositiveNumber>(positiveNumberValue);
	return positiveNumberIntegerValue;
});

// Negative Integer
export type NegativeInteger = NegativeNumber & Integer;
export const negativeInteger = new Rule2<NegativeInteger>(value => {
	const negativeNumberValue = negativeNumber.validate(value);
	const negativeNumberIntegerValue = integer.validate<NegativeNumber>(negativeNumberValue);
	return negativeNumberIntegerValue;
});

// Non-Negative Integer
export type NonNegativeInteger = NonNegativeNumber & Integer;
export const nonNegativeInteger = new Rule2<NonNegativeInteger>(value => {
	const nonNegativeNumberValue = nonNegativeNumber.validate(value);
	const nonNegativeNumberIntegerValue = integer.validate<NonNegativeNumber>(nonNegativeNumberValue);
	return nonNegativeNumberIntegerValue;
});

// Non-Positive Integer
export type NonPositiveInteger = NonPositiveNumber & Integer;
export const nonPositiveInteger = new Rule2<NonPositiveInteger>(value => {
	const nonPositiveNumberValue = nonPositiveNumber.validate(value);
	const nonPositiveNumberIntegerValue = integer.validate<NonPositiveNumber>(nonPositiveNumberValue);
	return nonPositiveNumberIntegerValue;
});

// Unit Interval //? Is there a better name for this?
const unitIntervalSymbol = Symbol();
export type UnitInterval = Nominal<NonNegativeNumber, typeof unitIntervalSymbol>;
export const unitInterval = new Rule2<UnitInterval>(value => {
	const nonNegativeNumberValue = nonNegativeNumber.validate(value);
	if (!(0 <= nonNegativeNumberValue && nonNegativeNumberValue <= 1)) {
		throw new Error('Value is not a number between 0 and 1.');
	}
	return nonNegativeNumberValue as UnitInterval;
});
