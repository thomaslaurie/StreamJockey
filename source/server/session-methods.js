// EXTERNAL
import bcrypt from 'bcryptjs';

// INTERNAL
import {
	User,
} from './entities/index.js';
import {
	rules,
} from '../shared/utility/index.ts';
import PostgresError from './errors/postgres-error.js';
import {
	InvalidStateError,
	CustomError,
} from '../shared/errors/index.js';
import serverRegistry from './server-registry.js';


// CREATE
export async function login(db, ctx, user) {
	// Validate
	await User.schema.name.rule(user.name);
	await User.schema.password.rule(user.password); //! this will error on stuff like 'password must be over x characters long' when really it should just be 'password incorrect', maybe just have a string check rule?

	// Get password.
	const existingPassword = await db.one(
		'SELECT password FROM "sj"."users" WHERE "name" = $1',
		[user.name],
	).then(resolved => {
		return resolved.password;
	}).catch(rejected => {
		throw new PostgresError({
			postgresError: rejected,
			userMessage: 'Could not login, a database error has occurred.',
		});
	});

	// Check password.
	const isMatch = await bcrypt.compare(user.password, existingPassword).catch(rejected => {
		throw new InvalidStateError({
			userMessage: 'server error',
			message: 'hash compare failed',
			state: rejected,
		});
	});
	if (!isMatch) {
		throw new CustomError({
			userMessage: 'incorrect password',
		});
	}

	// Get user
	const retrievedUser = await db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', user.name).catch(rejected => {
		throw new PostgresError({
			postgresError: rejected,
			userMessage: 'Could not login, a database error has occurred.',
		});
	});

	ctx.session.user = new User(retrievedUser);
	return ctx.session.user;
}

// READ
export async function get(ctx) {
	if (isLoggedIn(ctx)) {
		return ctx.session.user;
	}
	throw new CustomError({
		userMessage: 'You are not logged in.',
		message: 'User is not logged in.',
	});
}

// UPDATE
//?

// DELETE
export async function logout(ctx) {
	delete ctx.session.user;
}

//TODO This doesn't check if the user exists however, though wouldn't this be expensive? searching the database every time the user wants to know if they're logged in, (every page).
export function isLoggedIn(ctx) {
	return (
		serverRegistry.autoConstruct(ctx.session.user) instanceof User
		&& rules.integer.test(ctx.session.user?.id)
	);
}
