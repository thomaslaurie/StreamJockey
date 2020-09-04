//TODO consider moving this over to the globals-server stuff
// this is only used in auth.startAuthRequest() for its spotify.makeAuthRequestURL() function

// EXTERNAL
//import btoa from 'btoa';
import SpotifyWebApi from 'spotify-web-api-node'; //L https://github.com/thelinmichael/spotify-web-api-node

// INTERNAL
import {
	wait,
	encodeProperties,
	one,
	rules,
} from '../../shared/utility/index.js';
import request from '../../shared/request.js';
import Source from '../../server/source.js';
import {
	User,
} from '../entities/index.js';
import {
	URL_HEADER,
} from '../../shared/constants.js';
import * as session from '../session-methods.js';
import {AuthRequired, InvalidStateError, CustomError} from '../../shared/errors/index.js';
import Credentials from '../../shared/credentials.js';

const spotify = new Source({
	name: 'spotify',
	register: true,
	api: new SpotifyWebApi({
		// create api object and set credentials in constructor
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
	makeAuthRequestURL(key) {
		//TODO make a better catch & handle, this is a temporary catch for undefined credentials as the error is silent until it arrives on spotify's end: 'Missing required parameter: client_id'
		if (
			!rules.string.test(this.api._credentials.clientId) ||
			!rules.string.test(this.api._credentials.clientSecret) ||
			!rules.string.test(this.api._credentials.redirectUri)
		) {
			throw new InvalidStateError({
				userMessage: 'one or more api credentials are missing or of the wrong type',
				state: {
					clientId: this.api._credentials.clientId,
					clientSecret: this.api._credentials.clientSecret,
					redirectUri: this.api._credentials.redirectUri,
				},
			});
		}

		//! the show_dialog query parameter isn't available in the createAuthorizeURL, so it is manually added
		return this.api.createAuthorizeURL(this.scopes, key) + `&show_dialog=${this.authRequestManually}`;
	},
});
//TODO make any property available for Source
Object.assign(spotify, {
	async startAuthRequest() {
		let pack = await auth.addRequestKey();
		return new Credentials({
			authRequestKey: pack.key,
			authRequestTimestamp: pack.timestamp,
			authRequestTimeout: pack.timeout,
			authRequestURL: this.makeAuthRequestURL(pack.key),
		});
	},
	async receiveAuthRequest(query) {
		// receives and transforms credentials from spotify after the user confirms the authorization
		/*// spotify authorization guide
			//L https://developer.spotify.com/documentation/general/guides/authorization-guide/

			if the user accepts the request:
			code	An authorization code that can be exchanged for an access token.
			state	The value of the state parameter supplied in the request.

			if the user denies the request, or if an error has occured
			error	The reason authorization failed, for example: “access_denied” 
			state	The value of the state parameter supplied in the request.

			//TODO create error parser for spotify api
		*/

		// ensure key is recognized, if its not (or timed out), nothing can be done, let it timeout on the client side too
		await auth.checkRequestKey(query.state);
		// ensure that spotify sent the code
		if (query.code === undefined) {
			emitter.emit(query.state, new InvalidStateError({
				userMessage: 'spotify authorization failed',
				message: 'code is missing',
				state: query,
			}));
		}
		// ensure that spotify didn't send an error
		if (query.error !== undefined) {
			emitter.emit(query.state, new InvalidStateError({
				userMessage: 'spotify authorization failed',
				message: query.error,
				state: query,
			}));
		}

		// send the event and credentials for endAuthRequest() to pick up
		emitter.emit(query.state, new Credentials({ //? sj.success here?
			authRequestKey: query.state, //? is this needed anymore?
			authCode: query.code,
		}));
	},
	endAuthRequest: async function (credentials) {
		// catches events emitted by receiveAuthRequest() and sends them to the waiting router request

		return await new Promise((resolve, reject) => { //! needs to be a promise wrapper because emitter.once uses a callback function
			// setup listener for authRequestKey
			emitter.once(credentials.authRequestKey, (result) => {
				resolve(result);
			});

			// setup timeout
			wait(credentials.authRequestTimeout).then(() => {
				reject(new CustomError({
					userMessage: 'request timeout',
				}));
			});
		});
	},
	exchangeToken: async function (ctx, credentials) {
		// exchange auth code for access and refresh tokens
		// exchangeToken() is only outside of endAuthRequest() because the auth window should close and not have to wait for the exchange to happen - to reduce flickering of the redirect page

		// grab timestamp before sending request so that the recorded expiry time is before the actual expiry time
		let timestamp = Date.now();
		// exchange the auth code for tokens
		//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
		let result = await request('POST', 'https://accounts.spotify.com/api/token', {
			body: encodeProperties({
				grant_type: 'authorization_code',
				code: credentials.authCode,
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI, // only used for validation, no need to make a second redirect handler

				client_id: process.env.SPOTIFY_CLIENT_ID,
				client_secret: process.env.SPOTIFY_CLIENT_SECRET,
				// alternative to client_id and client_secret properties, put this in header: 'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
			}),
			headers: URL_HEADER,
		}).catch(rejected => {
			throw new InvalidStateError({
				userMessage: 'failed to authorize spotify',
				message: 'token exchange failed',
				state: rejected,
			});
		});

		// store refresh token in database
		// while the client triggers the refresh of the accessToken (so that the server doesn't have to keep track of which users are online), the refreshToken is stored server side so that the user doesn't have to re-auth between sessions
		let me = await session.get(ctx);
		await User.edit({ id: me.id, spotifyRefreshToken: result.refresh_token }).then(resolved => {
		});

		// repack and return
		return new Credentials({
			accessToken: result.access_token,
			expires: timestamp + result.expires_in,
			//refreshToken: result.refresh_token,
			scopes: result.scope.split(' '),
			// result.token_type is the only omitted property, this is always 'Bearer'
		});
	},
	refreshToken: async function (ctx) {
		// get the refresh token from the database
		let me = await session.get(ctx);
		let refreshToken = await User.get(me).then((result) => result.content).then(one).then(resolved => resolved.spotifyRefreshToken);

		// if there isn't one, throw the specific AuthRequired error, this will be identified on the client side and trigger spotify.auth()
		//TODO reconsider this string test
		if (!rules.visibleString.test(refreshToken)) {
			throw new AuthRequired();
		}

		// send a refresh request to spotify to get new access token, expiry time, and possible refresh token
		let timestamp = Date.now();
		let result = await request('POST', 'https://accounts.spotify.com/api/token', {
			body: encodeProperties({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,

				client_id: process.env.SPOTIFY_CLIENT_ID,
				client_secret: process.env.SPOTIFY_CLIENT_SECRET,
			}),
			headers: URL_HEADER,
		}).catch(rejected => {
			throw new InvalidStateError({
				userMessage: 'failed to authorize spotify',
				message: 'token refresh failed',
				state: rejected,
			});
		});

		// if a new refresh token was sent
		if (rules.string.test(result.refresh_token)) { //? better validation?
			// store it
			await User.edit({ id: me.id, spotifyRefreshToken: result.refresh_token });
		}

		// send only the accessToken and the expiry time
		return new Credentials({
			origin: 'sj.spotify.refreshToken()',
			accessToken: result.access_token,
			expires: timestamp + result.expires_in,
		});
	},
});

export default spotify;
