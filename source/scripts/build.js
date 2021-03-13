// EXTERNAL
import webpack from 'webpack';

// INTERNAL
import asyncSpawn from '../node-utility/async-spawn.js';
import getModule from '../node-utility/get-module.js';
import {
	clientOptions,
	serverOptions,
	testsOptions,
} from '../config/webpack.config.js';
import {
	serverBuildFile,
	serverBuildDirectory,
} from '../config/project-paths.cjs';


(async () => {
	// TIMER
	const startTime = process.hrtime();
	
	const buildModes = {
		off:     0,
		compile: 1,
		watch:   2,
		refresh: 3,
		hot:     4,
	};

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
			// w: 'watch', //TODO Watch flag universal, then have targets overwrite it if specified.
		},
		string: [
			'client',
			'server',
			'start',
			'tests',
		],
		default: {
			// off, compile, watch
			client: 'compile',
			// off, compile, watch, refresh
			server: 'compile',
			// off, compile, watch
			tests:  'off',
			// path to server file
			start: serverBuildFile,
		},
	});
	
	// INTERPRET OPTIONS
	const clientBuildMode = buildModes[args.client];
	const serverBuildMode = buildModes[args.server];
	const testsBuildMode  = buildModes[args.tests];
	
	const buildClientHere = buildModes.compile <= clientBuildMode && clientBuildMode <= buildModes.watch;
	const buildServerHere = buildModes.compile <= serverBuildMode && serverBuildMode <= buildModes.refresh;
	const buildTestsHere  = buildModes.compile <= testsBuildMode  && testsBuildMode  <= buildModes.watch;
	
	const buildAnyHere = buildClientHere || buildServerHere || buildTestsHere;
	
	const watchAnyHere = buildAnyHere && (
		buildModes.watch <= clientBuildMode
		|| buildModes.watch <= serverBuildMode
		|| buildModes.watch <= testsBuildMode
	);
	
	const startServer = args.start !== '' && args.server !== 'off';

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
	if (buildTestsHere)  config.push(testsOptions( {}, {mode}));

	if (buildAnyHere) {
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
			console.log(stats.toString({
				colors: true,

				// Copied from 'minimal' default configuration.
				// Removed version, modules, assets.
				//L https://github.com/webpack/webpack/blob/3ac7ba2eb3e8d4935a4818ea71f31bb718b7c130/lib/stats/DefaultStatsPresetPlugin.js#L78
				all: false,
				version: false,
				timings: true,
				modules: false,
				modulesSpace: 0,
				assets: false,
				assetsSpace: 0,
				errors: true,
				errorsCount: true,
				warnings: true,
				warningsCount: true,
				logging: 'warn',
			}));
			resolve(stats);
		};

		// BUILD
		if (watchAnyHere) {
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
})().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
