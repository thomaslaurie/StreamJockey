// Simplified async wrapper for fs.unlink, resolves when the file doesn't exist.

const {unlink} = require('fs');

module.exports = async function (path) {
	return new Promise((resolve, reject) => {
		unlink(path, (error) => {
			if (error != null && error !== 'ENOENT') {
				reject(error);
			} else {
				resolve();
			}
		});
	});
};