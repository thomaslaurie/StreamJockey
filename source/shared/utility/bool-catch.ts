export default function boolCatch(func: (...args: unknown[]) => unknown) {
	try {
		func();
		return true;
	} catch {
		return false;
	}
}
