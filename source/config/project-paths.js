//G Put any hard-coded project paths/names here.

import sourcePath from '../node-utility/source-path.cjs';

// Build (outside source)
const buildDirectory              = sourcePath('../build');
export const serverBuildDirectory = sourcePath(buildDirectory, 'server');
export const clientBuildDirectory = sourcePath(buildDirectory, 'client');
export const serverBuildFile      = sourcePath(serverBuildDirectory, 'main.bundle.cjs'); //TODO extract filename

// Source
export const serverDirectory = sourcePath('server');
export const clientDirectory = sourcePath('client');
export const serverMainFile  = sourcePath(serverDirectory, 'main.js');
export const clientMainFile  = sourcePath(clientDirectory, 'main.js');

// Config
const configDirectory   = sourcePath('config');
export const dotEnvFile = sourcePath(configDirectory, '.env');

// UI
const UIDirectory = sourcePath(clientDirectory, 'ui');

export const UIMainFileName = 'index.html';
export const UIMainFile     = sourcePath(UIDirectory, UIMainFileName);

// CSS
export const CSSDirectory = sourcePath(UIDirectory, 'css');

// Misc
// Suffix for test files.
export const testSuffix = '.test.js';

// Default glob used for Ava test selection.
export const defaultTestGlob = 'shared/utility';