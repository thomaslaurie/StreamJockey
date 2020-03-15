// Simplified async wrapper for fs.writeFile, resolves when the file already exists.

import { writeFile } from 'fs';

export default async function (path, data) {
	return new Promise((resolve, reject) => {
		writeFile(path, data, {flag: 'wx'}, (error) => {
			if (error != null && error.code !== 'EEXIST') {
				reject(error);
			} else {
				resolve();
			}
		});
	});
};