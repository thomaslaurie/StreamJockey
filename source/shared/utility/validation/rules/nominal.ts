import Rule2 from '../rule2';
import type {Nominal} from '../../types/nominal';
import type {NonNegativeInteger} from './numbers';
import {nonNegativeInteger} from './numbers';

// Timestamp
const timestampSymbol = Symbol();
export type Timestamp = Nominal<NonNegativeInteger, typeof timestampSymbol>;
export const timestamp = new Rule2<Timestamp>(value => {
	const nonNegativeIntegerValue = nonNegativeInteger.validate(value);
	if (Number.isNaN(nonNegativeIntegerValue)) {
		throw new Error('Number is NaN.');
	}
	return nonNegativeIntegerValue as Timestamp;
});
