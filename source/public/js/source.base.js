import {
	dynamicClass,
	define,
} from './utility/index.js';
import Credentials from './credentials.js';

export default dynamicClass.create('Source', {
	instance({
		//TODO validate everything, don't allow nothing to be passed
		name,
		nullPrefix = '',
		idPrefix = '',

		credentials = new Credentials(), //TODO import

		api = {},
		scopes = [],
		authRequestManually = true,
		makeAuthRequestURL = function () {}, //! This is intentionally an instance function.
	} = {}) {
		define.constant(this, {
			name, //TODO validate that this name is unique
			nullPrefix,
			idPrefix,

			//TODO check if these are really constant
			credentials,

			api,
			scopes,
			authRequestManually,
			makeAuthRequestURL,
		});

		// Add source to static list so that all sources can be iterated.
		this.constructor.instances.push(this);
	},
	static: () => ({
		//TODO Create 'push' instance function that ensures an instance with the same name / (UID) has not been added.
		instances: [],
		find(name) {
			return this.instances.find(instance => instance.name === name);
		},
	}),
});

//TODO Ensure that nothing from sj.Base is used. / Replace
// (log, code, type, origin, message, reason, content, etc.)