//TODO Replace all references to this function with an instanceof or interface test.
export default function (value, Class, className) {
	return (value instanceof Class) || (value?.constructorName === className);
};