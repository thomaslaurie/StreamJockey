// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//L ASCII TITLE GENERATOR: http://patorjk.com/software/taag/#p=display&c=c%2B%2B&f=ANSI%20Shadow&t=playlist

	//R Promises: promises always return more promises (that are resolved or rejected), await (and furthermore async) is only needed to transform those resolved or rejected promises in to useable values, promises can be called and returned within a synchronous function (like map) they just pass on their evaluation to whatever they were returned to (see the implementation of Promise.all(...map()))
	//L Arrow Functions: when not to use - https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/
	//R catches should be attached behind every async function and not paired next to .then() - this straightens out the chain ordering (as opposed to two steps forward, one step back -style), this also stops upstream errors from triggering all downstream catches and nesting every error

	.on() should be bound to the closest non-dynamic element (because its faster?)
	.on('click'... is a delegated event (?) and is needed to work on dynamically generated elements
	.on() needs to bind to the target element, one that is guaranteed to exist on page creation, however the selector then filters for elements which might not exist yet

	//L es modules: https://developers.google.com/web/fundamentals/primers/modules, http://2ality.com/2014/09/es6-modules-final.html
	//L export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
	//L import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
	//L es modules in node (VERY USEFUL FOR HOW TO CONVERT TO ESMODULES): https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71

	//R I use negatively phrased guard clauses (!desired) because they keep the relative error close by in the script (rather than way down below at the bottom of an else statement or early escape function (using positively phrased clauses)) - see sj.rebuild()

	//L fetch vs axios: https://www.reddit.com/r/javascript/comments/6e0o99/fetch_polyfill_or_axios/
	//R axios is high level, fetch is middle level - i want this because its less magic, i actually want the functionality of fetch to be able to distinguish between failed requests and bad requests, i'm making a wrapper function anyways so the extra detail doesn't matter

	
	//G Object.assign(sj.Base, {...}) is used to assign static variables and methods
	//G (function () {..}).call(sj.Base); is better 

*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/* TODO 
	Model:
	Playback queue is a non-flawless system, though it should cover mostly all use cases, make this flawless in the future.

	Big:
	Break every single part of every module, see if all possible outcomes are caught and handled properly.
	Ensure everything has an error handler - most of the time 'throw sj.propagate(rejected);'.
	Fill in and make consistent content for all success, error, data objects.

	Add timeouts to async functions.

	Replace all 'var' with 'let' and 'const'

	Misc:
	// TODO replace .name properties with .title as name is reserved, actually name isnt reserved - its just a property of Functions, however all of these are constructor functions that return Objects with that property so it should be safe - convert title to name

	Consider name-spacing
	Console css formatting https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
	Default arguments and parameter destructuring: https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6/
	function myFunc({name = 'Default user', age = 'N/A'} = {}) {}
	Getter and setter syntaxes (allows the user of getter and setter functions by obj.property rather than obj.getProperty() or obj.setProperty())
	consider changing target: 'notify' to target: 'general' ?

    sort out methods vs functions & function () vs arrow functions
    
	consider making some default values (like '' and null) into Symbol(), so that they can't equal any passed value (null === null returns true), just beware of the behavior when stringifying symbols
	
	//L nesting optimization: https://thorstenlorenz.wordpress.com/2012/06/02/performance-concerns-for-nested-javascript-functions/
*/


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

let sj = {};

import fClone from './fclone.mjs'; //C https://github.com/soyuka/fclone

if (typeof fetch !== 'undefined') {
	//L typeof doesn't throw reference error: https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
	//L fetch also needs the window context: https://stackoverflow.com/questions/10743596/why-are-certain-function-calls-termed-illegal-invocations-in-javascript
	sj.fetch = fetch.bind(window);
} else {
	sj.fetch = async function () {
		throw new sj.Error({
			log: true,
			origin: 'global.mjs init',
			reason: 'fetch is not defined',
		});
	}
}
if (!Array.prototype.flat) {
    //L https://github.com/jonathantneal/array-flat-polyfill
	Object.defineProperties(Array.prototype, {
		flat: {
			configurable: true,
			value: function flat() {
				let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
				const stack = Array.prototype.slice.call(this);
				const result = [];

				while (depth && stack.length) {
					const next = stack.pop();

					if (Object(next) instanceof Array) {
						--depth;

						Array.prototype.push.apply(stack, next);
					} else {
						result.unshift(next);
					}
				}

				return result.concat(stack);
			},
			writable: true
		},
		flatMap: {
			configurable: true,
			value: function flatMap(callback) {
				return Array.prototype.map.apply(this, arguments).flat();
			},
			writable: true
		}
	});
}

//TODO make these actually constant with Object.defineProperty?
sj.SERVER_URL = `http://localhost:3000`;
sj.API_URL = `${sj.SERVER_URL}/api`;
sj.JSON_HEADER = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};
sj.URL_HEADER = {
	'Accept': 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded',
};

//C used to indicate a specific server error
sj.resolveActions = {
	spotifyAuth: 'spotify auth',
};


