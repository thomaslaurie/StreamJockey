//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// EXTERNAL
import webpack from 'webpack';

// INTERNAL
import asyncSpawn from '../node-utility/async-spawn.js';
import getModule from '../node-utility/get-module.js';
import {clientOptions, serverOptions} from '../config/webpack.config.js';
import {
	serverBuildFile,
	serverBuildDirectory,
} from '../config/project-paths.js';


//  ██████╗ ██╗   ██╗██╗██╗     ██████╗ 
//  ██╔══██╗██║   ██║██║██║     ██╔══██╗
//  ██████╔╝██║   ██║██║██║     ██║  ██║
//  ██╔══██╗██║   ██║██║██║     ██║  ██║
//  ██████╔╝╚██████╔╝██║███████╗██████╔╝
//  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ 

(async () => {
	// TIMER
	const startTime = process.hrtime();

	// OPTIONS
	const parser = await getModule('minimist', 'devDependencies');
	const args = parser(process.argv.slice(2), {
		boolean: [
			'clean',
			'install',
			'production',
		],
		alias: {
			c: 'clean',
			i: 'install',
			p: 'production',
			w: 'watch',
		},
		string: [
			'client',
			'server',
			'start',
		],
		default: {
			// off, compile, watch
			client: 'compile',
			// off, compile, watch, refresh
			server: 'compile',
			// path to server file
			start: serverBuildFile,
		},
	});

	// INTERPRET OPTIONS
	const buildClientHere
		=  args.client === 'compile'
		|| args.client === 'watch';
	const buildServerHere
		=  args.server === 'compile'
		|| args.server === 'watch'
		|| args.server === 'refresh';
	const buildHere = buildClientHere || buildServerHere;
	const watch = buildHere && (
		   args.client === 'watch'
		|| args.server === 'watch'
		|| args.server === 'refresh'
	);
	const startServer = args.start !== '';


	// INSTALL
	if (args.clean) {
		await asyncSpawn('npm ci');
	} else if (args.install) {
		// Ideally install would also use 'npm ci', however there is an issue with doing this when an editor is open: https://github.com/microsoft/TypeScript/issues/29407
		await asyncSpawn('npm install');
	}

	// BUILD CONFIG
	const mode = args.production ? 'production' : 'development';
	const config = [];
	if (buildClientHere) config.push(clientOptions({}, {mode}));
	if (buildServerHere) config.push(serverOptions({}, {mode}));

	if (buildHere) {
		const compiler = webpack(config);

		// BUILD HANDLER
		let resolve;
		let reject;
		const compilerPromise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});
		const compilerCallback = (error, stats) => {
			if (error) {
				reject('error');
				return;
			}
			console.log(stats.toString({colors: true}));
			resolve(stats);
		};

		// BUILD
		if (watch) {
			const watchOptions = {};
			compiler.watch(watchOptions, compilerCallback);
		} else {
			compiler.run(compilerCallback);
		}
		await compilerPromise;
	}

	// START SERVER
	if (startServer) {
		const node = args.server === 'refresh' ? 'nodemon' : 'node';

		await asyncSpawn(`cd ${serverBuildDirectory} && npx ${node} --require source-map-support/register ${serverBuildFile}`);
	}

	// TIMER
	const [buildTime] = process.hrtime(startTime);
	console.log(`\nBuild Time: ${buildTime} seconds\n`);
})().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
