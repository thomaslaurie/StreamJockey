import {rules} from './validation/index.js';

/**
 * Repeats a function until a condition is met or the call times-out or counts-out.
 * Guaranteed to call the function at least once.
 * 
 * @param {Function} func               - Function to repeat.
 * @param {Object}   options
 * @param {Function} options.until      - Condition upon which the function will stop.
 * @param {number}   options.timeout    - Number of milliseconds the function may repeat for.
 * @param {number}   options.countout   - Number of times the function may execute.
 * @param {Function} options.onTimeout  - Called when repeat times out.
 * @param {Function} options.onCountout - Called when repeat counts out.
 */
function repeat(func, options = {}) {
	const {
		until      = (result) => false,
		timeout    = Infinity,
		countout   = Infinity,
		onTimeout  = (lastResult) => { throw new Error('Repeat function call timed out.');   },
		onCountout = (lastResult) => { throw new Error('Repeat function call counted out.'); },
	} = options;

	rules.func.validate(func);
	rules.func.validate(until);
	rules.nonNegativeNumber.validate(timeout); // >= 0
	rules.positiveNumber.validate(countout);   // >= 1
	rules.func.validate(onTimeout);
	rules.func.validate(onCountout);

	let result;
	let counter = 0;
	let time = Date.now();

	const timeLimit = time + timeout;
	const countLimit = Math.floor(countout);

	while (true) {
		result = func();

		//R Evaluating until(result) after function instead of as the while condition because it wouldn't make sense to evaluate 'until' before the function has run. This way the function is guaranteed to run at least once.
		if (until(result)) break;

		// Update 
		time = Date.now();
		counter++;

		if (time    >= timeLimit)  {
			onTimeout(result);
			break;
		}
		if (counter >= countLimit) {
			onCountout(result);
			break;
		}
	}

	return result;
};

// Async Variation
repeat.sync = repeat;
repeat.async = async function (func, options = {}) {
	const {
		until      = (result) => false, // Condition upon which the function will stop.
		timeout    = Infinity,          // Number of milliseconds the function may repeat for.
		countout   = Infinity,          // Number of times the function may execute.
		onTimeout  = (lastResult) => { throw new Error('Repeat function call timed out.');   },
		onCountout = (lastResult) => { throw new Error('Repeat function call counted out.'); },
	} = options;

	rules.func.validate(func);
	rules.func.validate(until);
	rules.nonNegativeNumber.validate(timeout); // >= 0
	rules.positiveNumber.validate(countout);   // >= 1
	rules.func.validate(onTimeout);
	rules.func.validate(onCountout);

	let result;
	let counter = 0;
	let time = Date.now();

	const timeLimit = time + timeout;
	const countLimit = Math.floor(countout);

	while (true) {
		result = await func();

		//R Evaluating until(result) after function instead of as the while condition because it wouldn't make sense to evaluate 'until' before the function has run. This way the function is guaranteed to run at least once.
		if (await until(result)) break;

		// Update 
		time = Date.now();
		counter++;

		if (time    >= timeLimit)  {
			await onTimeout(result);
			break;
		}
		if (counter >= countLimit) {
			await onCountout(result);
			break;
		}
	}

	return result;
};

export default repeat;
