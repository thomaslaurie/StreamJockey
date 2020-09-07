//TODO refactor this function out in favor of more specific validators.
// global-server is the last place that uses this because there are some places where the validators use isEmpty but I couldn't figure out if they were intentionally generic.

import {
	rules,
} from '../../shared/utility/index.js';

export default function isEmpty(input) {
	// null, undefined, and whitespace-only strings are 'empty' //! also objects and arrays
	return !(
		rules.boolean.test(input)
        || rules.number.test(input)
        // Check for empty and whitespace strings and string conversions of null and undefined.
        //TODO //! this will cause issues if a user inputs any combination of these values, ban them at the user input step.
        || (rules.string.test(input) && input.trim() !== '' && input.trim() !== 'null' && input.trim() !== 'undefined')
        || (rules.object.test(input) && Object.keys(input).length > 0)
        || (rules.array.test(input) && input.length > 0)
	);
}
