//! Sources must manually set their playback.state.source as themselves.
//R This caused a bug earlier when the playback got externalized and was no longer available in the initial afterInitialize step.

/* TODO
	Workout api keys & info storage between server & client, its kind of a mixed bag right now between youtube and spotify

	Is there a significant discrepancy between potential synchronous/local sources (listeners) and asynchronous api calls for progress checks? Which information sources are synchronous/local? Should their information override the api information?
		Implement some way to see how accurate the timestamps of sources are? by tracking the local timestamp, returned timestamp, and then another local timestamp to gain knowledge of an error margin? then using that to translate timestamps to local time?

	still some issues with playback, try rapid clicking seek, etc.
*/

import sourceParts from '../shared/source-parts.js';
import {define} from '../shared/utility/index.js';

export default class Source {
	constructor(...args) {
		sourceParts.intercept(...args);
		sourceParts.instance(this, ...args);
		const [{
			//TODO Create defaults.
			auth,
			request,
			getAccessToken,

			search,

			player,
			loadPlayer,
			playback,
		}] = args;

		define.constant(this, {
			auth,
			request,
			getAccessToken,

			player,
			loadPlayer,
		});

		//TODO Make these constant.
		define.writable(this, {
			search,
			playback,
		});
	}
}

sourceParts.prototype(Source);
sourceParts.static(Source);
