import Entity from './entity.js';
import {userParts} from '../../shared/entityParts/index.js';

export default class User extends Entity {
	constructor(...args) {
		userParts.intercept(...args);
		super(...args);
		userParts.instance(this, ...args);
	}
}
userParts.prototype(User);
userParts.static(User);
