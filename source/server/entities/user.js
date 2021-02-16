// EXTERNAL
import bcrypt from 'bcryptjs';

// INTERNAL
import {
	rules, define,
} from '../../shared/utility/index.js';
import {
	userParts,
	userSharedRegistryId,
} from '../../shared/entityParts/index.js';
import {
	PASSWORD_SALT_ROUNDS,
} from '../constants.js';
import Entity from './entity.js';
import {InvalidStateError} from '../../shared/errors/index.js';
import serverRegistry from '../server-registry.js';
import {sharedRegistry} from '../../shared/class-registry.js';

const serverRegistryId = 'User';

export default class User extends Entity {
	constructor(...args) {
		userParts.intercept(...args);
		super(...args);
		userParts.instance(this, ...args);

		serverRegistry.defineId(this, serverRegistryId);
	}
}
userParts.prototype(User);
userParts.static(User);

// Id is assigned to instance in userParts.instance
sharedRegistry.register(User, userSharedRegistryId);

serverRegistry.register(User, serverRegistryId);


async function basePrepare(t, user, accessory) {
	const newUser = await Entity.basePrepare.call(this, t, new User(user), accessory);

	// Hash password.
	//TODO might be a vulnerability here with this string check
	if (rules.string.test(newUser.password)) {
		newUser.password = await bcrypt.hash(newUser.password, PASSWORD_SALT_ROUNDS).catch(rejected => {
			throw new InvalidStateError({
				userMessage: 'failed to add user',
				message: 'hash failed',
				state: rejected,
			});
		});
	}

	return newUser;
}

define.constant(User, {
	addPrepare:  basePrepare,
	editPrepare: basePrepare,

	queryOrder: 'ORDER BY "id" ASC',
});
