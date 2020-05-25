import Base from './legacy-classes/base.js';
import {
	Entity,
} from './entities/index.js';
import { 
	any,
} from './utility/index.js';

export const LiveTable = Base.makeClass('LiveTable', Base, {
	constructorParts: parent => ({
		defaults: {
			Entity: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				liveQueries: [],
				cachedEntities: [],
			});
		},
	}),
	staticProperties: parent => ({
		makeTables(tableKeys) {
			return new Map(Entity.children.map(EntityClass => [EntityClass, new this({Entity: EntityClass})]));
		},
	}),
});
export const CachedEntity = Base.makeClass('CachedEntity', Base, {
	constructorParts: parent => ({
		defaults: {
			table: undefined,
			entity: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				liveQueryRefs: [],

				timestamp: 0,
			});
		},
	}),
});
export const LiveQuery = Base.makeClass('LiveQuery', Base, {
	constructorParts: parent => ({
		beforeInitialize(accessory) {
			if (Array.isArray(accessory.options.query)) {
				accessory.options.query = any(accessory.options.query);
			}
		},
		defaults: {
			table: undefined,
			query: undefined,
		},
		afterInitialize() {
			Object.assign(this, {
				cachedEntityRefs: [],
				subscriptions: [],

				timestamp: 0,
			});
		},
	}),
});
export const Subscription = Base.makeClass('Subscription', Base, {
	//? should this inherit from Success since it will be returned from a function>
	constructorParts: parent => ({
		defaults: {
			liveQuery: undefined,

			onUpdate() {}, //C any update
			onAdd() {}, //C entities added
			onEdit() {}, //C entities data changed
			onRemove() {}, //C entities removed
		},
	}),
});
