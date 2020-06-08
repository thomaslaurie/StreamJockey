import Source from '../../shared/source.js';

const youtube = new Source({
	name: 'youtube',
	register: true,
});
Object.assign(youtube, {
	getCredentials: async () => ({
		apiKey: process.env.YOUTUBE_API_KEY,
		clientId: process.env.YOUTUBE_CLIENT_ID,
	}),
});

export default youtube;
