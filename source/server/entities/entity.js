// INTERNAL
import {
	pick,
	asyncMap,
	any,
	rules,
} from '../../shared/utility/index.js';
import database from '../db.js';
import liveData from '../live-data-server.js';
import { 
	ErrorList, 
	Err,
} from '../../shared/legacy-classes/error.js';
import {
	Success,
	SuccessList,
} from '../../shared/legacy-classes/success.js';
import Rule1 from '../../shared/legacy-classes/rule1.js';
import {
	Entity,
} from '../../shared/entities/index.js';
import propagate from '../../shared/propagate.js';
import parsePostgresError from '../parse-postgres-error.js';
import {
	buildValues,
	buildWhere,
	buildSet,
} from '../database/sql-builders.js';
import isEmpty from '../legacy/is-empty.js';

Entity.augmentClass({
	prototypeProperties: parent => ({
		async add(db) {
			return await this.constructor.add(this, db);
		},
		async get(db) {
			return await this.constructor.get(this, db);
		},
		async edit(db) {
			return await this.constructor.edit(this, db);
		},
		async remove(db) {
			return await this.constructor.remove(this, db);
		},
	}),
	staticProperties(parent) {
		// CRUD METHODS
		this.add = async function (query, db = database) {
			return await this.frame(db, query, 'add');
		};
		this.get = async function (query, db = database) {
			return await this.frame(db, query, 'get');
		};
		this.edit = async function (query, db = database) {
			return await this.frame(db, query, 'edit');
		};
		this.remove = async function (query, db = database) {
			return await this.frame(db, query, 'remove');
		};
		this.getMimic = async function (query, db = database) {
			//C getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in liveData.notify()
			return await this.frame(db, query, 'getMimic');
		};


		// FRAME
		this.frame = async function (db, anyEntities, methodName) {
			//C catch Entity
			if (this === Entity) throw new Err({
				origin: 'Entity.[CRUD]',
				reason: `cannot call CRUD method directly on Entity`,
			});

			//C cast as array
			const entities = any(anyEntities);

			//C shorthand
			const isGetMimic = methodName === 'getMimic'; //C store getMimic
			if (isGetMimic) methodName = 'get'; //C 'getMimic' === 'get' for functions: [methodName+'Function']
			const isGet = methodName === 'get';

			const accessory = {};
			

			const after = await db.tx(async t => {
				//C process
				const beforeEntities = await this[methodName+'Before'](t, entities, accessory);

				//C validate
				const validatedEntities = await asyncMap(beforeEntities, async entity => await this.validate(entity, methodName).catch(propagate));

				//C prepare
				const preparedEntities = await asyncMap(validatedEntities, async entity => await this[methodName+'Prepare'](t, entity, accessory).catch(propagate));

				//C accommodate
				const influencedEntities = !isGet ? await this[methodName+'Accommodate'](t, preparedEntities, accessory).catch(propagate) : [];

				//C map
				const inputMapped = this.mapColumns(preparedEntities);
				const influencedMapped = !isGet ? this.mapColumns(influencedEntities) : [];


				//C execute SQL for inputs
				const inputBefore = [];
				const inputAfter = isGetMimic ? inputMapped : [];
				if (!isGetMimic) {
					await asyncMap(inputMapped, async entity => {
						//C before, ignore add
						if (!isGet && methodName !== 'add') {
							const before = await this.getQuery(t, pick(entity, this.filters.id)).then(any).catch(propagate)
							inputBefore.push(...before);
						}

						//C after, ignore remove (still needs to execute though)
						const after = await this[methodName+'Query'](t, entity).then(any).catch(propagate);
						if (methodName !== 'remove') inputAfter.push(...after);
					}).catch(rejected => {
						throw propagate(new ErrorList({
							...this[methodName+'Error'](),
							content: rejected,
						}));
					});
				}

				//C execute SQL for influenced
				const influencedBefore = [];
				const influencedAfter = [];
				if (!isGet) {
					await asyncMap(influencedMapped, async influencedEntity => {
						const before = await this.getQuery(t, pick(influencedEntity, this.filters.id)).then(any).catch(propagate);
						influencedBefore.push(...before);

						const after = await this.editQuery(t, influencedEntity).then(any).catch(propagate);
						influencedAfter.push(...after);
					}).catch(rejected => {
						throw propagate(new ErrorList({
							...this[methodName+'Error'](),
							content: rejected,
						}));
					});
				}


				//C group for iteration
				const all = [inputBefore, inputAfter, influencedBefore, influencedAfter];

				//C unmap
				const unmapped = all.map(list => this.unmapColumns(list));

				//C process
				return await asyncMap(unmapped, async list => await this[methodName+'After'](t, list, accessory).catch(propagate));
			}).catch(propagate); //! finish the transaction here so that notify won't be called before the database has updated

			//C shake for subscriptions with getOut filter
			const shookGet = after.map(list => any(list).map((item) => pick(item, this.filters.getOut)));

			//C timestamp, used for ignoring duplicate notifications in the case of before and after edits, and overlapping queries
			const timestamp = Date.now();

			//C if get, don't notify
			if (!isGet) shookGet.forEach(list => liveData.notify(this, list, timestamp, methodName));
			//C if getMimic, return shookGet-after
			else if (isGetMimic) return shookGet[1]; 

			//C shake for return
			const shook = after.map(list => any(list).map((item) => pick(item, this.filters[methodName+'Out'])));

			//C rebuild
			const built = shook.map(list => list.map(entity => new this(entity)));

			return new SuccessList({
				...this[methodName+'Success'](),
				//R content is the inputAfter, for removals this will be an empty array, if in the future some 'undo' functionality is needed consider: returned data should still be filtered by removeOut, and therefore might destroy data if this returned data is used to restore it
				content: built[1], 
				timestamp,
			});
		};


		// FRAME PARTS
		//G all of these parts are dependant on each other (eg. accessory), so it is ok to make assumptions between these functions

		//C processes all before validation
		this.addBefore = 
		this.getBefore = 
		this.editBefore = 
		this.removeBefore = async function (t, entities, accessory) {
			return entities.slice();
		};

		//C validates each using Entity.schema
		this.validate = async function (entity, methodName) {
			const validated = {};
			await asyncMap(Object.keys(this.schema), async key => {
				const prop = this.schema[key];

				//C catches
				if (!(prop.rule instanceof Rule1)) { // Rule1
					throw new Err({
						log: true,
						origin: 'Entity.validate()',
						message: 'validation error',
						reason: `${key}'s rule is not an Rule1`,
						content: prop,
					});
				}

				//C check if optional and not empty, or if required
				if ((prop[methodName].check && !isEmpty(entity[key])) || prop[methodName].check === 2) {
					//G the against property can be specified in the schema and then assigned to the entity[againstName] before validation
					const checked = await prop.rule.check(entity[key], entity[prop.against]);
					validated[key] = checked.content;
					return checked;
				} else {
					//C don't pack into validated
					return new Success({
						origin: 'Entity.validate()',
						message: `optional ${key} is empty, skipped validation`,
					});
				}
			}).catch(rejected => {
				throw new ErrorList({
					origin: 'Entity.validate()',
					message: 'one or more issues with properties',
					reason: 'validating properties returned one or more errors',
					content: rejected,
				});
			});

			return validated;
		};

		//C modifies each after validation
		this.addPrepare =
		this.getPrepare =
		this.editPrepare = 
		this.removePrepare = async function (t, entity, accessory) {
			return Object.assign({}, entity);
		}

		//C modifies input entities, returns other influenced entities. checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities
		this.addAccommodate =
		this.getAccommodate =
		this.editAccommodate =
		this.removeAccommodate = async function (t, entities, accessory) {
			return [];
		};

		//C maps js property names to database column names
		this.mapColumns = function (entities) {
			//C switches entities' js named keys for column named keys based on schema
			return entities.map(entity => { //C for each entity
				let mappedEntity = {};
				Object.keys(entity).forEach(key => { //C for each property
					if (rules.object.test(this.schema[key]) && rules.string.test(this.schema[key].columnName)) { //C if schema has property 
						mappedEntity[this.schema[key].columnName] = entity[key]; //C set mappedEntity[columnName] as property value
					} else {
						console.warn(`Entity.mapColumns() - property ${key} in entity not found in schema`);
					}
				});
				return mappedEntity;
			});
		};
		this.unmapColumns = function (mappedEntities) {
			//C inverse of mapColumns()
			return mappedEntities.map(mappedEntity => { //C for each entity
				let entity = {};
				Object.keys(mappedEntity).forEach(columnName => { //C for each columnName
					let key = Object.keys(this.schema).find(key => this.schema[key].columnName === columnName); //C find key in schema with same columnName
					if (rules.string.test(key)) {
						//C set entity[key] as value of mappedEntity[columnName]
						entity[key] = mappedEntity[columnName];
					} else {
						console.warn(`Entity.unmapColumns() - column ${columnName} in mappedEntity not found in schema`);
					}
				});
				return entity;
			});
		};

		//! this should be overwritten with different ORDER BY columns
		this.queryOrder = `ORDER BY "id" ASC`; 

		//C executes SQL queries
		this.addQuery = async function (t, mappedEntity) {
			let values = buildValues(mappedEntity);

			//? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
			//L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text
			let row = await t.one(`
				INSERT INTO "sj"."${this.table}" 
				$1:raw 
				RETURNING *
			`, [values]).catch(rejected => { 
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `${this.name}.add()`,
					message: `could not add ${this.name}s`,
				}));
			});

			return row;
		};
		this.getQuery = async function (t, mappedEntity) {
			let where = buildWhere(mappedEntity);

			let rows = await t.any(`
				SELECT * 
				FROM "sj"."${this.table}" 
				WHERE $1:raw
				${this.queryOrder}
			`, [where]).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `${this.name}.get()`,
					message: `could not get ${this.name}s`,
				}));
			});

			return rows;
		};
		this.editQuery = async function (t, mappedEntity) {
			let {id, ...mappedEntitySet} = mappedEntity;
			let set = buildSet(mappedEntitySet);
			let where = buildWhere({id});

			let row = await t.one(`
				UPDATE "sj"."${this.table}" 
				SET $1:raw 
				WHERE $2:raw 
				RETURNING *
			`, [set, where]).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `${this.name}.edit()`,
					message: `could not edit ${this.names}`,
				}));
			});

			return row;
		};
		this.removeQuery = async function (t, mappedEntity) {
			let where = buildWhere(mappedEntity);

			let row = await t.one(`
				DELETE FROM "sj"."${this.table}" 
				WHERE $1:raw 
				RETURNING *
			`, where).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `${this.name}.remove()`,
					message: `could not remove ${this.names}s`,
				}));
			});
			
			return row;
		};

		//C processes all after execution
		this.addAfter = 
		this.getAfter = 
		this.editAfter = 
		this.removeAfter = async function (t, entities, accessory) {
			return entities.slice();
		};

		//C custom SuccessList and ErrorList
		this.addSuccess = function () { return {
			origin: `${this.name}.add()`,
			message: `added ${this.name}s`,
		}};
		this.getSuccess = function () { return {
			origin: `${this.name}.get()`,
			message: `retrieved ${this.name}s`,
		}};
		this.editSuccess = function () { return {
			origin: `${this.name}.edit()`,
			message: `edited ${this.name}s`,
		}};
		this.removeSuccess = function () { return {
			origin: `${this.name}.get()`,
			message: `removed ${this.name}s`,
		}};

		this.addError = function () { return {
			origin: `${this.name}.add()`,
			message: `failed to add ${this.name}s`,
		}};
		this.getError = function () { return {
			origin: `${this.name}.get()`,
			message: `failed to retrieve ${this.name}s`,
		}};
		this.editError = function () { return {
			origin: `${this.name}.edit()`,
			message: `failed to edit ${this.name}s`,
		}};
		this.removeError = function () { return {
			origin: `${this.name}.remove()`,
			message: `failed to remove ${this.name}s`,
		}};
	},
});

export default Entity;
