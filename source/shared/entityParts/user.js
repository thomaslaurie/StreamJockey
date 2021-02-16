import {
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import * as projectRules from '../project-rules.js';
import {
	rules,
	define,
	ClassParts,
} from '../utility/index.js';
import {sharedRegistry} from '../class-registry.js';

export const defaultSocketId = null;
export const sharedRegistryId = 'User';

export default new ClassParts({
	instance(options = {}) {
		const {
			name      = null,
			email     = null,
			password  = null,
			password2 = null,
			spotifyRefreshToken = null, //?
			socketId = defaultSocketId,
		} = options;

		define.writable(this, {
			name,
			email,
			password,
			password2,
			spotifyRefreshToken,
			socketId,
		});

		sharedRegistry.defineId(this, sharedRegistryId);
	},
	static() {
		define.constant(this, {
			schema: {
				//G 0 = unused, 1 = optional, 2 = required
				id: {
					columnName: 'id',
					rule: projectRules.id.validate,

					add: auto,
					get: optional,
					edit: required,
					remove: required,
				},
				name: {
					columnName: 'name',
					rule: projectRules.name.validate,

					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				email: {
					columnName: 'email',
					rule: rules.string.validate, //TODO Email rule.

					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				password: {
					columnName: 'password',
					rule: projectRules.password.validate,

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
					rule: () => {}, //TODO empty for now

					add: unused,
					get: {
						in: false,
						out: true,
						check: 0,
					},
					edit: optional,
					remove: unused,
				},
			},
		});

		this.updateFilters();
	},
});
