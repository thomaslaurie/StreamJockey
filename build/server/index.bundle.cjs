/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/config/environment-variables.js":
/*!************************************************!*\
  !*** ./source/config/environment-variables.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node-utility/source-path.cjs */ "./source/node-utility/source-path.cjs");
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
//! this needs to be in its own file (not at the top of index.js) because imports are hoisted, which causes dotenv.config() to run after any module that uses environment variables immediately, which makes them undefined
//L https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import


dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.config({
  path: _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()('config/.env')
}); //R The 'canary string' should be an environment variable that is committed to the repo that tests weather the passed environment variables are available and accurate. It should be identical to the CANARY environment variable.

if (process.env.CANARY !== 'canaryString') {
  throw new Error('Environment variables are not available.');
}

/***/ }),

/***/ "./source/config/project-paths.js":
/*!****************************************!*\
  !*** ./source/config/project-paths.js ***!
  \****************************************/
/*! exports provided: clientIndexFileName, defaultTestGlob, testSuffix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientIndexFileName", function() { return clientIndexFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTestGlob", function() { return defaultTestGlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testSuffix", function() { return testSuffix; });
//G Put any commonly needed paths/filenames in here.
//G Require sourcePath if needed.
const clientIndexFileName = 'index.html';
const defaultTestGlob = 'shared/utility';
const testSuffix = '.test.js';

/***/ }),

/***/ "./source/node-utility/source-path.cjs":
/*!*********************************************!*\
  !*** ./source/node-utility/source-path.cjs ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {//C Returns an absolute path relative to the source directory.
//G Use in places where __dirname would normally be required, like config options or non-webpack-recognized imports.
/* //! Do NOT move this file. 
	If it must be moved, 
		either ensure all references to this file and all relative paths passed to this function are updated, 
		or update the <base path> of this function: resolve(<__dirname, '../',> ...relativePaths)
*/
/* //R Workaround for __dirname / import.meta / webpack issues. 
	The __dirname node global doesn't exist in ES Modules, even when run with node.
		Webpack is supposed to be able to polyfill this with node: {__dirname: true}, however it doesn't seem to be working.
	The alternative import.meta would normally be the workaround for raw modules. 
		However Webpack doesn't support this yet: //L https://github.com/webpack/webpack/issues/6719
		@open-wc/webpack-import-meta-loader didn't work because it relies on window which isn't available in node.
		@bable/plugin-syntax-import-meta just didn't work at all.
		When webpack is able to parse import.meta, this could be a universal solution:
			//OLD
			import path from 'path';

			export default function (metaURL) {
				return path.dirname(new URL(metaURL.replace(/^file:\/\/\//, '')).pathname);
			};
	Current solution is to use __dirname only in a CommonJS Module, and instead import it into ES Modules.
		//L Solution from: https://medium.com/@almtechhub/es-modules-and-import-meta-dirname-babel-trick-39aad026682
		Here it was being wrapped in a path call because using the exported __dirname from outside this directory wouldn't make much semantic sense.
		This initially didn't work because it was actually just using the directory node was being run from.
			However, with a custom node globals polyfill: //L https://github.com/webpack/webpack/issues/1599#issuecomment-550291610 __dirname can now be properly polyfilled.
		Even though __dirname will now work properly, this cjs workaround is still the preferred way as it can be used in raw ES Modules.	
*/

const {resolve} = __webpack_require__(/*! path */ "path");
module.exports = (...relativePaths) => resolve(__dirname, '../', ...relativePaths);

/* WEBPACK VAR INJECTION */}.call(this, "C:\\Users\\Thomas\\Documents\\Personal-Work\\StreamJockey.git\\source\\node-utility"))

/***/ }),

/***/ "./source/server/auth.js":
/*!*******************************!*\
  !*** ./source/server/auth.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! spotify-web-api-node */ "spotify-web-api-node");
/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _shared_request_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/request.js */ "./source/shared/request.js");
/* harmony import */ var _global_server_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global-server.js */ "./source/server/global-server.js");
/* harmony import */ var _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/legacy-classes/error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");
/* harmony import */ var _shared_source_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/source.js */ "./source/shared/source.js");
/* harmony import */ var _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/entities/index.js */ "./source/shared/entities/index.js");
/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/constants.js */ "./source/shared/constants.js");
/* harmony import */ var _server_session_methods_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../server/session-methods.js */ "./source/server/session-methods.js");
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //TODO consider just writing native api functions, because they are fairly simple, and the spotify-web-api-node
    //L https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/

    //TODO remove exports. from internal functions

*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// BUILT-IN
 // EXTERNAL
//import btoa from 'btoa';

 //L https://github.com/thelinmichael/spotify-web-api-node
// INTERNAL









 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   
// events

const emitter = new events__WEBPACK_IMPORTED_MODULE_0___default.a();
let auth = {}; //   █████╗ ██╗   ██╗████████╗██╗  ██╗
//  ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
//  ███████║██║   ██║   ██║   ███████║
//  ██╔══██║██║   ██║   ██║   ██╔══██║
//  ██║  ██║╚██████╔╝   ██║   ██║  ██║
//  ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
//C generics

auth.requestTimeout = 300000; //C 5 minutes

auth.requestKeys = [];

auth.addRequestKey = async function () {
  return await _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["keyCode"].addTo(this.requestKeys, this.requestTimeout);
};

auth.checkRequestKey = async function (key) {
  let pack = await _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["keyCode"].verify(this.requestKeys, key);
  return {
    authRequestKey: pack.key,
    authRequestTimestamp: pack.timestamp
  };
}; //  ███████╗ ██████╗ ██╗   ██╗██████╗  ██████╗███████╗
//  ██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔════╝██╔════╝
//  ███████╗██║   ██║██║   ██║██████╔╝██║     █████╗  
//  ╚════██║██║   ██║██║   ██║██╔══██╗██║     ██╔══╝  
//  ███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╗███████╗
//  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝
//TODO consider moving this over to the globals-server stuff
//C this is only used in auth.startAuthRequest() for its spotify.makeAuthRequestURL() function


_global_server_js__WEBPACK_IMPORTED_MODULE_4__["default"].spotify = new _shared_source_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
  name: 'spotify',
  register: true,
  api: new spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1___default.a({
    //C create api object and set credentials in constructor
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
  }),

  get scopes() {
    //? why does this need to be a getter?, i think it was because one of the properties needed to be dynamic and react to authRequestManually
    return [
    /* //C
    contains an array of all scopes sent with the auth request
              'streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private' are required for the web playback sdk
    'user-modify-playback-state' is required to operate the playback
              show_dialog sets whether or not to force the user to approve the request each time
    
    state gets returned back with the request, TODO use with hashes to verfy that the response came from the expected source
    */
    // users
    'user-read-private', 'user-read-email', 'user-read-birthdate', // spotify connect
    'user-read-currently-playing', 'user-modify-playback-state', 'user-read-playback-state', // streaming
    'streaming'];
  },

  authRequestManually: true,
  makeAuthRequestURL: function (key) {
    //TODO make a better catch & handle, this is a temporary catch for undefined credentials as the error is silent until it arrives on spotify's end: 'Missing required parameter: client_id'
    if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(this.api._credentials.clientId) || !_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(this.api._credentials.clientSecret) || !_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(this.api._credentials.redirectUri)) {
      throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["Err"]({
        log: true,
        origin: 'spotify.makeAuthRequestURL()',
        message: 'one or more api credentials are missing or of the wrong type',
        content: {
          clientId: this.api._credentials.clientId,
          clientSecret: this.api._credentials.clientSecret,
          redirectUri: this.api._credentials.redirectUri
        }
      });
    } //! the show_dialog query parameter isn't available in the createAuthorizeURL, so it is manually added


    return this.api.createAuthorizeURL(this.scopes, key) + `&show_dialog=${this.authRequestManually}`;
  }
}); //TODO make any property available for Source

Object.assign(_global_server_js__WEBPACK_IMPORTED_MODULE_4__["default"].spotify, {
  startAuthRequest: async function () {
    let pack = await auth.addRequestKey();
    return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_6__["Credentials"]({
      authRequestKey: pack.key,
      authRequestTimestamp: pack.timestamp,
      authRequestTimeout: pack.timeout,
      authRequestURL: this.makeAuthRequestURL(pack.key)
    });
  },
  receiveAuthRequest: async function (query) {
    //C receives and transforms credentials from spotify after the user confirms the authorization

    /*//C spotify authorization guide
    	//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
    			if the user accepts the request:
    	code	An authorization code that can be exchanged for an access token.
    	state	The value of the state parameter supplied in the request.
    			if the user denies the request, or if an error has occured
    	error	The reason authorization failed, for example: “access_denied” 
    	state	The value of the state parameter supplied in the request.
    			//TODO create error parser for spotify api
    */
    //C ensure key is recognized, if its not (or timed out), nothing can be done, let it timeout on the client side too
    await auth.checkRequestKey(query.state); //C ensure that spotify sent the code

    if (query.code === undefined) {
      emitter.emit(query.state, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["Err"]({
        log: true,
        origin: 'receiveAuthRequest()',
        message: 'spotify authorization failed',
        reason: 'code is missing',
        content: query
      }));
    } //C ensure that spotify didn't send an error


    if (query.error !== undefined) {
      emitter.emit(query.state, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["Err"]({
        log: true,
        origin: 'receiveAuthRequest()',
        message: 'spotify authorization failed',
        reason: query.error,
        content: query
      }));
    } //C send the event and credentials for endAuthRequest() to pick up


    emitter.emit(query.state, new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_6__["Credentials"]({
      //? sj.success here?
      authRequestKey: query.state,
      //? is this needed anymore?
      authCode: query.code
    }));
  },
  endAuthRequest: async function (credentials) {
    //C catches events emitted by receiveAuthRequest() and sends them to the waiting router request
    return await new Promise((resolve, reject) => {
      //! needs to be a promise wrapper because emitter.once uses a callback function
      //C setup listener for authRequestKey
      emitter.once(credentials.authRequestKey, result => {
        resolve(result);
      }); //C setup timeout

      Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["wait"])(credentials.authRequestTimeout).then(() => {
        reject(new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["Err"]({
          log: true,
          origin: 'sj.spotify.endAuthRequest()',
          message: 'request timeout'
        }));
      });
    });
  },
  exchangeToken: async function (ctx, credentials) {
    //C exchange auth code for access and refresh tokens
    //C exchangeToken() is only outside of endAuthRequest() because the auth window should close and not have to wait for the exchange to happen - to reduce flickering of the redirect page
    //C grab timestamp before sending request so that the recorded expiry time is before the actual expiry time
    let timestamp = Date.now(); //C exchange the auth code for tokens
    //L https://developer.spotify.com/documentation/general/guides/authorization-guide/

    let result = await Object(_shared_request_js__WEBPACK_IMPORTED_MODULE_3__["default"])('POST', 'https://accounts.spotify.com/api/token', {
      body: Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["encodeProperties"])({
        grant_type: 'authorization_code',
        code: credentials.authCode,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        //C only used for validation, no need to make a second redirect handler
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET // alternative to client_id and client_secret properties, put this in header: 'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,

      }),
      headers: _shared_constants_js__WEBPACK_IMPORTED_MODULE_9__["URL_HEADER"]
    }).catch(rejected => {
      throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["Err"]({
        log: true,
        message: 'failed to authorize spotify',
        reason: 'token exchange failed',
        content: rejected
      });
    }); //C store refresh token in database
    //C while the client triggers the refresh of the accessToken (so that the server doesn't have to keep track of which users are online), the refreshToken is stored server side so that the user doesn't have to re-auth between sessions

    let me = await _server_session_methods_js__WEBPACK_IMPORTED_MODULE_10__["get"](ctx).then(result => result.content);
    await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["User"].edit({
      id: me.id,
      spotifyRefreshToken: result.refresh_token
    }).then(resolved => {}); //C repack and return

    return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_6__["Credentials"]({
      accessToken: result.access_token,
      expires: timestamp + result.expires_in,
      //refreshToken: result.refresh_token,
      scopes: result.scope.split(' ') //C result.token_type is the only omitted property, this is always 'Bearer'

    });
  },
  refreshToken: async function (ctx) {
    //C get the refresh token from the database
    let me = await _server_session_methods_js__WEBPACK_IMPORTED_MODULE_10__["get"](ctx).then(result => result.content);
    let refreshToken = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["User"].get(me).then(result => result.content).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["one"]).then(resolved => resolved.spotifyRefreshToken); //C if there isn't one, throw the specific AuthRequired error, this will be identified on the client side and trigger spotify.auth()
    //TODO reconsider this string test

    if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].visibleString.test(refreshToken)) {
      throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["AuthRequired"]();
    } //C send a refresh request to spotify to get new access token, expiry time, and possible refresh token


    let timestamp = Date.now();
    let result = await Object(_shared_request_js__WEBPACK_IMPORTED_MODULE_3__["default"])('POST', 'https://accounts.spotify.com/api/token', {
      body: Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["encodeProperties"])({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }),
      headers: _shared_constants_js__WEBPACK_IMPORTED_MODULE_9__["URL_HEADER"]
    }).catch(rejected => {
      throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_5__["Err"]({
        log: true,
        message: 'failed to authorize spotify',
        reason: 'token refresh failed',
        content: rejected
      });
    }); //C if a new refresh token was sent

    if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(result.refresh_token)) {
      //? better validation?
      //C store it
      await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["User"].edit({
        id: me.id,
        spotifyRefreshToken: result.refresh_token
      });
    } //C send only the accessToken and the expiry time


    return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_6__["Credentials"]({
      origin: 'sj.spotify.refreshToken()',
      accessToken: result.access_token,
      expires: timestamp + result.expires_in
    });
  }
});
_global_server_js__WEBPACK_IMPORTED_MODULE_4__["default"].youtube = new _shared_source_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
  name: 'youtube',
  register: true
});
Object.assign(_global_server_js__WEBPACK_IMPORTED_MODULE_4__["default"].youtube, {
  getCredentials: async () => ({
    apiKey: process.env.YOUTUBE_API_KEY,
    clientId: process.env.YOUTUBE_CLIENT_ID
  })
});
/* harmony default export */ __webpack_exports__["default"] = (auth);

/***/ }),

/***/ "./source/server/database/sql-builders.js":
/*!************************************************!*\
  !*** ./source/server/database/sql-builders.js ***!
  \************************************************/
/*! exports provided: buildValues, buildWhere, buildSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildValues", function() { return buildValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildWhere", function() { return buildWhere; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildSet", function() { return buildSet; });
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db.js */ "./source/server/db.js");


function buildValues(mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    //C this shouldn't insert anything
    return `("id") SELECT 0 WHERE 0 = 1`;
  } else {
    let columns = [];
    let values = [];
    let placeholders = [];
    Object.keys(mappedEntity).forEach((key, i) => {
      columns.push(key);
      values.push(mappedEntity[key]);
      placeholders.push(`$${i + 1}`); //C $1 based placeholders
    });
    columns = columns.join('", "'); //C inner delimiter

    columns = `("${columns}")`; //C outer

    placeholders = placeholders.join(', ');
    placeholders = `(${placeholders})`; //? this should be able to format arrays just as any other value, otherwise the format is: ARRAY[value1, value2, ...]

    return _db_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`${columns} VALUES ${placeholders}`, values);
  }
}
;
function buildWhere(mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    //TODO hacky
    //C return a false clause
    return '0 = 1';
  } else {
    //C pair as formatted string
    let pairs = [];
    pairs = Object.keys(mappedEntity).map(key => {
      //C wrap array in another array so that pgp doesn't think its values are for separate placeholders
      let input = _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(mappedEntity[key]) ? [mappedEntity[key]] : mappedEntity[key];
      return _db_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`"${key}" = $1`, input); //! if the value here is undefined, it wont format, it will simply leave the string as '"key" = $1'
    }); //C join with ' AND '

    return pairs.join(' AND ');
  }
}
;
function buildSet(mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    //TODO hacky
    //C don't make any change
    //! this does have to reference a column that always exists (id)
    return '"id" = "id"';
  } else {
    let pairs = []; //C pair as formatted string

    pairs = Object.keys(mappedEntity).map(key => {
      let input = _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(mappedEntity[key]) ? [mappedEntity[key]] : mappedEntity[key];
      return _db_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`"${key}" = $1`, input);
    }); //C join with ', '

    return pairs.join(', ');
  }
}
;

/***/ }),

/***/ "./source/server/db.js":
/*!*****************************!*\
  !*** ./source/server/db.js ***!
  \*****************************/
/*! exports provided: default, pgp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgp", function() { return pgp; });
/* harmony import */ var pg_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg-promise */ "pg-promise");
/* harmony import */ var pg_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg_promise__WEBPACK_IMPORTED_MODULE_0__);
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// builtin
// external

const pgp = pg_promise__WEBPACK_IMPORTED_MODULE_0___default()({//TODO initialization options here: //L http://vitaly-t.github.io/pg-promise/module-pg-promise.html
}); //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

const config = {
  // https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
  // TODO create new db user with restricted capabilities
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_NAME || 'test',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'pgPassword'
};
const db = pgp(config); //C create a single db object for entire app

/* harmony default export */ __webpack_exports__["default"] = (db);

const schema = {
  name: 'sj',
  tables: {
    users: {
      name: 'users',
      columns: {
        id: {
          name: 'id'
        },
        name: {
          name: 'name'
        },
        password: {
          name: 'password'
        },
        email: {
          name: 'email'
        },
        spotifyRefreshToken: {
          name: 'spotify_refresh_token'
        }
      }
    }
  }
};

/***/ }),

/***/ "./source/server/global-server.js":
/*!****************************************!*\
  !*** ./source/server/global-server.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db.js */ "./source/server/db.js");
/* harmony import */ var _live_data_server_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./live-data-server.js */ "./source/server/live-data-server.js");
/* harmony import */ var _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/legacy-classes/error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");
/* harmony import */ var _shared_legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/legacy-classes/rule1.js */ "./source/shared/legacy-classes/rule1.js");
/* harmony import */ var _shared_source_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/source.js */ "./source/shared/source.js");
/* harmony import */ var _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/entities/index.js */ "./source/shared/entities/index.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./parse-postgres-error.js */ "./source/server/parse-postgres-error.js");
/* harmony import */ var _database_sql_builders_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./database/sql-builders.js */ "./source/server/database/sql-builders.js");
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //G CRUD MAP
    Create = add
    Retrieve = get
    Update = edit
    Delete = remove

    //R CRUD DATA FORMAT
		get functions will be allowed to get multiple resources (just a simple query based on matches), for example getting a playlist with only userId will get all playlists by that user
		
		there is some confusion about what is 'known' information - because playlists hold data on the tracks they contain, but users don't hold data on the playlists they have. get needs the ability for multiple matches because it is not 'known' by the client what it contains (playlist is only able to do this because the multiple query is done manually server-side when getting the original playlist, this is not done for user)
	
		two directions - either make user retrieve all of it's containing playlists (lots of data being passed around here, no way to do a different query for playlists or tracks separated from user), or allow multiple querying (creates a difference between get and the other CRUD methods (add, edit, and remove could be done in multiple but these are all methods where the client 'knows' the exact resource they're manipulating and can be done iteratively on the client-side)
	
		maybe make all CRUD methods multiply possible (for admin stuff? remove all tracks in a playlist (at once) without doing them iteratively client-side), all of these would have to fail if any one part fails (using that postgres thing (transaction commit?))

		all CRUD will return an array of any number of rows

		GET should be the only method used for search/query. EDIT & DELETE (& ADD) should not, therefore, editing or deleting a resource should only be done when it's id is known (after probably GETing it), (this clears up confusion: say we want to edit a track where its property is x, this is done in the GET method, but here is an issue when determining what data is the replacement data and what data is the query data - therefore only the id should be used as the query data (because it cant be changed), an the rest is the replacement data)

		because of this it becomes: get | add, edit, remove   or   get, remove | add, edit    (because it could make sense for remove to query too because it doesn't have replacement data, but not add because it doesn't need a query), it comes down to consistency, get could take a single object, add, edit, remove, could take an array of objects (and return single success/failure?), what about get taking an array and returning an array
		
		//L multiple resources with one request: https://stackoverflow.com/questions/32098423/rest-updating-multiple-resources-with-one-request-is-it-standard-or-to-be-avo


	//R ErrList
		ErrorList should not be a wrapper for a list of errors, ErrorList should be a version of a single error that has multiple 'parallel' parts (ie: adding a user and having an issue with multiple fields - its still a single error with one resource (a user) but there are multiple parts to the error that need to be evaluated in parallel not in sequence)
		
		would this not mean that requests are also evaluated in parallel? that response arrays should all have Success or ErrorList wrappers?, wouldn't this be redundant - if everything is already an array why have a wrapper for it? what would be the default wrapper for request data like editTracks([{}, {}, ...]) ?

	//G JAVASCRIPT GUIDELINES
		when returning a promise / async function, use return await Promise()
		//L https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
		//L https://www.reddit.com/r/javascript/comments/7idasp/await_vs_return_vs_return_await/ 
		
		//L proper use of array methods: https://medium.com/front-end-weekly/stop-array-foreach-and-start-using-filter-map-some-reduce-functions-298b4dabfa09
	
	//R CLASS NAMESPACES
		I started using Object.assign() to supplement sj.Entity (and other classes) for server-specific functionality, however it was limiting me to shallow assignment - which required a bunch of functions to have prefixes (addPrepare, getPrepare, etc.), and I really wanted to avoid calling these functions like: this[`${method}Prepare`](), I wanted functional assignment much like class constructors, so I decided to switch to using  (function () {}).call()  which acts kind of reverse to how its used as 'super' in function classes, basically calling another constructor(?) later
		
		two ways to implement: namespace within the class - this requires those namespaced functions to be called via this.namespace.fn.call(this, ...), or just prefix the functions which requires them to be called via this[`${namespace}Fn`](...), still not sure which is better
		
		actually - don't do that namespace thing, as the namespace is still a reference to an object, so if a child class changes one of its properties, it changes it for all classes with that same namespace

	//G FUNCTION MODIFICATION VS RETURN NEW
		modifying & returning passed objects in functions, in general I'm deciding to modify passed objects in functions and return the same reference, however when the data-structure changes (nesting, cloning, etc.), the passed object should not be modified. this can be seen in sj.Entity.common() validation, where any nested validated properties are flattened into a root object
*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝  

