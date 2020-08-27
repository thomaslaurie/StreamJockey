import {define} from '../utility/index.js';
import {
	sharedRegistry,
} from '../class-registry.js';

// Used to communicate to client that the server does not have the required tokens and that the client must authorize.
const sharedRegistryId = 'AuthRequired';
export default class AuthRequired {
	constructor(options = {}) {
		const {
			message = 'authorization required',
		} = options;
		define.writable(this, {
			message,
		});
		sharedRegistry.defineId(this, sharedRegistryId);
	}
}
sharedRegistry.register(AuthRequired, sharedRegistryId);
