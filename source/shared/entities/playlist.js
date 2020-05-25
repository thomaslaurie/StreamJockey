import Base from '../legacy-classes/base.js';
import Entity from './entity.js';
import { 
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import Rule1 from '../legacy-classes/rule1.js';

export default Base.makeClass('Playlist', Entity, {
	constructorParts: parent => ({
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
				rule: Rule1.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			userId: {
				columnName: 'userId',
				rule: Rule1.id,
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			name: {
				columnName: 'name',
				rule: new Rule1({
					origin: 'playlistNameRules()',
					message: 'name validated',
					target: 'playlistName',
					cssClass: 'inputError',
				
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
			description: {
				columnName: 'description',
				rule: new Rule1({
					origin: 'descriptionRules()',
					message: 'description validated',
					target: 'playlistDescription',
					cssClass: 'inputError',
				
					valueName: 'Description',
				
					max: Rule1.bigStringMaxLength,
					trim: true,
				}),
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			visibility: {
				columnName: 'visibility',
				rule: Rule1.visibility,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			image: {
				columnName: 'image',
				rule: Rule1.image,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
			color: {
				columnName: 'color',
				rule: Rule1.color,
	
				add: optional,
				get: optional,
				edit: optional,
				remove: unused,
			},
		};
		this.updateFilters();
	},
});