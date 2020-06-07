import Playback from './playback.js';
import {
	spotify,
	youtube,
} from './sources/index.js';

export default Playback.createUniversalModule([
	spotify,
	youtube,
]);