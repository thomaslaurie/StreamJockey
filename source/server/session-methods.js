// EXTERNAL
import bcrypt from 'bcryptjs';

// INTERNAL
import { 
	User,
} from './entities/index.js';
import {
	Err,
} from '../shared/legacy-classes/error.js';
import {
	Success,
} from '../shared/legacy-classes/success.js';
import parsePostgresError from './parse-postgres-error.js';
import {
	rules,
} from '../shared/utility/index.js';


// CREATE
export async function login(db, ctx, user) {
	//C validate
	user.name = await User.schema.name.rule.check(user.name).then((result) => result.content);
	user.password = await User.schema.password.rule.check(user.password).then((result) => result.content); //! this will error on stuff like 'password must be over x characters long' when really it should just be 'password incorrect', maybe just have a string check rule?

    //C get password
    let existingPassword = await db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).then(resolved => {
        return resolved.password;
    }).catch(rejected => {
        throw parsePostgresError(rejected, new Err({
            log: false,
            origin: 'login()',
            message: 'could not login, database error',
        }));
    });

    //C check password
    let isMatch = await bcrypt.compare(user.password, existingPassword).catch(rejected => {
        throw new Err({
            log: true,
            origin: 'login()',
            message: 'server error',
            reason: 'hash compare failed',
            content: rejected,
            target: 'loginPassword',
            cssClass: 'inputError',
        });
    });
    if (!isMatch) {
        throw new Err({
            log: true,
            origin: 'login()',
            message: 'incorrect password',
            target: 'loginPassword',
            cssClass: 'inputError',
        });
    }

    //C get user
    user = await db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', user.name).catch(rejected => {
        throw parsePostgresError(rejected, new Err({
            log: false,
            origin: 'login()',
            message: 'could not login, database error',
        }));
    });

    ctx.session.user = new User(user);
    return new Success({
        origin: 'login()',
        message: 'user logged in',
        content: ctx.session.user,
    });
};

// READ
export async function get(ctx) {
	await isLoggedIn(ctx).catch((rejected) => {
		//TODO Temporary until route error handling can be reworked.
		console.log('Error in server api session.get()', rejected);
	});
    return new Success({
        origin: 'getMe()',
        content: ctx.session.user,
    });
};

// UPDATE
//?

// DELETE
export async function logout(ctx) {
    delete ctx.session.user;
    return new Success({
        origin: 'logout()',
        message: 'user logged out',
    });
};


async function isLoggedIn(ctx) {
	if (!(ctx.session.user instanceof User || ctx.session.user.constructorName === 'User') || !rules.integer.test(ctx.session.user.id)) {
        throw new Err({
            log: true,
            origin: 'isLoggedIn()',
            code: 403,
        
            message: 'you must be logged in to do this',
            reason: 'user is not logged in',
            target: 'notify',
            cssClass: 'notifyError', // TODO consider denial error rather than error error (you messed up vs I messed up)
        });
    }
	//C redundancy check to make sure id is right format
	rules.integer.validate(ctx.session.user.id);

    //TODO this doesn't check if the user exists however, though wouldn't this be expensive? searching the database every time the user wants to know if they're logged in, (every page)

    return new Success({
        origin: 'isLoggedIn()',
        message: 'user is logged in',
    });
};