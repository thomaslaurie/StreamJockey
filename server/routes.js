const path = require('path');

const Router = require('koa-router'); // https://github.com/alexmingoia/koa-router
const send = require('koa-send'); // https://github.com/koajs/send

const router = new Router();
const apiRouter = new Router();

const sj = require('../public/js/global.js');
const sjs = require('./functions.js');

// non-idempotent: (different result depending on how many times called)
// POST		-	Create

// idempotent: (same result no matter how many times called)
// GET		-	Retrieve
// PUT		-	Update (replace entirely)
// PATCH	-	Update (partially)
// DELETE	-	Delete


// TODO handle favicon.ico request https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico

// await next(); // only use await next(); inside a route when the request should be further processed down the chain (ie. to finally result at .all), I cant think of a reason why this would be wanted (just use more middleware instead to do this)

// server-side data & processing requests
apiRouter
// path parameters vs query parameters: https://stackoverflow.com/questions/3198492/rest-standard-path-parameters-or-request-parameters
// use path parameters to retrieve a specific item (via unique identifier)
// use query parameters to retrieve a list of items (via 'query parameters')
// /:type/:id 	are accessed via ctx.params.x
// /type?id=123	are accessed via ctx.query.x
// https://github.com/alexmingoia/koa-router#url-parameters

// TODO add user, playlist, etc. should instead by added via their sj.Object (like addTrack()) and not just the set of parameters
// TODO deletes should be like this too
// TODO why cant get be like this either?

// TODO add CRUD for all types

// TODO if eventually its found that no additional data is needed to be sent alongside sj.Objects for api requests, just make the entire body the object for simplification

	// user
	.post('/user', async (ctx, next) => {
		ctx.response.body = await sjs.register(ctx.request.body.user).catch(sj.andResolve);
		console.log(ctx.response.body);
	})
	.get('/user/:id', async (ctx, next) => {
		ctx.response.body = await sjs.getUser(ctx.params.id).catch(sj.andResolve);
	})
	.patch('/user', async (ctx, next) => {
		// TODO update user profile / settings
		await next();
	})
	.delete('/user', async (ctx, next) => {
		// TODO
		await next();
	})

	// session
	.put('/login', async (ctx, next) => {
		ctx.response.body = await sjs.login(ctx, ctx.request.body.user).catch(sj.andResolve);
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
		ctx.response.body = await sjs.addPlaylist(ctx, ctx.request.body.playlist).catch(sj.andResolve);
		console.log(ctx.response.body);
	})
	.get('/playlist/:id', async (ctx, next) => {
		ctx.response.body = await sjs.getPlaylist(ctx, ctx.params.id).catch(sj.andResolve);
	})
	.patch('/playlist', async (ctx, next) => {
		// TODO update playlist
		await next();
	})
	.delete('/playlist', async (ctx, next) => {
		ctx.response.body = await sjs.deletePlaylist(ctx, ctx.request.body.playlist).catch(sj.andResolve);
	})

	// track
	.post('/track', async (ctx, next) => {
		ctx.response.body = await sjs.addTrack(ctx, ctx.request.body.track).catch(sj.andResolve);
	})
	// TODO tracks can only be retrieved from the context of a playlist, right? tracks will only ever be played or stored within playlists, right?
	// TODO not at the moment, but eventually users will be able to have track specific settings? (paired video, crop points, volume/cross fade, plays?)
	.delete('/track', async (ctx, next) => {
		ctx.response.body = await sjs.deleteTrack(ctx, ctx.request.body.track).catch(sj.andResolve);
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