/*
	// PRODUCTION
		tree-shake any objects that don't need to be exported (remove from sj.x, just hae them locally defined)
		after functions are mostly debugged - remove a lot of the .catch(propagate) - this is mainly tracing and unhandled error

	// BEST PRACTICE
		//L best practices: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
		//L review common pg-promise mistakes: https://github.com/vitaly-t/pg-promise/wiki/Common-Mistakes#invalid-query-formatting-with-manual-string-concatenation-and-es6-template-strings

	// SECURITY

		issue for private query variables (eg password), if someone queries for users where password = x, the passwords wont be returned, but they will still receive a list of users that that query matches

		//? user id being in the session.user object is basically the user's access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out - I think this info is never sent to the client, just stored in the server and accessed via cookie key
		
		permissions: [admin, self, password, link, public, etc.]

		track names that don't fit the requirements (too short, too long, etc. will throw an error when trying to add, this isn't desirable because all the track names will be external) should use casting if those restrictions are necesary

	// CONSIDER
    	delegating unexpected error catches to only top-level entry points, (so that catchUnexpected() doesn't have to be repeated for every single 

	// GENERAL
		//! IMPORTANT //! check any CRUD functions (like addTrack()) that rely on the current state of the database for information - because asyncMap() functions are executed in parallel, and not in series, this could cause collisions
		replace all database variables, column names, etc. with constants inside this file (or the db file)
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝ 
// BUILT-IN
// EXTERNAL
// import fetch from 'node-fetch'; //C global.js uses fetch
 // INTERNAL












const sj = {}; //TODO refactor this function out in favor of more specific validators.
// global-server is the last place that uses this because there are some places where the validators use isEmpty but I couldn't figure out if they were intentionally generic.

function isEmpty(input) {
  //C null, undefined, and whitespace-only strings are 'empty' //! also objects and arrays
  return !(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].boolean.test(input) || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].number.test(input) || //C check for empty and whitespace strings and string conversions of null and undefined
  //TODO //! this will cause issues if a user inputs any combination of these values, ban them at the user input step
  _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.test(input) && input.trim() !== '' && input.trim() !== 'null' && input.trim() !== 'undefined' || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].object.test(input) && Object.keys(input).length > 0 || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].array.test(input) && input.length > 0);
}

; //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝    
// BCRYPT

const saltRounds = 10; // DATABASE

sj.db = _db_js__WEBPACK_IMPORTED_MODULE_2__["default"]; //C for use of db with globals so that db doesn't have to be imported twice
// LIVE DATA

sj.liveData = _live_data_server_js__WEBPACK_IMPORTED_MODULE_3__["default"]; //  ██╗   ██╗████████╗██╗██╗     
//  ██║   ██║╚══██╔══╝██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝ 
// POSTGRES
//? this should be called once on startup, where should this go?

(async () => {
  /*
  	const schema = {
  		name: 'sj',
  		tables: {
  			users: {
  				name: 'users',
  				columns: {
  					id: {
  						name: 'id',
  					},
  					name: {
  						name: 'name',
  					},
  					password: {
  						name: 'password',
  					},
  					email: {
  						name: 'email',
  					},
  					spotifyRefreshToken: {
  						name: 'spotifyRefreshToken',
  					},
  				},
  			},
  		},
  	};
  */
  // initialize
  return sj.db.tx(async function (t) {
    // TODO this will not alter tables if they do already exist (save this for migration)
    // schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
    // constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
    // foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
    // ON DELETE CASCADE also removes any referencing rows when the referenced row is removed
    // TODO CHECK constraint that visibility, source matches possible  states
    // quotes: https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql
    // default constraint names: https://stackoverflow.com/questions/4107915/postgresql-default-constraint-names
    if (false) {} // TODO add self, public, & private VIEWs for tables (if relevant)
    // !!!  remember to add error messages for constraint violations to parsePostgresError() in functions.js
    // !!! column names are camelCase (because they get converted to properties), everything else is underscore


    return t.none(`CREATE SCHEMA IF NOT EXISTS "sj"`).catch(rejected => {
      throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
        log: true,
        origin: 'schema initialization',
        message: 'database error',
        reason: rejected.message,
        content: rejected,
        target: 'notify',
        cssClass: 'notifyError'
      });
    }).then(resolved => {
      // https://www.postgresql.org/docs/9.1/static/sql-createtable.html
      //! spotifyRefreshToken is specifically pascal case to match object property names
      return t.none(`CREATE TABLE IF NOT EXISTS "sj"."users" (
				"id" SERIAL CONSTRAINT "users_id_pkey" PRIMARY KEY,
                "name" text CONSTRAINT "users_name_key" UNIQUE,
                "password" text,
				"email" text CONSTRAINT "users_email_key" UNIQUE,
				"spotifyRefreshToken" text
            );`).catch(rejected => {
        throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: true,
          origin: 'users table initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      //L views: https://www.postgresql.org/docs/8.1/static/tutorial-views.html
      //L create or replace: https://stackoverflow.com/questions/48662843/what-is-the-equivalent-of-create-view-if-not-exists-in-postresql
      return t.none(`CREATE OR REPLACE VIEW "sj"."users_self" AS
                SELECT id, name, email 
                FROM "sj"."users"
            ;`).catch(rejected => {
        throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: true,
          origin: 'users_self initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      return t.none(`CREATE OR REPLACE VIEW "sj"."users_public" AS
                SELECT id, name
                FROM "sj"."users"
            ;`).catch(rejected => {
        throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: true,
          origin: 'users_public initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      return t.none(`CREATE TABLE IF NOT EXISTS "sj"."playlists" (
                "id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
                "userId" integer CONSTRAINT "playlists_userId_fkey" REFERENCES "sj"."users" ON DELETE CASCADE ON UPDATE CASCADE,
                "name" text,
                "visibility" text,
                "description" text,
                "image" text,
                "color" text,
                
                CONSTRAINT "playlists_userId_name_key" UNIQUE ("userId", "name")
            );`).catch(rejected => {
        throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: true,
          origin: 'playlists table initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      return t.none(`CREATE TABLE IF NOT EXISTS "sj"."tracks" (
                "id" SERIAL CONSTRAINT "tracks_id_pkey" PRIMARY KEY,
                "playlistId" integer CONSTRAINT "tracks_playlistId_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE ON UPDATE CASCADE,
                "position" integer,
                "source" text,
                "sourceId" text,
                "name" text,
                "duration" integer,
                "artists" text ARRAY DEFAULT ARRAY[]::text[],

                CONSTRAINT "tracks_playlistId_position_key" UNIQUE ("playlistId", "position") DEFERRABLE INITIALLY IMMEDIATE 
            );`).catch(rejected => {
        throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: true,
          origin: 'tracks table initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).catch(rejected => {
      throw Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"])(rejected);
    });
  }).catch(rejected => {
    throw Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"])(rejected);
  });
})().then(resolved => {
  new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Success"]({
    origin: 'initialize database',
    message: 'database initialized'
  });
}).catch(rejected => {
  console.log(rejected);
}); //   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ 

_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Entity"].augmentClass({
  prototypeProperties: parent => ({
    async add(db) {
      return await this.constructor.add(this, db);
    },

    async get(db) {
      return await this.constructor.get(this, db);
    },

    async edit(db) {
      return await this.constructor.edit(this, db);
    },

    async remove(db) {
      return await this.constructor.remove(this, db);
    }

  }),

  staticProperties(parent) {
    // CRUD METHODS
    this.add = async function (query, db = sj.db) {
      return await this.frame(db, query, 'add');
    };

    this.get = async function (query, db = sj.db) {
      return await this.frame(db, query, 'get');
    };

    this.edit = async function (query, db = sj.db) {
      return await this.frame(db, query, 'edit');
    };

    this.remove = async function (query, db = sj.db) {
      return await this.frame(db, query, 'remove');
    };

    this.getMimic = async function (query, db = sj.db) {
      //C getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in sj.liveData.notify()
      return await this.frame(db, query, 'getMimic');
    }; // FRAME


    this.frame = async function (db, anyEntities, methodName) {
      //C catch Entity
      if (this === _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Entity"]) throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
        origin: 'Entity.[CRUD]',
        reason: `cannot call CRUD method directly on Entity`
      }); //C cast as array

      const entities = Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"])(anyEntities); //C shorthand

      const isGetMimic = methodName === 'getMimic'; //C store getMimic

      if (isGetMimic) methodName = 'get'; //C 'getMimic' === 'get' for functions: [methodName+'Function']

      const isGet = methodName === 'get';
      const accessory = {};
      const after = await db.tx(async t => {
        //C process
        const beforeEntities = await this[methodName + 'Before'](t, entities, accessory); //C validate

        const validatedEntities = await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(beforeEntities, async entity => await this.validate(entity, methodName).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"])); //C prepare

        const preparedEntities = await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(validatedEntities, async entity => await this[methodName + 'Prepare'](t, entity, accessory).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"])); //C accommodate

        const influencedEntities = !isGet ? await this[methodName + 'Accommodate'](t, preparedEntities, accessory).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]) : []; //C map

        const inputMapped = this.mapColumns(preparedEntities);
        const influencedMapped = !isGet ? this.mapColumns(influencedEntities) : []; //C execute SQL for inputs

        const inputBefore = [];
        const inputAfter = isGetMimic ? inputMapped : [];

        if (!isGetMimic) {
          await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(inputMapped, async entity => {
            //C before, ignore add
            if (!isGet && methodName !== 'add') {
              const before = await this.getQuery(t, Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(entity, this.filters.id)).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
              inputBefore.push(...before);
            } //C after, ignore remove (still needs to execute though)


            const after = await this[methodName + 'Query'](t, entity).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
            if (methodName !== 'remove') inputAfter.push(...after);
          }).catch(rejected => {
            throw Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"])(new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["ErrorList"]({ ...this[methodName + 'Error'](),
              content: rejected
            }));
          });
        } //C execute SQL for influenced


        const influencedBefore = [];
        const influencedAfter = [];

        if (!isGet) {
          await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(influencedMapped, async influencedEntity => {
            const before = await this.getQuery(t, Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(influencedEntity, this.filters.id)).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
            influencedBefore.push(...before);
            const after = await this.editQuery(t, influencedEntity).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
            influencedAfter.push(...after);
          }).catch(rejected => {
            throw Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"])(new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["ErrorList"]({ ...this[methodName + 'Error'](),
              content: rejected
            }));
          });
        } //C group for iteration


        const all = [inputBefore, inputAfter, influencedBefore, influencedAfter]; //C unmap

        const unmapped = all.map(list => this.unmapColumns(list)); //C process

        return await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(unmapped, async list => await this[methodName + 'After'](t, list, accessory).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]));
      }).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]); //! finish the transaction here so that notify won't be called before the database has updated
      //C shake for subscriptions with getOut filter

      const shookGet = after.map(list => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"])(list).map(item => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(item, this.filters.getOut))); //C timestamp, used for ignoring duplicate notifications in the case of before and after edits, and overlapping queries

      const timestamp = Date.now(); //C if get, don't notify

      if (!isGet) shookGet.forEach(list => sj.liveData.notify(this, list, timestamp, methodName)); //C if getMimic, return shookGet-after
      else if (isGetMimic) return shookGet[1]; //C shake for return

      const shook = after.map(list => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"])(list).map(item => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(item, this.filters[methodName + 'Out']))); //C rebuild

      const built = shook.map(list => list.map(entity => new this(entity)));
      return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["SuccessList"]({ ...this[methodName + 'Success'](),
        //R content is the inputAfter, for removals this will be an empty array, if in the future some 'undo' functionality is needed consider: returned data should still be filtered by removeOut, and therefore might destroy data if this returned data is used to restore it
        content: built[1],
        timestamp
      });
    }; // FRAME PARTS
    //G all of these parts are dependant on each other (eg. accessory), so it is ok to make assumptions between these functions
    //C processes all before validation


    this.addBefore = this.getBefore = this.editBefore = this.removeBefore = async function (t, entities, accessory) {
      return entities.slice();
    }; //C validates each using Entity.schema


    this.validate = async function (entity, methodName) {
      const validated = {};
      await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(Object.keys(this.schema), async key => {
        const prop = this.schema[key]; //C catches

        if (!(prop.rule instanceof _shared_legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_6__["default"])) {
          // Rule1
          throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
            log: true,
            origin: 'Entity.validate()',
            message: 'validation error',
            reason: `${key}'s rule is not an Rule1`,
            content: prop
          });
        } //C check if optional and not empty, or if required


        if (prop[methodName].check && !isEmpty(entity[key]) || prop[methodName].check === 2) {
          //G the against property can be specified in the schema and then assigned to the entity[againstName] before validation
          const checked = await prop.rule.check(entity[key], entity[prop.against]);
          validated[key] = checked.content;
          return checked;
        } else {
          //C don't pack into validated
          return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Success"]({
            origin: 'Entity.validate()',
            message: `optional ${key} is empty, skipped validation`
          });
        }
      }).catch(rejected => {
        throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["ErrorList"]({
          origin: 'Entity.validate()',
          message: 'one or more issues with properties',
          reason: 'validating properties returned one or more errors',
          content: rejected
        });
      });
      return validated;
    }; //C modifies each after validation


    this.addPrepare = this.getPrepare = this.editPrepare = this.removePrepare = async function (t, entity, accessory) {
      return Object.assign({}, entity);
    }; //C modifies input entities, returns other influenced entities. checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities


    this.addAccommodate = this.getAccommodate = this.editAccommodate = this.removeAccommodate = async function (t, entities, accessory) {
      return [];
    }; //C maps js property names to database column names


    this.mapColumns = function (entities) {
      //C switches entities' js named keys for column named keys based on schema
      return entities.map(entity => {
        //C for each entity
        let mappedEntity = {};
        Object.keys(entity).forEach(key => {
          //C for each property
          if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].object.test(this.schema[key]) && _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.test(this.schema[key].columnName)) {
            //C if schema has property 
            mappedEntity[this.schema[key].columnName] = entity[key]; //C set mappedEntity[columnName] as property value
          } else {
            console.warn(`Entity.mapColumns() - property ${key} in entity not found in schema`);
          }
        });
        return mappedEntity;
      });
    };

    this.unmapColumns = function (mappedEntities) {
      //C inverse of mapColumns()
      return mappedEntities.map(mappedEntity => {
        //C for each entity
        let entity = {};
        Object.keys(mappedEntity).forEach(columnName => {
          //C for each columnName
          let key = Object.keys(this.schema).find(key => this.schema[key].columnName === columnName); //C find key in schema with same columnName

          if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.test(key)) {
            //C set entity[key] as value of mappedEntity[columnName]
            entity[key] = mappedEntity[columnName];
          } else {
            console.warn(`Entity.unmapColumns() - column ${columnName} in mappedEntity not found in schema`);
          }
        });
        return entity;
      });
    }; //! this should be overwritten with different ORDER BY columns


    this.queryOrder = `ORDER BY "id" ASC`; //C executes SQL queries

    this.addQuery = async function (t, mappedEntity) {
      let values = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_11__["buildValues"])(mappedEntity); //? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
      //L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text

      let row = await t.one(`
				INSERT INTO "sj"."${this.table}" 
				$1:raw 
				RETURNING *
			`, [values]).catch(rejected => {
        throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: false,
          origin: `sj.${this.name}.add()`,
          message: `could not add ${this.name}s`
        }));
      });
      return row;
    };

    this.getQuery = async function (t, mappedEntity) {
      let where = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_11__["buildWhere"])(mappedEntity);
      let rows = await t.any(`
				SELECT * 
				FROM "sj"."${this.table}" 
				WHERE $1:raw
				${this.queryOrder}
			`, [where]).catch(rejected => {
        throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: false,
          origin: `sj.${this.name}.get()`,
          message: `could not get ${this.name}s`
        }));
      });
      return rows;
    };

    this.editQuery = async function (t, mappedEntity) {
      let {
        id,
        ...mappedEntitySet
      } = mappedEntity;
      let set = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_11__["buildSet"])(mappedEntitySet);
      let where = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_11__["buildWhere"])({
        id
      });
      let row = await t.one(`
				UPDATE "sj"."${this.table}" 
				SET $1:raw 
				WHERE $2:raw 
				RETURNING *
			`, [set, where]).catch(rejected => {
        throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: false,
          origin: `sj.${this.name}.edit()`,
          message: `could not edit ${this.names}`
        }));
      });
      return row;
    };

    this.removeQuery = async function (t, mappedEntity) {
      let where = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_11__["buildWhere"])(mappedEntity);
      let row = await t.one(`
				DELETE FROM "sj"."${this.table}" 
				WHERE $1:raw 
				RETURNING *
			`, where).catch(rejected => {
        throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: false,
          origin: `sj.${this.name}.remove()`,
          message: `could not remove ${this.names}s`
        }));
      });
      return row;
    }; //C processes all after execution


    this.addAfter = this.getAfter = this.editAfter = this.removeAfter = async function (t, entities, accessory) {
      return entities.slice();
    }; //C custom SuccessList and ErrorList


    this.addSuccess = function () {
      return {
        origin: `sj.${this.name}.add()`,
        message: `added ${this.name}s`
      };
    };

    this.getSuccess = function () {
      return {
        origin: `sj.${this.name}.get()`,
        message: `retrieved ${this.name}s`
      };
    };

    this.editSuccess = function () {
      return {
        origin: `sj.${this.name}.edit()`,
        message: `edited ${this.name}s`
      };
    };

    this.removeSuccess = function () {
      return {
        origin: `sj.${this.name}.get()`,
        message: `removed ${this.name}s`
      };
    };

    this.addError = function () {
      return {
        origin: `sj.${this.name}.add()`,
        message: `failed to add ${this.name}s`
      };
    };

    this.getError = function () {
      return {
        origin: `sj.${this.name}.get()`,
        message: `failed to retrieve ${this.name}s`
      };
    };

    this.editError = function () {
      return {
        origin: `sj.${this.name}.edit()`,
        message: `failed to edit ${this.name}s`
      };
    };

    this.removeError = function () {
      return {
        origin: `sj.${this.name}.remove()`,
        message: `failed to remove ${this.name}s`
      };
    };
  }

});
_shared_source_js__WEBPACK_IMPORTED_MODULE_7__["default"].augmentClass({
  constructorProperties: parent => ({
    defaults: {
      serverTestProp: null
    }
  })
}); //  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ 

_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["User"].augmentClass({
  staticProperties(parent) {
    // CRUD
    this.addPrepare = this.editPrepare = async function (t, user) {
      let newUser = Object.assign([], user); //C hash password
      //TODO might be a vulnerability here with this string check

      if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.test(newUser.password)) {
        newUser.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.hash(newUser.password, saltRounds).catch(rejected => {
          throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
            log: true,
            origin: 'User.add()',
            message: 'failed to add user',
            reason: 'hash failed',
            content: rejected
          });
        });
      }

      return newUser;
    };

    this.queryOrder = 'ORDER BY "id" ASC';
  }

}); //  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝    

_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Playlist"].augmentClass({
  staticProperties: parent => ({
    // CRUD
    queryOrder: 'ORDER BY "userId" ASC, "id" ASC'
  })
}); //  ████████╗██████╗  █████╗  ██████╗██╗  ██╗
//  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//     ██║   ██████╔╝███████║██║     █████╔╝ 
//     ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
//     ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ 

_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Track"].augmentClass({
  prototypeProperties(parent) {
    this.order = async function (db = sj.db) {
      return await this.constructor.order(db, Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"])(this));
    };
  },

  staticProperties(parent) {
    // CRUD
    this.addBefore = this.getBefore = this.editBefore = this.removeBefore = async function (t, entities) {
      let newEntities = entities.slice();
      newEntities.forEach(entity => {
        //TODO Possible issue here where the condition following && could evaluate first. Not sure what the precedense is.
        entity.source = _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].object.test(entity.source) && _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.test(entity.source.name) ? entity.source.name : undefined;
      });
      return newEntities;
    };

    this.addPrepare = async function (t, track) {
      //C set id of tracks to be added as a temporary symbol, so that Track.order() is able to identify tracks
      let newTrack = { ...track,
        id: Symbol()
      };

      if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].integer.test(newTrack.position)) {
        let existingTracks = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Track"].get({
          playlistId: newTrack.playlistId
        }, t).then(result => result.content);
        newTrack.position = existingTracks.length;
      }

      return newTrack;
    };

    this.removePrepare = async function (t, track) {
      //C set position of tracks to be removed as null, so that Track.order() recognizes them as tracks to remove
      return { ...track,
        position: null
      };
    };

    this.queryOrder = 'ORDER BY "playlistId" ASC, "position" ASC';

    this.addAccommodate = this.editAccommodate = this.removeAccommodate = async function (t, tracks) {
      //L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
      //L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
      //L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
      await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
        throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
          log: false,
          origin: 'Track.move()',
          message: 'could not order tracks, database error',
          target: 'notify',
          cssClass: 'notifyError'
        }));
      });
      return await this.order(t, tracks).then(result => result.content).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["default"]);
    };

    this.addAfter = this.getAfter = this.editAfter = this.deleteAfter = async function (t, entities) {
      let newEntities = entities.slice();
      newEntities.forEach(entity => {
        entity.source = _shared_source_js__WEBPACK_IMPORTED_MODULE_7__["default"].instances.find(source => source.name === entity.source);
      });
      return newEntities;
    }; // UTIL


    this.order = async function (db, tracks) {
      //C takes a list of input tracks for an INSERT, UPDATE, or DELETE query
      //! properties should be validated at this point
      //! tracks to be added must have a Symbol() id, this will be removed
      //! tracks to be deleted must have a null position, this will be removed
      //C modifies the input track's positions, if needed
      //C returns a list of influenced tracks with modified positions, if needed
      //C out-of-bounds positions will be repositioned at the start or end of the playlist
      //C duplicate positions will be repositioned in order of input order
      //C in the case of repositioned tracks that still overlap with other input tracks, all will be repositioned in order of input position
      //C filter out tracks
      let inputTracks = tracks.filter(track => //C without an id (including symbol)
      (!isEmpty(track.id) || typeof track.id === 'symbol') && ( //C and without a position (including null) or playlistId
      !isEmpty(track.position) || track.position === null || !isEmpty(track.playlistId))); //C filter out duplicate tracks (by id, keeping last), by filtering for tracks where every track after does not have the same id

      inputTracks = inputTracks.filter((track, index, self) => self.slice(index + 1).every(trackAfter => track.id !== trackAfter.id)); //C return early if none are moving

      if (inputTracks.length === 0) {
        return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["SuccessList"]({
          origin: 'Track.order()',
          message: 'track positions did not need to be set'
        });
      } //console.log('inputTracks.length:', inputTracks.length, '\n ---');


      return await db.tx(async t => {
        const playlists = [];
        const influencedTracks = [];
        const inputIndex = Symbol(); //C retrieve track's playlist, group each track by playlist & moveType

        await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(inputTracks, async (track, index) => {
          const storePlaylist = function (playlistId, existingTracks) {
            if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].integer.test(playlistId)) throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
              origin: 'Track.order()',
              reason: `playlistId is not an integer: ${playlistId}`
            });
            if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].array.test(existingTracks)) throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
              origin: 'Track.order()',
              reason: `existingTracks is not an array: ${existingTracks}`
            }); //C stores playlist in playlists if not already stored

            let existingPlaylist = playlists.find(playlist => playlist.id === playlistId);

            if (!existingPlaylist) {
              playlists.push({
                id: playlistId,
                original: existingTracks,
                //C move actions, these have priority positioning
                inputsToMove: [],
                inputsToAdd: [],
                inputsToRemove: []
              });
              existingPlaylist = playlists[playlists.length - 1];
            }

            return existingPlaylist;
          }; //C temporarily store inputIndex on track, this is required as the input order is lost when tracks are grouped by playlist


          track[inputIndex] = index; //C determine move action

          const action = typeof track.id === 'symbol' ? 'Add' : track.position === null ? 'Remove' : 'Move'; //C get current playlist by playlistId if action === 'add', else by track.id using a sub-query
          //L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery

          const currentQuery = action === 'Add' ? _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = $1
					`, track.playlistId) : _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = (
							SELECT "playlistId"
							FROM "sj"."tracks"
							WHERE "id" = $1
						)
					`, track.id);
          const currentPlaylist = await t.any('$1:raw', currentQuery).catch(rejected => {
            throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
              log: false,
              origin: 'Track.order()',
              message: 'could not move tracks'
            }));
          }); //C store

          const currentPlaylistStored = storePlaylist(action === 'Add' ? track.playlistId : currentPlaylist[0].playlistId, currentPlaylist); //! track.playlistId might not be currentPlaylistId
          //C strip playlistId from playlist, this is done so that only modified properties will remain on the track objects

          currentPlaylistStored.original.forEach(t => {
            delete t.playlistId;
          });

          if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].integer.test(track.playlistId) || track.playlistId === currentPlaylistStored.id) {
            //C if not switching playlists
            //C group by action
            currentPlaylistStored['inputsTo' + action].push(track);
          } else {
            //C if switching playlists
            //C this should catch tracks with playlistIds but no position
            const anotherPlaylist = await t.any(`
							SELECT "id", "position", "playlistId"
							FROM "sj"."tracks" 
							WHERE "playlistId" = $1
						`, track.playlistId).catch(rejected => {
              throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_10__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
                log: false,
                origin: 'Track.order()',
                message: 'could not move tracks'
              }));
            });
            const anotherPlaylistStored = storePlaylist(track.playlistId, anotherPlaylist);
            anotherPlaylistStored.original.forEach(t => {
              delete t.playlistId;
            }); //C track is removed from its current playlist, and added to another playlist

            currentPlaylistStored.inputsToRemove.push(track);
            anotherPlaylistStored.inputsToAdd.push(track);
          }

          return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Success"]({
            origin: 'Track.order()',
            message: "retrieved track's playlist"
          });
        }).catch(rejected => {
          throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["ErrorList"]({
            origin: 'Track.order() - movingTracks iterator',
            message: `could not retrieve some track's playlist`,
            content: rejected
          });
        }); //console.log('playlists.length:', playlists.length, '\n ---');
        //C calculate new track positions required to accommodate input tracks' positions

        playlists.forEach(playlist => {
          //C populate others with tracks in original that are not in inputsTo Add, Remove, or Move
          //! inputsToRemove can be ignored from this point on, these tracks aren't included in others and wont be added to the final ordered list
          playlist.others = playlist.original.filter(originalTrack => !playlist.inputsToAdd.some(addingTrack => addingTrack.id === originalTrack.id) && !playlist.inputsToRemove.some(trackToRemove => trackToRemove.id === originalTrack.id) && !playlist.inputsToMove.some(movingTrack => movingTrack.id === originalTrack.id)); //console.log('playlist.others.length:', playlist.others.length);
          //C combine both adding and moving, 

          playlist.inputsToPosition = [...playlist.inputsToAdd, ...playlist.inputsToMove]; //C give tracks with no position an Infinite position so they get added to the bottom of the playlist

          playlist.inputsToPosition.forEach(trackToPosition => {
            if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].number.test(trackToPosition.position)) {
              trackToPosition.position === Infinity;
            }
          }); //C sort

          Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["stableSort"])(playlist.others, (a, b) => a.position - b.position); //C stable sort by inputIndex then position to resolve clashes by position then inputIndex

          Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["stableSort"])(playlist.inputsToPosition, (a, b) => a[inputIndex] - b[inputIndex]);
          Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["stableSort"])(playlist.inputsToPosition, (a, b) => a.position - b.position); //console.log('playlist.inputsToAdd.length:', playlist.inputsToAdd.length);
          //console.log('playlist.inputsToRemove.length:', playlist.inputsToRemove.length);
          //console.log('playlist.inputsToMove.length:', playlist.inputsToMove.length, '\n ---');
          //console.log('playlist.inputsToPosition.length:', playlist.inputsToPosition.length, '\n ---');
          //C inputIndex is no longer needed, remove it from anything it was added to

          playlist.inputsToPosition.forEach(trackToPosition => {
            delete trackToPosition[inputIndex];
          });
          playlist.inputsToRemove.forEach(trackToRemove => {
            delete trackToRemove[inputIndex];
          }); //C populate merged by filling others tracks around combined tracks

          playlist.merged = []; //! these are copies that will be emptied below

          playlist.inputsToPositionCopy = [...playlist.inputsToPosition];
          playlist.othersCopy = [...playlist.others];
          let i = 0;

          while (playlist.othersCopy.length > 0) {
            if (playlist.inputsToPositionCopy.length > 0 && playlist.inputsToPositionCopy[0].position <= i) {
              //C if the next adding or moving track's position is at (or before, in the case of a duplicated position) the current index, transfer it to the merged list
              //C this will properly handle negative and duplicate positions
              //G shift removes the first item of an array and returns that item
              playlist.merged.push(playlist.inputsToPositionCopy.shift());
            } else {
              //C else - transfer the next others track
              playlist.merged.push(playlist.othersCopy.shift());
            }

            i++;
          } //C push rest of combined tracks
          //R this method was chosen over including combined.length > 0 in the while condition to prevent needless loops caused by ridiculously high positions, this was also chosen over original.length because adding + moving tracks could be greater the playlist length
          //L .push() and spread: https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating


          playlist.merged.push(...playlist.inputsToPositionCopy);
          playlist.inputsToPositionCopy.length = 0; //! remove combined tracks for consistent behavior
          //C populate playlist.influenced with all non-input tracks that have moved

          playlist.influenced = playlist.merged.filter((mergedTrack, index) => {
            let inOthers = playlist.others.find(otherTrack => otherTrack.id === mergedTrack.id);
            let influenced = inOthers && index !== inOthers.position; //C assign new positions (inputTracks too)

            mergedTrack.position = index;
            return influenced;
          }); //console.log('playlist.merged.length:', playlist.merged.length);
          //console.log('playlist.merged:\n', playlist.merged, '\n ---');
          //console.log('playlist.influenced.length:', playlist.influenced.length);
          //console.log('playlist.influenced:\n', playlist.influenced, '\n ---');

          influencedTracks.push(...playlist.influenced);
        }); //C remove temporary symbol id from add tracks and null position from delete tracks

        inputTracks.forEach(inputTrack => {
          if (typeof inputTrack.id === 'symbol') {
            delete inputTrack.id;
          }

          if (inputTrack.position === null) {
            delete inputTrack.position;
          }
        });
        return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["SuccessList"]({
          origin: 'Track.order()',
          message: 'influenced tracks calculated',
          content: influencedTracks
        });
      });
      /* Thought Process
      				if any tracks have position set,
      		do the move function
      		order
      	after deleting tracks
      		order
      
      	idea: get the tracklist, then do the moving and ordering outside, at the same time - then update all at once
      	the fetched array won't have holes in it, just the position numbers (which is good?)
      
      	//R initial idea wrong: 
      	tracks must be in order of their positions for the move to be applied properly (ie tracks with positions: 3, 4, 5 will all be inserted inbetween tracks 2 and 3) - updating in the order 5, 4, 3 would result in later tracks pushing the already placed tracks down (so their positions end up being 7, 5, 3)
      	it needs to go in decending order because of the nature of how the move function works - affecting only tracks below it
      
      
      	//R wrong, because this done simultaneously (not in sequence) it will separate adjacent inserted positions (0i, 1i) will insert into a full list (o) as (0i, 0o, 1i, 1o), doing this in sequence would require reordering (updating of new positions) the tracks after each insert (might be resource intensive)
      	get input
      		stable sort by position
      	get tracks
      		stable sort by position
      		prepend item with position -Infinity
      		append item with position Infinity
      
      	for each input (in reverse order, so that inputs with same positions do not get their order reversed)
      		find where position is greater than i.position and less than or equal to i+1.position
      		splice(i+1, 0, input)
      	
      
      	final idea: 
      		get the existing list, remove tracks to be inserted
      		sort each list
      		for the length of the combined lists, for integers 0 to length
      			if there is a track in the input list at (or less than) the index - push the next one
      			else push the next track in the existing list
      		if there are any remaining tracks in the input list (for example a big hole that makes the last few tracks larger than the sum of both lists), push them in order to the end of the list
      		lastly do a order to remove duplicates and holes
      
      		this essentially 'fills' the existing tracks around the set positions of the input tracks
      	
      		for Track.order()
      			there is a recursive loop hazard in here (basically if Track.get() is the function that calls sj.Track.order() - sj.Track.order() itself needs to call sj.Track.get(), therefore a loop), however if everything BUT sj.Track.get() calls sj.Track.order(), then sj.Track.order() can safely call sj.Track.get(), no, the same thing happens with sj.Track.edit() - so just include manual queries, no have it so: sj.Track.get() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.Track.get(), and then have each use their own manual update queries - basically add, edit, remove can use these and sj.Track.get() but not each other - this is written down in that paper chart
      	
      		//R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:
      					//C for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
      		//! requires the INSERT command to be executed one at at a time for each input track
      		//R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks
      */
    };
  }

});
/* harmony default export */ __webpack_exports__["default"] = (sj);

/***/ }),

/***/ "./source/server/index.js":
/*!********************************!*\
  !*** ./source/server/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_environment_variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/environment-variables.js */ "./source/config/environment-variables.js");
/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! minimist */ "minimist");
/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(minimist__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-webpack */ "koa-webpack");
/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_webpack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! koa-session */ "koa-session");
/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(koa_session__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _global_server_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global-server.js */ "./source/server/global-server.js");
/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes.js */ "./source/server/routes.js");
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
 // BUILT-IN
// EXTERNAL


 //L https://github.com/koajs


 //L https://github.com/koajs/bodyparser

 //L https://github.com/koajs/session
//L https://github.com/socketio/socket.io#in-conjunction-with-koa

 //L socket io: https://socket.io/docs/emit-cheatsheet

 //TODO consider changing to the https module?
// INTERNAL
// import { clientOptions, clientIndexFileName } from '../config/webpack.config.js';


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

(async function () {
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
  			const filename = path.resolve(config.output.path, clientIndexFileName);
  			ctx.response.type = 'html';
  			ctx.response.body = koaWebpackMiddleware.devMiddleware.fileSystem.createReadStream(filename);
  		};
  	}
  */

  const router = Object(_routes_js__WEBPACK_IMPORTED_MODULE_9__["default"])(routerOptions);
  const PORT = process.env.PORT || 3000; // KOA

  const app = new koa__WEBPACK_IMPORTED_MODULE_2___default.a();
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
    renew: false
  }; //L https://github.com/socketio/socket.io#in-conjunction-with-koa

  const server = http__WEBPACK_IMPORTED_MODULE_7___default.a.createServer(app.callback()); // SOCKET IO

  const socketIO = new socket_io__WEBPACK_IMPORTED_MODULE_6___default.a(server);
  _global_server_js__WEBPACK_IMPORTED_MODULE_8__["default"].liveData.socket = socketIO.of('/live-data'); //  ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
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

  app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default()()); // SESSION

  app.use(koa_session__WEBPACK_IMPORTED_MODULE_5___default()(sessionConfig, app));
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

  app.use(router.routes()); //L https://github.com/alexmingoia/koa-router#routerallowedmethodsoptions--function

  app.use(router.allowedMethods()); // LIVE DATA

  _global_server_js__WEBPACK_IMPORTED_MODULE_8__["default"].liveData.start({
    app,
    socket: socketIO.of('/live-data')
  }); //  ██╗     ██╗███████╗████████╗███████╗███╗   ██╗
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
  }); //L unhandled errors: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, '\n Reason:', reason); //TODO handle
  });
})();

