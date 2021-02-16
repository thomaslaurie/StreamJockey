import Entity from './entity.js';
import {userParts, userSharedRegistryId} from '../../shared/entityParts/index.js';
import {sharedRegistry} from '../../shared/class-registry.js';

export default class User extends Entity {
	constructor(...args) {
		userParts.intercept(...args);
		super(...args);
		userParts.instance(this, ...args);
	}
}
userParts.prototype(User);
userParts.static(User);

// Id is assigned to instance in userParts.instance
sharedRegistry.register(User, userSharedRegistryId);
