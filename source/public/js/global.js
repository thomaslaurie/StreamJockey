// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//G JAVASCRIPT GUIDES
		//L Default arguments and parameter destructuring: https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6/
		
		//L nesting optimization: https://thorstenlorenz.wordpress.com/2012/06/02/performance-concerns-for-nested-javascript-functions/

		Promises: promises always return more promises (that are resolved or rejected), await (and furthermore async) is only needed to transform those resolved or rejected promises in to useable values, promises can be called and returned within a synchronous function (like map) they just pass on their evaluation to whatever they were returned to (see the implementation of Promise.all(...map()))
		//G catches should be attached behind every async function and not paired next to .then() - this straightens out the chain ordering (as opposed to two steps forward, one step back -style), this also stops upstream errors from triggering all downstream catches and nesting every error
		
		//L Arrow Functions: when not to use - https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/

		//L es modules: https://developers.google.com/web/fundamentals/primers/modules, http://2ality.com/2014/09/es6-modules-final.html
		//L export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
		//L import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
		//L es modules in node (VERY USEFUL FOR HOW TO CONVERT TO ES MODULES): https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71

		//G Object.assign(sj.Base, {...}) is used to assign static variables and methods
		//G (function () {..}).call(sj.Base); is better 

		//G use guard clauses over else statements where possible - because they keep the relative error close by in the script (rather than way down below at the bottom of an else statement or early escape function (using positively phrased clauses)) - see sj.rebuild()

		//C arrow functions can have an implicit return, but for object literals, they need to be wrapped in parenthesis to be distinguished from the function block 
		//L https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

		//L classes: https://medium.com/@robertgrosse/how-es6-classes-really-work-and-how-to-build-your-own-fd6085eb326a

		//L prototypes explained: https://hackernoon.com/understand-nodejs-javascript-object-inheritance-proto-prototype-class-9bd951700b29
		'The prototype is a property on a constructor function that sets what will become the __proto__ property on the constructed object.'

		//L beware the comma operator in if-statements: https://stackoverflow.com/questions/5347995/why-does-javascript-accept-commas-in-if-statements

	//G STYLE GUIDES
		//R use null in places where there should be an manually placed empty value - distinguishes between unintentional empty values: undefined, and intentional empty values: null
		//L "To distinguish between the two, you may want to think of undefined as representing an unexpected absence of value and null as representing an expected absence of value."
    	//L http://ryanmorr.com/exploring-the-eternal-abyss-of-null-and-undefined/
		

	//L DEV TOOLS
		//L ASCII TITLE GENERATOR: http://patorjk.com/software/taag/#p=display&c=c%2B%2B&f=ANSI%20Shadow&t=playlist
		//L Console css formatting https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
	
	//L LIBRARIES
		//L fetch vs axios: https://www.reddit.com/r/javascript/comments/6e0o99/fetch_polyfill_or_axios/
		//R axios is high level, fetch is middle level - i want this because its less magic, i actually want the functionality of fetch to be able to distinguish between failed requests and bad requests, i'm making a wrapper function anyways so the extra detail doesn't matter
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/* 
	// BIG
		Break every single part of every module, see if all possible outcomes are caught and handled properly.

		Ensure everything has an error handler - most of the time 'throw sj.propagate(rejected);'.

		Fill in and make consistent content for all success, error, data objects.

		Add timeouts to async functions.

		Replace all 'var' with 'let' and 'const'


	// SMALL
		eslint + prettier configuration
		//L https://medium.com/@pgivens/write-cleaner-code-using-prettier-and-eslint-in-vscode-d04f63805dcd
*/

//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// BUILT-IN

// INTERNAL
import './polyfill.js'; // side effects
import { 
	define, 
	test, 
	wait,
	replaceAll,
	encodeProperties,
	decodeProperties,
	encodeList,
	decodeList,
	any,
	one,
	pick,
	asyncMap,
} from './utility/index.js';
import * as constants from './constants.js';

// EXTERNAL
import fClone from './fclone.js';

//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

const sj = {};

// POLYFILL
if (typeof fetch !== 'undefined') {
	//L typeof doesn't throw reference error: https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
	//L fetch also needs the window context: https://stackoverflow.com/questions/10743596/why-are-certain-function-calls-termed-illegal-invocations-in-javascript
	sj.fetch = fetch.bind(window);
} else {
	sj.fetch = async function () {
		throw new sj.Error({
			log: true,
			origin: 'global.js init',
			reason: 'fetch is not defined',
		});
	}
}

// CONSTANTS
define.constant(sj, constants);


//  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗   ██╗
//  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
//  ██║   ██║   ██║   ██║██║     ██║   ██║    ╚████╔╝ 
//  ██║   ██║   ██║   ██║██║     ██║   ██║     ╚██╔╝  
//  ╚██████╔╝   ██║   ██║███████╗██║   ██║      ██║   
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   

//C these don't reference any sj.Bases

// TESTING
define.constant(sj, {
	test,
	wait,
});
sj.trace = function () {
	try {
		throw Error('');
	} catch (e) {
		//TODO figure out how to properly display newlines as strings inside objects

		//C get stack
		const stackTrace0 = e.stack;
		//C 'file:///' is removed (so that the URIs are clickable in node)
		const stackTrace1 = replaceAll(stackTrace0, 'file:///', '');
		//C remove leading 'Error\n    ', to reduce confusion because trace isn't an error
		const stackTrace2 = replaceAll(stackTrace1, 'Error\n', '');
		//C removes any line with Object.sj.trace

		let ignore = [
			'Object.sj.trace',
			'new Base',
			'new Error',
			'Object.sj.catchUnexpected',
			'Object.sj.propagate',
			'sj.Error.announce',
		];
		ignore = replaceAll(ignore.join('|'), '.', '\.');
		const exp = new RegExp(`(?:(?:\\n|\n|\r|$)* *at(?: |\\n|\n|\r|$))(?:${ignore})(?:.+?(?=\\n|\n|\r|$))`, 'g');
		const stackTrace3 = replaceAll(stackTrace2, exp, '');

		return stackTrace0;
	}
};
sj.image = function (value) {
	if (typeof value === null || typeof value !== 'object') return value;
	return JSON.parse(JSON.stringify(sj.deepClone(value))); //? Why is a deepClone needed here?
};

// HTTP
define.constant(sj, {
	encodeProps: encodeProperties, //TODO
	decodeProps: decodeProperties, //TODO
	encodeList,
	decodeList,
});

// FILTER
sj.assignDefined = function (target, ...args) {
	args.forEach(arg => {
		Object.keys(arg).forEach(key => {
			if (arg[key] !== undefined) target[key] = arg[key];
		});
	});
	return target;
};

// MISC
sj.deepAccess = function (thing, ...args) {
	const path = args.flat();
	//C accesses nested properties of any variable type
	//C prevents errors from being thrown on property access of undefined or null, instead returns undefined
	return path.reduce((accumulator, key) => {
		//C only undefined and null will throw errors for property access
		if (accumulator === undefined || accumulator === null) return undefined;
		else return accumulator[key];
	}, thing);
};
sj.deepClone = function (...args) {
	//C deep clones objects (root & nested objects aren't the same reference)
	//C drops circular references and replaces with '[Circular]'
	return fClone(...args);
};
sj.Deferred = class Deferred extends Promise {
	//C custom promise that can be resolved, rejected, and canceled outside it's resolver
	//G may be called without a resolver
	//TODO//? cancel-able promises might not be the best idea
	constructor(executor = (resolve, reject) => {}) {
		//C closure is used here instead of instance variables because they cannot be defined before super is called (which requires such variables)
		const closure = {
			pending: true, //! doesn't stop additional resolve/reject calls, they still reach the parent promise, just acts as a readable state
			canceled: false,
		};

		//C intercept executor function
		super((resolve, reject) => {
			closure.resolve = function (resolved) {
				if (!closure.canceled) {
					closure.pending = false;
					resolve(resolved);
				}
			};
			closure.reject = function (rejected) {
				if (!closure.canceled) {
					closure.pending = false;
					reject(rejected);
				}
			};

			return executor(resolve, reject);
		});

		//C instance .resolve() and .reject() functions will use the closure to fulfill the promise from outside it's executor
		this.resolve = closure.resolve;
		this.reject = closure.reject;

		//C prevents promise from being resolved or rejected in the future
		this.cancel = function () {
			closure.canceled = true;
		};
		//C rejects the result of the passed function on timeout
		this.timeout = function (ms, onTimeout = () => 'Deferred promise timed out') {
			sj.wait(ms).then(() => {
				//! doesn't call onTimeout() if the promise is already fulfilled, to avoid side-effects
				if (closure.pending) closure.reject(onTimeout());
			});
			return this;
		};

		//C allow read-only access of pending and canceled directly on the deferred promise
		Object.defineProperty(this, 'pending', {
			get() {
				return closure.pending;
			},
		});
		Object.defineProperty(this, 'canceled', {
			get() {
				return closure.canceled;
			},
		});
	}
};


//   ██████╗██╗      █████╗ ███████╗███████╗    ██╗   ██╗████████╗██╗██╗     
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝    ██║   ██║╚══██╔══╝██║██║     
//  ██║     ██║     ███████║███████╗███████╗    ██║   ██║   ██║   ██║██║     
//  ██║     ██║     ██╔══██║╚════██║╚════██║    ██║   ██║   ██║   ██║██║     
//  ╚██████╗███████╗██║  ██║███████║███████║    ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝    ╚═╝   ╚═╝╚══════╝

//C these reference sj.Bases, don't call these until classes are defined

sj.setTimeout = function (f, delay, ...args) {
	//C allows the use of Infinity for setTimeout()
	//! this will be clamped to 2147483647
	//L https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
	//L https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value

	if (delay > 2147483647) {
		delay = 2147483647;
		// new sj.Warn({
		// 	origin: 'setTimeout()',
		// 	message: 'setTimeout delay clamped to 2147483647 (24.8) days',
		// });
	}

	return setTimeout(f, delay, ...args);
};


// SESSION //C holds login, get, logout, etc. methods
sj.session = {};

