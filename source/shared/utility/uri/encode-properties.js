// Encodes values as strings, objects as [object Object] and arrays as comma delimited strings.

export default function encodeProperties(object) {
	return Object.keys(object).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join('&');
}
