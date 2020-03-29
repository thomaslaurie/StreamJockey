import getModule from '../node-utility/get-module.js';
import * as tests from '../public/js/utility/index.test.js';

(async () => {
	const parser = await getModule('minimist', 'devDependencies');
	const args = parser(process.argv.slice(2), {string: ['only']});
	const runAll = args.only === undefined;

	function deepRun(object) {
		for (const key in object) {
			const value = object[key];
			if (typeof value === 'function') {
				if (runAll || key === args.only) {
					console.log(`Executing ${key}`);
					value();
				}
			} else if (value !== null && typeof value === 'object') {
				deepRun(value);
			}
		}
	};

	deepRun(tests);
})();
