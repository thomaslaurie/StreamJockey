import Entity from './entity.js';
import {playlistParts, playlistSharedRegistryId} from '../../shared/entityParts/index.js';
import {sharedRegistry} from '../../shared/class-registry.js';

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
