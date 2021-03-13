//TODO Add option: source, which runs test on source files (not ts ones).

import getModule  from '../node-utility/get-module.js';
import asyncSpawn from '../node-utility/async-spawn.js';
import sourcePath from '../node-utility/source-path.cjs';
import escapeRegExp from '../shared/utility/string/escape-reg-exp.js';
import {
	sourceDirectory,
	testsBuildDirectory,
	testSuffixGlob,
	testSuffixRegexp,
	toForwardSlash,
} from '../config/project-paths.cjs';

(async () => {
	const parser = await getModule('minimist', 'devDependencies');
	// Get first non-option argument.
	// It should be a source-relative directory or file path.
	const {
		_: [path = ''],
		verbose,
		watch,
		source,
	} = parser(process.argv.slice(2), {
		boolean: [
			'verbose',
			'watch',
			'source',
		],
		alias: {
			v: 'verbose',
			w: 'watch',
			s: 'source',
		},
	});

	// Get the absolute path.
	const baseDirectory = source ? sourceDirectory : testsBuildDirectory;
	
	let fullPath = toForwardSlash(sourcePath(baseDirectory, path));
	
	// If the path doesn't have the testSuffix, consider it a directory and glob-match all test files within that directory.
	if (!testSuffixRegexp.test(fullPath)) {
		fullPath += `/**/*${testSuffixGlob}`;
	}

	const verboseFlag = verbose ? '--verbose' : '';
	const watchFlag   = watch   ? '--watch'   : '';

	// Run tests with ava.
	//R Ava seems to have source-map-support built in. Adding it explicitly doesn't do anything.
	await asyncSpawn(`npx ava ${fullPath} ${verboseFlag} ${watchFlag}`);
})().catch(error => {
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
