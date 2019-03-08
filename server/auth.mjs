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

// external
import SpotifyWebApi from 'spotify-web-api-node'; //L https://github.com/thelinmichael/spotify-web-api-node
 
// internal
import sj from '../public/src/js/global.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

let auth = {};

//TODO consider moving this over to the globals-server stuff
//C this is only used in auth.startAuthRequest() for its spotify.makeAuthRequestURL() function
let spotify = new sj.Source({ 
    api: new SpotifyWebApi({
        //C create api object and set credentials in constructor
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    }),
    get scopes() { //? why does this need to be a getter?
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

//C specific authRequestKey functions 
let authRequestKeyList = []; //TODO is this the best place for this?
auth.addAuthRequestKey = async function () {
    return await sj.addKey(authRequestKeyList);
}
auth.checkAuthRequestKey = async function (key) {
    //C 5 minute timeout //TODO this should be a global, server variable
    let timeout = 300000; 
    let pack = await sj.checkKey(authRequestKeyList, key, timeout);
    return {authRequestKey: pack.key, authRequestTimestamp: pack.timestamp};
}


//C source specific authRequest functions //TODO rename to 'spotify'x.., 'youtube'x...
auth.startAuthRequest = async function () {
    let pack = await sj.addKey(authRequestKeyList);
    return new sj.Credentials({
        authRequestKey: pack.key,
        authRequestTimestamp: pack.timestamp,
        authRequestURL: spotify.makeAuthRequestURL(pack.key),
    });
}
auth.receiveAuthRequest = async function (ctx) {
    //C receives and transforms credentials from spotify after the user confirms the authorization

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
    await auth.checkAuthRequestKey(ctx.request.query.state).catch(rejected => {
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


export default auth;