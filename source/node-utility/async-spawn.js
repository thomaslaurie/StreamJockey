// Simplified async wrapper for child_process.spawn
import chalk from 'chalk';
import {spawn} from 'child_process';

export default async function (command, options = {}) {
	return new Promise((resolve, reject) => {
		console.log(chalk.black.bgWhite(`${command}\n`));
		const childProcess = spawn(command, [], {
			// 'pipe' doesn't work, not sure why.
			stdio: [process.stdin, process.stdout, process.stderr],
			...options,
			// Always run with a shell, see: https://github.com/nodejs/node/issues/12986#issuecomment-300953155
			shell: true,
		});
		childProcess.on('close', (code, signal) => {
			if (code === 0) {
				resolve({code, signal});
			} else {
				reject({code, signal});
			}
		});
	});
};