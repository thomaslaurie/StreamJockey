// INTERNAL
import {
	pick,
	asyncMap,
	any,
	rules,
	define,
} from '../../shared/utility/index.js';
import database from '../db.js';
import {
	Success,
} from '../../shared/legacy-classes/success.js';
import {
	entityParts,
} from '../../shared/entityParts/index.js';
import propagate from '../../shared/propagate.js';
import {
	buildValues,
	buildWhere,
	buildSet,
} from '../database/sql-builders.js';
import isEmpty from '../legacy/is-empty.js';
import {
	MultipleErrors,
} from '../../shared/errors/index.js';
import ContentContainer from '../../shared/content-container.js';
import PostgresError from '../errors/postgres-error.js';


export default class Entity extends Success {
	constructor(...args) {
		entityParts.intercept(...args);
		super(...args);
		entityParts.instance(this, ...args);
	}
}
entityParts.prototype(Entity);
entityParts.static(Entity);

define.constant(Entity.prototype, {
	async add(db) {
		return this.constructor.add(this, db);
	},
	async get(db) {
		return this.constructor.get(this, db);
	},
	async edit(db) {
		return this.constructor.edit(this, db);
	},
	async remove(db) {
		return this.constructor.remove(this, db);
	},
});
define.writable(Entity, {
	notify() {
		throw new Error('LiveData has not yet been initialized for client notifications.');
	},
});
define.constant(Entity, {
	// CRUD METHODS
	async add(query, db = database) {
		return this.frame(db, query, 'add');
	},
	async get(query, db = database) {
		return this.frame(db, query, 'get');
	},
	async edit(query, db = database) {
		return this.frame(db, query, 'edit');
	},
	async remove(query, db = database) {
		return this.frame(db, query, 'remove');
	},
	async getMimic(query, db = database) {
		// getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in liveData.notify()
		return this.frame(db, query, 'getMimic');
	},

	// FRAME
	async frame(db, anyEntities, methodName) {
		// catch Entity
		if (this === Entity) throw new CustomError({
			message: `cannot call CRUD method directly on Entity`,
		});

		// cast as array
		const entities = any(anyEntities);

		// shorthand
		const isGetMimic = methodName === 'getMimic'; // store getMimic
		if (isGetMimic) methodName = 'get'; // 'getMimic' === 'get' for functions: [methodName+'Function']
		const isGet = methodName === 'get';

		const accessory = {};
		

		const after = await db.tx(async t => {
			// process
			const beforeEntities = await this[methodName+'Before'](t, entities, accessory);

			// validate
			const validatedEntities = await asyncMap(beforeEntities, async entity => await this.validate(entity, methodName).catch(propagate)).catch(MultipleErrors.throw);

			// prepare
			const preparedEntities = await asyncMap(validatedEntities, async entity => await this[methodName+'Prepare'](t, entity, accessory).catch(propagate)).catch(MultipleErrors.throw);

			// accommodate
			const influencedEntities = !isGet ? await this[methodName+'Accommodate'](t, preparedEntities, accessory).catch(propagate) : [];

			// map
			const inputMapped = this.mapColumns(preparedEntities);
			const influencedMapped = !isGet ? this.mapColumns(influencedEntities) : [];


			// execute SQL for inputs
			const inputBefore = [];
			const inputAfter = isGetMimic ? inputMapped : [];
			if (!isGetMimic) {
				await asyncMap(inputMapped, async entity => {
					// before, ignore add
					if (!isGet && methodName !== 'add') {
						const before = await this.getQuery(t, pick(entity, this.filters.id)).then(any).catch(propagate)
						inputBefore.push(...before);
					}

					// after, ignore remove (still needs to execute though)
					const after = await this[methodName+'Query'](t, entity).then(any).catch(propagate);
					if (methodName !== 'remove') inputAfter.push(...after);
				}).catch(MultipleErrors.throw);
			}

			// execute SQL for influenced
			const influencedBefore = [];
			const influencedAfter = [];
			if (!isGet) {
				await asyncMap(influencedMapped, async influencedEntity => {
					const before = await this.getQuery(t, pick(influencedEntity, this.filters.id)).then(any).catch(propagate);
					influencedBefore.push(...before);

					const after = await this.editQuery(t, influencedEntity).then(any).catch(propagate);
					influencedAfter.push(...after);
				}).catch(MultipleErrors.throw);
			}


			// group for iteration
			const all = [inputBefore, inputAfter, influencedBefore, influencedAfter];

			// unmap
			const unmapped = all.map(list => this.unmapColumns(list));

			// process
			return await asyncMap(unmapped, async list => await this[methodName+'After'](t, list, accessory).catch(propagate)).catch(MultipleErrors.throw);
		}).catch(propagate); //! finish the transaction here so that notify won't be called before the database has updated

		// shake for subscriptions with getOut filter
		const shookGet = after.map(list => any(list).map((item) => pick(item, this.filters.getOut)));

		// timestamp, used for ignoring duplicate notifications in the case of before and after edits, and overlapping queries
		const timestamp = Date.now();

		// if get, don't notify
		if (!isGet) shookGet.forEach(list => this.notify(this, list, timestamp, methodName));
		// if getMimic, return shookGet-after
		else if (isGetMimic) return shookGet[1]; 

		// shake for return
		const shook = after.map(list => any(list).map((item) => pick(item, this.filters[methodName+'Out'])));

		// rebuild
		const built = shook.map(list => list.map(entity => new this(entity)));

		return new ContentContainer({
			//R content is the inputAfter, for removals this will be an empty array, if in the future some 'undo' functionality is needed consider: returned data should still be filtered by removeOut, and therefore might destroy data if this returned data is used to restore it
			content: built[1],
			timestamp,
		});
	},
});

