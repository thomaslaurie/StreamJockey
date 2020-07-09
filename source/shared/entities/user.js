import Base from '../legacy-classes/base.js';
import Entity from './entity.js';
import {
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import * as projectRules from '../project-rules.js';
import {
	rules,
} from '../utility/index.js';

export default Base.makeClass('User', Entity, {
	constructorParts: (parent) => ({
		defaults: {
			// NEW
			name: '',
			email: '',
			password: '',
			password2: '',
			spotifyRefreshToken: null,
			socketId: null,
		},
	}),
	staticProperties(parent) {
		parent.children.push(this);

		this.schema = {
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
		};
		this.updateFilters();
	},
});
