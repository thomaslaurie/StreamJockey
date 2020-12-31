import Playback from './playback.js';
import {
	spotifyPlayback,
	youtubePlayback,
} from './sources/index.js';

export default Playback.createUniversalModule([
	spotifyPlayback,
	youtubePlayback,
]);