//  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗   ██╗
//  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
//  ██║   ██║   ██║   ██║██║     ██║   ██║    ╚████╔╝ 
//  ██║   ██║   ██║   ██║██║     ██║   ██║     ╚██╔╝  
//  ╚██████╔╝   ██║   ██║███████╗██║   ██║      ██║   
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   

//C these don't reference any sj.Bases

sj.test = async function(tests, origin) {
	tests.forEach((test, i) => {
		if (!test[1]) console.error(`${origin} - test failed: ${test[0]}`);
	});
};

// misc
sj.wait = async function (ms) {
    //C used for basic waiting, //! should not be used if the callback needs to be canceled
	return new Promise(resolve => {
		if (ms <= 2147483647) { //L maximum timeout length: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
			setTimeout(() => {
				resolve(`finished waiting ${ms}ms`);
			}, ms);
		}
	});
};
sj.trace = function (test) {
	try {
		throw Error('');
	} catch (e) {
		//TODO figure out how to properly display newlines as strings inside objects

		//C get stack
		let stackTrace0 = e.stack;
		//C 'file:///' is removed (so that the URIs are clickable in node)
		let stackTrace1 = sj.stringReplaceAll(stackTrace0, 'file:///', '');
		//C remove leading 'Error\n    ', to reduce confusion because trace isn't an error
		let stackTrace2 = sj.stringReplaceAll(stackTrace1, 'Error\n', '');
		//C removes any line with Object.sj.trace

		let ignore = [
			'Object.sj.trace',
			'new Base',
			'new Error',
			'Object.sj.catchUnexpected',
			'Object.sj.propagate',
			'sj.Error.announce',
		];
		ignore = sj.stringReplaceAll(ignore.join('|'), '.', '\.');
		let exp = new RegExp(`(?:(?:\\n|\n|\r|$)* *at(?: |\\n|\n|\r|$))(?:${ignore})(?:.+?(?=\\n|\n|\r|$))`, 'g');
		let stackTrace3 = sj.stringReplaceAll(stackTrace2, exp, '');

		return stackTrace3;
	}
};

sj.deepFreeze = function (obj) {
	// TODO test me
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

	// freeze nested objects
	Object.keys(obj).forEach(function(key) {
		obj[key] = obj[key] && typeof value === 'object' ? sj.deepFreeze(obj[key]) : obj[key];
	});
	
	// then freeze self
	return Object.freeze(object);
};

// format
sj.msFormat = function (ms) {
	// extract
	var minutes = Math.floor(ms / 60000);
	var seconds = Math.ceil(ms % 60000);

	// format
	seconds = ('0' + seconds).slice(-2);

	// returns ...0:00 format rounded up to the nearest second
	return minutes + ':' + seconds;
};
sj.stringReplaceAll = function(input, search, replace) {
	return input.split(search).join(replace);
};
sj.capFirst = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// HTTP
sj.encodeProps = function (obj) {
	//! every value is encoded as a string, objects as [object Object] and arrays as comma delimited encoded values
	return Object.keys(obj).map(key => {
		return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
	}).join('&');
};
sj.decodeProps = function (encoded) {
	//! every value is decoded as a string
	let pairs = encoded.split('&');
	let obj = {};
	pairs.forEach(pair => {
		let parts = pair.split('=');
		obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	});
	return obj;
};
sj.encodeList = function (list) {
	//C return a string of uri encoded key-value pairs for each property of each item, their keys suffixed with '-[index]'
	//! not called automatically by sj.request() because its useful to see when a encodeList exists as it needs to be unpacked on the other end
	let indexed = {};
	sj.any(list).forEach((obj, i) => {
		Object.keys(obj).forEach(key => {
			indexed[`${key}-${i}`] = obj[key];
		});
	});
	return sj.encodeProps(indexed);
};
sj.decodeList = function (encoded) {
	//C decodes a list of encoded objects with '-i' suffixed property keys
	//! any key not matching the format will be discarded
	let indexed = sj.decodeProps(encoded);
	let list = [];
	let indexedKeys = Object.keys(indexed);
	for (let i = 0; i < indexedKeys.length; i++) {
		//C validate delimiter
		let delimiterIndex = indexedKeys[i].lastIndexOf('-');
		if (delimiterIndex < 0) {break}

		//C validate index
		let objIndex = parseInt(indexedKeys[i].slice(delimiterIndex + 1)); //C handles multiple digits & no digits properly
		if (!sj.isType(objIndex, 'integer')) {break}

		//C get the real key
		let key = indexedKeys[i].slice(0, delimiterIndex);

		if (!sj.isType(list[objIndex], Object)) {
			//C if the obj doesn't exist yet, add it with the prop
			list[objIndex] = {
				[key]: indexed[indexedKeys[i]],
			};
		} else {
			//C otherwise add the prop to the existing object
			list[objIndex][key] = indexed[indexedKeys[i]];
		}
	}
	return list;
};

