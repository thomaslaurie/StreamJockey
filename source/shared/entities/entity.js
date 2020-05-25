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
						origin: 'sj.Entity.tableToEntity()',
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