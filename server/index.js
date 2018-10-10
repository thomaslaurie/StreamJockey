//TODO some best practices: https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja
//L Middleware best practices https://github.com/koajs/koa/blob/master/docs/guide.md

/*	process.env: https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
	for global storage in process.env, consider dotenv:  https://www.npmjs.com/package/dotenv	*/


//TODO put api keys into this as well after creating methods to access them
require('dotenv').config();

//------------------- clean all of this

// modules
// dependencies
const Koa = require('koa'); // https://github.com/koajs
const bodyParser = require('koa-bodyparser'); // https://github.com/koajs/bodyparser
const session = require('koa-session'); // https://github.com/koajs/session

// instances
const app = new Koa();
app.keys = [process.env.APP_KEY || 'imJustSomeKey'];

// own
const router = require('./routes.js');
const db = require('./database/db.js');

const sessionConfig = {
	// https://randomkeygen.com/
	key: 'koa:sess', /* (string)(default is koa:sess) cookie key  */
	maxAge: 86400000, /* (number || 'session')(default is 1 days) maxAge in ms, 
	'session' will result in a cookie that expires when session/browser is closed, 
	Warning: If a session cookie is stolen, this cookie will never expire */
	overwrite: true, /* (boolean)(default true) can overwrite or not  */
	httpOnly: true, /* (boolean)(default true) httpOnly or not , httpOnly cookies tell the browser not to expose them to client-side scripts (so that they can only be opened by the server) */
	signed: true, /* (boolean)(default true) signed or not , signed cookies verify that the data is unchanged on the client side */
	rolling: true, /* (boolean)(default false) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. , I think this means that the session is reset after every request? (that is that the maxAge is basically since the last time the user made a request) */
	renew: false, /* (boolean)(default is false) renew session when session is nearly expired, so we can always keep user logged in. , does this mean never expiring sessions? */
};

// constants
const PORT = process.env.PORT || 3000;


// response timer
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.response.set('response-time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
	console.log(`${ctx.request.method} ${ctx.request.path}`);
	await next();
});

// session
app.use(session(sessionConfig, app));

// parse body
app.use(bodyParser());


app.use(async (ctx, next) => {
	// console.log('reached');
	// db.one('SELECT * FROM public.test_table WHERE title = $1', ['title3'])
	// 	.then(function(resolved) {
	// 		console.log(JSON.stringify(resolved));
	// 		resolved.forEach(item => {
	// 			console.log('resolved: ' + JSON.stringify(item));
	// 		});
    // 	})
	// 	.catch(function(rejected) {
	// 		console.log('rejected: ' +rejected);
	// 	});
	await next();
});


// session view counter
app.use(async (ctx, next) => {
	// ignore favicon
	if (ctx.path !== '/favicon.ico') {
		let n = ctx.session.views || 0;
		ctx.session.views = ++n;
		console.log(ctx.session.views + ' views');
	} 
	await next();
});

app.use(router.routes()); // use the routes defined in router
app.use(router.allowedMethods()); // https://github.com/alexmingoia/koa-router#routerallowedmethodsoptions--function

app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});


// Error listening
// https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, '\n Reason:', reason);
    // TODO handle
});