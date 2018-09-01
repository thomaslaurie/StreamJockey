const path = require('path');

const Router = require('koa-router'); // https://github.com/alexmingoia/koa-router
const send = require('koa-send'); // https://github.com/koajs/send

const router = new Router();
const apiRouter = new Router();

const sj = require('../public/js/global.js');
const sjs = require('./functions.js');

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
*/

//   █████╗ ██████╗ ██╗
//  ██╔══██╗██╔══██╗██║
//  ███████║██████╔╝██║
//  ██╔══██║██╔═══╝ ██║
//  ██║  ██║██║     ██║
//  ╚═╝  ╚═╝╚═╝     ╚═╝

// server-side data & processing requests
apiRouter
	// user
	.post('/user', async (ctx, next) => {
		ctx.response.body = await sjs.addUser(ctx.request.body).catch(sj.andResolve);
		console.log(ctx.response.body);
	})
	.get('/user/:name', async (ctx, next) => {
		ctx.response.body = await sjs.getUser(new sj.User({name: ctx.params.name})).catch(sj.andResolve);
	})
	.patch('/user', async (ctx, next) => {
		ctx.response.body = await sjs.editUser(ctx.request.body).catch(sj.andResolve);
	})
	.delete('/user', async (ctx, next) => {
		ctx.response.body = await sjs.deleteUser(ctx.request.body).catch(sj.andResolve);
	})

	// session
	.put('/login', async (ctx, next) => {
		ctx.response.body = await sjs.login(ctx, ctx.request.body).catch(sj.andResolve);
	})
	.get('/me', async (ctx, next) => {
		ctx.response.body = await sjs.getMe(ctx).catch(sj.andResolve);
	})
	// TODO what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
	.delete('/logout', async (ctx, next) => {
		ctx.response.body = await sjs.logout(ctx).catch(sj.andResolve);
	})
	
	// playlist
	.post('/playlist', async (ctx, next) => {
		ctx.response.body = await sjs.addPlaylist(ctx, ctx.request.body).catch(sj.andResolve);
	})
	.get('/playlist/:id', async (ctx, next) => {
		//? fetching a playlist by name doesn't make sense without a user, and by that point we're into page HTTP not api HTTP
		console.log('HERE');
		ctx.response.body = await sjs.getPlaylist(ctx, new sj.Playlist({id: ctx.params.id})).catch(sj.andResolve);
	})
	.patch('/playlist', async (ctx, next) => {
		// TODO update playlist
		await next();
	})
	.delete('/playlist', async (ctx, next) => {
		ctx.response.body = await sjs.deletePlaylist(ctx, ctx.request.body).catch(sj.andResolve);
	})

	// track
	.post('/track', async (ctx, next) => {
		ctx.response.body = await sjs.addTrack(ctx, ctx.request.body).catch(sj.andResolve);
	})
	// TODO tracks can only be retrieved from the context of a playlist, right? tracks will only ever be played or stored within playlists, right?
	// TODO not at the moment, but eventually users will be able to have track specific settings? (paired video, crop points, volume/cross fade, plays?)
	.delete('/track', async (ctx, next) => {
		ctx.response.body = await sjs.deleteTrack(ctx, ctx.request.body).catch(sj.andResolve);
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

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods()); // nested routers: https://github.com/alexmingoia/koa-router#nested-routers


//  ██████╗  █████╗  ██████╗ ███████╗
//  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
//  ██████╔╝███████║██║  ███╗█████╗  
//  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
//  ██║     ██║  ██║╚██████╔╝███████╗
//  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

//TODO handle favicon.ico request https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico

// pages, etc.
router
	.get('/*', async (ctx, next) => {
		// pages are accessed through the base GET method
		// serve /public files
		if(ctx.request.path.lastIndexOf('.') === -1) {
			// TODO research 'canonical urls' to see if its possible to remove extensions from urls, or just redirect
			// add .html to non-extension urls
			ctx.request.path = ctx.request.path + '.html';
		}
		await send(ctx, ctx.request.path, {root: path.join(__dirname, '..', 'public')});
	})
	.all('/*', async (ctx, next) => {
		ctx.body = ctx.body + '.all /* reached';
		//await next(); // only use await next(); when we want the request to be further processed down the chain (ie. to finally result at .all)
	});	

// https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
// exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=
module.exports = router;