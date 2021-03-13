//TODO Add option: source, which runs test on source files (not ts ones).

import getModule  from '../node-utility/get-module.js';
import asyncSpawn from '../node-utility/async-spawn.js';
import sourcePath from '../node-utility/source-path.cjs';
import {
	sourceDirectory,
	testsBuildDirectory,
	testSuffixGlob,
	testSuffixRegexp,
	toForwardSlash,
} from '../config/project-paths.cjs';

(async () => {
	const parser = await getModule('minimist', 'devDependencies');
	const args = parser(process.argv.slice(2), {
		boolean: [
			'source',
			'verbose',
			'watch',
		],
		alias: {
			s: 'source',
			v: 'verbose',
			w: 'watch',
		},
	});
	const {
		_: [path = ''], // Fist non-option argument can be a directory or file path relative to the build directory.
		source, // Whether to test directly from source files.
		verbose,
		watch,
	} = args;

	const baseDirectory = source ? sourceDirectory : testsBuildDirectory;
	const absolutePath = toForwardSlash(sourcePath(baseDirectory, path));
	
	// If the path doesn't have the testSuffix, then it is a directory. Glob-match all test files within that directory.
	const absoluteGlob = (testSuffixRegexp.test(absolutePath)
		? absolutePath
		: `${absolutePath}/**/*${testSuffixGlob}`
	);

	const verboseFlag = verbose ? '--verbose' : '';
	const watchFlag   = watch   ? '--watch'   : '';

	// Run tests with ava.
	//R Ava seems to have source-map-support built in. Adding it explicitly doesn't do anything.
	await asyncSpawn(`npx ava ${absoluteGlob} ${verboseFlag} ${watchFlag}`);
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
