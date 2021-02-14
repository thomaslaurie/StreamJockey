import {markRaw, reactive} from 'vue';
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
	tableEntities: [],
	makeTables({User, Playlist, Track}) {
		this.tableEntities.push(User, Playlist, Track);
		return new Map(this.tableEntities.map(EntityClass => [EntityClass, new this({Entity: EntityClass})]));
	},
	tableToEntity(tableName) {
		//TODO Refactor this.
		const FoundEntity = this.tableEntities.find(tableEntity => tableEntity.table === tableName);
		if (FoundEntity === undefined) {
			throw new Error(`Could not convert table name ${tableName} to an entity class. The corresponding entity class was not found.`);
		}
		return FoundEntity;

		//R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
		//R any metadata (table) should be sent separately (or implicitly) from the query
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
			liveQuery: reactive(liveQuery), //TODO Why was this made reactive?
			onUpdate,
			onAdd,
			onEdit,
			onRemove,
		});

		// Prevent Vue from creating proxies for this object.
		//R The circular reference don't seem to play well.
		markRaw(this);
	},
});
export class Subscription {
	constructor(options = {}) {
		subscriptionParts.instance(this, options);
	}
}
