// Simplified async wrapper for fs.writeFile, resolves when the file already exists.

const {writeFile} = require('fs');

module.exports = async function (path, data) {
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