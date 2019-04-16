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
import fs from 'fs';

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
//L make own __dirname since it isn't exposed in modules: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
//L remove 'file:///' because it messes up the parsing and creates 'C:/C:/': https://github.com/tc39/proposal-import-meta/issues/13
//TODO there has to be a cleaner way of doing this (especially the replace manipulation)
const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);
const root = path.join(__dirname, '../../build/public');
const app = '/index.html';

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
.get('/spotify/authRequestStart', async (ctx, next) => {
    //C retrieves an auth request URL and it's respective local key (for event handling)
	ctx.response.body = await sj.spotify.startAuthRequest().catch(sj.andResolve);
})
.get('/spotify/authRedirect', async (ctx, next) => { 
    //C receives credentials sent from spotify, emits an event & payload that can then be sent back to the original client
    //! this URL is sensitive to the url given to spotify developer site (i think)
    await sj.spotify.receiveAuthRequest(ctx.request.query).catch(sj.andResolve);
    await send(ctx, app, {root: root});
})
.post('/spotify/authRequestEnd', async (ctx, next) => {
    ctx.response.body = await sj.spotify.endAuthRequest(ctx.request.body).catch(sj.andResolve);
})
.post('/spotify/exchangeToken', async (ctx, next) => {
    ctx.response.body = await sj.spotify.exchangeToken(ctx, ctx.request.body).catch(sj.andResolve);
})
.get('/spotify/refreshToken', async (ctx, next) => {
	ctx.response.body = await sj.spotify.refreshToken(ctx).catch(sj.andResolve);
})

// session
//R //L login/logout are create/remove for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
//? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
.post('/session', async (ctx, next) => {
	ctx.response.body = await sj.login(sj.db, ctx, ctx.request.body).catch(sj.andResolve);
})
.get('/session', async (ctx, next) => {
    //R thought about moving this to user, but with 'self' permissions, but if its a me request, the user specifically needs to know who they are - in get user cases, the user already knows what they're searching for an just needs the rest of the information
    ctx.response.body = await sj.getMe(ctx).catch(sj.andResolve);
})
.delete('/session', async (ctx, next) => {
	ctx.response.body = await sj.logout(ctx).catch(sj.andResolve);
})


// user
.post(`/${sj.User.table}`, async (ctx, next) => {
	ctx.response.body = await sj.User.add(ctx.request.body).catch(sj.andResolve);
})
.get(`/${sj.User.table}`, async (ctx, next) => {
	ctx.response.body = await sj.User.get(sj.decodeList(ctx.querystring)).catch(sj.andResolve);
})
.patch(`/${sj.User.table}`, async (ctx, next) => {
	ctx.response.body = await sj.User.edit(ctx.request.body).catch(sj.andResolve);
})
.delete(`/${sj.User.table}`, async (ctx, next) => {
	ctx.response.body = await sj.User.remove(ctx.request.body).catch(sj.andResolve);
})

// playlist
.post(`/${sj.Playlist.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Playlist.add(ctx.request.body).catch(sj.andResolve);
})
.get(`/${sj.Playlist.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Playlist.get(sj.decodeList(ctx.querystring)).catch(sj.andResolve);
})
.patch(`/${sj.Playlist.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Playlist.edit(ctx.request.body).catch(sj.andResolve);
})
.delete(`/${sj.Playlist.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Playlist.remove(ctx.request.body).catch(sj.andResolve);
})

// track
.post(`/${sj.Track.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Track.add(ctx.request.body).catch(sj.andResolve);
})
.get(`/${sj.Track.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Track.get(sj.decodeList(ctx.querystring)).catch(sj.andResolve);
})
.patch(`/${sj.Track.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Track.edit(ctx.request.body).catch(sj.andResolve);
})
.delete(`/${sj.Track.table}`, async (ctx, next) => {
	ctx.response.body = await sj.Track.remove(ctx.request.body).catch(sj.andResolve);
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
    /*
        //C pages are accessed through the base GET method, serve any public files here
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

    //C serve resources
    if (fs.existsSync(path.join(root, ctx.request.path)) && ctx.request.path.indexOf('.') >= 0) {
        await send(ctx, ctx.request.path, {root: root});
        return;
        //TODO find a better way to differentiate a valid file from a just a valid path (other than indexOf('.'))
        //TODO webpack might have a better way to identify static resources
    } 
    
    //C redirect if not logged in
    if (sj.isEmpty(ctx.session.user) && ctx.request.path !== '/login' && ctx.request.path !== '/database') { //TODO this should use sj.isLoggedIn, though that isn't perfect yet and it's async
        ctx.request.path = '/'; //! ctx.redirect() will not redirect if ctx.request.path is anything but '/', no idea why
        ctx.redirect('/login');
        return;
    }

    //C otherwise always return the index.mjs file, this is the root app and vue will handle the routing client-side
    //L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    await send(ctx, app, {root: root});
})
.all('/*', async (ctx, next) => {
	ctx.body = ctx.body + '.all /* reached';
	//G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
});	


export default router;