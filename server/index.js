/*	process.env: https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
	for global storage in process.env, consider dotenv:  https://www.npmjs.com/package/dotenv	*/
// TODO put api keys into this as well after creating methods to access them
require('dotenv').config(); // dotenv doesn't work atm

// Middleware best practices https://github.com/koajs/koa/blob/master/docs/guide.md

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
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
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
  console.log('reached');
  db.one('SELECT * FROM public.test_table WHERE title = $1', ['title3'])
    .then(function(resolved) {
        console.log(JSON.stringify(resolved));
        resolved.forEach(item => {
          console.log('resolved: ' + JSON.stringify(item));
        });
    })
    .catch(function(rejected) {
        console.log('rejected: ' +rejected);
  });
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



app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});