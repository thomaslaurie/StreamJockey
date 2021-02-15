export default function copyOwnProperty(key, from, to) {
	const descriptor = Object.getOwnPropertyDescriptor(from, key);
	Object.defineProperty(to, key, descriptor);
}
