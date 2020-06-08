import {
	Playlist,
} from '../../shared/entities/index.js';

Playlist.augmentClass({
	staticProperties: parent => ({
		// CRUD
		queryOrder: 'ORDER BY "userId" ASC, "id" ASC',
	}),
});

export default Playlist;
