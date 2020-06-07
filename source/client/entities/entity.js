//! Side Effects

import {
	Entity,
} from '../../shared/entities/index.js';
import serverRequest from '../server-request.js';
import { 
	any,
	pick,
} from '../../shared/utility/index.js';

// ENTITY CRUD METHODS
Entity.augmentClass({
	prototypeProperties: () => ({
		async add() {
			return await this.constructor.add(this);
		},
		async get() {
			return await this.constructor.get(this);
		},
		async edit() {
			//! instance.edit() doesn't take any arguments, and therefore isn't very useful unless the instance itself is edited.
			return await this.constructor.edit(this);
		},
		async remove() {
			return await this.constructor.remove(this);
		},
	}),
	staticProperties: () => ({
		async add(query) {
			return await serverRequest(
				'POST',
				this.table,
				any(query).map((q) => pick(q, this.filters.addIn)),
			);
		},
		async get(query) {
			return await serverRequest(
				'GET',
				this.table,
				any(query).map((q) => pick(q, this.filters.getIn)),
			);
		},
		async edit(query) {
			return await serverRequest(
				'PATCH', 
				this.table,
				any(query).map((q) => pick(q, this.filters.editIn))
			);
		},
		async remove(query) {
			return await serverRequest(
				'DELETE', 
				this.table,
				any(query).map((q) => pick(q,  this.filters.removeIn))
			);
		},
	}),
});

export default Entity;