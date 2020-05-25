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
} from '../../shared/legacy-classes/error.js';
import {
	Success,
	Warn,
	Credentials,
} from '../../shared/legacy-classes/success.js';
import Rule1 from '../../shared/legacy-classes/rule1.js';



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
		simple functions should just return the bare result, for testing purposes these can also have guard clauses and throw a more descriptive Err
		more complex functions (async, error-able, client-server transfer) should wrap their result:
			Success / SuccessList
				wraps empty content, arrays of other objects, misc content
				or is a descendant item object
			or a Err / ErrList
				wraps empty content, arrays of other objects with at least one error, non-sj errors
				or is a custom error

		//R
		client-server transfer is the one place where the resolve/reject state of promises won't work - this is the big reason why wrappers are needed
		even though resolve and rejections don't need to be the same format, its still useful to have the ability influence resolved values with a success wrapper for say logging or debugging

	reconsider the default values of class properties - semantics of undefined & null, error handling of placeholders '', [], {}, inequality of Symbol(), 'emptiness' sj.isEmpty()

	possibly a cyclical reference preservation function between client and server that replaces a reference to self with 'self1' keyword and also can find lower-level cyclical references by recursively calling the function on each layer with memory for which layer its on

*/

//L functional classes: https://stackoverflow.com/questions/15192722/javascript-extending-class

// ENTITIES
sj.Entity = Base.makeClass('Entity', Success, {
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
				if (!sj.isType(new Entity(), sj.Entity)) throw new Err({
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
				rule: Rule1.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			name: {
				columnName: 'name',
				rule: new Rule1({
					origin: 'userNameRules',
					message: 'username validated',
					target: 'registerUserName',
					cssClass: 'inputError',
				
					valueName: 'Username',
					trim: true,
				
					min: Rule1.nameMinLength,
					max: Rule1.nameMaxLength,
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			email: {
				columnName: 'email',
				rule: new Rule1({
					origin: 'emailRules',
					message: 'email validated',
					target: 'registerEmail',
					cssClass: 'inputError',
				
					valueName: 'E-mail',
					trim: true,
				
					min: 3,
					max: Rule1.stringMaxLength,
				
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
				rule: new Rule1({
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
				rule: new Rule1({
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
				rule: Rule1.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			userId: {
				columnName: 'userId',
				rule: Rule1.id,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			name: {
				columnName: 'name',
				rule: new Rule1({
					origin: 'playlistNameRules()',
					message: 'name validated',
					target: 'playlistName',
					cssClass: 'inputError',
				
					valueName: 'Name',
					trim: true,
				
					min: Rule1.nameMinLength,
					max: Rule1.stringMaxLength,  
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			description: {
				columnName: 'description',
				rule: new Rule1({
					origin: 'descriptionRules()',
					message: 'description validated',
					target: 'playlistDescription',
					cssClass: 'inputError',
				
					valueName: 'Description',
				
					max: Rule1.bigStringMaxLength,
					trim: true,
				}),
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			visibility: {
				columnName: 'visibility',
				rule: Rule1.visibility,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			image: {
				columnName: 'image',
				rule: Rule1.image,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			color: {
				columnName: 'color',
				rule: Rule1.color,
	
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
				else new Warn({
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
				rule: Rule1.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			playlistId: {
				columnName: 'playlistId',
				rule: Rule1.id,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			position: {
				columnName: 'position',
				rule: Rule1.posInt,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			name: {
				columnName: 'name',
				rule: new Rule1({
					origin: 'trackNameRules()',
					message: 'name validated',
				
					valueName: 'Name',
					trim: true,
				
					min: Rule1.nameMinLength,
					max: Rule1.stringMaxLength,  
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			duration: {
				columnName: 'duration',
				rule: Rule1.posInt,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			source: {
				columnName: 'source',
				rule: new Rule1({
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
				rule: new Rule1({
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
				rule: new Rule1({
					origin: 'Rule1s.artists',
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
			
			credentials: new Credentials(),
	
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
	//? should this inherit from Success since it will be returned from a function>
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