sj.shake = function (obj, properties) {
	//C returns a new object with only the desired properties
	let s = (obj, properties) => {
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			throw new sj.Error({
				origin: 'sj.shake()',
				reason: 'first argument is not an object',
				content: obj,
			});
		}
		if (!Array.isArray(properties)) {
			throw new sj.Error({
				origin: 'sj.shake()',
				reason: 'second argument is not an array',
				content: properties,
			});
		}
		/* //R properties can be symbols, or any variable in maps
			if (!properties.each(property => typeof property === 'string')) {
				throw new sj.Error({
					origin: 'sj.shake()',
					reason: "second argument's items are not all strings",
					content: properties,
				});
			}
		*/

		let newObj = {};
		properties.forEach(prop => {
			if (obj[prop] !== undefined) {
				newObj[prop] = obj[prop];
			}
		});
		return newObj;
	}

	//C handle objects and arrays of objects
	if (Array.isArray(obj)) return obj.map(item => s(item, properties));
	else return s(obj, properties);
};
sj.shake.test = function () {
	sj.test([
		['simple', true === sj.deepMatch(sj.shake([{a: 'a', b: 'b'}, {a: 'a', c: 'c'}], ['a']), [{a: 'a'}, {a: 'a'}])],
	], 'sj.shake.test()');
};

sj.isSuperSet = function (set, superSet) { //? where is this used? //TODO probably legacy, replace with sj.deepMatch
	//C compares each prop in set to the respective prop in superSet, returns true if all are equal, ignores extra props in superSet
	for (prop in set) {
		if (superSet[prop] !== set[prop]) {
			return false;
		}
	}
	return true;
};

