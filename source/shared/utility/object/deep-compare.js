import {rules} from '../validation/index.js';

const compareDeeper = function (a, b, options) {
	const {depth} = options;
	return deepCompare(a, b, {
		...options, 
		depth: depth - 1,
	});
};
const logDifferenceFunction = function (key, aValue, bValue) {
	console.log(`deepCompare property difference - ${key}: ${aValue}, ${bValue}`);
};

export const defaultOptions = {
	//C 0 based, will call depth+1 layers of comparisons
	depth: 1,

	//C used for custom comparisons (like un-ordered lists)
	//! do not use a compare function that is or contains deepCompare, else falsy comparisons will run deepCompare twice per property
	compareFunction: compareUnorderedArrays = (a, b) => a === b,

	//C used to compare object keys with specific attributes (enumerable, symbol, inherited, etc.)
	//C used for custom key selection (inherited, enumerable, symbol, etc.)
	selectFunction: Object.keys,

	//C true:  compare selected key-values on x to the same key-values anywhere on y
	//C false: compare selected key-values on x to the same key-values selected on y
	anywhere: false,

	//C true:  compares a against b 
	//C false: compares a against b and b against a
	//? what if subsetting needs to stop a specific depth?
	//R no need to specify dual-subset, because then a and b would be identical sets, which is equivalent to specifying no subset
	subset: false,

	//C compare result for values that are too deep
	resultIfTooDeep: false,

	logDifference: false,
};

export default function deepCompare(a, b, options = {}) {
	const {
		depth,
		compareFunction,
		selectFunction,
		anywhere,
		subset,
		resultIfTooDeep,
		logDifference,
	} = {
		...defaultOptions,
		...options,
	};

	// limit to depth
	if (depth < 0) return resultIfTooDeep;

	// compare values
	if (compareFunction(a, b, options)) return true;

	// compare properties
	if (rules.object.test(a) && rules.object.test(b)) {
		let result = true;

		// selected keys
		const aSelectedKeys = selectFunction(a);
		const bSelectedKeys = selectFunction(b);

		//C compare all selected key-values of a to the same (any or selected) key-value of b
		for (const key of aSelectedKeys) {
			const aValue = a[key];
			const bValue = (anywhere || bSelectedKeys.includes(key)) ? b[key] : undefined;

			if (!compareDeeper(aValue, bValue, options)) {
				result = false;
				if (logDifference) logDifferenceFunction(key, aValue, bValue);
			}
		}

		if (!subset) {
			//C compare remaining selected key-values of b to the same (any or non-existent) key-value of a

			//C compare 
			//R prevents shared selected keys from being compared twice
			for (const key of bSelectedKeys) { if (!aSelectedKeys.includes(key)) {
				//C exclude shared selected keys
				
				//C no need to check for the same selected key in a, they have been excluded
				const aValue = anywhere ? a[key] : undefined;
				const bValue = b[key];

				//! value order is not flipped, this would cause the subset to go both ways
				if (!compareDeeper(aValue, bValue, options)) {
					result = false;
					if (logDifference) logDifferenceFunction(key, aValue, bValue);
				}
			}}
		}

		return result;
	}

	return false;
};

// COMPARE FUNCTIONS
export function compareUnorderedArrays(a, b, options) {
	//R The 'anywhere' option isn't relevant here because arrays cannot inherit index properties. (Even with a replaced prototype, deleted 'hole', etc.)

	// If a and b are arrays:
	if (rules.array.test(a) && rules.array.test(b)) {
		// Match if:
		let result = true;
		// All items of a exist in b.
		if (    a.some((item) => !b.includes(item))) result = false;
		// And if not a subset comparison.
		if (!subset) {
			// All items of b exist in a.
			if (b.some((item) => !a.includes(item))) result = false;
		}
		return result;
	} else {	
		// Use the default compare function.
		return defaultOptions.compareFunction(a, b, options);
	}
};

//L diagrams: https://www.figma.com/file/57kSw6SaPX3qJUSdzMpfJo/Object-Property-Locations-Comparison?node-id=0%3A1

/* differences from original
	renamed to 'deepCompare'
	deep option removed
	depth decreased by 1 (depth 0 now compares a, b; depth 1 compares a.foo, b.foo, and so on)
	top-level NaN equality removed
	renamed matchIfTooDeep to resultIfTooDeep
	renamed matchIfSubset to subset
	no-longer compares against b keys from anywhere by default, set anywhere: true, otherwise just compares against same selection from b
*/
