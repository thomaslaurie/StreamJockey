#!/usr/bin/env node
'use strict';

(async function () {
	// TIMER
	const startTime = process.hrtime();
	
	// DEPENDENCIES
	const path = require('path');
	const asyncSpawn = require('./util/async-spawn.js');
	const parser = await require('./util/get-module.js')('minimist', 'devDependencies');
	const createFile = require('./util/create-file.js');

	// OPTIONS
	const args = parser(process.argv.slice(2), {
		boolean: [
			'clean',
			'install',
			'production',
			'watch',
			'client-only',
			'server-only',
		],
		alias: {
			c: 'clean',
			i: 'install',
			p: 'production',
			w: 'watch',
		},
		string: [
			'webpack-path',
			'server-path', 
		],
		default: {
			'webpack-path': 'webpack.config.js',
			'server-path': '',
		},
	});

	const buildClient = !args['server-only'];
	const buildServer = !args['client-only'];
	const webpackPath = path.resolve(args['webpack-path']);
	const serverPath  = path.resolve(args['server-path']);

	// SEQUENTIAL
	if (args.clean) {
		await asyncSpawn('npm ci');
	} else if (args.install) {
		// Ideally install would also use 'npm ci', however there is an issue with doing this when an editor is open: https://github.com/microsoft/TypeScript/issues/29407
		await asyncSpawn('npm install');
	}
	if (buildServer) {
		// Creates an empty server file if it doesn't exist initially (before webpack builds it) so that node will have something to run.
		await createFile(serverPath, '');
	}

	// PARALLEL
	const mode     = args.production ? '--mode production' : '--mode development';
	const debug    = args.production ? ''                  : '--debug';
	const progress = args.production ? ''                  : '--progress';
	const watch    = args.watch      ? '--watch'           : '';
	const node     = args.watch      ? 'nodemon'           : 'node';

	//TODO Client will also build the server but just not run the server.
	asyncSpawn(`npx webpack --config ${webpackPath}  ${mode} ${debug} ${progress} ${watch}`);
	if (buildServer) {
		asyncSpawn(`${node} ${serverPath} --experimental-modules`);
	}

	// TIMER
	const [buildTime] = process.hrtime(startTime);
	console.log(`\nBuild Time: ${buildTime} seconds\n`);
})().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
