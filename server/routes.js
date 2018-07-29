const path = require('path');

const Router = require('koa-router'); // https://github.com/alexmingoia/koa-router
const send = require('koa-send'); // https://github.com/koajs/send

const router = new Router();

// TODO handle favicon.ico request https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
router
	.get('/*', async (ctx, next) => {
		// TODO research 'canonical urls' to see if its possible to remove extensions from urls, or just redirect
		if(ctx.request.path.lastIndexOf('.') === -1) {
			// add .html to non-extension urls
			ctx.request.path = ctx.request.path + '.html';
		}
		await send(ctx, ctx.request.path, { root: path.join(__dirname, '..', 'public')});
	})
	.post('/*', async (ctx, next) => {
		ctx.body = 'post request';
		await next();
	})
	.all('/*', async (ctx, next) => {
		ctx.body = ctx.body + '.all /* reached';
		await next();
	});

// https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
// exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=
module.exports = router;