import InternalError from './errors/internal-error.js';
import Credentials from './credentials.js';
import {
	define,
	ClassParts,
	Rule,
} from './utility/index.ts';

export default new ClassParts({
	instance(options = {}) {
		const {
			name, //! Should be unique. This is used to identify registered sources.
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

		define.vueConstant(this, {
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
			registered: new Rule({
				validator: (function (instance) {
					if (this.find(instance?.name) === undefined) {
						throw new Error('Source instance is not registered.');
					}
				}).bind(this),
			}),
		});
	},
});