// TYPE
sj.isType = function (input, type) {
	//C matches 'input' type or super-type to 'type' value or string representation or builtin object
	//!//! will not match arrays to Object
	//! will not match typeof input to typeof type, unless their exact values match - don't rely on this
	//R this intentional because it would be difficult to separate string identifiers from typeof 'anyString'

	//TODO also go back and fix the sj validation class of number, int, floats with this too
	//TODO see if this can be even more cleanly structured
	//TODO consider allowing the user of builtin objects
	//TODO make a list of reserved strings as identifiers (problem is for using a variable as the type to compare to, if it lands on any of these reserved words it wont match typeof type but the reserved meaning) //? actually I dont think this is needed because 'typeof type' is never used, type is only matching by value or its identifier
	
	/*	//R
		created new typeOf function - there are two use cases: (minimal, similar to typeof keyword but fixes null & NaN) (extended, fleshes out sj.Base types etc.), both are probably needed but they cant exist at the same time - instead do something like isType(input, 'type') which can then be used to check many-to-one matches unlike a string comparison (x === 'y'), this will distance this function from typeof (which is a good thing)
	*/
	

	// value
	if (input === type) { //!//TODO this will cause issues with ('object', 'object') and inconsistencies like true === (sj.Entity, sj.Entity) vs false == (sj.Track, sj.Entity)
		return true;
	}
	
	
	// instanceof
	if (typeof type === 'function' && input instanceof type && !Array.isArray(input)) {
		return true;
	}

	// no sub-types
	//C these early return false to skip more expensive checks below
	if (input === undefined) {
		//! won't catch undeclared variables because they cannot be passed to functions without throwing a reference error
		return type === undefined || type === 'undefined';
	}
	if (input === null) {
		return type === null || type === 'null';
	}
	if (Array.isArray(input)) {
		return type === Array || type === 'array';
	}
	let t = typeof input; //! typeof fixes must go above this (null = 'object', array = 'object')
	if (t === 'boolean') {
		return type === Boolean || type === 'boolean';
	}
	if (t === 'string') {
		return type === String || type === 'string';
	}

	// sub-types
	if (t === type) {
		return true;
	}
	if (t === 'object') {
		if (type === Object || type === 'object') {
			return true;
		}

		// sj.Base & sub-types
		//R this implementation removes the need for a custom object list, because if everything extends sj.Base, everything can also be compared as an instanceof sj.Base - keeping a list of string names (to reduce the need for building an object) wont work in the long run because inheritance cant be checked that way
		let tempInput = input;
		let tempType = type;
	
		if ((input instanceof sj.Base || (typeof input.constructorName === 'string' && (() => { 
			//C input or input.constructorName is an instance of a constructible
			let Target = sj[input.constructorName];
			if (typeof Target === 'function') {
				tempInput = new Target({log: false});
				return true;
			}
			return false;
		})())) && (typeof type === 'function' || (typeof type === 'string' && (() => {
			//C and type is constructible
			let Target = sj[type];
			if (typeof Target === 'function') {
				tempType = Target;
				return true;
			}
			return false;
		})()))) {
			if (tempInput instanceof tempType) { //C catch [input instance] instanceof [type constructible]
				return true;
			}
		}
	}
	if (t === 'number') {
		//C Infinity is a number

		if (type === Number || type === 'number') {
			return true;
		}

		// NaN
		if (Number.isNaN(input) && (Number.isNaN(type) || type === 'NaN' || type === 'nan')) {
			//! isNaN() and Number.isNaN() are slightly different: //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
			return true;
		}

		// integer
		if (Number.isInteger(input) && (type === 'integer' || type === 'int')) {
			return true;
		}

		// float
		if (!Number.isInteger(input) && (type === 'float')) {
			return true;
		}
	}

	return false;
};
sj.isEmpty = function (input) {
	//C null, undefined, and whitespace-only strings are 'empty' //! also objects and arrays
	return !(
		sj.isType(input, 'boolean') || 
        sj.isType(input, 'number') || 
        //C check for empty and whitespace strings and string conversions of null and undefined
        //TODO //! this will cause issues if a user inputs any combination of these values, ban them at the user input step
        (sj.isType(input, 'string') && input.trim() !== '' && input.trim() !== 'null' && input.trim() !== 'undefined') ||
        (sj.isType(input, 'object') && Object.keys(input).length > 0) ||
        (sj.isType(input, 'array') && input.length > 0)
	);
};

//TODO extract this, matchOrder is not supported in the new deepCompare() function, so must think of a work around.
//TODO consider using Object.is() (where +0 !== -0 and NaN === NaN) //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
sj.deepMatch = function (a, b, {
	deep = true, 
	depth = 10, 
	matchIfTooDeep = false, 
	matchIfSubset = false, //C matches objects and arrays if a is a subset of b
	matchOrder = true,
	logDifference = false, //C logs first difference found if not matching
} = {
	deep: true, 
	depth: 10, 
	matchIfTooDeep: false, 
	matchIfSubset: false, 
	matchOrder: true,
	logDifference: false,
}) {
	if (depth <= 0) return matchIfTooDeep;

	if (a === b) return true; // primitives & references
	if (sj.isType(a, NaN) && sj.isType(b, NaN)) return true; // NaN

	if (deep) {
		let matchDeeper = function (a, b) {
			return sj.deepMatch(a, b, {deep, depth: depth-1, matchIfTooDeep, matchIfSubset, matchOrder});
		};

		if (sj.isType(a, Object) && sj.isType(b, Object)) { // objects
			let matches = true;
			Object.keys(a).forEach(key => { //C match all keys of a to the same keys in b
				if (!matchDeeper(a[key], b[key])) {
					matches = false;
					if (logDifference) console.log(`deepMatch property difference - ${key}: ${a[key]}, ${b[key]}`);
				}
			});
			if (!matchIfSubset) {
				Object.keys(b).forEach(key => { //C match all keys of b to the same keys in a //TODO optimize here
					if (!matchDeeper(a[key], b[key])) {
						matches = false;
						if (logDifference) console.log(`deepMatch property difference - ${key}: ${a[key]}, ${b[key]}`);
					}
				});
			}
			return matches;
		}
		if (sj.isType(a, Array) && sj.isType(b, Array)) { // arrays
			let matches = true;
			a.forEach((inA, i) => {
				if (matchOrder) {
					if (!matchDeeper(a[i], b[i])) {
						matches = false;
						if (logDifference) console.log(`deepMatch index difference - ${i}: ${a[i]}, ${b[i]}`);
					}
				} else { //C match any inB to current inA
					if (!b.some(inB => matchDeeper(inA, inB))) {
						matches = false;
						if (logDifference) console.log(`deepMatch extra item in b - ${inB}`);
					}
				}
			});
			if (!matchIfSubset) {
				b.forEach((inB, i) => {
					if (matchOrder) {
						if (!matchDeeper(a[i], b[i])) {
							matches = false;
							if (logDifference) console.log(`deepMatch index difference - ${i}: ${a[i]}, ${b[i]}`);
						}
					} else {
						if (!a.some(inA => matchDeeper(inA, inB))) {
							matches = false;
							if (logDifference) console.log(`deepMatch extra item in a - ${inA}`);
						}
					}
				});
			}
			return matches;
		}
	}

	return false;
};
sj.deepMatch.test = function () {
	let oA = {
		a: 'a',
		b: 'b',
	};
	let oB = {
		a: 'a',
		b: 'b',
	};
	let oC = {
		a: 'a',
		b: 'b',
		c: 'c',
	};
	let oD = {
		a: 'a',
		b: 'not b',
	};

	let aA = ['a', 'b'];
	let aB = ['a', 'b'];
	let aC = ['a', 'b', 'c'];
	let aD = ['a', 'not b'];
	let aE = ['a', 'c', 'b'];

	let nA = {
		a: {
			a: {
				a: {
					a: 'a',
				}
			}
		}
	};
	let nB = {
		a: {
			a: {
				a: {
					a: 'a',
				}
			}
		}
	};

	//C aF is subset of aG at first level, but then aG is a subset of aF at second level, this should fail matchIfSubset
	let aF = [
		{
			a: 'a',
			b: 'b',
		},
	];
	let aG = [
		{
			a: 'a',
		},
		{
			b: 'b',
		},
	];

	sj.test([
		['match positive number', 		true === sj.deepMatch(1, 1)],
		['match zero', 					true === sj.deepMatch(0, 0)],
		['match negative number', 		true === sj.deepMatch(-1, -1)],
		['match infinity', 				true === sj.deepMatch(Infinity, Infinity)],
		['match negative infinity', 	true === sj.deepMatch(-Infinity, -Infinity)],
		['match NaN', 					true === sj.deepMatch(NaN, NaN)],
		['mismatch positive number', 	false === sj.deepMatch(4, 3193)],
		['mismatch positive negative', 	false === sj.deepMatch(-3, 0)],
		['mismatch infinity, number', 	false === sj.deepMatch(Infinity, 2345678909875498765456789)],
		['mismatch infinity, -infinity',false === sj.deepMatch(Infinity, -Infinity)],
		['mismatch NaN, zero', 			false === sj.deepMatch(NaN, 0)],
		['match true', 					true === sj.deepMatch(true, true)],
		['match false', 				true === sj.deepMatch(false, false)],
		['mismatch true, false', 		false === sj.deepMatch(true, false)],
		['match string', 				true === sj.deepMatch('test', 'test')],
		['match empty', 				true === sj.deepMatch('', '')],
		['match "undefined"', 			true === sj.deepMatch('undefined', 'undefined')],
		['match "null"', 				true === sj.deepMatch('null', 'null')],
		['mismatch string', 			false === sj.deepMatch('string', 'test')],
		['mismatch empty and filled', 	false === sj.deepMatch('', 'test')],
		['match object reference', 		true === sj.deepMatch(oA, oA)],
		['match object items', 			true === sj.deepMatch(oA, oB)],
		['match object subset', 		true === sj.deepMatch(oA, oC, { matchIfSubset: true})],
		['mismatch object not deep', 	false === sj.deepMatch(oA, oB, {deep: false})],
		['mismatch object, not subset', false === sj.deepMatch(oA, oC)],
		['mismatch object props', 		false === sj.deepMatch(oA, oD)],
		['match array reference', 		true === sj.deepMatch(aA, aA)],
		['match array items', 			true === sj.deepMatch(aA, aB)],
		['match array subset', 			true === sj.deepMatch(aA, aC, {matchIfSubset: true})],
		['match array, not order', 		true === sj.deepMatch(aC, aE, {matchOrder: false})],
		['mismatch array, not deep', 	false === sj.deepMatch(aA, aB, {deep: false})],
		['mismatch array, not subset', 	false === sj.deepMatch(aA, aC)],
		['mismatch array items', 		false === sj.deepMatch(aA, aD)],
		['mismatch array, order', 		false === sj.deepMatch(aC, aE)],
		['mismatch object, array', 		false === sj.deepMatch({}, [])],
		['match nested', 				true === sj.deepMatch(nA, nB)],
		['match nested if too deep', 	true === sj.deepMatch(nA, nB, {depth: 2, matchIfTooDeep: true})],
		['mismatch nested if too deep', false === sj.deepMatch(nA, nB, {depth: 2})],
		['mismatch subset switch',		false === sj.deepMatch(aF, aG, {matchIfSubset: true})],
	], 'deepMatch');
};

// ERROR
sj.catchUnexpected = function (input) {
	//C determines type of input, creates, announces, and returns a proper sj.Error object
	//C use in the final Promise.catch() to handle any unexpected variables or errors that haven't been caught yet
	
	var error = new sj.Error({
		log: false,
		origin: 'sj.catchUnexpected()',
		message: 'an unexpected error ocurred',
		content: input,
	});

	if (sj.isType(input, null)) {
		error.reason = 'unexpected null';
	} else if (sj.isType(input, Object)) {
		if (input instanceof Error) {
			//C this is going to catch the majority of unexpected inputs

			//! JSON.stringify() does not work on native Error objects as they have no enumerable properties therefore these cannot be passed between client & server,so when catching a native Error object properly convert it to a string with Error.toString() then save that in reason
			//L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
			error.reason = input.toString();

			//C replace trace with actual trace (which has clickable URIs)
			error.trace = replaceAll(input.stack, 'file:///', '');
		} else if (sj.isType(input, sj.Base)) {
			error.reason = `unexpected ${input.constructorName}`;
		} else {
			error.reason = 'unexpected object';
		}
	} else {
		error.reason = `unexpected ${typeof input}`;
	}

	error.announce();
	return error;
};
sj.propagate = function (input, overwrite) {
	//C wraps bare data caught by sj.catchUnexpected(), optionally overwrites properties
	if (!sj.isType(input, sj.Error)) { //C wrap any non-sj errors, let sj.Errors flow through
		input = sj.catchUnexpected(input);
	}
	if (sj.isType(overwrite, Object)) { //C overwrite properties (for example making a more specific message)
		Object.assign(input, overwrite);
		//OLD this would recreate the trace, dont want to do this input = new input.constructor({...input, log: false, ...overwrite}); //C re-stuff, but don't announce again
	}
	throw input;

	//TODO //? why not just use Object.assign(input) instead?
	//TODO better yet, why not just use a spread operator at the top?
};
sj.andResolve = function (rejected) {
	//C resolves/returns any errors thrown by sj.propagate()
	//G someAsyncFunction().catch(sj.andResolve);
	try {
		return sj.propagate(rejected);
	} catch (e) {
		return e;
	}
};

