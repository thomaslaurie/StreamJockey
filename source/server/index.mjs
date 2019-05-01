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

//L https://github.com/socketio/socket.io#in-conjunction-with-koa
import SocketIO from 'socket.io'; 
import http from 'http'; //TODO consider changing to the https module?


// internal
import sj from './global-server.mjs';
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
sj.databaseSockets = socketIO.of('/database');




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
	sj.databaseSockets.to('room-3993').emit('test response', 'test response bad');
	sj.databaseSockets.to('room-3').emit('test response', 'test response');
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
sj.databaseSockets.use((socket, next) => {
	//L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
	//L https://github.com/koajs/session/issues/53#issuecomment-311601304
	//! socket.session is static, whereas koa ctx.session is dynamic //?
	//L https://socket.io/docs/server-api/#namespace-use-fn

	//C uses a temporary koa context to decrypt the session
	socket.session = app.createContext(socket.request, new http.OutgoingMessage()).session;
	next();
});

//L https://socket.io/docs/emit-cheatsheet/
sj.databaseSockets.on('connect', (socket) => {
	console.log('CONNECT', socket.id);

	//C give socket id to session.user //? I don't think the actual cookie.session receives this, but for now only the socket.session needs it
	if (sj.isType(socket.session.user, sj.User)) socket.session.user.socketId = socket.id;


	socket.on('disconnect', async (reason) => {
		console.log('DISCONNECT', socket.id);

		await sj.subscriptions.disconnect(socket.id).catch(rejected => { //TODO better way
			if (sj.isType(rejected, sj.Base)) rejected.announce();
			else console.error('subscription disconnect error:', rejected);
		});
		if (sj.isType(socket.session.user, sj.User)) delete socket.session.user.socketId;
	});


	socket.on('SUBSCRIBE', async ({table, query}, callback) => {
		console.log('SUBSCRIBE', table, query);

		//C if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
		let subscriber = socket.session.user;
		if (!sj.isType(subscriber), sj.User) subscriber = new sj.User({socketId: socket.id});
		const result = await sj.subscriptions.add(table, query, subscriber).catch(sj.andResolve);
		callback(result);		
	});

	socket.on('UNSUBSCRIBE', async ({table, query}, callback) => {
		console.log('UNSUBSCRIBE', query);

		let subscriber = socket.session.user;
		if (!sj.isType(subscriber), sj.User) subscriber = new sj.User({socketId: socket.id});
		const result = await sj.subscriptions.remove(table, query, subscriber).catch(sj.andResolve);
		callback(result);
	});


	socket.on('error', (reason) => {
		console.error('ERROR', socket.id, reason);
	});
});


//  ██╗     ██╗███████╗████████╗███████╗███╗   ██╗
//  ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║
//  ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║
//  ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║
//  ███████╗██║███████║   ██║   ███████╗██║ ╚████║
//  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝

// listen to requests
server.listen(PORT, () => {
	console.log('███████████████████████████████████████');
	console.log(`SERVER LISTENING ON PORT ${PORT}`);
});

//L unhandled errors: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, '\n Reason:', reason);
    //TODO handle
});

//TODO errors thrown in some places (like routes) still aren't caught


