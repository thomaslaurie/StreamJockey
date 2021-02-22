//G Put any hard-coded project paths/names here.
//R Required to be a cjs file because of eslint.cjs

const sourcePath = require('../node-utility/source-path.cjs');

// Source
const serverDirectory = sourcePath('server');
const clientDirectory = sourcePath('client');
const serverMainFile  = sourcePath(serverDirectory, 'main.js');
const clientMainFile  = sourcePath(clientDirectory, 'main.js');

// Source Build
const buildDirectory       = sourcePath('../build');
const serverBuildDirectory = sourcePath(buildDirectory, 'server');
const clientBuildDirectory = sourcePath(buildDirectory, 'client');
const serverBuildFile      = sourcePath(serverBuildDirectory, 'main.bundle.cjs'); //TODO extract filename


// Config
const configDirectory      = sourcePath('config');
const dotenvFile           = sourcePath(configDirectory,      '.env');
const babelConfigFile      = sourcePath(configDirectory, 'babel.config.cjs');
const typescriptConfigFile = sourcePath(configDirectory, '../../tsconfig.json');

// Config Build
const dotenvBuildDirectory = sourcePath(serverBuildDirectory);
const dotenvBuildFile      = sourcePath(dotenvBuildDirectory, '.env');


// UI
const UIDirectory = sourcePath(clientDirectory, 'ui');

const UIMainFileName = 'index.html';
const UIMainFile     = sourcePath(UIDirectory, UIMainFileName);


// CSS
const CSSDirectory = sourcePath(UIDirectory, 'css');


// Misc
// Suffix for test files.
const testSuffix = '.test.js';

// Default glob used for Ava test selection.
const defaultTestGlob = 'shared/utility';

module.exports = {
	serverDirectory,
	clientDirectory,
	serverMainFile,
	clientMainFile,
	serverBuildDirectory,
	clientBuildDirectory,
	serverBuildFile,
	dotenvFile,
	babelConfigFile,
	typescriptConfigFile,
	dotenvBuildDirectory,
	dotenvBuildFile,
	UIMainFileName,
	UIMainFile,
	CSSDirectory,
	testSuffix,
	defaultTestGlob,
};
