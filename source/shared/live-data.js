import {
	Entity,
} from './entities/index.js';
import {
	any,
	define,
	rules,
	ClassParts,
} from './utility/index.js';

export class LiveTable {
	constructor(options = {}) {
		const {Entity} = options;

		//TODO See if any of these can be validated or made constant.
		define.writable(this, {
			Entity,
			liveQueries:    [],
			cachedEntities: [],
		});
	}
}
define.constant(LiveTable, {
	makeTables() {
		return new Map(Entity.children.map((EntityClass) => [EntityClass, new this({Entity: EntityClass})]));
	},
});

export class CachedEntity {
	constructor(options = {}) {
		const {
			table,
			entity,
		} = options;

		//TODO See if any of these can be validated or made constant.
		define.writable(this, {
			table,
			entity,
			liveQueryRefs: [],
			timestamp: 0,
		});
	}
}

export class LiveQuery {
	constructor(options = {}) {
		const {table} = options;
		let   {query} = options;

		//? Not sure why this is being done.
		if (rules.array.test(query)) query = any(query);

		define.writable(this, {
			table,
			query,
			cachedEntityRefs: [],
			subscriptions:    [],
			timestamp: 0,
		});
	}
}

// live-data-server uses an augmented Subscription class.
export const subscriptionParts = new ClassParts({
	instance(options = {}) {
		const {
			liveQuery,
			onUpdate = () => {}, // Any update.
			onAdd    = () => {}, // Entities added.
			onEdit   = () => {}, // Entities data changed.
			onRemove = () => {}, // Entities removed.
		} = options;

		define.writable(this, {
			liveQuery,
			onUpdate,
			onAdd,
			onEdit,
			onRemove,
		});
	},
});
export class Subscription {
	constructor(options = {}) {
		subscriptionParts.instance(this, options);
	}
}