// PROMISE
sj.asyncForEach = async function (list, callback) {
	//C executes an async function for each item in an array, throws entire result list if any of it's items were thrown
	//L this helped: https://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises
	
	

	//C list is shallow copied because list could also be an array-like object
	//L https://stackoverflow.com/questions/31084619/map-a-javascript-es6-map
	let tempList = [...list];
	let results = await Promise.all(tempList.map(async (item, index, self) => callback(item, index, self).then(resolved => {
		return {
			resolved: true,
			content: resolved,
		}
	}, rejected => {
		//C temporarily resolve rejections in a pack so that every item will be processed
		return {
			resolved: false,
			content: sj.propagate(rejected),
		}
	})));

	//C while references are fine, primitives need to be given back to the original list
	for(let i = 0; i < list.length; i++) {
		list[i] = tempList[i];
	}

	//C check if any rejected
	let allResolved = results.every(item => item.resolved);
	//C un-pack
	results = results.map(item => item.content); 

	if (allResolved) {
		return results;
	} else {
		throw results;
	}
};

// FORMAT
define.constant(sj, {
	any,
	one,
});

sj.content = function (resolved) {
	//C shorter syntax for immediately returning the content property of a resolved object in a promise chain
	return resolved.content;
};

// RECURSION
//TODO consider using Promise.race //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
sj.recursiveSyncTime = async function (n, loopCondition, f, ...args) {
	//L rest parameters	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
	let timestamp = Date.now();
	function loop() {
		if (Date.now() > timestamp + n) {
			throw new sj.Error({
				log: true,
				origin: 'recursiveSyncTime()',
				reason: 'recursive function timed out',
				content: f,
			});
		}

		let result = f(...args);
		if (loopCondition(result)) {
			result = loop();
		}

		return result;
	}
	return loop();
};
sj.recursiveSyncCount = async function (n, loopCondition, f, ...args) {
	let count = 0;
	function loop(count) {
		if (count >= n) {
			throw new sj.Error({
				log: true,
				origin: 'recursiveSyncCount',
				reason: 'recursive function counted out',
				content: f,
			});
		}

		let result = f(...args);
		if (loopCondition(result)) {
			result = loop(++count);
		}

		return result;
	}
	return loop(count);
};
sj.recursiveAsyncTime = async function (n, loopCondition, f, ...args) {
	let timestamp = Date.now();
	async function loop() {
		if (Date.now() > timestamp + n) {
			throw new sj.Error({
				log: true,
				origin: 'recursiveAsyncTime()',
				reason: 'recursive function timed out',
				content: f,
			});
		}

		let result = await f(...args);
		if (loopCondition(result)) {
			result = await loop();
		}

		return result;
	};
	return await loop();
};
sj.recursiveAsyncCount = async function (n, loopCondition, f, ...args) {
	let count = 0;
	async function loop(count) {
		if (count >= n) {
			throw new sj.Error({
				log: true,
				origin: 'recursiveAsyncCount()',
				reason: 'recursive function counted out',
				content: f,
			});
		}

		let result = await f(...args);
		if (loopCondition(result)) {
			result = await loop(++count);
		}

		return result;
	}
	return await loop(count);
};

//C uses recursiveAsyncTime to periodically check a condition
sj.waitForCondition = async function ({
	interval = 100,
	scaling = 1,
	delay = 0,
	timeout = 2000,
	condition = () => false,
}) {
	await sj.recursiveAsyncTime(timeout, () => !condition(), async o => {
		await sj.wait(o.time);
		o.time = o.time * scaling;
		return;
	}, {time: interval + delay});
};

// HTTP
sj.rebuild = function (input, strict) {
	//C turns a bare object back into its custom class if it has a valid constructorName property

	if (sj.isType(input, String)) { //C parse if string
		try {
			input = JSON.parse(input);
		} catch (e) {
			return new sj.Error({
				log: true,
				origin: 'sj.rebuild()',
				message: 'failed to recreate object',
				reason: e,
				content: input,
			});
		}
	}
	if (!sj.isType(input, Object)) { //C throw if not object
		return new sj.Error({
			log: true,
			origin: 'sj.rebuild()',
			message: 'failed to recreate object',
			reason: 'data is not an object',
			content: input,
		});
	}


	let rebuilt = input;
	if (sj.isType(input, sj.Base)) { //C rebuild if possible
		rebuilt = new sj[input.constructorName](input);
	} else if (strict) { //C throw if not possible and strict
		return new sj.Error({
			log: true,
			origin: 'sj.rebuild()',
			message: 'failed to recreate object',
			reason: 'object is not a valid sj.Base',
			content: input,
		});
	}

	return rebuilt;
};
sj.request = async function (method, url, body, headers = sj.JSON_HEADER) {
	/* //! use UPPERCASE HTTP methods...
		//! ...because in the fetch api 'PATCH' is case-sensitive where get, post, delete aren't
		//L its absurd, but apparently intentional: https://stackoverflow.com/questions/34666680/fetch-patch-request-is-not-allowed
		//L https://github.com/whatwg/fetch/issues/50
		//L https://github.com/github/fetch/pull/243
	*/

	let options = {
		method,
		headers,
		body,
	};
	if (method === 'GET') {
		if (sj.isType(body, Object)) {
			url += `?${sj.encodeProps(body)}`;
		}
		delete options.body;
	} 
	if (sj.isType(options.body, Object) || sj.isType(options.body, Array)) { //C stringify body
		try {
			options.body = JSON.stringify(sj.deepClone(options.body));
		} catch (e) {
			//C catch stringify error (should be a cyclic reference)
			throw new sj.Error({
				origin: 'request()',
				message: 'could not send request',
				reason: e.message,
				content: options.body,
			});
		}
	}

	let result = await sj.fetch(url, options).catch(rejected => { //L fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
		//C catch network error
		//L when fetch errors: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
		//TODO properly parse
		throw sj.propagate(rejected);
	});
	

	//TODO sort out the codes and parsing below

	//C catch ok, no content code
	if (result.status === 204) {
		return new sj.Success({
			origin: 'sj.request()',
			code: '204',
			message: 'success',
			reason: 'request successful, no content returned',
		});
	}


	//C parse via fetch .json()
	//L https://developer.mozilla.org/en-US/docs/Web/API/Body/json
	let raw = await result.clone().text();
	let parsedResult = await result.clone().json().catch(rejected => {
		throw sj.propagate(rejected, {content: raw});
	});

	//C catch non-ok status codes
	if (!result.ok) {
		//TODO properly parse
		throw sj.propagate(parsedResult);
	}

	//C rebuild and throw if error
	let build = function (item) {
		item = sj.rebuild(item);
		if (sj.isType(item, sj.Error)) {
			throw item;
		}
		return item;
	}
	if (sj.isType(parsedResult, Array)) {
		return await asyncMap(parsedResult, item => build(item));
	} else {
		return build(parsedResult);
	}
};

// LIVE DATA
sj.Subscriptions = function () {
	//C creates an array for each Entity type
	sj.Entity.children.forEach(child => {
		this[child.table] = [];
	});
};

// RANDOM KEY GENERATION //TODO this is only public for testing
sj.makeKey = function (length) {
    //C use only characters allowed in URLs
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
};
sj.addKey = async function (list, timeout) {
    let pack = {};
    let defaultTimeout = 300000; //C default 5 minutes

    pack.key = await sj.recursiveSyncCount(100, (key) => {
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                found = true;
                break;
            }
        }
        return found;
    }, sj.makeKey, 10);

    pack.timestamp = Date.now();
    pack.timeout = pack.timestamp;
    sj.isType(timeout, 'number') ? pack.timeout += timeout : pack.timeout += defaultTimeout;

    list.push(pack);
    return pack;
};
sj.checkKey = async function (list, key) {
    //C checks a list for a key, will remove and return if found, will clean up timed-out keys
    
    for(let i = 0; i < list.length; i++) {
        //C check if timed out
        let fresh = list[i].timeout > Date.now() ? true : false;
        
        //C if the key is found and not timed out, take it out and return it
        if (list[i].key === key && fresh) {
            return list.splice(i, 1)[0];
        }

        //C remove timed-out keys //TODO check that this works
        if (!fresh) {
            list.splice(i, 1);
        }
    }

    throw new sj.Error({
        log: true,
        origin: 'checkKey()',
        message: 'request timeout, or just an invalid key',
    });
};

	
//   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

/* //TODO
	//G wrapper objects vs bare return
		simple functions should just return the bare result, for testing purposes these can also have guard clauses and throw a more descriptive sj.Error
		more complex functions (async, error-able, client-server transfer) should wrap their result:
			sj.Success / sj.SuccessList
				wraps empty content, arrays of other objects, misc content
				or is a descendant item object
			or a sj.Error / sj.ErrorList
				wraps empty content, arrays of other objects with at least one error, non-sj errors
				or is a custom error

		//R
		client-server transfer is the one place where the resolve/reject state of promises won't work - this is the big reason why wrappers are needed
		even though resolve and rejections don't need to be the same format, its still useful to have the ability influence resolved values with a success wrapper for say logging or debugging

	reconsider the default values of class properties - semantics of undefined & null, error handling of placeholders '', [], {}, inequality of Symbol(), 'emptiness' sj.isEmpty()

	possibly a cyclical reference preservation function between client and server that replaces a reference to self with 'self1' keyword and also can find lower-level cyclical references by recursively calling the function on each layer with memory for which layer its on

*/

//L functional classes: https://stackoverflow.com/questions/15192722/javascript-extending-class


