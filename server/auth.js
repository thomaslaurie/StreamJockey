var SpotifyWebApi = require('spotify-web-api-node');

//C create api object and set credentials in constructor
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

//L https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/
    
//TODO 'show_dialog'
let spotifyScopes = [
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
let spotifyState = 'some-state-of-my-choice';

// Create the authorization URL
exports.spotifyAuthURL = spotifyApi.createAuthorizeURL(spotifyScopes, spotifyState) + '&show_dialog=true';
console.log(exports.spotifyAuthURL);

