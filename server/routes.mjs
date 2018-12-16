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


	//G all methods (except get) should pass parameters as their respective sj.Object 
	//G get uses name as the identifier, TODO but should also accept id in the future
*/

//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
	consider using a separate router for source-api requests (sourceRouter)
*/


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

// builtin
import path from 'path';
//const path = require('path');
import EventEmitter from 'events';
//const EventEmitter = require('events');

// external
import Router from 'koa-router';
//const Router = require('koa-router'); //L https://github.com/alexmingoia/koa-router
import send from 'koa-send';
//const send = require('koa-send'); //L https://github.com/koajs/send

// internal
import sj from './global-server.mjs';
//const sj = require('./global-server.js');
import auth from './auth.mjs';
//const auth = require('./auth.js');




// initialize
//TODO there has to be a cleaner way of doing this (especially the replace manipulation)
//L make own __dirname since it isn't exposed in modules: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
//L remove 'file:///' because it messes up the parsing and creates 'C:/C:/': https://github.com/tc39/proposal-import-meta/issues/13
const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);
const emitter = new EventEmitter();

const router = new Router();
const apiRouter = new Router();



//   █████╗ ██████╗ ██╗
//  ██╔══██╗██╔══██╗██║
//  ███████║██████╔╝██║
//  ██╔══██║██╔═══╝ ██║
//  ██║  ██║██║     ██║
//  ╚═╝  ╚═╝╚═╝     ╚═╝

/*
	let listenerList = [
	];

	async function addListener(depth) {
		//TODO this is a mess, there has to be a much better way to do this

		//C stop recursion if 10 layers deep
		depth = depth || 0;
		if (depth >= 10) {
			throw new sj.Error({
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

// server-side data & processing requests
apiRouter
	// auth
	.get('/spotify/startAuthRequest', async (ctx, next) => {
		//L https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
		//! cannot load this url in an iframe as spotify has set X-Frame-Options to deny, loading this in a new window is probably the best idea to not interrupt the app

		ctx.response.body = await auth.startAuthRequest().catch(sj.andResolve);
	})
	.get('/spotify/authRedirect', async (ctx, next) => {
		//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
		let result = await auth.receiveAuthRequest(ctx).catch(sj.andResolve);
		console.log('HERE', result);
		
		if (sj.typeOf(result) === 'sj.Credentials') {
			emitter.emit(result.authRequestKey, result);
		} else if (sj.typeOf(result) === 'sj.Error') {
			//C ensure key is a string
			result.content = sj.typeOf(result.content) !== 'string' ? '' : result.content; 
			//C the authRequestKey (inside Error.content) can be empty/incorrect (simply no listeners will be called)
			emitter.emit(result.content, result); 
		}

		//TODO set default message here, (this should be closed oops)
	})
	.post('/spotify/endAuthRequest', async (ctx, next) => {
		//TODO timeout for this?
		await new Promise((resolve, reject) => {
			//C once the event with the same key as that passed in the body is triggered, call
			emitter.once(ctx.request.body.authRequestKey, (result) => {
				console.log('triggered');
				resolve(result);
			});
		}).then(resolved => {
			ctx.response.body = resolved;
		});		
	})


	// user
	.post('/user', async (ctx, next) => {
		ctx.response.body = await sj.addUser(ctx.request.body).catch(sj.andResolve);
		console.log(ctx.response.body);
	})
	.get('/user/:name', async (ctx, next) => {
		ctx.response.body = await sj.getUser(new sj.User({name: ctx.params.name})).catch(sj.andResolve);
	})
	.patch('/user', async (ctx, next) => {
		ctx.response.body = await sj.editUser(ctx.request.body).catch(sj.andResolve);
	})
	.delete('/user', async (ctx, next) => {
		ctx.response.body = await sj.deleteUser(ctx.request.body).catch(sj.andResolve);
	})

	// session
	.put('/login', async (ctx, next) => {
		ctx.response.body = await sj.login(ctx, ctx.request.body).catch(sj.andResolve);
	})
	.get('/me', async (ctx, next) => {
		ctx.response.body = await sj.getMe(ctx).catch(sj.andResolve);
	})
	// TODO what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
	.delete('/logout', async (ctx, next) => {
		ctx.response.body = await sj.logout(ctx).catch(sj.andResolve);
	})
	
	// playlist
	.post('/playlist', async (ctx, next) => {
		ctx.response.body = await sj.addPlaylist(ctx, ctx.request.body).catch(sj.andResolve);
	})
	.get('/playlist/:id', async (ctx, next) => {
		//? fetching a playlist by name doesn't make sense without a user, and by that point we're into page HTTP not api HTTP
		ctx.response.body = await sj.getPlaylist(ctx, new sj.Playlist({id: ctx.params.id})).catch(sj.andResolve);
	})
	.patch('/playlist', async (ctx, next) => {
		// TODO update playlist
		await next();
	})
	.delete('/playlist', async (ctx, next) => {
		ctx.response.body = await sj.deletePlaylist(ctx, ctx.request.body).catch(sj.andResolve);
	})

	// track
	.post('/track', async (ctx, next) => {
		ctx.response.body = await sj.addTrack(ctx, ctx.request.body).catch(sj.andResolve);
	})
	// TODO tracks can only be retrieved from the context of a playlist, right? tracks will only ever be played or stored within playlists, right?
	// TODO not at the moment, but eventually users will be able to have track specific settings? (paired video, crop points, volume/cross fade, plays?)
	.delete('/track', async (ctx, next) => {
		ctx.response.body = await sj.deleteTrack(ctx, ctx.request.body).catch(sj.andResolve);
	})

	// catch
	.all('/*', async (ctx, next) => {
		ctx.response.body = new sj.Error({
			log: true,
			origin: 'apiRouter',
			message: 'could not process request',
			reason: 'invalid api command',
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
		//C pages are accessed through the base GET method, serve any ./public files here

		// add .html to urls without extensions
		if (ctx.request.path.lastIndexOf('.') === -1) {
			ctx.request.path = ctx.request.path + '.html';
			// TODO research 'canonical urls' to see if its possible to remove extensions from urls, or just redirect
		}

		//! Note: To deploy .mjs on the web, your web server needs to be configured to serve files with this extension using the appropriate Content-Type: text/javascript header
		//L https://developers.google.com/web/fundamentals/primers/modules
		
		// favicon request
		if (ctx.request.path === '/favicon.ico') {
			// ignore it //L https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
			await next();
			//TODO handle the favicon.ico request
		}

		//TODO errors thrown here aren't caught - fix this here and everywhere else

		await send(ctx, ctx.request.path, {root: path.join(__dirname, '..', 'public')});
	})
	.all('/*', async (ctx, next) => {
		ctx.body = ctx.body + '.all /* reached';
		//G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
	});	


	
export default router;
//L https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
//! exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=
//module.exports = router;