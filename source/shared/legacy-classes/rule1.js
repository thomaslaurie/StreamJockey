import Base from './base.js';
import {
	Err,
} from './error.js';
import {
	Success,
} from './success.js';

const Rule1 = Base.makeClass('Rule', Base, {
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
				if (
					// Quick hack for replacing sj.isType which checks against custom types like 'array' and 'integer'
					typeof value === this.dataTypes[i] ||
					(this.dataTypes[i] === 'array' && Array.isArray(value)) ||
					(this.dataTypes[i] === 'integer' && Number.isInteger(value))
				) {
					return new Success({
						origin: `${this.origin}.checkType()`,
						message: 'validated data type',
						content: value,
					});
				}

				//C parse strings for numbers
				if (typeof value === 'string') {
					let parsed = Number.parseFloat(value);
					if (this.dataTypes[i] === 'number' && !Number.isNaN(parsed) 
					|| this.dataTypes[i] === 'integer' && Number.isInteger(parsed)) {
						return new Success({
							origin: `${this.origin}.checkType()`,
							message: 'validated data type',
							content: parsed,
						});
					}

					//TODO parse strings for boolean & symbols & other?
				}
			}

			//C throw if no matches
			throw new Err({
				log: true,
				origin: `${this.origin}.checkType()`,
				message: `${this.valueName} must be a ${this.dataTypes.join(' or ')}`,
				content: value,
			});
		},
		async checkSize(value) {
			let m = `${this.valueName} must be between ${this.min} and ${this.max}`;

			if (typeof value === 'string') {
				//C string length
				if (!(value.length >= this.min && value.length <= this.max)) {
					throw new Err({
						log: true,
						origin: `${this.origin}.checkSize()`,
						message: `${m} characters long`,
						content: value,
					});
				}
			} else if (typeof value === 'number') {
				//C number size
				if (!(value >= this.min && value <= this.max)) {
					throw new Err({
						log: true,
						origin: `${this.origin}.checkSize()`,
						message: `${m} items long`,
						content: value,
					});
				}
			}

			return new Success({
				origin: `${this.origin}.checkSize()`,
				content: value,
			});
		},
		async checkAgainst (value, value2) {
			//C custom againstValue
			if (value2 !== undefined) {
				this.againstValue = value2;
			}

			if (Array.isArray(this.againstValue)) {
				//C arrays
				//R indexOf apparently uses === so this should be fine
				//L https://stackoverflow.com/questions/44172530/array-indexof-insensitive-data-type
				if (this.againstValue.indexOf(value) === -1) {
					throw new Err({
						log: true,
						origin: `${this.origin}.checkAgainst() array`,
						message: this.againstMessage,
						content: value,
					});
				}
			} else {
				//C base value
				if (!(value === this.againstValue)) {
					throw new Err({
						log: true,
						origin: `${this.origin}.checkAgainst() non-array`,
						message: this.againstMessage,
						content: value,
					});
				}
			}

			return new Success({
				origin: `${this.origin}.checkAgainst()`,
				content: value,
			});
		},
		async checkFilter(value, value2) {
			//C custom againstValue
			if (value2 === undefined) {
				this.filterExpression = value2;
			}

			//TODO

			return new Success({
				origin: `${this.origin}.checkAgainst()`,
				content: value,
			});
		},

		async checkCustom(value) {
			if (typeof this.custom === 'function') {
				return this.custom(value);
			} else {
				return new Success({
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
		//TODO should Rule1 be exposed in globals if it contains the security checks? is that safe? - ideally, database checks should also be implemented so 'name already taken' errors show up at the same time basic validation errors do. Basically theres three waves in most cases - isLoggedIn (ok to be in a separate wave because it should rarely happen, and assumes the user knows what they're doing except being logged in - or would this be useful in the same wave too?), basic validation, database validation. < SHOULD ALL VALIDATION CHECKS BE IN ONE WAVE?

		//! to use the possibly modified value from check(), set the input value to equal the result.content
		async check(value, value2) {
			//L Guard Clauses: https://medium.com/@scadge/if-statements-design-guard-clauses-might-be-all-you-need-67219a1a981a
			//C Guard clauses (for me) should be positively-phrased conditions - but wrapped in a single negation: if(!(desiredCondition)) {}

			//C trim
			if (this.trim && typeof value === 'string') {
				value = value.trim();
			}

			//C checks & possibly modifies
			value = await this.checkType(value).then((resolved) => resolved?.content); //R no need to catch and return the content as it will be in the thrown error anyways
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
					throw new Err({
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

					throw new Err({
						log: this.log,
						origin: this.origin,
						message: message,
					});
				}
				if (this.useAgainst && !this.checkAgainst(value, value2)) {
					throw new Err({
						log: this.log,
						origin: this.origin,
						message: this.againstMessage,
					});
				}
				if (this.useFilter && !this.checkFilter(value, value2)) {
					throw new Err({
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
			return new Success(this); 		
		},

		/* //OLD decided this was redundant
			//C checks an object's property and possibly modify it, this is done so that properties can be passed and modified by reference for lists
			//? this may not be needed over check(), see Rule1.checkRuleSet() in global-server.js
			async checkProperty(obj, prop, value2) {
				//C validate arguments
				if (!sj.isType(obj, 'object')) {
					throw new Err({
						log: true,
						origin: 'Rule1.checkProperty()',
						message: 'validation error',
						reason: `Rule1.checkProperty()'s first argument is not an object`,
						content: obj,
					});
				}
				if (!prop in obj) {
					//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
					throw new Err({
						log: true,
						origin: 'Rule1.checkProperty()',
						message: 'validation error',
						reason: `Rule1.checkProperty()'s object argument is missing a '${prop}' property`,
						content: obj,
					});
				}

				//C check rules
				let result = this.check(obj[prop], value2).catch(rejected => {
					//C throw error if failed 
					//! do not modify the original property, so that Err.content is not relied upon to always be the original property
					throw sj.propagate(rejected);
				});

				//C modify and return if successful
				obj[prop] = result.content;
				return result;
			}
		*/
		/* //OLD, new check ruleset was created in global-server.js
			static async checkRuleSet(ruleSet) {
				//C takes a 2D array of [[Rule1, obj, propertyName, value2(optional)], [], [], ...]
				return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => {
					//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

					//C validate arguments
					if (!rules instanceof this) {
						return new Err({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() is missing a Rule1 object`,
							content: rules,
						});
					}

					//C check, return errors too
					return await rules.checkProperty(obj, prop, value2).catch(sj.andResolve);
				})).then(resolved => {
					//C filter for Success objects
					return sj.filterList(resolved, Success, new Success({
						origin: 'Rule1.checkRuleSet()',
						message: 'all rules validated',
					}), new Err({
						origin: 'Rule1.checkRuleSet()',
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
				//C takes a 2D array of [[Rule1, obj, propertyName, value2(optional)], [], [], ...]

				return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => { 
					//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

					//C validate arguments
					if (!(rules instanceof Rule1)) {
						//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
						//? is it possible to dynamically get this class
						return new Err({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() is missing a Rule1 object`,
							content: rules,
						});
					}
					if (!(typeof obj === 'object' && sj.typeOf(obj) !== 'null')) {
						//R cannot use just sj.typeOf(obj) here because it won't properly recognize any 'object'
						return new Err({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() is missing an object argument`,
							content: obj,
						});
					}
					if (!(prop in obj)) {
						//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
						return new Err({
							log: true,
							origin: 'checkRuleSet()',
							message: 'validation error',
							reason: `checkRuleSet() obj is missing a '${prop}' property`,
							content: obj,
						});
					}

					let result = new Err(); //? why is this here

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
					return sj.filterList(resolved, Success, new Success({
						origin: 'checkRuleSet()',
						message: 'all rules validated',
					}), new Err({
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
Rule1.augmentClass({ //C add custom Rule1s as statics of Rule1
	staticProperties: parent => ({
		none: new Rule1({
			origin: 'noRules',
			message: 'value validated',
		
			valueName: 'Value',
		
			dataTypes: ['string', 'number', 'boolean', 'array'], //TODO etc. or just make functionality for this
		}),
		posInt: new Rule1({
			origin: 'positiveIntegerRules',
			message: 'number validated',
		
			valueName: 'Number',
		
			dataTypes: ['integer'],
		}),
		id: new Rule1({
			origin: 'idRules',
			message: 'id validated',
		
			valueName: 'id',
		
			dataTypes: ['integer'],
		}),
		image: new Rule1({
			origin: 'imageRules',
			message: 'image validated',
			target: 'playlistImage',
			cssClass: 'inputError',
		
			valueName: 'image',
			trim: true,
		
			max: Rule1.bigStringMaxLength,
		
			// TODO filter: ___,
			filterMessage: 'Image must be a valid url',
		}),
		color: new Rule1({
			origin: 'colorRules',
			message: 'color validated',
			target: 'playlistColor',
			cssClass: 'inputError',
		
			valueName: 'color',
			trim: true,
			
			filter: '/#([a-f0-9]{3}){1,2}\b/', //TODO is this correct?
			filterMessage: 'Color must be in hex format #XXXXXX',
		}),
		visibility: new Rule1({
			origin: 'visibilityRules',
			message: 'visibility validated',
			target: 'playlistVisibility',
			cssClass: 'inputError',
		
			valueName: 'Visibility',
		
			useAgainst: true,
			againstValue: Rule1.visibilityStates,
			againstMessage: 'please select a valid visibility level',
		}),

		//TODO other / old
		//? not sure what these were used for
		self: new Rule1({
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
		setPassword: new Rule1({
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

export default Rule1;