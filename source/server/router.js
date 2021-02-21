// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//G
	non-idempotent: (different result depending on how many times called)
	POST		-	Create

	idempotent: (same result no matter how many times called)
	GET		-	Retrieve
	PUT		-	Update (replace entirely)
	PATCH	-	Update (partially)
	DELETE	-	Delete

	//L put vs post: https://stackoverflow.com/questions/630453/put-vs-post-in-rest

	//G only use await next(); inside a route when the request should be further processed down the chain (ie. to finally result at .all), I cant think of a reason why this would be wanted (just use more middleware instead to do this)

	//L
	path parameters vs query parameters: https://stackoverflow.com/questions/3198492/rest-standard-path-parameters-or-request-parameters
	use path parameters to retrieve a specific item (via unique identifier)
	use query parameters to retrieve a list of items (via 'query parameters')
	/:type/:id 	are accessed via ctx.params.x
	/type?id=123	are accessed via ctx.query.x
	https://github.com/alexmingoia/koa-router#url-parameters


	//G all methods (except get) should pass parameters as their respective sj.Base
	//G get uses name as the identifier, TODO but should also accept id in the future

	node module.exports (unused, switched to ES Modules)
	//L https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
	exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=

	//R use query parameters for api get requests where multiple params may be needed or optional, use the single path parameters for page get requests where we're looking for a simple unique route
*/


//  ████████╗ ██████╗ ██████╗  ██████╗
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝

/*
	consider using a separate router for source-api requests (sourceRouter)

	error converting Track() to JSON because of circular reference

	Create lint rule to not call next() without await: await next().
		This was causing requests to return early and 404 all the time.
*/

// BUILT-IN
import path from 'path';
import fs from 'fs';
import util from 'util';

// EXTERNAL
import KoaRouter from '@koa/router'; //L https://github.com/alexmingoia/koa-router
import send from 'koa-send'; //L https://github.com/koajs/send

// INTERNAL
import {
	UIMainFileName,
	clientBuildDirectory,
} from '../config/project-paths.cjs';
import {
	GET_BODY,
} from '../shared/constants.js';
import {
	ParseError, InvalidStateError,
} from '../shared/errors/index.js';
import {
	User,
	Playlist,
	Track,
} from './entities/index.js';
import {returnPropagate} from '../shared/propagate.js';
import * as session from './session-methods.js';
import database from './database/database.js';
import {
	spotify,
	youtube,
} from './sources/index.js';

//L Race-condition in koa-router appears to be a false positive: https://github.com/koajs/koa/issues/1351
/* eslint-disable require-atomic-updates */

const root = clientBuildDirectory;
const app = `/${UIMainFileName}`;

