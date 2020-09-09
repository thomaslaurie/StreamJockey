export default function copyProperty(key, from, to) {
	const descriptor = Object.getOwnPropertyDescriptor(key, from);
	Object.defineProperty(to, descriptor);
}