/* //R Thought Process
	//R Initially only static methods and variables I decided to define outside the class because static variables requires the use of a getter, which felt hacky.
	//R But when I needed to augment the constructor of a class I ran into problems, so I decided to define classes like this - with an anonymous function being called on a minimal class. It makes the location of instance methods, instance variables, static methods, and static variables more clear. It also makes augmenting (not extending) a class easier (specifically the defaults), this is important for divergent client and server classes.
	//R finally I found that I was repeating some parts of this anonymous function like const parent = Object.getPrototypeOf(this); and return this;, so I decided to make a factory function for all descendants of sj.Base, and a similar augmentation function, this was also done partly so that defaults, instanceMethods, and statics can be laid out with similar hierarchy.
*/
//C manually create sj.Base
//TODO - consider changing all the constructorParts into functions (like static/prototypeProperties) that return an object to be assigned, (I think this may help with the defaults reference issue), but that also still can execute code. Maybe when this is done, then these parts can be brought up to the top level because they will now have their own closure context to process in
sj.Base = class Base {
	constructor(options) {
		//! defaults are retrieved in the function via the static this.constructor.defaults property
		this.constructor.construct.call(this, options); 
	}
};
(function () {
	//G use makeClass and augmentClass with assignment functions that can manually assign properties via this.x = 'x', and/or return an object that has those properties assigned (may use an arrow function to shorten the syntax). both work the same way, but the manual assignment has is able to do more - make getters, execute 'on create' functionality, create closures for extension, and delete properties (//! don't do this though)
	//TODO consider deep defaults
	this.makeClass = function (name, parent, {
		//G may contain functions: beforeInitialize, afterInitialize; boolean: allowUnknown; and object: defaults
		//! anything in here (including stuff that shouldn't be) will overwrite staticProperties 
		constructorParts = parent => ({}),
		//G instance methods
		prototypeProperties = parent => ({}),
		//G static properties & methods
		staticProperties = parent => ({}),
	}) {
		//C creates a descendant class of sj.Base with easily accessible properties for later augmentation, applies staticProperties, before/afterInitialize, allowUnknown, and defaults to static self and instanceMethods to instance prototype
	

		// VALIDATE
		if (!sj.isType(name, String)) throw 'sj.Base.makeClass() - cannot make class, name is not a string';
		//! don't convert sj.Base to this here, it will break ChildClass.makeClass({'X', sj.Base, {...}})
		if (!(parent === sj.Base || parent.prototype instanceof sj.Base)) throw 'sj.Base.makeClass() - cannot make class, parent is not of type sj.Base';
	
		//C dynamically create class using inferred function names
		//L https://stackoverflow.com/questions/33605775/es6-dynamic-class-names/33611096\
		//G sj.Base descendants pass new static constructorParts to extend from their parent's constructorParts rather than having an extended constructor
		//C the allows sj.Base.construct() to only be called once, which simplifies their 'on create' functionality
		const MadeClass = {[name]: class extends parent {
			constructor(options) {
				super(options);
			}
		}}[name];

		// ASSIGN
		//C use .call to set 'this' as MadeClass, pass parent for ease of use and to avoid repeating Object.getPrototypeOf(this)
		//C undefined properties won't be passed, and parent's will be used when looked up
		//! ensure each part is only called once, as they may also have alternative assignment methods (such as on create functionality and getter/setter assignment)

		//! staticProperties is assigned before constructorParts so that constructorParts will take priority if there are collisions
		Object.assign(MadeClass, staticProperties.call(MadeClass, parent));

		/* //R thoughts on defaults
			//R my first thought was to have default values that are undefined to be undeclared as well, so that properties the properties won't show up and will be more useful when overwriting another
			//R I wanted to mimic this behavior with instance options - however, this would be inconsistent when using the spread operator, as it functions like Object.assign
			//R however I'm now realizing that this would be more consistent and clear
			//R I thought about doing three different 'defaults' objects, invisible (wont be declared if undefined, ie default undefined), normal, and 'fixed'(?), ones that cannot be changed by options
			//R but this doesn't seem right, for invisible: when making a new object I should really stay away from using the literal undefined value, and any spread operators used will still function as expected, for fixed, these can just be defaults as they are, because I really shouldn't be overwriting them with options anyways, and they can always be changed later anyways
		*/
		Object.assign(MadeClass, {
			//C constructorParts defaults
			//! these require empty defaults because of how construct() works - they are composed together rather than inheriting from the parent
			beforeInitialize() {},
			afterInitialize() {},
			defaults: {},
			//! allowUnknown DOES inherit from the parent and should not have a default to avoid overwriting the parent's true value with an undefined value defaulted to false
		}, constructorParts.call(MadeClass, parent));

		//C instance methods are assigned to the instance.prototype so that new methods aren't created for each instance
		Object.assign(MadeClass.prototype, prototypeProperties.call(MadeClass.prototype, parent));
		//? shouldn't the this reference be the parent.prototype?
	

		return MadeClass;
	};
	this.augmentClass = function ({
		constructorParts = parent => ({}),
		prototypeProperties = parent => ({}),
		staticProperties = parent => ({}),
	}) {
		//C add or overwrite existing properties with new ones
		//G to extend: store old property in a variable not attached to this (a closure) and then compose the new property with it
		//! when not just returning an object for assignment, ensure existing properties aren't being deleted, it goes against what this method should do
		//! make sure each part is ony called once (see makeClass)

		const parent = Object.getPrototypeOf(this);
		Object.assign(this, staticProperties.call(this, parent));

		//C don't overwrite defaults, assign them too
		const constructorPartsResult = constructorParts.call(this, parent);
		if (sj.isType(constructorPartsResult, Object)) { 
			//! Object.assign can handle undefined, but destructuring can't which is why constructorPartsResult needs to be checked
			const {defaults = {}, ...rest} = constructorPartsResult;
			Object.assign(this, rest);
			Object.assign(this.defaults, defaults);
		}

		Object.assign(this.prototype, prototypeProperties.call(this.prototype, parent.prototype));
	};

	this.defaults = {
		// debug
		log: false,

		// info
		code: 200,
		type: 'Ok',
		origin: '',
		trace: '', //sj.trace(), //! this traces when the object is created, not where announce is called - this might have to be changed, this on create property could replace origin though

		// content
		message: '',
		reason: '',
		content: {},
	};
	this.allowUnknown = false;
	this.beforeInitialize = function (accessory) {
		//C rebuild content if is of type sj.Base
		//!//G all classes are responsible for rebuilding their other properties if they are also sj.Base class instances
		if (sj.isType(accessory.options.content, sj.Base)) {
			accessory.options.content = sj.rebuild(accessory.options.content);
		} else if (sj.isType(accessory.options.content, Array)) {
			accessory.options.content.forEach((item, i, list) => {
				if (sj.isType(item, sj.Base)) list[i] = sj.rebuild(item);
			});
		}
	};
	this.afterInitialize = function (accessory) {
	};

	this.prototype.announce = function () {
		//R this replaces a need to log the result of functions and removes the intermediate steps need to do so (let result = new Object;, log;, return;)
		if (sj.isType(this, sj.Error)) {
			console.error(`✗ ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ ✗ `);
		} else if (sj.isType(this, sj.Warn)) {
			console.warn(`W ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ W `);
		} else {
			console.log(`✓ ▮ ${this.constructorName} ${this.origin} ${this.message}\n${sj.trace()}`); //
		}
	};

	this.construct = function (options = {}) {
		const accessory = {options};

		//C get prototype chain
		const chain = [this.constructor];
		//C push the prototype of the last item in the chain until sj.Base is reached
		while(chain[chain.length-1] !== sj.Base) chain.push(Object.getPrototypeOf(chain[chain.length-1]));
		
		//C call ancestor's and own beforeInitialize() in descending order
		for (let i = chain.length-1; i >= 0; i--) chain[i].beforeInitialize.call(this, accessory);

		//C store constructor.name on this instance as constructorName so that it can be stringified and rebuilt
		this.constructorName = this.constructor.name; 

		//C assign the ancestor's and own defaults in descending order
		const extendedDefaults = {};
		for (let i = chain.length-1; i >= 0; i--) Object.assign(extendedDefaults, chain[i].defaults);

		const composed = {};
		//C assign all properties from options
		if (this.allowUnknown) Object.assign(composed, extendedDefaults, options); 
		//C or only assign properties declared in defaults
		else Object.assign(composed, extendedDefaults, pick(options, Object.keys(extendedDefaults))); 
		//C then assign to instance non-undefined properties (so that anything that has the value undefined, will be undeclared)
		sj.assignDefined(this, composed); //? is this preferable to simply using sj.assignDefined in places where it's needed?

		//C call ancestor's and own afterInitialize in order
		for (let i = chain.length-1; i >= 0; i--) chain[i].afterInitialize.call(this, accessory);

		if (this.log) this.announce();
	};
}).call(sj.Base);
sj.Base.test = async function () {
	let calledConstructorParts 		= false;
	let calledBeforeInitialize 		= false;
	let calledAfterInitialize 		= false;
	let calledPrototypeProperties 	= false;
	let calledStaticProperties 		= false;
	let calledExtraFunction			= false;


	const A = sj.Base.makeClass('A', sj.Base, {
		//C testing options functions and properties
		constructorParts(parent) {
			calledConstructorParts = true;
			return {
				beforeInitialize() {
					calledBeforeInitialize = true;
					this.beforeFoo = Symbol();
				},
				defaults: {
					defaultFoo: Symbol(),
					passedFoo: 'passed as not default',

					undefinedFoo: undefined,
					undefinedOptionFoo: 'passed as undefined',
					// undeclaredFoo is not declared
				},
				afterInitialize() {
					calledAfterInitialize = true;
					this.afterFoo = Symbol();
				},
			};
		},
		prototypeProperties(parent) {
			calledPrototypeProperties = true;
			return {
				prototypeFoo: Symbol(),
			}
		},
		staticProperties(parent) {
			calledStaticProperties = true;
			return {
				staticFoo: Symbol(),
			};
		},

		extraFunction() {
			calledExtraFunction = true;
		},
	}); 
	const a = new A({passedFoo: Symbol(), undefinedOptionFoo: undefined});
	const a2 = new A({passedFoo: Symbol()});

	const AA = sj.Base.makeClass('AA', A, {
		//C testing property inheritance and extension
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeFoo2 = Symbol();
			},
			defaults: {
				defaultFoo2: Symbol(),
			},
			afterInitialize() {
				this.afterFoo2 = Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeFoo2: Symbol(),
		}),
		staticProperties: parent => ({
			staticFoo2: Symbol(),
		}),
	}); 
	const aa = new AA();
	
	const AAA = sj.Base.makeClass('AAA', AA, {}); 
	const aaa = new AAA();

	const AAB = sj.Base.makeClass('AAB', AA, {}); 
	const aab = new AAB();

	const AB = sj.Base.makeClass('AB', A, {
		//C testing child overwrites
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeFoo = Symbol();
			},
			defaults: {
				defaultFoo: Symbol(),
			},
			afterInitialize() {
				this.afterFoo = Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeFoo: Symbol(),
		}),
		staticProperties: parent => ({
			staticFoo: Symbol(),
		}),
	}); 
	const ab = new AB();
		
	const B = sj.Base.makeClass('B', sj.Base, {}); 
	const b = new B();

	const BA = sj.Base.makeClass('BA', B, {}); 
	const ba = new BA();

	const BB = sj.Base.makeClass('BB', B, {}); 
	const bb = new BB();

	const C = sj.Base.makeClass('C', sj.Base, {
		//C testing augmented properties
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeBar =  Symbol();
			},
			defaults: {
				defaultBar: Symbol(),
			},
			afterInitialize() {
				this.afterBar =  Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeBar: Symbol(),
		}),
		staticProperties: parent => ({
			staticBar: Symbol(),
		}),
	});
	const c = new C();

	C.augmentClass({
		constructorParts: parent => ({
			beforeInitialize() {
				this.beforeBar =  Symbol();
			},
			defaults: {
				defaultBar: Symbol(),
			},
			afterInitialize() {
				this.afterBar =  Symbol();
			},
		}),
		prototypeProperties: parent => ({
			prototypeBar: Symbol(),
		}),
		staticProperties: parent => ({
			staticBar: Symbol(),
		}),
	});
	const c2 = new C();


	await sj.test([
		// INHERITANCE
		['A prototype is sj.Base', 	Object.getPrototypeOf(A) === sj.Base],
		['AA prototype is A', 		Object.getPrototypeOf(AA) === A],
		['AAAA prototype is AA', 	Object.getPrototypeOf(AAA) === AA],

		['a isType sj.Base', 		sj.isType(a, sj.Base)],
		['aa isType sj.Base', 		sj.isType(aa, sj.Base)],
		['aaa isType sj.Base', 		sj.isType(aaa, sj.Base)],

		// SIBLINGS
		['a !isType B', !sj.isType(a, B)],
		['aa !isType AB', !sj.isType(aa, AB)],
		['aaa !isType AAB', !sj.isType(aaa, AAB)],

		// COUSINS
		['aa !isType BA', !sj.isType(aa, BA)],

		// INSTANCES
		['a.constructor === A',		a.constructor === A],
		['aa.constructor === AA',	aa.constructor === AA],
		['aaa.constructor === AAA',	aaa.constructor === AAA],


		// MAKE CLASS FUNCTIONS
		['called constructorParts',		calledConstructorParts],
		['called beforeInitialize',		calledBeforeInitialize],
		['called afterInitialize',		calledAfterInitialize],
		['called prototypeProperties',	calledPrototypeProperties],
		['called staticProperties',		calledStaticProperties],
		['did not call extraFunction',	!calledExtraFunction],

		// PROPERTIES EXIST
		['a before property',		a.hasOwnProperty('beforeFoo')],
		['a default property',		a.hasOwnProperty('defaultFoo')],
		['a after property',		a.hasOwnProperty('afterFoo')],
		['A.prototype property',	Object.getPrototypeOf(a).hasOwnProperty('prototypeFoo')],
		['A static property',		A.hasOwnProperty('staticFoo')],

		// PROPERTY INHERITANCE
		//! before and after will generate new instances, even if function is inherited
		['aa.beforeFoo === a.beforeFoo',			aa.beforeFoo !== undefined && aa.beforeFoo !== a.beforeFoo], 
		['aa.defaultFoo === a.defaultFoo',			aa.defaultFoo === a.defaultFoo],
		['aa.afterFoo === a.afterFoo',				aa.defaultFoo !== undefined && aa.afterFoo !== a.afterFoo],
		['AA.prototype foo === A.prototype foo',	AA.prototype.prototypeFoo === A.prototype.prototypeFoo],
		['AA static foo === A static foo',			AA.staticFoo === A.staticFoo],

		// PROPERTY EXTENSION
		['aa.beforeFoo2 exists',		aa.afterFoo2 !== undefined && aa.afterFoo2 !== aa.afterFoo],
		['aa.defaultFoo2 exists',		aa.defaultFoo2 !== undefined && aa.defaultFoo2 !== aa.defaultFoo],
		['aa.afterFoo2 exists',			aa.afterFoo2 !== undefined && aa.beforeFoo2 !== aa.beforeFoo],
		['AA.prototype foo2 exists',	AA.prototype.prototypeFoo2 !== undefined && AA.prototype.prototypeFoo2 !== AA.prototype.prototypeFoo],
		['AA static foo2 exists',		AA.staticFoo2 !== undefined && AA.staticFoo2 !== AA.staticFoo],

		// PROPERTY OVERWRITE
		['ab.beforeFoo exists and !== a.beforeFoo',		ab.beforeFoo !== undefined && ab.beforeFoo !== a.beforeFoo],
		['ab.defaultFoo exists and !== a.defaultFoo',	ab.defaultFoo !== undefined && ab.defaultFoo !== a.defaultFoo],
		['ab.afterFoo exists and !== a.afterFoo',		ab.afterFoo !== undefined && ab.afterFoo !== a.afterFoo],
		['AB.prototype foo exists !== B.prototype foo',	AB.prototype.prototypeFoo !== undefined && AB.prototype.prototypeFoo !== A.prototype.prototypeFoo],
		['AB static foo exists !== A static foo',		AB.staticFoo !== undefined && AB.staticFoo !== A.staticFoo],

		// AUGMENT CLASS
		['c2.beforeBar exists and !== c.beforeBar',					c2.beforeBar !== undefined && c2.beforeBar !== c.beforeBar],
		['c2.defaultBar exists and !== c.defaultBar',				c2.defaultBar !== undefined && c2.defaultBar !== c.defaultBar],
		['c2.afterBar exists and !== c.afterBar',					c2.afterBar !== undefined && c2.afterBar !== c.afterBar],
		['c.constructor.prototype === c2.constructor.prototype',	Object.getPrototypeOf(c) === Object.getPrototypeOf(c2)],
		['c.constructor === c2.constructor',						c.constructor === c2.constructor],


		// PASSED OPTIONS
		['a.passedFoo !== a2.passedFoo', a.passedFoo !== a2.passedFoo],
		['undefined default',			!a.hasOwnProperty('undefinedFoo')],
		['undeclared default',			!a.hasOwnProperty('undeclaredFoo')],
		['undefined option',			!a.hasOwnProperty('undefinedFoo')],
	], 'sj.Base Classes');
};