// sort
sj.stableSort = function(list, compare) {
	//L https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
	//L https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
	//L https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f
	
	let defaultCompare = (a, b) => {
		//C low to high
		return a - b;
	}

	//C set compare to passed function or default
	compare = typeof compare === 'function' ? compare : defaultCompare;

	//C create new array with original index preserved
	let frozen = list.map(function (item, index) {
		return {value: item, index: index};
	}); 

	let stableCompare = function (a, b) {
		let order = compare(a.value, b.value);

		if (order === 0) {
			//C if equal, sort based on their original order
			return a.index - b.index;
		} else {
			//C sort normally
			return order;
		}
	}

	frozen.sort(stableCompare);

	//C feed sorted array back into original array
	for (let i = 0; i < list.length; i++) {
		list[i] = frozen[i].value;
	}

	return list;
};
sj.dynamicSort = function(list, ascending, prop) {
	//C sorts a list in ascending or descending order by the numeric or string-converted value of its items or their properties if a prop is defined

	//C ascending will flip the list into descending if false
	if (ascending) {
		ascending = 1;
	} else {
		ascending = -1;
	}

	let compare;
	if (sj.isType(prop, 'string')) {
		//C if prop is defined, compare props
		if (list.every(item => sj.isType(item[prop], 'number') || sj.isType(item[prop], 'boolean'))) {
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
		if (list.every(item => sj.isType(item, 'number') || sj.isType(item, 'boolean'))) {
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

	return sj.stableSort(list, compare);
};


//   ██████╗██╗      █████╗ ███████╗███████╗    ██╗   ██╗████████╗██╗██╗     
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝    ██║   ██║╚══██╔══╝██║██║     
//  ██║     ██║     ███████║███████╗███████╗    ██║   ██║   ██║   ██║██║     
//  ██║     ██║     ██╔══██║╚════██║╚════██║    ██║   ██║   ██║   ██║██║     
//  ╚██████╗███████╗██║  ██║███████║███████║    ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝    ╚═╝   ╚═╝╚══════╝

//C these reference sj.Bases, don't call these until classes are defined

// type
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
	if (input === type) {
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
	
		if ((input instanceof sj.Base || (typeof input.objectType === 'string' && (() => { 
			//C input or input.objectType is an instance of a constructible
			let Target = sj[input.objectType.replace('sj.', '')];
			if (typeof Target === 'function') {
				tempInput = new Target({log: false});
				return true;
			}
			return false;
		})())) && (typeof type === 'function' || (typeof type === 'string' && (() => {
			//C and type is constructible
			let Target = sj[type.replace('sj.', '')];
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
sj.tableToEntity = function (table) {
	//R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
	//R any metadata (table) should be sent separately (or implicitly) from the query
	//TODO might be a better way to do this
	if (table === 'users') return sj.User;
	else if (table === 'playlists') return sj.Playlist;
	else if (table === 'tracks') return sj.User;
	else throw new sj.Error({
		origin: 'sj.tableToEntity()',
		reason: `table is not recognized: ${table}`,
		content: table,
	});
};

sj.deepMatch = function (a, b, {
	deep = true, 
	depth = 10, 
	matchIfTooDeep = false, 
	matchIfSubset = false, //C matches objects and arrays if a is a subset of b
	matchOrder = true
} = {
	deep: true, 
	depth: 10, 
	matchIfTooDeep: false, 
	matchIfSubset: false, 
	matchOrder: true
}) {
	//C comparison function for 

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
				if (!matchDeeper(a[key], b[key])) matches = false;
			});
			if (!matchIfSubset) {
				Object.keys(b).forEach(key => { //C match all keys of b to the same keys in a //TODO optimize here
					if (!matchDeeper(a[key], b[key])) matches = false;
				});
			}
			return matches;
		}
		if (sj.isType(a, Array) && sj.isType(b, Array)) { // arrays
			let matches = true;
			a.forEach((inA, i) => {
				if (matchOrder) {
					if (!matchDeeper(a[i], b[i])) matches = false;
				} else { //C match any inB to current inA
					if (!b.some(inB => matchDeeper(inA, inB))) matches = false;
				}
			});
			if (!matchIfSubset) {
				b.forEach((inB, i) => {
					if (matchOrder) {
						if (!matchDeeper(a[i], b[i])) matches = false;
					} else {
						if (!a.some(inA => matchDeeper(inA, inB))) matches = false;
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
	}
	let nB = {
		a: {
			a: {
				a: {
					a: 'a',
				}
			}
		}
	}

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
	]);
};

// error
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
			error.trace = sj.stringReplaceAll(input.stack, 'file:///', '');
		} else if (sj.isType(input, sj.Base)) {
			error.reason = `unexpected ${input.objectType}`;
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

// promises
sj.asyncForEach = async function (list, callback) {
	//C executes an async function for each item in an array, throws entire result list if any of it's items were thrown
	//L this helped: https://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises
	
	let results = await Promise.all(list.map(async (item, index, self) => callback(item, index, self).then(resolved => {
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

// format
sj.one = function (a) {
	//C unwraps the first item of an array where one item is expected
	if (!sj.isType(a, Array)) {
		return a;
	} else if (a.length === 1) {
		return a[0];
	} else if (a.length >= 2) {
		//TODO make a warning object / handler?
		console.warn('sj.one() pulled a single value out of an array with many');
		return a[0];
	} else if (a.length === 0) {
		//! this does not return undefined because we are 'expecting' one value (//TODO though this may be changed later to return undefined)
		return new sj.Error({
			log: true,
			origin: 'sj.one()',
			code: 404,
			message: 'no data found',
			reason: 'array has no values, expected one',
			content: a,
		});
	}
};
sj.any = function (o) {
	//C wraps a value in an array if not already inside one
	return sj.isType(o, Array) ? o : [o];
};
sj.content = function (resolved) {
	//C shorter syntax for immediately returning the content property of a resolved object in a promise chain
	return resolved.content;
};

// recursion
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
	}
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

// HTTP
sj.rebuild = function (input, strict) {
	//C turns a bare object back into its custom class if it has a valid objectType property

	if (sj.isType(input, 'string')) { //C parse if string
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
	if (!sj.isType(input, 'object')) { //C throw if not object
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
		rebuilt = new sj[input.objectType.replace('sj.', '')](input);
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
	if (sj.isType(options.body, Object)) { //C stringify body
		try {
			options.body = JSON.stringify(fClone(options.body));
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
		parsedResult = await sj.asyncForEach(parsedResult, item => {
			return build(item);
		});
	} else {
		return build(parsedResult);
	}


};

	
//   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

//L functional classes: https://stackoverflow.com/questions/15192722/javascript-extending-class

/* TODO
	auto name can be included in: console.trace();

	consider default values for '' and null, specifically ids (what are the semantics?)

	possibly a cyclical reference preservation function between client and server that replaces a reference to self with 'self1' keyword and also can find lower-level cyclical references by recursively calling the function on each layer with memory for which layer its on

	//G
	higher order functions should either return:
		sj.Success
			which wraps empty content, arrays of other objects, and misc content
			or a descendant item object
		or a sj.Error
			which wraps empty content, arrays of other objects with at least one error, non-sj errors (wrapper)
			or a custom error
	the resolve/reject state indicates whether the function succeeded or failed, so simpler functions can just return raw values, especially if they can't error

	//R//? should lists be bare or wrapped in sj.Success/sj.Error? the only place where promise state cant be used is in server requests and responses, in this case there does need to be a wrapper so that sj.request() can sort by sj.isType(obj, sj.Error)

	//R even though resolve and rejections don't need to be the same format, its still useful to have the ability influence resolved values with a success wrapper for say logging or debugging
*/

sj.Base = class Base {
	constructor(options = {}) {
		this.objectType = 'sj.Base'; //! wanted to use this.constructor.name here to dynamically get the class name, however it cannot be inferred specifically when declared like: object.property = class, it would work if the class had its own name, but this is an issue because i'm using reserved names and it breaks functions inside the class, defining the classes in a separate object wont work either because they then can't extend each other

		sj.Base.init(this, options, {
			// debug
			log: false,

			// info
			code: 200,
			type: 'Ok',
			origin: '',
			trace: sj.trace(), //! this traces when the object is created, not where announce is called - this might have to be changed, this on create property could replace origin though

			// content
			message: '',
			reason: '',
			content: {},
		});

		this.onCreate();
	}

	//G instance methods go outside the constructor, this is so that new functions aren't created for each instance, this is equivalent to assigning methods on the Class.prototype
	//G static methods can be also defined here, but static variables must be defined as getters, so its probably best to assign all statics outside the class using call(Class)

	announce() {
		//R this replaces a need to log the result of functions and removes the intermediate steps need to do so (let result = new Object;, log;, return;)
		if (!sj.isType(this, sj.Error)) {
			console.log(`✓ ▮ ${this.objectType} ${this.origin} ${this.message}\n${sj.trace()}`);
		} else {
			console.error(`✗ ▮ ${this.objectType} ${this.origin} ${this.message} \n`, this, `\n▮ ✗ `);
		}	
	}
	onCreate() {
		//G include 'log: true' in options if instance should be announced on creation, call instance.announce() to announce manually
		//R inverting the behavior is wrong and requires more lines, its easier to log actively or change behavior here if everything needs to be logged
		if (this.log === true && this.isParent === false) {
			this.announce();
		}
	}
};
(function () { // static
	this.init = function (that, options = {}, defaults = {}) {
		//C give that a boolean cast of options.isParent, then delete from options
		that.isParent = (options.isParent == true);
		delete options.isParent;

		Object.keys(defaults).forEach(key => {
			//C if default is overwritten, give that the option, otherwise the default
			//! ignores existing props with the value undefined
			that[key] = typeof options[key] === 'undefined' ? defaults[key] : options[key];
		});

		//G if a class wants to allow any option, call init to assign defaults, then Object.assign(this, options) outside of init

		/* //OLD
			//TODO figure out how I made this work
			//? not quite sure what this does, doesn't this just set this to be false all the time?
			//! all classes should overwrite a truthful isParent property and should only have one when directly assigned through options through super(sj.Base.giveParent(options));
			//C set this.isParent to the passed isParent (if true) or false
			//obj.isParent = typeof options.isParent !== 'undefined' ? options.isParent : false;
			//C isParent usually isn't listed in defaults so this doesn't get trasfered?
			//options.isParent = false; //? why is this part needed if it isn't initialized?

			//? deep assign (this seems like a regular assign), //! breaks circular references (though these should never need to be passed)
			// Object.keys(defaults).forEach(key => { 
			// 	//L enumerable properties (from Object.keys https://hashnode.com/post/what-are-enumerable-properties-in-javascript-ciljnbtqa000exx53n5nbkykx
				
			// 	//C if options property is not undefined (short circuit evaluation incase options itself is undefined)
			// 	if (typeof options !== 'undefined' && typeof options[key] !== 'undefined') {
			// 		//C this property = options property
			// 		obj[key] = options[key];
			// 	} else {
			// 		//C this property = default property
			// 		obj[key] = defaults[key];
			// 	}

			// 	//TODO create a warning for when options contains extra properties not passed to the object

			// 	//OLD obj[key] = typeof options !== 'undefined' && typeof options[key] !== 'undefined' ? options[key] : defaults[key];
			// });
		*/
	};
	this.giveParent = function (options) {
		return {
			...options,
			isParent: true,
		}
	};
}).call(sj.Base);

// rule
sj.Rule = class Rule extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Rule';

		sj.Base.init(this, options, {
			// new properties
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
        });
        
        this.onCreate();
	}

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
	}
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
	}
	async checkAgainst(value, value2) {
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
	}
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
	}

	async checkCustom(value) {
		if (typeof this.custom === 'function') {
			return this.custom(value);
		} else {
			return new sj.Success({
				origin: `${this.origin}.checkCustom()`,
				content: value,
			});
		}
	}

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
	}

	/* //OLD decided this was redundant
		//C checks an object's property and possibly modify it, this is done so that properties can be passed and modified by reference for lists
		//? this may not be needed over check(), see sj.Rule.checkRuleSet() in global-server.mjs
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
	/* //OLD, new check ruleset was created in global-server.mjs
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
};
(function () { // static
	//! string to be hashed must not be greater than 72 characters (//? or bytes???),
	this.stringMaxLength = 100;
	this.bigStringMaxLength = 2000;
	this.nameMinLength = 3;
	this.nameMaxLength = 16;
	this.defaultColor = '#ffffff';
	this.visibilityStates = [
		'public',
		'private',
		'linkOnly',
	];

	
	this.none = new sj.Rule({
		origin: 'noRules',
		message: 'value validated',
	
		valueName: 'Value',
	
		dataTypes: ['string', 'number', 'boolean', 'array'], //TODO etc. or just make functionality for this
	});
	this.posInt = new sj.Rule({
		origin: 'positiveIntegerRules',
		message: 'number validated',
	
		valueName: 'Number',
	
		dataTypes: ['integer'],
	});
	this.id = new sj.Rule({
		origin: 'idRules',
		message: 'id validated',
	
		valueName: 'id',
	
		dataTypes: ['integer'],
	});
	this.image = new sj.Rule({
		origin: 'imageRules',
		message: 'image validated',
		target: 'playlistImage',
		cssClass: 'inputError',
	
		valueName: 'image',
		trim: true,
	
		max: this.bigStringMaxLength,
	
		// TODO filter: ___,
		filterMessage: 'Image must be a valid url',
	});
	this.color = new sj.Rule({
		origin: 'colorRules',
		message: 'color validated',
		target: 'playlistColor',
		cssClass: 'inputError',
	
		valueName: 'color',
		trim: true,
		
		filter: '/#([a-f0-9]{3}){1,2}\b/', //TODO is this correct?
		filterMessage: 'Color must be in hex format #XXXXXX',
	});
	this.visibility = new sj.Rule({
		origin: 'visibilityRules',
		message: 'visibility validated',
		target: 'playlistVisibility',
		cssClass: 'inputError',
	
		valueName: 'Visibility',
	
		useAgainst: true,
		againstValue: this.visibilityStates,
		againstMessage: 'please select a valid visibility level',
	});

	//TODO other / old
	//? not sure what these were used for
	this.self = new sj.Rule({
		origin: 'selfRules',
		message: 'self validated',
		target: 'notify',
		cssClass: 'notifyError',
	
		valueName: 'Id',
	
		dataTypes: ['integer'],
	
		useAgainst: true,
		//! ctx.session.user.id shouldn't be used here because there is no guarantee ctx.session.user exists
		againstMessage: 'you are not the owner of this',
	});
	this.setPassword = new sj.Rule({
		origin: 'setPasswordRules',
		message: 'password validated',
		target: 'registerPassword',
		cssClass: 'inputError',
	
		valueName: 'Password',
	
		min: 6,
		max: 72, //! as per bcrypt
	
		useAgainst: true,
		get againstMessage() {return 'Passwords do not match'},
	});

}).call(sj.Rule);



// success //C success and error objects are returned from functions (mostly async ones)
sj.Success = class Success extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Success';

		sj.Base.init(this, options, {});

		this.onCreate();
	}
};
sj.SuccessList = class SuccessList extends sj.Success {
	//C wrapper for an array of successful items
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.SuccessList';

		sj.Base.init(this, options, {
			reason: 'all items successful',
			content: [],
		});

		this.onCreate();
	}
};
sj.Warn = class Warn extends sj.Success {
	//C wrapper for an array of successful items
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.SuccessList';

		sj.Base.init(this, options, {
			log: true,
		});

		this.onCreate();
	}
};

// items (these can be returned from functions)
sj.Credentials = class Credentials extends sj.Success {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Credentials',

		sj.Base.init(this, options, {
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
		});

		this.onCreate();
	}
};

// entities (these represent database entities)
sj.Entity = class Entity extends sj.Success {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Entity';

		sj.Base.init(this, options, {
			id: undefined,
		});

		//C make instance getter for every static filter
		let that = this;
		this.filters = {};
		Object.keys(that.constructor.filters).forEach(key => {
			Object.defineProperties(that.filters, {
				[key]: {
					get: function () { 
						return sj.shake(that, that.constructor.filters[key]);
					}
				}
			});
		});

		this.onCreate();
	};
};
(function () { // static
	//TODO how to make these immutable?

	Object.defineProperty(this, 'table', {
		get: function () {
			return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
		},
	}); 

	this.filters = {
		id: ['id'],
	};

	//C automatically create new filters based on schema
	this.updateFilters = function () {
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
	};
}).call(sj.Entity);

// schema property states
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

sj.User = class User extends sj.Entity {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.User';

		sj.Base.init(this, options, {
			// new properties
			name: '',
			email: '',
			password: '',
			password2: '',
			spotifyRefreshToken: null,
			socketId: undefined,
		});

		this.onCreate();
	}
};
(function () { // static
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
}).call(sj.User);

sj.Playlist = class Playlist extends sj.Entity {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Playlist';

		sj.Base.init(this, options, {
			content: [],

			// new properties
			userId: null,
			name: '',
			visibility: '',
			description: '',
			color: '',
			image: '',
			
		});

		this.onCreate();
	}
};
(function () { // static
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
}).call(sj.Playlist);

sj.Track = class Track extends sj.Entity {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Track';

		sj.Base.init(this, options, {
			// new properties
			playlistId: null,
			position: null,
			source: null, //! before was sj.noSource, but this creates a circular reference error (only sometimes??)
			sourceId: null, // TODO assumes ids are unique, even across all sources
			artists: [],
			name: '',
			duration: null, //! cannot be 0 or else it will not trigger sj.isEmpty() and will actually be set as 0
			link: '',
		});

		this.onCreate();
	}
};
(function () {
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

			add: auto,
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
					return sj.sourceList.some(source => value === source.name);
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
}).call(sj.Track);



// error
sj.Error = class Error extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Error';

		sj.Base.init(this, options, {
			log: true, //TODO remove log: true from errors

			code: 400,
			type: 'Bad Request',
		});

		this.onCreate();
	}
};
sj.ErrorList = class ErrorList extends sj.Error {
	//C wrapper for an array with one or more errors
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.ErrorList'; //TODO //? in chrome dev tools this still shows up as 'sj.Error' but only on the preview line, is announce being called too early?

		sj.Base.init(this, options, {
			reason: 'one or more errors occurred with items',
			content: [],
		});

		this.onCreate();
	}
};
// custom errors
sj.AuthRequired = class AuthRequired extends sj.Error { 
	//C used to communicate to client that the server does not have the required tokens and that the client must authorize
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.AuthRequired';

		sj.Base.init(this, options, {
			message: 'authorization required',
		});

		this.onCreate();
	}
};


// other
sj.Source = class Source extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Source',

		sj.Base.init(this, options, {
			// new properties
			name: '', // !!! don't use this unless the source string is needed, always use the sj.Source object reference
			idPrefix: '',
			playback: new sj.Playback(), // !!! cyclical reference - has sj.Playback object which has sj.Track object which has this sj.Source object
            realSource: true,
            
            credentials: new sj.Credentials(),

			//TODO this should only be server-side
			api: {},
			scopes: [],
			authRequestManually: true,
			makeAuthRequestURL: function () {},

			//C empty throw functions, used in standard playback functions
			loadApi: async function () {
				throw new sj.Error({
					log: true,
					origin: 'loadApi()',
					message: 'api could not be loaded',
					reason: 'no source',
				});
			},
			loadPlayer: async function () {
				throw new sj.Error({
					log: true,
					origin: 'loadPlayer()',
					message: 'player could not be loaded',
					reason: 'no source',
				});
			},

			search: async function () {
				throw new sj.Error({
					log: true,
					origin: 'search()',
					message: 'unable to search',
					reason: 'no source',
				});
			},
			getTracks: async function () {
				throw new sj.Error({
					log: true,
					origin: 'getTracks()',
					message: 'unable to get tracks',
					reason: 'no source',
				});
			},

			checkPlayback: async function () {
				throw new sj.Error({
					log: true,
					origin: 'apiStart()',
					message: 'could not check playback',
					reason: 'no source',
				});
			},

			apiStart: async function () {
				throw new sj.Error({
					log: true,
					origin: 'apiStart()',
					message: 'track could not be started',
					reason: 'no source',
				});
			},
			apiResume: async function () {
				throw new sj.Error({
					log: true,
					origin: 'apiResume()',
					message: 'track could not be resumed',
					reason: 'no source',
				});
			},
			apiPause: async function () {
				throw new sj.Error({
					log: true,
					origin: 'apiPause()',
					message: 'track could not be paused',
					reason: 'no source',
				});
			},
			apiSeek: async function () {
				throw new sj.Error({
					log: true,
					origin: 'apiSeek()',
					message: 'track could not be seeked',
					reason: 'no source',
				});
			},
			apiVolume: async function () {
				throw new sj.Error({
					log: true,
					origin: 'apiVolume()',
					message: 'volume could not be changed',
					reason: 'no source',
				});
			},
		});

		this.onCreate();
	}

	async start() {
		return this.apiStart(track).then(resolved => {
			this.playback.playing = true;
			this.playback.track = track;
			this.playback.progress = 0;
			this.playback.timestamp = Date.now();

			return resolved;
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	}
	async resume() {
		if (!this.playback.playing) { 
			return this.apiResume().then(resolved => {
				this.playback.playing = true;
				return resolved;
			}).catch(rejected => {
				throw rejected;
			});
		} else {
			return new sj.Success({
				log: true,
				origin: this.name + '.resume()',
				message: 'track already playing',
			});
		}
	}
	async pause() {
		if (this.playback.playing) {
			return this.apiPause().then(resolved => {
				this.playback.playing = false;
				return resolved;
			}).catch(rejected => {
				throw sj.propagate(rejected);
			});
		} else {
			return new sj.Success({
				log: true,
				origin: this.name + '.pause()',
				message: 'track already paused',
			});
		}	
	}
	async seek() {
		return this.apiSeek(ms).then(resolved => {
			this.playback.progress = ms;
			this.playback.timestamp = Date.now();
			return resolved;
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	}
	async volume() {
		return this.apiVolume(volume).then(resolved => {
			this.playback.volume = volume;
			return resolved;
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	}

	onCreate() {
		super.onCreate();

		// extend with: add to source list
		if (this.realSource) { //TODO source list isn't populated in global.js, its done in main.js therefore cannot be used outside of that, see if source definitions are possible to move to global.js
			sj.sourceList.push(this);
		}
	}
};
sj.Playback = class Playback extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Playback';

		sj.Base.init(this, options, {
			// new properties
			track: sj.noTrack,
			playing: false,
			progress: 0,
			timestamp: Date.now(),
			volume: 0,
		});

		this.onCreate();
	}
};

sj.QuerySubscription = class extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.QuerySubscription';

		sj.Base.init(this, options, {
			query: undefined,
			subscribers: [], 
			timestamp: 0, 
			content: [],
		});

		this.onCreate();
	}
};
sj.EntitySubscription = class extends sj.QuerySubscription {
	//! query should only have one id parameter
	//! subscribers list can include both component subscribers and parent QueryMirror subscribers
	//C EntityMirrors without any component subscribers won't be subscribed to on the server, they will be only updated by their parent QueryMirror
	//G if an entity is referenced by multiple parent QueryMirrors - it will be called to update multiple times - to avoid this, ensure the same timestamp is generated once on the server when an entity is changed, that way it's mirror on the client will only update once per server update

	//C same as QueryMirror
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.EntitySubscription';

		sj.Base.init(this, options, {});

		this.onCreate();
	}
};




// TODO consider if all actions should actually be in main.js instead
/* // TODO desiredPlayback object is needed here for these to work - but does that even belong in globals?
sj.Action = class extends sj.Base {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Action';
		source = sj.desiredPlayback.track.source;

		sj.Base.init(this, options, {
			// new properties
			state: null,
		});

		this.onCreate();
	}

	// comparisons
	isSimilarAction(item) {
		return this.objectType === item.objectType;
	}
	isIdenticalAction(item) {
		return this.isSimilarAction(item) && this.state === item.state;
	}
	isParentAction(item) {
		return false; // TODO ??? can this be merged in some way with isParent?
	}

	removeOld(queue) {
		// backwards deletion loop
		for (var i = queue.length - 1; i > -1; i--) {
			if (this.isSimilarAction(queue[i]) || this.isParentAction(queue[i])) {
				queue.splice(i, 1);
			}
		}
	}

	async trigger() {
		return new Promise(resolve => {
			resolve(new sj.Success({
				log: true,
				origin: 'sj.Action.trigger',
			}));
		});
	}
};
sj.Start = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Start';
		state = sj.desiredPlayback.track;

		sj.Base.init(this, options, {});

		this.onCreate();
	}

	isParentAction() {
		return item.objectType === 'sj.Toggle' || item.objectType === 'sj.Seek';
	}

	async trigger() {
		return Promise.all(sourceList.map(source => {
			// pause all
			return source.pause().then(sj.andResolve);
		})).then(resolved => {
			// filter errors
			return filterList(resolved, sj.Success, new sj.Success({
				origin: 'sj.Start.trigger()',
				message: 'changed track',
			}), new sj.Error({
				origin: 'sj.Start.trigger()',
				message: 'failed to change track',
			}));
		}).then(resolved => {
			// start
			return this.source.start(this.state);
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	}
};
sj.Toggle = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Toggle';
		this.state = desiredPlayback.playing;

		sj.Base.init(this, options, {});

		this.onCreate();
	}

	async trigger() {
		if (this.state) { // if playing
			return Promise.all(sourceList.map(source => {
				if (source === this.source) {
					// resume desired source
					return source.resume().then(sj.andResolve);
				} else {
					// pause all other sources
					return source.pause().then(sj.andResolve);
				}
			})).then(resolved => {
				return filterList(resolved, sj.Success, new sj.Success({
					origin: 'sj.Toggle.trigger()',
					message: 'playing updated',
				}), new sj.Error({
					origin: 'sj.Toggle.trigger()',
					message: 'playing failed to update',
				}));
			}).catch(rejected => {
				throw sj.propagate(rejected);
			});
		} else { // if not playing
			return Promise.all(sourceList.map(source => {
				// pause all sources
				return source.pause().then(sj.andResolve);
			})).then(resolved => {
				return filterList(resolved, sj.Success, new sj.Success({
					origin: 'updatePlaybackPlaying()',
					message: 'playing updated',
				}), new sj.Error({
					origin: 'updatePlaybackPlaying()',
					message: 'playing failed to update',
				}));
			}).catch(rejected => {
				throw sj.propagate(rejected);
			});
		}
	}
};
sj.Seek = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Seek';
		this.state = desiredPlayback.progress;

		sj.Base.init(this, options, {});

		this.onCreate();
	}

	async trigger() {
		return this.source.seek(this.state).then(resolved => {
			return new sj.Success({
				log: true,
				origin: 'sj.Seek.trigger()',
				message: 'playback progress changed',
			});
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	}
};
sj.Volume = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Base.giveParent(options));

		this.objectType = 'sj.Volume';
		this.state = desiredPlayback.volume;

		sj.Base.init(this, options, {});

		this.onCreate();
	}

	async trigger() {
		// TODO
	}
};
*/


// object related variables
//TODO consider having constants for source types like const ERROR_TYPE
//TODO source list isn't populated in global.js, its done in main.js therefore cannot be used outside of that, see if source definitions are possible to move to global.js
sj.sourceList = [];

// null objects
sj.noTrack = new sj.Track();
sj.noSource = new sj.Source({realSource: false});
sj.noTrack.source = sj.noSource; // cyclical reference
// TODO move with actions sj.noAction = new sj.Action();


export default sj;

/* //OLD
	//! not used anymore

	(function(sj){
	}(typeof exports !== 'undefined' ? exports : this.sj = {}));

	Self executing anonymous function which assigns the enclosing 'global' object to be exported
	if 'exports' exists, use it, otherwise use 'this.sj.' (window.sj.) (which is set to an empty object container)

	also - this creates a closure, so anything not attached to 'c' is private

	https://stackoverflow.com/questions/3225251/how-can-i-share-code-between-node-js-and-the-browser

	!!! requires that the 'exports' name is not used in client-side js, and that when required in server-side js, the var name 'should' (see rebuild()) be the same as this.'name' in the conditional argument (in order to have the same namespace as the client code

	TODO should this be integrated in a namespace-ing fashion? (sj..Success(), sj..sj.typeOf()), how does that then influence other non-global.js functions in index.js and such?

	TODO consider broswerify: https://github.com/browserify/browserify
	, watchify, webpack, rollup
*/


sj.deepMatch.test();
sj.shake.test();

/* performance test
	var iterations = 1000000;
	console.time('Function #1');
	for(var i = 0; i < iterations; i++ ){
		functionOne();
	};
	console.timeEnd('Function #1');

	console.time('Function #2');
	for(var i = 0; i < iterations; i++ ){
		functionTwo();
	};
	console.timeEnd('Function #2');
*/