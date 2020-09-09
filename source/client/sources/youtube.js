import {
	rules,
	Deferred,
	escapeRegExp,
} from '../../shared/utility/index.js';
import serverRequest from '../server-request.js';
import {
	Track,
} from '../../client/entities/index.js';
import {
	default as propagate,
} from '../../shared/propagate.js';
import Source from '../source.js';
import Playback from '../playback.js';
import {CustomError, InvalidStateError} from '../../shared/errors/index.js';
import {
	runHTMLScript,
} from '../browser-utility/index.js';
import moment from 'moment';
import he from 'he';

const youtube = new Source({
	name: 'youtube',
	register: true,
	idPrefix:	'https://www.youtube.com/watch?v=',
	nullPrefix:	'https://www.youtube.com/watch',


	async auth() {
		//L example code: https://developers.google.com/youtube/v3/docs/search/list

		//TODO redirect uri has to be whitelisted on https://console.developers.google.com/apis/credentials/oauthclient/575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com?authuser=1&project=streamlist-184622&supportedpurview=project


		// watch for gapi to be assigned by using a setter with a deferred promise
		//L https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
		//OLD alternative option was to use waitForCondition({condition: () => window.gapi !== undefined, timeout: Playback.requestTimeout});
		//! in case this is called more than once (where the script won't set gapi a second time), store gapi onto its temporary gapi2
		window.gapi2 = window.gapi;
		const loaded = new Deferred().timeout(Playback.requestTimeout, () => new CustomError({
			message: 'gapi loading timed out',
		}));
		Object.defineProperty(window, 'gapi', {
			configurable: true,
			enumerable: true,
			get() {
				return window.gapi2;
			},
			set(value) {
				//R gapi was first going to be stored on youtube, however after gapi.cient.init() is called, gapi gets some cross-origin data defined on it. this is an issue when attempting to copy its data via fClone, as a cross-origin error will be thrown.
				window.gapi2 = value;
				loaded.resolve();
			},
		});

		// loads gapi into global scope \
		//TODO is there any way to make this more module-like?
		await runHTMLScript('https://apis.google.com/js/api.js');
		// wait for gapi
		await loaded;

		// remove the watcher
		Object.defineProperty(window, 'gapi', {
			configurable: true,
			enumerable: true,

			value: window.gapi2,
			writable: true,
		});
		delete window.gapi2;


		// load client library
		await new Promise((resolve, reject) => {
			//L https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md
			// first arg is 'A colon (:) separated list of gapi libraries. Ex: "client:auth2"'
			window.gapi.load('client', {
				callback(args) { //? no idea what the parameters passed here are
					resolve(args);
				},
				onerror(args) {
					reject(args);
				},
				ontimeout(args) {
					reject(args); //TODO probably a custom error here?
				},
				timeout: 60000, //TODO
			});
		});

		// get apiKey and clientId stored on server
		const {apiKey, clientId} = await serverRequest('GET', `youtube/credentials`);

		//TODO Create specific rules for each API key.
		rules.string.validate(apiKey);
		rules.string.validate(clientId);

		// loads and performs authorization, short version of the code commented out below
		//R after client is loaded (on its own), gapi.client.init() can load the auth2 api and perform OAuth by itself, it merges the below functions, however I am keeping them separate for better understanding of google's apis, plus, auth2 api may only be initialized once, so it may be problematic to use gapi.client.init() more than once
		await window.gapi.client.init({
			//L https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--
			//TODO move keys
			apiKey,
			discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
			clientId,

			//L https://www.googleapis.com/auth/youtube.force-ssl
			//L https://www.googleapis.com/auth/youtube
			scope: 'https://www.googleapis.com/auth/youtube.readonly',
		});


		/* LONG IMPLEMENTATION
			//! 'auth2:client' must be loaded above

			// init and signIn to OAuth
			const googleAuth = await gapi.auth2.init({
				//! may only be initialized once, and so client_id and scopes cannot be reinitialized
				//L other options: https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
				client_id: '575534136905-vgdfpnd34q1o701grha9i9pfuhm1lvck.apps.googleusercontent.com', //TODO move
				//L The scopes to request, as a space-delimited string, may also be done in signIn() which adds on top of these scopes
				scope: '', //TODO
			});
			await googleAuth.signIn({
				//L https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions
				//L consent, select_account, or none (can fail)
				prompt: 'consent',
			});

			// init and load client
			gapi.client.setApiKey('key')
			await gapi.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest');
		*/
	},
	async request(method, path, content) {
		// check that user is authorized (signedIn)
		//TODO how do I check that the client library is loaded?
		if (!window?.gapi?.auth2?.getAuthInstance?.()?.isSignedIn?.get?.()) {
			await this.auth();
		}

		return new Promise((resolve, reject) => {
			// Wraps goog.Thenable which doesn't support the catch method.
			window.gapi.client.request({
				method,
				path: `/youtube/v3/${path}`,
				params: content,
			}).then(resolve, reject);
		}).catch((rejected) => {
			if (
				rejected?.code === 403
				&& rejected?.result?.error?.errors[0]?.message?.startsWith?.('Access Not Configured.')
			) {
				/* The key has probably been invalidated.
					If the API is still enabled, try resetting the API by:
						1. Deleting the API keys.
						2. Disabling the API.
						3. Re-enabling the API.
						4. Creating new keys.
					//L See here: https://stackoverflow.com/a/27491718
				*/
				throw new InvalidStateError({
					userMessage: 'YouTube credentials are invalid.',
					state: rejected,
				});
			} else {
				throw rejected;
			}
		}).catch(propagate);
	},
});

