import {
	nonNaNNumber
} from './validation/rules/index.js';

export default function (input, min = -Infinity, max = Infinity) {
	// Throw if input is not defined, do not default to 0.
	// Throw on NaN, because whether NaN is 'within' the bounds is implementation dependant on whether x>y or !(x<=y) is used for comparison. The consumer should not be expected to know which.
	nonNaNNumber.validate(input);
	nonNaNNumber.validate(min);
	nonNaNNumber.validate(max);

	if (min > max) throw new Error(`min: ${min} must not be greater than max: ${max}`);
	else if (input < min) return min;
	else if (input > max) return max;
	else return input;
};