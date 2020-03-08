// Returns a module, if it can't be found, install it and then return it.

const path = require('path');
const asyncSpawn = require('./async-spawn.js');

module.exports = async function (name, location = 'dependencies') {
	try {
		return require(name);
	} catch (e) {
		const packageJSON = require(path.resolve('package.json'));

		if (packageJSON === null || typeof packageJSON !== 'object') {
			throw `package.json is not an object: ${packageJSON}`;
		}
		if (packageJSON[location] === null || typeof packageJSON[location] !== 'object') {
			throw `package.json ${location} is not an object: ${packageJSON[location]}`;
		}
		if (packageJSON[location][name] === undefined) {
			throw `${name} is missing from package.json ${location}`;
		}

		const version = packageJSON[location][name];

		// Do not update package.json, this prevents a caret from being added to pinned versions.
		const command = `npm install ${name}@${version} --no-save`; 
		await asyncSpawn(command);

		return require(name);
	}
};