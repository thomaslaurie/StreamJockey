// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//L process.env: https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
	//L dotenv:  https://www.npmjs.com/package/dotenv
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/* 
	Put api keys into .env after creating methods to access them
	Some best practices: https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja
	Middleware best practices https://github.com/koajs/koa/blob/master/docs/guide.md

	errors thrown in some places (like routes) still aren't caught
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// TOP
import '../config/environment-variables.js';

// BUILT-IN

// EXTERNAL
// import 'source-map-support/register';
import parser from 'minimist';
import Koa from 'koa'; //L https://github.com/koajs
import koaWebpack from 'koa-webpack';
import bodyParser from 'koa-bodyparser'; //L https://github.com/koajs/bodyparser
import session from 'koa-session'; //L https://github.com/koajs/session

//L https://github.com/socketio/socket.io#in-conjunction-with-koa
import SocketIO from 'socket.io'; //L socket io: https://socket.io/docs/emit-cheatsheet
import http from 'http'; //TODO consider changing to the https module?

// INTERNAL
// import { clientOptions, UIMainFileName } from '../config/webpack.config.js';

import Router from './routes.js';
import liveData from './live-data-server.js';
import createDatabase from './database/create-database.js';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

/* webpack-dev-middleware
	// OPTIONS
	const serverOptions = parser(process.argv.slice(2), {
		string: [
			'client',
			'client-mode',
		],
		default: {
			// Options
			// 'off'      - assume code is already built/watched by another process
			// 'compile'  - builds the client code once
			// 'watch'    - watches the client code
			// 'refresh'  - use webpack-dev-middleware
			// 'hot'      - use webpack HMR
			'client': 'off',
			// Options
			// 'development' - passed to webpack
			// 'production'  - passed to webpack
			'client-mode': 'development',
		},
	});

	// INTERPRET
	const useMiddleware = (serverOptions.client === 'refresh' || serverOptions.client === 'hot');

	const compiler = webpack(client({}, {
		mode: serverOptions['client-mode'],
	}));
*/

//TODO top level await
(async function () {
	// Initialize the database.
	await createDatabase().catch((rejected) => {
		console.error(rejected);
	});

	const routerOptions = {};

	/* webpack-dev-middleware
		const config = clientOptions({}, {
			mode: serverOptions['client-mode'],
		});

		let koaWebpackMiddleware;

		if (useMiddleware) {
			koaWebpackMiddleware = await koaWebpack({
				// compiler: compiler,
				config,
				devMiddleware: {
					methods: ['HEAD', 'GET', 'POST', 'PATCH', 'DELETE'],
				},
				hotClient: false,
			});

			routerOptions.replaceIndex = function (ctx) {
				const filename = path.resolve(config.output.path, UIMainFileName);
				ctx.response.type = 'html';
				ctx.response.body = koaWebpackMiddleware.devMiddleware.fileSystem.createReadStream(filename);
			};
		}
	*/

	const router = Router(routerOptions);

	const PORT = process.env.PORT || 3000;

	// KOA
	const app = new Koa();
	app.keys = [process.env.APP_KEY || 'imJustSomeKey'];
	const sessionConfig = {
		//TODO random keys: //L https://randomkeygen.com/

		//C (string)(default is koa:sess) cookie key
		key: 'koa:sess', 
		//C (number || 'session')(default is 1 days) maxAge in ms, 'session' will result in a cookie that expires when session/browser is closed, Warning: If a session cookie is stolen, this cookie will never expire
		maxAge: 86400000, 
		//C (boolean)(default true) can overwrite or not
		overwrite: true,
		//C (boolean)(default true) httpOnly or not , httpOnly cookies tell the browser not to expose them to client-side script (so that they can only be opened by the server)
		httpOnly: true,
		//C (boolean)(default true) signed or not , signed cookies verify that the data is unchanged on the client side
		signed: true,
		//C (boolean)(default false) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. , I think this means that the session is reset after every request? (that is that the maxAge is basically since the last time the user made a request)
		rolling: true,
		//C (boolean)(default is false) renew session when session is nearly expired, so we can always keep user logged in, //? does this mean never expiring sessions?
		renew: false, 
	};

	//L https://github.com/socketio/socket.io#in-conjunction-with-koa
	const server = http.createServer(app.callback());

	// SOCKET IO
	const socketIO = new SocketIO(server);
	liveData.socket = socketIO.of('/live-data');


	//  ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
	//  ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
	//  ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗  
	//  ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝  
	//  ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
	//  ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

	/* Timer / Logger
		// response timer
		app.use(async (ctx, next) => {
			const start = Date.now();
			await next();
			const ms = Date.now() - start;
			ctx.response.set('response-time', `${ms}ms`);
		});

		// request logger
		app.use(async (ctx, next) => {
			console.log(`${ctx.request.method} ${ctx.request.path}`);
			await next();
		});
	*/

	// BODY PARSER
	app.use(bodyParser());

	// SESSION
	app.use(session(sessionConfig, app));

	/* View Counter
		app.use(async (ctx, next) => {
			// ignore favicon
			// TODO this doesn't work as it's processing two 'requests' per view - the page and it's resources
			if (ctx.request.path !== '/favicon.ico') {
				let n = ctx.session.views || 0;
				ctx.session.views = ++n;
			} 
			//console.log(ctx.session.views + ' views');
			await next();
		});
	*/

	/* webpack-dev-middleware
		if (useMiddleware) {
			app.use(koaWebpackMiddleware);
		}
	*/

	// ROUTES
	app.use(router.routes());

	//L https://github.com/alexmingoia/koa-router#routerallowedmethodsoptions--function
	app.use(router.allowedMethods());


	// LIVE DATA
	liveData.start({
		app,
		socket: socketIO.of('/live-data'),
	});


	//  ██╗     ██╗███████╗████████╗███████╗███╗   ██╗
	//  ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║
	//  ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║
	//  ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║
	//  ███████╗██║███████║   ██║   ███████╗██║ ╚████║
	//  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝

	// START SERVER
	//G Connect at http://localhost:<PORT>
	server.listen(PORT, () => {
		console.log(`\n█████████████████████████████`);
		console.log(`SERVER LISTENING ON PORT ${PORT}`);
	});

	//L unhandled errors: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar
	process.on('unhandledRejection', (reason, p) => {
		console.log('Unhandled Rejection at:', p, '\n Reason:', reason);
		//TODO handle
	});
})();