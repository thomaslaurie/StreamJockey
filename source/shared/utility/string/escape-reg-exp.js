export default function escapeRegExp(string) {
	//L from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
