export default async function test(tests, origin) {
	let failCount = 0;

	for (const [name, test] of tests) {
		if (!test) {
			console.error(`${origin} - test failed: ${name}`);
			failCount++;
		}
	}

	if (failCount === 0) {
		console.log(`%c${origin} - all tests passed`, 'background-color: #d0efd8');
		return true;
	}
	return false;
}
