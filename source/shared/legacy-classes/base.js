//TODO Refactor this out.
//R Common ancestors are bad because they create very tightly coupled code.

/* //R Thought Process
	//R Initially only static methods and variables I decided to define outside the class because static variables requires the use of a getter, which felt hacky.
	//R But when I needed to augment the constructor of a class I ran into problems, so I decided to define classes like this - with an anonymous function being called on a minimal class. It makes the location of instance methods, instance variables, static methods, and static variables more clear. It also makes augmenting (not extending) a class easier (specifically the defaults), this is important for divergent client and server classes.
	//R finally I found that I was repeating some parts of this anonymous function like const parent = Object.getPrototypeOf(this); and return this;, so I decided to make a factory function for all descendants of sj.Base, and a similar augmentation function, this was also done partly so that defaults, instanceMethods, and statics can be laid out with similar hierarchy.
*/
//C manually create sj.Base
//TODO - consider changing all the constructorParts into functions (like static/prototypeProperties) that return an object to be assigned, (I think this may help with the defaults reference issue), but that also still can execute code. Maybe when this is done, then these parts can be brought up to the top level because they will now have their own closure context to process in

import {
	pick,
	replaceAll,
} from '../utility/index.js';

class Base {
	constructor(options) {
		//! defaults are retrieved in the function via the static this.constructor.defaults property
		this.constructor.construct.call(this, options); 
	}
}


//G use makeClass and augmentClass with assignment functions that can manually assign properties via this.x = 'x', and/or return an object that has those properties assigned (may use an arrow function to shorten the syntax). both work the same way, but the manual assignment has is able to do more - make getters, execute 'on create' functionality, create closures for extension, and delete properties (//! don't do this though)
//TODO consider deep defaults
Base.makeClass = function (name, parent, {
	//G may contain functions: beforeInitialize, afterInitialize; boolean: allowUnknown; and object: defaults
	//! anything in here (including stuff that shouldn't be) will overwrite staticProperties 
	constructorParts = parent => ({}),
	//G instance methods
	prototypeProperties = parent => ({}),
	//G static properties & methods
	staticProperties = parent => ({}),
}) {
	//C creates a descendant class of Base with easily accessible properties for later augmentation, applies staticProperties, before/afterInitialize, allowUnknown, and defaults to static self and instanceMethods to instance prototype


	// VALIDATE
	if (!(typeof name === 'string')) throw 'Base.makeClass() - cannot make class, name is not a string';
	//! don't convert Base to this here, it will break ChildClass.makeClass({'X', Base, {...}})
	if (!(parent === Base || parent.prototype instanceof Base)) throw 'Base.makeClass() - cannot make class, parent is not of type Base';

	//C dynamically create class using inferred function names
	//L https://stackoverflow.com/questions/33605775/es6-dynamic-class-names/33611096\
	//G Base descendants pass new static constructorParts to extend from their parent's constructorParts rather than having an extended constructor
	//C the allows Base.construct() to only be called once, which simplifies their 'on create' functionality
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
Base.augmentClass = function ({
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
	if (constructorPartsResult instanceof Object) { 
		//! Object.assign can handle undefined, but destructuring can't which is why constructorPartsResult needs to be checked
		const {defaults = {}, ...rest} = constructorPartsResult;
		Object.assign(this, rest);
		Object.assign(this.defaults, defaults);
	}

	Object.assign(this.prototype, prototypeProperties.call(this.prototype, parent.prototype));
};

Base.defaults = {
	// debug
	log: false,

	// info
	code: 200,
	type: 'Ok',
	origin: '',
	trace: '', // //! this traces when the object is created, not where announce is called - this might have to be changed, this on create property could replace origin though

	// content
	message: '',
	reason: '',
	content: {},
};
Base.allowUnknown = false;
Base.afterInitialize = function (accessory) {
};
Base.beforeInitialize = function (accessory) {};

Base.trace = function () {
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
Base.prototype.announce = function () {
	//R this replaces a need to log the result of functions and removes the intermediate steps need to do so (let result = new Object;, log;, return;)
	console.log(`▮\n${this.constructorName} ${this.origin} ${this.message}\n${this.constructor.trace()}\n▮`);
	//OLD//! Don't add these back in, they will be a circular dependency.
	// if (this instanceof Error) {
	// 	console.error(`✗ ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ ✗ `);
	// } else if (this instanceof Warn) {
	// 	console.warn(`W ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ W `);
	// } else {
	// 	console.log(`✓ ▮ ${this.constructorName} ${this.origin} ${this.message}\n${this.trace()}`); //
	// }
};

Base.construct = function (options = {}) {
	const accessory = {options};

	//C get prototype chain
	const chain = [this.constructor];
	//C push the prototype of the last item in the chain until Base is reached
	while(chain[chain.length-1] !== Base) chain.push(Object.getPrototypeOf(chain[chain.length-1]));
	
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
	//? is this preferable to simply using assign defined in places where it's needed?
	Object.keys(composed).forEach((key) => {
		if (composed[key] !== undefined) this[key] = composed[key];
	}); 

	//C call ancestor's and own afterInitialize in order
	for (let i = chain.length-1; i >= 0; i--) chain[i].afterInitialize.call(this, accessory);

	if (this.log) this.announce();
};

export default Base;