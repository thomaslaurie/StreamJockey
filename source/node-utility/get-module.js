// Returns a module, if it can't be found, install it and then return it.

import path from 'path';
import asyncSpawn from './async-spawn.js';

export default async function getModule(name, location = 'dependencies') {
	try {
		return await import(name).then(module => module.default);
	} catch (e) {
		const packageJSON = await import(path.resolve('package.json')).then(module => module.default);

		if (packageJSON === null || typeof packageJSON !== 'object') {
			throw new Error(`package.json is not an object: ${packageJSON}`);
		}
		if (packageJSON[location] === null || typeof packageJSON[location] !== 'object') {
			throw new Error(`package.json ${location} is not an object: ${packageJSON[location]}`);
		}
		if (packageJSON[location][name] === undefined) {
			throw new Error(`${name} is missing from package.json ${location}`);
		}

		const version = packageJSON[location][name];

		// Do not update package.json, this prevents a caret from being added to pinned versions.
		const command = `npm install ${name}@${version} --no-save`;
		await asyncSpawn(command);

		return import(name).then(module => module.default);
	}
}
