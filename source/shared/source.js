import Base from './legacy-classes/base.js';
import InternalError from './errors/internal-error.js';
import {
	Credentials,
} from './legacy-classes/success.js';


export default Base.makeClass('Source', Base, {
	constructorParts: (parent) => ({
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
			return this.instances.find((instance) => instance.name === name);
		},
		isRegistered(name) {
			return this.find(name) !== undefined;
		},
	}),
});