// ERROR
sj.Error = sj.Base.makeClass('Error', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: true, //TODO remove log: true from errors
			code: 400,
			type: 'Bad Request',
		},
	}),
});
sj.ErrorList = sj.Base.makeClass('ErrorList', sj.Error, {
	constructorParts: parent => ({
		//C wrapper for an array with one or more errors
		defaults: {
			// OVERWRITE
			reason: 'one or more errors occurred with items',
			content: [],
		},
	}),
});
// CUSTOM ERROR
sj.SilentError = sj.Base.makeClass('SilentError', sj.Error, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: false,
		},
	}),
});
sj.AuthRequired = sj.Base.makeClass('AuthRequired', sj.Error, {
	//C used to communicate to client that the server does not have the required tokens and that the client must authorize
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			message: 'authorization required',
		},
	}),
});
sj.Unreachable = sj.Base.makeClass('Unreachable', sj.Error, {
	//C used to indicate an unreachable place in the code
	constructorParts: parent => ({
		defaults: {
			message: 'code reached a place that should be unreachable',
		},	
	}),
});
sj.Timeout = sj.Base.makeClass('Timeout', sj.Error, {
	//C used to indicate a timed-out function
	constructorParts: parent => ({
		defaults: {
			message: 'request timed out',
		},
	}),
});


