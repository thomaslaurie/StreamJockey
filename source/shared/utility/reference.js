export class Reference {
	constructor(value) {
		this.value = value;
		Object.seal(this);
	}
}
export default Reference;

export function formReferences(values) {
	return values.map(item => (item instanceof Reference) ? item : new Reference(item));
}
export function extractValues(references) {
	return references.map(item => (item instanceof Reference) ? item.value : item);
}
