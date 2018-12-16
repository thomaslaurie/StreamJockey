// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
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
	Ensure everything has an error handler - most of the time 'throw sj.propagateError(rejected);'.
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
*/


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

let sj = {};


//  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗   ██╗
//  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
//  ██║   ██║   ██║   ██║██║     ██║   ██║    ╚████╔╝ 
//  ██║   ██║   ██║   ██║██║     ██║   ██║     ╚██╔╝  
//  ╚██████╔╝   ██║   ██║███████╗██║   ██║      ██║   
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   

//! these can't reference any sj.Objects

sj.deepFreeze = function (obj) {
	// TODO test me
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

	// freeze nested objects
	Object.keys(obj).forEach(function(key) {
		obj[key] = obj[key] && typeof value === 'object' ? sj.deepFreeze(obj[key]) : obj[key];
	});
	
	// then freeze self
	return Object.freeze(object);
}
sj.trace = function () {
	try {
		throw Error('');
	} catch (e) {
		return e.stack; //TODO figure out how to unescape this
	}
}
/*
	//C unused afaik
	sj.sleep = async function (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
*/

// type
sj.objectList = [ // list of all valid sj objects
	// TODO must be a better way
	'sj.Object',
	'sj.Success',
	'sj.Error',
	'sj.ErrorList',
	'sj.Track',
	'sj.Playlist',
	'sj.User',
	'sj.Rules',
	'sj.Source',
	'sj.Credentials',
	'sj.Playback',
	'sj.Action',
	'sj.Start',
	'sj.Toggle',
	'sj.Seek',
	'sj.Volume',
];
sj.isValidObjectType = function (input) {
	return sj.objectList.indexOf(input) !== -1;
}
sj.typeOf = function (input) {
	if (input === null) {
		return 'null';
	}

	let t = typeof input;

	if (t === 'object') {
		if (sj.isValidObjectType(input.objectType)) {
			return input.objectType;
		} else {
			return 'object';
		}
	}

	if (t === 'number' && isNaN(input)) {
			return 'NaN';
	}

	return typeof input;
}

// rebuild
sj.buildConfirmed = function (obj) {
	// create a new sj.Object based on it's valid objectType
	// !!! used to be window[...] but now that sj.Objects have a namespace (sj) these can simply be called with sj[...]
	return new sj[obj.objectType.replace('sj.', '')](obj);
}
sj.rebuildObject = function (obj, objectType) {
	// E	parses, interprets, and creates object

	if (sj.typeOf(obj) === 'string') {
		try {
			// parse
			let parsedObj = JSON.parse(obj);

			// cast (optional)
			if (sj.isValidObjectType(objectType)) {
				obj.objectType = objectType;
			}
			
			// check if valid
			if (sj.isValidObjectType(parsedObj.objectType)) {
				return sj.buildConfirmed(parsedObj);
			} else {
				return new sj.Error({
					log: true,
					origin: 'sj.rebuildObject()',
					message: 'failed to recreate object',
					reason: 'object is non-SjObject',
					content: obj,
				});
			}
		} catch (e) {
			return new sj.Error({
				log: true,
				origin: 'sj.rebuildObject()',
				message: 'failed to recreate object',
				reason: e,
				content: obj,
			});
		}
	} else if (sj.typeOf(obj) === 'object') {
		// cast (optional)
		if (sj.isValidObjectType(objectType)) {
			obj.objectType = objectType;
		}

		// check if valid
		if (sj.isValidObjectType(obj.objectType)) {
			return sj.buildConfirmed(obj);
		} else {
			return new sj.Error({
				log: true,
				origin: 'sj.rebuildObject()',
				message: 'failed to recreate object',
				reason: 'object is non-SjObject',
				content: obj,
			});
		}
	} else {
		return new sj.Error({
			log: true,
			origin: 'sj.rebuildObject()',
			message: 'failed to recreate object',
			reason: 'data is not an object',
			content: obj,
		});
	}
}

// format
sj.msFormat = function (ms) {
	// extract
	var minutes = Math.floor(ms / 60000);
	var seconds = Math.ceil(ms % 60000);

	// format
	seconds = ('0' + seconds).slice(-2);

	// returns ...0:00 format rounded up to the nearest second
	return minutes + ':' + seconds;
}
// TODO will this carry over through exports? it should: https://stackoverflow.com/questions/46427232/export-import-custom-function-of-built-in-object-in-es6