// RULE
sj.Rule = sj.Base.makeClass('Rule', sj.Base, {
	//G//! arrow functions may be used to shorten object returns, however they should must not use 'this'
	constructorParts: parent => ({
		//G//! 'this' refers to the static class inside constructorParts(), however 'this' refers to the instance inside before/afterInitialize()
		defaults: {
			// NEW
			valueName: 'input',
			trim: false,
			
			dataTypes: ['string'],
	
			min: 0,
			max: Infinity,
	
			
			//! remember to set useAgainst: true, if passing a value2 to use
			useAgainst: false,
			//C this is a reference value and should not be able to be equal to anything,
			//R this is to prevent a user from somehow passing in boolean false, thus making it equal to the against value and passing a password check
			againstValue: {},
			get againstMessage() {
				//! this reveals password2 when checking two passwords - simply overwrite this get function to a custom message
	
				let againstValueName = this.againstValue;
				//C join array of values if matching against multiple values
				if (Array.isArray(this.againstValue)) {
					againstValueName = this.againstValue.join(', ');
				}
				return `${this.valueName} did not match against these values: ${againstValueName}`;
			},
	
			//! remember to set useFilter: true, if passing a value2 to use
			useFilter: false,
			//C match nothing //TODO verify this
			//L https://stackoverflow.com/questions/2930182/regex-to-not-match-any-characters
			filterExpression: '\\b\\B',
			filterRequirements: 'none',
			get filterMessage() {
				return `${this.valueName} did not meet these requirements: ${this.filterRequirements}`;
			},
	
			custom: undefined,
		},
	}),
	prototypeProperties: parent => ({
		//TODO how to deal with returning the password field since its sensitive
		async checkType(value) {
			//C check against each datatype
			for (let i = 0; i < this.dataTypes.length; i++) {
				if (sj.isType(value, this.dataTypes[i])) {
					return new sj.Success({
						origin: `${this.origin}.checkType()`,
						message: 'validated data type',
						content: value,
					});
				}

				//C parse strings for numbers
				if (sj.isType(value, String)) {
					let parsed = Number.parseFloat(value);
					if (this.dataTypes[i] === 'number' && !Number.isNaN(parsed) 
					|| this.dataTypes[i] === 'integer' && Number.isInteger(parsed)) {
						return new sj.Success({
							origin: `${this.origin}.checkType()`,
							message: 'validated data type',
							content: parsed,
						});
					}

					//TODO parse strings for boolean & symbols & other?
				}
			}

			//C throw if no matches
			throw new sj.Error({
				log: true,
				origin: `${this.origin}.checkType()`,
				message: `${this.valueName} must be a ${this.dataTypes.join(' or ')}`,
				content: value,
			});
		},
		async checkSize(value) {
			let m = `${this.valueName} must be between ${this.min} and ${this.max}`;

			if (sj.isType(value, String)) {
				//C string length
				if (!(value.length >= this.min && value.length <= this.max)) {
					throw new sj.Error({
						log: true,
						origin: `${this.origin}.checkSize()`,
						message: `${m} characters long`,
						content: value,
					});
				}
			} else if (sj.isType(value, Number)) {
				//C number size
				if (!(value >= this.min && value <= this.max)) {
					throw new sj.Error({
						log: true,
						origin: `${this.origin}.checkSize()`,
						message: `${m} items long`,
						content: value,
					});
				}
			}

			return new sj.Success({
				origin: `${this.origin}.checkSize()`,
				content: value,
			});
		},
		async checkAgainst (value, value2) {
			//C custom againstValue
			if (!sj.isType(value2, undefined)) {
				this.againstValue = value2;
			}

			if (Array.isArray(this.againstValue)) {
				//C arrays
				//R indexOf apparently uses === so this should be fine
				//L https://stackoverflow.com/questions/44172530/array-indexof-insensitive-data-type
				if (this.againstValue.indexOf(value) === -1) {
					throw new sj.Error({
						log: true,
						origin: `${this.origin}.checkAgainst() array`,
						message: this.againstMessage,
						content: value,
					});
				}
			} else {
				//C base value
				if (!(value === this.againstValue)) {
					throw new sj.Error({
						log: true,
						origin: `${this.origin}.checkAgainst() non-array`,
						message: this.againstMessage,
						content: value,
					});
				}
			}

			return new sj.Success({
				origin: `${this.origin}.checkAgainst()`,
				content: value,
			});
		},
		async checkFilter(value, value2) {
			//C custom againstValue
			if (sj.isType(value2, undefined)) {
				this.filterExpression = value2;
			}

			//TODO

			return new sj.Success({
				origin: `${this.origin}.checkAgainst()`,
				content: value,
			});
		},

		async checkCustom(value) {
			if (typeof this.custom === 'function') {
				return this.custom(value);
			} else {
				return new sj.Success({
					origin: `${this.origin}.checkCustom()`,
					content: value,
				});
			}
		},

		/* //OLD
			//TODO //! convert this.dataType to this.dataTypes forEach loop if re implementing this as in checkType()
			checkType(value) {
				let t = sj.typeOf(value);

				//C if value is a string and dataType is a number or integer

				if (this.dataType === 'number' && t === 'string') {
					//C	try to parse the string and check if it is a number
					//L	https://www.w3schools.com/jsref/jsref_parsefloat.asp
					let p = parseFloat(value);
					if (!Number.isNaN(p)) {
						//C if so, convert it to the parsed number and return
						value = p;
						return true;
					}
					return false;
				}
				if (this.dataType === 'integer') {
					if (t === 'string') {
						let p = parseInt(value);
						if (Number.isInteger(p)) {
							value = p;
							return true;
						}
						return false;
					}

					// if not a string, just see if its an integer
					return Number.isInteger(value);
				}

				return t === this.dataType;
			}
			checkSize(value) {
				if (sj.typeOf(value) === 'string' || sj.typeOf(value) === 'array') {
					return value.length >= this.min && value.length <= this.max;
				} else if (sj.typeOf(value) === 'number') {
					return value >= this.min && value <= this.max;
				} else {
					return true;
				}
			}	
			checkAgainst(value, value2) {
				// allow custom check against value
				if (sj.typeOf(value2) !== 'undefined') {
					this.againstValue = value2;
				}

				if (Array.isArray(this.againstValue)) {
					return this.againstValue.indexOf(value) !== -1;
				} else {
					//! no type coercion
					return value === this.againstValue;
				}
			}	
			checkFilter(value, value2) {
				//TODO regex, similar to checkAgainst
				return true;
			}
		*/

		//! validation and type conversion (and //TODO security, and database checks) are all part of this Rules check
		//TODO should sj.Rule be exposed in globals if it contains the security checks? is that safe? - ideally, database checks should also be implemented so 'name already taken' errors show up at the same time basic validation errors do. Basically theres three waves in most cases - isLoggedIn (ok to be in a separate wave because it should rarely happen, and assumes the user knows what they're doing except being logged in - or would this be useful in the same wave too?), basic validation, database validation. < SHOULD ALL VALIDATION CHECKS BE IN ONE WAVE?

		//! to use the possibly modified value from check(), set the input value to equal the result.content
		async check(value, value2) {
			//L Guard Clauses: https://medium.com/@scadge/if-statements-design-guard-clauses-might-be-all-you-need-67219a1a981a
			//C Guard clauses (for me) should be positively-phrased conditions - but wrapped in a single negation: if(!(desiredCondition)) {}

			//C trim
			if (this.trim && sj.isType(value, String)) {
				value = value.trim();
			}

			//C checks & possibly modifies
			value = await this.checkType(value).then(sj.content); //R no need to catch and return the content as it will be in the thrown error anyways
			await this.checkSize(value);
			if (this.useAgainst) {
				await this.checkAgainst(value, value2);
			}
			if (this.useFilter) {
				await this.checkFilter(value, value2);
			}
			if (typeof this.custom === 'function') {
				await this.checkCustom(value);
			}
			
			/*
				if (!this.checkType(value)) {
					throw new sj.Error({
						log: this.log,
						origin: this.origin,
						message: `${this.valueName} must be a ${this.dataType}`,
					})
				}
				if (this.trim && sj.typeOf(value) === 'string') {
					value = value.trim();
				}


				if (!this.checkSize(value)) {
					let message = `${this.valueName} must be between ${this.min} and ${this.max}`;
					if (sj.typeOf(value) === 'string') {
						message = `${message} characters long`;
					} else if (sj.typeOf(value) === 'array') {
						message = `${message} items long`;
					}

					throw new sj.Error({
						log: this.log,
						origin: this.origin,
						message: message,
					});
				}
				if (this.useAgainst && !this.checkAgainst(value, value2)) {
					throw new sj.Error({
						log: this.log,
						origin: this.origin,
						message: this.againstMessage,
					});
				}
				if (this.useFilter && !this.checkFilter(value, value2)) {
					throw new sj.Error({
						log: this.log,
						origin: this.origin,
						message: this.filterMessage,
					});
				}
			*/
			
			//C remove error-related properties
			this.target = undefined;
			//TODO consider inputCorrect styling
			this.cssClass = undefined; 
			this.content = value;
			//C transform object (this will strip any irrelevant properties away)
			return new sj.Success(this); 		
		},

		/* //OLD decided this was redundant
			//C checks an object's property and possibly modify it, this is done so that properties can be passed and modified by reference for lists
			//? this may not be needed over check(), see sj.Rule.checkRuleSet() in global-server.js
			async checkProperty(obj, prop, value2) {
				//C validate arguments
				if (!sj.isType(obj, 'object')) {
					throw new sj.Error({
						log: true,
						origin: 'sj.Rule.checkProperty()',
						message: 'validation error',
						reason: `sj.Rule.checkProperty()'s first argument is not an object`,
						content: obj,
					});
				}
				if (!prop in obj) {
					//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
					throw new sj.Error({
						log: true,
						origin: 'sj.Rule.checkProperty()',
						message: 'validation error',
						reason: `sj.Rule.checkProperty()'s object argument is missing a '${prop}' property`,
						content: obj,
					});
				}

				//C check rules
				let result = this.check(obj[prop], value2).catch(rejected => {
					//C throw error if failed 
					//! do not modify the original property, so that sj.Error.content is not relied upon to always be the original property
					throw sj.propagate(rejected);
				});

				//C modify and return if successful
				obj[prop] = result.content;
				return result;
			}
		*/
		/* //OLD, new check ruleset was created in global-server.js
			static async checkRuleSet(ruleSet) {
				//C takes a 2D array of [[sj.Rule, obj, propertyName, value2(optional)], [], [], ...]
				return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => {
					//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

					//C validate arguments
					if (!rules instanceof this) {
						return new sj.Error({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() is missing a sj.Rule object`,
							content: rules,
						});
					}

					//C check, return errors too
					return await rules.checkProperty(obj, prop, value2).catch(sj.andResolve);
				})).then(resolved => {
					//C filter for sj.Success objects
					return sj.filterList(resolved, sj.Success, new sj.Success({
						origin: 'sj.Rule.checkRuleSet()',
						message: 'all rules validated',
					}), new sj.Error({
						origin: 'sj.Rule.checkRuleSet()',
						message: 'one or more issues with rules',
						reason: 'validation functions returned one or more errors',
					}));
				}).catch(rejected => {
					throw sj.propagate(rejected);
				});
			}
		*/
		/* //OLD
			//! checkRuleSet takes a reference object and the property name, value modification is then done automatically
			static async checkRuleSet(ruleSet) {
				//C takes a 2D array of [[sj.Rule, obj, propertyName, value2(optional)], [], [], ...]

				return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => { 
					//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

					//C validate arguments
					if (!(rules instanceof sj.Rule)) {
						//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
						//? is it possible to dynamically get this class
						return new sj.Error({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() is missing a sj.Rule object`,
							content: rules,
						});
					}
					if (!(typeof obj === 'object' && sj.typeOf(obj) !== 'null')) {
						//R cannot use just sj.typeOf(obj) here because it won't properly recognize any 'object'
						return new sj.Error({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() is missing an object argument`,
							content: obj,
						});
					}
					if (!(prop in obj)) {
						//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
						return new sj.Error({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() obj is missing a '${prop}' property`,
							content: obj,
						});
					}

					let result = new sj.Error(); //? why is this here

					//C call check() with 1 or 2 values
					if (sj.typeOf(value2) === 'undefined') {
						result = await rules.check(obj[prop]).then(sj.sj.andResolve());
					} else {
						result = await rules.check(obj[prop], value2).then(sj.sj.andResolve());
					}

					//C pass the possibly modified value back to the original object
					obj[prop] = result.content;

					return result;
				})).then(resolved => {
					return sj.filterList(resolved, sj.Success, new sj.Success({
						origin: 'checkRuleSet()',
						message: 'all rules validated',
					}), new sj.Error({
						origin: 'checkRuleSet()',
						message: 'one or more issues with fields',
						reason: 'validation functions returned one or more errors',
					}));
				}).catch(rejected => {
					throw sj.propagate(rejected);
				});
			}
		*/
	}),
	staticProperties: parent => ({
		//! string to be hashed must not be greater than 72 characters (//? or bytes???),
		stringMaxLength: 100,
		bigStringMaxLength: 2000,
		nameMinLength: 3,
		nameMaxLength: 16,
		defaultColor: '#ffffff',
		visibilityStates: [
			'public',
			'private',
			'linkOnly',
		],
	}),
});
sj.Rule.augmentClass({ //C add custom sj.Rules as statics of sj.Rule
	staticProperties: parent => ({
		none: new sj.Rule({
			origin: 'noRules',
			message: 'value validated',
		
			valueName: 'Value',
		
			dataTypes: ['string', 'number', 'boolean', 'array'], //TODO etc. or just make functionality for this
		}),
		posInt: new sj.Rule({
			origin: 'positiveIntegerRules',
			message: 'number validated',
		
			valueName: 'Number',
		
			dataTypes: ['integer'],
		}),
		id: new sj.Rule({
			origin: 'idRules',
			message: 'id validated',
		
			valueName: 'id',
		
			dataTypes: ['integer'],
		}),
		image: new sj.Rule({
			origin: 'imageRules',
			message: 'image validated',
			target: 'playlistImage',
			cssClass: 'inputError',
		
			valueName: 'image',
			trim: true,
		
			max: sj.Rule.bigStringMaxLength,
		
			// TODO filter: ___,
			filterMessage: 'Image must be a valid url',
		}),
		color: new sj.Rule({
			origin: 'colorRules',
			message: 'color validated',
			target: 'playlistColor',
			cssClass: 'inputError',
		
			valueName: 'color',
			trim: true,
			
			filter: '/#([a-f0-9]{3}){1,2}\b/', //TODO is this correct?
			filterMessage: 'Color must be in hex format #XXXXXX',
		}),
		visibility: new sj.Rule({
			origin: 'visibilityRules',
			message: 'visibility validated',
			target: 'playlistVisibility',
			cssClass: 'inputError',
		
			valueName: 'Visibility',
		
			useAgainst: true,
			againstValue: sj.Rule.visibilityStates,
			againstMessage: 'please select a valid visibility level',
		}),

		//TODO other / old
		//? not sure what these were used for
		self: new sj.Rule({
			origin: 'selfRules',
			message: 'self validated',
			target: 'notify',
			cssClass: 'notifyError',
		
			valueName: 'Id',
		
			dataTypes: ['integer'],
		
			useAgainst: true,
			//! ctx.session.user.id shouldn't be used here because there is no guarantee ctx.session.user exists
			againstMessage: 'you are not the owner of this',
		}),
		setPassword: new sj.Rule({
			origin: 'setPasswordRules',
			message: 'password validated',
			target: 'registerPassword',
			cssClass: 'inputError',
		
			valueName: 'Password',
		
			min: 6,
			max: 72, //! as per bcrypt
		
			useAgainst: true,
			get againstMessage() {return 'Passwords do not match'},
		}),
	}),
});

