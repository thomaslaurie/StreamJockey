// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	run me with:
	nodemon --experimental-modules ./index.mjs 


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
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// top
import '../config/config.mjs';

// builtin

// external
import Koa from 'koa'; //L https://github.com/koajs
import bodyParser from 'koa-bodyparser'; //L https://github.com/koajs/bodyparser
import session from 'koa-session'; //L https://github.com/koajs/session
import cookie from 'cookie'; //L https://www.npmjs.com/package/cookie

//L https://github.com/socketio/socket.io#in-conjunction-with-koa
import SocketIO from 'socket.io'; 
import http from 'http'; //TODO consider changing to the https module?


// internal
import sj from '../public/js/global.mjs';
import router from './routes.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

const PORT = process.env.PORT || 3000;

// koa
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

// socket io
const socketIO = new SocketIO(server); 
const databaseSockets = socketIO.of('/database');

//L https://socket.io/docs/emit-cheatsheet/
databaseSockets.on('connect', (socket) => {
	console.log('SOCKET - CONNECTED', socket.id);

	console.log('socket.request.headers.cookie', cookie.parse(socket.request.headers.cookie));

	socket.on('disconnecting', (reason) => {
		console.log('SOCKET - DISCONNECTING', socket.id);
	});
	socket.on('disconnect', (reason) => {
		console.log('SOCKET - DISCONNECTED', socket.id);

		//C socket has left all of its rooms at this point
	});
	socket.on('error', (reason) => {
		console.log('SOCKET - ERROR', socket.id, reason);
	});

	socket.on('SUBSCRIBE', (query, callback) => {
		console.log('SOCKET - SUBSCRIBE', query);

		//TODO validate query
		let validatedQuery = query;

		socket.join(validatedQuery);

		callback(new sj.Success({
			content: validatedQuery,
		}));
	});

	socket.on('UNSUBSCRIBE', (query, callback) => {
		//? socket query should be correct here as it has already been validated and shouldnt be changed on the client - would it hurt to have a validation here anyways though?
		//? what happens if the client unsubscribes on its side but isn't able to unsubscribe on the server side?


		socket.leave(query);
	});
});


//  ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
//  ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
//  ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗  
//  ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝  
//  ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
//  ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

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
	databaseSockets.to('room-3993').emit('test response', 'test response bad');
	databaseSockets.to('room-3').emit('test response', 'test response');
	await next();
});

// parse body
app.use(bodyParser());

// session
app.use(session(sessionConfig, app));

// view counter
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

// router
app.use(router.routes());
app.use(router.allowedMethods()); //L https://github.com/alexmingoia/koa-router#routerallowedmethodsoptions--function


// socket session
socketIO.use((socket, next) => {
	//L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
	//L https://github.com/koajs/session/issues/53#issuecomment-311601304
	//! socket.session is static, whereas koa ctx.session is dynamic //?
	//L https://socket.io/docs/server-api/#namespace-use-fn

	//C uses a temporary koa context to decrypt the session
	socket.session = app.createContext(socket.request, new http.OutgoingMessage()).session;
	return next();
});


//  ██╗     ██╗███████╗████████╗███████╗███╗   ██╗
//  ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║
//  ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║
//  ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║
//  ███████╗██║███████║   ██║   ███████╗██║ ╚████║
//  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝

// listen to requests
server.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
	console.log('███████████████████████████████████████');
});

//L unhandled errors: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, '\n Reason:', reason);
    //TODO handle
});

//TODO errors thrown in some places (like routes) still aren't caught

