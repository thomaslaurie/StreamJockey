import {playlistParts} from '../../shared/entityParts/index.js';
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

define.constant(Playlist, {
	queryOrder: 'ORDER BY "userId" ASC, "id" ASC',
});
