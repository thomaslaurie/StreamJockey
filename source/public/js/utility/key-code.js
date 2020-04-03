import {
	Rule,
	commonRules,
} from './index.js';

const packRule = new Rule({
	validator(value) {
		commonRules.object.validate(value);
		commonRules.string.validate(value.key);
		commonRules.nonNegativeInteger.validate(value.timestamp);
		commonRules.nonNegativeInteger.validate(value.timeout);
	},
});

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export function create(length = 10) {
	// Validate input.
	commonRules.nonNegativeInteger.validate(length);

	// Create.
	let key = '';
	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * characters.length);
		key += characters.charAt(index);
	}

	// Validate output.
	commonRules.string.validate(key);

	// Return.
	return key;
};

const defaultTimeout = 300000; // 5 minutes
const tryLimit = 1000;
export function addTo(list, timeout = defaultTimeout) {
	// Validate inputs.
	commonRules.array.validate(list);
	commonRules.nonNegativeInteger.validate(timeout);

	// Create.
	const key = repeat(() => create(), {
		until: (key) => !list.includes(key),
		countout: tryLimit,
		onCountout() { 
			throw new Error(`Failed to add key to list, took over ${tryLimit} tries.`);
		},
	});
	const timestamp = Date.now();
	const pack = {
		key, 
		timestamp, 
		timeout: timestamp + timeout,
	};

	// Validate output.
	packRule.validate(pack);

	// Return.
	list.push(pack);
	return pack;
};

// Checks if a list has a key. Cleans up timed-out keys.
export function verify(list, key) {
	// Validate inputs.
	commonRules.array.validate(list);
	commonRules.string.validate(key);

	// Iterate over list.
	for (let i = list.length - 1; i >= 0; i--) {
		const pack = list[i];

		// Validate items in the list.
		packRule.validate(pack);

		// Determine if item has timed out.
		const fresh = pack.timeout > Date.now;

		if (pack.key === key) {
			// If key matches,
			if (fresh) {
				// and it hasn't timed out, remove the pack from the list and return it,
				return list.splice(i, 1)[0];
			} else  {
				// else throw a timeout error.
				throw new Error('Key timed out.');
			}
		} else {
			// Remove non-matching packs if they've timed out.
			if (!fresh) {
				list.splice(i, 1);
			}
		}
	}

	// If the key isn't found, throw an error.
	throw new Error('Invalid key.');
};