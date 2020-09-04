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


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// BUILT-IN
import path from 'path';
import fs from 'fs';

// EXTERNAL
import Router from 'koa-router'; //L https://github.com/alexmingoia/koa-router
import send from 'koa-send'; //L https://github.com/koajs/send

// INTERNAL
import {
	rules,
} from '../shared/utility/index.js';
import sourcePath from '../node-utility/source-path.cjs';
import {
	UIMainFileName,
	clientBuildDirectory,
} from '../config/project-paths.js';
import auth from './auth.js'; //! side-effects
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
import {
	returnPropagate,
	logPropagate,
} from '../shared/propagate.js';
import * as session from '../server/session-methods.js';
import database from './db.js';
import {
	spotify,
	youtube,
} from './sources/index.js';

//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║
//  ██║██║╚██╗██║██║   ██║
//  ██║██║ ╚████║██║   ██║
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝

export default function routes({replaceIndex}) {
	// path
	//L make own __dirname since it isn't exposed in modules: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
	//L remove 'file:///' because it messes up the parsing and creates 'C:/C:/': https://github.com/tc39/proposal-import-meta/issues/13
	//TODO there has to be a cleaner way of doing this (especially the replace manipulation)
	//R this was needed when running raw modules as __dirname was not accessible, however webpack now handles that
	// const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);
	const root = clientBuildDirectory;
	const app = `/${UIMainFileName}`;

	// router
	const router = new Router();
	const apiRouter = new Router();


	//   █████╗ ██████╗ ██╗
	//  ██╔══██╗██╔══██╗██║
	//  ███████║██████╔╝██║
	//  ██╔══██║██╔═══╝ ██║
	//  ██║  ██║██║     ██║
	//  ╚═╝  ╚═╝╚═╝     ╚═╝
	//TODO consider putting .catch(returnPropagate) as a middleware?

	/*
		let listenerList = [
		];

		async function addListener(depth) {
			//TODO this is a mess, there has to be a much better way to do this

			// stop recursion if 10 layers deep
			depth = depth || 0;
			if (depth >= 10) {
				throw new Err({
					log: true,
					origin: 'addListener()',
					message: 'could not handle request, timeout error',
					reason: 'addListener timeout',
				});
			}

			let f = Math.random();

			if (listeners.indexOf(f) !== -1) {
				f = await addListener(depth+1); //! recursive call
			}

			if (depth === 0) {
				listeners.push(f);
			}

			return f;
		}
	*/

	//TODO This routing file is in need of some refactoring.
	// Instead of using .catch(returnPropagate) on everything, a middleware should be written for it.
	//! Be aware, the first time this was tried it caused issues with liveQueries not working.

	// server-side data & processing requests
	apiRouter
		.all('/*', async (ctx, next) => {
			await next().catch(logPropagate);
		})

		.get('/*', async (ctx, next) => {
			// Set GET request bodies as the parsed body parameter (if it exists).
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
		})

		.post('/log', async (ctx, next) => {
			ctx.response.body = 'received client log message';
		})

		// auth
		.get('/spotify/authRequestStart', async (ctx, next) => {
			// Retrieves an auth request URL and it's respective local key (for event handling).
			ctx.response.body = await spotify.startAuthRequest().catch(returnPropagate);
		})
		.get('/spotify/authRedirect', async (ctx, next) => { 
			// Receives credentials sent from spotify, emits an event & payload that can then be sent back to the original client.
			//! This URL is sensitive to the url given to spotify developer site (I think).
			await spotify.receiveAuthRequest(ctx.request.query).catch(returnPropagate);
			await send(ctx, app, {root: root});
		})
		.post('/spotify/authRequestEnd', async (ctx, next) => {
			ctx.response.body = await spotify.endAuthRequest(ctx.request.body).catch(returnPropagate);
		})
		.post('/spotify/exchangeToken', async (ctx, next) => {
			ctx.response.body = await spotify.exchangeToken(ctx, ctx.request.body).catch(returnPropagate);
		})
		.get('/spotify/refreshToken', async (ctx, next) => {
			ctx.response.body = await spotify.refreshToken(ctx).catch(returnPropagate);
		})

		.get('/youtube/credentials', async (ctx, next) => {
			ctx.response.body = await youtube.getCredentials().catch(returnPropagate);
		})

		// session
		//R //L login/logout are create/remove for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
		//? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
		.post('/session', async (ctx, next) => {
			//----------
			//TODO //! returnPropagate isnt doing jack here, throwing inside session.login() wasn't showing any errors/
			ctx.response.body = await session.login(database, ctx, ctx.request.body).catch(e => {
				console.error(e);
			});
		})
		.get('/session', async (ctx, next) => {
			//R thought about moving this to user, but with 'self' permissions, but if its a me request, the user specifically needs to know who they are - in get user cases, the user already knows what they're searching for an just needs the rest of the information
			ctx.response.body = await session.get(ctx).catch(returnPropagate);
		})
		.delete('/session', async (ctx, next) => {
			ctx.response.body = await session.logout(ctx).catch(returnPropagate);
		})


		//TODO condense this
		// user
		.post(`/${User.table}`, async (ctx, next) => {
			ctx.response.body = await User.add(ctx.request.body).catch(returnPropagate);
		})
		.get(`/${User.table}`, async (ctx, next) => {
			ctx.response.body = await User.get(ctx.request.body).catch(returnPropagate);
		})
		.patch(`/${User.table}`, async (ctx, next) => {
			ctx.response.body = await User.edit(ctx.request.body).catch(returnPropagate);
		})
		.delete(`/${User.table}`, async (ctx, next) => {
			ctx.response.body = await User.remove(ctx.request.body).catch(returnPropagate);
		})

		// playlist
		.post(`/${Playlist.table}`, async (ctx, next) => {
			ctx.response.body = await Playlist.add(ctx.request.body).catch(returnPropagate);
		})
		.get(`/${Playlist.table}`, async (ctx, next) => {
			ctx.response.body = await Playlist.get(ctx.request.body).catch(returnPropagate);
		})
		.patch(`/${Playlist.table}`, async (ctx, next) => {
			ctx.response.body = await Playlist.edit(ctx.request.body).catch(returnPropagate);
		})
		.delete(`/${Playlist.table}`, async (ctx, next) => {
			ctx.response.body = await Playlist.remove(ctx.request.body).catch(returnPropagate);
		})

		// track
		.post(`/${Track.table}`, async (ctx, next) => {
			ctx.response.body = await Track.add(ctx.request.body).catch(returnPropagate);
		})
		.get(`/${Track.table}`, async (ctx, next) => {
			ctx.response.body = await Track.get(ctx.request.body).catch(returnPropagate);
		})
		.patch(`/${Track.table}`, async (ctx, next) => {
			ctx.response.body = await Track.edit(ctx.request.body).catch(returnPropagate);
		})
		.delete(`/${Track.table}`, async (ctx, next) => {
			ctx.response.body = await Track.remove(ctx.request.body).catch(returnPropagate);
		})

		// catch
		.all('/*', async (ctx, next) => {
			ctx.response.body = new InvalidStateError({
				userMessage: 'could not process request',
				message: 'invalid api command',
				state: ctx.request.body,
			});
		});

	//L nested routers: https://github.com/alexmingoia/koa-router#nested-routers
	router.use('/api', apiRouter.routes(), apiRouter.allowedMethods()); 


	//  ██████╗  █████╗  ██████╗ ███████╗
	//  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
	//  ██████╔╝███████║██║  ███╗█████╗  
	//  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
	//  ██║     ██║  ██║╚██████╔╝███████╗
	//  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

	router
		.get('/*', async (ctx, next) => {
			/*
				// pages are accessed through the base GET method, serve any public files here
				//! static resource references in index.html should be absolute '/foo', not relative './foo'

				//! "Note: To deploy .mjs on the web, your web server needs to be configured to serve files with this extension using the appropriate Content-Type: text/javascript header"
				//L https://developers.google.com/web/fundamentals/primers/modules

				//TODO //! errors thrown here aren't caught - fix this here and everywhere else
			*/

			//L temporarily ignore favicon request: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
			if (ctx.request.path === '/favicon.ico') {
				ctx.response.status = 204;
				return;
				//TODO add it and remove this block
			}

			// serve resources
			if (fs.existsSync(path.join(root, ctx.request.path)) && ctx.request.path.indexOf('.') >= 0) {
				await send(ctx, ctx.request.path, {root: root});
				return;
				//TODO find a better way to differentiate a valid file from a just a valid path (other than indexOf('.'))
				//TODO webpack might have a better way to identify static resources
			} 
			
			// redirect if not logged in
			if (!rules.populatedObject.test(ctx.session.user) && ctx.request.path !== '/login' && ctx.request.path !== '/database') { //TODO this should use isLoggedIn, though that isn't perfect yet and it's async
				ctx.request.path = '/'; //! ctx.redirect() will not redirect if ctx.request.path is anything but '/', no idea why
				ctx.redirect('/login');
				return;
			}

			/* webpack-dev-middleware
				if (replaceIndex !== undefined) {
					replaceIndex(ctx);
				} 
				else {
			*/
			// otherwise always return the index.js file, this is the root app and vue will handle the routing client-side
			//L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
			await send(ctx, app, {root: root});
		})
		.all('/*', async (ctx, next) => {
			ctx.body = ctx.body + '.all /* reached';
			//G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
		});

	return router;
}