/***/ }),

/***/ "./source/server/live-data-server.js":
/*!*******************************************!*\
  !*** ./source/server/live-data-server.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fclone */ "fclone");
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fclone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utility/object/deep-compare.js */ "./source/shared/utility/object/deep-compare.js");
/* harmony import */ var _shared_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/legacy-classes/error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");
/* harmony import */ var _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/entities/index.js */ "./source/shared/entities/index.js");
/* harmony import */ var _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/live-data.js */ "./source/shared/live-data.js");
/* harmony import */ var _shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/is-instance-of.js */ "./source/shared/is-instance-of.js");
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// EXTERNAL
 //TODO consider changing to the https module?

 // INTERNAL







 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   
//TODO there is a stack overflow error here somewhere, recursive loop?, usually lead by this error: 'no subscriber found for this user'
// when refreshing the playlist page, all the lists will subscribe fine, until at some point unsubscribe is called (for an empty query [ {} ] , or maybe could be anything) upon which no subscriber is called, and the thing goes to a 'RangeError: Maximum call stack size exceeded' error
//TODO this may be unrelated but it seems the liveQueries here are also piling up
//TODO It seems like many subscriptions are being called but not as many un-subscriptions.
//TODO sockets need better error handling just like the koa router

_shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["Subscription"].augmentClass({
  constructorParts: parent => ({
    defaults: {
      user: null
    }
  })
});
/* harmony default export */ __webpack_exports__["default"] = ({
  app: null,
  socket: null,
  tables: _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveTable"].makeTables(),

  start({
    app,
    socket
  }) {
    this.app = app;
    this.socket = socket;
    this.socket.use((socket, next) => {
      //C give the cookie session to the socket
      //C uses a temporary koa context to decrypt the session
      //L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
      //L https://github.com/koajs/session/issues/53#issuecomment-311601304
      //!//? socket.session is static, whereas koa ctx.session is dynamic, that is I'm not sure that this is linked in any way to the cookie session
      //L https://socket.io/docs/server-api/#namespace-use-fn
      socket.session = this.app.createContext(socket.request, new http__WEBPACK_IMPORTED_MODULE_0___default.a.OutgoingMessage()).session;
      next();
    });
    this.socket.on('connect', socket => {
      console.log('CONNECT', socket.id); //C if user is logged in, give the socketId to the session
      //! I don't think the cookie session receives this, though it isn't needed there so far

      if (Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(socket.session.user, _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"], 'User')) socket.session.user.socketId = socket.id;
      socket.on('disconnect', async reason => {
        console.log('DISCONNECT', socket.id);
        await this.disconnect(socket.id).catch(rejected => {
          //TODO handle better
          if (Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(rejected, _shared_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_3__["default"], 'Base')) rejected.announce();else console.error('subscription disconnect error:', rejected);
        }); //? socket won't be used anymore, so does anything really need to be deleted here?

        if (Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(socket.session.user, _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"], 'User')) socket.session.user.socketId = _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"].defaults.socketId;
      });
      socket.on('subscribe', async ({
        table,
        query
      }, callback) => {
        console.log('SUBSCRIBE', socket.id); //C if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
        //TODO socketId validator, this is all that really matters here

        const user = Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(socket.session.user, _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"], 'User') ? socket.session.user : new _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"]({
          socketId: socket.id
        }); //! using Entity.tableToEntity(table) instead of just a table string so that the function can basically function as a validator

        const result = await this.add(_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["Entity"].tableToEntity(table), query, user); //!//G do not send back circular data in the acknowledgment callback, SocketIO will cause a stack overflow
        //L https://www.reddit.com/r/node/comments/8diy81/what_is_rangeerror_maximum_call_stack_size/dxnkpf7?utm_source=share&utm_medium=web2x
        //C using fclone to drop circular references

        callback(fclone__WEBPACK_IMPORTED_MODULE_1___default()(result));
      });
      socket.on('unsubscribe', async ({
        table,
        query
      }, callback) => {
        console.log('UNSUBSCRIBE', socket.id);
        const user = Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(socket.session.user, _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"], 'User') ? socket.session.user : new _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["User"]({
          socketId: socket.id
        });
        const result = await this.remove(_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_6__["Entity"].tableToEntity(table), query, user);
        callback(fclone__WEBPACK_IMPORTED_MODULE_1___default()(result));
      });
      socket.on('error', reason => {
        console.error('ERROR', socket.id, reason);
      });
    });
  },

  findTable(Entity) {
    return this.tables.get(Entity);
  },

  findLiveQuery(table, query) {
    return table.liveQueries.find(liveQuery => Object(_shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["default"])(query, liveQuery.query, {
      compareFunction: _shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["compareUnorderedArrays"]
    }));
  },

  findSubscription(liveQuery, user) {
    return liveQuery.subscriptions.find(subscription => subscription.user.socketId === user.socketId);
  },

  //C subscribers/users are identified by their socketId, this is so that not-logged-in clients can still subscribe to data, while still allowing the full user object to be the subscriber
  async add(Entity, query, user) {
    //C process query
    //TODO//? getMimic was being called with this query: [{playlistId: null}], twice, very rapidly, however even though they are the same query, the one called second resolves before the first one, why? afaik this isn't causing any issues, but it could later
    const processedQuery = await Entity.getMimic(query); //C find table

    const table = this.findTable(Entity);
    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(table, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveTable"], 'LiveTable')) throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
      origin: 'sj.liveData.add()',
      reason: 'table is not an LiveTable'
    }); //C find liveQuery, add if it doesn't exist

    let liveQuery = this.findLiveQuery(table, processedQuery);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(liveQuery, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveQuery"], 'LiveQuery')) {
      liveQuery = new _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveQuery"]({
        table,
        query: processedQuery
      });
      this.findTable(Entity).liveQueries.push(liveQuery);
    } //C find subscription, add if it doesn't exist


    let subscription = this.findSubscription(liveQuery, user);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(subscription, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["Subscription"], 'Subscription')) {
      subscription = new _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["Subscription"]({
        liveQuery,
        user
      });
      liveQuery.subscriptions.push(subscription);
    } //C update user


    Object.assign(subscription.user, user);
    return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Success"]({
      origin: 'sj.addSubscriber()',
      message: 'added subscriber',
      content: processedQuery
    });
  },

  async remove(Entity, query, user) {
    //? if the client unsubscribes on the client-side but is unable to unsubscribe on the server-side, the subscription will sit there (and send messages) until the client disconnects, is this ok? maybe consider a timeout system?
    //C process query
    const processedQuery = await Entity.getMimic(query); //C find table

    const table = this.findTable(Entity);
    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(table, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveTable"], 'LiveTable')) throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
      origin: 'sj.liveData.remove()',
      reason: 'table is not an LiveTable'
    }); //C find liveQuery index

    const liveQuery = this.findLiveQuery(table, processedQuery);
    const liveQueryIndex = this.findTable(Entity).liveQueries.indexOf(liveQuery);
    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(liveQuery, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveQuery"], 'LiveQuery') || liveQueryIndex < 0) return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Warn"]({
      origin: 'Subscriptions.remove()',
      message: 'no subscription found for this query',
      content: {
        Entity,
        query: processedQuery,
        liveQueryIndex
      }
    }); //C find subscription

    const subscription = this.findSubscription(liveQuery, user);
    const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);
    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(subscription, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["Subscription"], 'Subscription') || subscriptionIndex < 0) return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Warn"]({
      origin: 'Subscriptions.remove()',
      message: 'no subscriber found for this user',
      content: {
        liveQuerySubscriptions: liveQuery.subscriptions,
        socketId: user.socketId,
        subscriptionIndex
      }
    }); //C remove subscription

    liveQuery.subscriptions.splice(subscriptionIndex, 1); //C if no more subscriptions, remove liveQuery

    if (liveQuery.subscriptions.length <= 0) {
      this.findTable(Entity).liveQueries.splice(liveQueryIndex, 1);
    }

    return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_5__["Success"]({
      origin: 'sj.removeSubscriber()',
      message: 'removed subscriber',
      content: processedQuery
    });
  },

  async notify(Entity, entities, timestamp) {
    //C for each liveQuery
    const table = this.findTable(Entity);
    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_8__["default"])(table, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_7__["LiveTable"], 'LiveTable')) throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_4__["Err"]({
      origin: 'sj.liveData.notify()',
      reason: 'table is not an LiveTable'
    });

    for (const liveQuery of table.liveQueries) {
      //C for each passed entity
      for (const entity of entities) {
        //C if any part of the liveQuery.query matches the entity as a subset && if the notification timestamp is new
        //R query is an array of object queries, must iterate each then subset match, or else nothing will match because query switches from superset to subset
        if (liveQuery.query.some(part => Object(_shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["default"])(part, entity, {
          compareFunction: _shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["compareUnorderedArrays"],
          subset: true,
          resultIfTooDeep: true
        })) && timestamp > liveQuery.timestamp) {
          //C set the new timestamp
          liveQuery.timestamp = timestamp; //C for each subscription

          for (const subscription of liveQuery.subscriptions) {
            //C emit a socket notification to the subscriber
            this.socket.to(subscription.user.socketId).emit('notify', {
              table: Entity.table,
              query: liveQuery.query,
              timestamp
            });
          }
        }
      }
    }
  },

  async disconnect(socketId) {
    //? unsubscribe all on disconnect and resubscribe all on connect? or have a timeout system?
    //! this doesn't use the remove() method, because the specific subscription (query + user) aren't known, this finds all subscriptions with that user
    for (const pair of this.tables) {
      const table = pair[1];

      for (let i = table.liveQueries.length - 1; i > -1; i--) {
        const liveQuery = table.liveQueries[i]; //C for each subscription

        for (let j = liveQuery.subscriptions.length - 1; j > -1; j--) {
          const subscription = liveQuery.subscriptions[j]; //C if it matches the passed user (by socketId), remove it

          if (subscription.user.socketId === socketId) {
            liveQuery.subscriptions.splice(j, 1);
          }
        } //C if the liveQuery no longer has any subscriptions, remove it


        if (liveQuery.subscriptions.length <= 0) table.liveQueries.splice(i, 1);
      }
    }
  }

});
/* //TODO test:
	no duplicate live queries
	subscriptions get removed on disconnect
	single refreshed liveQuery only ever has one subscription (user)
*/

/***/ }),

/***/ "./source/server/parse-postgres-error.js":
/*!***********************************************!*\
  !*** ./source/server/parse-postgres-error.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parsePostgresError; });
function parsePostgresError(pgError, sjError) {
  //TODO any validation needed here?
  //TODO consider separating insertion checks into Conditions so multiple parameters are checked
  //TODO add targets and cssClasses to each violation case too
  sjError.code = pgError.code;
  sjError.reason = pgError.message;
  sjError.content = pgError; // https://www.postgresql.org/docs/9.6/static/errcodes-appendix.html
  // Class 23 — Integrity Constraint Violation

  if (pgError.code === '23505') {
    // unique_violation
    // users
    if (pgError.constraint === 'users_name_key') {
      sjError.message = 'this user name is already taken';
    }

    if (pgError.constraint === 'users_email_key') {
      sjError.message = 'this email is already in use';
    } // playlists


    if (pgError.constraint === 'playlists_userId_name_key') {
      sjError.message = 'you already have a playlist with this name';
    } // tracks


    if (pgError.constraint === 'tracks_position_key') {
      sjError.message = 'a track already exists at this position';
    }
  }

  if (pgError.code === '23503') {
    // foreign_key_violation
    // playlists
    if (pgError.constraint === 'playlists_userId_fkey') {
      sjError.message = 'cannot add a playlist for an unknown user';
    } // tracks


    if (pgError.constraint === 'tracks_playlistId_fkey') {
      sjError.message = 'cannot add a track for an unknown playlist';
    }
  }

  sjError.announce();
  return sjError;
}
;

/***/ }),

/***/ "./source/server/routes.js":
/*!*********************************!*\
  !*** ./source/server/routes.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-send */ "koa-send");
/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_send__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../node-utility/source-path.cjs */ "./source/node-utility/source-path.cjs");
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config_project_paths_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config/project-paths.js */ "./source/config/project-paths.js");
/* harmony import */ var _global_server_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global-server.js */ "./source/server/global-server.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth.js */ "./source/server/auth.js");
/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/constants.js */ "./source/shared/constants.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/legacy-classes/error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");
/* harmony import */ var _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../shared/entities/index.js */ "./source/shared/entities/index.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _server_session_methods_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../server/session-methods.js */ "./source/server/session-methods.js");
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


	//G all methods (except get) should pass parameters as their respective sj.Base 
	//G get uses name as the identifier, TODO but should also accept id in the future

	node module.exports (unused, switched to ES Modules)
	//L https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
	exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=

	//R use query parameters for api get requests where multiple params may be needed or optional, use the single path parameters for page get requests where we're looking for a simple unique route
*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
	consider using a separate router for source-api requests (sourceRouter)

	error converting Track() to JSON because of circular reference

	Create lint rule to not call next() without await: await next().
		This was causing requests to return early and 404 all the time.
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// BUILT-IN

 // EXTERNAL

 //L https://github.com/alexmingoia/koa-router

 //L https://github.com/koajs/send
// INTERNAL





 //! side-effects







 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

/* harmony default export */ __webpack_exports__["default"] = (function ({
  replaceIndex
}) {
  // path
  //L make own __dirname since it isn't exposed in modules: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
  //L remove 'file:///' because it messes up the parsing and creates 'C:/C:/': https://github.com/tc39/proposal-import-meta/issues/13
  //TODO there has to be a cleaner way of doing this (especially the replace manipulation)
  //R this was needed when running raw modules as __dirname was not accessible, however webpack now handles that
  // const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);
  const root = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_5___default()('../build/client');
  const app = `/${_config_project_paths_js__WEBPACK_IMPORTED_MODULE_6__["clientIndexFileName"]}`; // router

  const router = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a();
  const apiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a(); //   █████╗ ██████╗ ██╗
  //  ██╔══██╗██╔══██╗██║
  //  ███████║██████╔╝██║
  //  ██╔══██║██╔═══╝ ██║
  //  ██║  ██║██║     ██║
  //  ╚═╝  ╚═╝╚═╝     ╚═╝
  //TODO consider putting .catch(returnPropagate) as a middleware?

  /*
  	let listenerList = [
  	];
  
  	async function addListener(depth) {
  		//TODO this is a mess, there has to be a much better way to do this
  
  		//C stop recursion if 10 layers deep
  		depth = depth || 0;
  		if (depth >= 10) {
  			throw new Err({
  				log: true,
  				origin: 'addListener()',
  				message: 'could not handle request, timeout error',
  				reason: 'addListener timeout',
  			});
  		}
  
  		let f = Math.random();
  
  		if (listeners.indexOf(f) !== -1) {
  			f = await addListener(depth+1); //! recursive call
  		}
  
  		if (depth === 0) {
  			listeners.push(f);
  		}
  
  		return f;
  	}
  */
  //TODO This routing file is in need of some refactoring.
  // Instead of using .catch(returnPropagate) on everything, a middleware should be written for it.
  //! Be aware, the first time this was tried it caused issues with liveQueries not working.
  // server-side data & processing requests

  apiRouter.get('/*', async (ctx, next) => {
    // Set GET request bodies as the parsed body parameter (if it exists).
    const queryBody = ctx.request.query[_shared_constants_js__WEBPACK_IMPORTED_MODULE_9__["GET_BODY"]];

    try {
      ctx.request.body = queryBody === undefined ? {} : JSON.parse(queryBody);
    } catch (error) {
      ctx.response.body = 400;
      ctx.response.body = new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_10__["ParseError"]({
        message: error.message,
        userMessage: 'Request failed due to an internal error.',
        input: queryBody
      });
    }

    await next();
  }).post('/log', async (ctx, next) => {
    ctx.response.body = new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_12__["Success"]({
      origin: 'routes.js /log POST',
      message: 'received client log message'
    });
  }) // auth
  .get('/spotify/authRequestStart', async (ctx, next) => {
    //C retrieves an auth request URL and it's respective local key (for event handling)
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].spotify.startAuthRequest().catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get('/spotify/authRedirect', async (ctx, next) => {
    //C receives credentials sent from spotify, emits an event & payload that can then be sent back to the original client
    //! this URL is sensitive to the url given to spotify developer site (i think)
    await _global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].spotify.receiveAuthRequest(ctx.request.query).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
    await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, app, {
      root: root
    });
  }).post('/spotify/authRequestEnd', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].spotify.endAuthRequest(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).post('/spotify/exchangeToken', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].spotify.exchangeToken(ctx, ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get('/spotify/refreshToken', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].spotify.refreshToken(ctx).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get('/youtube/credentials', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].youtube.getCredentials().catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }) // session
  //R //L login/logout are create/remove for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
  //? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
  .post('/session', async (ctx, next) => {
    ctx.response.body = await _server_session_methods_js__WEBPACK_IMPORTED_MODULE_15__["login"](_global_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].db, ctx, ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get('/session', async (ctx, next) => {
    //R thought about moving this to user, but with 'self' permissions, but if its a me request, the user specifically needs to know who they are - in get user cases, the user already knows what they're searching for an just needs the rest of the information
    ctx.response.body = await _server_session_methods_js__WEBPACK_IMPORTED_MODULE_15__["get"](ctx).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).delete('/session', async (ctx, next) => {
    ctx.response.body = await _server_session_methods_js__WEBPACK_IMPORTED_MODULE_15__["logout"](ctx).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }) //TODO condense this
  // user
  .post(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].add(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].get(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).patch(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].edit(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).delete(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["User"].remove(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }) // playlist
  .post(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].add(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].get(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).patch(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].edit(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).delete(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Playlist"].remove(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }) // track
  .post(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].add(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).get(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].get(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).patch(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].edit(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }).delete(`/${_shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].table}`, async (ctx, next) => {
    ctx.response.body = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_13__["Track"].remove(ctx.request.body).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_14__["returnPropagate"]);
  }) // catch
  .all('/*', async (ctx, next) => {
    ctx.response.body = new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_11__["Err"]({
      log: true,
      origin: 'apiRouter',
      message: 'could not process request',
      reason: 'invalid api command',
      content: ctx.request.body
    });
  }); //L nested routers: https://github.com/alexmingoia/koa-router#nested-routers

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods()); //  ██████╗  █████╗  ██████╗ ███████╗
  //  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
  //  ██████╔╝███████║██║  ███╗█████╗  
  //  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
  //  ██║     ██║  ██║╚██████╔╝███████╗
  //  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

  router.get('/*', async (ctx, next) => {
    /*
    	//C pages are accessed through the base GET method, serve any public files here
    	//! static resource references in index.html should be absolute '/foo', not relative './foo'
    			//! "Note: To deploy .mjs on the web, your web server needs to be configured to serve files with this extension using the appropriate Content-Type: text/javascript header"
    	//L https://developers.google.com/web/fundamentals/primers/modules
    			//TODO //! errors thrown here aren't caught - fix this here and everywhere else
    */
    //L temporarily ignore favicon request: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
    if (ctx.request.path === '/favicon.ico') {
      ctx.response.status = 204;
      return; //TODO add it and remove this block
    } //C serve resources


    if (fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(root, ctx.request.path)) && ctx.request.path.indexOf('.') >= 0) {
      await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, ctx.request.path, {
        root: root
      });
      return; //TODO find a better way to differentiate a valid file from a just a valid path (other than indexOf('.'))
      //TODO webpack might have a better way to identify static resources
    } //C redirect if not logged in


    if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_4__["rules"].populatedObject.test(ctx.session.user) && ctx.request.path !== '/login' && ctx.request.path !== '/database') {
      //TODO this should use sj.isLoggedIn, though that isn't perfect yet and it's async
      ctx.request.path = '/'; //! ctx.redirect() will not redirect if ctx.request.path is anything but '/', no idea why

      ctx.redirect('/login');
      return;
    }
    /* webpack-dev-middleware
    	if (replaceIndex !== undefined) {
    		replaceIndex(ctx);
    	} 
    	else {
    */
    //C otherwise always return the index.js file, this is the root app and vue will handle the routing client-side
    //L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations


    await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, app, {
      root: root
    });
  }).all('/*', async (ctx, next) => {
    ctx.body = ctx.body + '.all /* reached'; //G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
  });
  return router;
});
;

/***/ }),

/***/ "./source/server/session-methods.js":
/*!******************************************!*\
  !*** ./source/server/session-methods.js ***!
  \******************************************/
/*! exports provided: login, get, logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/entities/index.js */ "./source/shared/entities/index.js");
/* harmony import */ var _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/legacy-classes/error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");
/* harmony import */ var _parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse-postgres-error.js */ "./source/server/parse-postgres-error.js");
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
// EXTERNAL
 // INTERNAL





 // CREATE

async function login(db, ctx, user) {
  //C validate
  user.name = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"].schema.name.rule.check(user.name).then(result => result.content);
  user.password = await _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"].schema.password.rule.check(user.password).then(result => result.content); //! this will error on stuff like 'password must be over x characters long' when really it should just be 'password incorrect', maybe just have a string check rule?
  //C get password

  let existingPassword = await db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).then(resolved => {
    return resolved.password;
  }).catch(rejected => {
    throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_4__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_2__["Err"]({
      log: false,
      origin: 'login()',
      message: 'could not login, database error'
    }));
  }); //C check password

  let isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.compare(user.password, existingPassword).catch(rejected => {
    throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_2__["Err"]({
      log: true,
      origin: 'login()',
      message: 'server error',
      reason: 'hash compare failed',
      content: rejected,
      target: 'loginPassword',
      cssClass: 'inputError'
    });
  });

  if (!isMatch) {
    throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_2__["Err"]({
      log: true,
      origin: 'login()',
      message: 'incorrect password',
      target: 'loginPassword',
      cssClass: 'inputError'
    });
  } //C get user


  user = await db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', user.name).catch(rejected => {
    throw Object(_parse_postgres_error_js__WEBPACK_IMPORTED_MODULE_4__["default"])(rejected, new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_2__["Err"]({
      log: false,
      origin: 'login()',
      message: 'could not login, database error'
    }));
  });
  ctx.session.user = new _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"](user);
  return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_3__["Success"]({
    origin: 'login()',
    message: 'user logged in',
    content: ctx.session.user
  });
}
; // READ

async function get(ctx) {
  await isLoggedIn(ctx).catch(rejected => {
    //TODO Temporary until route error handling can be reworked.
    console.log('Error in server api session.get()', rejected);
  });
  return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_3__["Success"]({
    origin: 'getMe()',
    content: ctx.session.user
  });
}
; // UPDATE
//?
// DELETE

async function logout(ctx) {
  delete ctx.session.user;
  return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_3__["Success"]({
    origin: 'logout()',
    message: 'user logged out'
  });
}
;

async function isLoggedIn(ctx) {
  if (!(ctx.session.user instanceof _shared_entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"] || ctx.session.user.constructorName === 'User') || !_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_5__["rules"].integer.test(ctx.session.user.id)) {
    throw new _shared_legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_2__["Err"]({
      log: true,
      origin: 'isLoggedIn()',
      code: 403,
      message: 'you must be logged in to do this',
      reason: 'user is not logged in',
      target: 'notify',
      cssClass: 'notifyError' // TODO consider denial error rather than error error (you messed up vs I messed up)

    });
  } //C redundancy check to make sure id is right format


  _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_5__["rules"].integer.validate(ctx.session.user.id); //TODO this doesn't check if the user exists however, though wouldn't this be expensive? searching the database every time the user wants to know if they're logged in, (every page)

  return new _shared_legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_3__["Success"]({
    origin: 'isLoggedIn()',
    message: 'user is logged in'
  });
}

;

/***/ }),

/***/ "./source/shared/constants.js":
/*!************************************!*\
  !*** ./source/shared/constants.js ***!
  \************************************/
/*! exports provided: SERVER_URL, API_URL, JSON_HEADER, URL_HEADER, GET_BODY, APP_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_URL", function() { return SERVER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON_HEADER", function() { return JSON_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_HEADER", function() { return URL_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_BODY", function() { return GET_BODY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_NAME", function() { return APP_NAME; });
const SERVER_URL = `http://localhost:3000`;
const API_URL = `${SERVER_URL}/api`;
const JSON_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});
const URL_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
});
const GET_BODY = encodeURIComponent('body');
const APP_NAME = 'StreamJockey'; // Only used for Spotify player right now.

/***/ }),

/***/ "./source/shared/derived-utility/fetch.js":
/*!************************************************!*\
  !*** ./source/shared/derived-utility/fetch.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Dynamically imports fetch from 'node-fetch' if it is not available.
/* harmony default export */ __webpack_exports__["default"] = (async function (...args) {
  // Must use typeof because it won't throw a reference error. https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
  // Fetch requires
  if (typeof fetch === 'undefined') return Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! node-fetch */ "node-fetch", 7)).then(m => m.default(...args));else return fetch(...args);
});
;

/***/ }),

/***/ "./source/shared/derived-utility/index.js":
/*!************************************************!*\
  !*** ./source/shared/derived-utility/index.js ***!
  \************************************************/
/*! exports provided: fetch, safeStringify, urlRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./source/shared/derived-utility/fetch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return _fetch_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _safe_stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./safe-stringify.js */ "./source/shared/derived-utility/safe-stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safeStringify", function() { return _safe_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url.js */ "./source/shared/derived-utility/url.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlRule", function() { return _url_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./source/shared/derived-utility/safe-stringify.js":
/*!*********************************************************!*\
  !*** ./source/shared/derived-utility/safe-stringify.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fclone */ "fclone");
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fclone__WEBPACK_IMPORTED_MODULE_0__);
//TODO//L Consider: https://www.npmjs.com/package/safe-stable-stringify
//TODO//L Consider: https://www.npmjs.com/package/flatted <--- preserves circular JSON

/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  return JSON.stringify(fclone__WEBPACK_IMPORTED_MODULE_0___default()(value));
});
;

/***/ }),

/***/ "./source/shared/derived-utility/url.js":
/*!**********************************************!*\
  !*** ./source/shared/derived-utility/url.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_validation_rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/validation/rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var valid_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! valid-url */ "valid-url");
/* harmony import */ var valid_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(valid_url__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (new _utility_validation_rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (valid_url__WEBPACK_IMPORTED_MODULE_1___default.a.isWebUri(value) === undefined) {
      throw new Error('Value is not a valid URL');
    }
  }

}));

/***/ }),

/***/ "./source/shared/entities/entity.js":
/*!******************************************!*\
  !*** ./source/shared/entities/entity.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../legacy-classes/error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");



/* harmony default export */ __webpack_exports__["default"] = (_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Entity', _legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_2__["Success"], {
  constructorParts: parent => ({
    afterInitialize(accessory) {
      const that = this; //? is this necessary?

      this.filters = {};
      Object.keys(that.constructor.filters).forEach(key => {
        Object.defineProperties(that.filters, {
          [key]: {
            get: function () {
              return pick(that, that.constructor.filters[key]);
            }
          }
        });
      });
    },

    defaults: {
      // NEW
      id: undefined
    }
  }),

  staticProperties(parent) {
    // GETTER
    Object.defineProperty(this, 'table', {
      get: function () {
        return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
      }
    });
    return {
      //TODO how to make these immutable?
      //C list of references to child classes, these should be added in the child's static constructor
      children: [],
      filters: {
        id: ['id']
      },

      //C automatically create new filters based on schema
      updateFilters() {
        let methodNames = ['add', 'get', 'edit', 'remove'];
        let types = ['in', 'out', 'check'];
        let schemaFilters = {};
        Object.keys(this.schema).forEach(key => {
          //C for each property
          methodNames.forEach(methodName => {
            //C for each crud method
            types.forEach(type => {
              //C for each filter type
              if (this.schema[key][methodName][type]) {
                //C if property is optional or required
                let filterName = methodName + type.charAt(0).toUpperCase() + type.slice(1); //C add it to the specific filter

                if (!schemaFilters[filterName]) schemaFilters[filterName] = [];
                schemaFilters[filterName].push(key);
              }
            });
          });
        });
        this.filters = { ...this.filters,
          ...schemaFilters
        };
      },

      tableToEntity(tableName) {
        //TODO Revaluate this.
        const FoundEntity = this.children.find(child => child.table === tableName);

        if (!(new FoundEntity() instanceof this)) {
          throw new _legacy_classes_error_js__WEBPACK_IMPORTED_MODULE_1__["Err"]({
            origin: 'Entity.tableToEntity()',
            reason: `table is not recognized: ${tableName}`,
            content: tableName
          });
        }

        return FoundEntity; //R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
        //R any metadata (table) should be sent separately (or implicitly) from the query
      }

    };
  }

}));

