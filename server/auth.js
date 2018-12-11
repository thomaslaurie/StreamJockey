// builtin
const EventEmitter = require('events');

// external
var SpotifyWebApi = require('spotify-web-api-node');

// internal
const sj = require('../public/js/global.js');

//TODO consider just writing native api functions, because they are fairly simple, and the spotify-web-api-node
//L https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/

//TODO remove exports. from internal functions

//TODO consider moving this over to the globals-server stuff
spotify = new sj.Source({ 
    api: new SpotifyWebApi({
        //C create api object and set credentials in constructor
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    }),
    get scopes() {
        return [
            /* //C
            contains an array of all scopes sent with the auth request
        
            'streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private' are required for the web playback sdk
            'user-modify-playback-state' is required to operate the playback
        
            show_dialog sets whether or not to force the user to approve the request each time
            
            state gets returned back with the request, TODO use with hashes to verfy that the response came from the expected source
            */
        
            // users
            'user-read-private',
            'user-read-email',
            'user-read-birthdate',
            
            // spotify connect
            'user-read-currently-playing',
            'user-modify-playback-state',
            'user-read-playback-state',
        
            // streaming
            'streaming',
        ];
    },
    authRequestManually: true,
    makeAuthRequestURL: function (key) {
        //! the show_dialog query parameter isn't available in the createAuthorizeURL, so manually add it
        //! TODO this will NOT error if process.env.SPOTIFY_CLIENT_ID, secret, or redirect uri parameters passed in new SpotifyWebApi({}) are undefined
        return this.api.createAuthorizeURL(this.scopes, key) + `&show_dialog=${this.authRequestManually}`;
    },
});

//C general key functions
//TODO this should go into global-server.js util
exports.makeKey = function (length) {
    //C use only characters allowed in URLs
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}
exports.addKey = async function (list) {
    let pack = {};

    pack.key = await sj.recursiveSyncCount(100, (key) => {
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                found = true;
                break;
            }
        }
        return found;
    }, exports.makeKey, 10);

    pack.timestamp = Date.now();

    list.push(pack);
    return pack;
}
exports.checkKey = async function (list, key, timeout) {
    for(let i = 0; i < list.length; i++) {
        //C if the key is found, remove and return it
        if (list[i].key === key) {
            let pack = list[i];
            list.splice(i, 1);
            return pack;
        }

        //C if any key has timed out, remove it too
        if (list[i].timestamp + timeout < Date.now()) {
            list.splice(i, 1);
        }
    }

    throw new sj.Error({
        log: true,
        origin: 'checkKey()',
        message: 'request timeout (or just an invalid key)',
    });
}

//C specific authRequestKey functions 
let authRequestKeyList = []; //TODO is this the best place for this?
exports.addAuthRequestKey = async function () {
    return await exports.addKey(authRequestKeyList);
}
exports.checkAuthRequestKey = async function (key) {
    //C 5 minute timeout //TODO this should be a global, server variable
    let timeout = 300000; 
    let pack = await exports.checkKey(authRequestKeyList, key, timeout);
    return {authRequestKey: pack.key, authRequestTimestamp: pack.timestamp};
}

//C source specific authRequest functions //TODO rename to 'spotify'x.., 'youtube'x...
exports.startAuthRequest = async function () {
    let pack = await exports.addKey(authRequestKeyList);
    return new sj.Credentials({
        authRequestKey: pack.key,
        authRequestTimestamp: pack.timestamp,
        authRequestURL: spotify.makeAuthRequestURL(pack.key),
    });
}
exports.receiveAuthRequest = async function (ctx) {
    /*//C 
        if the user accepts the request:
        code	An authorization code that can be exchanged for an access token.
        state	The value of the state parameter supplied in the request.

        if the user denies the request, or if an error has occured
        error	The reason authorization failed, for example: “access_denied” 
        state	The value of the state parameter supplied in the request.

        //TODO create error parser for spotify api
    */

    //C check key first to see if it is even known who sent the request
    //! on fail this will throw a key-not-found error (either because of timeout or another error), in this case, there is no knowing what client requested this, and should just be left to time out (on the http request side)
    //TODO create error parser for spotify api
    await exports.checkAuthRequestKey(ctx.request.query.state).catch(rejected => {
        //C ensure that Error object's content is a string for calling an event
        let error = sj.propagateError(rejected);
        error.content = '';
        throw error;
    });
    if (ctx.request.query.error !== undefined) {
        throw new sj.Error({
            log: true,
            origin: 'receiveAuthRequest()',
            message: 'spotify authorization failed',
            reason: ctx.request.query.error,
            content: ctx.request.query.state,
        });
    }
    if (ctx.request.query.code === undefined) {
        throw new sj.Error({
            log: true,
            origin: 'receiveAuthRequest()',
            message: 'spotify authorization failed',
            reason: 'code is missing',
            content: ctx.request.query.state,
        });
    }

    return new sj.Credentials({
        authRequestKey: ctx.request.query.state,
        authCode: ctx.request.query.code,
    });
}
//TODO end auth request is done in the router part (because thats where the emitter is), therefore receive auth request is basically the end, should the emitter be inside here instead?