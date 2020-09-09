import InternalError from './errors/internal-error.js';
import Credentials from './credentials.js';
import {
	define,
	ClassParts,
} from './utility/index.js';

export default new ClassParts({
	instance(options = {}) {
		const {
			name,
			register = false,
			nullPrefix = '',
			idPrefix = '',

			credentials = new Credentials(),

			//TODO This should only be server-side.
			api = {},
			scopes = [],
			authRequestManually = true,
			makeAuthRequestURL = () => {},

			...rest
		} = options;

		define.constant(this, {
			name,
			register,
			nullPrefix,
			idPrefix,

			credentials,

			api,
			scopes,
			authRequestManually,
			makeAuthRequestURL,

			...rest,
		});

		// Add source to static source list: sj.Source.instances.
		//R Must be manually declared to register, as otherwise, temporary initializations get added and cause issue.
		if (this.register) {
			this.constructor.register(this);
		}
	},
	static() {
		define.constant(this, {
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
			isRegistered(name) {
				return this.find(name) !== undefined;
			},
			validateRegistration(value) {
				if (!this.isRegistered(value)) {
					throw new Error('Source is not registered.');
				}
			},
		});
	},
});