/***/ }),

/***/ "./source/shared/entities/index.js":
/*!*****************************************!*\
  !*** ./source/shared/entities/index.js ***!
  \*****************************************/
/*! exports provided: Entity, Playlist, Track, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./source/shared/entities/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _playlist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.js */ "./source/shared/entities/playlist.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Playlist", function() { return _playlist_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./track.js */ "./source/shared/entities/track.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return _track_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.js */ "./source/shared/entities/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _user_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/shared/entities/playlist.js":
/*!********************************************!*\
  !*** ./source/shared/entities/playlist.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.js */ "./source/shared/entities/entity.js");
/* harmony import */ var _schema_states_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema-states.js */ "./source/shared/entities/schema-states.js");
/* harmony import */ var _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../legacy-classes/rule1.js */ "./source/shared/legacy-classes/rule1.js");




/* harmony default export */ __webpack_exports__["default"] = (_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Playlist', _entity_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      content: [],
      //? is this required to be an array, tracks aren't stored here anymore
      // NEW
      userId: undefined,
      name: '',
      visibility: '',
      description: '',
      color: '',
      image: ''
    }
  }),

  staticProperties(parent) {
    parent.children.push(this);
    this.schema = {
      id: {
        columnName: 'id',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].id,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["auto"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"]
      },
      userId: {
        columnName: 'userId',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].id,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      name: {
        columnName: 'name',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'playlistNameRules()',
          message: 'name validated',
          target: 'playlistName',
          cssClass: 'inputError',
          valueName: 'Name',
          trim: true,
          min: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].nameMinLength,
          max: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringMaxLength
        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      description: {
        columnName: 'description',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'descriptionRules()',
          message: 'description validated',
          target: 'playlistDescription',
          cssClass: 'inputError',
          valueName: 'Description',
          max: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].bigStringMaxLength,
          trim: true
        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      visibility: {
        columnName: 'visibility',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].visibility,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      image: {
        columnName: 'image',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].image,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      color: {
        columnName: 'color',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].color,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      }
    };
    this.updateFilters();
  }

}));

/***/ }),

/***/ "./source/shared/entities/schema-states.js":
/*!*************************************************!*\
  !*** ./source/shared/entities/schema-states.js ***!
  \*************************************************/
/*! exports provided: unused, optional, required, auto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unused", function() { return unused; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return optional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return auto; });
//TODO Make into class with validated properties.
//TODO//OLD schema property states //TODO could these be static on sj.Entity and called via this.x ?
const unused = {
  in: false,
  out: false,
  check: 0
};
const optional = {
  in: true,
  out: true,
  check: 1
};
const required = {
  in: true,
  out: true,
  check: 2
};
const auto = {
  in: false,
  out: true,
  check: 0
};

/***/ }),

/***/ "./source/shared/entities/track.js":
/*!*****************************************!*\
  !*** ./source/shared/entities/track.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.js */ "./source/shared/entities/entity.js");
/* harmony import */ var _schema_states_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema-states.js */ "./source/shared/entities/schema-states.js");
/* harmony import */ var _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../legacy-classes/rule1.js */ "./source/shared/legacy-classes/rule1.js");
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _source_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../source.js */ "./source/shared/source.js");






/* harmony default export */ __webpack_exports__["default"] = (_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Track', _entity_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  constructorParts: parent => ({
    beforeInitialize(accessory) {
      //C find existing source by track.source.name and set it as the reference
      if (_utility_index_js__WEBPACK_IMPORTED_MODULE_4__["rules"].object.test(accessory.options.source)) {
        const found = _source_js__WEBPACK_IMPORTED_MODULE_5__["default"].instances.find(source => source.name === accessory.options.source.name);
        if (found) accessory.options.source = found;else new Warn({
          origin: 'Track.beforeInitialize()',
          reason: 'source was passed but it is not an existing source',
          content: accessory.options.source
        });
      }

      ;
    },

    defaults: {
      // NEW
      playlistId: null,
      position: null,
      source: null,
      //! before was sj.noSource, but this creates a circular reference error (only sometimes??)
      sourceId: null,
      // TODO assumes ids are unique, even across all sources
      artists: [],
      name: null,
      duration: null,
      //! cannot be 0 or else it will not trigger sj.isEmpty() and will actually be set as 0
      link: null
    }
  }),

  staticProperties(parent) {
    parent.children.push(this);
    this.schema = {
      id: {
        columnName: 'id',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].id,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["auto"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"]
      },
      playlistId: {
        columnName: 'playlistId',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].id,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      position: {
        columnName: 'position',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].posInt,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      name: {
        columnName: 'name',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'trackNameRules()',
          message: 'name validated',
          valueName: 'Name',
          trim: true,
          min: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].nameMinLength,
          max: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringMaxLength
        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      duration: {
        columnName: 'duration',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].posInt,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      source: {
        columnName: 'source',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'sourceRules',
          message: 'source validated',
          valueName: 'Source',
          useAgainst: false,
          //TODO sourceList isn't populated in global.js, but main.js
          custom: function (value) {
            return _source_js__WEBPACK_IMPORTED_MODULE_5__["default"].instances.some(source => value === source.name);
          }
        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      sourceId: {
        columnName: 'sourceId',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'sourceIdRules',
          message: 'source id validated',
          valueName: 'Source ID' //? any source id rules (other than being a string)? length? trim?

        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      artists: {
        columnName: 'artists',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'Rule1s.artists',
          message: 'artists validated',
          valueName: 'Artists',
          dataTypes: ['array']
        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      }
    };
    this.updateFilters(); //G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.

    this.filters.localMetadata = ['id', 'playlistId', 'position'];
  }

}));

/***/ }),

/***/ "./source/shared/entities/user.js":
/*!****************************************!*\
  !*** ./source/shared/entities/user.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.js */ "./source/shared/entities/entity.js");
/* harmony import */ var _schema_states_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema-states.js */ "./source/shared/entities/schema-states.js");
/* harmony import */ var _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../legacy-classes/rule1.js */ "./source/shared/legacy-classes/rule1.js");




/* harmony default export */ __webpack_exports__["default"] = (_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('User', _entity_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  constructorParts: parent => ({
    defaults: {
      // NEW
      name: '',
      email: '',
      password: '',
      password2: '',
      spotifyRefreshToken: null,
      socketId: null
    }
  }),

  staticProperties(parent) {
    parent.children.push(this);
    this.schema = {
      //G 0 = unused, 1 = optional, 2 = required
      id: {
        columnName: 'id',
        rule: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].id,
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["auto"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"]
      },
      name: {
        columnName: 'name',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'userNameRules',
          message: 'username validated',
          target: 'registerUserName',
          cssClass: 'inputError',
          valueName: 'Username',
          trim: true,
          min: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].nameMinLength,
          max: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].nameMaxLength
        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      email: {
        columnName: 'email',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'emailRules',
          message: 'email validated',
          target: 'registerEmail',
          cssClass: 'inputError',
          valueName: 'E-mail',
          trim: true,
          min: 3,
          max: _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"].stringMaxLength //TODO useFilter: ___, filterMessage: ___, 
          //L https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      password: {
        columnName: 'password',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'passwordRules',
          message: 'password validated',
          target: 'registerPassword',
          cssClass: 'inputError',
          valueName: 'Password',
          min: 6,
          max: 72 //! as per bcrypt

        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["required"],
        get: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"],
        edit: {
          in: true,
          out: false,
          check: 1
        },
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      },
      spotifyRefreshToken: {
        columnName: 'spotifyRefreshToken',
        rule: new _legacy_classes_rule1_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          origin: 'spotifyRefreshTokenRules',
          message: 'token validated',
          valueName: 'Token' //TODO empty for now

        }),
        add: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"],
        get: {
          in: false,
          out: true,
          check: 0
        },
        edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["optional"],
        remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_2__["unused"]
      }
    };
    this.updateFilters();
  }

}));

/***/ }),

/***/ "./source/shared/errors/custom-error.js":
/*!**********************************************!*\
  !*** ./source/shared/errors/custom-error.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");

/* harmony default export */ __webpack_exports__["default"] = (_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicClass"].create('CustomError', {
  extends: Error,
  // Extract message from options and pass it properly to Error.
  intercept: ({
    message
  } = {}) => ({
    superArguments: [message]
  }),

  instance({
    // User-readable message.
    // Alternative to the native Error class' 'message' property which should not be exposed to the user by default.
    //!//G sj.Error.message -> CustomError.userMessage, sj.Error.reason => CustomError.message
    userMessage = ''
  } = {}) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].validatedVariable(this, {
      reason: {
        value: userMessage,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate.bind(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string)
      }
    });
  }

}));

/***/ }),

/***/ "./source/shared/errors/http-error.js":
/*!********************************************!*\
  !*** ./source/shared/errors/http-error.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");


/* harmony default export */ __webpack_exports__["default"] = (_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicClass"].create('HTTPError', {
  extends: _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  instance({
    code = 400,
    // HTTPS Response Status Code
    type = 'Bad Request' // Human-readable code name.

  } = {}) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].validatedVariable(this, {
      code: {
        value: code,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].integer.validate.bind(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].integer)
      },
      type: {
        value: type,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate.bind(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string)
      }
    });
  }

}));

/***/ }),

/***/ "./source/shared/errors/index.js":
/*!***************************************!*\
  !*** ./source/shared/errors/index.js ***!
  \***************************************/
/*! exports provided: CustomError, HTTPError, InternalError, ParseError, UnexpectedValueThrown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CustomError", function() { return _custom_error_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _http_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-error.js */ "./source/shared/errors/http-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTTPError", function() { return _http_error_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal-error.js */ "./source/shared/errors/internal-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InternalError", function() { return _internal_error_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _parse_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse-error.js */ "./source/shared/errors/parse-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return _parse_error_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unexpected-value-thrown.js */ "./source/shared/errors/unexpected-value-thrown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnexpectedValueThrown", function() { return _unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./source/shared/errors/internal-error.js":
/*!************************************************!*\
  !*** ./source/shared/errors/internal-error.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
// Used for errors that are caused by internal mistakes in the code. 
// ie. Not the user's fault.


/* harmony default export */ __webpack_exports__["default"] = (_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicClass"].create('InternalError', {
  extends: _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  intercept: ({
    userMessage = 'An internal error has occurred',
    ...rest
  }) => ({
    nextArguments: {
      userMessage,
      ...rest
    }
  })
}));

/***/ }),

/***/ "./source/shared/errors/parse-error.js":
/*!*********************************************!*\
  !*** ./source/shared/errors/parse-error.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");


/* harmony default export */ __webpack_exports__["default"] = (_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicClass"].create('ParseError', {
  extends: _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  instance({
    input
  } = {}) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      input
    });
  }

}));

/***/ }),

/***/ "./source/shared/errors/unexpected-value-thrown.js":
/*!*********************************************************!*\
  !*** ./source/shared/errors/unexpected-value-thrown.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");


/* harmony default export */ __webpack_exports__["default"] = (_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicClass"].create('UnexpectedValueThrown', {
  extends: _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  instance({
    value // The value that was thrown.

  } = {}) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      value
    });
  }

}));

/***/ }),

/***/ "./source/shared/is-instance-of.js":
/*!*****************************************!*\
  !*** ./source/shared/is-instance-of.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//TODO Replace all references to this function with an instanceof or interface test.
/* harmony default export */ __webpack_exports__["default"] = (function (value, Class, className) {
  return value instanceof Class || (value === null || value === void 0 ? void 0 : value.constructorName) === className;
});
;

/***/ }),

/***/ "./source/shared/legacy-classes/base.js":
/*!**********************************************!*\
  !*** ./source/shared/legacy-classes/base.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
//TODO Refactor this out.
//R Common ancestors are bad because they create very tightly coupled code.

/* //R Thought Process
	//R Initially only static methods and variables I decided to define outside the class because static variables requires the use of a getter, which felt hacky.
	//R But when I needed to augment the constructor of a class I ran into problems, so I decided to define classes like this - with an anonymous function being called on a minimal class. It makes the location of instance methods, instance variables, static methods, and static variables more clear. It also makes augmenting (not extending) a class easier (specifically the defaults), this is important for divergent client and server classes.
	//R finally I found that I was repeating some parts of this anonymous function like const parent = Object.getPrototypeOf(this); and return this;, so I decided to make a factory function for all descendants of sj.Base, and a similar augmentation function, this was also done partly so that defaults, instanceMethods, and statics can be laid out with similar hierarchy.
*/
//C manually create sj.Base
//TODO - consider changing all the constructorParts into functions (like static/prototypeProperties) that return an object to be assigned, (I think this may help with the defaults reference issue), but that also still can execute code. Maybe when this is done, then these parts can be brought up to the top level because they will now have their own closure context to process in


class Base {
  constructor(options) {
    //! defaults are retrieved in the function via the static this.constructor.defaults property
    this.constructor.construct.call(this, options);
  }

} //G use makeClass and augmentClass with assignment functions that can manually assign properties via this.x = 'x', and/or return an object that has those properties assigned (may use an arrow function to shorten the syntax). both work the same way, but the manual assignment has is able to do more - make getters, execute 'on create' functionality, create closures for extension, and delete properties (//! don't do this though)
//TODO consider deep defaults


Base.makeClass = function (name, parent, {
  //G may contain functions: beforeInitialize, afterInitialize; boolean: allowUnknown; and object: defaults
  //! anything in here (including stuff that shouldn't be) will overwrite staticProperties 
  constructorParts = parent => ({}),
  //G instance methods
  prototypeProperties = parent => ({}),
  //G static properties & methods
  staticProperties = parent => ({})
}) {
  //C creates a descendant class of Base with easily accessible properties for later augmentation, applies staticProperties, before/afterInitialize, allowUnknown, and defaults to static self and instanceMethods to instance prototype
  // VALIDATE
  if (!(typeof name === 'string')) throw 'Base.makeClass() - cannot make class, name is not a string'; //! don't convert Base to this here, it will break ChildClass.makeClass({'X', Base, {...}})

  if (!(parent === Base || parent.prototype instanceof Base)) throw 'Base.makeClass() - cannot make class, parent is not of type Base'; //C dynamically create class using inferred function names
  //L https://stackoverflow.com/questions/33605775/es6-dynamic-class-names/33611096\
  //G Base descendants pass new static constructorParts to extend from their parent's constructorParts rather than having an extended constructor
  //C the allows Base.construct() to only be called once, which simplifies their 'on create' functionality

  const MadeClass = {
    [name]: class extends parent {
      constructor(options) {
        super(options);
      }

    }
  }[name]; // ASSIGN
  //C use .call to set 'this' as MadeClass, pass parent for ease of use and to avoid repeating Object.getPrototypeOf(this)
  //C undefined properties won't be passed, and parent's will be used when looked up
  //! ensure each part is only called once, as they may also have alternative assignment methods (such as on create functionality and getter/setter assignment)
  //! staticProperties is assigned before constructorParts so that constructorParts will take priority if there are collisions

  Object.assign(MadeClass, staticProperties.call(MadeClass, parent));
  /* //R thoughts on defaults
  	//R my first thought was to have default values that are undefined to be undeclared as well, so that properties the properties won't show up and will be more useful when overwriting another
  	//R I wanted to mimic this behavior with instance options - however, this would be inconsistent when using the spread operator, as it functions like Object.assign
  	//R however I'm now realizing that this would be more consistent and clear
  	//R I thought about doing three different 'defaults' objects, invisible (wont be declared if undefined, ie default undefined), normal, and 'fixed'(?), ones that cannot be changed by options
  	//R but this doesn't seem right, for invisible: when making a new object I should really stay away from using the literal undefined value, and any spread operators used will still function as expected, for fixed, these can just be defaults as they are, because I really shouldn't be overwriting them with options anyways, and they can always be changed later anyways
  */

  Object.assign(MadeClass, {
    //C constructorParts defaults
    //! these require empty defaults because of how construct() works - they are composed together rather than inheriting from the parent
    beforeInitialize() {},

    afterInitialize() {},

    defaults: {} //! allowUnknown DOES inherit from the parent and should not have a default to avoid overwriting the parent's true value with an undefined value defaulted to false

  }, constructorParts.call(MadeClass, parent)); //C instance methods are assigned to the instance.prototype so that new methods aren't created for each instance

  Object.assign(MadeClass.prototype, prototypeProperties.call(MadeClass.prototype, parent)); //? shouldn't the this reference be the parent.prototype?

  return MadeClass;
};

Base.augmentClass = function ({
  constructorParts = parent => ({}),
  prototypeProperties = parent => ({}),
  staticProperties = parent => ({})
}) {
  //C add or overwrite existing properties with new ones
  //G to extend: store old property in a variable not attached to this (a closure) and then compose the new property with it
  //! when not just returning an object for assignment, ensure existing properties aren't being deleted, it goes against what this method should do
  //! make sure each part is ony called once (see makeClass)
  const parent = Object.getPrototypeOf(this);
  Object.assign(this, staticProperties.call(this, parent)); //C don't overwrite defaults, assign them too

  const constructorPartsResult = constructorParts.call(this, parent);

  if (constructorPartsResult instanceof Object) {
    //! Object.assign can handle undefined, but destructuring can't which is why constructorPartsResult needs to be checked
    const {
      defaults = {},
      ...rest
    } = constructorPartsResult;
    Object.assign(this, rest);
    Object.assign(this.defaults, defaults);
  }

  Object.assign(this.prototype, prototypeProperties.call(this.prototype, parent.prototype));
};

Base.defaults = {
  // debug
  log: false,
  // info
  code: 200,
  type: 'Ok',
  origin: '',
  trace: '',
  // //! this traces when the object is created, not where announce is called - this might have to be changed, this on create property could replace origin though
  // content
  message: '',
  reason: '',
  content: {}
};
Base.allowUnknown = false;

Base.afterInitialize = function (accessory) {};

Base.beforeInitialize = function (accessory) {};

Base.trace = function () {
  try {
    throw Error('');
  } catch (e) {
    //TODO figure out how to properly display newlines as strings inside objects
    //C get stack
    const stackTrace0 = e.stack; //C 'file:///' is removed (so that the URIs are clickable in node)

    const stackTrace1 = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["replaceAll"])(stackTrace0, 'file:///', ''); //C remove leading 'Error\n    ', to reduce confusion because trace isn't an error

    const stackTrace2 = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["replaceAll"])(stackTrace1, 'Error\n', ''); //C removes any line with Object.sj.trace

    let ignore = ['Object.sj.trace', 'new Base', 'new Error', 'Object.sj.catchUnexpected', 'Object.sj.propagate', 'sj.Error.announce'];
    ignore = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["replaceAll"])(ignore.join('|'), '.', '\.');
    const exp = new RegExp(`(?:(?:\\n|\n|\r|$)* *at(?: |\\n|\n|\r|$))(?:${ignore})(?:.+?(?=\\n|\n|\r|$))`, 'g');
    const stackTrace3 = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["replaceAll"])(stackTrace2, exp, '');
    return stackTrace0;
  }
};

Base.prototype.announce = function () {
  //R this replaces a need to log the result of functions and removes the intermediate steps need to do so (let result = new Object;, log;, return;)
  console.log(`▮\n${this.constructorName} ${this.origin} ${this.message}\n${this.constructor.trace()}\n▮`); //OLD//! Don't add these back in, they will be a circular dependency.
  // if (this instanceof Error) {
  // 	console.error(`✗ ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ ✗ `);
  // } else if (this instanceof Warn) {
  // 	console.warn(`W ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ W `);
  // } else {
  // 	console.log(`✓ ▮ ${this.constructorName} ${this.origin} ${this.message}\n${this.trace()}`); //
  // }
};

Base.construct = function (options = {}) {
  const accessory = {
    options
  }; //C get prototype chain

  const chain = [this.constructor]; //C push the prototype of the last item in the chain until Base is reached

  while (chain[chain.length - 1] !== Base) chain.push(Object.getPrototypeOf(chain[chain.length - 1])); //C call ancestor's and own beforeInitialize() in descending order


  for (let i = chain.length - 1; i >= 0; i--) chain[i].beforeInitialize.call(this, accessory); //C store constructor.name on this instance as constructorName so that it can be stringified and rebuilt


  this.constructorName = this.constructor.name; //C assign the ancestor's and own defaults in descending order

  const extendedDefaults = {};

  for (let i = chain.length - 1; i >= 0; i--) Object.assign(extendedDefaults, chain[i].defaults);

  const composed = {}; //C assign all properties from options

  if (this.allowUnknown) Object.assign(composed, extendedDefaults, options); //C or only assign properties declared in defaults
  else Object.assign(composed, extendedDefaults, Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(options, Object.keys(extendedDefaults))); //C then assign to instance non-undefined properties (so that anything that has the value undefined, will be undeclared)
  //? is this preferable to simply using assign defined in places where it's needed?

  Object.keys(composed).forEach(key => {
    if (composed[key] !== undefined) this[key] = composed[key];
  }); //C call ancestor's and own afterInitialize in order

  for (let i = chain.length - 1; i >= 0; i--) chain[i].afterInitialize.call(this, accessory);

  if (this.log) this.announce();
};

/* harmony default export */ __webpack_exports__["default"] = (Base);

/***/ }),

/***/ "./source/shared/legacy-classes/error.js":
/*!***********************************************!*\
  !*** ./source/shared/legacy-classes/error.js ***!
  \***********************************************/
/*! exports provided: Err, ErrorList, SilentError, AuthRequired, Unreachable, Timeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Err", function() { return Err; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorList", function() { return ErrorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SilentError", function() { return SilentError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRequired", function() { return AuthRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unreachable", function() { return Unreachable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timeout", function() { return Timeout; });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./source/shared/legacy-classes/base.js");

const Err = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Error', _base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      log: true,
      //TODO remove log: true from errors
      code: 400,
      type: 'Bad Request'
    }
  })
});
const ErrorList = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('ErrorList', Err, {
  constructorParts: parent => ({
    //C wrapper for an array with one or more errors
    defaults: {
      // OVERWRITE
      reason: 'one or more errors occurred with items',
      content: []
    }
  })
}); // CUSTOM ERROR

const SilentError = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('SilentError', Err, {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      log: false
    }
  })
});
const AuthRequired = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('AuthRequired', Err, {
  //C used to communicate to client that the server does not have the required tokens and that the client must authorize
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      message: 'authorization required'
    }
  })
});
const Unreachable = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Unreachable', Err, {
  //C used to indicate an unreachable place in the code
  constructorParts: parent => ({
    defaults: {
      message: 'code reached a place that should be unreachable'
    }
  })
});
const Timeout = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Timeout', Err, {
  //C used to indicate a timed-out function
  constructorParts: parent => ({
    defaults: {
      message: 'request timed out'
    }
  })
});

/***/ }),

/***/ "./source/shared/legacy-classes/rule1.js":
/*!***********************************************!*\
  !*** ./source/shared/legacy-classes/rule1.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.js */ "./source/shared/legacy-classes/error.js");
/* harmony import */ var _success_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./success.js */ "./source/shared/legacy-classes/success.js");



