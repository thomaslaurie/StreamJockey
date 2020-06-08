import Source from '../shared/source.js';

Source.augmentClass({
	constructorProperties: parent => ({
		defaults: {
			serverTestProp: null,
		},
	}),
});

export default Source;
