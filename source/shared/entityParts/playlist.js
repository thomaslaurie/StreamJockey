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
} from '../utility/index.ts';
import {sharedRegistry} from '../class-registry.js';

export const sharedRegistryId = 'Playlist';

export default new ClassParts({
	instance(options = {}) {
		const {
			userId,
			name        = '',
			visibility  = '',
			description = '',
			color       = '',
			image       = '',
		} = options;

		define.writable(this, {
			userId,
			name,
			visibility,
			description,
			color,
			image,
		});

		sharedRegistry.defineId(this, sharedRegistryId);
	},
	static() {
		define.constant(this, {
			schema: {
				id: {
					columnName: 'id',
					rule: projectRules.id.validate,

					add: auto,
					get: optional,
					edit: required,
					remove: required,
				},
				userId: {
					columnName: 'userId',
					rule: projectRules.id.validate,

					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				name: {
					columnName: 'name',
					rule: projectRules.name.validate,

					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				description: {
					columnName: 'description',
					rule: projectRules.description.validate,

					add: optional,
					get: optional,
					edit: optional,
					remove: unused,
				},
				visibility: {
					columnName: 'visibility',
					rule: projectRules.visibilityState.validate,

					add: optional,
					get: optional,
					edit: optional,
					remove: unused,
				},
				image: {
					columnName: 'image',
					rule: rules.string.validate, //TODO Image url rule.

					add: optional,
					get: optional,
					edit: optional,
					remove: unused,
				},
				color: {
					columnName: 'color',
					rule: projectRules.color.validate,

					add: optional,
					get: optional,
					edit: optional,
					remove: unused,
				},
			},
		});

		this.updateFilters();
	},
});
