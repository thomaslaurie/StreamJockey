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
import {
	Success,
} from '../../shared/legacy-classes/success.js';

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
	async add() {
		return this.constructor.add(this);
	},
	async get() {
		return this.constructor.get(this);
	},
	async edit() {
		//! instance.edit() doesn't take any arguments, and therefore isn't very useful unless the instance itself is edited.
		return this.constructor.edit(this);
	},
	async remove() {
		return this.constructor.remove(this);
	},
});
define.constant(Entity, {
	async add(query) {
		return serverRequest(
			'POST',
			this.table,
			any(query).map((q) => pick(q, this.filters.addIn)),
		);
	},
	async get(query) {
		return serverRequest(
			'GET',
			this.table,
			any(query).map((q) => pick(q, this.filters.getIn)),
		);
	},
	async edit(query) {
		return serverRequest(
			'PATCH',
			this.table,
			any(query).map((q) => pick(q, this.filters.editIn)),
		);
	},
	async remove(query) {
		return serverRequest(
			'DELETE',
			this.table,
			any(query).map((q) => pick(q,  this.filters.removeIn)),
		);
	},
});
