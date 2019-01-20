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

	error converting sj.Track() to JSON because of circular reference
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// builtin
import path from 'path';
import EventEmitter from 'events';

// external
import Router from 'koa-router'; //L https://github.com/alexmingoia/koa-router
import send from 'koa-send'; //L https://github.com/koajs/send

// internal
import sj from './global-server.mjs';
import auth from './auth.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

// path
//TODO there has to be a cleaner way of doing this (especially the replace manipulation)
//L make own __dirname since it isn't exposed in modules: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
//L remove 'file:///' because it messes up the parsing and creates 'C:/C:/': https://github.com/tc39/proposal-import-meta/issues/13
const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);
const homePage = '/index.html';

// events
const emitter = new EventEmitter();

// router
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
.get('/test', async (ctx, next) => {
	
	console.log('TEST');
	let test = ['blahblah', new sj.User()];
	console.log('ROUTER CALL', test);
	ctx.response.body = test;
})

// auth
.get('/spotify/startAuthRequest', async (ctx, next) => {
	//L https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	//! cannot load this url in an iframe as spotify has set X-Frame-Options to deny, loading this in a new window is probably the best idea to not interrupt the app

	ctx.response.body = await auth.startAuthRequest().catch(sj.andResolve);
})
.get('/spotify/authRedirect', async (ctx, next) => {
	//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
	let result = await auth.receiveAuthRequest(ctx).catch(sj.andResolve);
	
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
			resolve(result);
		});
	}).then(resolved => {
		ctx.response.body = resolved;
	});		
})

// user
.post('/user', async (ctx, next) => {
	ctx.response.body = await sj.addUser(ctx, ctx.request.body).catch(sj.andResolve);
})
.get('/user', async (ctx, next) => {
	ctx.response.body = await sj.getUser(ctx, new sj.User({
		id: ctx.query.id, 
		name: ctx.query.name, 
		email: ctx.query.email,
	})).catch(sj.andResolve);
})
.patch('/user', async (ctx, next) => {
	ctx.response.body = await sj.editUser(ctx, ctx.request.body).catch(sj.andResolve);
})
.delete('/user', async (ctx, next) => {
	ctx.response.body = await sj.deleteUser(ctx, ctx.request.body).catch(sj.andResolve);
})

// session
//R login/logout are create/delete for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
.post('/session', async (ctx, next) => {
	ctx.response.body = await sj.login(ctx, ctx.request.body).catch(sj.andResolve);
})
.delete('/session', async (ctx, next) => {
	ctx.response.body = await sj.logout(ctx).catch(sj.andResolve);
})
//? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead

//TODO move me to user, but with 'self' permissions - somehow
.get('/me', async (ctx, next) => {
	ctx.response.body = await sj.getMe(ctx).catch(sj.andResolve);
})

// playlist
.post('/playlist', async (ctx, next) => {
	ctx.response.body = await sj.addPlaylist(ctx, ctx.request.body).catch(sj.andResolve);
})
.get('/playlist', async (ctx, next) => {
	ctx.response.body = await sj.getPlaylist(ctx, new sj.Playlist({
		id: ctx.query.id, 
		userId: ctx.query.userId,
		name: ctx.query.name, 
	})).catch(sj.andResolve);
})
.patch('/playlist', async (ctx, next) => {
	ctx.response.body = await sj.editPlaylist(ctx, ctx.request.body).catch(sj.andResolve);
})
.delete('/playlist', async (ctx, next) => {
	ctx.response.body = await sj.deletePlaylist(ctx, ctx.request.body).catch(sj.andResolve);
})

// track
.post('/track', async (ctx, next) => {
	ctx.response.body = await sj.addTrack(ctx, ctx.request.body).catch(sj.andResolve);
})
//TODO tracks can only be retrieved from the context of a playlist, right? tracks will only ever be played or stored within playlists, right?
//TODO not at the moment, but eventually users will be able to have track specific settings? (paired video, crop points, volume/cross fade, plays?)
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
		content: ctx.request.body,
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
		//ctx.request.path = ctx.request.path + '.html';
		// TODO research 'canonical urls' to see if its possible to remove extensions from urls, or just redirect

		//C always return index.html for vue single page application
		ctx.request.path = homePage;
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