Array.prototype.stableSort = function(compare) {
	//L https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
	//L https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
	//L https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f
	
	let defaultCompare = (a, b) => {
		//C low to high
		return a - b;
	}

	//C set compare to passed function or default
	compare = sj.typeOf(compare) === 'function' ? compare : defaultCompare;

	//C create new array with original index preserved
	let frozenThis = this.map(function (item, index) { //! 'this' refers to the array in [].stableSort()
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

	frozenThis.sort(stableCompare);

	//C feed sorted array back into original array
	for (let i = 0; i < this.length; i++) {
		this[i] = frozenThis[i].value;
	}

	return this;
}

// promises
sj.andResolve = function (rejected) {
	// use when just catch is chained, usually when a var x = promise, and the var needs to accept the return value even if its an error object
	// non-sj errors should also be converted here
	return sj.propagateError(rejected);
}
sj.resolveBoth = function (resolved, rejected) {
	// Promise.all will reject when the first promise in the list rejects, not waiting for others to finish. Therefore, resolve these rejections so they all get put into the list, then handle the list.

	if (resolved) {
		return resolved;
	} else if (rejected) {
		return sj.propagateError(rejected);
	}
}
sj.returnContent = function (resolved) {
	return resolved.content;
}

	
	//   ██████╗██╗      █████╗ ███████╗███████╗
	//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
	//  ██║     ██║     ███████║███████╗███████╗
	//  ██║     ██║     ██╔══██║╚════██║╚════██║
	//  ╚██████╗███████╗██║  ██║███████║███████║
	//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
	
/* TODO
	auto name can be included in: console.trace();

	consider default values for '' and null, specifically ids (what are the semantics?)

	possibly a cyclical reference preservation function between client and server that replaces a reference to self with 'self1' keyword and also can find lower-level cyclical references by recursively calling the function on each layer with memory for which layer its on
*/

sj.Object = class {
	constructor(options = {}) {
		this.objectType = 'sj.Object';

		sj.Object.init(this, options, {
			// debug
			log: false,

			// info
			code: 200,
			type: 'Ok',
			origin: '',
			trace: sj.trace(),

			// content
			message: '',
			reason: '',
			content: {},

			// DOM
			target: '',
			cssClass: '',
		});

		this.onCreate();
	}

	static init(obj, options, defaults) {
		//TODO figure out how this works
		//? not quite sure what this does, doesn't this just set this to be false all the time?
		//! all classes should overwrite a truthful isParent property and should only have one when directly assigned through options through super(sj.Object.tellParent(options));
		obj.isParent = typeof options.isParent !== 'undefined' ? options.isParent : false;
		//C isParent usually isn't listed in defaults so this doesn't get trasfered?
		options.isParent = false; //? why is this part needed if it isn't initialized?

		//? deep assign (this seems like a regular assign), //! breaks circular references (though these should never need to be passed)
		Object.keys(defaults).forEach(key => { 
			//L enumerable properties (from Object.keys https://hashnode.com/post/what-are-enumerable-properties-in-javascript-ciljnbtqa000exx53n5nbkykx
			
			//C short circuit evaluation for undefined object or property
			obj[key] = typeof options !== 'undefined' && typeof options[key] !== 'undefined' ? options[key] : defaults[key];
		});
	}
	
	static tellParent(options) {
		//C used to pass options (except with a true isParent property) to a parent class
		options.isParent = true;
		return options;
	}

	announce() {
		// include 'log: true' in options if object should be announced on creation, call obj.announce if wanted at a later time, this essentially replaces need for console.log in functions (still one line) - but with additional capability to get information from an anonymous class (return new sj.Object()), doing it the other way (boolean for not announcing on create) creates more problems and still requires writing lines and patches ---> its just better to do a positive action
		if (sj.isError(this)) {
			console.error(`✗ ▮ ${this.objectType} ${this.origin} ${this.message}\n`, this, `\n  ▮ ✗ `);
		} else {
			//console.log(this);
			console.log(`✓ ▮ ${this.objectType} ${this.origin} ${this.message}`);
		}	
	}
	onCreate() {
		if (this.log === true && this.isParent === false) {
			this.announce();
		}
	}
}

sj.Success = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Success';

		sj.Object.init(this, options, {});

		this.onCreate();
	}
}
sj.Error = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Error';

		sj.Object.init(this, options, {
			code: 400,
			type: 'Bad Request',
		});

		this.onCreate();
	}
}
sj.ErrorList = class extends sj.Object {
	//? should ErrorList extend Error?
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.ErrorList';

		sj.Object.init(this, options, {
			code: 400,
			type: 'Bad Request',
			reason: 'One or more errors thrown',
			content: [],
		});

		this.onCreate();
	}
}
// TODO swap track.id to track.sourceId
sj.Track = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Track';

		sj.Object.init(this, options, {
			// new properties
			id: null,
			playlistId: null,
			position: null,
			source: sj.noSource,
			sourceId: null, // TODO assumes ids are unique, even across all sources
			artists: [],
			name: '',
			duration: 0,
			link: '',
		});

		this.onCreate();
	}
}
sj.Playlist = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Playlist';

		sj.Object.init(this, options, {
			content: [],

			// new properties
			id: null,
			userId: null,
			name: '',
			visibility: '',
			description: '',
			color: '',
			image: '',
		});

		this.onCreate();
	}
}