// External due to youtube self reference.
youtube.search = async function search({
	term = '',
	startIndex = 0,
	amount = 1,
}) {
	// VALIDATE
	rules.visibleString.validate(term);
	rules.nonNegativeInteger.validate(startIndex);
	rules.positiveInteger.validate(amount);


	// amass search result pages until the last requested search index is included
	//! this will drive api quotas up fast if the startIndex or amount are high (n*50)
	//! //TODO the way the search functionality is probably going to work, is when the user scrolls down, more and more searches get queried just with a different startingIndex, however this will drive up the quota cost for youtube since each startingIndex lower on the list will do multi-page searches for that below, maybe find a way to store the next page token for a specific query and then use that on successive searches
	/* //R
		default quota limit is 10 000 units per day (or not? I don't see a limit in the quotas tab of the api dashboard)
		/search costs 100 per page, (so only allowed to search 100 times per day)
		increasing the maxResults doesn't seem to increase the quota cost, but increasing the number of pages per search (by increasing startIndex or amount) will,
		so the best solution to adapting this page system to my start/amount system would be to request the maximum number of results per page (50), then requesting the next page until the last result is retrieved - this will require the minimum number of pages
	*/

	let limit = 1; //TODO temp safeguard

	const allPageResults  = [];
	let pageToken = null;

	while (allPageResults.length < startIndex + amount && limit > 0) {
		const pageResults = await youtube.request('GET', 'search', {
			//L https://developers.google.com/youtube/v3/docs/search/list#parameters
			part: 'snippet',
			type: 'video',
			maxResults: 50,
			q: term,
			// conditionally add pageToken
			//L https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object/40560953#40560953
			...(pageToken !== null && {pageToken}),
		});
		allPageResults.push(...pageResults.result.items);
		pageToken = pageResults.nextPageToken;

		limit--;
	}
	// remove the unneeded results
	const searchResults = allPageResults.slice(startIndex, startIndex + amount);


	// videoResults must also be searched because the contentDetails part is not available for the search request
	//L see search here only has snippet part available: https://developers.google.com/youtube/v3/determine_quota_cost
	const videoResult = await youtube.request('GET', 'videos', {
		//L https://developers.google.com/youtube/v3/docs/videos/list
		// join the results ids
		id: searchResults.map(item => item.id.videoId).join(','),
		// only retrieve the contentDetails, as the snippet has already been retrieved, this reduces the request cost
		part: 'contentDetails',
	});
	if (searchResults.length !== videoResult.result.items.length) {
		throw new InvalidStateError({
			message: 'search result length not equal to video result length',
			state: {
				searchLength: searchResults.length,
				videoLength: videoResult.result.items.length,
			},
		});
	}
	videoResult.result.items.forEach((item, index) => {
		// ensure that ids line up
		if (searchResults[index].id.videoId !== item.id) {
			throw new CustomError({
				message: `search and video results at ${index} do not have the same id`,
			});
		}
		// append contentDetails part to the search results
		searchResults[index].contentDetails = item.contentDetails;
	});

	return searchResults.map(({id: {videoId: id}, snippet, contentDetails}) => new Track({
		source: youtube, //! this is causing issues with fClone, its throwing a cross origin error
		sourceId: id,
		link: youtube.idPrefix + id,
		...this.formatSnippet(snippet),
		...this.formatContentDetails(contentDetails),
	}));
};
youtube.playback = new Playback({
	state: {
		source: youtube,
	},
	actions: {
		async loadPlayer(context) {
			// load youtube iframe api
			await runHTMLScript('https://www.youtube.com/iframe_api');

			//TODO choose timeout
			const deferred = new Deferred().timeout(Playback.requestTimeout, () => new CustomError({
				message: 'youtube iframe player load timed out',
			}));

			window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
				context.commit('setState', {
					player: new window.YT.Player('youtubeIFrame', { //! this won't throw any error if the element id doesn't exist
						width: '640',
						height: '390',
						// videoId: 'M71c1UVf-VE',
						// host: 'https://www.youtube.com', //? doesn't seem to help
						playerVars: {
							controls: 0,
							disablekb: 1,
							enablejsapi: 1,
							fs: 0,
							iv_load_policy: 3,
							modestbranding: 1,
							// origin: 'http://localhost:3000', //TODO extract as constant //? doesn't seem to help
						},

						//L https://developers.google.com/youtube/iframe_api_reference#Events
						events: {
							async onReady() {
								//TODO handle error?
								await context.dispatch('checkPlayback').catch(propagate);
								deferred.resolve();
							},
							async onStateChange() {
								//! onStateChange event only has the playbackState data, checkPlayback gets this anyways
								await context.dispatch('checkPlayback');
							},
							onError(event) {
								//TODO
								console.error('youtube player onError:', event);
							},
						},
					}),
				});
			};

			return deferred;
		},

		async checkPlayback(context) {
			//TODO catch errors in here

			const state = {};
			const track = {};


			const player = context.state.player;

			track.link = player.getVideoUrl();
			// remove the idPrefix or nullPrefix from youtube urls
			//! idPrefix must be matched first because it contains nullPrefix (which would escape early and leave ?v=)
			track.sourceId = track.link.replace(
				new RegExp(`${escapeRegExp(youtube.idPrefix)}|${escapeRegExp(youtube.nullPrefix)}`, 'u'),
				'',
			);

			const playerDuration = player.getDuration();
			//! 'Note that getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.'
			// if duration is zero, set it to infinity instead, so that the slider stays at the start until the duration is determined
			track.duration = playerDuration === 0 ? Infinity : playerDuration;
			state.progress = player.getCurrentTime() * 1000 / track.duration;

			const playerState = player.getPlayerState();
			state.isPlaying = playerState === 1 || playerState === 3;
			/* //G
				-1 un-started
				0 ended
				1 playing
				2 paused
				3 buffering - this should be considered as playing, but not influence the progress
				5 video cued
			*/

			// if muted: volume is 0, convert 0-100 to 0-1 range
			state.volume = player.isMuted() ? 0 : player.getVolume() / 100; //

			state.timestamp = Date.now();

			// get name and artists from current track, starting track, or an api call
			//R cannot scrape name or artists from DOM element because of iframe cross-origin restrictions
			if (track.sourceId === context?.state?.track?.sourceId) {
				track.name = context.state.track.name;
				track.artists = [...context.state.track.artists];
			} else if (track.sourceId === context?.state?.startingTrack?.sourceId) {
				track.name = context.state.startingTrack.name;
				track.artists = [...context.state.startingTrack.artists];
			} else {
				const video = await youtube.request('GET', 'videos', {id: track.sourceId, part: 'snippet'});
				if (video.result.items.length === 1) {
					const formattedSnippet = youtube.formatSnippet(video.result.items[0].snippet);
					track.name = formattedSnippet.name;
					track.artists = formattedSnippet.artists;
				}
			}

			state.track = new Track(track);


			context.commit('setState', state);
		},


		async baseStart({state: {player}}, {sourceId}) {
			player.loadVideoById({
				videoId: sourceId,
				// startSeconds
				// endSeconds
				// suggestedQuality
			});
		},

		// async start(context, track) {
		// },
		async pause({state: {player}}) {
			player.pauseVideo();
			//TODO return
		},
		async resume({state: {player}}) {
			player.playVideo();
			//TODO return
		},
		async seek({state: {player, track}}, progress) {
			const seconds = progress * track.duration * 0.001;
			player.seekTo(seconds, true);
			//TODO return
		},
		async volume({state: player}, volume) {
			player.setVolume(volume * 100);
			player.unMute();
			//TODO return
		},
	},
});

