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
	async add(query, {includeMetadata = false} = {}) {
		return serverRequest(
			'POST',
			this.table,
			any(query).map((q) => pick(q, this.filters.addIn)),
		).then((result) => (includeMetadata ? result : result.data));
	},
	async get(query, {includeMetadata = false} = {}) {
		return serverRequest(
			'GET',
			this.table,
			any(query).map((q) => pick(q, this.filters.getIn)),
		).then((result) => (includeMetadata ? result : result.data));
	},
	async edit(query, {includeMetadata = false} = {}) {
		return serverRequest(
			'PATCH',
			this.table,
			any(query).map((q) => pick(q, this.filters.editIn)),
		).then((result) => (includeMetadata ? result : result.data));
	},
	async remove(query, {includeMetadata = false} = {}) {
		return serverRequest(
			'DELETE',
			this.table,
			any(query).map((q) => pick(q,  this.filters.removeIn)),
		).then((result) => (includeMetadata ? result : result.data));
	},
});
