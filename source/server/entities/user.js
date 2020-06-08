import {
	rules,
} from '../../shared/utility/index.js';
import { 
	Err,
} from '../../shared/legacy-classes/error.js';
import {
	User,
} from '../../shared/entities/index.js';
import {
	PASSWORD_SALT_ROUNDS,
} from '../constants.js';

User.augmentClass({
	staticProperties(parent) {
		// CRUD
		this.addPrepare = 
		this.editPrepare = async function (t, user) {
			let newUser = Object.assign([], user);
	
			//C hash password
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
		};
	
		this.queryOrder = 'ORDER BY "id" ASC';
	},
});

export default User;
