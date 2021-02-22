// This Babel config is required to be a commonjs module because of eslint.
module.exports =  function config(api) {
	api.cache.forever();

	return {
		presets: [
			['@babel/preset-env', {
				targets: {
					esmodules: true,
					//R 'esmodules: true' is required for browsers, it doesn't seem like its required for the server.
					// 'node: true' was used for the server at some point, however it seems it works fine without.
				},
			}], // {targets}
			['@babel/preset-typescript', {
				allowNamespaces: false,
				allowDeclareFields: true,
			}],
		],
		plugins: [
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-private-methods',
		],
		sourceMaps: true,
	};
};
