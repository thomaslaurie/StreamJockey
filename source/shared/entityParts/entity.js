import {
	define,
	getKeysOf,
	pick,
	ClassParts,
} from '../utility/index.js';

export default new ClassParts({
	instance(options = {}) {
		const {
			id,
		} = options;

		define.writable(this, {
			id,
			//R This has to be a variable because in some places entities are overwritten with entire other entities: Object.assign(E1, E2). Maybe this isn't ideal.
			filters: {},
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
	},
	static() {
		define.getter(this, {
			get table() {
				return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
			},
		});
		//TODO Can this be locked down as a constant? (See updateFilters()).
		define.writable(this, {
			filters: {
				id: ['id'],
			},
		});
		define.constant(this, {
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
		});
	},
});