sj.Rule2 = sj.Base.makeClass('Rule2', sj.Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			if (
				typeof accessory.options.baseValidate !== 'function' ||
				typeof accessory.options.baseCast !== 'function'
			) throw new sj.Error({
				origin: 'sj.Rule2.beforeInit()',
				reason: 'baseValidate or baseCast is not a function',
				content: sj.image(accessory.options),
			});
		},
		defaults: {
			//G baseValidate() and baseCast() may be synchronous or async, the caller should know which. But if it doesn't, call with await, as it wont affect the result of synchronous functions.

			//G baseValidate() should have one or many, sequential and/or parallel conditions that do nothing if passed and throw a specific error (with placeholders) if failed, this error should be SilentError/log: false, as it is caught and processed in validate()
			baseValidate(value, accessory) {
				throw new sj.SilentError({
					origin: 'sj.Rule2.baseValidate()',
					reason: `a baseValidate() function has not been created for this rule: ${this.name}`,
				});
			},

			//G baseCast() should have one or more sequential casting functions (which may error freely) that modify accessory.castValue
			//G baseCast() may use other rule's casting methods. but because they have their own internal casting steps, pass the castValue and the accessory object so that even if the casting function fails, the castValue will still retain any modifications: rule.validateCast(accessory.castValue, accessory); 
			//R this is important because otherwise the casting method will just fail, leaving the castValue as the original, causing unexpected error messages (casting '4' as an integer would fail with 'not a number' instead of 'not an integer' because first the number casting would fail, leaving the castValue as a string, then validation would return the 'not a number' error).
			baseCast(accessory) {
				new sj.Warn({
					log: true,
					origin: 'sj.Rule2.baseCast()',
					reason: `a baseCast() function has not been created for this rule: ${this.name}`,
				});
			},

			//C string or array of strings used to replace $0, $1, $2... of specific properties (reason and message so far) of an error and it's content errors if error is an ErrorList
			fill: 'Value',
		},
		afterInitialize() {
			//C baseValidate and baseCast are guaranteed to be functions, this distinguishes between 'Function' and 'AsyncFunction'
			const isValidateSync = this.baseValidate.constructor.name === 'Function';
			const isCastSync = this.baseCast.constructor.name === 'Function';

			//C try-catch blocks are used for both async and sync to increase clarity

			if (isValidateSync) {
				//C calls baseValidate(), returns value on pass, throws a processed error on fail
				this.validate = function (value, accessory = {}) {
					try {
						this.baseValidate(value, accessory);
						return value;
					} catch (e) {
						throw this.processError(e, accessory);
					}
				};
				//C calls validate but instead returns true on pass and false on error
				this.check = function (value, accessory = {}) {
					try {
						this.validate(value, accessory);
						return true;
					} catch (e) {
						return false;
					}
				};
			} else {
				this.validate = async function (value, accessory = {}) {
					try {
						await this.baseValidate(value, accessory);
						return value;
					} catch (e) {
						throw this.processError(e, accessory);
					}
				};
				this.check = async function (value, accessory = {}) {
					try {
						await this.validate(value, accessory);
						return true;
					} catch (e) {
						return false;
					}
				};
			}

			if (isValidateSync && isCastSync) {
				//C validate that uses the value from cast() instead of the original value, also returns the cast value
				this.validateCast = function (value, accessory = {}) {
					//C Casted values are stored on the accessory object so that upon error, the last successfully cast value can be used. 
					//R This removes the need to write a bunch of try/catch blocks inside the baseCast method.
					//R cast() was originally it's own function, however it was moved into validateCast() because it wasn't supposed to be used on its own as the casted value wasn't guaranteed to be correctly cast without throwing an error, as some values cannot be cast (negative to positive) it would've involved just re-validating the cast inside the function which is redundant.

					//C The castValue starts as the original value.
					accessory.castValue = value;
					try {
						//C Don't throw upon baseCast() error, just use the last successful castValue and apply the respective validate() error.
						/* //R 
							why not just throw the error and forget about the last successfully cast value?
							
							casting errors aren't very user friendly (because the user won't know what cast means), so just delegate the error handling to whats already written in the validate function
							
							Example: while '2.35' can be cast to the number, it cannot (in this example) be cast to an integer. the validator will throw 'number is not an integer' for this STRING, rather than having cast throw 'cannot cast number to integer'.
						*/
						this.baseCast(accessory);
					} catch (e) {};

					try {
						return this.validate(accessory.castValue, accessory);
					} catch (e) {
						throw this.processError(e, accessory);
					}
				};
				//C same as check(), just uses validateCast() instead of validate()
				this.checkCast = function (value, accessory = {}) {
					try {
						this.validateCast(value, accessory);
						return true;
					} catch (e) {
						return false;
					}
				};
			} else {
				this.validateCast = async function (value, accessory = {}) {
					accessory.castValue = value;
					try {
						await this.baseCast(accessory);
					} catch (e) {};

					try {
						return await this.validate(accessory.castValue, accessory);
					} catch (e) {
						throw this.processError(e, accessory);
					}
				};
				this.checkCast = async function (value, accessory = {}) {
					try {
						await this.validateCast(value, accessory);
						return true;
					} catch (e) {
						return false;
					}
				};
			}
		},
	}),
	prototypeProperties(parent) {
		//C name property is tied to the rule-instance's key inside sj.Rule2, otherwise undefined
		Object.defineProperty(this, 'name', {
			get() {
				return Object.keys(this.constructor).find(key => this.constructor[key] === this);
			},
		});

		return {
			fillError(error, fill) {
				//C replace placeholders
				sj.any(fill).forEach((item, index) => {
					const string = String(item);
					error.reason = error.reason.replace(`$${index}`, string);
					error.message = error.message.replace(`$${index}`, string);
				});
			},
			processError(targetError, {fill = this.fill, error, origin}) {
				//C may receive custom fill, error, and origin fields from accessory at call invocation

				//C fill error
				this.fillError(targetError, fill);
	
				//C if ErrorList
				if (sj.isType(targetError, sj.ErrorList)) {
					//C fill each item
					for (const listError of targetError.content) {
						this.fillError(listError, fill);
					}
				}
	
				throw new sj.Error({
					...targetError,
					//C custom properties //! will overwrite any filled properties
					...error,
					//C fixed properties
					origin,
				});
			},
		};
	},
});
sj.Rule2.augmentClass({
	staticProperties: parent => ({
		// STRING
		string: new sj.Rule2({
			baseValidate(value) {
				if (!sj.isType(value, String)) throw new sj.SilentError({
					origin: 'sj.Rule2.string.baseValidate()',
					reason: '$0 is not a string',
					message: '$0 must be text.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				//C a failed stringify can still be turned in to a string
				if (typeof accessory.castValue === 'object') {
					try { 
						accessory.castValue = JSON.stringify(accessory.castValue); 
					} catch (e) {} 
				}
				accessory.castValue = String(accessory.castValue);
			},
		}),
		trimmed: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.string.validate(value);
				//TODO ensure that this regExp checks for all possible white space
				//L from the trim() polyfill at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
				if (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g.test(value)) throw new sj.SilentError({
					origin: 'sj.Rule2.trimmed.baseValidate()',
					reason: '$0 is not trimmed',
					message: '$0 must not have any leading or trailing whitespace.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.string.validateCast(accessory.castValue, accessory);
				accessory.castValue = accessory.castValue.trim();
			},
		}),
		nonEmptyString: new sj.Rule2({
			//C string has any non-whitespace characters
			baseValidate(value) {
				sj.Rule2.string.validate(value);
				if (value.trim() === '') throw new sj.SilentError({
					origin: 'sj.Rule2.nonEmptyString.baseValidate()',
					reason: '$0 is empty or only has whitespace',
					message: '$0 must not be empty.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.string.validateCast(accessory.castValue, accessory);
				//! cannot cast any further than a string
			},
		}),

		// NUMBER
		number: new sj.Rule2({
			baseValidate(value) {
				if (!sj.isType(value, Number)) throw new sj.SilentError({
					origin: 'sj.Rule2.number.baseValidate()',
					reason: '$0 is not a number',
					message: '$0 must be a number.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				//C parse strings for floats
				//! do not cast to NaN
				const n = Number.parseFloat(accessory.castValue);
				if (!Number.isNaN(n)) accessory.castValue = n;
			},
		}),
		nonNaNNumber: new sj.Rule2({
			baseValidate(value) {
				if (!sj.isType(value, Number) || Number.isNaN(value)) throw new sj.SilentError({
					origin: 'sj.Rule2.nonNaNNumber.baseValidate()',
					reason: '$0 is not a number or is NaN',
					message: '$0 must be a number.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.number.validateCast(accessory.castValue, accessory);
				//! don't cast NaN to a non-NaN number
			},
		}),

		nonNegativeNumber: new sj.Rule2({
			baseValidate(value) {
				//L don't worry about NaN here: https://stackoverflow.com/a/26982925
				sj.Rule2.number.validate(value);
				if (value < 0) throw new sj.SilentError({
					origin: 'sj.Rule2.nonNegativeNumber.baseValidate()',
					reason: '$0 is negative',
					message: '$0 must not be negative.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.number.validateCast(accessory.castValue, accessory);
				//! don't cast negative number to a non-negative number
			},
		}),
		nonPositiveNumber: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.number.validate(value);
				if (0 < value) {
					throw new sj.SilentError({
						origin: 'sj.Rule2.nonPositiveNumber.baseValidate()',
						reason: '$0 is positive',
						message: '$0 must not be positive.',
						content: sj.image(value),
					});
				}
			},
			baseCast(accessory) {
				sj.Rule2.number.validateCast(accessory.castValue, accessory);
				//! don't cast positive number to a non-positive number
			},
		}),
		positiveNumber: new sj.Rule2({
			baseValidate(value) {
				//L don't worry about NaN here: https://stackoverflow.com/a/26982925
				sj.Rule2.number.validate(value);
				if (value <= 0) throw new sj.SilentError({
					origin: 'sj.Rule2.positiveNumber.baseValidate()',
					reason: '$0 is negative or 0',
					message: '$0 must be positive.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.number.validateCast(accessory.castValue, accessory);
				//! don't cast non-positive number to a positive number
			},
		}),
		negativeNumber: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.number.validate(value);
				if (0 <= value) throw new sj.SilentError({
					origin: 'sj.Rule2.negativeNumber.baseValidate()',
					reason: '$0 is positive or 0',
					message: '$0 must be negative.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.number.validateCast(accessory.castValue, accessory);
				//! don't cast non-negative number to a negative number
			},
		}),

		// INTEGER
		integer: new sj.Rule2({
			baseValidate(value) {
				//L don't worry about NaN here: https://stackoverflow.com/a/26982925
				sj.Rule2.number.validate(value);
				if (!Number.isInteger(value)) throw new sj.SilentError({
					origin: 'sj.Rule2.integer.baseValidate()',
					reason: '$0 is not an integer',
					message: '$0 must be an integer.',
					content: sj.image(value),
				});
			},
			baseCast(accessory) {
				sj.Rule2.number.validateCast(accessory.castValue, accessory);
				//C chops any decimal off of floats
				//! this may give misleading errors, as the value will no longer fail because it's not an integer but because it's chopped value fails some other condition
				accessory.castValue = Number.parseInt(accessory.castValue);
			},
		}),
		
		nonNegativeInteger: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.nonNegativeNumber.validate(value);
				sj.Rule2.integer.validate(value);
			},
			baseCast(accessory) {
				sj.Rule2.nonNegativeNumber.validateCast(accessory.castValue, accessory);
				sj.Rule2.integer.validateCast(accessory.castValue, accessory);
			},
		}),	
		nonPositiveInteger: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.nonPositiveNumber.validate(value);
				sj.Rule2.integer.validate(value);
			},
			baseCast(accessory) {
				sj.Rule2.nonPositiveNumber.validateCast(accessory.castValue, accessory);
				sj.Rule2.integer.validateCast(accessory.castValue, accessory);
			},
		}),
		positiveInteger: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.positiveNumber.validate(value);
				sj.Rule2.integer.validate(value);
			},
			baseCast(accessory) {
				sj.Rule2.positiveNumber.validateCast(accessory.castValue, accessory);
				sj.Rule2.integer.validateCast(accessory.castValue, accessory);
			},
		}),
		negativeInteger: new sj.Rule2({
			baseValidate(value) {
				sj.Rule2.negativeNumber.validate(value);
				sj.Rule2.integer.validate(value);
			},
			baseCast(accessory) {
				sj.Rule2.negativeNumber.validateCast(accessory.castValue, accessory);
				sj.Rule2.integer.validateCast(accessory.castValue, accessory);
			},
		}),
	}),
});

