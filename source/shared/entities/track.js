import Base from '../legacy-classes/base.js';
import Entity from './entity.js';
import { 
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import Rule1 from '../legacy-classes/rule1.js';
import {
	rules,
} from '../utility/index.js';
import Source from '../source.js';

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
			duration:	null, //! cannot be 0 or else it will not trigger sj.isEmpty() and will actually be set as 0
			link:		null,
		},
	}),
	staticProperties(parent) {
		parent.children.push(this);

		this.schema = {
			id: {
				columnName: 'id',
				rule: Rule1.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			playlistId: {
				columnName: 'playlistId',
				rule: Rule1.id,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			position: {
				columnName: 'position',
				rule: Rule1.posInt,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			name: {
				columnName: 'name',
				rule: new Rule1({
					origin: 'trackNameRules()',
					message: 'name validated',
				
					valueName: 'Name',
					trim: true,
				
					min: Rule1.nameMinLength,
					max: Rule1.stringMaxLength,  
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			duration: {
				columnName: 'duration',
				rule: Rule1.posInt,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			source: {
				columnName: 'source',
				rule: new Rule1({
					origin: 'sourceRules',
					message: 'source validated',
				
					valueName: 'Source',
				
					useAgainst: false, //TODO sourceList isn't populated in global.js, but main.js
	
					custom: function (value) {
						return Source.instances.some(source => value === source.name);
					}
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			sourceId: {
				columnName: 'sourceId',
				rule: new Rule1({
					origin: 'sourceIdRules',
					message: 'source id validated',
				
					valueName: 'Source ID',
				
					//? any source id rules (other than being a string)? length? trim?
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			artists: {
				columnName: 'artists',
				rule: new Rule1({
					origin: 'Rule1s.artists',
					message: 'artists validated',
			
					valueName: 'Artists',
			
					dataTypes: ['array'],
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			}
		};
		this.updateFilters();

		//G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.
		this.filters.localMetadata = ['id', 'playlistId', 'position'];
	},
});