sj.User = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.User';

		sj.Object.init(this, options, {
			// new properties
			id: null,
			name: '',
			email: '',
			password: '',
			password2: '',
		});

		this.onCreate();
	}
}

sj.Rules = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Rules';

		sj.Object.init(this, options, {
			// new properties
			valueName: 'input',
			trim: false,
			
			dataType: 'string',

			min: 0,
			max: Infinity,

			
			//! remember to set useAgainst: true, if passing a value2 to use
			useAgainst: false,
			//C this is a reference value and should not be able to be equal to anything,
			//R this is to prevent a user from somehow passing in boolean false, thus making it equal to the against value and passing a password check
			againstValue: {},
			get againstMessage() {
				if (Array.isArray(this.againstValue)) {
					var a = this.againstValue.join(', ');
				}
				//! this reveals password2 when checking two passwords - simply overwrite this get function to a custom message
				return `${this.valueName} did not match against these values: ${this.against}`;
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
		});
	}

	//TODO how to deal with returning the password field since its sensitive

	async checkType(value) {
		//! uses positive guard clauses to search for a single match rather than a single error

		//C quick type check
		let t = sj.typeOf(value);
		if (t === this.dataType) {
			return new sj.Success({
				log: true,
				origin: `${this.origin}.checkType()`,
				message: 'validated data type',
				content: value,
			});
		}

		//C special dataTypes not covered by sj.typeOf()
		if (this.dataType === 'integer' && Number.isInteger(value)) {
			return new sj.Success({
				log: true,
				origin: `${this.origin}.checkType()`,
				message: 'validated data type',
				content: value,
			});
		}

		//C string parsing for numbers
		if (t === 'string') {
			let p = NaN;

			//C number types
			if (this.dataType === 'number') {
				p = Number.parseFloat(value);
			} else if (this.dataType === 'integer') {
				p = Number.parseInt(value);
			}

			//C check if number
			if (!Number.isNaN(p)) {
				return new sj.Success({
					log: true,
					origin: `${this.origin}.checkType()`,
					message: 'validated data type',
					content: p,
				});
			}
		}

		//C throw if no matches
		throw new sj.Error({
			log: true,
			origin: `${this.origin}.checkType()`,
			message: `${this.valueName} must be a ${this.dataType}`,
			content: value,
		});
	}
	async checkSize(value) {
		let t = sj.typeOf(value);
		let m = `${this.valueName} must be between ${this.min} and ${this.max}`;

		if (t === 'string') {
			//C string length
			if (!(value.length >= this.min && value.length <= this.max)) {
				throw new sj.Error({
					log: true,
					origin: `${this.origin}.checkSize()`,
					message: `${m} characters long`,
					content: value,
				});
			}
		} else if (t === 'number' || t === 'integer') {
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
			log: true,
			origin: `${this.origin}.checkSize()`,
			content: value,
		});
	}
	async checkAgainst(value, value2) {
		//C custom againstValue
		if (sj.typeOf(value2) !== 'undefined') {
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
			log: true,
			origin: `${this.origin}.checkAgainst()`,
			content: value,
		});
	}
	async checkFilter(value, value2) {
		//C custom againstValue
		if (sj.typeOf(value2) !== 'undefined') {
			this.filterExpression = value2;
		}

		//TODO

		return new sj.Success({
			log: true,
			origin: `${this.origin}.checkAgainst()`,
			content: value,
		});
	}

	/*
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
	//TODO should sj.Rules be exposed in globals if it contains the security checks? is that safe? - ideally, database checks should also be implemented so 'name already taken' errors show up at the same time basic validation errors do. Basically theres three waves in most cases - isLoggedIn (ok to be in a separate wave because it should rarely happen, and assumes the user knows what they're doing except being logged in - or would this be useful in the same wave too?), basic validation, database validation. < SHOULD ALL VALIDATION CHECKS BE IN ONE WAVE?

	//! to use the possibly modified value from check(), set the input value to equal the result.content
	async check(value, value2) {
		//L Guard Clauses: https://medium.com/@scadge/if-statements-design-guard-clauses-might-be-all-you-need-67219a1a981a
		//C Guard clauses (for me) should be positively-phrased conditions - but wrapped in a single negation: if(!(desiredCondition)) {}

		//C trim
		if (this.trim && sj.typeOf(value) === 'string') {
			value = value.trim();
		}

		//C checks
		value = await this.checkType(value).then(sj.returnContent); //R no need to catch and return the content as it will be in the thrown error anyways
		await this.checkSize(value);
		if (this.useAgainst) {
			await this.checkAgainst(value, value2);
		}
		if (this.useFilter) {
			await this.checkFilter(value, value2);
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

	//! checkRuleSet takes a reference object and the property name, value modification is then done automatically
	static async checkRuleSet(ruleSet) {
		//C takes a 2D array of [[sj.Rules, obj, propertyName, value2(optional)], [], [], ...]

		return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => { 
			//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

			//C validate arguments
			if (!(rules instanceof sj.Rules)) {
				//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
				//? is it possible to dynamically get this class
				return new sj.Error({
					log: true,
					origin: 'checkRuleSet()',
					message: 'validation error',
					reason: `checkRuleSet() is missing a sj.Rules object`,
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

			let result = new sj.Error();

			//C call check() with 1 or 2 values
			if (sj.typeOf(value2) === 'undefined') {
				result = await rules.check(obj[prop]).then(sj.resolveBoth());
			} else {
				result = await rules.check(obj[prop], value2).then(sj.resolveBoth());
			}

			//C pass the possibly modified value back to the original object
			obj[prop] = result.content;

			return result;
		})).then(resolved => {
			return sj.filterList(resolved, sj.Success, new sj.Success({
				origin: 'checkRuleSet()',
				message: 'all rules validated',
			}), new sj.ErrorList({
				origin: 'checkRuleSet()',
				message: 'one or more issues with fields',
				reason: 'validation functions returned one or more errors',
			}));
		}).catch(rejected => {
			throw sj.propagateError(rejected);
		});
	}
}

sj.Source = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Source',

		sj.Object.init(this, options, {
			// new properties
			name: '', // !!! don't use this unless the source string is needed, always use the sj.Source object reference
			idPrefix: '',
			playback: new sj.Playback(), // !!! cyclical reference - has sj.Playback object which has sj.Track object which has this sj.Source object
			realSource: true,

			//TODO this should only be server-side
			api: {},
			scopes: [],
			authRequestManually: true,
			makeAuthRequestURL: function () {},

			//C empty throw functions
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
			this.playback.timeStamp = Date.now();

			return resolved;
		}).catch(rejected => {
			throw sj.propagateError(rejected);
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
				throw sj.propagateError(rejected);
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
			this.playback.timeStamp = Date.now();
			return resolved;
		}).catch(rejected => {
			throw sj.propagateError(rejected);
		});
	}
	async volume() {
		return this.apiVolume(volume).then(resolved => {
			this.playback.volume = volume;
			return resolved;
		}).catch(rejected => {
			throw sj.propagateError(rejected);
		});
	}

	onCreate() {
		super.onCreate();

		// extend with: add to source list
		if (this.realSource) { //TODO source list isn't populated in global.js, its done in main.js therefore cannot be used outside of that, see if source definitions are possible to move to global.js
			sj.sourceList.push(this);
		}
	}
}
sj.Credentials = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Credentials',

		sj.Object.init(this, options, {
			//TODO this should only be server-side 
			authRequestKey: {}, //! key comparison is done, therefore this shouldn't be an empty string
			authRequestTimestamp: 0,
			authRequestURL: '',

			authCode: '',
			authAccessToken: '',
			authRefreshToken: '',
		});

		this.onCreate();
	}
}
sj.Playback = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Playback';

		sj.Object.init(this, options, {
			// new properties
			track: sj.noTrack,
			playing: false,
			progress: 0,
			timeStamp: Date.now(),
			volume: 0,
		});

		this.onCreate();
	}
}


// TODO consider if all actions should actually be in main.js instead
/* // TODO desiredPlayback object is needed here for these to work - but does that even belong in globals?
sj.Action = class extends sj.Object {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Action';
		source = sj.desiredPlayback.track.source;

		sj.Object.init(this, options, {
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
}
sj.Start = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Start';
		state = sj.desiredPlayback.track;

		sj.Object.init(this, options, {});

		this.onCreate();
	}

	isParentAction() {
		return item.objectType === 'sj.Toggle' || item.objectType === 'sj.Seek';
	}

	async trigger() {
		return Promise.all(sourceList.map(source => {
			// pause all
			return source.pause().then(resolveBoth);
		})).then(resolved => {
			// filter errors
			return filterList(resolved, sj.Success, new sj.Success({
				origin: 'sj.Start.trigger()',
				message: 'changed track',
			}), new sj.ErrorList({
				origin: 'sj.Start.trigger()',
				message: 'failed to change track',
			}));
		}).then(resolved => {
			// start
			return this.source.start(this.state);
		}).catch(rejected => {
			throw sj.propagateError(rejected);
		});
	}
}
sj.Toggle = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Toggle';
		this.state = desiredPlayback.playing;

		sj.Object.init(this, options, {});

		this.onCreate();
	}

	async trigger() {
		if (this.state) { // if playing
			return Promise.all(sourceList.map(source => {
				if (source === this.source) {
					// resume desired source
					return source.resume().then(resolveBoth);
				} else {
					// pause all other sources
					return source.pause().then(resolveBoth);
				}
			})).then(resolved => {
				return filterList(resolved, sj.Success, new sj.Success({
					origin: 'sj.Toggle.trigger()',
					message: 'playing updated',
				}), new sj.ErrorList({
					origin: 'sj.Toggle.trigger()',
					message: 'playing failed to update',
				}));
			}).catch(rejected => {
				throw sj.propagateError(rejected);
			});
		} else { // if not playing
			return Promise.all(sourceList.map(source => {
				// pause all sources
				return source.pause().then(resolveBoth);
			})).then(resolved => {
				return filterList(resolved, sj.Success, new sj.Success({
					origin: 'updatePlaybackPlaying()',
					message: 'playing updated',
				}), new sj.ErrorList({
					origin: 'updatePlaybackPlaying()',
					message: 'playing failed to update',
				}));
			}).catch(rejected => {
				throw sj.propagateError(rejected);
			});
		}
	}
}
sj.Seek = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Seek';
		this.state = desiredPlayback.progress;

		sj.Object.init(this, options, {});

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
			throw sj.propagateError(rejected);
		});
	}
}
sj.Volume = class extends sj.Action {
	constructor(options = {}) {
		super(sj.Object.tellParent(options));

		this.objectType = 'sj.Volume';
		this.state = desiredPlayback.volume;

		sj.Object.init(this, options, {});

		this.onCreate();
	}

	async trigger() {
		// TODO
	}
}
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


//   ██████╗██╗      █████╗ ███████╗███████╗    ██╗   ██╗████████╗██╗██╗     
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝    ██║   ██║╚══██╔══╝██║██║     
//  ██║     ██║     ███████║███████╗███████╗    ██║   ██║   ██║   ██║██║     
//  ██║     ██║     ██╔══██║╚════██║╚════██║    ██║   ██║   ██║   ██║██║     
//  ╚██████╗███████╗██║  ██║███████║███████║    ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝    ╚═╝   ╚═╝╚══════╝

//! these do reference sj.Objects

// error
sj.isError = function (obj) {
	// checks for proper SjObject error types
	return sj.typeOf(obj) === 'sj.Error' || sj.typeOf(obj) === 'sj.ErrorList';
}
sj.catchUnexpected = function (obj) {
	// determines type of input, creates, announces, and returns a proper sj.Error object
	// use in the final Promise.catch() to handle any unexpected variables or errors that haven't been caught yet
	
	var error = new sj.Error({
		origin: 'sj.catchUnexpected()',
		message: 'function received unexpected result',
		content: obj,
	});

	if (sj.typeOf(obj) === 'undefined') {
		error.reason = 'object is undefined';
	} else if (sj.typeOf(obj) === 'null') {
		error.reason = 'object is null';
	} else if (sj.typeOf(obj) === 'object') {
		if (sj.isValidObjectType(obj)) {
			error.reason = 'object is of unexpected Sj objectType: ' + obj.objectType;
		} else if (obj instanceof Error) {
			/* 
				!!! JSON.stringify() does not work on native Error objects as they have no enumerable properties
				therefore these cannot be passed between client & server,so when catching a native Error object
				properly convert it to a string with Error.toString() then save that in reason
				https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
			*/
			error.reason = obj.toString();
		} else {
			error.reason = 'object is not an sj object';
		}
	} else {
		error.reason = 'object is of unexpected type: ' + sj.typeOf(obj);
	}
	error.announce();
	return error;
}
sj.propagateError = function (obj) {
	// wrapper code for repeated error handling where: one or many sj.Object results are expected, sj.Errors are propagated, and anything else needs to be caught and transformed into a proper sj.Error
	if (sj.isError(obj)) {
		return obj;
	} else {
		return sj.catchUnexpected(obj);
	}
}