// FRAME PARTS
//G all of these parts are dependant on each other (eg. accessory), so it is ok to make assumptions between these functions

// Processes all before validation.
async function baseBefore(t, entities) {
	return entities.slice();
}
define.constant(Entity, {
	addBefore:    baseBefore,
	getBefore:    baseBefore,
	editBefore:   baseBefore,
	removeBefore: baseBefore,

	// Validates each using Entity.schema
	async validate(entity, methodName) {
		const validated = {};
		await asyncMap(Object.keys(this.schema), async (key) => {
			const {
				rule: validator,
				[methodName]: {check},
			} = this.schema[key];
			const isRequired = check === 2;
			const isOptional = check === 1;

			rules.func.validate(validator);

			const value = entity[key];

			if (isRequired || (isOptional && !isEmpty(value))) {
				await validator(value);
				validated[key] = value;
			}
		}).catch(MultipleErrors.throw);

		return validated;
	},
});

// Modifies each after validation.
async function basePrepare(t, entity) {
	return {...entity};
}
define.constant(Entity, {
	addPrepare:    basePrepare,
	getPrepare:    basePrepare,
	editPrepare:   basePrepare,
	removePrepare: basePrepare,
});

// Modifies input entities, returns other influenced entities. checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities.
async function baseAccommodate() {
	return [];
}
define.constant(Entity, {
	addAccommodate:    baseAccommodate,
	getAccommodate:    baseAccommodate,
	editAccommodate:   baseAccommodate,
	removeAccommodate: baseAccommodate,

	// Maps js property names to database column names.
	mapColumns(entities) {
		// Switches entities' js named keys for column named keys based on schema.
		return entities.map((entity) => { // For each entity.
			const mappedEntity = {};
			Object.keys(entity).forEach((key) => { // For each property.
				if (rules.object.test(this.schema[key]) && rules.string.test(this.schema[key].columnName)) { // If schema has property.
					mappedEntity[this.schema[key].columnName] = entity[key]; // Set mappedEntity[columnName] as property value.
				} else {
					console.warn(`Entity.mapColumns() - property ${key} in entity not found in schema`);
				}
			});
			return mappedEntity;
		});
	},
	unmapColumns(mappedEntities) {
		// Inverse of mapColumns().
		return mappedEntities.map((mappedEntity) => { // For each entity.
			const entity = {};
			Object.keys(mappedEntity).forEach((columnName) => { // For each columnName.
				const key = Object.keys(this.schema).find((key) => this.schema[key].columnName === columnName); // Find key in schema with same columnName.
				if (rules.string.test(key)) {
					// Set entity[key] as value of mappedEntity[columnName].
					entity[key] = mappedEntity[columnName];
				} else {
					console.warn(`Entity.unmapColumns() - column ${columnName} in mappedEntity not found in schema`);
				}
			});
			return entity;
		});
	},

	//! this should be overwritten with different ORDER BY columns
	queryOrder: `ORDER BY "id" ASC`,

	// Executes SQL queries.
	async addQuery(t, mappedEntity) {
		const values = buildValues(mappedEntity);

		//? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
		//L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text
		return t.one(`
			INSERT INTO "sj"."${this.table}" 
			$1:raw 
			RETURNING *
		`, [values]).catch((rejected) => {
			throw new PostgresError({
				postgresError: rejected,
				userMessage: `Could not add ${this.name}s.`,
			});
		});
	},
	async getQuery(t, mappedEntity) {
		const where = buildWhere(mappedEntity);

		return t.any(`
			SELECT * 
			FROM "sj"."${this.table}" 
			WHERE $1:raw
			${this.queryOrder}
		`, [where]).catch((rejected) => {
			throw new PostgresError({
				postgresError: rejected,
				userMessage: `Could not get ${this.name}s.`,
			});
		});
	},
	async editQuery(t, mappedEntity) {
		const {id, ...mappedEntitySet} = mappedEntity;
		const set = buildSet(mappedEntitySet);
		const where = buildWhere({id});

		return t.one(`
			UPDATE "sj"."${this.table}" 
			SET $1:raw 
			WHERE $2:raw 
			RETURNING *
		`, [set, where]).catch((rejected) => {
			throw new PostgresError({
				postgresError: rejected,
				userMessage: `Could not edit ${this.name}s.`,
			});
		});
	},
	async removeQuery(t, mappedEntity) {
		const where = buildWhere(mappedEntity);

		return  t.one(`
			DELETE FROM "sj"."${this.table}" 
			WHERE $1:raw 
			RETURNING *
		`, where).catch((rejected) => {
			throw new PostgresError({
				postgresError: rejected,
				userMessage: `Could not remove ${this.name}s.`,
			});
		});
	},
});

// Processes all after execution.
async function baseAfter(t, entities, accessory) {
	return entities.slice();
}
define.constant(Entity, {
	addAfter:    baseAfter,
	getAfter:    baseAfter,
	editAfter:   baseAfter,
	removeAfter: baseAfter,
});
