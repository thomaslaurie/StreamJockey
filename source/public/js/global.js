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

// EXTERNAL
import fclone from 'fclone';

// INTERNAL
import {
	define,
	any,
	pick,
} from '../../shared/utility/index.js';
import Base from '../../shared/legacy-classes/base.js';
import propagate from '../../shared/propagate.js';
import * as constants from './constants.js';
import {
	Err,
	ErrorList,
	SilentError,
	AuthRequired,
	Unreachable,
	Timeout,
} from '../../shared/legacy-classes/error.js';



//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

const sj = {};

sj.test = async function test(tests, origin) {
	let failCount = 0;

	for (const [name, test] of tests) {
		if (!test) {
			console.error(`${origin} - test failed: ${name}`);
			failCount++;
		}
	}

	if (failCount === 0) {
		console.log(`%c${origin} - all tests passed`, 'background-color: #d0efd8');
		return true;
	} else {
		return false;
	}
};

// CONSTANTS
define.constant(sj, constants);


//   ██████╗██╗      █████╗ ███████╗███████╗    ██╗   ██╗████████╗██╗██╗     
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝    ██║   ██║╚══██╔══╝██║██║     
//  ██║     ██║     ███████║███████╗███████╗    ██║   ██║   ██║   ██║██║     
//  ██║     ██║     ██╔══██║╚════██║╚════██║    ██║   ██║   ██║   ██║██║     
//  ╚██████╗███████╗██║  ██║███████║███████║    ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝    ╚═╝   ╚═╝╚══════╝

//C these reference sj.Bases, don't call these until classes are defined

// SESSION //C holds login, get, logout, etc. methods
sj.session = {};

// TYPE
//TODO refactor this out, but this will be a lot of work to test
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
	
		if ((input instanceof Base || (typeof input.constructorName === 'string' && (() => { 
			//C input or input.constructorName is an instance of a constructible
			let Target = sj[input.constructorName];
			if (typeof Target === 'function') {
				tempInput = new Target({log: false}); //! This is absolutely wrong, as it assumes all arguments are optional. (Caused issue where the playback argument was required for sj.Sources).
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

// ERROR
sj.propagate = propagate;
sj.andResolve = function (rejected) {
	//C resolves/returns any errors thrown by sj.propagate()
	//G someAsyncFunction().catch(sj.andResolve);
	try {
		return sj.propagate(rejected);
	} catch (e) {
		return e;
	}
};

// FORMAT
sj.content = function (resolved) {
	//C shorter syntax for immediately returning the content property of a resolved object in a promise chain
	return resolved.content;
};

// LIVE DATA
sj.Subscriptions = function () {
	//C creates an array for each Entity type
	sj.Entity.children.forEach(child => {
		this[child.table] = [];
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

// ERROR
sj.Error = Err;
sj.ErrorList = ErrorList;

// CUSTOM ERRORS
sj.SilentError = SilentError;
sj.AuthRequired = AuthRequired;
sj.Unreachable = Unreachable;
sj.Timeout = Timeout;


// RULE
sj.Rule = Base.makeClass('Rule', Base, {
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

sj.Rule2 = Base.makeClass('Rule2', Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			if (
				typeof accessory.options.baseValidate !== 'function' ||
				typeof accessory.options.baseCast !== 'function'
			) throw new sj.Error({
				origin: 'sj.Rule2.beforeInit()',
				reason: 'baseValidate or baseCast is not a function',
				content: fclone(accessory.options),
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
				any(fill).forEach((item, index) => {
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
					content: fclone(value),
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
					content: fclone(value),
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
					content: fclone(value),
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
					content: fclone(value),
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
					content: fclone(value),
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
					content: fclone(value),
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
						content: fclone(value),
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
					content: fclone(value),
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
					content: fclone(value),
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
					content: fclone(value),
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
sj.Success = Base.makeClass('Success', Base, {
	constructorParts: parent => ({
		defaults: {
			// NEW
			timestamp: undefined,
		},
	}),	
});
sj.SuccessList = Base.makeClass('SuccessList', sj.Success, {
	constructorParts: parent => ({
		//C wrapper for an array of successful items
		defaults: {
			// OVERWRITE
			reason: 'all items successful',
			content: [],
		},
	}),
});
sj.Warn = Base.makeClass('Warn', sj.Success, {
	constructorParts: parent => ({
		defaults: {
			// OVERWRITE
			log: true,
		},
	}),
});

sj.Credentials = Base.makeClass('Credentials', sj.Success, {
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
sj.Entity = Base.makeClass('Entity', sj.Success, {
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
sj.User = Base.makeClass('User', sj.Entity, {
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
sj.Playlist = Base.makeClass('Playlist', sj.Entity, {
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
sj.Track = Base.makeClass('Track', sj.Entity, {
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

sj.Source = Base.makeClass('Source', Base, {
	constructorParts: parent => ({
		defaults: {
			// NEW
			name: undefined, //! source.name is a unique identifier
			register: false,
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
			//R Must be manually declared to register, as otherwise, temporary initializations get added and cause issue.
			if (this.register) this.constructor.register(this);
		},
	}),
	
	staticProperties: (parent) => ({
		instances: [],
		register(source) {
			if (!(source instanceof this)) {
				throw new InternalError({
					message: 'A non-Source was registered.',
				});
			}
			this.instances.push(source);
		},
		find(name) {
			return this.instances.find(instance => instance.name === name);
		},
	}),
});

// LIVE DATA
sj.LiveTable = Base.makeClass('LiveTable', Base, {
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
sj.CachedEntity = Base.makeClass('CachedEntity', Base, {
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
sj.LiveQuery = Base.makeClass('LiveQuery', Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			if (sj.isType(accessory.options.query, Array)) accessory.options.query = any(accessory.options.query);
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
sj.Subscription = Base.makeClass('Subscription', Base, {
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
