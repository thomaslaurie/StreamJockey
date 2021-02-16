import {sharedRegistry} from '../../shared/class-registry.js';
import {playlistParts, playlistSharedRegistryId} from '../../shared/entityParts/index.js';
import {define} from '../../shared/utility/index.js';
import Entity from './entity.js';

export default class Playlist extends Entity {
	constructor(...args) {
		playlistParts.intercept(...args);
		super(...args);
		playlistParts.instance(this, ...args);
	}
}
playlistParts.prototype(Playlist);
playlistParts.static(Playlist);

// Id is assigned to instance in playlistParts.instance
sharedRegistry.register(Playlist, playlistSharedRegistryId);

define.constant(Playlist, {
	queryOrder: 'ORDER BY "userId" ASC, "id" ASC',
});
