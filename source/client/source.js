//! Sources must manually set their playback.state.source as themselves.
//R This caused a bug earlier when the playback got externalized and was no longer available in the initial afterInitialize step.

/* TODO
	Workout api keys & info storage between server & client, its kind of a mixed bag right now between youtube and spotify

	Is there a significant discrepancy between potential synchronous/local sources (listeners) and asynchronous api calls for progress checks? Which information sources are synchronous/local? Should their information override the api information?
		Implement some way to see how accurate the timestamps of sources are? by tracking the local timestamp, returned timestamp, and then another local timestamp to gain knowledge of an error margin? then using that to translate timestamps to local time?

	still some issues with playback, try rapid clicking seek, etc.
*/

import Source from '../shared/source.js';

Source.augmentClass({
	constructorParts(parent) {
		return {
			defaults: {
				//TODO change these off undefined
				auth: undefined,
				request: undefined,
				getAccessToken: undefined,

				search: undefined,
	
				player: undefined,
				loadPlayer: undefined,
				playback: undefined,
			},
		};
	},
});

export default Source;