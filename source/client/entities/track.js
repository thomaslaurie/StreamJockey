import Entity from './entity.js';
import {trackParts} from '../../shared/entityParts/index.js';

export default class Track extends Entity {
	constructor(...args) {
		trackParts.intercept(...args);
		super(...args);
		trackParts.instance(this, ...args);
	}
}
trackParts.prototype(Track);
trackParts.static(Track);