// SUCCESS //C success and error objects are returned from functions (mostly async ones)
sj.Success = sj.Base.makeClass('Success', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			// NEW
			timestamp: undefined,
		},
	}),	
});
sj.SuccessList = sj.Base.makeClass('SuccessList', sj.Success, {
	constructorParts: parent => ({
		//C wrapper for an array of successful items
		defaults: {
			// OVERWRITE
			reason: 'all items successful',
			content: [],
		},
	}),
});
sj.Warn = sj.Base.makeClass('Warn', sj.Success, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: true,
		},
	}),
});

sj.Credentials = sj.Base.makeClass('Credentials', sj.Success, {
	constructorParts: parent => ({
		//TODO allowUnknown: true,

		defaults: {
			//TODO this part should only be server-side 
			//TODO consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials
			authRequestKey: Symbol(), //! this shouldn't break sj.checkKey(), but also shouldn't match anything
			authRequestTimestamp: 0,
			authRequestTimeout: 300000, //C default 5 minutes
			authRequestURL: '',
			authCode: Symbol(),
			
			accessToken: Symbol(),
			expires: 0,
			refreshToken: Symbol(),
			refreshBuffer:  60000, //C 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value
			
			scopes: [],
		},
	}),
});


// ENTITIES
sj.Entity = sj.Base.makeClass('Entity', sj.Success, {
	constructorParts: parent => ({
		afterInitialize(accessory) {
			const that = this; //? is this necessary?
			this.filters = {};
			Object.keys(that.constructor.filters).forEach(key => {
				Object.defineProperties(that.filters, {
					[key]: {
						get: function () { 
							return pick(that, that.constructor.filters[key]);
						}
					}
				});
			});
		},
		defaults: {
			// NEW
			id: undefined,
		},
	}),
	staticProperties(parent) {
		// GETTER
		Object.defineProperty(this, 'table', {
			get: function () {
				return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
			},
		}); 

		return {
			//TODO how to make these immutable?

			//C list of references to child classes, these should be added in the child's static constructor
			children: [],

			filters: {
				id: ['id'],
			},

			//C automatically create new filters based on schema
			updateFilters() {
				let methodNames = ['add', 'get', 'edit', 'remove'];
				let types = ['in', 'out', 'check'];
			
				let schemaFilters = {};
			
				Object.keys(this.schema).forEach(key => { //C for each property
					methodNames.forEach(methodName => { //C for each crud method
						types.forEach(type => { //C for each filter type
							if (this.schema[key][methodName][type]) { //C if property is optional or required
								let filterName = methodName + type.charAt(0).toUpperCase() + type.slice(1); //C add it to the specific filter
								if (!schemaFilters[filterName]) schemaFilters[filterName] = [];
								schemaFilters[filterName].push(key);
							}
						});
					});
				});
			
				this.filters = {
					...this.filters,
					...schemaFilters,
				};
			},

			tableToEntity(tableName) {
				const Entity = this.children.find(child => child.table === tableName);
				if (!sj.isType(new Entity(), sj.Entity)) throw new sj.Error({
					origin: 'sj.Entity.tableToEntity()',
					reason: `table is not recognized: ${tableName}`,
					content: tableName,
				});
				return Entity;

				//R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
				//R any metadata (table) should be sent separately (or implicitly) from the query
			},
		}
	},
});
// schema property states //TODO could these be static on sj.Entity and called via this.x ?
const unused = {
	in: false,
	out: false,
	check: 0,
};
const optional = {
	in: true,
	out: true,
	check: 1,
};
const required = {
	in: true,
	out: true,
	check: 2,
};
const auto = {
	in: false,
	out: true,
	check: 0,
};
sj.User = sj.Base.makeClass('User', sj.Entity, {
	constructorParts: parent => ({
		defaults: {
			// NEW
			name: '',
			email: '',
			password: '',
			password2: '',
			spotifyRefreshToken: null,
			socketId: null,
		},
	}),
	staticProperties(parent) {
		parent.children.push(this);

		this.schema = {
			//G 0 = unused, 1 = optional, 2 = required
			id: {
				columnName: 'id',
				rule: sj.Rule.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			name: {
				columnName: 'name',
				rule: new sj.Rule({
					origin: 'userNameRules',
					message: 'username validated',
					target: 'registerUserName',
					cssClass: 'inputError',
				
					valueName: 'Username',
					trim: true,
				
					min: sj.Rule.nameMinLength,
					max: sj.Rule.nameMaxLength,
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			email: {
				columnName: 'email',
				rule: new sj.Rule({
					origin: 'emailRules',
					message: 'email validated',
					target: 'registerEmail',
					cssClass: 'inputError',
				
					valueName: 'E-mail',
					trim: true,
				
					min: 3,
					max: sj.Rule.stringMaxLength,
				
					//TODO useFilter: ___, filterMessage: ___, 
					//L https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			password: {
				columnName: 'password',
				rule: new sj.Rule({
					origin: 'passwordRules',
					message: 'password validated',
					target: 'registerPassword',
					cssClass: 'inputError',
				
					valueName: 'Password',
				
					min: 6,
					max: 72, //! as per bcrypt
				}),
	
				add: required,
				get: unused,
				edit: {
					in: true,
					out: false,
					check: 1,
				},
				remove: unused,
			},
			spotifyRefreshToken: {
				columnName: 'spotifyRefreshToken',
				rule: new sj.Rule({
					origin: 'spotifyRefreshTokenRules',
					message: 'token validated',
				
					valueName: 'Token',
					//TODO empty for now
				}),
	
				add: unused,
				get: {
					in: false,
					out: true,
					check: 0,
				},
				edit: optional,
				remove: unused,
			},
		};
		this.updateFilters();
	},
});
sj.Playlist = sj.Base.makeClass('Playlist', sj.Entity, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			content: [], //? is this required to be an array, tracks aren't stored here anymore
	
			// NEW
			userId: undefined,
			name: '',
			visibility: '',
			description: '',
			color: '',
			image: '',
		},
	}),
	staticProperties(parent) {
		parent.children.push(this);

		this.schema = {
			id: {
				columnName: 'id',
				rule: sj.Rule.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			userId: {
				columnName: 'userId',
				rule: sj.Rule.id,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			name: {
				columnName: 'name',
				rule: new sj.Rule({
					origin: 'playlistNameRules()',
					message: 'name validated',
					target: 'playlistName',
					cssClass: 'inputError',
				
					valueName: 'Name',
					trim: true,
				
					min: sj.Rule.nameMinLength,
					max: sj.Rule.stringMaxLength,  
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			description: {
				columnName: 'description',
				rule: new sj.Rule({
					origin: 'descriptionRules()',
					message: 'description validated',
					target: 'playlistDescription',
					cssClass: 'inputError',
				
					valueName: 'Description',
				
					max: sj.Rule.bigStringMaxLength,
					trim: true,
				}),
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			visibility: {
				columnName: 'visibility',
				rule: sj.Rule.visibility,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			image: {
				columnName: 'image',
				rule: sj.Rule.image,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			color: {
				columnName: 'color',
				rule: sj.Rule.color,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
		};
		this.updateFilters();
	},
});
sj.Track = sj.Base.makeClass('Track', sj.Entity, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//C find existing source by track.source.name and set it as the reference
			if (sj.isType(accessory.options.source, Object)) {
				const found = sj.Source.instances.find(source => source.name === accessory.options.source.name);
				if (found) accessory.options.source = found;
				else new sj.Warn({
					origin: 'sj.Track.beforeInitialize()',
					reason: 'source was passed but it is not an existing source',
					content: accessory.options.source,
				});
			};
		},
		defaults: {
			// NEW
			playlistId:	null,
			position:	null,
			source:		null, //! before was sj.noSource, but this creates a circular reference error (only sometimes??)
			sourceId:	null, // TODO assumes ids are unique, even across all sources
			artists:	[],
			name:		null,
			duration:	null, //! cannot be 0 or else it will not trigger sj.isEmpty() and will actually be set as 0
			link:		null,
		},
	}),
	staticProperties(parent) {
		parent.children.push(this);

		this.schema = {
			id: {
				columnName: 'id',
				rule: sj.Rule.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			playlistId: {
				columnName: 'playlistId',
				rule: sj.Rule.id,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			position: {
				columnName: 'position',
				rule: sj.Rule.posInt,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			name: {
				columnName: 'name',
				rule: new sj.Rule({
					origin: 'trackNameRules()',
					message: 'name validated',
				
					valueName: 'Name',
					trim: true,
				
					min: sj.Rule.nameMinLength,
					max: sj.Rule.stringMaxLength,  
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			duration: {
				columnName: 'duration',
				rule: sj.Rule.posInt,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			source: {
				columnName: 'source',
				rule: new sj.Rule({
					origin: 'sourceRules',
					message: 'source validated',
				
					valueName: 'Source',
				
					useAgainst: false, //TODO sourceList isn't populated in global.js, but main.js
	
					custom: function (value) {
						return sj.Source.instances.some(source => value === source.name);
					}
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			sourceId: {
				columnName: 'sourceId',
				rule: new sj.Rule({
					origin: 'sourceIdRules',
					message: 'source id validated',
				
					valueName: 'Source ID',
				
					//? any source id rules (other than being a string)? length? trim?
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			artists: {
				columnName: 'artists',
				rule: new sj.Rule({
					origin: 'sj.Rules.artists',
					message: 'artists validated',
			
					valueName: 'Artists',
			
					dataTypes: ['array'],
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			}
		};
		this.updateFilters();

		//G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.
		this.filters.localMetadata = ['id', 'playlistId', 'position'];
	},
});

sj.Source = sj.Base.makeClass('Source', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			// NEW
			name: undefined, //! source.name is a unique identifier
			nullPrefix: '',
			idPrefix: '',
			
			credentials: new sj.Credentials(),
	
			//TODO this should only be server-side
			api: {},
			scopes: [],
			authRequestManually: true,
			makeAuthRequestURL: function () {},
		},
		afterInitialize(accessory) {
			//C add source to static source list: sj.Source.instances
			this.constructor.instances.push(this);
		},
	}),
	
	staticProperties: parent => ({
		instances: [],
		find(name) {
			return this.instances.find(instance => instance.name === name);
		},
	}),
});

// LIVE DATA
sj.LiveTable = sj.Base.makeClass('LiveTable', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			Entity: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				liveQueries: [],
				cachedEntities: [],
			});
		},
	}),
	staticProperties: parent => ({
		makeTables(tableKeys) {
			return new Map(sj.Entity.children.map(Entity => [Entity, new this({Entity})]));
		},
	}),
});
sj.CachedEntity = sj.Base.makeClass('CachedEntity', sj.Base, {
	constructorParts: parent => ({
		defaults: {
			table: undefined,
			entity: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				liveQueryRefs: [],

				timestamp: 0,
			});
		},
	}),
});
sj.LiveQuery = sj.Base.makeClass('LiveQuery', sj.Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			if (sj.isType(accessory.options.query, Array)) accessory.options.query = sj.any(accessory.options.query);
		},
		defaults: {
			table: undefined,
			query: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				cachedEntityRefs: [],
				subscriptions: [],

				timestamp: 0,
			});
		},
	}),
});
sj.Subscription = sj.Base.makeClass('Subscription', sj.Base, {
	//? should this inherit from sj.Success since it will be returned from a function>
	constructorParts: parent => ({
		defaults: {
			liveQuery: undefined,

			onUpdate() {}, //C any update
			onAdd() {}, //C entities added
			onEdit() {}, //C entities data changed
			onRemove() {}, //C entities removed
		},
	}),
});


export default sj;
