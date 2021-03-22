//TODO consider just writing native api functions, because they are fairly simple, and the spotify-web-api-node
//L https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/

//TODO remove exports. from internal functions

//TODO Convert to instantiatable class.

// INTERNAL
import {
	keyCode,
} from '../shared/utility/index.ts';

export default {
	requestTimeout: 300000, // 5 minutes
	requestKeys: [],
	async addRequestKey() {
		return keyCode.addTo(this.requestKeys, this.requestTimeout);
	},
	async checkRequestKey(key) {
		const pack = await keyCode.verify(this.requestKeys, key);
		return {authRequestKey: pack.key, authRequestTimestamp: pack.timestamp};
	},
};
