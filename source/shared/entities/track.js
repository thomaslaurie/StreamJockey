import Base from '../legacy-classes/base.js';
import Entity from './entity.js';
import { 
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import {
	rules,
} from '../utility/index.js';
import Source from '../source.js';
import * as projectRules from '../project-rules.js';

export default Base.makeClass('Track', Entity, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			//C find existing source by track.source.name and set it as the reference
			if (rules.object.test(accessory.options.source)) {
				const found = Source.instances.find(source => source.name === accessory.options.source.name);
				if (found) accessory.options.source = found;
				else new Warn({
					origin: 'Track.beforeInitialize()',
					reason: 'source was passed but it is not an existing source',
					content: accessory.options.source,
				});
			};
		},
		defaults: {
			// NEW
			playlistId:	null,
			position:	null,
			source:		null, //! before was sj.noSource, but this creates a circular reference error (only sometimes??)
			sourceId:	null, // TODO assumes ids are unique, even across all sources
			artists:	[],
			name:		null,
			duration:	null, //! Don't use 0 here as it counts as a 'set' value.
			link:		null,
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
		};
		this.updateFilters();

		//G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.
		this.filters.localMetadata = ['id', 'playlistId', 'position'];
	},
});
