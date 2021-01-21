// Decodes every value as a string.

export default function decodeProperties(encodedString) {
	const keyValuePairs = encodedString.split('&');
	const object = {};
	keyValuePairs.forEach(keyValuePair => {
		const [key, value] = keyValuePair.split('=');
		object[decodeURIComponent(key)] = decodeURIComponent(value);
	});
	return object;
}
