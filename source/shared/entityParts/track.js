import {
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import {
	rules,
	define,
	ClassParts,
} from '../utility/index.js';
import Source from '../source.js';
import * as projectRules from '../project-rules.js';

export default new ClassParts({
	instance(options = {}) {
		const {
			playlistId = null,
			position   = null,
			//TODO assumes ids are unique, even across all sources
			sourceId   = null,
			artists    = [],
			name       = null,
			//! Don't use 0 here as it counts as a 'set' value.
			duration   = null,
			link       = null,
		} = options;

		//! before was sj.noSource, but this creates a circular reference error (only sometimes??)
		let {source = null} = options;

		// Find existing source by track.source.name and set it as the reference.
		if (rules.object.test(source)) {
			const found = Source.instances.find((sourceInstance) => sourceInstance.name === source.name);
			if (found) {
				source = found;
			} else {
				throw new Error('Source was passed but it is not an existing source.');
			}
		}

		define.writable(this, {
			playlistId,
			position,
			sourceId,
			artists,
			name,
			duration,
			link,

			source,
		});

		//TODO Ensure that this is only used as an instance then remove this.
		define.constant(this, {
			constructorName: 'Track',
		});
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
				playlistId: {
					columnName: 'playlistId',
					rule: projectRules.id.validate,
		
					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				position: {
					columnName: 'position',
					rule: projectRules.position.validate,
		
					add: optional,
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
				duration: {
					columnName: 'duration',
					rule: rules.nonNegativeInteger.validate, //TODO Expand
		
					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				source: {
					columnName: 'source',
					rule: projectRules.registeredSource.validate,
		
					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				sourceId: {
					columnName: 'sourceId',
					rule: rules.string.validate, //TODO Expand
		
					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
				artists: {
					columnName: 'artists',
					rule: rules.array.validate, //TODO Expand
		
					add: required,
					get: optional,
					edit: optional,
					remove: unused,
				},
			},
		});

		// Update filters after schema is defined.
		this.updateFilters();

		// Add an additional filter 'localMetadata'.
		//G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.
		define.constant(this.filters, {
			localMetadata: ['id', 'playlistId', 'position'],
		});
	},
});