//TODO move inside
youtube.formatContentDetails = function formatContentDetails(contentDetails) {
	const pack = {};
	pack.duration = moment.duration(contentDetails.duration, moment.ISO_8601).asMilliseconds();
	return pack;
};
youtube.formatSnippet = function formatSnippet(snippet) {
	const pack = {};
	if (!rules.object.test(snippet)) {
		throw new CustomError({
			message: 'snippet is not an object',
		});
	}

	// assuming title format of 'Artist - Title'
	// splits on dash between one or any whitespace
	const splitTitle = snippet.title.split(/(?:\s+[-|]\s+)/gu);
	if (splitTitle.length === 2)  { // if splitTittle has the exact length of two
		// use the first part as the artists
		// splits on commas between none or any whitespace, splits on &xX| between one or any whitespace
		//TODO improve
		pack.artists = splitTitle[0].split(/(?:\s*[,]\s*)|(?:\s+[&xX|]\s+)/gu);
		// use the second part as the name
		[, pack.name] = splitTitle;
	} else {
		// use the channel title as the artist
		pack.artists = [snippet.channelTitle];
		// use the full title as the name
		pack.name = snippet.title;
	}

	// apparently the titles are html encoded, (possibly the artist names too//?)
	//L using he to decode: https://www.npmjs.com/package/he#hedecodehtml-options
	pack.artists = pack.artists.map(artist => he.decode(artist));
	pack.name = he.decode(pack.name);

	return pack;
};

export default youtube;
