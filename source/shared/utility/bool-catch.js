export default function boolCatch(f) {
	try {
		f();
		return true;
	} catch (e) {
		return false;
	}
}
