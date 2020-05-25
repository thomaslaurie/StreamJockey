import Base from '../legacy-classes/base.js';
import Entity from './entity.js';
import { 
	unused,
	optional,
	required,
	auto,
} from './schema-states.js';
import Rule1 from '../legacy-classes/rule1.js';

export default Base.makeClass('User', Entity, {
	constructorParts: parent => ({
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
				rule: Rule1.id,
	
				add: auto,
				get: optional,
				edit: required,
				remove: required,
			},
			name: {
				columnName: 'name',
				rule: new Rule1({
					origin: 'userNameRules',
					message: 'username validated',
					target: 'registerUserName',
					cssClass: 'inputError',
				
					valueName: 'Username',
					trim: true,
				
					min: Rule1.nameMinLength,
					max: Rule1.nameMaxLength,
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			email: {
				columnName: 'email',
				rule: new Rule1({
					origin: 'emailRules',
					message: 'email validated',
					target: 'registerEmail',
					cssClass: 'inputError',
				
					valueName: 'E-mail',
					trim: true,
				
					min: 3,
					max: Rule1.stringMaxLength,
				
					//TODO useFilter: ___, filterMessage: ___, 
					//L https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
				}),
	
				add: required,
				get: optional,
				edit: optional,
				remove: unused,
			},
			password: {
				columnName: 'password',
				rule: new Rule1({
					origin: 'passwordRules',
					message: 'password validated',
					target: 'registerPassword',
					cssClass: 'inputError',
				
					valueName: 'Password',
				
					min: 6,
					max: 72, //! as per bcrypt
				}),
	
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
				rule: new Rule1({
					origin: 'spotifyRefreshTokenRules',
					message: 'token validated',
				
					valueName: 'Token',
					//TODO empty for now
				}),
	
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