// EXTERNAL
import bcrypt from 'bcryptjs';

// INTERNAL
import {
	rules, define,
} from '../../shared/utility/index.js';
import {
	Err,
} from '../../shared/legacy-classes/error.js';
import {
	userParts,
} from '../../shared/entityParts/index.js';
import {
	PASSWORD_SALT_ROUNDS,
} from '../constants.js';
import Entity from './entity.js';


export default class User extends Entity {
	constructor(...args) {
		userParts.intercept(...args);
		super(...args);
		userParts.instance(this, ...args);
	}
}
userParts.prototype(User);
userParts.static(User);


async function basePrepare(t, user) {
	const newUser = new User(user);

	// Hash password.
	//TODO might be a vulnerability here with this string check
	if (rules.string.test(newUser.password)) {
		newUser.password = await bcrypt.hash(newUser.password, PASSWORD_SALT_ROUNDS).catch(rejected => {
			throw new Err({
				log: true,
				origin: 'User.add()',
				message: 'failed to add user',
				reason: 'hash failed',
				content: rejected,
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
