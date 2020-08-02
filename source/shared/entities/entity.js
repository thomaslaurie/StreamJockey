import Base from '../legacy-classes/base.js';
import {
	Err,
} from '../legacy-classes/error.js';
import {
	Success,
} from '../legacy-classes/success.js';

export default Base.makeClass('Entity', Success, {
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
				//TODO Revaluate this.
				const FoundEntity = this.children.find(child => child.table === tableName);

				if (!((new FoundEntity()) instanceof this)) {
					throw new Err({
						origin: 'Entity.tableToEntity()',
						reason: `table is not recognized: ${tableName}`,
						content: tableName,
					});
				}
					
				return FoundEntity;

				//R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
				//R any metadata (table) should be sent separately (or implicitly) from the query
			},
		}
	},
});

/*
import {
	define,
	rules,
	getKeysOf,
	pick,
} from '../utility/index.js';

//TODO Remove Success extension.
export default class Entity extends Success {
	constructor(options = {}) {
		const {id} = options;

		super(options);

		define.validatedVariable(this, {
			id: {
				value: id,
				validator(value) {
					if (!(value === undefined || rules.nonNegativeInteger.test(value))) {
						throw new Error('Id is not undefined or a non-negative integer.');
					}
				},
			},
			//R This has to be a variable because in some places entities are overwritten with entire other entities: Object.assign(E1, E2). Maybe this isn't ideal.
			filters: {
				value: {},
				validator: rules.object.validator,
			},
		});

		// Set instance filters to use the instance and the static filters.
		//TODO Refactor this, filters shouldn't be using the same name, its a bit confusing.
		const that = this;
		const staticFilters = this.constructor.filters;
		getKeysOf(staticFilters).forEach((key) => {
			define.getter(this.filters, {
				get [key]() {
					return pick(that, staticFilters[key]);
				},
			});
		});
	}
}
define.getter(Entity, {
	get table() {
		return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
	},
});
//TODO Can this be locked down as a constant? (See updateFilters()).
define.validatedVariable(Entity, {
	filters: {
		value: {
			id: ['id'],
		},
		validator: rules.object.validate,
	},
});
define.constant(Entity, {
	// List of references to child classes, these should be added in the child's static constructor.
	children: [],

	// Automatically create new filters based on schema.
	updateFilters() {
		const methodNames = ['add', 'get', 'edit', 'remove'];
		const types = ['in', 'out', 'check'];

		const schemaFilters = {};

		Object.keys(this.schema).forEach((key) => { // For each property,
			methodNames.forEach((methodName) => {   // for each crud method,
				types.forEach((type) => {           // for each filter type:
					if (this.schema[key][methodName][type]) { // If property is optional or required:
						const filterName = methodName + type.charAt(0).toUpperCase() + type.slice(1); // Add it to the specific filter.
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
		//TODO Revaluate this.
		const FoundEntity = this.children.find((child) => child.table === tableName);

		if (!((new FoundEntity()) instanceof this)) {
			throw new Err({
				origin: 'Entity.tableToEntity()',
				reason: `table is not recognized: ${tableName}`,
				content: tableName,
			});
		}

		return FoundEntity;

		//R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
		//R any metadata (table) should be sent separately (or implicitly) from the query
	},
});
*/