// #!/usr/bin/env node

// DEPENDENCIES
import path from 'path';
import asyncSpawn from './util/async-spawn.mjs';
import getModule from './util/get-module.mjs';
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
			// 'webpack-path',
			// --webpack-path=source/config/webpack.config.js
			'server-path', 
			'client',
			'server',
		],
		default: {
			// 'webpack-path': 'webpack.config.js',
			'server-path': '',

			// 'off', 'compile', 'watch', 'refresh', 'hot'
			'client': 'compile',
			// 'off', 'compile', 'watch', 'refresh', 'hot'
			'server': 'refresh',
		},
	});

	// INTERPRET
	const buildClientHere = 
		args.client === 'compile' || 
		args.client === 'watch';
	const buildClientOnServer = 
		args.client === 'refresh' ||
		args.client === 'hot';
	// No client start semantics (yet).
	
	const buildServerHere = 
		args.server === 'compile' ||
		args.server === 'watch'   ||
		args.server === 'refresh'; // nodemon
	//TODO consider:
	// const buildServerOnProxy = 
	// 	args.server === 'hot';
	const startServer = 
		args.server === 'refresh';
	//TODO split off semantics of 'build' vs 'start', sort out compile/watch of server vs client

	const buildHere = buildClientHere || buildServerHere;
	const watch = buildHere && (args.client === 'watch' || args.server === 'watch');



	const serverPath  = path.resolve(args['server-path']);

	// SEQUENTIAL
	if (args.clean) {
		await asyncSpawn('npm ci');
	} else if (args.install) {
		// Ideally install would also use 'npm ci', however there is an issue with doing this when an editor is open: https://github.com/microsoft/TypeScript/issues/29407
		await asyncSpawn('npm install');
	}

	// if (buildServer) {
		// Creates an empty server file if it doesn't exist initially (before webpack builds it) so that node will have something to run.
		// await createFile(serverPath, '');
	// }

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



	// BUILD CONFIGURATIONS
	const mode = args.production ? 'production' : 'development';
	const configOptions = [];
	if (buildClientHere) configOptions.push(clientOptions({}, {mode}));
	if (buildServerHere) configOptions.push(serverOptions({}, {mode}));

	if (buildHere) {
		const compiler = webpack(configOptions);

		// BUILD HANDLER
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
	
		// COMPILE
		if (watch) {
			const watchOptions = {};
			compiler.watch(watchOptions, compileHandler);
		} else {
			compiler.run(compileHandler);
		}

		await deferred;
	}

	// START SERVER
	if (startServer) {
		const node = args.server === 'refresh' ? 'nodemon' : 'node';
		const clientBuildType = buildClientOnServer ? `--client=${args.client}` : '';
		await asyncSpawn(`${node} ${serverPath} ${clientBuildType} --client-mode=${mode} --experimental-modules`);
	}



	// TIMER
	const [buildTime] = process.hrtime(startTime);
	console.log(`\nBuild Time: ${buildTime} seconds\n`);
})().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