function createAPIRouter() {
	const apiRouter = new KoaRouter();

	// Database CRUD and server-side processing.
	apiRouter
		// Catches and propagates all errors, but assigns them to the response body rather than throwing.
		.all('/(.*)', async (ctx, next) => {
			await next().catch(rejected => {
				const error = returnPropagate(rejected);
				console.error('Returning error to client:', util.inspect(error, {
					depth: 10,
					colors: true,
					getters: true,
				})); // Temporary
				ctx.response.body = error;
				// ctx.response.stats = 500; //TODO Figure out how to determine a proper error code.
			});
		})
		// Set GET request bodies as the parsed body parameter (if it exists).
		.get('/(.*)', async (ctx, next) => {
			const queryBody = ctx.request.query[GET_BODY];
			try {
				ctx.request.body = queryBody === undefined ? {} : JSON.parse(queryBody);
			} catch (error) {
				ctx.response.body = 400;
				ctx.response.body = new ParseError({
					message: error.message,
					userMessage: 'Request failed due to an internal error.',
					input: queryBody,
				});
			}

			await next();
		});

	function addCRUD(router, Entity) {
		const path = `/${Entity.table}`;
		const action = method => async ctx => {
			ctx.response.body = await method(ctx.request.body, {includeMetadata: true});
		};
		return router
			.post(path, action(Entity.add.bind(Entity)))
			.get(path, action(Entity.get.bind(Entity)))
			.patch(path, action(Entity.edit.bind(Entity)))
			.delete(path, action(Entity.remove.bind(Entity)));
	}

	addCRUD(apiRouter, User);
	addCRUD(apiRouter, Playlist);
	addCRUD(apiRouter, Track);

	apiRouter
		// SESSION
		//R //L login/logout are create/remove for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
		//? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
		.post('/session', async ctx => {
			ctx.response.body = await session.login(database, ctx, ctx.request.body);
		})
		.get('/session', async ctx => {
			//R thought about moving this to user, but with 'self' permissions, but if its a me request, the user specifically needs to know who they are - in get user cases, the user already knows what they're searching for an just needs the rest of the information
			ctx.response.body = await session.get(ctx);
		})
		.delete('/session', async ctx => {
			ctx.response.body = await session.logout(ctx);
		})

		// AUTH
		.get('/spotify/authRequestStart', async ctx => {
			// Retrieves an auth request URL and it's respective local key (for event handling).
			ctx.response.body = await spotify.startAuthRequest();
		})
		.get('/spotify/authRedirect', async ctx => {
			// Receives credentials sent from spotify, emits an event & payload that can then be sent back to the original client.
			//! This URL is sensitive to the url given to spotify developer site (I think).
			await spotify.receiveAuthRequest(ctx.request.query);
			await send(ctx, app, {root});
		})
		.post('/spotify/authRequestEnd', async ctx => {
			ctx.response.body = await spotify.endAuthRequest(ctx.request.body);
		})
		.post('/spotify/exchangeToken', async ctx => {
			ctx.response.body = await spotify.exchangeToken(ctx, ctx.request.body);
		})
		.get('/spotify/refreshToken', async ctx => {
			ctx.response.body = await spotify.refreshToken(ctx);
		})

		.get('/youtube/credentials', async ctx => {
			ctx.response.body = await youtube.getCredentials();
		})

		// catch
		.all('/(.*)', async ctx => {
			ctx.response.body = new InvalidStateError({
				userMessage: 'could not process request',
				message: 'invalid api command',
				state: ctx.request.body,
			});
		});

	return apiRouter;
}

export default function createRouter(/* {replaceIndex}*/) {
	const router = new KoaRouter();
	const apiRouter = createAPIRouter();

	//L nested routers: https://github.com/alexmingoia/koa-router#nested-routers
	router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

	// PAGE
	router
		.get('/favicon.ico', async ctx => {
			//L Temporarily ignore favicon request: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
			ctx.response.status = 204;
		})
		.get('/(.*)', async ctx => {
			/*
				// pages are accessed through the base GET method, serve any public files here
				//! static resource references in index.html should be absolute '/foo', not relative './foo'

				//! "Note: To deploy .mjs on the web, your web server needs to be configured to serve files with this extension using the appropriate Content-Type: text/javascript header"
				//L https://developers.google.com/web/fundamentals/primers/modules

				//TODO //! errors thrown here aren't caught - fix this here and everywhere else
			*/

			// Serve resources.
			if (
				fs.existsSync(path.join(root, ctx.request.path))
				&& ctx.request.path.indexOf('.') >= 0
			) {
				await send(ctx, ctx.request.path, {root});
				//TODO find a better way to differentiate a valid file from a just a valid path (other than indexOf('.'))
				//TODO webpack might have a better way to identify static resources
			} else if (
				!session.isLoggedIn(ctx)
				&& ctx.request.path !== '/login'
				&& ctx.request.path !== '/database'
			) {
				// Redirect if not logged in.
				//TODO this should use isLoggedIn, though that isn't perfect yet and it's async
				ctx.request.path = '/'; //! ctx.redirect() will not redirect if ctx.request.path is anything but '/', no idea why
				ctx.redirect('/login');
			} else {
				// Otherwise always return the index.js file, this is the root app and vue will handle the routing client-side.
				//L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
				await send(ctx, app, {root});
			}

			/* webpack-dev-middleware
				if (replaceIndex !== undefined) {
					replaceIndex(ctx);
				}
				else {
			*/
		})
		.all('/(.*)', async ctx => {
			ctx.body += '.all /* reached';
			//G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
		});

	return router;
}
