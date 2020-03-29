//TODO add validation
//TODO consider replacing typechecks with a 'comparable' rule.

import stableSort from './stable-sort.js';

export default function (list, ascending, prop) {
	//C sorts a list in ascending or descending order by the numeric or string-converted value of its items or their properties if a prop is defined

	//C ascending will flip the list into descending if false
	if (ascending) {
		ascending = 1;
	} else {
		ascending = -1;
	}

	let compare;
	if (typeof prop === 'string') {
		//C if prop is defined, compare props
		if (list.every(item => (typeof item[prop] === 'number') || typeof item[prop] === 'boolean')) {
			//C if values are numbers or boolean, do number compare
			compare = function (a, b) {
				return (a[prop] - b[prop]) * ascending;
			}
		} else {
			//C if values are strings, other, or mixed, do a string conversion and string compare
			compare = function (a, b) {
				//C convert to strings
				let as = a[prop] + '';
				let bs = b[prop] + '';

				//C string compare
				//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
				return as.localeCompare(bs, 'en', {sensitivity: 'base'}) * ascending;
			}
		}
	} else {
		//C if no prop is defined, compare values
		//! this is the exact same as above, just without the property
		if (list.every(item => (typeof item === 'number') || typeof item === 'boolean')) {
			compare = function (a, b) {
				return (a - b) * ascending;
			}
		} else {
			compare = function (a, b) {
				let as = a + '';
				let bs = b + '';
				return as.localeCompare(bs, 'en', {sensitivity: 'base'}) * ascending;
			}
		}
	}

	return stableSort(list, compare);
};