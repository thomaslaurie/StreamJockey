//R Sources should not include a reference to their playback as playback already includes a reference to the source. This recursive reference worked for a while but eventually caused a stack-overflow issue with Vue's reactivity system. Removing the playback reference was fine because it was never really used.

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
		}] = args;

		define.constant(this, {
			auth,
			request,
			getAccessToken,

			player,
			loadPlayer,
		});

		//TODO Make this constant.
		define.writable(this, {
			search,
		});
	}
}

sourceParts.prototype(Source);
sourceParts.static(Source);
