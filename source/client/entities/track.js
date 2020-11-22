import Entity from './entity.js';
import {trackParts} from '../../shared/entityParts/index.js';
import {validateSource} from '../../shared/entityParts/track.js';
import Source from '../source.js';

export default class Track extends Entity {
	constructor(...args) {
		trackParts.intercept(...args);
		super(...args);
		trackParts.instance(this, ...args);

		const [{source} = {}] = args;
		validateSource({
			instance: this,
			SourceClass: Source,
			value: source,
		});
	}
}
trackParts.prototype(Track);
trackParts.static(Track);
