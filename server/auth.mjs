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

// builtin
import EventEmitter from 'events';

// external
import btoa from 'btoa';
import SpotifyWebApi from 'spotify-web-api-node'; //L https://github.com/thelinmichael/spotify-web-api-node
 
// internal
import sj from './global-server.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

// events
const emitter = new EventEmitter();

let auth = {};

//TODO consider moving this over to the globals-server stuff
//C this is only used in auth.startAuthRequest() for its spotify.makeAuthRequestURL() function
sj.spotify = new sj.Source({ 
    api: new SpotifyWebApi({
        //C create api object and set credentials in constructor
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    }),
    get scopes() { //? why does this need to be a getter?, i think it was because one of the properties needed to be dynamic and react to authRequestManually
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
        //TODO make a better catch & handle, this is a temporary catch for undefined credentials as the error is silent until it arrives on spotify's end: 'Missing required parameter: client_id'
        if (sj.typeOf(this.api._credentials.clientId) !== 'string' || 
        sj.typeOf(this.api._credentials.clientSecret) !== 'string' || 
        sj.typeOf(this.api._credentials.redirectUri) !== 'string') {
            throw new sj.Error({
                log: true,
                origin: 'spotify.makeAuthRequestURL()',
                message: 'one or more api credentials are missing or of the wrong type',
                content: {
                    clientId: this.api._credentials.clientId,
                    clientSecret: this.api._credentials.clientSecret,
                    redirectUri: this.api._credentials.redirectUri,
                }
            });
        }

        //! the show_dialog query parameter isn't available in the createAuthorizeURL, so it is manually added
        return this.api.createAuthorizeURL(this.scopes, key) + `&show_dialog=${this.authRequestManually}`;
    },
});


//   █████╗ ██╗   ██╗████████╗██╗  ██╗
//  ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
//  ███████║██║   ██║   ██║   ███████║
//  ██╔══██║██║   ██║   ██║   ██╔══██║
//  ██║  ██║╚██████╔╝   ██║   ██║  ██║
//  ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝

//C generics
auth.requestTimeout = 300000; //C 5 minutes
auth.requestKeys = [];
auth.addRequestKey = async function () {
    return await sj.addKey(this.requestKeys, this.requestTimeout);
}
auth.checkRequestKey = async function (key) {
    let pack =  await sj.checkKey(this.requestKeys, key);
    return {authRequestKey: pack.key, authRequestTimestamp: pack.timestamp};
}


sj.spotify.startAuthRequest = async function () {
    let pack = await auth.addRequestKey();
    return new sj.Credentials({
        authRequestKey: pack.key,
        authRequestTimestamp: pack.timestamp,
        authRequestTimeout: pack.timeout,
        authRequestURL: this.makeAuthRequestURL(pack.key),
    });


}
sj.spotify.receiveAuthRequest = async function (query) {
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
    await auth.checkRequestKey(query.state);
    //C ensure that spotify sent the code
    if (sj.isType(query.code, undefined)) {
        emitter.emit(query.state, new sj.Error({
            log: true,
            origin: 'receiveAuthRequest()',
            message: 'spotify authorization failed',
            reason: 'code is missing',
            content: query,
        }));
    }
    //C ensure that spotify didn't send an error
    if (!sj.isType(query.error, undefined)) {
        emitter.emit(query.state, new sj.Error({
            log: true,
            origin: 'receiveAuthRequest()',
            message: 'spotify authorization failed',
            reason: query.error,
            content: query,
        }));
    }

    //C send the event and credentials for endAuthRequest() to pick up
    emitter.emit(query.state, new sj.Credentials({
        authRequestKey: query.state, //? is this needed anymore?
        authCode: query.code,
    }));
}
sj.spotify.endAuthRequest = async function (credentials) {
    //C catches events emitted by receiveAuthRequest() and sends them to the waiting router request

	return await new Promise((resolve, reject) => { //! needs to be a promise wrapper because emitter.once uses a callback function
        //C setup listener for authRequestKey
        emitter.once(credentials.authRequestKey, (result) => {
            resolve(result);
        });

        //C setup timeout
        sj.wait(credentials.authRequestTimeout).then(() => {
            reject(new sj.Error({
                log: true,
                origin: 'sj.spotify.endAuthRequest()',
                message: 'request timeout',
            }));
        });
	});	
}


//C while the client triggers the refresh of the tokens (so that the server doesn't have to keep track of which users are online), they are stored for the user in the database so that they can be retrieved between sessions
sj.spotify.exchangeToken = async function (credentials) {
    //C exchange auth code for access and refresh tokens

    //C grab timestamp before sending request so that the recorded expiry time is before the actual expiry time
	let timestamp = Date.now();

    //C exchange the auth code for tokens
	//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
    let result = await sj.request('POST', 'https://accounts.spotify.com/api/token', sj.encodeURL({
        grant_type: 'authorization_code',
        code: credentials.authCode,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI, //C only used for validation, no need to make a second redirect handler

        //client_id: process.env.SPOTIFY_CLIENT_ID,
		//client_secret: process.env.SPOTIFY_CLIENT_SECRET,
	}), {
        'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
	}).catch(rejected => {
		throw new sj.Error({
			log: true,
			message: 'failed to authorize spotify',
			reason: 'token exchange failed',
			content: rejected,
		});
	});

    //TODO store in database

	//C repack and return
	return {
		accessToken: result.access_token,
        expires: timestamp + result.expires_in,
        refreshToken: result.refresh_token,
	};
}
sj.spotify.refreshToken = async function (credentials) {
    let timestamp = Date.now();

    let result = await sj.request('POST', 'https://accounts.spotify.com/api/token', {
        grant_type: 'refresh_token',
        refresh_token: credentials.refreshToken,

        //TODO test that this works specifically for the refresh, because this might have to go in the header (it wasn't mentioned in the refresh part)
        //client_id: process.env.SPOTIFY_CLIENT_ID,
        //client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }, {
        'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
    }).catch(rejected => {
		throw new sj.Error({
			log: true,
			message: 'failed to authorize spotify',
			reason: 'token refresh failed',
			content: rejected,
		});
	});

    //TODO store in database

	//C repack
    let tokens = {
        accessToken: result.access_token,
        expires: timestamp + result.expires_in,
        refreshToken: result.refresh_token,
    };
    if (!sj.isType(result.refresh_token, 'string')) { //C if result.refresh_token wasn't sent, delete the entire property so that Object.assign() can still be used
        delete tokens.refreshToken;
    }

	console.log('TOKENS: ', tokens);

    return tokens;
}


export default auth;