const Rule1 = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Rule', _base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  //G//! arrow functions may be used to shorten object returns, however they should must not use 'this'
  constructorParts: parent => ({
    //G//! 'this' refers to the static class inside constructorParts(), however 'this' refers to the instance inside before/afterInitialize()
    defaults: {
      // NEW
      valueName: 'input',
      trim: false,
      dataTypes: ['string'],
      min: 0,
      max: Infinity,
      //! remember to set useAgainst: true, if passing a value2 to use
      useAgainst: false,
      //C this is a reference value and should not be able to be equal to anything,
      //R this is to prevent a user from somehow passing in boolean false, thus making it equal to the against value and passing a password check
      againstValue: {},

      get againstMessage() {
        //! this reveals password2 when checking two passwords - simply overwrite this get function to a custom message
        let againstValueName = this.againstValue; //C join array of values if matching against multiple values

        if (Array.isArray(this.againstValue)) {
          againstValueName = this.againstValue.join(', ');
        }

        return `${this.valueName} did not match against these values: ${againstValueName}`;
      },

      //! remember to set useFilter: true, if passing a value2 to use
      useFilter: false,
      //C match nothing //TODO verify this
      //L https://stackoverflow.com/questions/2930182/regex-to-not-match-any-characters
      filterExpression: '\\b\\B',
      filterRequirements: 'none',

      get filterMessage() {
        return `${this.valueName} did not meet these requirements: ${this.filterRequirements}`;
      },

      custom: undefined
    }
  }),
  prototypeProperties: parent => ({
    //TODO how to deal with returning the password field since its sensitive
    async checkType(value) {
      //C check against each datatype
      for (let i = 0; i < this.dataTypes.length; i++) {
        if ( // Quick hack for replacing sj.isType which checks against custom types like 'array' and 'integer'
        typeof value === this.dataTypes[i] || this.dataTypes[i] === 'array' && Array.isArray(value) || this.dataTypes[i] === 'integer' && Number.isInteger(value)) {
          return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"]({
            origin: `${this.origin}.checkType()`,
            message: 'validated data type',
            content: value
          });
        } //C parse strings for numbers


        if (typeof value === 'string') {
          let parsed = Number.parseFloat(value);

          if (this.dataTypes[i] === 'number' && !Number.isNaN(parsed) || this.dataTypes[i] === 'integer' && Number.isInteger(parsed)) {
            return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"]({
              origin: `${this.origin}.checkType()`,
              message: 'validated data type',
              content: parsed
            });
          } //TODO parse strings for boolean & symbols & other?

        }
      } //C throw if no matches


      throw new _error_js__WEBPACK_IMPORTED_MODULE_1__["Err"]({
        log: true,
        origin: `${this.origin}.checkType()`,
        message: `${this.valueName} must be a ${this.dataTypes.join(' or ')}`,
        content: value
      });
    },

    async checkSize(value) {
      let m = `${this.valueName} must be between ${this.min} and ${this.max}`;

      if (typeof value === 'string') {
        //C string length
        if (!(value.length >= this.min && value.length <= this.max)) {
          throw new _error_js__WEBPACK_IMPORTED_MODULE_1__["Err"]({
            log: true,
            origin: `${this.origin}.checkSize()`,
            message: `${m} characters long`,
            content: value
          });
        }
      } else if (typeof value === 'number') {
        //C number size
        if (!(value >= this.min && value <= this.max)) {
          throw new _error_js__WEBPACK_IMPORTED_MODULE_1__["Err"]({
            log: true,
            origin: `${this.origin}.checkSize()`,
            message: `${m} items long`,
            content: value
          });
        }
      }

      return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"]({
        origin: `${this.origin}.checkSize()`,
        content: value
      });
    },

    async checkAgainst(value, value2) {
      //C custom againstValue
      if (value2 !== undefined) {
        this.againstValue = value2;
      }

      if (Array.isArray(this.againstValue)) {
        //C arrays
        //R indexOf apparently uses === so this should be fine
        //L https://stackoverflow.com/questions/44172530/array-indexof-insensitive-data-type
        if (this.againstValue.indexOf(value) === -1) {
          throw new _error_js__WEBPACK_IMPORTED_MODULE_1__["Err"]({
            log: true,
            origin: `${this.origin}.checkAgainst() array`,
            message: this.againstMessage,
            content: value
          });
        }
      } else {
        //C base value
        if (!(value === this.againstValue)) {
          throw new _error_js__WEBPACK_IMPORTED_MODULE_1__["Err"]({
            log: true,
            origin: `${this.origin}.checkAgainst() non-array`,
            message: this.againstMessage,
            content: value
          });
        }
      }

      return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"]({
        origin: `${this.origin}.checkAgainst()`,
        content: value
      });
    },

    async checkFilter(value, value2) {
      //C custom againstValue
      if (value2 === undefined) {
        this.filterExpression = value2;
      } //TODO


      return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"]({
        origin: `${this.origin}.checkAgainst()`,
        content: value
      });
    },

    async checkCustom(value) {
      if (typeof this.custom === 'function') {
        return this.custom(value);
      } else {
        return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"]({
          origin: `${this.origin}.checkCustom()`,
          content: value
        });
      }
    },

    /* //OLD
    	//TODO //! convert this.dataType to this.dataTypes forEach loop if re implementing this as in checkType()
    	checkType(value) {
    		let t = sj.typeOf(value);
    				//C if value is a string and dataType is a number or integer
    				if (this.dataType === 'number' && t === 'string') {
    			//C	try to parse the string and check if it is a number
    			//L	https://www.w3schools.com/jsref/jsref_parsefloat.asp
    			let p = parseFloat(value);
    			if (!Number.isNaN(p)) {
    				//C if so, convert it to the parsed number and return
    				value = p;
    				return true;
    			}
    			return false;
    		}
    		if (this.dataType === 'integer') {
    			if (t === 'string') {
    				let p = parseInt(value);
    				if (Number.isInteger(p)) {
    					value = p;
    					return true;
    				}
    				return false;
    			}
    					// if not a string, just see if its an integer
    			return Number.isInteger(value);
    		}
    				return t === this.dataType;
    	}
    	checkSize(value) {
    		if (sj.typeOf(value) === 'string' || sj.typeOf(value) === 'array') {
    			return value.length >= this.min && value.length <= this.max;
    		} else if (sj.typeOf(value) === 'number') {
    			return value >= this.min && value <= this.max;
    		} else {
    			return true;
    		}
    	}	
    	checkAgainst(value, value2) {
    		// allow custom check against value
    		if (sj.typeOf(value2) !== 'undefined') {
    			this.againstValue = value2;
    		}
    				if (Array.isArray(this.againstValue)) {
    			return this.againstValue.indexOf(value) !== -1;
    		} else {
    			//! no type coercion
    			return value === this.againstValue;
    		}
    	}	
    	checkFilter(value, value2) {
    		//TODO regex, similar to checkAgainst
    		return true;
    	}
    */
    //! validation and type conversion (and //TODO security, and database checks) are all part of this Rules check
    //TODO should Rule1 be exposed in globals if it contains the security checks? is that safe? - ideally, database checks should also be implemented so 'name already taken' errors show up at the same time basic validation errors do. Basically theres three waves in most cases - isLoggedIn (ok to be in a separate wave because it should rarely happen, and assumes the user knows what they're doing except being logged in - or would this be useful in the same wave too?), basic validation, database validation. < SHOULD ALL VALIDATION CHECKS BE IN ONE WAVE?
    //! to use the possibly modified value from check(), set the input value to equal the result.content
    async check(value, value2) {
      //L Guard Clauses: https://medium.com/@scadge/if-statements-design-guard-clauses-might-be-all-you-need-67219a1a981a
      //C Guard clauses (for me) should be positively-phrased conditions - but wrapped in a single negation: if(!(desiredCondition)) {}
      //C trim
      if (this.trim && typeof value === 'string') {
        value = value.trim();
      } //C checks & possibly modifies


      value = await this.checkType(value).then(resolved => resolved === null || resolved === void 0 ? void 0 : resolved.content); //R no need to catch and return the content as it will be in the thrown error anyways

      await this.checkSize(value);

      if (this.useAgainst) {
        await this.checkAgainst(value, value2);
      }

      if (this.useFilter) {
        await this.checkFilter(value, value2);
      }

      if (typeof this.custom === 'function') {
        await this.checkCustom(value);
      }
      /*
      	if (!this.checkType(value)) {
      		throw new Err({
      			log: this.log,
      			origin: this.origin,
      			message: `${this.valueName} must be a ${this.dataType}`,
      		})
      	}
      	if (this.trim && sj.typeOf(value) === 'string') {
      		value = value.trim();
      	}
      
      	if (!this.checkSize(value)) {
      		let message = `${this.valueName} must be between ${this.min} and ${this.max}`;
      		if (sj.typeOf(value) === 'string') {
      			message = `${message} characters long`;
      		} else if (sj.typeOf(value) === 'array') {
      			message = `${message} items long`;
      		}
      				throw new Err({
      			log: this.log,
      			origin: this.origin,
      			message: message,
      		});
      	}
      	if (this.useAgainst && !this.checkAgainst(value, value2)) {
      		throw new Err({
      			log: this.log,
      			origin: this.origin,
      			message: this.againstMessage,
      		});
      	}
      	if (this.useFilter && !this.checkFilter(value, value2)) {
      		throw new Err({
      			log: this.log,
      			origin: this.origin,
      			message: this.filterMessage,
      		});
      	}
      */
      //C remove error-related properties


      this.target = undefined; //TODO consider inputCorrect styling

      this.cssClass = undefined;
      this.content = value; //C transform object (this will strip any irrelevant properties away)

      return new _success_js__WEBPACK_IMPORTED_MODULE_2__["Success"](this);
    }
    /* //OLD decided this was redundant
    	//C checks an object's property and possibly modify it, this is done so that properties can be passed and modified by reference for lists
    	//? this may not be needed over check(), see Rule1.checkRuleSet() in global-server.js
    	async checkProperty(obj, prop, value2) {
    		//C validate arguments
    		if (!sj.isType(obj, 'object')) {
    			throw new Err({
    				log: true,
    				origin: 'Rule1.checkProperty()',
    				message: 'validation error',
    				reason: `Rule1.checkProperty()'s first argument is not an object`,
    				content: obj,
    			});
    		}
    		if (!prop in obj) {
    			//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
    			throw new Err({
    				log: true,
    				origin: 'Rule1.checkProperty()',
    				message: 'validation error',
    				reason: `Rule1.checkProperty()'s object argument is missing a '${prop}' property`,
    				content: obj,
    			});
    		}
    				//C check rules
    		let result = this.check(obj[prop], value2).catch(rejected => {
    			//C throw error if failed 
    			//! do not modify the original property, so that Err.content is not relied upon to always be the original property
    			throw propagate(rejected);
    		});
    				//C modify and return if successful
    		obj[prop] = result.content;
    		return result;
    	}
    */

    /* //OLD, new check ruleset was created in global-server.js
    	static async checkRuleSet(ruleSet) {
    		//C takes a 2D array of [[Rule1, obj, propertyName, value2(optional)], [], [], ...]
    		return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => {
    			//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    					//C validate arguments
    			if (!rules instanceof this) {
    				return new Err({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() is missing a Rule1 object`,
    					content: rules,
    				});
    			}
    					//C check, return errors too
    			return await rules.checkProperty(obj, prop, value2).catch(sj.andResolve);
    		})).then(resolved => {
    			//C filter for Success objects
    			return sj.filterList(resolved, Success, new Success({
    				origin: 'Rule1.checkRuleSet()',
    				message: 'all rules validated',
    			}), new Err({
    				origin: 'Rule1.checkRuleSet()',
    				message: 'one or more issues with rules',
    				reason: 'validation functions returned one or more errors',
    			}));
    		}).catch(rejected => {
    			throw propagate(rejected);
    		});
    	}
    */

    /* //OLD
    	//! checkRuleSet takes a reference object and the property name, value modification is then done automatically
    	static async checkRuleSet(ruleSet) {
    		//C takes a 2D array of [[Rule1, obj, propertyName, value2(optional)], [], [], ...]
    				return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => { 
    			//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    					//C validate arguments
    			if (!(rules instanceof Rule1)) {
    				//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
    				//? is it possible to dynamically get this class
    				return new Err({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() is missing a Rule1 object`,
    					content: rules,
    				});
    			}
    			if (!(typeof obj === 'object' && sj.typeOf(obj) !== 'null')) {
    				//R cannot use just sj.typeOf(obj) here because it won't properly recognize any 'object'
    				return new Err({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() is missing an object argument`,
    					content: obj,
    				});
    			}
    			if (!(prop in obj)) {
    				//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
    				return new Err({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() obj is missing a '${prop}' property`,
    					content: obj,
    				});
    			}
    					let result = new Err(); //? why is this here
    					//C call check() with 1 or 2 values
    			if (sj.typeOf(value2) === 'undefined') {
    				result = await rules.check(obj[prop]).then(sj.sj.andResolve());
    			} else {
    				result = await rules.check(obj[prop], value2).then(sj.sj.andResolve());
    			}
    					//C pass the possibly modified value back to the original object
    			obj[prop] = result.content;
    					return result;
    		})).then(resolved => {
    			return sj.filterList(resolved, Success, new Success({
    				origin: 'checkRuleSet()',
    				message: 'all rules validated',
    			}), new Err({
    				origin: 'checkRuleSet()',
    				message: 'one or more issues with fields',
    				reason: 'validation functions returned one or more errors',
    			}));
    		}).catch(rejected => {
    			throw propagate(rejected);
    		});
    	}
    */


  }),
  staticProperties: parent => ({
    //! string to be hashed must not be greater than 72 characters (//? or bytes???),
    stringMaxLength: 100,
    bigStringMaxLength: 2000,
    nameMinLength: 3,
    nameMaxLength: 16,
    defaultColor: '#ffffff',
    visibilityStates: ['public', 'private', 'linkOnly']
  })
});
Rule1.augmentClass({
  //C add custom Rule1s as statics of Rule1
  staticProperties: parent => ({
    none: new Rule1({
      origin: 'noRules',
      message: 'value validated',
      valueName: 'Value',
      dataTypes: ['string', 'number', 'boolean', 'array'] //TODO etc. or just make functionality for this

    }),
    posInt: new Rule1({
      origin: 'positiveIntegerRules',
      message: 'number validated',
      valueName: 'Number',
      dataTypes: ['integer']
    }),
    id: new Rule1({
      origin: 'idRules',
      message: 'id validated',
      valueName: 'id',
      dataTypes: ['integer']
    }),
    image: new Rule1({
      origin: 'imageRules',
      message: 'image validated',
      target: 'playlistImage',
      cssClass: 'inputError',
      valueName: 'image',
      trim: true,
      max: Rule1.bigStringMaxLength,
      // TODO filter: ___,
      filterMessage: 'Image must be a valid url'
    }),
    color: new Rule1({
      origin: 'colorRules',
      message: 'color validated',
      target: 'playlistColor',
      cssClass: 'inputError',
      valueName: 'color',
      trim: true,
      filter: '/#([a-f0-9]{3}){1,2}\b/',
      //TODO is this correct?
      filterMessage: 'Color must be in hex format #XXXXXX'
    }),
    visibility: new Rule1({
      origin: 'visibilityRules',
      message: 'visibility validated',
      target: 'playlistVisibility',
      cssClass: 'inputError',
      valueName: 'Visibility',
      useAgainst: true,
      againstValue: Rule1.visibilityStates,
      againstMessage: 'please select a valid visibility level'
    }),
    //TODO other / old
    //? not sure what these were used for
    self: new Rule1({
      origin: 'selfRules',
      message: 'self validated',
      target: 'notify',
      cssClass: 'notifyError',
      valueName: 'Id',
      dataTypes: ['integer'],
      useAgainst: true,
      //! ctx.session.user.id shouldn't be used here because there is no guarantee ctx.session.user exists
      againstMessage: 'you are not the owner of this'
    }),
    setPassword: new Rule1({
      origin: 'setPasswordRules',
      message: 'password validated',
      target: 'registerPassword',
      cssClass: 'inputError',
      valueName: 'Password',
      min: 6,
      max: 72,
      //! as per bcrypt
      useAgainst: true,

      get againstMessage() {
        return 'Passwords do not match';
      }

    })
  })
});
/* harmony default export */ __webpack_exports__["default"] = (Rule1);

/***/ }),

/***/ "./source/shared/legacy-classes/success.js":
/*!*************************************************!*\
  !*** ./source/shared/legacy-classes/success.js ***!
  \*************************************************/
/*! exports provided: Success, SuccessList, Warn, Credentials */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Success", function() { return Success; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuccessList", function() { return SuccessList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Warn", function() { return Warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Credentials", function() { return Credentials; });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./source/shared/legacy-classes/base.js");
// SUCCESS //C success and error objects are returned from functions (mostly async ones)

const Success = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Success', _base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  constructorParts: parent => ({
    defaults: {
      // NEW
      timestamp: undefined
    }
  })
});
const SuccessList = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('SuccessList', Success, {
  constructorParts: parent => ({
    //C wrapper for an array of successful items
    defaults: {
      // OVERWRITE
      reason: 'all items successful',
      content: []
    }
  })
});
const Warn = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Warn', Success, {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      log: true
    }
  })
});
const Credentials = _base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Credentials', Success, {
  constructorParts: parent => ({
    //TODO allowUnknown: true,
    defaults: {
      //TODO this part should only be server-side 
      //TODO consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials
      authRequestKey: Symbol(),
      //! this shouldn't break sj.checkKey(), but also shouldn't match anything
      authRequestTimestamp: 0,
      authRequestTimeout: 300000,
      //C default 5 minutes
      authRequestURL: '',
      authCode: Symbol(),
      accessToken: Symbol(),
      expires: 0,
      refreshToken: Symbol(),
      refreshBuffer: 60000,
      //C 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value
      scopes: []
    }
  })
});

/***/ }),

/***/ "./source/shared/live-data.js":
/*!************************************!*\
  !*** ./source/shared/live-data.js ***!
  \************************************/
/*! exports provided: LiveTable, CachedEntity, LiveQuery, Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveTable", function() { return LiveTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachedEntity", function() { return CachedEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveQuery", function() { return LiveQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return Subscription; });
/* harmony import */ var _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _entities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/index.js */ "./source/shared/entities/index.js");
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");



const LiveTable = _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('LiveTable', _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  constructorParts: parent => ({
    defaults: {
      Entity: undefined
    },

    afterInitialize() {
      Object.assign(this, {
        liveQueries: [],
        cachedEntities: []
      });
    }

  }),
  staticProperties: parent => ({
    makeTables(tableKeys) {
      return new Map(_entities_index_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].children.map(EntityClass => [EntityClass, new this({
        Entity: EntityClass
      })]));
    }

  })
});
const CachedEntity = _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('CachedEntity', _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  constructorParts: parent => ({
    defaults: {
      table: undefined,
      entity: undefined
    },

    afterInitialize() {
      Object.assign(this, {
        liveQueryRefs: [],
        timestamp: 0
      });
    }

  })
});
const LiveQuery = _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('LiveQuery', _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  constructorParts: parent => ({
    beforeInitialize(accessory) {
      if (Array.isArray(accessory.options.query)) {
        accessory.options.query = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["any"])(accessory.options.query);
      }
    },

    defaults: {
      table: undefined,
      query: undefined
    },

    afterInitialize() {
      Object.assign(this, {
        cachedEntityRefs: [],
        subscriptions: [],
        timestamp: 0
      });
    }

  })
});
const Subscription = _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Subscription', _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  //? should this inherit from Success since it will be returned from a function>
  constructorParts: parent => ({
    defaults: {
      liveQuery: undefined,

      onUpdate() {},

      //C any update
      onAdd() {},

      //C entities added
      onEdit() {},

      //C entities data changed
      onRemove() {} //C entities removed


    }
  })
});

/***/ }),

/***/ "./source/shared/propagate.js":
/*!************************************!*\
  !*** ./source/shared/propagate.js ***!
  \************************************/
/*! exports provided: default, returnPropagate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnPropagate", function() { return returnPropagate; });
/* harmony import */ var _derived_utility_safe_stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived-utility/safe-stringify.js */ "./source/shared/derived-utility/safe-stringify.js");
/* harmony import */ var _errors_unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors/unexpected-value-thrown.js */ "./source/shared/errors/unexpected-value-thrown.js");
// Takes an input (which was thrown), re-throws it if its already an Error, otherwise wraps it in an error instance and throws that.
//G Use in the final .catch() of a Promise chain to handle any unexpected values or errors thrown.
//! Be aware of JSON.stringify()'s interaction with Error instances and non-enumerable properties:
//L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify

 // Wraps the passed value in an Error instance if it isn't one. Then throws it.

/* harmony default export */ __webpack_exports__["default"] = (function (value, overwriteOptions) {
  if (value instanceof Error) {
    throw value;
  } else {
    throw new _errors_unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      message: `An unexpected value has been thrown: ${Object(_derived_utility_safe_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value)}`,
      userMessage: 'An unexpected error has occurred.',
      ...overwriteOptions,
      value
    });
  }
});
; // Propagates a value, but returns it instead of throwing it.
//TODO Consider refactoring implementations of this out, into a better solution.

function returnPropagate(value, overwriteOptions) {
  try {
    propagate(value, overwriteOptions);
  } catch (error) {
    return error;
  }
}
;

/***/ }),

/***/ "./source/shared/request.js":
/*!**********************************!*\
  !*** ./source/shared/request.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./derived-utility/index.js */ "./source/shared/derived-utility/index.js");
/* harmony import */ var _propagate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/index.js */ "./source/shared/errors/index.js");
// Wrapper for the fetch function.
// Has better validations for inputs.
// Has an extra queryParameters option that can be used to add query parameters to the URL.
// Has an extra JSONBody option that can be used to stringify an input and use it as the body.
// Interprets the fetch API's return values.




/* harmony default export */ __webpack_exports__["default"] = (async function (method, URL, {
  // Custom
  queryParameters,
  JSONBody,
  // Fetch
  headers = _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["constants"].JSON_HEADER,
  body,
  ...rest
}) {
  /* //!//G use UPPERCASE HTTP methods.
  	In the fetch API, 'PATCH' is case-sensitive where GET, POST, DELETE aren't
  	//L Its absurd, but apparently intentional: 
  	//L https://stackoverflow.com/questions/34666680/fetch-patch-request-is-not-allowed
  	//L https://github.com/whatwg/fetch/issues/50
  	//L https://github.com/github/fetch/pull/243
  */
  // Transform jsonBody to body string.
  if (JSONBody !== undefined) {
    if (body !== undefined) throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_3__["InternalError"]({
      message: 'Request may not use both a string body and a JSONBody.'
    });
    body = Object(_derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["safeStringify"])(JSONBody);
  } // Encode and append queryParameters to the URL.


  if (queryParameters !== undefined) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].queryParameters.validate(queryParameters);
    const encodedParameters = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["encodeProperties"])(queryParameters);
    URL = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["appendQueryParameters"])(URL, encodedParameters);
  } // VALIDATION


  _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(method);
  _derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["urlRule"].validate(URL);
  _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].headers.validate(headers);
  if (body !== undefined) _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].body.validate(body); // Check that rest doesn't have any unused options.

  for (const key of Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["getKeysOf"])(rest, {
    own: true,
    named: true,
    enumerable: true,
    inherited: false,
    symbol: false,
    nonEnumerable: false
  })) {
    if (![//L From: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    // Except 'method', 'headers', 'body'.
    'mode', 'credentials', 'cache', 'redirect', 'referrer', 'referrerPolicy', 'integrity', 'keepalive', 'signal'].includes(key)) {
      throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_3__["InternalError"]({
        message: `Request has an unused option ${key}. This is a mistake.`,
        userMessage: 'Request failed due to an internal error.'
      });
    }
  } //L fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  //L When fetch throws: https://www.tjvantoll.com/2015/09/13/fetch-and-errors


  const result = await Object(_derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])(URL, { ...rest,
    method,
    headers,
    body
  }).catch(_propagate_js__WEBPACK_IMPORTED_MODULE_2__["default"]); //TODO Add custom handlers for fetch errors.
  // Return undefined if request was successful with no content returned.

  if (result.status === 204) return; //TODO Consider adding custom handlers for other return types.
  // Extract raw and parsed results.
  //L fetch parsing: https://developer.mozilla.org/en-US/docs/Web/API/Body/json

  const rawResult = await result.clone().text().catch(rejected => {
    // Record the raw result for easier debugging.
    throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_3__["CustomError"]({
      message: 'Failed to parse fetch response as raw text.',
      userMessage: 'Request failed.',
      value: {
        error: rejected,
        rawResult
      }
    });
  }); // Throw non-ok status codes.

  if (!result.ok) throw Object(_propagate_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rawResult); //TODO consider custom handlers for http errors (ie 404s etc.);
  // If the parse fails, throw an error containing the raw result.

  const parsedResult = await result.clone().json().catch(() => Object(_propagate_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rawResult));
  return parsedResult;
});
;

/***/ }),

/***/ "./source/shared/source.js":
/*!*********************************!*\
  !*** ./source/shared/source.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legacy-classes/base.js */ "./source/shared/legacy-classes/base.js");
/* harmony import */ var _errors_internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors/internal-error.js */ "./source/shared/errors/internal-error.js");
/* harmony import */ var _legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./legacy-classes/success.js */ "./source/shared/legacy-classes/success.js");



/* harmony default export */ __webpack_exports__["default"] = (_legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeClass('Source', _legacy_classes_base_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  constructorParts: parent => ({
    defaults: {
      // NEW
      name: undefined,
      //! source.name is a unique identifier
      register: false,
      nullPrefix: '',
      idPrefix: '',
      credentials: new _legacy_classes_success_js__WEBPACK_IMPORTED_MODULE_2__["Credentials"](),
      //TODO this should only be server-side
      api: {},
      scopes: [],
      authRequestManually: true,
      makeAuthRequestURL: function () {}
    },

    afterInitialize(accessory) {
      //C add source to static source list: sj.Source.instances
      //R Must be manually declared to register, as otherwise, temporary initializations get added and cause issue.
      if (this.register) this.constructor.register(this);
    }

  }),
  staticProperties: parent => ({
    instances: [],

    register(source) {
      if (!(source instanceof this)) {
        throw new _errors_internal_error_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
          message: 'A non-Source was registered.'
        });
      }

      this.instances.push(source);
    },

    find(name) {
      return this.instances.find(instance => instance.name === name);
    }

  })
}));

/***/ }),

/***/ "./source/shared/utility/array/any.js":
/*!********************************************!*\
  !*** ./source/shared/utility/array/any.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Wraps a value in an array. If the value is already an array, its items get spread into a fresh one.

/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  return _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(value) ? [...value] : [value];
});

/***/ }),

/***/ "./source/shared/utility/array/async-map.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/array/async-map.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Executes an async function for each item in an array.
// When all async functions are settled, returns an array of results if all are fulfilled, but throws the array of results if any reject.
//G Callback takes same argument order as Array.map callback.
//! Can mutate the original array.
//TODO The semantics of this might not be correct - why would a mixed list of fulfilled and rejected values be useful? The rejected promises are also all caught so basic throws aren't useful. Maybe explicitly filtering out fulfillments from the thrown array would be better? To fix this would require going in and ensuring all uses work with this change.

/* harmony default export */ __webpack_exports__["default"] = (async function (array, mapFunction) {
  // Validate.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(array);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(mapFunction); // Wait for every promise to settle.

  const promises = array.map((item, index, self) => mapFunction(item, index, self));
  const outcomes = await Promise.allSettled(promises); // Extract results and fulfillment.

  const fulfilledResults = [];
  const rejectedResults = [];
  let allFulfilled = true;

  for (const outcome of outcomes) {
    if (outcome.status === 'fulfilled') {
      fulfilledResults.push(outcome.value);
    } else {
      rejectedResults.push(outcome.reason);
      allFulfilled = false;
    }
  } // Return fulfilled results or throw rejected results.


  if (allFulfilled) {
    return fulfilledResults;
  } else {
    throw rejectedResults;
  }
});
;

/***/ }),

/***/ "./source/shared/utility/array/dynamic-sort.js":
/*!*****************************************************!*\
  !*** ./source/shared/utility/array/dynamic-sort.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stable_sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stable-sort.js */ "./source/shared/utility/array/stable-sort.js");
//TODO add validation
//TODO consider replacing typechecks with a 'comparable' rule.

/* harmony default export */ __webpack_exports__["default"] = (function (list, ascending, prop) {
  //C sorts a list in ascending or descending order by the numeric or string-converted value of its items or their properties if a prop is defined
  //C ascending will flip the list into descending if false
  if (ascending) {
    ascending = 1;
  } else {
    ascending = -1;
  }

  let compare;

  if (typeof prop === 'string') {
    //C if prop is defined, compare props
    if (list.every(item => typeof item[prop] === 'number' || typeof item[prop] === 'boolean')) {
      //C if values are numbers or boolean, do number compare
      compare = function (a, b) {
        return (a[prop] - b[prop]) * ascending;
      };
    } else {
      //C if values are strings, other, or mixed, do a string conversion and string compare
      compare = function (a, b) {
        //C convert to strings
        let as = a[prop] + '';
        let bs = b[prop] + ''; //C string compare
        //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

        return as.localeCompare(bs, 'en', {
          sensitivity: 'base'
        }) * ascending;
      };
    }
  } else {
    //C if no prop is defined, compare values
    //! this is the exact same as above, just without the property
    if (list.every(item => typeof item === 'number' || typeof item === 'boolean')) {
      compare = function (a, b) {
        return (a - b) * ascending;
      };
    } else {
      compare = function (a, b) {
        let as = a + '';
        let bs = b + '';
        return as.localeCompare(bs, 'en', {
          sensitivity: 'base'
        }) * ascending;
      };
    }
  }

  return Object(_stable_sort_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, compare);
});
;

/***/ }),

/***/ "./source/shared/utility/array/index.js":
/*!**********************************************!*\
  !*** ./source/shared/utility/array/index.js ***!
  \**********************************************/
/*! exports provided: any, asyncMap, dynamicSort, one, stableSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _any_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./any.js */ "./source/shared/utility/array/any.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _any_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _async_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./async-map.js */ "./source/shared/utility/array/async-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncMap", function() { return _async_map_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _dynamic_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-sort.js */ "./source/shared/utility/array/dynamic-sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicSort", function() { return _dynamic_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _one_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./one.js */ "./source/shared/utility/array/one.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "one", function() { return _one_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _stable_sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stable-sort.js */ "./source/shared/utility/array/stable-sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return _stable_sort_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./source/shared/utility/array/one.js":
/*!********************************************!*\
  !*** ./source/shared/utility/array/one.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Returns the first item of an array, or the value otherwise.
//G If exactly one item is required, instead of undefined, use a validator.

/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  return _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(value) ? value[0] : value;
});

/***/ }),

/***/ "./source/shared/utility/array/stable-sort.js":
/*!****************************************************!*\
  !*** ./source/shared/utility/array/stable-sort.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
//L https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
//L https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
//L https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f

/* harmony default export */ __webpack_exports__["default"] = (function (array, compare = (a, b) => {
  //C low to high
  return a - b;
}) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(array);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(compare); //C Create new array where the original index is preserved.

  const preservedArray = array.map((value, index) => ({
    value,
    index
  }));

  const stableCompare = (a, b) => {
    const order = compare(a.value, b.value); //C If equal, sort based on original order, otherwise sort normally.

    return order === 0 ? a.index - b.index : order;
  };

  preservedArray.sort(stableCompare); //C Overwrite original array with sorted values.

  for (let i = 0; i < array.length; i++) {
    array[i] = preservedArray[i].value;
  }

  return array;
});
;

/***/ }),

/***/ "./source/shared/utility/bool-catch.js":
/*!*********************************************!*\
  !*** ./source/shared/utility/bool-catch.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return boolCatch; });
function boolCatch(f) {
  try {
    f();
    return true;
  } catch (e) {
    return false;
  }
}
;

/***/ }),

/***/ "./source/shared/utility/clamp.js":
/*!****************************************!*\
  !*** ./source/shared/utility/clamp.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/rules/index.js */ "./source/shared/utility/validation/rules/index.js");

/* harmony default export */ __webpack_exports__["default"] = (function (input, min = -Infinity, max = Infinity) {
  // Throw if input is not defined, do not default to 0.
  // Throw on NaN, because whether NaN is 'within' the bounds is implementation dependant on whether x>y or !(x<=y) is used for comparison. The consumer should not be expected to know which.
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNaNNumber"].validate(input);
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNaNNumber"].validate(min);
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNaNNumber"].validate(max);
  if (min > max) throw new Error(`min: ${min} must not be greater than max: ${max}`);else if (input < min) return min;else if (input > max) return max;else return input;
});
;

/***/ }),

