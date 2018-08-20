const path = require('path');

const Router = require('koa-router'); // https://github.com/alexmingoia/koa-router
const send = require('koa-send'); // https://github.com/koajs/send

const router = new Router();

const functions = require('./functions.js');

// TODO handle favicon.ico request https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
router
	//
	.get('/data/:type/:id', async (ctx, next) => {
		// data is accessed through the /data/ path

		// path parameters vs query parameters: https://stackoverflow.com/questions/3198492/rest-standard-path-parameters-or-request-parameters
		// use path parameters to retrieve a specific item (via unique identifier)
		// use query parameters to retrieve a list of items (via 'query parameters')

		// /:type/:id 	are accessed via ctx.params.x
		// /type?id=123	are accessed via ctx.query.x


		// https://github.com/alexmingoia/koa-router#url-parameters
		console.log(ctx.query);
		ctx.response.body = ctx.params.type + ' ' + ctx.params.id;
	})
	.get('/*', async (ctx, next) => { // retrieve data
		// pages are accessed through the base GET method
		// serve /public files
		if(ctx.request.path.lastIndexOf('.') === -1) {
			// TODO research 'canonical urls' to see if its possible to remove extensions from urls, or just redirect
			// add .html to non-extension urls
			ctx.request.path = ctx.request.path + '.html';
		}
		await send(ctx, ctx.request.path, {root: path.join(__dirname, '..', 'public')});
	})
	.post('/:type', async (ctx, next) => { // add new data (not idempotent)
		if (ctx.params.type === 'user') {
			let b = ctx.request.body;
			ctx.response.body = await functions.register(b.email, b.name, b.password1, b.password2)
			.catch(rejected => {
				return rejected;
			});
			console.log('REACHED');
			console.log(ctx.response.body);
		} else {
			console.log('no');
		}
		
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