//TODO Unused
//TODO Format hours, days, etc.
export default function (ms) {
	// extract
	const minutes = Math.floor(ms / 60000);
	let seconds = Math.ceil(ms % 60000);

	// format
	seconds = ('0' + seconds).slice(-2);

	// returns ...0:00 format rounded up to the nearest second
	return minutes + ':' + seconds;
}
