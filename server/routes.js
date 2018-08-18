const path = require('path');

const Router = require('koa-router'); // https://github.com/alexmingoia/koa-router
const send = require('koa-send'); // https://github.com/koajs/send

const router = new Router();

// TODO handle favicon.ico request https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
router
	//
	.get('/data/:d', async (ctx, next) => {
		// https://github.com/alexmingoia/koa-router#url-parameters
		console.log(ctx.params.d);
	})
	.get('/*', async (ctx, next) => { // retrieve data
		// serve /public files
		if(ctx.request.path.lastIndexOf('.') === -1) {
			// TODO research 'canonical urls' to see if its possible to remove extensions from urls, or just redirect
			// add .html to non-extension urls
			ctx.request.path = ctx.request.path + '.html';
		}
		await send(ctx, ctx.request.path, {root: path.join(__dirname, '..', 'public')});
	})
	.post('/*', async (ctx, next) => { // add new data (not idempotent)
		console.log(ctx.request.body);
		ctx.response.body = ctx.request.body;
	})
	.put('/*', async (ctx, next) => { // update data

	})
	.delete('/*', async (ctx, next) => { // delete data

	})
	.all('/*', async (ctx, next) => {
		ctx.body = ctx.body + '.all /* reached';
		//await next(); // only use await next(); when we want the request to be further processed down the chain (ie. to finally result at .all)
	});

	

// https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
// exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=
module.exports = router;