//! Side Effects //? Not quite sure of this.

import {
	entityParts,
} from '../../shared/entityParts/index.js';
import serverRequest from '../server-request.js';
import {
	any,
	pick,
	define,
} from '../../shared/utility/index.js';
import {sharedRegistry} from '../../shared/class-registry.js';

export default class Entity {
	constructor(...args) {
		entityParts.intercept(...args);
		entityParts.instance(this, ...args);
	}
}
entityParts.prototype(Entity);
entityParts.static(Entity);

define.constant(Entity.prototype, {
	async add(...args) {
		return this.constructor.add(this, ...args);
	},
	async get(...args) {
		return this.constructor.get(this, ...args);
	},
	async edit(...args) {
		//! instance.edit() doesn't take any arguments, and therefore isn't very useful unless the instance itself is edited.
		return this.constructor.edit(this, ...args);
	},
	async remove(...args) {
		return this.constructor.remove(this, ...args);
	},
});
define.constant(Entity, {
	async add(query, {includeMetadata} = {}) {
		const result = await serverRequest(
			'POST',
			this.table,
			any(query).map(q => pick(q, this.filters.addIn)),
		);
		return unwrapResult(result, includeMetadata);
	},
	async get(query, {includeMetadata} = {}) {
		const result = await serverRequest(
			'GET',
			this.table,
			any(query).map(q => pick(q, this.filters.getIn)),
		);
		return unwrapResult(result, includeMetadata);
	},
	async edit(query, {includeMetadata} = {}) {
		const result = await serverRequest(
			'PATCH',
			this.table,
			any(query).map(q => pick(q, this.filters.editIn)),
		);
		return unwrapResult(result, includeMetadata);
	},
	async remove(query, {includeMetadata} = {}) {
		const result = await serverRequest(
			'DELETE',
			this.table,
			any(query).map(q => pick(q,  this.filters.removeIn)),
		);
		return unwrapResult(result, includeMetadata);
	},
});

function unwrapResult(result, includeMetadata = false) {
	return includeMetadata
		? result
		: result.data.map(entityObject => sharedRegistry.autoConstruct(entityObject));
}
