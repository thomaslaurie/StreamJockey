import Entity from './entity.js';
import {trackParts, trackSharedRegistryId} from '../../shared/entityParts/index.js';
import {validateSource} from '../../shared/entityParts/track.js';
import Source from '../source.js';
import {sharedRegistry} from '../../shared/class-registry.js';

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

// Id is assigned to instance in trackParts.instance
sharedRegistry.register(Track, trackSharedRegistryId);
