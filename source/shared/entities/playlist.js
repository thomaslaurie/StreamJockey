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

export default Base.makeClass('Playlist', Entity, {
	constructorParts: (parent) => ({
		defaults: {
			// OVERWRITE
			content: [], //? is this required to be an array, tracks aren't stored here anymore

			// NEW
			userId: undefined,
			name: '',
			visibility: '',
			description: '',
			color: '',
			image: '',
		},
	}),
	staticProperties(parent) {
		parent.children.push(this);

		this.schema = {
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
		};
		this.updateFilters();
	},
});
