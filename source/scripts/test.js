import getModule  from '../node-utility/get-module.js';
import asyncSpawn from '../node-utility/async-spawn.js';
import sourcePath from '../node-utility/source-path.cjs';
import escapeRegExp from '../public/js/utility/string/escape-reg-exp.js';
import {defaultTestGlob, testSuffix} from '../config/project-paths.js';

const isFilePath = new RegExp(`${escapeRegExp(testSuffix)}$`);

(async () => {
	const parser = await getModule('minimist', 'devDependencies');
	// Get first non-option argument.
	// It should be a source-relative directory or file path.
	const {_: [path = defaultTestGlob], verbose} = parser(process.argv.slice(2), {
		boolean: ['verbose'],
		alias: {v: 'verbose'},
	}); 

	// Get the absolute path.
	let fullPath = sourcePath(path);
	// If the path doesn't have the testSuffix, consider it a directory and glob-match all test files within that directory.
	if (!(isFilePath.test(fullPath))) {
		fullPath += `/**/*${testSuffix}`;
	}
	
	const verboseFlag = verbose ? '--verbose' : '';
	
	// Run tests with ava.
	await asyncSpawn(`npx ava ${fullPath}  ${verboseFlag}`);
})().catch((error) => {
	if (error && error.code === 1 && error.signal === null) {
		// Do nothing, error will be logged by ava.
	} else {
		console.error(error);
	}
});

/* RegExp Replace

	\['(.*?)', *(.*?)\],

	test($1, (t) => {
		t.assert($2);
	});

*/