// sorting
sj.filterList = async function (list, type, successList, errorList) {
	//C sorts through a list of both successes and errors (usually received from Promise.all and sj.resolveBoth() to avoid fail-fast behavior to process all promises).
	//C returns either a sj.Success with content as the original list if all match the desired object, or a sj.ErrorList with content as all the items that did not match.
	//! do not log either the successList or errorList objects, these are announced later


	//C redundancy
	errorList.content = [];

	//C if item does not match desired type, push it to errorList.content
	list.forEach(function (item) {
		if (!(item instanceof type)) {
			errorList.content.push(sj.propagateError(item));
		}
		/*
			if (sj.typeOf(item) !== type) {
				errorList.content.push(sj.propagateError(item));
			}
		*/
	});

	//C throw errorList if there are any errors
	if (!(errorList.content.length === 0)) {
		errorList.announce();
		throw errorList;
	}

	//! successList is just a success object with content
	successList.content = list;
	successList.announce();
	return successList;
}

// recursive shells
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
}
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
}
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
}
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
}


export default sj;
/* 
	//! not used anymore

	(function(sj){
	}(typeof exports !== 'undefined' ? exports : this.sj = {}));

	Self executing anonymous function which assigns the enclosing 'global' object to be exported
	if 'exports' exists, use it, otherwise use 'this.sj.' (window.sj.) (which is set to an empty object container)

	also - this creates a closure, so anything not attached to 'c' is private

	https://stackoverflow.com/questions/3225251/how-can-i-share-code-between-node-js-and-the-browser

	!!! requires that the 'exports' name is not used in client-side js, and that when required in server-side js, the var name 'should' (see rebuildObject()) be the same as this.'name' in the conditional argument (in order to have the same namespace as the client code

	TODO should this be integrated in a namespace-ing fashion? (sj..Success(), sj..sj.typeOf()), how does that then influence other non-global.js functions in index.js and such?

	TODO consider broswerify: https://github.com/browserify/browserify
	, watchify, webpack, rollup
*/