/***/ "./source/shared/utility/combinations.js":
/*!***********************************************!*\
  !*** ./source/shared/utility/combinations.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return combinations; });
function combinations(optionsObject) {
  //C takes an options object with a set of own properties whose value is an array of all possible values for that property
  //C returns an array of objects with all combinations of those property values
  //C ensure optionsObject is an object
  if (optionsObject === null || typeof optionsObject !== 'object') {
    throw new Error('Options object is not an object.');
  } //C get all own property keys


  const keys = [];
  keys.push(...Object.getOwnPropertyNames(optionsObject));
  keys.push(...Object.getOwnPropertySymbols(optionsObject)); //C ensure all own properties are iterable

  for (const key of keys) {
    if (!(optionsObject[key] instanceof Array)) {
      throw new Error(`Property options for ${key} is not iterable.`);
    }
  }

  const combinations = [];
  const combination = {}; //C return empty array if no own keys

  if (keys.length <= 0) return combinations; //C start with the first property

  const nest = function (index = 0) {
    const key = keys[index];
    const options = optionsObject[key]; //C for each option

    for (const option of options) {
      //C set the option
      combination[key] = option;

      if (index < keys.length - 1) {
        //C move to the next property
        nest(index + 1);
      } else {
        //C or if at last property, save the combination
        combinations.push({ ...combination
        });
      }
    }
  };

  nest();
  return combinations;
}
;

/***/ }),

/***/ "./source/shared/utility/constants.js":
/*!********************************************!*\
  !*** ./source/shared/utility/constants.js ***!
  \********************************************/
/*! exports provided: MAX_32_BIT_INTEGER, MAX_URL_LENGTH, JSON_HEADER, URL_HEADER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_32_BIT_INTEGER", function() { return MAX_32_BIT_INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_URL_LENGTH", function() { return MAX_URL_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON_HEADER", function() { return JSON_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_HEADER", function() { return URL_HEADER; });
const MAX_32_BIT_INTEGER = 2147483647;
const MAX_URL_LENGTH = 2047;
const JSON_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});
const URL_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
});

/***/ }),

/***/ "./source/shared/utility/deferred.js":
/*!*******************************************!*\
  !*** ./source/shared/utility/deferred.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Deferred; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _time_wait_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time/wait.js */ "./source/shared/utility/time/wait.js");
// Custom promise that can be resolve, rejected, and cancelled outside its executor.
// May be called without an executor, upon which it will never resolve.


class Deferred extends Promise {
  constructor(executor = () => {}) {
    //R Closures are used here instead of instance variables because instance variables don't exist before super is called. This is required because this super call is being intercepted to tap into the resolve/reject calls.
    const closure = {
      isPending: true,
      // If closure.isCanceled is true, instance.resolve() / instance.reject() are prevented from actually resolving/rejecting the promise.
      //R Cancel is useful specifically for deferred promises to ensure that they cannot be fulfilled/rejected in the future.
      isCanceled: false
    };

    const interceptedExecutor = (resolve, reject) => {
      closure.resolve = function (resolved) {
        if (!closure.isCanceled) {
          closure.isPending = false;
          resolve(resolved);
        }
      };

      closure.reject = function (rejected) {
        if (!closure.isCanceled) {
          closure.isPending = false;
          reject(rejected);
        }
      };

      return executor(resolve, reject);
    };

    super(interceptedExecutor); // INSTANCE VARIABLES

    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].getter(this, {
      // Read-only access to closure.isPending and closure.isCanceled.
      get isPending() {
        return closure.isPending;
      },

      get isCanceled() {
        return closure.isCanceled;
      }

    });
    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      // Access to resolve/reject functions.
      resolve: closure.resolve,
      reject: closure.reject,

      // Ability to prevent promise from settling.
      cancel() {
        closure.isCanceled = true;
        return this;
      },

      // Ability to set automatic rejection upon timeout.
      timeout(duration, onTimeout = () => new Error('Deferred promise timed out.')) {
        Object(_time_wait_js__WEBPACK_IMPORTED_MODULE_1__["default"])(duration).then(() => {
          // Don't timeout if promise has settled.
          if (closure.isPending) {
            this.reject(onTimeout());
          }
        });
        return this;
      }

    });
  }

}
;

/***/ }),

/***/ "./source/shared/utility/dynamic-class.js":
/*!************************************************!*\
  !*** ./source/shared/utility/dynamic-class.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/keys-of.js */ "./source/shared/utility/object/keys-of.js");
/* harmony import */ var _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");
/* harmony import */ var _validation_interface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation/interface.js */ "./source/shared/utility/validation/interface.js");
/* //R
	CLASS COMPOSITION (
		This module seem like it would work well with composition: 'class composition'.
		Use for shallow but present class structures.
	)

	//L functional classes: https://stackoverflow.com/questions/15192722/javascript-extending-class

	CLASS V FUNCTION DIFFERENCES (
		//L https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420
		//L Native classes are actually different: see classtraphobic

		class             <---> function
		super(...args);   <---> Parent.call(this, ...args);

		if child:
		_                 <---> prototype of Class is Parent.
		_                 <---> Class           has a non-writable, non-enumerable, non-configurable prototype property that is an object with its prototype as Parent.prototype.
		_                 <---> Class.prototype has a non-writable, non-enumerable, non-configurable constructor property that points to Class.
		if not child:
		_                 <---> Class.prototype must have it's writable attribute changed from true to false.

		not reproducible:
		this before super <---> All interactions except direct references to this can be trapped with a Proxy.
		Class() cannot be called directly <---> Cannot reproduce this behaviour without wrapping the Class itself in a proxy.

		FUNCTIONAL IMPLEMENTATION (
			const Class = {[name]: function (...args) {
				// INTERCEPT
				const interceptedArgs = this.constructor[iface.intercept].call(proxy, ...args);

				// EXTEND
				if (isChild) Parent.call(this, ...interceptedArgs);

				// INSTANCE
				const transfers = this.constructor[iface.instance].call(this, ...interceptedArgs);
				this.constructor[iface.instanceTransfer](transfers, this);
			}}[name];

			if (isChild) {
				// Set prototype.
				Object.setPrototypeOf(Class, Parent);
				// Set Class.prototype to a new object that inherits from Parent.prototype and set writable, enumerable, configurable as false.
				define.hiddenConstant(Class, {prototype: Object.create(Parent.prototype)});
				// Give Class.prototype a constant constructor property.
				define.hiddenConstant(Class.prototype, {constructor: Class});
			} else {
				// Set Class.prototype to itself and set writable to false. function prototypes are writable but Class prototypes are not.
				define.hiddenConstant(Class, {prototype: Class.prototype});
			}
		)
	)

	//OLD INTERCEPT PROXY (
		Removed this from intercept.call(proxy, ...args); because Proxy cannot be as easily poly-filled as classes can.

		This is also more consistent: referencing this in any way will work, but not actually point to this. Instead of throwing an error in all cases except when it is directly referenced.

		const throwOnThisReference = function () {
			throw new ReferenceError(`Cannot use 'this' keyword in intercept.`);
		};
		const proxy = new Proxy({}, {
			// all possible traps
			getPrototypeOf:           throwOnThisReference,
			setPrototypeOf:           throwOnThisReference,
			isExtensible:             throwOnThisReference,
			preventExtensions:        throwOnThisReference,
			getOwnPropertyDescriptor: throwOnThisReference,
			defineProperty:           throwOnThisReference,
			has:                      throwOnThisReference,
			get:                      throwOnThisReference,
			set:                      throwOnThisReference,
			deleteProperty:           throwOnThisReference,
			ownKeys:                  throwOnThisReference,
			apply:                    throwOnThisReference,
			construct:                throwOnThisReference,
		});
	)

	INTERCEPT
		Main issue is that the arguments used by the instance function may be different than the arguments passed to super.
		Would have to create a 'filter' function for super.
		The problem with that is its interaction with the layer system isn't clear.
		At the same time, I can't think of a reason why multiple intercept layers would want to modify the interceptedArgs output (other than to change the incoming signature).
		This problem seems to be created by having '3' phases, '2' in/out phases works but 3 doesn't.
		Maybe just only use the signature of the top-most layer? But then what happens if a lower layer changes the subclass?
		Actually I think the right solution is to use the filter functions in forward order.
		The original implementation is actually incorrect: a lower layer could have a different sub-class with a different signature, of which the higher layers know nothing about and would pass the wrong super signature. - It would have made more sense to have the intercept going in forward order too. (But then the signature wouldn't be able to be changed).
		Basically, both the input signature and the parent class need to be augment-able, which requires the lowest layer to be the respective first and last thing to touch these parts. Which requires an in/out system.

		There doesn't need to be an 'in' step for the instance parts, because subclasses should follow the substitution principle, and anything done by a sub-class should be compatible with the super class.
		Also higher layers should not be concerned with creating incompatibilities with lower layers, because the lower layers should have 'knowledge' of the higher layers.


		Ok, so the intercept phase needs an input/output layer ordering. But every other phase (instance, prototype, static) only needs an output layer ordering due because sub-classes and layers should obey the substitution principle: anything that happened to the class upstream (due to inserted subclassing, layer logic, etc.) should be fully compatible with the downstream, higher layers.
		! The reason the input phase is different, is because class signatures do not have to obey this substitution principle. Which means that lower layers have to accommodate the assumptions (input signature, output signature) of higher layers.

		TODO trying to find a way to make this more elegant

		Split everything into single files so that dependencies are clear.
		Rewrite with new syntax.

		Start with parts with 0 dependencies, then work up. (Doing it the other way around didn't work.)

		Get rid of wrapper objects, they're too cumbersome and cause too many dependencies.


		3 things to pass:
		input arguments for next layer
			input arguments for the next layer default to the layers own input arguments, but could be changed if for example the lower layer modifies the class' signature
		arguments to super
			arguments to super default to the input arguments for the next layer (if at the top), 
		scope variables to instance function
			scope variables default to the input arguments for the next layer
			scope variables should only be available within the layer
			the use case for this is passing one modified value to the superclass, but keeping the original argument and passing it to the instance initializer

		arguments to super only applies to highest layer,
		extends only applies to the lowest layer (with conditions)
		one problem: if a lower layer changes the extends class, the highest class has no knowledge, in this case the signatures may not match (unless the signatures follow the substitution principle, ie using a superclass signature for a subclass.... no actually, this is the reverse)
			maybe, the super arguments could be a function, that works in the forward direction, they take the arguments to be passed to super (from a possible higher layer, or self), but they also have a closure to the current intercept function, (Ie is defined in the return), that way the super arguments can be passed back down and modified according to the extends class appropriately
				actually, what if the instance function is defined in the return, that would create the closure, but it would be less aligned

		outputArguments
		superArguments
		scopeVariables / closureVariables / instance function with inherent closure


		CURRENT PLAN

		INTERCEPT FUNCTION
			has 'input arguments'
			returns an object with:
				'output arguments' array
					which are passed to a higher layer
						so that different layer signatures can be supported
						the lower layers must accommodate (or have knowledge of) higher layers
					is basically the return of the intercept function, but is put alongside other functions because they need closures
					if no higher layer exists, these get passed to the same layer's 'super arguments'
					defaults to the 'input arguments'
				'super arguments' function
					which takes the output of higher layer's 'super arguments' function
					and passes its output to lower layer's 'super arguments' function
					if no lower layer exists, the output is passed to super
					if no higher layer exists, it gets passed the 'output arguments'
					defaults to returning what ever it was passed
				'instance arguments' array
					which are passed to the same layer's instance function
						used as 'scope' variables, to store variables that aren't used by higher layers or super, but the instance
					defaults to the 'input arguments'
*/
//TODO//! Need a way to hoist the static class reference. Or else there is no way (without augmentation) to reference the exact constructor. (this.constructor will be different for sub-classes.) This should go along-side duper, but how to add it with instances?
// Maybe, using a function for each layer would allow that? Giving direct reference to the class being defined. This however would not be contextual between instance/prototype/static
//TODO should it be possible to change the class parent? it would effectively only allow changing it to a subclass (unless already defined layers should be redefined), or maybe augmentation in general is just a bad idea.
//TODO Consider the name 'CompositeClass', as it seems the composition structure will end up being more useful than the 'dynamic-ness' of it.




 // VALIDATION

const customRules = {};
_object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(customRules, {
  layers: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].array.validate(value);
      let currentExtends;

      for (const layer of value) {
        customRules.layer.validate(layer); // If layers define an extension class, they must be the same as or descend from all extension classes of higher layers.

        if (layer.extends !== undefined && currentExtends !== undefined) {
          if (layer.extends === currentExtends || currentExtends.isPrototypeOf(layer.extends)) {
            currentExtends = layer.extends;
          } else {
            //TODO write test
            throw new Error('Dynamic Class layer cannot extend a class that is not equal to or the descendant of a class extended by a higher layer.');
          }
        }
      }
    },

    caster(reference) {
      // Undefined defaults to empty array.
      if (reference.value === undefined) reference.value = []; // Cast all items in array to layers.

      if (reference.value instanceof Array) {
        reference.value = reference.value.map(layer => {
          return customRules.layer.validateCast(layer)[0];
        });
      } // Else cannot cast non-undefined, non-arrays.

    }

  }),
  layer: new _validation_interface_js__WEBPACK_IMPORTED_MODULE_4__["Interface"]({
    //R Wrap the test functions to ensure that they doesn't get modified.
    extends: value => customRules.extends.validate(value),
    intercept: value => customRules.intercept.test(value),
    instance: value => customRules.instance.test(value),
    prototype: value => customRules.prototype.test(value),
    static: value => customRules.static.test(value)
  }, {
    caster(reference) {
      // Undefined defaults to empty object.
      if (reference.value === undefined) reference.value = {}; // Set defaults for undefined properties.

      if (_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].object.test(reference.value)) {
        const {
          extends: e,
          intercept = () => {},
          instance = () => {},
          prototype = () => {},
          static: s = () => {},
          //R Passing an existing class is not supported because it won't aid augmentation and static properties on the class would interfere with the part defaults.
          //R Object literals for the prototype and static options are not supported because it would allow mutation of the part functions. It's also more consistent to require all parts to be functions.
          // Ensure other //! enumerable properties are preserved.
          ...rest
        } = reference.value; // Replace with new object.

        reference.value = {
          extends: e,
          intercept,
          instance,
          prototype,
          static: s,
          ...rest
        };
      } // Else, not possible to cast non-undefined, non-object to layer.

    }

  }),
  name: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].string.test(value)) {
        throw new Error(`'name' option must be a string, not a ${typeof value}`);
      }
    }

  }),
  //! These must use the same keys that are expected on a layer object.
  extends: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      // Must be undefined or a constructor.
      if (!(value === undefined || _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].constructor.test(value))) {
        throw new Error(`'extends' option must be undefined or a constructor, not a ${typeof value}`);
      }
    }

  }),
  intercept: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'intercept' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  instance: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'instance' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  prototype: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'prototype' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  static: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'static' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  instanceTransfer: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'instanceTransfer' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  prototypeTransfer: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'prototypeTransfer' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  staticTransfer: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(value)) {
        throw new Error(`'staticTransfer' option must be a function, not a ${typeof value}`);
      }
    }

  })
}); // UTILITY FUNCTIONS

function processArguments(arg0 = '', ...args) {
  let name;
  let layers;

  if (_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].string.test(arg0)) {
    // If first argument is a string, consider it the name.
    name = arg0;
    layers = [...args];
  } else {
    // Else consider it a layer.
    name = ''; // Native function and class' 'name' property defaults to an empty string.

    layers = [arg0, ...args];
  }

  return {
    name: customRules.name.validate(name)[0],
    layers: customRules.layers.validateCast(layers)[0]
  };
}

;

function getParent(layers) {
  // Returns the last defined 'extends' property.
  for (let i = layers.length - 1; i >= 0; i--) {
    const Parent = layers[i].extends;
    if (Parent !== undefined) return Parent;
  }

  return undefined;
}

;

function doIntercept(args, layers) {
  // Store:
  // Current intercept arguments for intercept chaining.
  let nextArgs = args; // All super arguments getters for later iteration. They will be evaluated in the super chain.

  const getSuperArgsList = []; // All instance arguments for later iteration.

  const instanceArgsList = []; // Loop backwards over intercept functions.

  for (let i = layers.length - 1; i >= 0; i--) {
    var _layers$i$intercept$c;

    const currentArguments = nextArgs; // Call with null as this to throw on any object-like operations on this.

    const result = (_layers$i$intercept$c = layers[i].intercept.call(null, ...currentArguments)) !== null && _layers$i$intercept$c !== void 0 ? _layers$i$intercept$c : {};
    let {
      //R All functions will be passed their default return. That way defaults can be easily extended, and all three options are more similar.
      nextArguments = (...args) => args,
      superArguments = (...args) => args,
      instanceArguments = (...args) => args,
      ...rest
    } = result; // Validate return object.

    const restKeys = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["getOwnKeysOf"])(rest);

    if (restKeys.length !== 0) {
      throw new Error(`Intercept function has extra return properties: [${restKeys.join(', ')}], this is probably a mistake.`);
    } // Transform array shorthands into functions.


    if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(nextArguments)) {
      const shorthand = nextArguments;

      nextArguments = () => shorthand;
    }

    if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(superArguments)) {
      const shorthand = superArguments;

      superArguments = () => shorthand;
    }

    if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.test(instanceArguments)) {
      const shorthand = instanceArguments;

      instanceArguments = () => shorthand;
    } // Validate


    _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.validate(nextArguments);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.validate(superArguments);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.validate(instanceArguments); // Store

    nextArgs = _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].array.validate(nextArguments(...currentArguments))[0];
    getSuperArgsList[i] = superArguments;
    instanceArgsList[i] = _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].array.validate(instanceArguments(...currentArguments))[0];
  } // Return for use by super-chain and instance function iteration.


  return {
    nextArgs,
    getSuperArgsList,
    instanceArgsList
  };
}

;

function doInstance(layers, instanceArgsList) {
  // Loop forwards over instance functions.
  for (let i = 0; i < layers.length; i++) {
    // Pass the instance inputs from the respective intercept function.
    layers[i].instance.call(this, ...instanceArgsList[i]);
  }
}

; // INTERFACE

const dynamicClass = new _validation_interface_js__WEBPACK_IMPORTED_MODULE_4__["SymbolInterface"]({
  layers: value => customRules.layers.test(value)
}); // FACTORIES
// Stored directly on the dynamicClass interface for ease of access.

_object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(dynamicClass, {
  baseCreate(...args) {
    const {
      name,
      layers
    } = processArguments(...args);
    const Parent = getParent(layers);
    const isChild = Parent !== undefined; // Freeze the layers so that they cannot be further modified.
    //G If augmentation is desired it should be done non-destructively by adding to the layers array.

    for (const layer of layers) {
      Object.freeze(layer);
    } // DEFINITION
    //R class syntax was necessary because it doesn't seem possible to replicate the non-callable nature of classes without using a Proxy.
    //R This ensures that no undiscovered differences slip by.
    //R Definition still had to be duplicated because optional extension and super calls don't seem possible.


    let Class;

    if (isChild) {
      Class = {
        [name]: class extends Parent {
          constructor(...args) {
            const layers = Class[dynamicClass.keys.layers]; // INTERCEPT

            const {
              nextArgs,
              getSuperArgsList,
              instanceArgsList
            } = doIntercept.call(null, args, layers); // SUPER
            // Once all layers have intercepted, pass the nextArguments (from the highest layer) to its getSuperArguments function.

            let superArguments = nextArgs; // Loop forwards over getSuperArguments functions.

            for (let i = 0; i < layers.length; i++) {
              const currentSuperArguments = superArguments; // Set the next superArguments

              superArguments = _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].array.validate(getSuperArgsList[i](...currentSuperArguments))[0];
            }

            super(...superArguments); // INSTANCE

            doInstance.call(this, layers, instanceArgsList);
          }

        }
      }[name];
    } else {
      Class = {
        [name]: class {
          constructor(...args) {
            const layers = Class[dynamicClass.keys.layers]; // INTERCEPT

            const {
              instanceArgsList
            } = doIntercept.call(null, args, layers); // INSTANCE

            doInstance.call(this, layers, instanceArgsList);
          }

        }
      }[name];
    } // STORE PARTS
    //R The reason class parts are stored on the class then referenced directly instead of with a closure is to make augmentation easier. Augmenting with closures only was turning out to be a hassle and complicated how the 'augmentation' tree would be preserved. Mutating the class parts directly is much easier to reason about. This way the constructor parts can be modified while also keeping the reference to the same class.


    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].hiddenProperty(Class, {
      [dynamicClass.keys.layers]: layers
    });
    /* //G//!
    	The 'duper' parameter should replace uses of 'super' in methods.
    	Unlike 'super', 'duper' can also be used on regular functions.
    			Because 'duper' is a closure, it is a valid replacement for 'super' because they both are not dynamic. 
    	The object that they reference does not change even if the method assigned on a different object.
    			If a dynamic behavior is desired, use Object.getPrototypeOf(Object.getPrototypeOf(this)); instead.
    */
    //TODO consider not putting duper in an options container, I don't believe there should be any more arguments

    for (const layer of layers) {
      // PROTOTYPE
      layer.prototype.call(Class.prototype, {
        duper: Object.getPrototypeOf(Class.prototype)
      }); // STATIC

      layer.static.call(Class, {
        duper: Object.getPrototypeOf(Class)
      });
    }

    return Class;
  },

  /* //R
  	The augmentation function exists for two main reasons:
  	It brings any closure setup back inside to the single function call.
  	It removes the risk of implementing the augmentation wrong (say by forgetting to use a closure and instead referencing the class that is being mutated, this would cause a recursive function).
  
  	//! If a layers' intercept function discards arguments, layers above it won't be able to recover them.
  	//G The safest way is to always return the same signature.
  */
  baseAugment(Class, ...args) {
    const currentParent = Object.getPrototypeOf(Class);
    const [newLayers] = customRules.layers.validateCast(args);
    const newLayersParent = getParent(newLayers); // Ensure new layers do not extend a different class.

    if (!(newLayersParent === undefined || newLayersParent === currentParent)) {
      throw new Error('Cannot augment class to extend another class.');
    } // New prototype and static parts must be called immediately, as they are only called once when the class is created.
    //! There is a chance that the class may have been modified between creation and augmentation, avoid doing this as it could create inconsistencies when augmenting.


    for (const newLayer of newLayers) {
      // PROTOTYPE
      newLayer.prototype.call(Class.prototype, {
        duper: Object.getPrototypeOf(Class.prototype)
      }); // STATIC

      newLayer.static.call(Class, {
        duper: Object.getPrototypeOf(Class)
      });
    }

    Class[dynamicClass.keys.layers].push(...newLayers);
    return Class;
  }

}); // SHORT-HAND WRAPPERS

function wrapParts(layers, keyWrapperPairs) {
  const [newLayers] = customRules.layers.validateCast(layers);
  return newLayers.map(layer => {
    // Clone the layer to avoid mutation.
    const newLayer = { ...layer
    };

    for (const [key, wrapper] of keyWrapperPairs) {
      // Create a closure for the layer part.
      const part = newLayer[key]; // Validate layer part and wrapper.

      customRules[key].validate(part);
      _validation_index_js__WEBPACK_IMPORTED_MODULE_3__["rules"].func.validate(wrapper); // Replace the part.

      newLayer[key] = function (...args) {
        return wrapper.call(this, part, ...args);
      };
    } // Replace the layer.


    return newLayer;
  });
}

;

function baseVanillaShorthandWrapper(part, enumerableCondition, ...args) {
  var _part$call;

  const transfers = (_part$call = part.call(this, ...args)) !== null && _part$call !== void 0 ? _part$call : {};
  Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(transfers, (transfers, key) => {
    const descriptor = Object.getOwnPropertyDescriptor(transfers, key);
    /* force descriptors
    	writable:     true (data descriptors) - fresh assignment
    	configurable: true                    - fresh assignment
    	enumerable:   conditional (
    		instance value:     enumerable    - fresh assignment, 
    												[[Define]] semantics of the class fields proposal
    		instance function:  enumerable    ~ object literal declaration (both functions and methods),
    												same as instance value
    		instance accessor:  enumerable    ~ object literal declaration
    												same as instance value
    				prototype value:    nonEnumerable ~ same as method and accessor
    		prototype function: nonEnumerable - class method
    		prototype accessor: nonEnumerable - class accessor
    				static value:       enumerable    - static class field of the class fields proposal
    		static function:    nonEnumerable - static class method
    		static accessor:    nonEnumerable - static accessor
    	)
    */

    if (descriptor.writable === false) descriptor.writable = true;
    descriptor.configurable = true;
    descriptor.enumerable = enumerableCondition(descriptor);
    Object.defineProperty(this, key, descriptor);
  });
}

;

function instanceVanillaShorthandWrapper(part, ...args) {
  return baseVanillaShorthandWrapper.call(this, part, () => true, ...args);
}

;

function prototypeVanillaShorthandWrapper(part, ...args) {
  return baseVanillaShorthandWrapper.call(this, part, () => false, ...args);
}

;

function staticVanillaShorthandWrapper(part, ...args) {
  return baseVanillaShorthandWrapper.call(this, part, descriptor => descriptor.writable !== undefined && typeof descriptor.value !== 'function', ...args);
}

;

function applyVanillaShorthandWrappers(layer) {
  return wrapParts(layer, [['instance', instanceVanillaShorthandWrapper], ['prototype', prototypeVanillaShorthandWrapper], ['static', staticVanillaShorthandWrapper]]);
}

; // SHORT-HAND FACTORIES

_object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(dynamicClass, {
  /* Enables the use of shorthand return objects for layer parts.
  	//R These functions use 'vanilla' shorthands, which try to stay as close to the native class behavior as possible. This is so that converting between vanilla classes and dynamic classes is as easy as possible.
  	//G If a different set of shorthands are desired, create new functions that mutate the layers array similar to the applyVanillaShorthandWrappers function.
  */
  create(...args) {
    const {
      name,
      layers
    } = processArguments(...args);
    const wrappedLayers = applyVanillaShorthandWrappers(layers);
    return dynamicClass.baseCreate(name, ...wrappedLayers);
  },

  augment(Class, ...layers) {
    const wrappedLayers = applyVanillaShorthandWrappers(layers);
    return dynamicClass.baseAugment(Class, ...wrappedLayers);
  }

});
/* harmony default export */ __webpack_exports__["default"] = (dynamicClass);

/***/ }),

/***/ "./source/shared/utility/format-ms.js":
/*!********************************************!*\
  !*** ./source/shared/utility/format-ms.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//TODO Unused
//TODO Format hours, days, etc.
/* harmony default export */ __webpack_exports__["default"] = (function (ms) {
  // extract
  var minutes = Math.floor(ms / 60000);
  var seconds = Math.ceil(ms % 60000); // format

  seconds = ('0' + seconds).slice(-2); // returns ...0:00 format rounded up to the nearest second

  return minutes + ':' + seconds;
});

/***/ }),

/***/ "./source/shared/utility/index.js":
/*!****************************************!*\
  !*** ./source/shared/utility/index.js ***!
  \****************************************/
/*! exports provided: any, asyncMap, dynamicSort, one, stableSort, deepCompare, define, forKeysOf, getKeysOf, pick, capitalizeFirstCharacter, escapeRegExp, spaceIndented, tabIndented, replaceAll, setTimer, wait, appendQueryParameters, encodeProperties, decodeProperties, encodeList, decodeList, rules, flexTest, Interface, SymbolInterface, Rule, boolCatch, clamp, combinations, Deferred, dynamicClass, formatMs, constants, keyCode, reference, repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array/index.js */ "./source/shared/utility/array/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncMap", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicSort", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicSort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "one", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["one"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"]; });

