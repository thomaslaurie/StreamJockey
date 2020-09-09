// Simplified async wrapper for fs.unlink, resolves when the file doesn't exist.

import {unlink} from 'fs';

export default async function deleteFile(path) {
	return new Promise((resolve, reject) => {
		unlink(path, (error) => {
			if (error != null && error !== 'ENOENT') {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}
