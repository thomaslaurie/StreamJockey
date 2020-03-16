// #!/usr/bin/env node

// DEPENDENCIES
import path from 'path';
import asyncSpawn from './util/async-spawn.mjs';
import getModule from './util/get-module.mjs';
import createFile from './util/create-file.mjs';
import webpack from 'webpack';
import { clientOptions, serverOptions } from '../source/config/webpack.config2.mjs';

(async function () {
	// TIMER
	const startTime = process.hrtime();
	
	// OPTIONS
	const parser = await getModule('minimist', 'devDependencies');
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
		// await createFile(serverPath, '');
	}

	// PARALLEL
	// const mode     = args.production ? '--mode production' : '--mode development'; // pass thru
	// const debug    = args.production ? ''                  : '--debug';  // ignore
	// const progress = args.production ? ''                  : '--progress'; // always
	// const watch    = args.watch      ? '--watch'           : '';
	// const node     = args.watch      ? 'nodemon'           : 'node';

	// const parallel = [];
	// //TODO Client will also build the server but just not run the server.
	// parallel.push(asyncSpawn(`npx webpack --config ${webpackPath}  ${mode} ${debug} ${progress} ${watch}`));
	// if (buildServer) {
	// 	asyncSpawn(`${node} ${serverPath} --experimental-modules`)
	// }
	// await Promise.all(parallel);




	const mode = args.production ? 'production' : 'development';

	const configOptions = [];
	if (buildClient) {
		configOptions.push(clientOptions({}, {
			mode,
		}));
	}
	if (buildServer) {
		configOptions.push(serverOptions({}, {
			mode,
		}));
	}

	const compiler = webpack(configOptions);

	let resolve, reject;
	const deferred = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	const compileHandler = (error, stats) => {
		if (error) {
			reject('error');
			return;
		}
		console.log(stats.toString({colors: true}));
		resolve(stats);
	};

	if (args.watch) {
		const watchOptions = {};
		compiler.watch(watchOptions, compileHandler);
	} else {
		compiler.run(compileHandler);
	}

	await deferred;

	if (buildServer) {
		//---------- why am I still getting this window issue?
		const node     = args.watch      ? 'nodemon'           : 'node';
		await asyncSpawn(`${node} ${serverPath} --experimental-modules`);
	}


	// TIMER
	const [buildTime] = process.hrtime(startTime);
	console.log(`\nBuild Time: ${buildTime} seconds\n`);
})().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