/* harmony import */ var _object_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/index.js */ "./source/shared/utility/object/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["deepCompare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["define"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["forKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["getKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"]; });

/* harmony import */ var _string_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string/index.js */ "./source/shared/utility/string/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstCharacter", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["capitalizeFirstCharacter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["escapeRegExp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spaceIndented", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["spaceIndented"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tabIndented", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["tabIndented"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["replaceAll"]; });

/* harmony import */ var _time_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time/index.js */ "./source/shared/utility/time/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimer", function() { return _time_index_js__WEBPACK_IMPORTED_MODULE_3__["setTimer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return _time_index_js__WEBPACK_IMPORTED_MODULE_3__["wait"]; });

/* harmony import */ var _uri_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uri/index.js */ "./source/shared/utility/uri/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendQueryParameters", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["appendQueryParameters"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeProperties", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["encodeProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeProperties", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["decodeProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeList", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["encodeList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeList", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["decodeList"]; });

/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rules", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["rules"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flexTest", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["flexTest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["SymbolInterface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["Rule"]; });

/* harmony import */ var _bool_catch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bool-catch.js */ "./source/shared/utility/bool-catch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolCatch", function() { return _bool_catch_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _clamp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clamp.js */ "./source/shared/utility/clamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _clamp_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _combinations_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./combinations.js */ "./source/shared/utility/combinations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combinations", function() { return _combinations_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _deferred_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./deferred.js */ "./source/shared/utility/deferred.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Deferred", function() { return _deferred_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _dynamic_class_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dynamic-class.js */ "./source/shared/utility/dynamic-class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicClass", function() { return _dynamic_class_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _format_ms_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./format-ms.js */ "./source/shared/utility/format-ms.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatMs", function() { return _format_ms_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./constants.js */ "./source/shared/utility/constants.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "constants", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_12__; });
/* harmony import */ var _key_code_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./key-code.js */ "./source/shared/utility/key-code.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "keyCode", function() { return _key_code_js__WEBPACK_IMPORTED_MODULE_13__; });
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./reference.js */ "./source/shared/utility/reference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return _reference_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./repeat.js */ "./source/shared/utility/repeat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return _repeat_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

// NESTED





 // LOCAL








 //TODO constants aren't exported, find an elegant way to do this.






/***/ }),

/***/ "./source/shared/utility/key-code.js":
/*!*******************************************!*\
  !*** ./source/shared/utility/key-code.js ***!
  \*******************************************/
/*! exports provided: characters, create, addTo, verify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "characters", function() { return characters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTo", function() { return addTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verify", function() { return verify; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");
/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repeat.js */ "./source/shared/utility/repeat.js");


const packRule = new _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.validate(value);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(value.key);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(value.timestamp);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(value.timeout);
  }

});
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function create(length = 10) {
  // Validate input.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(length); // Create.

  let key = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    key += characters.charAt(index);
  } // Validate output.


  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(key); // Return.

  return key;
}
;
const defaultTimeout = 300000; // 5 minutes

const tryLimit = 1000; // Adds a new unique key to the list, returns a pack {key, timeout, timestamp}

function addTo(list, timeout = defaultTimeout) {
  // Validate inputs.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(list);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(timeout); // Create.

  const key = Object(_repeat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(() => create(), {
    until: key => !list.includes(key),
    countout: tryLimit,

    onCountout() {
      throw new Error(`Failed to add key to list, took over ${tryLimit} tries.`);
    }

  });
  const timestamp = Date.now();
  const pack = {
    key,
    timestamp,
    timeout: timestamp + timeout
  }; // Validate output.

  packRule.validate(pack); // Return.

  list.push(pack);
  return pack;
}
; // Checks if a list has a key. Cleans up timed-out keys.

function verify(list, key) {
  // Validate inputs.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(list);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(key); // Iterate over list.

  for (let i = list.length - 1; i >= 0; i--) {
    const pack = list[i]; // Validate items in the list.

    packRule.validate(pack); // Determine if item has timed out.

    const fresh = pack.timeout > Date.now();

    if (pack.key === key) {
      // If key matches,
      if (fresh) {
        // and it hasn't timed out, remove the pack from the list and return it,
        return list.splice(i, 1)[0];
      } else {
        // else throw a timeout error.
        throw new Error('Key timed out.');
      }
    } else {
      // Remove non-matching packs if they've timed out.
      if (!fresh) {
        list.splice(i, 1);
      }
    }
  } // If the key isn't found, throw an error.


  throw new Error('Invalid key.');
}
;

/***/ }),

/***/ "./source/shared/utility/object/deep-compare.js":
/*!******************************************************!*\
  !*** ./source/shared/utility/object/deep-compare.js ***!
  \******************************************************/
/*! exports provided: defaultOptions, default, compareUnorderedArrays */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deepCompare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareUnorderedArrays", function() { return compareUnorderedArrays; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");


const compareDeeper = function (a, b, options) {
  const {
    depth
  } = options;
  return deepCompare(a, b, { ...options,
    depth: depth - 1
  });
};

const logDifferenceFunction = function (key, aValue, bValue) {
  console.log(`deepCompare property difference - ${key}: ${aValue}, ${bValue}`);
};

const defaultOptions = {
  //C 0 based, will call depth+1 layers of comparisons
  depth: 1,
  //C used for custom comparisons (like un-ordered lists)
  //! do not use a compare function that is or contains deepCompare, else falsy comparisons will run deepCompare twice per property
  compareFunction: compareUnorderedArrays = (a, b) => a === b,
  //C used to compare object keys with specific attributes (enumerable, symbol, inherited, etc.)
  //C used for custom key selection (inherited, enumerable, symbol, etc.)
  selectFunction: Object.keys,
  //C true:  compare selected key-values on x to the same key-values anywhere on y
  //C false: compare selected key-values on x to the same key-values selected on y
  anywhere: false,
  //C true:  compares a against b 
  //C false: compares a against b and b against a
  //? what if subsetting needs to stop a specific depth?
  //R no need to specify dual-subset, because then a and b would be identical sets, which is equivalent to specifying no subset
  subset: false,
  //C compare result for values that are too deep
  resultIfTooDeep: false,
  logDifference: false
};
function deepCompare(a, b, options = {}) {
  const {
    depth,
    compareFunction,
    selectFunction,
    anywhere,
    subset,
    resultIfTooDeep,
    logDifference
  } = { ...defaultOptions,
    ...options
  }; // limit to depth

  if (depth < 0) return resultIfTooDeep; // compare values

  if (compareFunction(a, b, options)) return true; // compare properties

  if (_validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.test(a) && _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.test(b)) {
    let result = true; // selected keys

    const aSelectedKeys = selectFunction(a);
    const bSelectedKeys = selectFunction(b); //C compare all selected key-values of a to the same (any or selected) key-value of b

    for (const key of aSelectedKeys) {
      const aValue = a[key];
      const bValue = anywhere || bSelectedKeys.includes(key) ? b[key] : undefined;

      if (!compareDeeper(aValue, bValue, options)) {
        result = false;
        if (logDifference) logDifferenceFunction(key, aValue, bValue);
      }
    }

    if (!subset) {
      //C compare remaining selected key-values of b to the same (any or non-existent) key-value of a
      //C compare 
      //R prevents shared selected keys from being compared twice
      for (const key of bSelectedKeys) {
        if (!aSelectedKeys.includes(key)) {
          //C exclude shared selected keys
          //C no need to check for the same selected key in a, they have been excluded
          const aValue = anywhere ? a[key] : undefined;
          const bValue = b[key]; //! value order is not flipped, this would cause the subset to go both ways

          if (!compareDeeper(aValue, bValue, options)) {
            result = false;
            if (logDifference) logDifferenceFunction(key, aValue, bValue);
          }
        }
      }
    }

    return result;
  }

  return false;
}
; // COMPARE FUNCTIONS

function compareUnorderedArrays(a, b, options) {
  //R The 'anywhere' option isn't relevant here because arrays cannot inherit index properties. (Even with a replaced prototype, deleted 'hole', etc.)
  // If a and b are arrays:
  if (_validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(a) && _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(b)) {
    // Match if:
    let result = true; // All items of a exist in b.

    if (a.some(item => !b.includes(item))) result = false; // And if not a subset comparison.

    if (!subset) {
      // All items of b exist in a.
      if (b.some(item => !a.includes(item))) result = false;
    }

    return result;
  } else {
    // Use the default compare function.
    return defaultOptions.compareFunction(a, b, options);
  }
}
; //L diagrams: https://www.figma.com/file/57kSw6SaPX3qJUSdzMpfJo/Object-Property-Locations-Comparison?node-id=0%3A1

/* differences from original
	renamed to 'deepCompare'
	deep option removed
	depth decreased by 1 (depth 0 now compares a, b; depth 1 compares a.foo, b.foo, and so on)
	top-level NaN equality removed
	renamed matchIfTooDeep to resultIfTooDeep
	renamed matchIfSubset to subset
	no-longer compares against b keys from anywhere by default, set anywhere: true, otherwise just compares against same selection from b
*/

/***/ }),

/***/ "./source/shared/utility/object/define.js":
/*!************************************************!*\
  !*** ./source/shared/utility/object/define.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* //! Duplicated functionality avoid circular dependencies:
	keys-of.js,
	../validation/rules/objects/object.js,
	../validation/rules/functions.js,
*/
const ownKeys = function (object) {
  //! Duplicated from keys-of.js
  return [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
}; //C define is a container for less verbose versions of Object.defineProperty()
//G if modifications are required, write a different define function

/* //R
	Initially thought it would be useful to have configurable (loose) constants and non-configurable variables. However:

	{writable: true, configurable: false} (permanent variable)
	These don't function as desired, because even when configurable is set to false, writable can be changed from true to false.
	//L https://stackoverflow.com/questions/52892105/why-configurablefalse-allows-to-change-writable-flag-but-doesnt-for-enumerable

	{writable: false, configurable: true} (loose constant)
	These don't really have a use-case and only existed to form a clean pair with permanent variables, and therefore have also been excluded.
*/


/* harmony default export */ __webpack_exports__["default"] = ({
  // Guaranteed to be constant.
  constant(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: false,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  // Same as object property assignment. //! Can be set to {writable: false}
  property(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: true,
        enumerable: true,
        configurable: true
      });
    }

    return target;
  },

  // Guaranteed to be variable. //! Has an accessor-descriptor.
  variable(target, properties) {
    for (const key of ownKeys(properties)) {
      let closureValue = properties[key];
      Object.defineProperty(target, key, {
        get() {
          return closureValue;
        },

        set(value) {
          closureValue = value;
        },

        enumerable: true,
        configurable: false
      });
    }
  },

  // Non-enumerable versions.
  hiddenConstant(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: false,
        enumerable: false,
        configurable: false
      });
    }

    return target;
  },

  hiddenProperty(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: true,
        enumerable: false,
        configurable: true
      });
    }

    return target;
  },

  hiddenVariable(target, properties) {
    for (const key of ownKeys(properties)) {
      let closureValue = properties[key];
      Object.defineProperty(target, key, {
        get() {
          return closureValue;
        },

        set(value) {
          closureValue = value;
        },

        enumerable: false,
        configurable: false
      });
    }
  },

  getter(target, properties) {
    for (const key of ownKeys(properties)) {
      // enforce getter, strip setter
      const {
        get
      } = Object.getOwnPropertyDescriptor(properties, key);
      if (typeof get !== 'function') throw new Error('getter property is missing a getter function');
      Object.defineProperty(target, key, {
        get,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  setter(target, properties) {
    for (const key of ownKeys(properties)) {
      // enforce setter, strip getter
      const {
        set
      } = Object.getOwnPropertyDescriptor(properties, key);
      if (typeof set !== 'function') throw new Error('setter property is missing a setter function');
      Object.defineProperty(target, key, {
        set,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  accessor(target, properties) {
    for (const key of ownKeys(properties)) {
      // enforce getter and setter
      const {
        get,
        set
      } = Object.getOwnPropertyDescriptor(properties, key);
      const noGetter = typeof get !== 'function';
      const noSetter = typeof set !== 'function';

      if (noGetter || noSetter) {
        throw new Error(`accessor property ${key} is missing a ${noGetter ? 'getter' : ''} ${noGetter && noSetter ? 'and' : ''} ${noSetter ? 'setter' : ''} function`);
      }

      Object.defineProperty(target, key, {
        get,
        set,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  identity(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(properties, key));
    }

    return target;
  },

  validatedVariable(target, properties) {
    //? It doesn't seem possible to modify this variable's descriptor to writable: false, because its not a data property. Wouldn't this make it even more variable-like than a variable it self? Maybe consider this approach for a 'guaranteed variable'? Then consider renaming define.variable to define.property.
    for (const key of ownKeys(properties)) {
      const config = properties[key]; //! Duplicated from ../validation/rules/objects/object.js

      if (config === null || !(typeof config === 'object' || typeof config === 'function')) {
        throw new Error('Config is not an object.');
      }

      const validator = config.validator; //! Duplicated from ../validation/rules/functions.js

      if (typeof validator !== 'function') {
        throw new Error('Validator is not a function.');
      } // Create a closure value for the accessor.


      let closureValue = config.value; // Validate the initial value.
      //R Without the setter because these functions use 'define' semantics.

      validator(closureValue);
      Object.defineProperty(target, key, {
        get() {
          return closureValue;
        },

        set(value) {
          validator(value);
          closureValue = value;
        },

        enumerable: true,
        configurable: false
      });
    }
  }

});

/***/ }),

/***/ "./source/shared/utility/object/index.js":
/*!***********************************************!*\
  !*** ./source/shared/utility/object/index.js ***!
  \***********************************************/
/*! exports provided: deepCompare, define, forKeysOf, getKeysOf, pick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deep_compare_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deep-compare.js */ "./source/shared/utility/object/deep-compare.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return _deep_compare_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./define.js */ "./source/shared/utility/object/define.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _define_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _keys_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys-of.js */ "./source/shared/utility/object/keys-of.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_2__["forKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"]; });

/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pick.js */ "./source/shared/utility/object/pick.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _pick_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/shared/utility/object/keys-of.js":
/*!*************************************************!*\
  !*** ./source/shared/utility/object/keys-of.js ***!
  \*************************************************/
/*! exports provided: forKeysOf, getKeysOf, forOwnKeysOf, getOwnKeysOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return forKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return getKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forOwnKeysOf", function() { return forOwnKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnKeysOf", function() { return getOwnKeysOf; });
/* harmony import */ var _validation_flex_test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/flex-test.js */ "./source/shared/utility/validation/flex-test.js");
/* harmony import */ var _validation_rules_objects_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/rules/objects/object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _validation_rules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validation/rules/functions.js */ "./source/shared/utility/validation/rules/functions.js");
// forKeysOf calls a function for all keys of an object that match the specified attributes.
// getKeysOf returns an array of  all keys of an object that match the specified attributes and filter.
// Attributes default to own, named, enumerable keys. This is the same as Object.keys().
//! Duplicated code in define.js to remove a circular dependency.
 // Importing directly instead of from ../validation/rules/index.js to avoid circular reference.



const rules = {
  object: _validation_rules_objects_object_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  func: _validation_rules_functions_js__WEBPACK_IMPORTED_MODULE_2__["func"]
};
function forKeysOf(object, optionsOrCallback = {}) {
  // OPTIONS / VALIDATION
  const options = typeof optionsOrCallback === 'function' ? {
    callback: optionsOrCallback
  } : optionsOrCallback;
  rules.object.validate(object);
  rules.object.validate(options);
  const {
    own = true,
    inherited = false,
    named = true,
    symbol = false,
    enumerable = true,
    nonEnumerable = false,
    callback = () => {}
  } = options;
  rules.func.validate(callback); // OWN / INHERITED

  const chain = [];
  if (own) chain.push(object);

  if (inherited) {
    let target = Object.getPrototypeOf(object);

    while (target !== null) {
      chain.push(target);
      target = Object.getPrototypeOf(target);
    }
  }

  const visitedKeys = [];

  for (const target of chain) {
    const targetKeys = []; // NAMED / SYMBOL

    if (named) targetKeys.push(...Object.getOwnPropertyNames(target));
    if (symbol) targetKeys.push(...Object.getOwnPropertySymbols(target));

    for (const targetKey of targetKeys) {
      // ENUMERABLE / NON-ENUMERABLE
      const isEnumerable = Object.prototype.propertyIsEnumerable.call(target, targetKey);
      const keyMatchesAttributes = enumerable && isEnumerable || nonEnumerable && !isEnumerable; // UNIQUE

      if (keyMatchesAttributes && !visitedKeys.includes(targetKey)) {
        // Don't iterate over the same key more than once.
        visitedKeys.push(targetKey); // Execute callback.

        callback(target, targetKey);
      }
    }
  }
}
;
function getKeysOf(object, optionsOrFilter = {}) {
  // OPTIONS / VALIDATION
  const options = typeof optionsOrFilter === 'function' ? {
    filter: optionsOrFilter
  } : optionsOrFilter;
  rules.object.validate(object);
  rules.object.validate(options);
  const {
    filter = (object, key) => true,
    ...rest
  } = options;
  rules.func.validate(filter); // ARRAY

  const keys = []; // undefined & null return empty array

  if (object == null) return keys; // FILTER

  forKeysOf(object, {
    callback(object, key) {
      if (Object(_validation_flex_test_js__WEBPACK_IMPORTED_MODULE_0__["default"])(filter, object, key)) {
        keys.push(key);
      }
    },

    ...rest
  });
  return keys;
}
;
const own = {
  own: true,
  named: true,
  symbol: true,
  enumerable: true,
  nonEnumerable: true,
  inherited: false
};
function forOwnKeysOf(object, callback) {
  return forKeysOf(object, { ...own,
    callback
  });
}
;
function getOwnKeysOf(object, filter) {
  return getKeysOf(object, { ...own,
    filter
  });
}
;

/***/ }),

/***/ "./source/shared/utility/object/pick.js":
/*!**********************************************!*\
  !*** ./source/shared/utility/object/pick.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Copies all non-undefined properties of an object onto a new object.
//! Invokes getters.
//! Does not copy descriptors.
//! Copies inherited properties directly onto the new object.
//R Why not use destructuring?
//R It wouldn't be possible to store a preset list of properties to pick.

/* harmony default export */ __webpack_exports__["default"] = (function (oldObject, keys) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.validate(oldObject);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(keys); //R Keys can be anything, and will be converted to the proper format.

  const newObject = {};

  for (const key of keys) {
    const value = oldObject[key];
    if (value !== undefined) newObject[key] = value;
  }

  return newObject;
});
;

/***/ }),

/***/ "./source/shared/utility/reference.js":
/*!********************************************!*\
  !*** ./source/shared/utility/reference.js ***!
  \********************************************/
/*! exports provided: Reference, default, formReferences, extractValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formReferences", function() { return formReferences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractValues", function() { return extractValues; });
class Reference {
  constructor(value) {
    this.value = value;
    Object.seal(this);
  }

}
;
/* harmony default export */ __webpack_exports__["default"] = (Reference);
function formReferences(values) {
  return values.map(item => item instanceof Reference ? item : new Reference(item));
}
;
function extractValues(references) {
  return references.map(item => item instanceof Reference ? item.value : item);
}
;

/***/ }),

/***/ "./source/shared/utility/repeat.js":
/*!*****************************************!*\
  !*** ./source/shared/utility/repeat.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");

/**
 * Repeats a function until a condition is met or the call times-out or counts-out.
 * Guaranteed to call the function at least once.
 * 
 * @param {Function} func               - Function to repeat.
 * @param {Object}   options
 * @param {Function} options.until      - Condition upon which the function will stop.
 * @param {number}   options.timeout    - Number of milliseconds the function may repeat for.
 * @param {number}   options.countout   - Number of times the function may execute.
 * @param {Function} options.onTimeout  - Called when repeat times out.
 * @param {Function} options.onCountout - Called when repeat counts out.
 */

function repeat(func, options = {}) {
  const {
    until = result => false,
    timeout = Infinity,
    countout = Infinity,
    onTimeout = result => {
      throw new Error('Repeat function call timed out.');
    },
    onCountout = result => {
      throw new Error('Repeat function call counted out.');
    }
  } = options;
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(func);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(until);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeNumber.validate(timeout); // >= 0

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].positiveNumber.validate(countout); // >= 1

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onTimeout);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onCountout);
  let result;
  let counter = 0;
  let time = Date.now();
  const timeLimit = time + timeout;
  const countLimit = Math.floor(countout);

  while (true) {
    result = func(result); //R Evaluating until(result) after function instead of as the while condition because it wouldn't make sense to evaluate 'until' before the function has run. This way the function is guaranteed to run at least once.

    if (until(result)) break; // Update 

    time = Date.now();
    counter++;

    if (time >= timeLimit) {
      onTimeout(result);
      break;
    }

    if (counter >= countLimit) {
      onCountout(result);
      break;
    }
  }

  return result;
}

; // Async Variation

repeat.sync = repeat;

repeat.async = async function (func, options = {}) {
  const {
    until = result => false,
    // Condition upon which the function will stop.
    timeout = Infinity,
    // Number of milliseconds the function may repeat for.
    countout = Infinity,
    // Number of times the function may execute.
    onTimeout = result => {
      throw new Error('Repeat function call timed out.');
    },
    onCountout = result => {
      throw new Error('Repeat function call counted out.');
    }
  } = options;
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(func);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(until);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeNumber.validate(timeout); // >= 0

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].positiveNumber.validate(countout); // >= 1

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onTimeout);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onCountout);
  let result;
  let counter = 0;
  let time = Date.now();
  const timeLimit = time + timeout;
  const countLimit = Math.floor(countout);

  while (true) {
    result = await func(result); //R Evaluating until(result) after function instead of as the while condition because it wouldn't make sense to evaluate 'until' before the function has run. This way the function is guaranteed to run at least once.

    if (await until(result)) break; // Update 

    time = Date.now();
    counter++;

    if (time >= timeLimit) {
      await onTimeout(result);
      break;
    }

    if (counter >= countLimit) {
      await onCountout(result);
      break;
    }
  }

  return result;
};

/* harmony default export */ __webpack_exports__["default"] = (repeat);

/***/ }),

/***/ "./source/shared/utility/string/capitalize-first-character.js":
/*!********************************************************************!*\
  !*** ./source/shared/utility/string/capitalize-first-character.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

/***/ }),

/***/ "./source/shared/utility/string/escape-reg-exp.js":
/*!********************************************************!*\
  !*** ./source/shared/utility/string/escape-reg-exp.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (string) {
  //L from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
});
;

/***/ }),

/***/ "./source/shared/utility/string/indented-template.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/string/indented-template.js ***!
  \***********************************************************/
/*! exports provided: tabIndented, spaceIndented */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabIndented", function() { return tabIndented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spaceIndented", function() { return spaceIndented; });
const tabIndented = (strings, ...expressions) => indented(strings, expressions, '	');
const spaceIndented = (strings, ...expressions) => indented(strings, expressions, ' ');

function indented(stringsFrozen, expressions, indentCharacter) {
  let strings = [...stringsFrozen];
  const firstIndex = 0;
  const lastIndex = strings.length - 1; // If the template ends with a new-line character followed by zero or many indent characters, remove those characters.

  strings[lastIndex] = strings[lastIndex].replace(new RegExp(`\n${indentCharacter}*$`), ''); // Match indents.

  const indents = [];

  for (const string of strings) {
    /* Matches 0 or many indent characters.
    	- Following a new-line. 
    	- Preceding a non-indent, non-new-line character. 
    		//R Ignores 'indent-only' lines.
    	
    	//R Don't follow start (^) or precede end ($), because otherwise indentation characters in single line strings and strings between variables will get matched.
    */
    const matches = string.match(new RegExp(`(?<=\n)(${indentCharacter}*)(?=[^${indentCharacter}\n])`, 'g'));
    if (matches !== null) indents.push(...matches);
  } // Get the smallest indent amount.


  let smallestIndentAmount = Math.min(...indents.map(indent => indent.length));
  if (smallestIndentAmount === Infinity) smallestIndentAmount = 0; // Remove smallest indent from all lines.

  /* Matches the smallest indent.
  	- Following a new line.
  	//! Not required to precede a non-indent or non-new-line character. This ensures 'excessively-indented' and 'indent-only' lines can be matched and only have part of their indentation removed.
  */

  strings = strings.map(string => string.replace(new RegExp(`(?<=\n)(${indentCharacter}{${smallestIndentAmount}})`, 'g'), ''));
  /* Remove leading newline if it exists.
  	//R Must happen after removing indentation, because it is required to identify the first line's indentation.
  	//R Must happen before construction, because otherwise a newline could be removed from a leading expression.	
  */

  strings[firstIndex] = strings[firstIndex].replace(new RegExp(`^\n`), '');
  /* Construct template.
  	//R Must happen after the indentation is removed, because expressions should be considered as using the 'adjusted' indentation.
  */

  let template = '';

  for (let i = 0; i < strings.length; i++) {
    template += strings[i];
    if (expressions[i] !== undefined) template += expressions[i];
  }

  return template;
}

;

/***/ }),

/***/ "./source/shared/utility/string/index.js":
/*!***********************************************!*\
  !*** ./source/shared/utility/string/index.js ***!
  \***********************************************/
/*! exports provided: capitalizeFirstCharacter, escapeRegExp, spaceIndented, tabIndented, replaceAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capitalize_first_character_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize-first-character.js */ "./source/shared/utility/string/capitalize-first-character.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstCharacter", function() { return _capitalize_first_character_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _escape_reg_exp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./escape-reg-exp.js */ "./source/shared/utility/string/escape-reg-exp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return _escape_reg_exp_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _indented_template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indented-template.js */ "./source/shared/utility/string/indented-template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spaceIndented", function() { return _indented_template_js__WEBPACK_IMPORTED_MODULE_2__["spaceIndented"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tabIndented", function() { return _indented_template_js__WEBPACK_IMPORTED_MODULE_2__["tabIndented"]; });

/* harmony import */ var _replace_all_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./replace-all.js */ "./source/shared/utility/string/replace-all.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _replace_all_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/shared/utility/string/replace-all.js":
/*!*****************************************************!*\
  !*** ./source/shared/utility/string/replace-all.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (input, search, replace) {
  return input.split(search).join(replace);
});
;

/***/ }),

/***/ "./source/shared/utility/time/index.js":
/*!*********************************************!*\
  !*** ./source/shared/utility/time/index.js ***!
  \*********************************************/
/*! exports provided: setTimer, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _set_timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-timer.js */ "./source/shared/utility/time/set-timer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimer", function() { return _set_timer_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _wait_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wait.js */ "./source/shared/utility/time/wait.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return _wait_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./source/shared/utility/time/set-timer.js":
/*!*************************************************!*\
  !*** ./source/shared/utility/time/set-timer.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/rules/index.js */ "./source/shared/utility/validation/rules/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./source/shared/utility/constants.js");
/* //! Differences from setTimeout:
	Delay comes before callback.
	Doesn't accept negative numbers or NaN for the delay.
	Doesn't accept callback arguments. //G Wrap the callback in an arrow function instead.
*/


/**
 * Executes a function after a delay time. 
 * Supports times longer than 2147483647 milliseconds, unlike setTimeout.
 * 
 * @param  {number}   delay - Delay in milliseconds, or Infinity.
 * @param  {function} callback  - Function executed after delay.
 * 
 * @returns {function}        Function that clears the timer.
 */

/* harmony default export */ __webpack_exports__["default"] = (function (delay, callback) {
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNegativeNumber"].validate(delay);
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["func"].validate(callback);

  if (delay === 0) {
    // Execute callback immediately.
    callback(); // Return empty function, as an instantaneous timeout cannot be cleared.

    return function () {};
  }

  if (delay === Infinity) {
    // Never execute the function.
    // Return empty function, as an infinite timeout is effectively cleared already.
    return function () {};
  } // Remainder


  const remainder = delay % _constants_js__WEBPACK_IMPORTED_MODULE_1__["MAX_32_BIT_INTEGER"]; // Quotient

  let overflowChunkCount = BigInt((delay - remainder) / _constants_js__WEBPACK_IMPORTED_MODULE_1__["MAX_32_BIT_INTEGER"]); // Current timeout ID.

  let timeoutId;

  (function nestTimeout() {
    if (overflowChunkCount > 0) {
      // If there are chunks of overflowed time left:
      // Set a timeout for the full chunk of time.
      timeoutId = setTimeout(() => {
        // Upon finishing:
        // Mark the time chunk as 'finished' by reducing the count.
        overflowChunkCount--; // Evaluate the time state again.

        nestTimeout();
      }, _constants_js__WEBPACK_IMPORTED_MODULE_1__["MAX_32_BIT_INTEGER"]);
    } else {
      // Else, there are no chunks of overflowed time left:
      // Set a timeout for the remaining time.
      timeoutId = setTimeout(callback, remainder);
    }
  })();

  return function () {
    clearTimeout(timeoutId);
  };
});
;

/***/ }),

/***/ "./source/shared/utility/time/wait.js":
/*!********************************************!*\
  !*** ./source/shared/utility/time/wait.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _set_timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-timer.js */ "./source/shared/utility/time/set-timer.js");
//G Used for basic async waiting.
//! Cannot be canceled.

/**
 * Asynchronously waits a period of time, then resolves.
 * 
 * @param {number} duration - Time to wait, in milliseconds.
 * 
 * @returns {Promise} Promise that resolves after wait duration.
 */

/* harmony default export */ __webpack_exports__["default"] = (async function (duration) {
  return new Promise(resolve => {
    Object(_set_timer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(duration, () => {
      resolve();
    });
  });
});
;

/***/ }),

