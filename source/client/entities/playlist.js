import Entity from './entity.js';
import {playlistParts} from '../../shared/entityParts/index.js';

export default class Playlist extends Entity {
	constructor(...args) {
		playlistParts.intercept(...args);
		super(...args);
		playlistParts.instance(this, ...args);
	}
}
playlistParts.prototype(Playlist);
playlistParts.static(Playlist);
