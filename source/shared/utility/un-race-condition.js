// Evaluates a condition before and after an async getter to avoid a race condition.
export default async function unRaceCondition(originalValue, condition, getter) {
	if (condition) {
		const result = await getter();
		if (condition) {
			return result;
		}
	}
	return originalValue;
}