/***/ "./source/shared/utility/uri/append-query-parameters.js":
/*!**************************************************************!*\
  !*** ./source/shared/utility/uri/append-query-parameters.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./source/shared/utility/index.js");
// Appends more query parameters to a URL that may or may not already have query parameters.
//TODO Consider fully validating.

/* harmony default export */ __webpack_exports__["default"] = (function (url, ...queryParameters) {
  _index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(url);

  for (const queryParameter of queryParameters) {
    _index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(queryParameter);
  }

  const appendCharacter = url.includes('?') ? '&' : '?';
  return `${url}${appendCharacter}${queryParameters.join('&')}`;
});
;

/***/ }),

/***/ "./source/shared/utility/uri/decode-list.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/uri/decode-list.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decode_properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decode-properties.js */ "./source/shared/utility/uri/decode-properties.js");
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function (encoded) {
  //C decodes a list of encoded objects with '-i' suffixed property keys
  //! any key not matching the format will be discarded
  const indexed = Object(_decode_properties_js__WEBPACK_IMPORTED_MODULE_0__["default"])(encoded);
  const list = [];
  const indexedKeys = Object.keys(indexed);

  for (let i = 0; i < indexedKeys.length; i++) {
    //C validate delimiter
    const delimiterIndex = indexedKeys[i].lastIndexOf('-');

    if (delimiterIndex < 0) {
      break;
    } //C validate index


    const objectIndex = parseInt(indexedKeys[i].slice(delimiterIndex + 1)); //C handles multiple digits & no digits properly

    if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].integer.test(objectIndex)) {
      break;
    } //C get the real key


    const key = indexedKeys[i].slice(0, delimiterIndex);

    if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].object.test(list[objectIndex])) {
      //C if the obj doesn't exist yet, add it with the prop
      list[objectIndex] = {
        [key]: indexed[indexedKeys[i]]
      };
    } else {
      //C otherwise add the prop to the existing object
      list[objectIndex][key] = indexed[indexedKeys[i]];
    }
  }

  return list;
});
;

/***/ }),

/***/ "./source/shared/utility/uri/decode-properties.js":
/*!********************************************************!*\
  !*** ./source/shared/utility/uri/decode-properties.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Decodes every value as a string.
/* harmony default export */ __webpack_exports__["default"] = (function (encodedString) {
  const keyValuePairs = encodedString.split('&');
  const object = {};
  keyValuePairs.forEach(keyValuePair => {
    const [key, value] = keyValuePair.split('=');
    object[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return object;
});
;

/***/ }),

/***/ "./source/shared/utility/uri/encode-list.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/uri/encode-list.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_any_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array/any.js */ "./source/shared/utility/array/any.js");
/* harmony import */ var _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encode-properties.js */ "./source/shared/utility/uri/encode-properties.js");


/* harmony default export */ __webpack_exports__["default"] = (function (list) {
  //C return a string of uri encoded key-value pairs for each property of each item, their keys suffixed with '-[index]'
  //! not called automatically by sj.request() because its useful to see when a encodeList exists as it needs to be unpacked on the other end
  const indexed = {};
  Object(_array_any_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list).forEach((object, index) => {
    Object.keys(object).forEach(key => {
      indexed[`${key}-${index}`] = object[key];
    });
  });
  return Object(_encode_properties_js__WEBPACK_IMPORTED_MODULE_1__["default"])(indexed);
});
;

/***/ }),

/***/ "./source/shared/utility/uri/encode-properties.js":
/*!********************************************************!*\
  !*** ./source/shared/utility/uri/encode-properties.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Encodes values as strings, objects as [object Object] and arrays as comma delimited strings.
/* harmony default export */ __webpack_exports__["default"] = (function (object) {
  return Object.keys(object).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join('&');
});
;

/***/ }),

/***/ "./source/shared/utility/uri/index.js":
/*!********************************************!*\
  !*** ./source/shared/utility/uri/index.js ***!
  \********************************************/
/*! exports provided: appendQueryParameters, encodeProperties, decodeProperties, encodeList, decodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _append_query_parameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./append-query-parameters.js */ "./source/shared/utility/uri/append-query-parameters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendQueryParameters", function() { return _append_query_parameters_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encode-properties.js */ "./source/shared/utility/uri/encode-properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeProperties", function() { return _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _decode_properties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decode-properties.js */ "./source/shared/utility/uri/decode-properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeProperties", function() { return _decode_properties_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _encode_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./encode-list.js */ "./source/shared/utility/uri/encode-list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeList", function() { return _encode_list_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _decode_list_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./decode-list.js */ "./source/shared/utility/uri/decode-list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeList", function() { return _decode_list_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./source/shared/utility/validation/flex-test.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/validation/flex-test.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return flexTest; });
// Executes tests that take either 1 (value) argument or 2 (object, key) arguments with either 1 or 2 arguments. 
// If the test takes 2 arguments but 2 arguments weren't passed, the first argument is simulated as an object property.
//R Using (length === 2 else) rather than (length === 1 else) because otherwise if no arguments are passed undefined[undefined] won't work.
//TODO consider a one-time operation rather than a runtime function
function flexTest(test, ...args) {
  if (test.length === 0) {
    // Pass no arguments if test takes none.
    return test();
  } else if (test.length === 1) {
    let value;

    if (args.length === 0) {
      value = undefined;
    } else if (args.length === 1) {
      value = args[0];
    } else if (args.length === 2) {
      value = args[0][args[1]];
    } else {
      throw new Error(`${args.length} arguments not supported for tests with 1 parameter.`);
    }

    return test(value);
  } else if (test.length === 2) {
    let object;
    let key;

    if (args.length === 2) {
      object = args[0];
      key = args[1];
    } else {
      throw new Error(`${args.length} arguments not supported for tests with 2 parameters.`);
    }

    return test(object, key);
    /* //OLD Value to property simulation.
    	object = Object.create(null);
    	key = Symbol('simulated key');
    	object[key] = value;
    */
  } else {
    throw new Error(`Tests with ${test.length} arguments are not supported.`);
  }
}
;

/***/ }),

/***/ "./source/shared/utility/validation/index.js":
/*!***************************************************!*\
  !*** ./source/shared/utility/validation/index.js ***!
  \***************************************************/
/*! exports provided: rules, flexTest, Interface, SymbolInterface, Rule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rules_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules/index.js */ "./source/shared/utility/validation/rules/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "rules", function() { return _rules_index_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _flex_test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flex-test.js */ "./source/shared/utility/validation/flex-test.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flexTest", function() { return _flex_test_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface.js */ "./source/shared/utility/validation/interface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _interface_js__WEBPACK_IMPORTED_MODULE_2__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return _interface_js__WEBPACK_IMPORTED_MODULE_2__["SymbolInterface"]; });

/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return _rule_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "./source/shared/utility/validation/interface.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/validation/interface.js ***!
  \*******************************************************/
/*! exports provided: Interface, SymbolInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return Interface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return SymbolInterface; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../object/keys-of.js */ "./source/shared/utility/object/keys-of.js");
/* harmony import */ var _flex_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flex-test.js */ "./source/shared/utility/validation/flex-test.js");
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _rules_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules/index.js */ "./source/shared/utility/validation/rules/index.js");






class VirtualInterface extends _rule_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(packs, options = {}) {
    // Throw if a validator option is passed.
    if ('validator' in options) {
      throw new Error('Interface options cannot include a validator, as it will be overwritten with a generated validator for interfaces.');
    }

    const keys = {};
    const tests = {};

    for (const [key, subKey, test] of packs) {
      _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["func"].validate(test); // Store subKeys on instance under their original key so that they can be used for implementations: {[interface.keys.<key>]: implementation}

      keys[key] = subKey; // Freeze the test length property so that it can be relied upon to determine if the [value] or [object, key] parameters should be passed.

      Object.defineProperty(test, 'length', {
        value: test.length,
        writable: false,
        enumerable: false,
        configurable: false
      }); // Store tests on instance, also under their original key.
      // Convert tests to use two arguments.
      //R Converting the tests here preserves the benefit of being able to pass single-argument value tests while also knowing that the stored tests always take two arguments.

      tests[key] = (o, k) => {
        return Object(_flex_test_js__WEBPACK_IMPORTED_MODULE_2__["default"])(test, o, k);
      };
    }

    Object.freeze(keys);
    Object.freeze(tests); // Create an pass validator to Rule constructor.

    super({ // Pass other rule options to Rule.
      ...options,

      // Use a custom validator for interfaces.
      validator(object) {
        _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["object"].validate(object);
        Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(this.tests, (tests, key) => {
          const test = this.tests[key];
          const subKey = this.keys[key];

          if (!test(object, subKey)) {
            throw new Error(`Object does not fully implement interface. Object: ${JSON.stringify(object)}, Key: ${key}, SubKey: ${subKey}`);
          }

          ;
        });
        /* //OLD
        	//R Unnecessarily complicated for a feature that can probably just be permanently set to 'validate'.
        	if (precision === 'validate') {
        		// Validate all keys on object.
        		return testKeys.every((key) => (
        			validate(key)
        		));
        	} else if (precision === 'all') {
        		// All keys are present (or valid).
        		return testKeys.every((key) => (
        			exists(object, key) ||
        			validate(key)
        		));
        	} else if (precision === 'any') {
        		// Any key is present (or valid).
        		return testKeys.some((key) => (
        			exists(object, key) ||
        			validate(key)
        		));
        	} else {
        		throw new Error(`Precision argument must be 'validate', 'all', or 'any'`);
        	}
        */
      }

    });
    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      keys,
      tests
    });
  } // Minimal test to ensure interface property exists in object.


  static exists(object, key) {
    return key in object;
  }

}

;
/*
	Interface and SymbolInterface take a single tests object.

	This tests object should have keys as the interface property names and values as the validator functions for those interface properties.

	Tests have two signatures: (value) and (object, key). 
	When they are stored on the interface.tests object, both signatures will be wrapped in a function with a (object, key) signature.
	
	//G Use tests with the (object, key) signature when the getter for object[key] should not be invoked during validation of the interface.
	//! Be aware that default and rest parameters are not counted. 
	//G Manually re-define the validator.length property if a specific behavior is desired.
	//! The validator.length property will be set to non-configurable when it is passed in.

*/

class Interface extends VirtualInterface {
  // Interface accepts both named and symbol keys. 
  // The same keys must be used for implementations.
  constructor(properties, options) {
    _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["object"].validate(properties);
    const packs = [];
    Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(properties, (properties, key) => {
      const subKey = key;
      const test = properties[key];
      packs.push([key, subKey, test]);
    });
    super(packs, options);
  }

}
;
class SymbolInterface extends VirtualInterface {
  // SymbolInterface creates substitute symbols for ALL interface keys.
  // Implementations must use the substituted symbols as the property keys.
  // This prevents name collision on implementations.
  constructor(properties, options) {
    _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["object"].validate(properties);
    const packs = [];
    Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(properties, (properties, key) => {
      const subKey = Symbol(key); // Create a symbol subKey instead.

      const test = properties[key];
      packs.push([key, subKey, test]);
    });
    super(packs, options);
  }

}
;

/***/ }),

/***/ "./source/shared/utility/validation/rule.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/validation/rule.js ***!
  \**************************************************/
/*! exports provided: Rule, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reference.js */ "./source/shared/utility/reference.js");
/* harmony import */ var _bool_catch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bool-catch.js */ "./source/shared/utility/bool-catch.js");
//TODO consider changing the method name 'validateCast' it is not intuitive that this is the main casting function and that it returns a value. That or make validate return the passed values.
//TODO consider adding the cast modifier onto the end of the validate/test functions like: rule.validate.cast() and rule.test.cast()
//TODO ensure that validate and validateCast both return values
//TODO rename to .validate(), .test(), .cast(), .testCast()
//TODO consider duplicating define here, so that define can use rules



class Rule {
  constructor({
    /* //G 
    	Should do nothing on success, throw on failure.
    	Should have one or many sequential and/or parallel conditions.
    	May be sync or async.
    	
    	If using other rules' validators, use validate() and pass the same arguments.
    */
    validator = function () {
      throw new Error('A validator has not been created for this rule.');
    },

    /* //G
    	Receives Reference instances as its arguments.
    	Should modify Reference instance 'value' property on success, throw on failure.
    	Should have one or many sequential mutations.
    	May be sync or async.
    	//! Caster does not implicitly exclude redundant casts. Ie, for a symbol rule, if x is already a symbol, the caster for the symbol will still execute and throw a type error as symbols cannot be converted to strings. Must include a redundancy check for rules that require it.
    			If using other rules' casters, use validateCast() and pass the same References.
    	Do not pass reference.value and do not set any reference.value as the result of a validateCast(), the nested caster will mutate the passed arguments directly.
    			//! If the References are mutated or passed incorrectly validateCast() may not have the correct value to validate could throw incorrect errors for upstream values: '4' validateCasted to an odd number would fail as 'not a number' instead of 'not odd'.
    */
    caster = function () {},
    //R Indexed reasons, placeholder reasons, etc. should not be used, its too complicated. Just create sub-rules for each failure type or store custom, identifiable errors directly on the rule by including more option properties.
    ...rest
  }) {
    const errors = [];
    if (typeof validator !== 'function') errors.push('validator is not a function');
    if (typeof caster !== 'function') errors.push('caster is not a function');
    if (errors.length > 0) throw new Error(errors.join(' and ')); // store

    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].identity(this, rest);
    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      validator,
      caster
    }); // false when x.constructor.name === 'AsyncFunction'

    const validatorIsSynchronous = this.validator.constructor.name === 'Function';
    const casterIsSynchronous = this.caster.constructor.name === 'Function';

    if (validatorIsSynchronous) {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validate(...args) {
          this.validator(...args);
          return args;
        },

        test(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.validate(...args));
        }

      });
    } else {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        async validate(...args) {
          await this.validator(...args);
          return args;
        },

        async test(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(async () => await this.validate(...args));
        }

      });
    }

    if (validatorIsSynchronous && casterIsSynchronous) {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validateCast(...args) {
          // If call is the entry-point, will convert values to reference-values. If call is nested, nothing will change.
          const references = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["formReferences"])(args);

          try {
            this.caster(...references);
          } catch (e) {} // Suppress casting errors, just get as far as possible.


          const values = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["extractValues"])(references);
          this.validate(...values);
          return values;
        },

        testCast(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.validateCast(...args));
        }

      });
    } else {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        async validateCast(...args) {
          const references = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["formReferences"])(args);

          try {
            await this.caster(...references);
          } catch (e) {}

          const values = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["extractValues"])(references);
          await this.validate(...values);
          return values;
        },

        async testCast(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(async () => await this.validateCast(...args));
        }

      });
    }
  }

}
;
/* harmony default export */ __webpack_exports__["default"] = (Rule);

/***/ }),

/***/ "./source/shared/utility/validation/rules/arrays.js":
/*!**********************************************************!*\
  !*** ./source/shared/utility/validation/rules/arrays.js ***!
  \**********************************************************/
/*! exports provided: array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

const array = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  //L Why not instanceof? - http://web.mit.edu/jwalden/www/isArray.html
  //TODO Doesn't this then apply to all classes? Should all classes use validators like this or just use instanceof?
  validator(value) {
    if (!Array.isArray(value)) {
      throw new Error('Value is not an array.');
    }
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/boolean.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/validation/rules/boolean.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'boolean') {
      throw new Error('Value is not a boolean.');
    }
  },

  caster(reference) {
    reference.value = !!reference.value;
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/constructor.js":
/*!***************************************************************!*\
  !*** ./source/shared/utility/validation/rules/constructor.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    try {
      const Test = class extends value {};
    } catch (e) {
      throw new Error('Value is not a constructor.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/functions.js":
/*!*************************************************************!*\
  !*** ./source/shared/utility/validation/rules/functions.js ***!
  \*************************************************************/
/*! exports provided: func */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "func", function() { return func; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
//L Doesn't seem proper to distinguish async vs sync functions: https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async, async operations can handle sync function returns
// sync func
// async func

const func = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'function') throw new Error('Value is not a function.');
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/http/body.js":
/*!*************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/body.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../strings.js */ "./source/shared/utility/validation/rules/strings.js");


/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (!_strings_js__WEBPACK_IMPORTED_MODULE_1__["string"].test(value)) {
      throw new Error('Request body is not a string.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/http/headers.js":
/*!****************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/headers.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _objects_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../strings.js */ "./source/shared/utility/validation/rules/strings.js");
/* //TODO This isn't 100% complete:
	Are non-enumerable / symbol properties used?
	Are all strings compatible 'ByteString's?
*/
//R Not using the native Header interface here because it doesn't validate header names or values.



/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    _objects_object_js__WEBPACK_IMPORTED_MODULE_1__["default"].validate(value);

    for (const key in value) {
      const headerValue = value[key]; // Header value must be a string.

      _strings_js__WEBPACK_IMPORTED_MODULE_2__["string"].validate(headerValue); // Header name must not be forbidden.
      //L Forbidden header names: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name

      if (key.startsWith('Proxy-')) {
        throw new Error(`The HTTP header ${key} is invalid because it starts with 'Proxy-'`);
      }

      if (key.startsWith('Sec-')) {
        throw new Error(`The HTTP header ${key} is invalid because it starts with 'Sec-'`);
      }

      for (const forbiddenName of ['Accept-Charset', 'Accept-Encoding', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Connection', 'Content-Length', 'Cookie', 'Cookie2', 'Date', 'DNT', 'Expect', 'Feature-Policy', 'Host', 'Keep-Alive', 'Origin', 'Referer', 'TE', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via']) {
        if (key === forbiddenName) {
          throw new Error(`The HTTP header ${key} is forbidden.`);
        }
      }
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/http/index.js":
/*!**************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/index.js ***!
  \**************************************************************/
/*! exports provided: body, headers, queryParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body.js */ "./source/shared/utility/validation/rules/http/body.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "body", function() { return _body_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _headers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headers.js */ "./source/shared/utility/validation/rules/http/headers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headers", function() { return _headers_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _query_parameters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query-parameters.js */ "./source/shared/utility/validation/rules/http/query-parameters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryParameters", function() { return _query_parameters_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./source/shared/utility/validation/rules/http/query-parameters.js":
/*!*************************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/query-parameters.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./source/shared/utility/validation/rules/index.js");
/* harmony import */ var _object_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../object/index.js */ "./source/shared/utility/object/index.js");



/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (!_index_js__WEBPACK_IMPORTED_MODULE_1__["object"].test(value)) {
      throw new Error('Query parameters is not an object.');
    }

    Object(_object_index_js__WEBPACK_IMPORTED_MODULE_2__["forKeysOf"])(value, {
      own: true,
      named: true,
      enumerable: true,
      inherited: false,
      symbol: false,
      nonEnumerable: false,

      callback(obj, key) {
        const parameterValue = obj[key];

        if (!(_index_js__WEBPACK_IMPORTED_MODULE_1__["string"].test(parameterValue) || _index_js__WEBPACK_IMPORTED_MODULE_1__["number"].test(parameterValue) || _index_js__WEBPACK_IMPORTED_MODULE_1__["boolean"].test(parameterValue))) {
          throw new Error(`Query parameter '${key}' is not a string, number, or boolean.`);
        }
      }

    });
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/index.js":
/*!*********************************************************!*\
  !*** ./source/shared/utility/validation/rules/index.js ***!
  \*********************************************************/
/*! exports provided: body, headers, queryParameters, object, populatedObject, array, boolean, constructor, func, key, number, nonNaNNumber, integer, nonNegativeNumber, nonPositiveNumber, positiveNumber, negativeNumber, nonNegativeInteger, nonPositiveInteger, positiveInteger, negativeInteger, string, trimmedString, visibleString, populatedString, symbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _http_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http/index.js */ "./source/shared/utility/validation/rules/http/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "body", function() { return _http_index_js__WEBPACK_IMPORTED_MODULE_0__["body"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headers", function() { return _http_index_js__WEBPACK_IMPORTED_MODULE_0__["headers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryParameters", function() { return _http_index_js__WEBPACK_IMPORTED_MODULE_0__["queryParameters"]; });

/* harmony import */ var _objects_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/index.js */ "./source/shared/utility/validation/rules/objects/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "object", function() { return _objects_index_js__WEBPACK_IMPORTED_MODULE_1__["object"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populatedObject", function() { return _objects_index_js__WEBPACK_IMPORTED_MODULE_1__["populatedObject"]; });

/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrays.js */ "./source/shared/utility/validation/rules/arrays.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "array", function() { return _arrays_js__WEBPACK_IMPORTED_MODULE_2__["array"]; });

/* harmony import */ var _boolean_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boolean.js */ "./source/shared/utility/validation/rules/boolean.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolean", function() { return _boolean_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constructor.js */ "./source/shared/utility/validation/rules/constructor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "constructor", function() { return _constructor_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions.js */ "./source/shared/utility/validation/rules/functions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "func", function() { return _functions_js__WEBPACK_IMPORTED_MODULE_5__["func"]; });

/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./key.js */ "./source/shared/utility/validation/rules/key.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "key", function() { return _key_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _numbers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./numbers.js */ "./source/shared/utility/validation/rules/numbers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "number", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["number"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonNaNNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonNaNNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["integer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonNegativeNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonNegativeNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonPositiveNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonPositiveNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positiveNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["positiveNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "negativeNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["negativeNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonNegativeInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonNegativeInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonPositiveInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonPositiveInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positiveInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["positiveInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "negativeInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["negativeInteger"]; });

/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./strings.js */ "./source/shared/utility/validation/rules/strings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "string", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["string"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trimmedString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["trimmedString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "visibleString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["visibleString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populatedString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["populatedString"]; });

/* harmony import */ var _symbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./symbol.js */ "./source/shared/utility/validation/rules/symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return _symbol_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

//G Include anything here that is possible to implement incorrectly, even for basic types.
//R Rules for basic types are also useful for custom casting, errors, and consistency.











/***/ }),

/***/ "./source/shared/utility/validation/rules/key.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/validation/rules/key.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../object/keys-of.js */ "./source/shared/utility/object/keys-of.js");



const keyify = function (value) {
  // Create a null object with only one property.
  const nullObject = Object.create(null);
  nullObject[value] = true; // Find that only property's key.

  const [keyifiedValue] = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["getKeysOf"])(nullObject, {
    own: true,
    named: true,
    symbol: true,
    enumerable: true,
    nonEnumerable: false,
    inherited: false
  });
  return keyifiedValue;
};

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  // Keys that won't be cast / have already been cast as a result of being used as a property key.
  //! Does not include numbers, those get cast to strings.
  validator(value) {
    const keyifiedValue = keyify(value);

    if (value !== keyifiedValue) {
      throw 'Value is not keyified.';
    }
  },

  caster(reference) {
    reference.value = keyify(reference.value);
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/numbers.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/validation/rules/numbers.js ***!
  \***********************************************************/
/*! exports provided: number, nonNaNNumber, integer, nonNegativeNumber, nonPositiveNumber, positiveNumber, negativeNumber, nonNegativeInteger, nonPositiveInteger, positiveInteger, negativeInteger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNaNNumber", function() { return nonNaNNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNegativeNumber", function() { return nonNegativeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonPositiveNumber", function() { return nonPositiveNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positiveNumber", function() { return positiveNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negativeNumber", function() { return negativeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNegativeInteger", function() { return nonNegativeInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonPositiveInteger", function() { return nonPositiveInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positiveInteger", function() { return positiveInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negativeInteger", function() { return negativeInteger; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
//TODO Create a lint rule to warn against ".validateCast(reference.value);" inside casters. This doesn't pass the nested cast value back up to the parent cast function.
//TODO Create tests for this.

const number = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'number') {
      throw new Error('Value is not a number.');
    }
  },

  caster(reference) {
    // Parse strings for floats.
    const n = Number.parseFloat(reference.value); // But do not cast non-numbers to NaN.

    if (!Number.isNaN(n)) reference.value = n;
  }

});
const nonNaNNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);

    if (Number.isNaN(value)) {
      throw new Error('Number is NaN.');
    }
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const integer = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (!Number.isInteger(value)) throw new Error('Number is not an integet.');
  },

  caster(reference) {
    number.validateCast(reference);
    reference.value = Number.parseInt(reference.value);
  }

}); //! Defining 0 as neither positive or negative.
//L Don't worry about NaN: https://stackoverflow.com/a/26982925 (//!but be careful about negating comparisons)

const nonNegativeNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value < 0) throw new Error('Number is negative.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const nonPositiveNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value > 0) throw new Error('Number is positive.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const positiveNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value <= 0) throw new Error('Number is not positive.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const negativeNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value >= 0) throw new Error('Number is not negative.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const nonNegativeInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    nonNegativeNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    nonNegativeNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});
const nonPositiveInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    nonPositiveNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    nonPositiveNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});
const positiveInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    positiveNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    positiveNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});
const negativeInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    negativeNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    negativeNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/index.js":
/*!*****************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/index.js ***!
  \*****************************************************************/
/*! exports provided: object, populatedObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "object", function() { return _object_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _populated_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./populated-object.js */ "./source/shared/utility/validation/rules/objects/populated-object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populatedObject", function() { return _populated_object_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/object.js":
/*!******************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/object.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  //L https://stackoverflow.com/a/22482737
  validator(value) {
    if (value === null || !(typeof value === 'object' || typeof value === 'function')) {
      throw new Error('Value is not an object.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/populated-object.js":
/*!****************************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/populated-object.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../object/keys-of.js */ "./source/shared/utility/object/keys-of.js");



/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    _object_js__WEBPACK_IMPORTED_MODULE_1__["default"].validate(value);

    if (Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(value, {
      own: true,
      enumerable: true,
      nonEnumerable: true,
      named: true,
      symbol: true,
      inherited: false
    }).length === 0) {
      throw new Error('Object is not populated.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/strings.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/validation/rules/strings.js ***!
  \***********************************************************/
/*! exports provided: string, trimmedString, visibleString, populatedString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimmedString", function() { return trimmedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibleString", function() { return visibleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "populatedString", function() { return populatedString; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

const string = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'string') {
      throw new Error('Value is not a string.');
    }
  },

  caster(reference) {
    // Stringify if able to.
    if (typeof reference.value === 'object') {
      try {
        reference.value = JSON.stringify(reference.value);
      } catch (e) {}
    }

    reference.value = String(reference.value);
  }

});
const trimmedString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value); //TODO Create a thorough test for this.
    //TODO See https://en.wikipedia.org/wiki/Whitespace_character
    //! If this gets changed, ensure the caster .trim() function is updated too.
    //L from the trim() polyfill at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

    if (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g.test(value)) {
      throw new Error('String has leading and/or trailing whitespace.');
    }
  },

  caster(reference) {
    string.validateCast(reference);
    reference.value = reference.value.trim();
  }

});
const visibleString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value);

    if (trimmedString.validateCast(value) === '') {
      throw 'String is not visible.';
    }
  },

  caster(reference) {
    string.validateCast(reference); // Cannot cast any further than a string.
  }

});
const populatedString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value);

    if (value === '') {
      throw 'String is not populated.';
    }
  },

  caster(reference) {
    string.validateCast(reference); // Cannot cast any further than a string.
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/symbol.js":
/*!**********************************************************!*\
  !*** ./source/shared/utility/validation/rules/symbol.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strings.js */ "./source/shared/utility/validation/rules/strings.js");


/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    //L If transpiling to ES5, an additional check is required: https://stackoverflow.com/questions/46479169/check-if-value-is-a-symbol-in-javascript
    if (typeof value !== 'symbol') {
      throw new Error('Value is not a symbol.');
    }
  },

  caster(reference) {
    // Non-symbol values cast as the stringified description of a new symbol.
    if (!this.validate(reference.value)) {
      // Symbol(x) cannot convert symbols to strings, but String(x) in string.validateCast() can.
      _strings_js__WEBPACK_IMPORTED_MODULE_1__["string"].validateCast(reference.value);
      reference.value = Symbol(reference.value);
    }
  }

}));

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fclone":
/*!*************************!*\
  !*** external "fclone" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fclone");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-send":
/*!***************************!*\
  !*** external "koa-send" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-send");

/***/ }),

/***/ "koa-session":
/*!******************************!*\
  !*** external "koa-session" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),

/***/ "koa-webpack":
/*!******************************!*\
  !*** external "koa-webpack" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-webpack");

/***/ }),

/***/ "minimist":
/*!***************************!*\
  !*** external "minimist" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("minimist");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "spotify-web-api-node":
/*!***************************************!*\
  !*** external "spotify-web-api-node" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("spotify-web-api-node");

/***/ }),

/***/ "valid-url":
/*!****************************!*\
  !*** external "valid-url" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("valid-url");

/***/ })

/******/ });