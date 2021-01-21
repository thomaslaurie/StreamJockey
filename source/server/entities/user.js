// EXTERNAL
import bcrypt from 'bcryptjs';

// INTERNAL
import {
	rules, define,
} from '../../shared/utility/index.js';
import {
	userParts,
} from '../../shared/entityParts/index.js';
import {
	PASSWORD_SALT_ROUNDS,
} from '../constants.js';
import Entity from './entity.js';
import {InvalidStateError} from '../../shared/errors/index.js';
import serverRegistry from '../server-registry.js';

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

serverRegistry.register(User, serverRegistryId);


async function basePrepare(t, user) {
	const newUser = new User(user);

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
