/*
	Provides a system for determining the class to reconstruct from a raw object passed between the client and server.
	Inheritance is preserved as child instances will overwrite their parent's id.
	//! //G Id's must be hard-coded and not generated.
		Otherwise different realms (client, server) would produce different keys.
		Use the class name for simplicity.
*/

import {
	rules,
	define,
} from './utility/index.js';

export default class ClassRegistry {
	constructor(idKey) {
		rules.string.validate(idKey);
		define.constant(this, {
			idKey,
			registry: [],
		});
	}
}
define.constant(ClassRegistry.prototype, {
	defineId(target, id) {
		rules.string.validate(id);

		// Must be writable so that sub-classes can overwrite the id with a more specific one.
		define.writable(target, {
			[this.idKey]: id,
		});
	},
	register(Class, id) {
		rules.constructor.validate(Class);
		rules.string.validate(id);

		this.registry.forEach((registered) => {
			if (registered.Class === Class) {
				throw new Error('Cannot register auto constructable class, as the class has already been registered.');
			}
			if (registered.id === id) {
				throw new Error('Cannot register auto constructable class, as the id has already been registered.');
			}
		});

		this.registry.push({Class, id});
	},
	autoConstruct(value) {
		const registered = this.registry.find((registered) => registered.id === value?.[this.idKey]);

		return (registered === undefined) ? value : new registered.Class(value);
	},
});

export const sharedRegistry = new ClassRegistry('sharedRegistryIdKey');
