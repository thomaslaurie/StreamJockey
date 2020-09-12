/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/server/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/config/environment-variables.js":
/*!************************************************!*\
  !*** ./source/config/environment-variables.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _project_paths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-paths.js */ "./source/config/project-paths.js");
//! this needs to be in its own file (not at the top of index.js) because imports are hoisted, which causes dotenv.config() to run after any module that uses environment variables immediately, which makes them undefined
//L https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import


dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config({
  path: _project_paths_js__WEBPACK_IMPORTED_MODULE_1__["dotEnvFile"]
}); // The CANARY environment variable is committed to the repo and tests that environment variables are properly imported and accurate. Here it is imported and compared against an identical, hard-coded string.
//TODO Consider creating a test file for this instead?

if (process.env.CANARY !== 'canaryString') {
  throw new Error('Environment variables are not available.');
}

/***/ }),

/***/ "./source/config/project-paths.js":
/*!****************************************!*\
  !*** ./source/config/project-paths.js ***!
  \****************************************/
/*! exports provided: serverBuildDirectory, clientBuildDirectory, serverBuildFile, serverDirectory, clientDirectory, serverMainFile, clientMainFile, dotEnvFile, UIMainFileName, UIMainFile, CSSDirectory, testSuffix, defaultTestGlob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverBuildDirectory", function() { return serverBuildDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientBuildDirectory", function() { return clientBuildDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverBuildFile", function() { return serverBuildFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverDirectory", function() { return serverDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientDirectory", function() { return clientDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serverMainFile", function() { return serverMainFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientMainFile", function() { return clientMainFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotEnvFile", function() { return dotEnvFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMainFileName", function() { return UIMainFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIMainFile", function() { return UIMainFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSDirectory", function() { return CSSDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testSuffix", function() { return testSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTestGlob", function() { return defaultTestGlob; });
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node-utility/source-path.cjs */ "./source/node-utility/source-path.cjs");
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0__);
//G Put any hard-coded project paths/names here.
 // Build (outside source)

const buildDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()('../build');
const serverBuildDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(buildDirectory, 'server');
const clientBuildDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(buildDirectory, 'client');
const serverBuildFile = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(serverBuildDirectory, 'main.bundle.cjs'); //TODO extract filename
// Source

const serverDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()('server');
const clientDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()('client');
const serverMainFile = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(serverDirectory, 'main.js');
const clientMainFile = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(clientDirectory, 'main.js'); // Config

const configDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()('config');
const dotEnvFile = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(configDirectory, '.env'); // UI

const UIDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(clientDirectory, 'ui');
const UIMainFileName = 'index.html';
const UIMainFile = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(UIDirectory, UIMainFileName); // CSS

const CSSDirectory = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_0___default()(UIDirectory, 'css'); // Misc
// Suffix for test files.

const testSuffix = '.test.js'; // Default glob used for Ava test selection.

const defaultTestGlob = 'shared/utility';

/***/ }),

/***/ "./source/node-utility/source-path.cjs":
/*!*********************************************!*\
  !*** ./source/node-utility/source-path.cjs ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {// Returns an absolute path relative to the source directory.
//G Use in places where __dirname would normally be required, like config options or non-webpack-recognized imports.
/* //! Do NOT move this file.
	If it must be moved,
		either ensure all references to this file and all relative paths passed to this function are updated,
		or update the <base path> of this function: resolve(<__dirname, '../',> ...relativePaths)
*/
/* //R Workaround for __dirname / import.meta / webpack issues.
	The __dirname node global doesn't exist in ES Modules, even when run with node.
		Webpack is supposed to be able to polyfill this with node: {__dirname: true}, however it doesn't seem to be working.
	The alternative import.meta would normally be the workaround for raw modules.
		However Webpack doesn't support this yet: //L https://github.com/webpack/webpack/issues/6719
		@open-wc/webpack-import-meta-loader didn't work because it relies on window which isn't available in node.
		@bable/plugin-syntax-import-meta just didn't work at all.
		When webpack is able to parse import.meta, this could be a universal solution:
			//OLD
			import path from 'path';

			export default function (metaURL) {
				return path.dirname(new URL(metaURL.replace(/^file:\/\/\//, '')).pathname);
			};
	Current solution is to use __dirname only in a CommonJS Module, and instead import it into ES Modules.
		//L Solution from: https://medium.com/@almtechhub/es-modules-and-import-meta-dirname-babel-trick-39aad026682
		Here it was being wrapped in a path call because using the exported __dirname from outside this directory wouldn't make much semantic sense.
		This initially didn't work because it was actually just using the directory node was being run from.
			However, with a custom node globals polyfill: //L https://github.com/webpack/webpack/issues/1599#issuecomment-550291610 __dirname can now be properly polyfilled.
		Even though __dirname will now work properly, this cjs workaround is still the preferred way as it can be used in raw ES Modules.
	Other links:
		//L https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
		//L https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
*/
//R Currying this function won't work. __dirname will only apply to the exact file it is used in.

const {resolve} = __webpack_require__(/*! path */ "path");
module.exports = (...relativePaths) => resolve(__dirname, '../', ...relativePaths);

/* WEBPACK VAR INJECTION */}.call(this, "C:\\Users\\Thomas\\Documents\\Personal-Work\\StreamJockey.git\\source\\node-utility"))

/***/ }),

/***/ "./source/server/auth.js":
/*!*******************************!*\
  !*** ./source/server/auth.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
//TODO consider just writing native api functions, because they are fairly simple, and the spotify-web-api-node
//L https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/
//TODO remove exports. from internal functions
//TODO Convert to instantiatable class.
// INTERNAL

/* harmony default export */ __webpack_exports__["default"] = ({
  requestTimeout: 300000,
  // 5 minutes
  requestKeys: [],

  async addRequestKey() {
    return _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["keyCode"].addTo(this.requestKeys, this.requestTimeout);
  },

  async checkRequestKey(key) {
    const pack = await _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["keyCode"].verify(this.requestKeys, key);
    return {
      authRequestKey: pack.key,
      authRequestTimestamp: pack.timestamp
    };
  }

});

/***/ }),

/***/ "./source/server/constants.js":
/*!************************************!*\
  !*** ./source/server/constants.js ***!
  \************************************/
/*! exports provided: PASSWORD_SALT_ROUNDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PASSWORD_SALT_ROUNDS", function() { return PASSWORD_SALT_ROUNDS; });
const PASSWORD_SALT_ROUNDS = 10;

/***/ }),

/***/ "./source/server/database/create-database.js":
/*!***************************************************!*\
  !*** ./source/server/database/create-database.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _database_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database.js */ "./source/server/database/database.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/errors/index.js */ "./source/shared/errors/index.js");



/* harmony default export */ __webpack_exports__["default"] = (async () => _database_js__WEBPACK_IMPORTED_MODULE_0__["default"].tx(async t => {
  //TODO This will not alter tables if they do already exist (save this for migration).
  //L schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
  //L constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
  // foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
  // ON DELETE CASCADE also removes any referencing rows when the referenced row is removed
  //TODO CHECK constraint that visibility, source matches possible  states
  //L quotes: https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql
  //L default constraint names: https://stackoverflow.com/questions/4107915/postgresql-default-constraint-names

  /* //! Resets the database.
  	await t.none(`DROP SCHEMA IF EXISTS "sj" CASCADE`).catch((rejected) => {
  		throw new InvalidStateError({
  			userMessage: 'database error',
  			message: rejected.message,
  			state: rejected,
  		});
  	});
  */
  // SCHEMA
  //TODO add self, public, & private VIEWs for tables (if relevant).
  //! Remember to add error messages for constraint violations to parsePostgresError() in functions.js
  //! Column names are camelCase (because they get converted to properties), everything else is underscore.
  await t.none(`CREATE SCHEMA IF NOT EXISTS "sj"`); // USERS
  //L https://www.postgresql.org/docs/9.1/static/sql-createtable.html
  //! spotifyRefreshToken is specifically pascal case to match object property names

  await t.none(`
		CREATE TABLE IF NOT EXISTS "sj"."users" (
			"id" SERIAL CONSTRAINT "users_id_pkey" PRIMARY KEY,
			"name" text CONSTRAINT "users_name_key" UNIQUE,
			"password" text,
			"email" text CONSTRAINT "users_email_key" UNIQUE,
			"spotifyRefreshToken" text
		);
	`); //L views: https://www.postgresql.org/docs/8.1/static/tutorial-views.html
  //L create or replace: https://stackoverflow.com/questions/48662843/what-is-the-equivalent-of-create-view-if-not-exists-in-postresql

  await t.none(`
		CREATE OR REPLACE VIEW "sj"."users_self" AS
			SELECT id, name, email 
			FROM "sj"."users"
		;
	`);
  await t.none(`
		CREATE OR REPLACE VIEW "sj"."users_public" AS
			SELECT id, name
			FROM "sj"."users"
		;
	`); // PLAYLISTS

  await t.none(`
		CREATE TABLE IF NOT EXISTS "sj"."playlists" (
			"id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
			"userId" integer CONSTRAINT "playlists_userId_fkey" REFERENCES "sj"."users" ON DELETE CASCADE ON UPDATE CASCADE,
			"name" text,
			"visibility" text,
			"description" text,
			"image" text,
			"color" text,
			
			CONSTRAINT "playlists_userId_name_key" UNIQUE ("userId", "name")
		);
	`); // TRACKS

  await t.none(`
		CREATE TABLE IF NOT EXISTS "sj"."tracks" (
			"id" SERIAL CONSTRAINT "tracks_id_pkey" PRIMARY KEY,
			"playlistId" integer CONSTRAINT "tracks_playlistId_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE ON UPDATE CASCADE,
			"position" integer,
			"source" text,
			"sourceId" text,
			"name" text,
			"duration" integer,
			"artists" text ARRAY DEFAULT ARRAY[]::text[],

			CONSTRAINT "tracks_playlistId_position_key" UNIQUE ("playlistId", "position") DEFERRABLE INITIALLY IMMEDIATE 
		);
	`);
}).catch(rejected => {
  throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_2__["InvalidStateError"]({
    userMessage: 'database error',
    message: rejected.message,
    state: rejected
  });
}).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_1__["default"])); //TODO Should a better error be used than InvalidStateError?
//TODO Is propagate required here?

/***/ }),

/***/ "./source/server/database/database.js":
/*!********************************************!*\
  !*** ./source/server/database/database.js ***!
  \********************************************/
/*! exports provided: default, pgp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgp", function() { return pgp; });
/* harmony import */ var pg_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg-promise */ "pg-promise");
/* harmony import */ var pg_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg_promise__WEBPACK_IMPORTED_MODULE_0__);
var _process$env$DB_HOST, _process$env$DB_PORT, _process$env$DB_NAME, _process$env$DB_USERN, _process$env$DB_PASSW;


const pgp = pg_promise__WEBPACK_IMPORTED_MODULE_0___default()({//TODO Initialization options go here.
  //L http://vitaly-t.github.io/pg-promise/module-pg-promise.html
});
const database = pgp({
  //L https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
  //TODO Create new database user with restricted capabilities.
  host: (_process$env$DB_HOST = process.env.DB_HOST) !== null && _process$env$DB_HOST !== void 0 ? _process$env$DB_HOST : 'localhost',
  port: (_process$env$DB_PORT = process.env.DB_PORT) !== null && _process$env$DB_PORT !== void 0 ? _process$env$DB_PORT : '5432',
  database: (_process$env$DB_NAME = process.env.DB_NAME) !== null && _process$env$DB_NAME !== void 0 ? _process$env$DB_NAME : 'test',
  user: (_process$env$DB_USERN = process.env.DB_USERNAME) !== null && _process$env$DB_USERN !== void 0 ? _process$env$DB_USERN : 'postgres',
  password: (_process$env$DB_PASSW = process.env.DB_PASSWORD) !== null && _process$env$DB_PASSW !== void 0 ? _process$env$DB_PASSW : 'pgPassword'
}); // Create a single database object for entire app.

/* harmony default export */ __webpack_exports__["default"] = (database);


/***/ }),

/***/ "./source/server/database/sql-builders.js":
/*!************************************************!*\
  !*** ./source/server/database/sql-builders.js ***!
  \************************************************/
/*! exports provided: buildValues, buildWhere, buildSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildValues", function() { return buildValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildWhere", function() { return buildWhere; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildSet", function() { return buildSet; });
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _database_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database.js */ "./source/server/database/database.js");


function buildValues(mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    // This shouldn't insert anything.
    return `("id") SELECT 0 WHERE 0 = 1`;
  }

  let columns = [];
  const values = [];
  let placeholders = [];
  Object.keys(mappedEntity).forEach((key, i) => {
    columns.push(key);
    values.push(mappedEntity[key]);
    placeholders.push(`$${i + 1}`); // $1 based placeholders
  });
  columns = columns.join('", "'); // inner delimiter

  columns = `("${columns}")`; // outer

  placeholders = placeholders.join(', ');
  placeholders = `(${placeholders})`; //? This should be able to format arrays just as any other value, otherwise the format is: ARRAY[value1, value2, ...].

  return _database_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`${columns} VALUES ${placeholders}`, values);
}
function buildWhere(mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    // Return a false clause.
    //TODO hacky
    return '0 = 1';
  } // Pair as formatted string.


  let pairs = [];
  pairs = Object.keys(mappedEntity).map(key => {
    // wrap array in another array so that pgp doesn't think its values are for separate placeholders
    const input = _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(mappedEntity[key]) ? [mappedEntity[key]] : mappedEntity[key];
    return _database_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`"${key}" = $1`, input); //! if the value here is undefined, it wont format, it will simply leave the string as '"key" = $1'
  }); // Join with ' AND '

  return pairs.join(' AND ');
}
function buildSet(mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    // Don't make any change.
    //! This does have to reference a column that always exists (id).
    //TODO hacky
    return '"id" = "id"';
  }

  let pairs = []; // Pair as formatted string.

  pairs = Object.keys(mappedEntity).map(key => {
    const input = _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(mappedEntity[key]) ? [mappedEntity[key]] : mappedEntity[key];
    return _database_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`"${key}" = $1`, input);
  }); // Join with ', '

  return pairs.join(', ');
}

/***/ }),

/***/ "./source/server/entities/entity.js":
/*!******************************************!*\
  !*** ./source/server/entities/entity.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Entity; });
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _database_database_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../database/database.js */ "./source/server/database/database.js");
/* harmony import */ var _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/entityParts/index.js */ "./source/shared/entityParts/index.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _database_sql_builders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../database/sql-builders.js */ "./source/server/database/sql-builders.js");
/* harmony import */ var _legacy_is_empty_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../legacy/is-empty.js */ "./source/server/legacy/is-empty.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _shared_timestamped_data_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/timestamped-data.js */ "./source/shared/timestamped-data.js");
/* harmony import */ var _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../errors/postgres-error.js */ "./source/server/errors/postgres-error.js");
// INTERNAL









class Entity {
  constructor(...args) {
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["entityParts"].intercept(...args);
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["entityParts"].instance(this, ...args);
  }

}
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["entityParts"].prototype(Entity);
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["entityParts"].static(Entity);
_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Entity.prototype, {
  async add(...args) {
    return this.constructor.add(this, ...args);
  },

  async get(...args) {
    return this.constructor.get(this, ...args);
  },

  async edit(...args) {
    return this.constructor.edit(this, ...args);
  },

  async remove(...args) {
    return this.constructor.remove(this, ...args);
  }

});
_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(Entity, {
  notify() {
    throw new Error('LiveData has not yet been initialized for client notifications.');
  }

});
_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Entity, {
  // CRUD METHODS
  async add(query, {
    db = _database_database_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    includeMetadata = false
  } = {}) {
    return this.frame(db, query, 'add').then(result => includeMetadata ? result : result.data);
  },

  async get(query, {
    db = _database_database_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    includeMetadata = false
  } = {}) {
    return this.frame(db, query, 'get').then(result => includeMetadata ? result : result.data);
  },

  async edit(query, {
    db = _database_database_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    includeMetadata = false
  } = {}) {
    return this.frame(db, query, 'edit').then(result => includeMetadata ? result : result.data);
  },

  async remove(query, {
    db = _database_database_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    includeMetadata = false
  } = {}) {
    return this.frame(db, query, 'remove').then(result => includeMetadata ? result : result.data);
  },

  async getMimic(query, {
    db = _database_database_js__WEBPACK_IMPORTED_MODULE_1__["default"]
  } = {}) {
    // getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in liveData.notify()
    return this.frame(db, query, 'getMimic');
  },

  // FRAME
  async frame(db, anyEntities, methodName) {
    // catch Entity
    if (this === Entity) {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["CustomError"]({
        message: `cannot call CRUD method directly on Entity`
      });
    } // cast as array


    const entities = Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"])(anyEntities); // shorthand

    const isGetMimic = methodName === 'getMimic'; // store getMimic

    if (isGetMimic) {
      methodName = 'get'; // 'getMimic' === 'get' for functions: [methodName+'Function']
    }

    const isGet = methodName === 'get';
    const accessory = {};
    const after = await db.tx(async t => {
      // process
      const beforeEntities = await this[methodName + 'Before'](t, entities, accessory); // validate

      const validatedEntities = await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(beforeEntities, async entity => this.validate(entity, methodName).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"])).catch(_shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["MultipleErrors"].throw); // prepare

      const preparedEntities = await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(validatedEntities, async entity => this[methodName + 'Prepare'](t, entity, accessory).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"])).catch(_shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["MultipleErrors"].throw); // accommodate

      const influencedEntities = isGet ? [] : await this[methodName + 'Accommodate'](t, preparedEntities, accessory).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"]); // map

      const inputMapped = this.mapColumns(preparedEntities);
      const influencedMapped = isGet ? [] : this.mapColumns(influencedEntities); // execute SQL for inputs

      const inputBefore = [];
      const inputAfter = isGetMimic ? inputMapped : [];

      if (!isGetMimic) {
        await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(inputMapped, async entity => {
          // before, ignore add
          if (!isGet && methodName !== 'add') {
            const before = await this.getQuery(t, Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(entity, this.filters.id)).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
            inputBefore.push(...before);
          } // after, ignore remove (still needs to execute though)


          const after = await this[methodName + 'Query'](t, entity).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
          if (methodName !== 'remove') inputAfter.push(...after);
        }).catch(_shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["MultipleErrors"].throw);
      } // execute SQL for influenced


      const influencedBefore = [];
      const influencedAfter = [];

      if (!isGet) {
        await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(influencedMapped, async influencedEntity => {
          const before = await this.getQuery(t, Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(influencedEntity, this.filters.id)).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
          influencedBefore.push(...before);
          const after = await this.editQuery(t, influencedEntity).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
          influencedAfter.push(...after);
        }).catch(_shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["MultipleErrors"].throw);
      } // group for iteration


      const all = [inputBefore, inputAfter, influencedBefore, influencedAfter]; // unmap

      const unmapped = all.map(list => this.unmapColumns(list)); // process

      return Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(unmapped, async list => this[methodName + 'After'](t, list, accessory).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"])).catch(_shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["MultipleErrors"].throw);
    }).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_3__["default"]); //! finish the transaction here so that notify won't be called before the database has updated
    // shake for subscriptions with getOut filter

    const shookGet = after.map(list => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"])(list).map(item => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(item, this.filters.getOut))); // timestamp, used for ignoring duplicate notifications in the case of before and after edits, and overlapping queries

    const timestamp = Date.now(); // if get, don't notify

    if (!isGet) {
      shookGet.forEach(list => {
        this.notify(this, list, timestamp, methodName);
      });
    } else if (isGetMimic) {
      // if getMimic, return shookGet-after
      return shookGet[1];
    } // shake for return


    const shook = after.map(list => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"])(list).map(item => Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(item, this.filters[methodName + 'Out']))); // rebuild

    const built = shook.map(list => list.map(entity => new this(entity)));
    return new _shared_timestamped_data_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
      //R content is the inputAfter, for removals this will be an empty array, if in the future some 'undo' functionality is needed consider: returned data should still be filtered by removeOut, and therefore might destroy data if this returned data is used to restore it
      data: built[1],
      timestamp
    });
  }

}); // FRAME PARTS
//G all of these parts are dependant on each other (eg. accessory), so it is ok to make assumptions between these functions
// Processes all before validation.

async function baseBefore(t, entities) {
  return entities.slice();
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Entity, {
  addBefore: baseBefore,
  getBefore: baseBefore,
  editBefore: baseBefore,
  removeBefore: baseBefore,

  // Validates each using Entity.schema
  async validate(entity, methodName) {
    const validated = {};
    await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(Object.keys(this.schema), async key => {
      const {
        rule: validator,
        [methodName]: {
          check
        }
      } = this.schema[key];
      const isRequired = check === 2;
      const isOptional = check === 1;
      _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(validator);
      const value = entity[key];

      if (isRequired || isOptional && !Object(_legacy_is_empty_js__WEBPACK_IMPORTED_MODULE_5__["default"])(value)) {
        await validator(value);
        validated[key] = value;
      }
    }).catch(_shared_errors_index_js__WEBPACK_IMPORTED_MODULE_6__["MultipleErrors"].throw);
    return validated;
  }

}); // Modifies each after validation.

async function basePrepare(t, entity) {
  return { ...entity
  };
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Entity, {
  addPrepare: basePrepare,
  getPrepare: basePrepare,
  editPrepare: basePrepare,
  removePrepare: basePrepare
}); // Modifies input entities, returns other influenced entities. checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities.

async function baseAccommodate() {
  return [];
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Entity, {
  addAccommodate: baseAccommodate,
  getAccommodate: baseAccommodate,
  editAccommodate: baseAccommodate,
  removeAccommodate: baseAccommodate,

  // Maps js property names to database column names.
  mapColumns(entities) {
    // Switches entities' js named keys for column named keys based on schema.
    return entities.map(entity => {
      // For each entity.
      const mappedEntity = {};
      Object.keys(entity).forEach(key => {
        // For each property.
        if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.test(this.schema[key]) && _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.test(this.schema[key].columnName)) {
          // If schema has property.
          mappedEntity[this.schema[key].columnName] = entity[key]; // Set mappedEntity[columnName] as property value.
        } else {
          console.warn(`Entity.mapColumns() - property ${key} in entity not found in schema`);
        }
      });
      return mappedEntity;
    });
  },

  unmapColumns(mappedEntities) {
    // Inverse of mapColumns().
    return mappedEntities.map(mappedEntity => {
      // For each entity.
      const entity = {};
      Object.keys(mappedEntity).forEach(columnName => {
        // For each columnName.
        const key = Object.keys(this.schema).find(key => this.schema[key].columnName === columnName); // Find key in schema with same columnName.

        if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.test(key)) {
          // Set entity[key] as value of mappedEntity[columnName].
          entity[key] = mappedEntity[columnName];
        } else {
          console.warn(`Entity.unmapColumns() - column ${columnName} in mappedEntity not found in schema`);
        }
      });
      return entity;
    });
  },

  //! this should be overwritten with different ORDER BY columns
  queryOrder: `ORDER BY "id" ASC`,

  // Executes SQL queries.
  async addQuery(t, mappedEntity) {
    const values = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_4__["buildValues"])(mappedEntity); //? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
    //L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text

    return t.one(`
			INSERT INTO "sj"."${this.table}" 
			$1:raw 
			RETURNING *
		`, [values]).catch(rejected => {
      throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        postgresError: rejected,
        userMessage: `Could not add ${this.name}s.`
      });
    });
  },

  async getQuery(t, mappedEntity) {
    const where = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_4__["buildWhere"])(mappedEntity);
    return t.any(`
			SELECT * 
			FROM "sj"."${this.table}" 
			WHERE $1:raw
			${this.queryOrder}
		`, [where]).catch(rejected => {
      throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        postgresError: rejected,
        userMessage: `Could not get ${this.name}s.`
      });
    });
  },

  async editQuery(t, mappedEntity) {
    const {
      id,
      ...mappedEntitySet
    } = mappedEntity;
    const set = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_4__["buildSet"])(mappedEntitySet);
    const where = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_4__["buildWhere"])({
      id
    });
    return t.one(`
			UPDATE "sj"."${this.table}" 
			SET $1:raw 
			WHERE $2:raw 
			RETURNING *
		`, [set, where]).catch(rejected => {
      throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        postgresError: rejected,
        userMessage: `Could not edit ${this.name}s.`
      });
    });
  },

  async removeQuery(t, mappedEntity) {
    const where = Object(_database_sql_builders_js__WEBPACK_IMPORTED_MODULE_4__["buildWhere"])(mappedEntity);
    return t.one(`
			DELETE FROM "sj"."${this.table}" 
			WHERE $1:raw 
			RETURNING *
		`, where).catch(rejected => {
      throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        postgresError: rejected,
        userMessage: `Could not remove ${this.name}s.`
      });
    });
  }

}); // Processes all after execution.

async function baseAfter(t, entities) {
  return entities.slice();
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Entity, {
  addAfter: baseAfter,
  getAfter: baseAfter,
  editAfter: baseAfter,
  removeAfter: baseAfter
});

/***/ }),

/***/ "./source/server/entities/index.js":
/*!*****************************************!*\
  !*** ./source/server/entities/index.js ***!
  \*****************************************/
/*! exports provided: Entity, Playlist, Track, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./source/server/entities/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _playlist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.js */ "./source/server/entities/playlist.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Playlist", function() { return _playlist_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./track.js */ "./source/server/entities/track.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return _track_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.js */ "./source/server/entities/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _user_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/server/entities/playlist.js":
/*!********************************************!*\
  !*** ./source/server/entities/playlist.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Playlist; });
/* harmony import */ var _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/entityParts/index.js */ "./source/shared/entityParts/index.js");
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity.js */ "./source/server/entities/entity.js");



class Playlist extends _entity_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_0__["playlistParts"].intercept(...args);
    super(...args);
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_0__["playlistParts"].instance(this, ...args);
  }

}
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_0__["playlistParts"].prototype(Playlist);
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_0__["playlistParts"].static(Playlist);
_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(Playlist, {
  queryOrder: 'ORDER BY "userId" ASC, "id" ASC'
});

/***/ }),

/***/ "./source/server/entities/track.js":
/*!*****************************************!*\
  !*** ./source/server/entities/track.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Track; });
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _database_database_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../database/database.js */ "./source/server/database/database.js");
/* harmony import */ var _server_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../server/source.js */ "./source/server/source.js");
/* harmony import */ var _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/entityParts/index.js */ "./source/shared/entityParts/index.js");
/* harmony import */ var _shared_entityParts_track_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/entityParts/track.js */ "./source/shared/entityParts/track.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _legacy_is_empty_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../legacy/is-empty.js */ "./source/server/legacy/is-empty.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entity.js */ "./source/server/entities/entity.js");
/* harmony import */ var _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../errors/postgres-error.js */ "./source/server/errors/postgres-error.js");
// INTERNAL










class Track extends _entity_js__WEBPACK_IMPORTED_MODULE_8__["default"] {
  constructor(...args) {
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_3__["trackParts"].intercept(...args);
    super(...args);
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_3__["trackParts"].instance(this, ...args);
    const [{
      source
    }] = args;
    Object(_shared_entityParts_track_js__WEBPACK_IMPORTED_MODULE_4__["validateSource"])({
      instance: this,
      SourceClass: _server_source_js__WEBPACK_IMPORTED_MODULE_2__["default"],
      value: source
    });
  }

}
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_3__["trackParts"].prototype(Track);
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_3__["trackParts"].static(Track);
_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Track.prototype, {
  async order(db = _database_database_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    return this.constructor.order(db, Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"])(this));
  }

}); // CRUD

async function baseBefore(t, entities) {
  const newEntities = entities.slice();
  newEntities.forEach(entity => {
    //TODO Possible issue here where the condition following && could evaluate first. Not sure what the precedent is.
    entity.source = _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.test(entity.source) && _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.test(entity.source.name) ? entity.source.name : undefined;
  });
  return newEntities;
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Track, {
  addBefore: baseBefore,
  getBefore: baseBefore,
  editBefore: baseBefore,
  removeBefore: baseBefore,

  async addPrepare(t, track) {
    // set id of tracks to be added as a temporary symbol, so that Track.order() is able to identify tracks
    const newTrack = { ...track,
      id: Symbol()
    };

    if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].integer.test(newTrack.position)) {
      const existingTracks = await Track.get({
        playlistId: newTrack.playlistId
      }, {
        db: t
      });
      newTrack.position = existingTracks.length;
    }

    return newTrack;
  },

  async removePrepare(t, track) {
    // set position of tracks to be removed as null, so that Track.order() recognizes them as tracks to remove
    return { ...track,
      position: null
    };
  },

  queryOrder: 'ORDER BY "playlistId" ASC, "position" ASC'
});

async function baseAccommodate(t, tracks) {
  //L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
  //L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
  //L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
  await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
    throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      postgresError: rejected,
      userMessage: 'Could not order tracks, a database error has occurred.'
    });
  });
  return this.order(t, tracks).catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_5__["default"]);
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Track, {
  addAccommodate: baseAccommodate,
  editAccommodate: baseAccommodate,
  removeAccommodate: baseAccommodate
});

async function baseAfter(t, entities) {
  const newEntities = entities.slice();
  newEntities.forEach(entity => {
    entity.source = _server_source_js__WEBPACK_IMPORTED_MODULE_2__["default"].instances.find(source => source.name === entity.source);
  });
  return newEntities;
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(Track, {
  addAfter: baseAfter,
  getAfter: baseAfter,
  editAfter: baseAfter,
  deleteAfter: baseAfter,

  // UTIL
  async order(db, tracks) {
    // takes a list of input tracks for an INSERT, UPDATE, or DELETE query
    //! properties should be validated at this point
    //! tracks to be added must have a Symbol() id, this will be removed
    //! tracks to be deleted must have a null position, this will be removed
    // modifies the input track's positions, if needed
    // returns a list of influenced tracks with modified positions, if needed
    // out-of-bounds positions will be repositioned at the start or end of the playlist
    // duplicate positions will be repositioned in order of input order
    // in the case of repositioned tracks that still overlap with other input tracks, all will be repositioned in order of input position
    // filter out tracks
    let inputTracks = tracks.filter(track => // without an id (including symbol)
    (!Object(_legacy_is_empty_js__WEBPACK_IMPORTED_MODULE_6__["default"])(track.id) || typeof track.id === 'symbol') && ( // and without a position (including null) or playlistId
    !Object(_legacy_is_empty_js__WEBPACK_IMPORTED_MODULE_6__["default"])(track.position) || track.position === null || !Object(_legacy_is_empty_js__WEBPACK_IMPORTED_MODULE_6__["default"])(track.playlistId))); // filter out duplicate tracks (by id, keeping last), by filtering for tracks where every track after does not have the same id

    inputTracks = inputTracks.filter((track, index, self) => self.slice(index + 1).every(trackAfter => track.id !== trackAfter.id)); // return early if none are moving

    if (inputTracks.length === 0) {
      return [];
    } // console.log('inputTracks.length:', inputTracks.length, '\n ---');


    return db.tx(async t => {
      const playlists = [];
      const influencedTracks = [];
      const inputIndex = Symbol(); // retrieve track's playlist, group each track by playlist & moveType

      await Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(inputTracks, async (track, index) => {
        const storePlaylist = function (playlistId, existingTracks) {
          if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].integer.test(playlistId)) {
            throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__["CustomError"]({
              message: `playlistId is not an integer: ${playlistId}`
            });
          }

          if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(existingTracks)) {
            throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__["CustomError"]({
              message: `existingTracks is not an array: ${existingTracks}`
            });
          } // stores playlist in playlists if not already stored


          let existingPlaylist = playlists.find(playlist => playlist.id === playlistId);

          if (!existingPlaylist) {
            playlists.push({
              id: playlistId,
              original: existingTracks,
              // move actions, these have priority positioning
              inputsToMove: [],
              inputsToAdd: [],
              inputsToRemove: []
            });
            existingPlaylist = playlists[playlists.length - 1];
          }

          return existingPlaylist;
        }; // temporarily store inputIndex on track, this is required as the input order is lost when tracks are grouped by playlist


        track[inputIndex] = index; // determine move action

        let action;

        if (typeof track.id === 'symbol') {
          action = 'Add';
        } else if (track.position === null) {
          action = 'Remove';
        } else {
          action = 'Move';
        } // get current playlist by playlistId if action === 'add', else by track.id using a sub-query
        //L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery


        const currentQuery = action === 'Add' ? _database_database_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = $1
					`, track.playlistId) : _database_database_js__WEBPACK_IMPORTED_MODULE_1__["pgp"].as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = (
							SELECT "playlistId"
							FROM "sj"."tracks"
							WHERE "id" = $1
						)
				`, track.id);
        const currentPlaylist = await t.any('$1:raw', currentQuery).catch(rejected => {
          throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
            postgresError: rejected,
            userMessage: 'Could not move tracks.'
          });
        }); // store

        const currentPlaylistStored = storePlaylist(action === 'Add' ? track.playlistId : currentPlaylist[0].playlistId, currentPlaylist); //! track.playlistId might not be currentPlaylistId
        // strip playlistId from playlist, this is done so that only modified properties will remain on the track objects

        currentPlaylistStored.original.forEach(t => {
          delete t.playlistId;
        });

        if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].integer.test(track.playlistId) || track.playlistId === currentPlaylistStored.id) {
          // if not switching playlists
          // group by action
          currentPlaylistStored['inputsTo' + action].push(track);
        } else {
          // if switching playlists
          // this should catch tracks with playlistIds but no position
          const anotherPlaylist = await t.any(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = $1
					`, track.playlistId).catch(rejected => {
            throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
              postgresError: rejected,
              userMessage: 'Could not move tracks.'
            });
          });
          const anotherPlaylistStored = storePlaylist(track.playlistId, anotherPlaylist);
          anotherPlaylistStored.original.forEach(t => {
            delete t.playlistId;
          }); // track is removed from its current playlist, and added to another playlist

          currentPlaylistStored.inputsToRemove.push(track);
          anotherPlaylistStored.inputsToAdd.push(track);
        }
      }).catch(rejected => {
        throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__["MultipleErrors"]({
          userMessage: `could not retrieve some track's playlist`,
          errors: rejected
        });
      }); // console.log('playlists.length:', playlists.length, '\n ---');
      // calculate new track positions required to accommodate input tracks' positions

      playlists.forEach(playlist => {
        // populate others with tracks in original that are not in inputsTo Add, Remove, or Move
        //! inputsToRemove can be ignored from this point on, these tracks aren't included in others and wont be added to the final ordered list
        playlist.others = playlist.original.filter(originalTrack => !playlist.inputsToAdd.some(addingTrack => addingTrack.id === originalTrack.id) && !playlist.inputsToRemove.some(trackToRemove => trackToRemove.id === originalTrack.id) && !playlist.inputsToMove.some(movingTrack => movingTrack.id === originalTrack.id)); // console.log('playlist.others.length:', playlist.others.length);
        // combine both adding and moving,

        playlist.inputsToPosition = [...playlist.inputsToAdd, ...playlist.inputsToMove]; // give tracks with no position an Infinite position so they get added to the bottom of the playlist

        playlist.inputsToPosition.forEach(trackToPosition => {
          if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].number.test(trackToPosition.position)) {
            trackToPosition.position === Infinity;
          }
        }); // sort

        Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"])(playlist.others, (a, b) => a.position - b.position); // stable sort by inputIndex then position to resolve clashes by position then inputIndex

        Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"])(playlist.inputsToPosition, (a, b) => a[inputIndex] - b[inputIndex]);
        Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"])(playlist.inputsToPosition, (a, b) => a.position - b.position); // console.log('playlist.inputsToAdd.length:', playlist.inputsToAdd.length);
        // console.log('playlist.inputsToRemove.length:', playlist.inputsToRemove.length);
        // console.log('playlist.inputsToMove.length:', playlist.inputsToMove.length, '\n ---');
        // console.log('playlist.inputsToPosition.length:', playlist.inputsToPosition.length, '\n ---');
        // inputIndex is no longer needed, remove it from anything it was added to

        playlist.inputsToPosition.forEach(trackToPosition => {
          delete trackToPosition[inputIndex];
        });
        playlist.inputsToRemove.forEach(trackToRemove => {
          delete trackToRemove[inputIndex];
        }); // populate merged by filling others tracks around combined tracks

        playlist.merged = []; //! these are copies that will be emptied below

        playlist.inputsToPositionCopy = [...playlist.inputsToPosition];
        playlist.othersCopy = [...playlist.others];
        let i = 0;

        while (playlist.othersCopy.length > 0) {
          if (playlist.inputsToPositionCopy.length > 0 && playlist.inputsToPositionCopy[0].position <= i) {
            // if the next adding or moving track's position is at (or before, in the case of a duplicated position) the current index, transfer it to the merged list
            // this will properly handle negative and duplicate positions
            //G shift removes the first item of an array and returns that item
            playlist.merged.push(playlist.inputsToPositionCopy.shift());
          } else {
            // else - transfer the next others track
            playlist.merged.push(playlist.othersCopy.shift());
          }

          i++;
        } // push rest of combined tracks
        //R this method was chosen over including combined.length > 0 in the while condition to prevent needless loops caused by ridiculously high positions, this was also chosen over original.length because adding + moving tracks could be greater the playlist length
        //L .push() and spread: https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating


        playlist.merged.push(...playlist.inputsToPositionCopy);
        playlist.inputsToPositionCopy.length = 0; //! remove combined tracks for consistent behavior
        // populate playlist.influenced with all non-input tracks that have moved

        playlist.influenced = playlist.merged.filter((mergedTrack, index) => {
          const inOthers = playlist.others.find(otherTrack => otherTrack.id === mergedTrack.id);
          const influenced = inOthers && index !== inOthers.position; // assign new positions (inputTracks too)

          mergedTrack.position = index;
          return influenced;
        }); // console.log('playlist.merged.length:', playlist.merged.length);
        // console.log('playlist.merged:\n', playlist.merged, '\n ---');
        // console.log('playlist.influenced.length:', playlist.influenced.length);
        // console.log('playlist.influenced:\n', playlist.influenced, '\n ---');

        influencedTracks.push(...playlist.influenced);
      }); // remove temporary symbol id from add tracks and null position from delete tracks

      inputTracks.forEach(inputTrack => {
        if (typeof inputTrack.id === 'symbol') {
          delete inputTrack.id;
        }

        if (inputTrack.position === null) {
          delete inputTrack.position;
        }
      });
      return influencedTracks;
    });
    /* Thought Process
    			if any tracks have position set,
    		do the move function
    		order
    	after deleting tracks
    		order
    			idea: get the tracklist, then do the moving and ordering outside, at the same time - then update all at once
    	the fetched array won't have holes in it, just the position numbers (which is good?)
    			//R initial idea wrong:
    	tracks must be in order of their positions for the move to be applied properly (ie tracks with positions: 3, 4, 5 will all be inserted inbetween tracks 2 and 3) - updating in the order 5, 4, 3 would result in later tracks pushing the already placed tracks down (so their positions end up being 7, 5, 3)
    	it needs to go in decending order because of the nature of how the move function works - affecting only tracks below it
    
    	//R wrong, because this done simultaneously (not in sequence) it will separate adjacent inserted positions (0i, 1i) will insert into a full list (o) as (0i, 0o, 1i, 1o), doing this in sequence would require reordering (updating of new positions) the tracks after each insert (might be resource intensive)
    	get input
    		stable sort by position
    	get tracks
    		stable sort by position
    		prepend item with position -Infinity
    		append item with position Infinity
    			for each input (in reverse order, so that inputs with same positions do not get their order reversed)
    		find where position is greater than i.position and less than or equal to i+1.position
    		splice(i+1, 0, input)
    
    	final idea:
    		get the existing list, remove tracks to be inserted
    		sort each list
    		for the length of the combined lists, for integers 0 to length
    			if there is a track in the input list at (or less than) the index - push the next one
    			else push the next track in the existing list
    		if there are any remaining tracks in the input list (for example a big hole that makes the last few tracks larger than the sum of both lists), push them in order to the end of the list
    		lastly do a order to remove duplicates and holes
    				this essentially 'fills' the existing tracks around the set positions of the input tracks
    
    		for Track.order()
    			there is a recursive loop hazard in here (basically if Track.get() is the function that calls sj.Track.order() - sj.Track.order() itself needs to call sj.Track.get(), therefore a loop), however if everything BUT sj.Track.get() calls sj.Track.order(), then sj.Track.order() can safely call sj.Track.get(), no, the same thing happens with sj.Track.edit() - so just include manual queries, no have it so: sj.Track.get() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.Track.get(), and then have each use their own manual update queries - basically add, edit, remove can use these and sj.Track.get() but not each other - this is written down in that paper chart
    
    		//R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:
    				// for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
    		//! requires the INSERT command to be executed one at at a time for each input track
    		//R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks
    */
  }

});

/***/ }),

/***/ "./source/server/entities/user.js":
/*!****************************************!*\
  !*** ./source/server/entities/user.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/entityParts/index.js */ "./source/shared/entityParts/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants.js */ "./source/server/constants.js");
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entity.js */ "./source/server/entities/entity.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _server_registry_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../server-registry.js */ "./source/server/server-registry.js");
// EXTERNAL
 // INTERNAL







const serverRegistryId = 'User';
class User extends _entity_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["userParts"].intercept(...args);
    super(...args);
    _shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["userParts"].instance(this, ...args);
    _server_registry_js__WEBPACK_IMPORTED_MODULE_6__["default"].defineId(this, serverRegistryId);
  }

}
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["userParts"].prototype(User);
_shared_entityParts_index_js__WEBPACK_IMPORTED_MODULE_2__["userParts"].static(User);
_server_registry_js__WEBPACK_IMPORTED_MODULE_6__["default"].register(User, serverRegistryId);

async function basePrepare(t, user) {
  const newUser = new User(user); // Hash password.
  //TODO might be a vulnerability here with this string check

  if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.test(newUser.password)) {
    newUser.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.hash(newUser.password, _constants_js__WEBPACK_IMPORTED_MODULE_3__["PASSWORD_SALT_ROUNDS"]).catch(rejected => {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_5__["InvalidStateError"]({
        userMessage: 'failed to add user',
        message: 'hash failed',
        state: rejected
      });
    });
  }

  return newUser;
}

_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(User, {
  addPrepare: basePrepare,
  editPrepare: basePrepare,
  queryOrder: 'ORDER BY "id" ASC'
});

/***/ }),

/***/ "./source/server/errors/postgres-error.js":
/*!************************************************!*\
  !*** ./source/server/errors/postgres-error.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostgresError; });
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
//TODO any validation needed here?
//TODO consider separating insertion checks into Conditions so multiple parameters are checked
//TODO add targets and cssClasses to each violation case too


class PostgresError extends _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_0__["CustomError"] {
  constructor({
    postgresError: {
      message,
      code,
      constraint
    } = {},
    ...rest
  } = {}) {
    super(rest);
    this.message = message; // Class 23 — Integrity Constraint Violation

    if (code === '23505') {
      // unique_violation
      // Users
      if (constraint === 'users_name_key') {
        this.userMessage = 'this user name is already taken';
      } else if (constraint === 'users_email_key') {
        this.userMessage = 'this email is already in use'; // Playlists
      } else if (constraint === 'playlists_userId_name_key') {
        this.userMessage = 'you already have a playlist with this name'; // Tracks
      } else if (constraint === 'tracks_position_key') {
        this.userMessage = 'a track already exists at this position';
      }
    } else if (code === '23503') {
      // foreign_key_violation
      // Playlists
      if (constraint === 'playlists_userId_fkey') {
        this.userMessage = 'cannot add a playlist for an unknown user'; // Tracks
      } else if (constraint === 'tracks_playlistId_fkey') {
        this.userMessage = 'cannot add a track for an unknown playlist';
      }
    }

    _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(this, {
      code
    });
  }

}

/***/ }),

/***/ "./source/server/legacy/is-empty.js":
/*!******************************************!*\
  !*** ./source/server/legacy/is-empty.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isEmpty; });
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
//TODO refactor this function out in favor of more specific validators.
// global-server is the last place that uses this because there are some places where the validators use isEmpty but I couldn't figure out if they were intentionally generic.

function isEmpty(input) {
  // null, undefined, and whitespace-only strings are 'empty' //! also objects and arrays
  return !(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].boolean.test(input) || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].number.test(input) // Check for empty and whitespace strings and string conversions of null and undefined.
  //TODO //! this will cause issues if a user inputs any combination of these values, ban them at the user input step.
  || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.test(input) && input.trim() !== '' && input.trim() !== 'null' && input.trim() !== 'undefined' || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.test(input) && Object.keys(input).length > 0 || _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(input) && input.length > 0);
}

/***/ }),

/***/ "./source/server/live-data-server.js":
/*!*******************************************!*\
  !*** ./source/server/live-data-server.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fclone */ "fclone");
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fclone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utility/object/deep-compare.js */ "./source/shared/utility/object/deep-compare.js");
/* harmony import */ var _entities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/index.js */ "./source/server/entities/index.js");
/* harmony import */ var _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/live-data.js */ "./source/shared/live-data.js");
/* harmony import */ var _shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/is-instance-of.js */ "./source/shared/is-instance-of.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _shared_entityParts_user_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/entityParts/user.js */ "./source/shared/entityParts/user.js");
/* harmony import */ var _shared_warn_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/warn.js */ "./source/shared/warn.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _server_registry_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./server-registry.js */ "./source/server/server-registry.js");
//! Side-effects
//TODO there is a stack overflow error here somewhere, recursive loop?, usually lead by this error: 'no subscriber found for this user'
// when refreshing the playlist page, all the lists will subscribe fine, until at some point unsubscribe is called (for an empty query [ {} ] , or maybe could be anything) upon which no subscriber is called, and the thing goes to a 'RangeError: Maximum call stack size exceeded' error
//TODO this may be unrelated but it seems the liveQueries here are also piling up
//TODO It seems like many subscriptions are being called but not as many un-subscriptions.
//TODO sockets need better error handling just like the koa router
// EXTERNAL
 //TODO consider changing to the https module?

 // INTERNAL












class Subscription {
  constructor(options = {}) {
    _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["subscriptionParts"].instance(this, options);
    const {
      user = null
    } = options;
    _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_7__["define"].writable(this, {
      user
    });
  }

}

const liveDataServer = {
  app: null,
  socket: null,
  tables: _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveTable"].makeTables({
    User: _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"],
    Playlist: _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["Playlist"],
    Track: _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["Track"]
  }),

  start({
    app,
    socket: liveDataSocket
  }) {
    this.app = app;
    this.socket = liveDataSocket;
    this.socket.use((socket, next) => {
      // Give the cookie session to the socket.
      // Uses a temporary koa context to decrypt the session.
      //L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
      //L https://github.com/koajs/session/issues/53#issuecomment-311601304
      //! //? socket.session is static, whereas koa ctx.session is dynamic, that is I'm not sure that this is linked in any way to the cookie session
      //L https://socket.io/docs/server-api/#namespace-use-fn
      socket.session = this.app.createContext(socket.request, new http__WEBPACK_IMPORTED_MODULE_0___default.a.OutgoingMessage()).session;
      next();
    });
    this.socket.on('connect', socket => {
      try {
        console.log('CONNECT', socket.id); // If user is logged in, give the socketId to the session.
        //! I don't think the cookie session receives this, though it isn't needed there so far.

        if (_server_registry_js__WEBPACK_IMPORTED_MODULE_11__["default"].autoConstruct(socket.session.user) instanceof _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"]) {
          socket.session.user.socketId = socket.id;
        }

        socket.on('disconnect', async () => {
          try {
            console.log('DISCONNECT', socket.id);
            await this.disconnect(socket.id).catch(rejected => {
              //TODO handle better
              console.error('subscription disconnect error:', rejected);
            }); //? socket won't be used anymore, so does anything really need to be deleted here?

            if (_server_registry_js__WEBPACK_IMPORTED_MODULE_11__["default"].autoConstruct(socket.session.user) instanceof _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"]) {
              socket.session.user.socketId = _shared_entityParts_user_js__WEBPACK_IMPORTED_MODULE_8__["defaultSocketId"];
            }
          } catch (error) {
            Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_6__["logPropagate"])(error);
          }
        });
        socket.on('subscribe', async ({
          table,
          query
        }, callback) => {
          try {
            console.log('SUBSCRIBE', socket.id); // if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
            //TODO socketId validator, this is all that really matters here

            const user = _server_registry_js__WEBPACK_IMPORTED_MODULE_11__["default"].autoConstruct(socket.session.user) instanceof _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"] ? socket.session.user : new _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"]({
              socketId: socket.id
            }); //! using LiveTable.tableToEntity(table) instead of just a table string so that the function can basically function as a validator

            const result = await this.add(_shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveTable"].tableToEntity(table), query, user); //! //G Do not send back circular data in the acknowledgment callback, SocketIO will cause a stack overflow.
            //L https://www.reddit.com/r/node/comments/8diy81/what_is_rangeerror_maximum_call_stack_size/dxnkpf7?utm_source=share&utm_medium=web2x
            // Using fclone to drop circular reference.s

            callback(fclone__WEBPACK_IMPORTED_MODULE_1___default()(result));
          } catch (error) {
            Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_6__["logPropagate"])(error);
          }
        });
        socket.on('unsubscribe', async ({
          table,
          query
        }, callback) => {
          try {
            console.log('UNSUBSCRIBE', socket.id);
            const user = _server_registry_js__WEBPACK_IMPORTED_MODULE_11__["default"].autoConstruct(socket.session.user) instanceof _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"] ? socket.session.user : new _entities_index_js__WEBPACK_IMPORTED_MODULE_3__["User"]({
              socketId: socket.id
            });
            const result = await this.remove(_shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveTable"].tableToEntity(table), query, user);
            callback(fclone__WEBPACK_IMPORTED_MODULE_1___default()(result));
          } catch (error) {
            Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_6__["logPropagate"])(error);
          }
        });
        socket.on('error', reason => {
          try {
            console.error('ERROR', socket.id, reason);
          } catch (error) {
            Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_6__["logPropagate"])(error);
          }
        });
      } catch (error) {
        Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_6__["logPropagate"])(error);
      }
    });
  },

  findTable(Entity) {
    return this.tables.get(Entity);
  },

  findLiveQuery(table, query) {
    return table.liveQueries.find(liveQuery => Object(_shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["default"])(query, liveQuery.query, {
      compareFunction: _shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["compareUnorderedArrays"]
    }));
  },

  findSubscription(liveQuery, user) {
    return liveQuery.subscriptions.find(subscription => subscription.user.socketId === user.socketId);
  },

  // Subscribers/users are identified by their socketId, this is so that not-logged-in clients can still subscribe to data, while still allowing the full user object to be the subscriber.
  async add(Entity, query, user) {
    // Process query.
    //TODO //? getMimic was being called with this query: [{playlistId: null}], twice, very rapidly, however even though they are the same query, the one called second resolves before the first one, why? afaik this isn't causing any issues, but it could later.
    const processedQuery = await Entity.getMimic(query); // Find table.

    const table = this.findTable(Entity);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(table, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveTable"], 'LiveTable')) {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_10__["CustomError"]({
        message: 'table is not an LiveTable'
      });
    } // Find liveQuery, add if it doesn't exist.


    let liveQuery = this.findLiveQuery(table, processedQuery);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(liveQuery, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveQuery"], 'LiveQuery')) {
      liveQuery = new _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveQuery"]({
        table,
        query: processedQuery
      });
      this.findTable(Entity).liveQueries.push(liveQuery);
    } // Find subscription, add if it doesn't exist.


    let subscription = this.findSubscription(liveQuery, user);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(subscription, Subscription, 'Subscription')) {
      subscription = new Subscription({
        liveQuery,
        user
      });
      liveQuery.subscriptions.push(subscription);
    } // Update user.


    Object.assign(subscription.user, user);
    return processedQuery;
  },

  async remove(Entity, query, user) {
    //? if the client unsubscribes on the client-side but is unable to unsubscribe on the server-side, the subscription will sit there (and send messages) until the client disconnects, is this ok? maybe consider a timeout system?
    // Process query.
    const processedQuery = await Entity.getMimic(query); // Find table.

    const table = this.findTable(Entity);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(table, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveTable"], 'LiveTable')) {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_10__["CustomError"]({
        message: 'table is not an LiveTable'
      });
    } // Find liveQuery index.


    const liveQuery = this.findLiveQuery(table, processedQuery);
    const liveQueryIndex = this.findTable(Entity).liveQueries.indexOf(liveQuery);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(liveQuery, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveQuery"], 'LiveQuery') || liveQueryIndex < 0) {
      return new _shared_warn_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        origin: 'Subscriptions.remove()',
        message: 'no subscription found for this query',
        content: {
          Entity,
          query: processedQuery,
          liveQueryIndex
        }
      });
    } // Find subscription.


    const subscription = this.findSubscription(liveQuery, user);
    const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(subscription, Subscription, 'Subscription') || subscriptionIndex < 0) {
      return new _shared_warn_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
        origin: 'Subscriptions.remove()',
        message: 'no subscriber found for this user',
        content: {
          liveQuerySubscriptions: liveQuery.subscriptions,
          socketId: user.socketId,
          subscriptionIndex
        }
      });
    } // Remove subscription.


    liveQuery.subscriptions.splice(subscriptionIndex, 1); // If no more subscriptions, remove liveQuery.

    if (liveQuery.subscriptions.length <= 0) {
      this.findTable(Entity).liveQueries.splice(liveQueryIndex, 1);
    }

    return processedQuery;
  },

  async notify(Entity, entities, timestamp) {
    // For each liveQuery.
    const table = this.findTable(Entity);

    if (!Object(_shared_is_instance_of_js__WEBPACK_IMPORTED_MODULE_5__["default"])(table, _shared_live_data_js__WEBPACK_IMPORTED_MODULE_4__["LiveTable"], 'LiveTable')) {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_10__["CustomError"]({
        message: 'table is not an LiveTable'
      });
    }

    for (const liveQuery of table.liveQueries) {
      // For each passed entity.
      for (const entity of entities) {
        // If any part of the liveQuery.query matches the entity as a subset && if the notification timestamp is new.
        //R query is an array of object queries, must iterate each then subset match, or else nothing will match because query switches from superset to subset
        if (liveQuery.query.some(part => Object(_shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["default"])(part, entity, {
          compareFunction: _shared_utility_object_deep_compare_js__WEBPACK_IMPORTED_MODULE_2__["compareUnorderedArrays"],
          subset: true,
          resultIfTooDeep: true
        })) && timestamp > liveQuery.timestamp) {
          // Set the new timestamp.
          liveQuery.timestamp = timestamp; // For each subscription.

          for (const subscription of liveQuery.subscriptions) {
            // Emit a socket notification to the subscriber.
            this.socket.to(subscription.user.socketId).emit('notify', {
              table: Entity.table,
              query: liveQuery.query,
              timestamp
            });
          }
        }
      }
    }
  },

  async disconnect(socketId) {
    //? unsubscribe all on disconnect and resubscribe all on connect? or have a timeout system?
    //! this doesn't use the remove() method, because the specific subscription (query + user) aren't known, this finds all subscriptions with that user
    for (const [, table] of this.tables) {
      for (let i = table.liveQueries.length - 1; i > -1; i--) {
        const liveQuery = table.liveQueries[i]; // For each subscription.

        for (let j = liveQuery.subscriptions.length - 1; j > -1; j--) {
          const subscription = liveQuery.subscriptions[j]; // If it matches the passed user (by socketId), remove it.

          if (subscription.user.socketId === socketId) {
            liveQuery.subscriptions.splice(j, 1);
          }
        } // If the liveQuery no longer has any subscriptions, remove it.


        if (liveQuery.subscriptions.length <= 0) table.liveQueries.splice(i, 1);
      }
    }
  }

}; // Supply Entity with its needed dependency to live-data-server.
//R //! This is to avoid a circular dependency, however it is a side-effect.
//TODO Resolve this side-effect.

_entities_index_js__WEBPACK_IMPORTED_MODULE_3__["Entity"].notify = liveDataServer.notify.bind(liveDataServer);
/* harmony default export */ __webpack_exports__["default"] = (liveDataServer);
/* //TODO test:
	no duplicate live queries
	subscriptions get removed on disconnect
	single refreshed liveQuery only ever has one subscription (user)
*/

/***/ }),

/***/ "./source/server/main.js":
/*!*******************************!*\
  !*** ./source/server/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_environment_variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/environment-variables.js */ "./source/config/environment-variables.js");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-session */ "koa-session");
/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_session__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router.js */ "./source/server/router.js");
/* harmony import */ var _live_data_server_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./live-data-server.js */ "./source/server/live-data-server.js");
/* harmony import */ var _database_create_database_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./database/create-database.js */ "./source/server/database/create-database.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/propagate.js */ "./source/shared/propagate.js");
/* //TODO
	Put api keys into .env after creating methods to access them
	Some best practices: https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja
	Middleware best practices https://github.com/koajs/koa/blob/master/docs/guide.md

	errors thrown in some places (like routes) still aren't caught
*/
// TOP
 // EXTERNAL

 //L https://github.com/koajs

 //L https://github.com/koajs/bodyparser

 //L https://github.com/koajs/session
// import 'source-map-support/register';
// import parser from 'minimist';
// import koaWebpack from 'koa-webpack';
//L https://github.com/socketio/socket.io#in-conjunction-with-koa

 //L socket io: https://socket.io/docs/emit-cheatsheet

 //TODO consider changing to the https module?
// INTERNAL
// import {clientOptions, UIMainFileName} from '../config/webpack.config.js';





/* webpack-dev-middleware
	// OPTIONS
	const serverOptions = parser(process.argv.slice(2), {
		string: [
			'client',
			'client-mode',
		],
		default: {
			// Options
			// 'off'      - assume code is already built/watched by another process
			// 'compile'  - builds the client code once
			// 'watch'    - watches the client code
			// 'refresh'  - use webpack-dev-middleware
			// 'hot'      - use webpack HMR
			'client': 'off',
			// Options
			// 'development' - passed to webpack
			// 'production'  - passed to webpack
			'client-mode': 'development',
		},
	});

	// INTERPRET
	const useMiddleware = (serverOptions.client === 'refresh' || serverOptions.client === 'hot');

	const compiler = webpack(client({}, {
		mode: serverOptions['client-mode'],
	}));
*/
//TODO top level await

(async function main() {
  var _process$env$PORT;

  // Initialize the database.
  await Object(_database_create_database_js__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const routerOptions = {};
  /* webpack-dev-middleware
  	const config = clientOptions({}, {
  		mode: serverOptions['client-mode'],
  	});
  
  	let koaWebpackMiddleware;
  
  	if (useMiddleware) {
  		koaWebpackMiddleware = await koaWebpack({
  			// compiler: compiler,
  			config,
  			devMiddleware: {
  				methods: ['HEAD', 'GET', 'POST', 'PATCH', 'DELETE'],
  			},
  			hotClient: false,
  		});
  
  		routerOptions.replaceIndex = function (ctx) {
  			const filename = path.resolve(config.output.path, UIMainFileName);
  			ctx.response.type = 'html';
  			ctx.response.body = koaWebpackMiddleware.devMiddleware.fileSystem.createReadStream(filename);
  		};
  	}
  */

  const router = Object(_router_js__WEBPACK_IMPORTED_MODULE_6__["default"])(routerOptions);
  const PORT = (_process$env$PORT = process.env.PORT) !== null && _process$env$PORT !== void 0 ? _process$env$PORT : 3000; // KOA

  const app = new koa__WEBPACK_IMPORTED_MODULE_1___default.a();
  app.keys = [process.env.APP_KEY || 'imJustSomeKey'];
  const sessionConfig = {
    //TODO random keys: //L https://randomkeygen.com/
    // (string)(default is koa:sess) cookie key
    key: 'koa:sess',
    // (number || 'session')(default is 1 days) maxAge in ms, 'session' will result in a cookie that expires when session/browser is closed, Warning: If a session cookie is stolen, this cookie will never expire
    maxAge: 86400000,
    // (boolean)(default true) can overwrite or not
    overwrite: true,
    // (boolean)(default true) httpOnly or not , httpOnly cookies tell the browser not to expose them to client-side script (so that they can only be opened by the server)
    httpOnly: true,
    // (boolean)(default true) signed or not , signed cookies verify that the data is unchanged on the client side
    signed: true,
    // (boolean)(default false) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. , I think this means that the session is reset after every request? (that is that the maxAge is basically since the last time the user made a request)
    rolling: true,
    // (boolean)(default is false) renew session when session is nearly expired, so we can always keep user logged in, //? does this mean never expiring sessions?
    renew: false
  }; //L https://github.com/socketio/socket.io#in-conjunction-with-koa

  const server = http__WEBPACK_IMPORTED_MODULE_5___default.a.createServer(app.callback()); // SOCKET IO

  const socketIO = new socket_io__WEBPACK_IMPORTED_MODULE_4___default.a(server);
  _live_data_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].socket = socketIO.of('/live-data'); //  ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
  //  ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
  //  ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
  //  ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
  //  ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
  //  ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

  /* Timer / Logger
  	// response timer
  	app.use(async (ctx, next) => {
  		const start = Date.now();
  		await next();
  		const ms = Date.now() - start;
  		ctx.response.set('response-time', `${ms}ms`);
  	});
  
  	// request logger
  	app.use(async (ctx, next) => {
  		console.log(`${ctx.request.method} ${ctx.request.path}`);
  		await next();
  	});
  */
  // BODY PARSER

  app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_2___default()()); // SESSION

  app.use(koa_session__WEBPACK_IMPORTED_MODULE_3___default()(sessionConfig, app));
  /* View Counter
  	app.use(async (ctx, next) => {
  		// ignore favicon
  		// TODO this doesn't work as it's processing two 'requests' per view - the page and it's resources
  		if (ctx.request.path !== '/favicon.ico') {
  			let n = ctx.session.views || 0;
  			ctx.session.views = ++n;
  		}
  		//console.log(ctx.session.views + ' views');
  		await next();
  	});
  */

  /* webpack-dev-middleware
  	if (useMiddleware) {
  		app.use(koaWebpackMiddleware);
  	}
  */
  // ROUTES

  app.use(router.routes()); //L https://github.com/alexmingoia/koa-router#routerallowedmethodsoptions--function

  app.use(router.allowedMethods()); // LIVE DATA

  _live_data_server_js__WEBPACK_IMPORTED_MODULE_7__["default"].start({
    app,
    socket: socketIO.of('/live-data')
  }); //  ██╗     ██╗███████╗████████╗███████╗███╗   ██╗
  //  ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║
  //  ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║
  //  ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║
  //  ███████╗██║███████║   ██║   ███████╗██║ ╚████║
  //  ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝
  // START SERVER
  //G Connect at http://localhost:<PORT>

  server.listen(PORT, () => {
    console.log(`\n█████████████████████████████`);
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
  }); //L Unhandled errors: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar

  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, '\n Reason:', reason); //TODO handle
  });
})().catch(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["logPropagate"]);

/***/ }),

/***/ "./source/server/router.js":
/*!*********************************!*\
  !*** ./source/server/router.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createRouter; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-send */ "koa-send");
/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_send__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _config_project_paths_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/project-paths.js */ "./source/config/project-paths.js");
/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/constants.js */ "./source/shared/constants.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _entities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./entities/index.js */ "./source/server/entities/index.js");
/* harmony import */ var _shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _session_methods_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./session-methods.js */ "./source/server/session-methods.js");
/* harmony import */ var _database_database_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./database/database.js */ "./source/server/database/database.js");
/* harmony import */ var _sources_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sources/index.js */ "./source/server/sources/index.js");
/* harmony import */ var _server_registry_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./server-registry.js */ "./source/server/server-registry.js");
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//G
	non-idempotent: (different result depending on how many times called)
	POST		-	Create

	idempotent: (same result no matter how many times called)
	GET		-	Retrieve
	PUT		-	Update (replace entirely)
	PATCH	-	Update (partially)
	DELETE	-	Delete

	//L put vs post: https://stackoverflow.com/questions/630453/put-vs-post-in-rest

	//G only use await next(); inside a route when the request should be further processed down the chain (ie. to finally result at .all), I cant think of a reason why this would be wanted (just use more middleware instead to do this)

	//L
	path parameters vs query parameters: https://stackoverflow.com/questions/3198492/rest-standard-path-parameters-or-request-parameters
	use path parameters to retrieve a specific item (via unique identifier)
	use query parameters to retrieve a list of items (via 'query parameters')
	/:type/:id 	are accessed via ctx.params.x
	/type?id=123	are accessed via ctx.query.x
	https://github.com/alexmingoia/koa-router#url-parameters


	//G all methods (except get) should pass parameters as their respective sj.Base
	//G get uses name as the identifier, TODO but should also accept id in the future

	node module.exports (unused, switched to ES Modules)
	//L https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac
	exports is a reference to module.exports. therefore - ok to assign properties to both, ok to do module.exports= but not exports=

	//R use query parameters for api get requests where multiple params may be needed or optional, use the single path parameters for page get requests where we're looking for a simple unique route
*/
//  ████████╗ ██████╗ ██████╗  ██████╗
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝

/*
	consider using a separate router for source-api requests (sourceRouter)

	error converting Track() to JSON because of circular reference

	Create lint rule to not call next() without await: await next().
		This was causing requests to return early and 404 all the time.
*/
// BUILT-IN

 // EXTERNAL

 //L https://github.com/alexmingoia/koa-router

 //L https://github.com/koajs/send
// INTERNAL










 //L Race-condition in koa-router appears to be a false positive: https://github.com/koajs/koa/issues/1351

/* eslint-disable require-atomic-updates */

const root = _config_project_paths_js__WEBPACK_IMPORTED_MODULE_5__["clientBuildDirectory"];
const app = `/${_config_project_paths_js__WEBPACK_IMPORTED_MODULE_5__["UIMainFileName"]}`;

function createAPIRouter() {
  const apiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a(); // Database CRUD and server-side processing.

  apiRouter // Catches and propagates all errors, but assigns them to the response body rather than throwing.
  .all('/*', async (ctx, next) => {
    await next().catch(rejected => {
      ctx.response.body = Object(_shared_propagate_js__WEBPACK_IMPORTED_MODULE_9__["returnPropagate"])(rejected);
    });
  }) // Set GET request bodies as the parsed body parameter (if it exists).
  .get('/*', async (ctx, next) => {
    const queryBody = ctx.request.query[_shared_constants_js__WEBPACK_IMPORTED_MODULE_6__["GET_BODY"]];

    try {
      ctx.request.body = queryBody === undefined ? {} : JSON.parse(queryBody);
    } catch (error) {
      ctx.response.body = 400;
      ctx.response.body = new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__["ParseError"]({
        message: error.message,
        userMessage: 'Request failed due to an internal error.',
        input: queryBody
      });
    }

    await next();
  });

  function addCRUD(router, Entity) {
    const path = `/${Entity.table}`;

    const action = method => async ctx => {
      ctx.response.body = await method(ctx.request.body, {
        includeMetadata: true
      });
    };

    return router.post(path, action(Entity.add.bind(Entity))).get(path, action(Entity.get.bind(Entity))).patch(path, action(Entity.edit.bind(Entity))).delete(path, action(Entity.remove.bind(Entity)));
  }

  addCRUD(apiRouter, _entities_index_js__WEBPACK_IMPORTED_MODULE_8__["User"]);
  addCRUD(apiRouter, _entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Playlist"]);
  addCRUD(apiRouter, _entities_index_js__WEBPACK_IMPORTED_MODULE_8__["Track"]);
  apiRouter // SESSION
  //R //L login/logout are create/remove for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
  //? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
  .post('/session', async ctx => {
    ctx.response.body = await _session_methods_js__WEBPACK_IMPORTED_MODULE_10__["login"](_database_database_js__WEBPACK_IMPORTED_MODULE_11__["default"], ctx, ctx.request.body);
  }).get('/session', async ctx => {
    //R thought about moving this to user, but with 'self' permissions, but if its a me request, the user specifically needs to know who they are - in get user cases, the user already knows what they're searching for an just needs the rest of the information
    ctx.response.body = await _session_methods_js__WEBPACK_IMPORTED_MODULE_10__["get"](ctx);
  }).delete('/session', async ctx => {
    ctx.response.body = await _session_methods_js__WEBPACK_IMPORTED_MODULE_10__["logout"](ctx);
  }) // AUTH
  .get('/spotify/authRequestStart', async ctx => {
    // Retrieves an auth request URL and it's respective local key (for event handling).
    ctx.response.body = await _sources_index_js__WEBPACK_IMPORTED_MODULE_12__["spotify"].startAuthRequest();
  }).get('/spotify/authRedirect', async ctx => {
    // Receives credentials sent from spotify, emits an event & payload that can then be sent back to the original client.
    //! This URL is sensitive to the url given to spotify developer site (I think).
    await _sources_index_js__WEBPACK_IMPORTED_MODULE_12__["spotify"].receiveAuthRequest(ctx.request.query);
    await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, app, {
      root
    });
  }).post('/spotify/authRequestEnd', async ctx => {
    ctx.response.body = await _sources_index_js__WEBPACK_IMPORTED_MODULE_12__["spotify"].endAuthRequest(ctx.request.body);
  }).post('/spotify/exchangeToken', async ctx => {
    ctx.response.body = await _sources_index_js__WEBPACK_IMPORTED_MODULE_12__["spotify"].exchangeToken(ctx, ctx.request.body);
  }).get('/spotify/refreshToken', async ctx => {
    ctx.response.body = await _sources_index_js__WEBPACK_IMPORTED_MODULE_12__["spotify"].refreshToken(ctx);
  }).get('/youtube/credentials', async ctx => {
    ctx.response.body = await _sources_index_js__WEBPACK_IMPORTED_MODULE_12__["youtube"].getCredentials();
  }) // catch
  .all('/*', async ctx => {
    ctx.response.body = new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_7__["InvalidStateError"]({
      userMessage: 'could not process request',
      message: 'invalid api command',
      state: ctx.request.body
    });
  });
  return apiRouter;
}

function createRouter()
/* {replaceIndex}*/
{
  const router = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a();
  const apiRouter = createAPIRouter(); //L nested routers: https://github.com/alexmingoia/koa-router#nested-routers

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods()); // PAGE

  router.get('/favicon.ico', async ctx => {
    //L Temporarily ignore favicon request: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
    ctx.response.status = 204;
  }).get('/*', async ctx => {
    /*
    	// pages are accessed through the base GET method, serve any public files here
    	//! static resource references in index.html should be absolute '/foo', not relative './foo'
    			//! "Note: To deploy .mjs on the web, your web server needs to be configured to serve files with this extension using the appropriate Content-Type: text/javascript header"
    	//L https://developers.google.com/web/fundamentals/primers/modules
    			//TODO //! errors thrown here aren't caught - fix this here and everywhere else
    */
    // Serve resources.
    if (fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(root, ctx.request.path)) && ctx.request.path.indexOf('.') >= 0) {
      await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, ctx.request.path, {
        root
      }); //TODO find a better way to differentiate a valid file from a just a valid path (other than indexOf('.'))
      //TODO webpack might have a better way to identify static resources
    } else if (!_session_methods_js__WEBPACK_IMPORTED_MODULE_10__["isLoggedIn"](ctx) && ctx.request.path !== '/login' && ctx.request.path !== '/database') {
      // Redirect if not logged in.
      //TODO this should use isLoggedIn, though that isn't perfect yet and it's async
      ctx.request.path = '/'; //! ctx.redirect() will not redirect if ctx.request.path is anything but '/', no idea why

      ctx.redirect('/login');
    } else {
      // Otherwise always return the index.js file, this is the root app and vue will handle the routing client-side.
      //L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
      await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, app, {
        root
      });
    }
    /* webpack-dev-middleware
    	if (replaceIndex !== undefined) {
    		replaceIndex(ctx);
    	}
    	else {
    */

  }).all('/*', async ctx => {
    ctx.body += '.all /* reached'; //G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
  });
  return router;
}

/***/ }),

/***/ "./source/server/server-registry.js":
/*!******************************************!*\
  !*** ./source/server/server-registry.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_class_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/class-registry */ "./source/shared/class-registry.js");

/* harmony default export */ __webpack_exports__["default"] = (new _shared_class_registry__WEBPACK_IMPORTED_MODULE_0__["default"]('serverRegistryIdKey'));

/***/ }),

/***/ "./source/server/session-methods.js":
/*!******************************************!*\
  !*** ./source/server/session-methods.js ***!
  \******************************************/
/*! exports provided: login, get, logout, isLoggedIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoggedIn", function() { return isLoggedIn; });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/index.js */ "./source/server/entities/index.js");
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/postgres-error.js */ "./source/server/errors/postgres-error.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _server_registry_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./server-registry.js */ "./source/server/server-registry.js");
// EXTERNAL
 // INTERNAL





 // CREATE

async function login(db, ctx, user) {
  // Validate
  await _entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"].schema.name.rule(user.name);
  await _entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"].schema.password.rule(user.password); //! this will error on stuff like 'password must be over x characters long' when really it should just be 'password incorrect', maybe just have a string check rule?
  // Get password.

  const existingPassword = await db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).then(resolved => {
    return resolved.password;
  }).catch(rejected => {
    throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      postgresError: rejected,
      userMessage: 'Could not login, a database error has occurred.'
    });
  }); // Check password.

  const isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_0___default.a.compare(user.password, existingPassword).catch(rejected => {
    throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_4__["InvalidStateError"]({
      userMessage: 'server error',
      message: 'hash compare failed',
      state: rejected
    });
  });

  if (!isMatch) {
    throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_4__["CustomError"]({
      userMessage: 'incorrect password'
    });
  } // Get user


  const retrievedUser = await db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', user.name).catch(rejected => {
    throw new _errors_postgres_error_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      postgresError: rejected,
      userMessage: 'Could not login, a database error has occurred.'
    });
  });
  ctx.session.user = new _entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"](retrievedUser);
  return ctx.session.user;
} // READ

async function get(ctx) {
  if (isLoggedIn(ctx)) {
    return ctx.session.user;
  }

  throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_4__["CustomError"]({
    userMessage: 'You are not logged in.',
    message: 'User is not logged in.'
  });
} // UPDATE
//?
// DELETE

async function logout(ctx) {
  delete ctx.session.user;
} //TODO This doesn't check if the user exists however, though wouldn't this be expensive? searching the database every time the user wants to know if they're logged in, (every page).

function isLoggedIn(ctx) {
  var _ctx$session$user;

  return _server_registry_js__WEBPACK_IMPORTED_MODULE_5__["default"].autoConstruct(ctx.session.user) instanceof _entities_index_js__WEBPACK_IMPORTED_MODULE_1__["User"] && _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].integer.test((_ctx$session$user = ctx.session.user) === null || _ctx$session$user === void 0 ? void 0 : _ctx$session$user.id);
}

/***/ }),

/***/ "./source/server/source.js":
/*!*********************************!*\
  !*** ./source/server/source.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Source; });
/* harmony import */ var _shared_source_parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/source-parts.js */ "./source/shared/source-parts.js");
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utility/index.js */ "./source/shared/utility/index.js");


class Source {
  constructor(...args) {
    _shared_source_parts_js__WEBPACK_IMPORTED_MODULE_0__["default"].intercept(...args);
    _shared_source_parts_js__WEBPACK_IMPORTED_MODULE_0__["default"].instance(this, ...args);
    const [{
      serverTestProp = null
    }] = args;
    _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(this, {
      serverTestProp
    });
  }

}
_shared_source_parts_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype(Source);
_shared_source_parts_js__WEBPACK_IMPORTED_MODULE_0__["default"].static(Source);

/***/ }),

/***/ "./source/server/sources/index.js":
/*!****************************************!*\
  !*** ./source/server/sources/index.js ***!
  \****************************************/
/*! exports provided: spotify, youtube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _spotify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spotify.js */ "./source/server/sources/spotify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spotify", function() { return _spotify_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _youtube_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./youtube.js */ "./source/server/sources/youtube.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "youtube", function() { return _youtube_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./source/server/sources/spotify.js":
/*!******************************************!*\
  !*** ./source/server/sources/spotify.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! spotify-web-api-node */ "spotify-web-api-node");
/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _shared_request_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/request.js */ "./source/shared/request.js");
/* harmony import */ var _server_source_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../server/source.js */ "./source/server/source.js");
/* harmony import */ var _entities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../entities/index.js */ "./source/server/entities/index.js");
/* harmony import */ var _shared_constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants.js */ "./source/shared/constants.js");
/* harmony import */ var _session_methods_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../session-methods.js */ "./source/server/session-methods.js");
/* harmony import */ var _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _shared_credentials_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/credentials.js */ "./source/shared/credentials.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../auth.js */ "./source/server/auth.js");
//TODO consider moving this over to the globals-server stuff
// this is only used in auth.startAuthRequest() for its spotify.makeAuthRequestURL() function
// EXTERNAL
// import btoa from 'btoa';
 //L https://github.com/thelinmichael/spotify-web-api-node
// BUILT-IN

 // INTERNAL










const emitter = new events__WEBPACK_IMPORTED_MODULE_1___default.a();
const spotify = new _server_source_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
  name: 'spotify',
  register: true,
  api: new spotify_web_api_node__WEBPACK_IMPORTED_MODULE_0___default.a({
    // create api object and set credentials in constructor
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
  }),

  get scopes() {
    //? why does this need to be a getter?, i think it was because one of the properties needed to be dynamic and react to authRequestManually
    return [
    /* //C
             contains an array of all scopes sent with the auth request
               'streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private' are required for the web playback sdk
             'user-modify-playback-state' is required to operate the playback
               show_dialog sets whether or not to force the user to approve the request each time
               state gets returned back with the request, TODO use with hashes to verfy that the response came from the expected source
             */
    // users
    'user-read-private', 'user-read-email', 'user-read-birthdate', // spotify connect
    'user-read-currently-playing', 'user-modify-playback-state', 'user-read-playback-state', // streaming
    'streaming'];
  },

  authRequestManually: true,

  makeAuthRequestURL(key) {
    //TODO make a better catch & handle, this is a temporary catch for undefined credentials as the error is silent until it arrives on spotify's end: 'Missing required parameter: client_id'
    const credentials = this.api._credentials;

    if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(credentials.clientId) || !_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(credentials.clientSecret) || !_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(credentials.redirectUri)) {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["InvalidStateError"]({
        userMessage: 'one or more api credentials are missing or of the wrong type',
        state: {
          clientId: credentials.clientId,
          clientSecret: credentials.clientSecret,
          redirectUri: credentials.redirectUri
        }
      });
    } //! the show_dialog query parameter isn't available in the createAuthorizeURL, so it is manually added


    return this.api.createAuthorizeURL(this.scopes, key) + `&show_dialog=${this.authRequestManually}`;
  }

}); //TODO make any property available for Source

Object.assign(spotify, {
  async startAuthRequest() {
    const pack = await _auth_js__WEBPACK_IMPORTED_MODULE_10__["default"].addRequestKey();
    return new _shared_credentials_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      authRequestKey: pack.key,
      authRequestTimestamp: pack.timestamp,
      authRequestTimeout: pack.timeout,
      authRequestURL: this.makeAuthRequestURL(pack.key)
    });
  },

  async receiveAuthRequest(query) {
    // receives and transforms credentials from spotify after the user confirms the authorization

    /* // spotify authorization guide
    	//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
    			if the user accepts the request:
    	code	An authorization code that can be exchanged for an access token.
    	state	The value of the state parameter supplied in the request.
    			if the user denies the request, or if an error has occured
    	error	The reason authorization failed, for example: “access_denied”
    	state	The value of the state parameter supplied in the request.
    			//TODO create error parser for spotify api
    */
    // ensure key is recognized, if its not (or timed out), nothing can be done, let it timeout on the client side too
    await _auth_js__WEBPACK_IMPORTED_MODULE_10__["default"].checkRequestKey(query.state); // ensure that spotify sent the code

    if (query.code === undefined) {
      emitter.emit(query.state, new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["InvalidStateError"]({
        userMessage: 'spotify authorization failed',
        message: 'code is missing',
        state: query
      }));
    } // ensure that spotify didn't send an error


    if (query.error !== undefined) {
      emitter.emit(query.state, new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["InvalidStateError"]({
        userMessage: 'spotify authorization failed',
        message: query.error,
        state: query
      }));
    } // send the event and credentials for endAuthRequest() to pick up


    emitter.emit(query.state, new _shared_credentials_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      //? sj.success here?
      authRequestKey: query.state,
      //? is this needed anymore?
      authCode: query.code
    }));
  },

  async endAuthRequest(credentials) {
    // catches events emitted by receiveAuthRequest() and sends them to the waiting router request
    return new Promise((resolve, reject) => {
      //! needs to be a promise wrapper because emitter.once uses a callback function
      // setup listener for authRequestKey
      emitter.once(credentials.authRequestKey, result => {
        resolve(result);
      }); // setup timeout

      Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["wait"])(credentials.authRequestTimeout).then(() => {
        reject(new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["CustomError"]({
          userMessage: 'request timeout'
        }));
      });
    });
  },

  async exchangeToken(ctx, credentials) {
    // exchange auth code for access and refresh tokens
    // exchangeToken() is only outside of endAuthRequest() because the auth window should close and not have to wait for the exchange to happen - to reduce flickering of the redirect page
    // grab timestamp before sending request so that the recorded expiry time is before the actual expiry time
    const timestamp = Date.now(); // exchange the auth code for tokens
    //L https://developer.spotify.com/documentation/general/guides/authorization-guide/

    const result = await Object(_shared_request_js__WEBPACK_IMPORTED_MODULE_3__["default"])('POST', 'https://accounts.spotify.com/api/token', {
      body: Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["encodeProperties"])({
        grant_type: 'authorization_code',
        code: credentials.authCode,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        // only used for validation, no need to make a second redirect handler
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET // alternative to client_id and client_secret properties, put this in header: 'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,

      }),
      headers: _shared_constants_js__WEBPACK_IMPORTED_MODULE_6__["URL_HEADER"]
    }).catch(rejected => {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["InvalidStateError"]({
        userMessage: 'failed to authorize spotify',
        message: 'token exchange failed',
        state: rejected
      });
    }); // store refresh token in database
    // while the client triggers the refresh of the accessToken (so that the server doesn't have to keep track of which users are online), the refreshToken is stored server side so that the user doesn't have to re-auth between sessions

    const me = await _session_methods_js__WEBPACK_IMPORTED_MODULE_7__["get"](ctx);
    await _entities_index_js__WEBPACK_IMPORTED_MODULE_5__["User"].edit({
      id: me.id,
      spotifyRefreshToken: result.refresh_token
    }); // repack and return

    return new _shared_credentials_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      accessToken: result.access_token,
      expires: timestamp + result.expires_in,
      // refreshToken: result.refresh_token,
      scopes: result.scope.split(' ') // result.token_type is the only omitted property, this is always 'Bearer'

    });
  },

  async refreshToken(ctx) {
    // get the refresh token from the database
    const me = await _session_methods_js__WEBPACK_IMPORTED_MODULE_7__["get"](ctx);
    const refreshToken = await _entities_index_js__WEBPACK_IMPORTED_MODULE_5__["User"].get(me).then(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["one"]).then(resolved => resolved.spotifyRefreshToken); // if there isn't one, throw the specific AuthRequired error, this will be identified on the client side and trigger spotify.auth()
    //TODO reconsider this string test

    if (!_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].visibleString.test(refreshToken)) {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["AuthRequired"]();
    } // send a refresh request to spotify to get new access token, expiry time, and possible refresh token


    const timestamp = Date.now();
    const result = await Object(_shared_request_js__WEBPACK_IMPORTED_MODULE_3__["default"])('POST', 'https://accounts.spotify.com/api/token', {
      body: Object(_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["encodeProperties"])({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }),
      headers: _shared_constants_js__WEBPACK_IMPORTED_MODULE_6__["URL_HEADER"]
    }).catch(rejected => {
      throw new _shared_errors_index_js__WEBPACK_IMPORTED_MODULE_8__["InvalidStateError"]({
        userMessage: 'failed to authorize spotify',
        message: 'token refresh failed',
        state: rejected
      });
    }); // if a new refresh token was sent

    if (_shared_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.test(result.refresh_token)) {
      //? better validation?
      // store it
      await _entities_index_js__WEBPACK_IMPORTED_MODULE_5__["User"].edit({
        id: me.id,
        spotifyRefreshToken: result.refresh_token
      });
    } // send only the accessToken and the expiry time


    return new _shared_credentials_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
      origin: 'sj.spotify.refreshToken()',
      accessToken: result.access_token,
      expires: timestamp + result.expires_in
    });
  }

});
/* harmony default export */ __webpack_exports__["default"] = (spotify);

/***/ }),

/***/ "./source/server/sources/youtube.js":
/*!******************************************!*\
  !*** ./source/server/sources/youtube.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _server_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../server/source.js */ "./source/server/source.js");

const youtube = new _server_source_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  name: 'youtube',
  register: true
});
Object.assign(youtube, {
  getCredentials: async () => ({
    apiKey: process.env.YOUTUBE_API_KEY,
    clientId: process.env.YOUTUBE_CLIENT_ID
  })
});
/* harmony default export */ __webpack_exports__["default"] = (youtube);

/***/ }),

/***/ "./source/shared/class-registry.js":
/*!*****************************************!*\
  !*** ./source/shared/class-registry.js ***!
  \*****************************************/
/*! exports provided: default, sharedRegistry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sharedRegistry", function() { return sharedRegistry; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");
/*
	Provides a system for determining the class to reconstruct from a raw object passed between the client and server.
	Inheritance is preserved as child instances will overwrite their parent's id.
	//! //G Id's must be hard-coded and not generated.
		Otherwise different realms (client, server) would produce different keys.
		Use the class name for simplicity.
*/

class ClassRegistry {
  constructor(idKey) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(idKey);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      idKey,
      registry: []
    });
  }

}
_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(ClassRegistry.prototype, {
  defineId(target, id) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(id); // Must be writable so that sub-classes can overwrite the id with a more specific one.

    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(target, {
      [this.idKey]: id
    });
  },

  register(Class, id, reconstructor = (Class, value) => new Class(value)) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].constructor.validate(Class);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(id);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(reconstructor);
    this.registry.forEach(registered => {
      if (registered.Class === Class) {
        throw new Error('Cannot register auto constructable class, as the class has already been registered.');
      }

      if (registered.id === id) {
        throw new Error('Cannot register auto constructable class, as the id has already been registered.');
      }
    });
    this.registry.push({
      Class,
      id,
      reconstructor
    });
  },

  autoConstruct(value) {
    const registered = this.registry.find(registered => registered.id === (value === null || value === void 0 ? void 0 : value[this.idKey]));
    return registered === undefined ? value : registered.reconstructor(registered.Class, value);
  },

  isRegistered(value) {
    return this.registry.some(registered => registered.id === (value === null || value === void 0 ? void 0 : value[this.idKey]));
  }

});
const sharedRegistry = new ClassRegistry('sharedRegistryIdKey');

/***/ }),

/***/ "./source/shared/constants.js":
/*!************************************!*\
  !*** ./source/shared/constants.js ***!
  \************************************/
/*! exports provided: SERVER_URL, API_URL, JSON_HEADER, URL_HEADER, GET_BODY, APP_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_URL", function() { return SERVER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON_HEADER", function() { return JSON_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_HEADER", function() { return URL_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_BODY", function() { return GET_BODY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_NAME", function() { return APP_NAME; });
const SERVER_URL = `http://localhost:3000`;
const API_URL = `${SERVER_URL}/api`;
const JSON_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});
const URL_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
});
const GET_BODY = encodeURIComponent('body');
const APP_NAME = 'StreamJockey'; // Only used for Spotify player right now.

/***/ }),

/***/ "./source/shared/credentials.js":
/*!**************************************!*\
  !*** ./source/shared/credentials.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Credentials; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");

class Credentials {
  constructor(options = {}) {
    //TODO allowUnknown: true,
    const {
      //TODO This part should only be server-side.
      //TODO Consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials.
      authRequestKey = Symbol(),
      //! This shouldn't break checkKey(), but also shouldn't match anything.
      authRequestTimestamp = 0,
      authRequestTimeout = 300000,
      // default 5 minutes
      authRequestURL = '',
      authCode = Symbol(),
      accessToken = Symbol(),
      expires = 0,
      refreshToken = Symbol(),
      refreshBuffer = 60000,
      // 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value
      scopes = []
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      authRequestKey,
      authRequestTimestamp,
      authRequestTimeout,
      authRequestURL,
      authCode,
      accessToken,
      expires,
      refreshToken,
      refreshBuffer,
      scopes
    });
  }

}

/***/ }),

/***/ "./source/shared/derived-utility/fetch.js":
/*!************************************************!*\
  !*** ./source/shared/derived-utility/fetch.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Dynamically imports fetch from 'node-fetch' if it is not available.
//! Cannot name the function fetch because it creates a recursion issue.
/* harmony default export */ __webpack_exports__["default"] = (async function (...args) {
  // Must use typeof because it won't throw a reference error. https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
  // Fetch requires
  if (typeof fetch === 'undefined') return Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! node-fetch */ "node-fetch", 7)).then(m => m.default(...args));
  return fetch(...args);
});

/***/ }),

/***/ "./source/shared/derived-utility/image.js":
/*!************************************************!*\
  !*** ./source/shared/derived-utility/image.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return image; });
/* harmony import */ var _safe_stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./safe-stringify.js */ "./source/shared/derived-utility/safe-stringify.js");
// Returns a deep-cloned value for the purposes of debugging.
//! Will destroy any data not compatible with JSON.

function image(value) {
  return JSON.parse(Object(_safe_stringify_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value));
}

/***/ }),

/***/ "./source/shared/derived-utility/index.js":
/*!************************************************!*\
  !*** ./source/shared/derived-utility/index.js ***!
  \************************************************/
/*! exports provided: fetch, image, safeStringify, urlRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./source/shared/derived-utility/fetch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return _fetch_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image.js */ "./source/shared/derived-utility/image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "image", function() { return _image_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _safe_stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./safe-stringify.js */ "./source/shared/derived-utility/safe-stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safeStringify", function() { return _safe_stringify_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url.js */ "./source/shared/derived-utility/url.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlRule", function() { return _url_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/shared/derived-utility/safe-stringify.js":
/*!*********************************************************!*\
  !*** ./source/shared/derived-utility/safe-stringify.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return safeStringify; });
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fclone */ "fclone");
/* harmony import */ var fclone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fclone__WEBPACK_IMPORTED_MODULE_0__);
//TODO //L Consider: https://www.npmjs.com/package/safe-stable-stringify
//TODO //L Consider: https://www.npmjs.com/package/flatted <--- preserves circular JSON
//TODO //? Does this account for JSON.stringify() throwing on BigInt?

function safeStringify(value) {
  return JSON.stringify(fclone__WEBPACK_IMPORTED_MODULE_0___default()(value));
}

/***/ }),

/***/ "./source/shared/derived-utility/url.js":
/*!**********************************************!*\
  !*** ./source/shared/derived-utility/url.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_validation_rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/validation/rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var valid_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! valid-url */ "valid-url");
/* harmony import */ var valid_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(valid_url__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (new _utility_validation_rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (valid_url__WEBPACK_IMPORTED_MODULE_1___default.a.isWebUri(value) === undefined) {
      throw new Error('Value is not a valid URL');
    }
  }

}));

/***/ }),

/***/ "./source/shared/entityParts/entity.js":
/*!*********************************************!*\
  !*** ./source/shared/entityParts/entity.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");

/* harmony default export */ __webpack_exports__["default"] = (new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["ClassParts"]({
  instance(options = {}) {
    const {
      id
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      id,
      //R This has to be a variable because in some places entities are overwritten with entire other entities: Object.assign(E1, E2). Maybe this isn't ideal.
      filters: {}
    }); // Set instance filters to use the instance and the static filters.
    //TODO Refactor this, filters shouldn't be using the same name, its a bit confusing.

    const that = this;
    const staticFilters = this.constructor.filters;
    Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["getKeysOf"])(staticFilters).forEach(key => {
      _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].getter(this.filters, {
        get [key]() {
          return Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(that, staticFilters[key]);
        }

      });
    });
  },

  static() {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].getter(this, {
      get table() {
        return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
      }

    }); //TODO Can this be locked down as a constant? (See updateFilters()).

    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      filters: {
        id: ['id']
      }
    });
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      // Automatically create new filters based on schema.
      updateFilters() {
        const methodNames = ['add', 'get', 'edit', 'remove'];
        const types = ['in', 'out', 'check'];
        const schemaFilters = {};
        Object.keys(this.schema).forEach(key => {
          // For each property,
          methodNames.forEach(methodName => {
            // for each crud method,
            types.forEach(type => {
              // for each filter type:
              if (this.schema[key][methodName][type]) {
                // If property is optional or required:
                const filterName = methodName + type.charAt(0).toUpperCase() + type.slice(1); // Add it to the specific filter.

                if (!schemaFilters[filterName]) schemaFilters[filterName] = [];
                schemaFilters[filterName].push(key);
              }
            });
          });
        });
        this.filters = { ...this.filters,
          ...schemaFilters
        };
      }

    });
  }

}));

/***/ }),

/***/ "./source/shared/entityParts/index.js":
/*!********************************************!*\
  !*** ./source/shared/entityParts/index.js ***!
  \********************************************/
/*! exports provided: entityParts, playlistParts, trackParts, userParts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./source/shared/entityParts/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "entityParts", function() { return _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _playlist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playlist.js */ "./source/shared/entityParts/playlist.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "playlistParts", function() { return _playlist_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./track.js */ "./source/shared/entityParts/track.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trackParts", function() { return _track_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.js */ "./source/shared/entityParts/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "userParts", function() { return _user_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/shared/entityParts/playlist.js":
/*!***********************************************!*\
  !*** ./source/shared/entityParts/playlist.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _schema_states_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema-states.js */ "./source/shared/entityParts/schema-states.js");
/* harmony import */ var _project_rules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../project-rules.js */ "./source/shared/project-rules.js");
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");



/* harmony default export */ __webpack_exports__["default"] = (new _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["ClassParts"]({
  instance(options = {}) {
    const {
      userId,
      name = '',
      visibility = '',
      description = '',
      color = '',
      image = ''
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["define"].writable(this, {
      userId,
      name,
      visibility,
      description,
      color,
      image
    });
  },

  static() {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["define"].constant(this, {
      schema: {
        id: {
          columnName: 'id',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["id"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["auto"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"]
        },
        userId: {
          columnName: 'userId',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["id"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        name: {
          columnName: 'name',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["name"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        description: {
          columnName: 'description',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["description"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        visibility: {
          columnName: 'visibility',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["visibilityState"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        image: {
          columnName: 'image',
          rule: _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.validate,
          //TODO Image url rule.
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        color: {
          columnName: 'color',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["color"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        }
      }
    });
    this.updateFilters();
  }

}));

/***/ }),

/***/ "./source/shared/entityParts/schema-states.js":
/*!****************************************************!*\
  !*** ./source/shared/entityParts/schema-states.js ***!
  \****************************************************/
/*! exports provided: unused, optional, required, auto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unused", function() { return unused; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return optional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auto", function() { return auto; });
//TODO Make into class with validated properties.
//TODO //OLD schema property states //TODO could these be static on sj.Entity and called via this.x ?
const unused = {
  in: false,
  out: false,
  check: 0
};
const optional = {
  in: true,
  out: true,
  check: 1
};
const required = {
  in: true,
  out: true,
  check: 2
};
const auto = {
  in: false,
  out: true,
  check: 0
};

/***/ }),

/***/ "./source/shared/entityParts/track.js":
/*!********************************************!*\
  !*** ./source/shared/entityParts/track.js ***!
  \********************************************/
/*! exports provided: default, validateSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateSource", function() { return validateSource; });
/* harmony import */ var _schema_states_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema-states.js */ "./source/shared/entityParts/schema-states.js");
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _project_rules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../project-rules.js */ "./source/shared/project-rules.js");



/* harmony default export */ __webpack_exports__["default"] = (new _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["ClassParts"]({
  instance(options = {}) {
    const {
      playlistId = null,
      position = null,
      //TODO assumes ids are unique, even across all sources
      sourceId = null,
      artists = [],
      name = null,
      //! Don't use 0 here as it counts as a 'set' value.
      duration = null,
      link = null
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].writable(this, {
      playlistId,
      position,
      sourceId,
      artists,
      name,
      duration,
      link,
      //TODO Ensure that this is only used as an instance then remove this.
      constructorName: 'Track'
    });
  },

  static() {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(this, {
      schema: {
        id: {
          columnName: 'id',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_2__["id"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["auto"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"]
        },
        playlistId: {
          columnName: 'playlistId',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_2__["id"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        position: {
          columnName: 'position',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_2__["position"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        name: {
          columnName: 'name',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_2__["name"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        duration: {
          columnName: 'duration',
          rule: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].nonNegativeInteger.validate,
          //TODO Expand
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        source: {
          columnName: 'source',
          //TODO Split source schema validation between client and server because they use different instances.
          rule: () => {},
          // rule: Source.validateRegistration.bind(Source),
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        sourceId: {
          columnName: 'sourceId',
          rule: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].string.validate,
          //TODO Expand
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        artists: {
          columnName: 'artists',
          rule: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].array.validate,
          //TODO Expand
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        }
      }
    }); // Update filters after schema is defined.

    this.updateFilters(); // Add an additional filter 'localMetadata'.
    //G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.

    _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(this.filters, {
      localMetadata: ['id', 'playlistId', 'position']
    });
  }

}));
function validateSource({
  instance,
  SourceClass,
  value
}) {
  // Validate passed source against registered instances.
  //R Must be defined on client/server because they use different Source classes.
  let source = null;

  if (_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].object.test(value)) {
    const found = SourceClass.instances.find(sourceInstance => sourceInstance.name === value.name);

    if (found) {
      source = found;
    } else {
      throw new Error('Source was passed but it is not an existing source.');
    }
  }

  _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].writable(instance, {
    source
  });
}

/***/ }),

/***/ "./source/shared/entityParts/user.js":
/*!*******************************************!*\
  !*** ./source/shared/entityParts/user.js ***!
  \*******************************************/
/*! exports provided: defaultSocketId, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSocketId", function() { return defaultSocketId; });
/* harmony import */ var _schema_states_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema-states.js */ "./source/shared/entityParts/schema-states.js");
/* harmony import */ var _project_rules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../project-rules.js */ "./source/shared/project-rules.js");
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");



const defaultSocketId = null;
/* harmony default export */ __webpack_exports__["default"] = (new _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["ClassParts"]({
  instance(options = {}) {
    const {
      name = '',
      email = '',
      password = '',
      password2 = '',
      spotifyRefreshToken = null,
      //?
      socketId = defaultSocketId
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["define"].writable(this, {
      name,
      email,
      password,
      password2,
      spotifyRefreshToken,
      socketId,
      //TODO Ensure that this is only used as an instance then remove this.
      constructorName: 'User'
    });
  },

  static() {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["define"].constant(this, {
      schema: {
        //G 0 = unused, 1 = optional, 2 = required
        id: {
          columnName: 'id',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["id"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["auto"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"]
        },
        name: {
          columnName: 'name',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["name"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        email: {
          columnName: 'email',
          rule: _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].string.validate,
          //TODO Email rule.
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        password: {
          columnName: 'password',
          rule: _project_rules_js__WEBPACK_IMPORTED_MODULE_1__["password"].validate,
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["required"],
          get: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"],
          edit: {
            in: true,
            out: false,
            check: 1
          },
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        },
        spotifyRefreshToken: {
          columnName: 'spotifyRefreshToken',
          rule: () => {},
          //TODO empty for now
          add: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"],
          get: {
            in: false,
            out: true,
            check: 0
          },
          edit: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["optional"],
          remove: _schema_states_js__WEBPACK_IMPORTED_MODULE_0__["unused"]
        }
      }
    });
    this.updateFilters();
  }

}));

/***/ }),

/***/ "./source/shared/errors/auth-required.js":
/*!***********************************************!*\
  !*** ./source/shared/errors/auth-required.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthRequired; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _class_registry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class-registry.js */ "./source/shared/class-registry.js");
// Used to communicate to client that the server does not have the required tokens and that the client must authorize.


const sharedRegistryId = 'AuthRequired';
class AuthRequired {
  constructor(options = {}) {
    const {
      message = 'authorization required'
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      message
    });
    _class_registry_js__WEBPACK_IMPORTED_MODULE_1__["sharedRegistry"].defineId(this, sharedRegistryId);
  }

}
_class_registry_js__WEBPACK_IMPORTED_MODULE_1__["sharedRegistry"].register(AuthRequired, sharedRegistryId);

/***/ }),

/***/ "./source/shared/errors/custom-error.js":
/*!**********************************************!*\
  !*** ./source/shared/errors/custom-error.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomError; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _class_registry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class-registry.js */ "./source/shared/class-registry.js");
//TODO Error's message property is non-enumerable. This prevents it from being passed to the client.

 // CustomError is registered to communicate an error via socket connection. See live-data-client.js

const sharedRegistryId = 'CustomError';
class CustomError extends Error {
  constructor({
    // User-readable message.
    // Alternative to the native Error class' 'message' property which should not be exposed to the user by default.
    //! //G sj.Error.message -> CustomError.userMessage, sj.Error.reason => CustomError.message
    userMessage = '',
    // Extract message from options and pass it properly to Error.
    message = userMessage
  } = {}) {
    super(message);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].validatedVariable(this, {
      userMessage: {
        value: userMessage,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate
      }
    });
    _class_registry_js__WEBPACK_IMPORTED_MODULE_1__["sharedRegistry"].defineId(this, sharedRegistryId);
  }

}
_class_registry_js__WEBPACK_IMPORTED_MODULE_1__["sharedRegistry"].register(CustomError, sharedRegistryId);

/***/ }),

/***/ "./source/shared/errors/http-error.js":
/*!********************************************!*\
  !*** ./source/shared/errors/http-error.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HTTPError; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");


class HTTPError extends _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor({
    code = 400,
    // HTTPS Response Status Code
    type = 'Bad Request',
    // Human-readable code name.
    ...rest
  } = {}) {
    super(rest);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].validatedVariable(this, {
      code: {
        value: code,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].integer.validate
      },
      type: {
        value: type,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate
      }
    });
  }

}

/***/ }),

/***/ "./source/shared/errors/index.js":
/*!***************************************!*\
  !*** ./source/shared/errors/index.js ***!
  \***************************************/
/*! exports provided: AuthRequired, CustomError, HTTPError, InternalError, InvalidStateError, MultipleErrors, ParseError, UnexpectedValueThrown, UnknownError, UnreachableError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_required_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-required.js */ "./source/shared/errors/auth-required.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthRequired", function() { return _auth_required_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CustomError", function() { return _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _http_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http-error.js */ "./source/shared/errors/http-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTTPError", function() { return _http_error_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal-error.js */ "./source/shared/errors/internal-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InternalError", function() { return _internal_error_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _invalid_state_error_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./invalid-state-error.js */ "./source/shared/errors/invalid-state-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidStateError", function() { return _invalid_state_error_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _multiple_errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./multiple-errors.js */ "./source/shared/errors/multiple-errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultipleErrors", function() { return _multiple_errors_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _parse_error_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parse-error.js */ "./source/shared/errors/parse-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return _parse_error_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unexpected-value-thrown.js */ "./source/shared/errors/unexpected-value-thrown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnexpectedValueThrown", function() { return _unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _unknown_error_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./unknown-error.js */ "./source/shared/errors/unknown-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnknownError", function() { return _unknown_error_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _unreachable_error_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./unreachable-error.js */ "./source/shared/errors/unreachable-error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnreachableError", function() { return _unreachable_error_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });












/***/ }),

/***/ "./source/shared/errors/internal-error.js":
/*!************************************************!*\
  !*** ./source/shared/errors/internal-error.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InternalError; });
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
// Used for errors that are caused by internal mistakes in the code.
// ie. Not the user's fault.

class InternalError extends _custom_error_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({
    userMessage = 'An internal error has occurred.',
    ...rest
  } = {}) {
    super({
      userMessage,
      ...rest
    });
  }

}

/***/ }),

/***/ "./source/shared/errors/invalid-state-error.js":
/*!*****************************************************!*\
  !*** ./source/shared/errors/invalid-state-error.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidStateError; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
/* harmony import */ var _derived_utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../derived-utility/index.js */ "./source/shared/derived-utility/index.js");



class InvalidStateError extends _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor({
    state,
    ...rest
  } = {}) {
    super(rest);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      state: Object(_derived_utility_index_js__WEBPACK_IMPORTED_MODULE_2__["image"])(state)
    });
  }

}

/***/ }),

/***/ "./source/shared/errors/multiple-errors.js":
/*!*************************************************!*\
  !*** ./source/shared/errors/multiple-errors.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleErrors; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
// Used for errors that get thrown in parallel.
//TODO Consider replacing with AggregateError (remember to add it to sharedRegistry like CustomError is)


class MultipleErrors extends _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor({
    userMessage = 'Some errors have occurred.',
    errors,
    ...rest
  } = {}) {
    super({
      userMessage,
      ...rest
    });
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].validatedVariable(this, {
      errors: {
        value: errors,
        validator: _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate
      }
    });
  }

}
_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(MultipleErrors, {
  throw(errors) {
    throw new MultipleErrors({
      errors
    });
  }

});

/***/ }),

/***/ "./source/shared/errors/parse-error.js":
/*!*********************************************!*\
  !*** ./source/shared/errors/parse-error.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ParseError; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");


class ParseError extends _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor({
    input,
    ...rest
  } = {}) {
    super(rest);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      input
    });
  }

}

/***/ }),

/***/ "./source/shared/errors/unexpected-value-thrown.js":
/*!*********************************************************!*\
  !*** ./source/shared/errors/unexpected-value-thrown.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UnexpectedValueThrown; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");


class UnexpectedValueThrown extends _custom_error_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor({
    value,
    // The value that was thrown.
    ...rest
  } = {}) {
    super(rest);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      value
    });
  }

}

/***/ }),

/***/ "./source/shared/errors/unknown-error.js":
/*!***********************************************!*\
  !*** ./source/shared/errors/unknown-error.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UnknownError; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _class_registry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class-registry.js */ "./source/shared/class-registry.js");
// Used for unknown errors. Those which cannot be reconstructed.
// Keeps the own, named, enumerable properties of the original error intact.
//! Intentionally extends from Error and not CustomError so that the original error can be mimicked as closely as possible.
//! Will throw an error if the passed value is not an object.


const sharedRegistryId = 'UnknownError';
class UnknownError extends Error {
  constructor(error = {}) {
    super(error.message); // Copy all properties.

    Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["forOwnKeysOf"])(error, key => {
      if (key !== 'message') {
        Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["copyProperty"])(key, error, this);
      }
    });
    _class_registry_js__WEBPACK_IMPORTED_MODULE_1__["sharedRegistry"].defineId(this, sharedRegistryId);
  }

}
_class_registry_js__WEBPACK_IMPORTED_MODULE_1__["sharedRegistry"].register(UnknownError, sharedRegistryId);

/***/ }),

/***/ "./source/shared/errors/unreachable-error.js":
/*!***************************************************!*\
  !*** ./source/shared/errors/unreachable-error.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UnreachableError; });
/* harmony import */ var _custom_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-error.js */ "./source/shared/errors/custom-error.js");
//G Used when a supposedly unreachable code path has been reached.

class UnreachableError extends _custom_error_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({
    message = 'An unreachable code-path has been reached.',
    ...rest
  } = {}) {
    super({
      message,
      ...rest
    });
  }

}

/***/ }),

/***/ "./source/shared/is-instance-of.js":
/*!*****************************************!*\
  !*** ./source/shared/is-instance-of.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//TODO Replace all references to this function with an instanceof or interface test.
/* harmony default export */ __webpack_exports__["default"] = (function (value, Class, className) {
  return value instanceof Class || (value === null || value === void 0 ? void 0 : value.constructorName) === className;
}); // Things that are matching constructorName
// User, Track

/***/ }),

/***/ "./source/shared/live-data.js":
/*!************************************!*\
  !*** ./source/shared/live-data.js ***!
  \************************************/
/*! exports provided: LiveTable, CachedEntity, LiveQuery, subscriptionParts, Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveTable", function() { return LiveTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachedEntity", function() { return CachedEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveQuery", function() { return LiveQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscriptionParts", function() { return subscriptionParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return Subscription; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");

class LiveTable {
  constructor(options = {}) {
    const {
      Entity
    } = options; //TODO See if any of these can be validated or made constant.

    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      Entity,
      liveQueries: [],
      cachedEntities: []
    });
  }

}
_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].constant(LiveTable, {
  tableEntities: [],

  makeTables({
    User,
    Playlist,
    Track
  }) {
    this.tableEntities.push(User, Playlist, Track);
    return new Map(this.tableEntities.map(EntityClass => [EntityClass, new this({
      Entity: EntityClass
    })]));
  },

  tableToEntity(tableName) {
    //TODO Refactor this.
    const FoundEntity = this.tableEntities.find(tableEntity => tableEntity.table === tableName);

    if (FoundEntity === undefined) {
      throw new Error(`Could not convert table name ${tableName} to an entity class. The corresponding entity class was not found.`);
    }

    return FoundEntity; //R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
    //R any metadata (table) should be sent separately (or implicitly) from the query
  }

});
class CachedEntity {
  constructor(options = {}) {
    const {
      table,
      entity
    } = options; //TODO See if any of these can be validated or made constant.

    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      table,
      entity,
      liveQueryRefs: [],
      timestamp: 0
    });
  }

}
class LiveQuery {
  constructor(options = {}) {
    const {
      table
    } = options;
    let {
      query
    } = options; //? Not sure why this is being done.

    if (_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(query)) query = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["any"])(query);
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      table,
      query,
      cachedEntityRefs: [],
      subscriptions: [],
      timestamp: 0
    });
  }

} // live-data-server uses an augmented Subscription class.

const subscriptionParts = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["ClassParts"]({
  instance(options = {}) {
    const {
      liveQuery,
      onUpdate = () => {},
      // Any update.
      onAdd = () => {},
      // Entities added.
      onEdit = () => {},
      // Entities data changed.
      onRemove = () => {} // Entities removed.

    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      liveQuery,
      onUpdate,
      onAdd,
      onEdit,
      onRemove
    });
  }

});
class Subscription {
  constructor(options = {}) {
    subscriptionParts.instance(this, options);
  }

}

/***/ }),

/***/ "./source/shared/project-rules.js":
/*!****************************************!*\
  !*** ./source/shared/project-rules.js ***!
  \****************************************/
/*! exports provided: id, position, name, description, color, password, visibilityState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "position", function() { return position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "description", function() { return description; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "password", function() { return password; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibilityState", function() { return visibilityState; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");
//G This file is for global rules that are opinionated for this project.
// For example: all identifiers shall be non-negative integers.
//TODO Create test file. Had an error where value was being compared rather than value.length.
//----------
//TODO : server source maps, better route error handling, fix error handling specifically in session.login

const id = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(value);
  },

  caster(reference) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validateCast(reference); // Cannot cast any further than a nonNegativeInteger.
  }

}); //TODO Consider renaming this and have 'position' refer to 1-based indices.

const position = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(value);
  },

  caster(reference) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validateCast(reference); // Cannot cast any further than a nonNegativeInteger.
  }

}); // Extracted Rules
//TODO Move these to a better location.
// stringMaxLength: 100,
// bigStringMaxLength: 2000,
// nameMinLength: 3,
// nameMaxLength: 16,

const nameMinLength = 3;
const nameMaxLength = 100;
const name = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].trimmedString.validate(value);

    if (!(nameMinLength <= value.length && value.length <= nameMaxLength)) {
      throw new Error(`Name is not between ${nameMinLength} and ${nameMaxLength} characters long.`);
    }
  }

});
const descriptionMaxLength = 2000;
const description = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].trimmedString.validate(value);

    if (!(value.length <= descriptionMaxLength)) {
      throw new Error(`Description is not under ${descriptionMaxLength} characters long.`);
    }
  }

});
const color = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  filter: '/#([a-f0-9]{3}){1,2}\b/',
  //TODO is this correct?
  filterMessage: 'Color must be in hex format #XXXXXX',

  validator(value) {
    if (!/^#([a-f0-9]{3}){1,2}$/.test(value)) {
      throw new Error('Value is not a color.');
    }
  }

});
const passwordMinLength = 6;
const passwordMaxLength = 72; //! As per bcrypt.

const password = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].trimmedString.validate(value);

    if (!(passwordMinLength <= value.length && value.length <= passwordMaxLength)) {
      throw new Error(`Password is not between ${passwordMinLength} and ${passwordMaxLength} characters long.`);
    }
  }

}); // Very Opinionated

const visibilityStates = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Enum"]('public', 'private', 'linkOnly'); // Basically an enum.

const visibilityState = new _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    if (!_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["Enum"].hasKey(visibilityStates, value)) {
      throw new Error('Value is not a valid visibility state.');
    }
  }

});

/***/ }),

/***/ "./source/shared/propagate.js":
/*!************************************!*\
  !*** ./source/shared/propagate.js ***!
  \************************************/
/*! exports provided: default, returnPropagate, logPropagate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return propagate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnPropagate", function() { return returnPropagate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logPropagate", function() { return logPropagate; });
/* harmony import */ var _errors_unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/unexpected-value-thrown.js */ "./source/shared/errors/unexpected-value-thrown.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors/index.js */ "./source/shared/errors/index.js");
/* harmony import */ var _class_registry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class-registry.js */ "./source/shared/class-registry.js");
/* harmony import */ var _reconstruct_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reconstruct-error.js */ "./source/shared/reconstruct-error.js");
// Takes a value (that should've been thrown), re-throws it if its already an Error, otherwise wraps it in an error instance and throws that.
//G Use in the final .catch() of a Promise chain to handle any unexpected values or errors thrown.
//! Be aware of JSON.stringify()'s interaction with Error instances and non-enumerable properties:
//L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify



 // Register the built-in Error class
// The registry id will be manually assigned to errors.

const sharedRegistryId = 'Error';
_class_registry_js__WEBPACK_IMPORTED_MODULE_2__["sharedRegistry"].register(Error, sharedRegistryId, _reconstruct_error_js__WEBPACK_IMPORTED_MODULE_3__["default"]); // Wraps the passed value in an Error instance if it isn't one. Then throws it.
// All instances will be registered with the sharedRegistry so that they can be identified as errors when passed between the client and server.

function propagate(thrownValue) {
  if (thrownValue instanceof Error) {
    if (thrownValue.constructor === Error) {
      // If the error is a direct instance of Error, try to add a sharedRegistryId so that it can be reconstructed as an Error.
      if (Object.getOwnPropertyDescriptor(thrownValue, _class_registry_js__WEBPACK_IMPORTED_MODULE_2__["sharedRegistry"].idKey).configurable) {
        _class_registry_js__WEBPACK_IMPORTED_MODULE_2__["sharedRegistry"].defineId(thrownValue, sharedRegistryId);
        throw thrownValue;
      } else if (_class_registry_js__WEBPACK_IMPORTED_MODULE_2__["sharedRegistry"].isRegistered(thrownValue)) {
        throw thrownValue;
      }
    }

    throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_1__["UnknownError"](thrownValue);
  } else {
    throw new _errors_unexpected_value_thrown_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      message: `An unexpected value was thrown.`,
      userMessage: 'An unexpected error has occurred.',
      value: thrownValue
    });
  }
} // Propagates a value, but returns it instead of throwing it.

function returnPropagate(thrownValue) {
  try {
    return propagate(thrownValue);
  } catch (error) {
    return error;
  }
} // Propagates a value, but logs it.
// The error should be considered 'handled'.

function logPropagate(thrownValue) {
  console.error(propagate(thrownValue));
}

/***/ }),

/***/ "./source/shared/reconstruct-error.js":
/*!********************************************!*\
  !*** ./source/shared/reconstruct-error.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reconstructError; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");
//TODO Create custom reconstruction option.

function reconstructError(Class, error) {
  const newError = new Class(error.message); // Copy all properties.

  Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["forOwnKeysOf"])(error, key => {
    if (key !== 'message') {
      Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["copyProperty"])(key, error, newError);
    }
  });
  return newError;
}

/***/ }),

/***/ "./source/shared/request.js":
/*!**********************************!*\
  !*** ./source/shared/request.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return request; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");
/* harmony import */ var _derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./derived-utility/index.js */ "./source/shared/derived-utility/index.js");
/* harmony import */ var _propagate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propagate.js */ "./source/shared/propagate.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/index.js */ "./source/shared/errors/index.js");
// Wrapper for the fetch function.
// Has better validations for inputs.
// Has an extra queryParameters option that can be used to add query parameters to the URL.
// Has an extra JSONBody option that can be used to stringify an input and use it as the body.
// Interprets the fetch API's return values.




async function request(method, URL, {
  // Custom
  queryParameters,
  JSONBody,
  // Fetch
  headers = _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["constants"].JSON_HEADER,
  body,
  ...rest
}) {
  /* //!//G use UPPERCASE HTTP methods.
  	In the fetch API, 'PATCH' is case-sensitive where GET, POST, DELETE aren't
  	//L Its absurd, but apparently intentional:
  	//L https://stackoverflow.com/questions/34666680/fetch-patch-request-is-not-allowed
  	//L https://github.com/whatwg/fetch/issues/50
  	//L https://github.com/github/fetch/pull/243
  */
  // Transform jsonBody to body string.
  if (JSONBody !== undefined) {
    if (body !== undefined) {
      throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_3__["InternalError"]({
        message: 'Request may not use both a string body and a JSONBody.'
      });
    }

    body = Object(_derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["safeStringify"])(JSONBody);
  } // Encode and append queryParameters to the URL.


  if (queryParameters !== undefined) {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].queryParameters.validate(queryParameters);
    const encodedParameters = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["encodeProperties"])(queryParameters);
    URL = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["appendQueryParameters"])(URL, encodedParameters);
  } // VALIDATION


  _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(method);
  _derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["urlRule"].validate(URL);
  _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].headers.validate(headers);
  if (body !== undefined) _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].body.validate(body); // Check that rest doesn't have any unused options.

  for (const key of Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["getKeysOf"])(rest, {
    own: true,
    named: true,
    enumerable: true,
    inherited: false,
    symbol: false,
    nonEnumerable: false
  })) {
    if (![//L From: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    // Except 'method', 'headers', 'body'.
    'mode', 'credentials', 'cache', 'redirect', 'referrer', 'referrerPolicy', 'integrity', 'keepalive', 'signal'].includes(key)) {
      throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_3__["InternalError"]({
        message: `Request has an unused option ${key}. This is a mistake.`,
        userMessage: 'Request failed due to an internal error.'
      });
    }
  } //L fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  //L When fetch throws: https://www.tjvantoll.com/2015/09/13/fetch-and-errors


  const result = await Object(_derived_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])(URL, { ...rest,
    method,
    headers,
    body
  }).catch(_propagate_js__WEBPACK_IMPORTED_MODULE_2__["default"]); //TODO Add custom handlers for fetch errors.
  // Return undefined if request was successful with no content returned.

  if (result.status === 204) return undefined; //TODO Consider adding custom handlers for other return types.
  // Extract raw and parsed results.
  //L fetch parsing: https://developer.mozilla.org/en-US/docs/Web/API/Body/json

  const rawResult = await result.clone().text().catch(rejected => {
    // Record the raw result for easier debugging.
    throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_3__["CustomError"]({
      message: 'Failed to parse fetch response as raw text.',
      userMessage: 'Request failed.',
      value: {
        error: rejected,
        rawResult
      }
    });
  }); // Throw non-ok status codes.

  if (!result.ok) throw Object(_propagate_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rawResult); //TODO consider custom handlers for http errors (ie 404s etc.);
  // If the parse fails, throw an error containing the raw result.

  const parsedResult = await result.clone().json().catch(() => Object(_propagate_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rawResult));
  return parsedResult;
}

/***/ }),

/***/ "./source/shared/source-parts.js":
/*!***************************************!*\
  !*** ./source/shared/source-parts.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errors_internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/internal-error.js */ "./source/shared/errors/internal-error.js");
/* harmony import */ var _credentials_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./credentials.js */ "./source/shared/credentials.js");
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");



/* harmony default export */ __webpack_exports__["default"] = (new _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["ClassParts"]({
  instance(options = {}) {
    const {
      name,
      register = false,
      nullPrefix = '',
      idPrefix = '',
      credentials = new _credentials_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
      //TODO This should only be server-side.
      api = {},
      scopes = [],
      authRequestManually = true,
      makeAuthRequestURL = () => {},
      ...rest
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["define"].constant(this, {
      name,
      register,
      nullPrefix,
      idPrefix,
      credentials,
      api,
      scopes,
      authRequestManually,
      makeAuthRequestURL,
      ...rest
    }); // Add source to static source list: sj.Source.instances.
    //R Must be manually declared to register, as otherwise, temporary initializations get added and cause issue.

    if (this.register) {
      this.constructor.register(this);
    }
  },

  static() {
    _utility_index_js__WEBPACK_IMPORTED_MODULE_2__["define"].constant(this, {
      instances: [],

      register(source) {
        if (!(source instanceof this)) {
          throw new _errors_internal_error_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
            message: 'A non-Source was registered.'
          });
        }

        this.instances.push(source);
      },

      find(name) {
        return this.instances.find(instance => instance.name === name);
      },

      isRegistered(name) {
        return this.find(name) !== undefined;
      },

      validateRegistration(value) {
        if (!this.isRegistered(value)) {
          throw new Error('Source is not registered.');
        }
      }

    });
  }

}));

/***/ }),

/***/ "./source/shared/timestamped-data.js":
/*!*******************************************!*\
  !*** ./source/shared/timestamped-data.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MetadataContainer; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./source/shared/utility/index.js");
// Holds timestamp metadata for data to be transferred.

class MetadataContainer {
  constructor(options = {}) {
    const {
      data,
      timestamp = null
    } = options;
    _utility__WEBPACK_IMPORTED_MODULE_0__["define"].constant(this, {
      data,
      timestamp
    });
  }

}

/***/ }),

/***/ "./source/shared/utility/array/any.js":
/*!********************************************!*\
  !*** ./source/shared/utility/array/any.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return any; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Wraps a value in an array. If the value is already an array, its items get spread into a fresh one.

function any(value) {
  return _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(value) ? [...value] : [value];
}

/***/ }),

/***/ "./source/shared/utility/array/async-map.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/array/async-map.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return asyncMap; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Executes an async function for each item in an array.
// When all async functions are settled, returns an array of results if all are fulfilled, but throws the array of results if any reject.
//G Callback takes same argument order as Array.map callback.
//! Can mutate the original array.
//! The thrown value will not be an Error object.
//G If an Error object is desired use a wrapper like .catch(MultipleErrors.throw);
//TODO The semantics of this might not be correct - why would a mixed list of fulfilled and rejected values be useful? The rejected promises are also all caught so basic throws aren't useful. Maybe explicitly filtering out fulfillments from the thrown array would be better? To fix this would require going in and ensuring all uses work with this change.

async function asyncMap(array, mapFunction) {
  // Validate.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(array);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(mapFunction); // Wait for every promise to settle.

  const promises = array.map((item, index, self) => mapFunction(item, index, self));
  const outcomes = await Promise.allSettled(promises); // Extract results and fulfillment.

  const fulfilledResults = [];
  const rejectedResults = [];
  let allFulfilled = true;

  for (const outcome of outcomes) {
    if (outcome.status === 'fulfilled') {
      fulfilledResults.push(outcome.value);
    } else {
      rejectedResults.push(outcome.reason);
      allFulfilled = false;
    }
  } // Return fulfilled results or throw rejected results.


  if (allFulfilled) {
    return fulfilledResults;
  }

  throw rejectedResults;
}

/***/ }),

/***/ "./source/shared/utility/array/dynamic-sort.js":
/*!*****************************************************!*\
  !*** ./source/shared/utility/array/dynamic-sort.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stable_sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stable-sort.js */ "./source/shared/utility/array/stable-sort.js");
//TODO add validation
//TODO consider replacing typechecks with a 'comparable' rule.

/* harmony default export */ __webpack_exports__["default"] = (function (list, ascending, prop) {
  // sorts a list in ascending or descending order by the numeric or string-converted value of its items or their properties if a prop is defined
  // ascending will flip the list into descending if false
  if (ascending) {
    ascending = 1;
  } else {
    ascending = -1;
  }

  let compare;

  if (typeof prop === 'string') {
    // if prop is defined, compare props
    if (list.every(item => typeof item[prop] === 'number' || typeof item[prop] === 'boolean')) {
      // if values are numbers or boolean, do number compare
      compare = function (a, b) {
        return (a[prop] - b[prop]) * ascending;
      };
    } else {
      // if values are strings, other, or mixed, do a string conversion and string compare
      compare = function (a, b) {
        // convert to strings
        const as = String(a[prop]);
        const bs = String(b[prop]); // string compare
        //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

        return as.localeCompare(bs, 'en', {
          sensitivity: 'base'
        }) * ascending;
      };
    }
  } else {
    // if no prop is defined, compare values
    //! this is the exact same as above, just without the property
    if (list.every(item => typeof item === 'number' || typeof item === 'boolean')) {
      compare = function (a, b) {
        return (a - b) * ascending;
      };
    }

    compare = function (a, b) {
      const as = String(a);
      const bs = String(b);
      return as.localeCompare(bs, 'en', {
        sensitivity: 'base'
      }) * ascending;
    };
  }

  return Object(_stable_sort_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, compare);
});

/***/ }),

/***/ "./source/shared/utility/array/index.js":
/*!**********************************************!*\
  !*** ./source/shared/utility/array/index.js ***!
  \**********************************************/
/*! exports provided: any, asyncMap, dynamicSort, one, stableSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _any_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./any.js */ "./source/shared/utility/array/any.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _any_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _async_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./async-map.js */ "./source/shared/utility/array/async-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncMap", function() { return _async_map_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _dynamic_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-sort.js */ "./source/shared/utility/array/dynamic-sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicSort", function() { return _dynamic_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _one_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./one.js */ "./source/shared/utility/array/one.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "one", function() { return _one_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _stable_sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stable-sort.js */ "./source/shared/utility/array/stable-sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return _stable_sort_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./source/shared/utility/array/one.js":
/*!********************************************!*\
  !*** ./source/shared/utility/array/one.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return one; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
// Returns the first item of an array, or the value otherwise.
//G If exactly one item is required, instead of undefined, use a validator.

function one(value) {
  return _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.test(value) ? value[0] : value;
}

/***/ }),

/***/ "./source/shared/utility/array/stable-sort.js":
/*!****************************************************!*\
  !*** ./source/shared/utility/array/stable-sort.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stableSort; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");
//L https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
//L https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
//L https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f

function stableSort(array, compare = (a, b) => {
  // low to high
  return a - b;
}) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(array);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(compare); // Create new array where the original index is preserved.

  const preservedArray = array.map((value, index) => ({
    value,
    index
  }));

  const stableCompare = (a, b) => {
    const order = compare(a.value, b.value); // If equal, sort based on original order, otherwise sort normally.

    return order === 0 ? a.index - b.index : order;
  };

  preservedArray.sort(stableCompare); // Overwrite original array with sorted values.

  for (let i = 0; i < array.length; i++) {
    array[i] = preservedArray[i].value;
  }

  return array;
}

/***/ }),

/***/ "./source/shared/utility/bool-catch.js":
/*!*********************************************!*\
  !*** ./source/shared/utility/bool-catch.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return boolCatch; });
function boolCatch(f) {
  try {
    f();
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "./source/shared/utility/clamp.js":
/*!****************************************!*\
  !*** ./source/shared/utility/clamp.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return clamp; });
/* harmony import */ var _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/rules/index.js */ "./source/shared/utility/validation/rules/index.js");

function clamp(input, min = -Infinity, max = Infinity) {
  // Throw if input is not defined, do not default to 0.
  // Throw on NaN, because whether NaN is 'within' the bounds is implementation dependant on whether x>y or !(x<=y) is used for comparison. The consumer should not be expected to know which.
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNaNNumber"].validate(input);
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNaNNumber"].validate(min);
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNaNNumber"].validate(max);
  if (min > max) throw new Error(`min: ${min} must not be greater than max: ${max}`);else if (input < min) return min;else if (input > max) return max;else return input;
}

/***/ }),

/***/ "./source/shared/utility/class-parts.js":
/*!**********************************************!*\
  !*** ./source/shared/utility/class-parts.js ***!
  \**********************************************/
/*! exports provided: default, initPrototype, initStatic, superPrototype, superStatic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClassParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPrototype", function() { return initPrototype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initStatic", function() { return initStatic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superPrototype", function() { return superPrototype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "superStatic", function() { return superStatic; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _validation_interface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation/interface.js */ "./source/shared/utility/validation/interface.js");
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");
//G Constructor size can be reduced if the class is simple enough by simply passing the entire options parameter to the intercept/instance parts and letting them do the destructuring. (Though this could duplicate validation, if two parts use the same option).
//R Using a baked-in .call() because its shorter and it reduces the risk of using the part without a target.
//R Decided against shorthands because the default syntax can just be used if a less-explicit/quicker definition is desired.
//R Augmenting a class with prototype and static parts does not count as a 'side-effect' as described in this explanation: //L https://stackoverflow.com/a/49776306



const wrappedPartInterface = new _validation_interface_js__WEBPACK_IMPORTED_MODULE_1__["SymbolInterface"]({
  marker: _validation_interface_js__WEBPACK_IMPORTED_MODULE_1__["SymbolInterface"].exists
}); // Marks the passed function as wrapped.

function mark(func) {
  _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(func, {
    [wrappedPartInterface.keys.marker]: true
  });
  return func;
} // Validate, wrap, and marks the passed part.


function wrapIntercept(interceptor) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].func.validate(interceptor);
  return mark((...args) => {
    return interceptor.call(null, ...args);
  });
}

function wrapInstance(initializer) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].func.validate(initializer);
  return mark((instance, ...args) => {
    _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].object.validate(instance);
    return initializer.call(instance, ...args);
  });
}

function wrapPrototype(initializer) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].func.validate(initializer);
  return mark(Class => {
    _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].object.validate(Class === null || Class === void 0 ? void 0 : Class.prototype);
    return initializer.call(Class.prototype);
  });
}

function wrapStatic(initializer) {
  _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].func.validate(initializer);
  return mark(Class => {
    _validation_index_js__WEBPACK_IMPORTED_MODULE_2__["rules"].object.validate(Class);
    return initializer.call(Class);
  });
}

class ClassParts {
  constructor({
    intercept = () => {},
    instance = () => {},
    prototype = () => {},
    static: s = () => {}
  } = {}) {
    // Wrapping & Validation
    const wrappedIntercept = wrappedPartInterface.test(intercept) ? intercept : wrapIntercept(intercept);
    const wrappedInstance = wrappedPartInterface.test(instance) ? instance : wrapInstance(instance);
    const wrappedPrototype = wrappedPartInterface.test(prototype) ? prototype : wrapPrototype(prototype);
    const wrappedStatic = wrappedPartInterface.test(s) ? s : wrapStatic(s); // Initialization

    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      intercept: wrappedIntercept,
      instance: wrappedInstance,
      prototype: wrappedPrototype,
      static: wrappedStatic
    });
  }

} // Immediately wraps and invokes the passed part.
//G Only useful for cases where a ClassParts instance has not been created.
//? Not sure if this is even really necessary.
//R Intercept and instance parts not included because they can be called directly from the constructor.

function initPrototype(Class, initializer) {
  return wrapPrototype(initializer)(Class);
}
function initStatic(Class, initializer) {
  return wrapStatic(initializer)(Class);
} // Replacements for the 'super' keyword inside prototype and static methods.
//R Intercept and instance parts not included because super is different in the constructor and should be called separately from these parts.

function superPrototype(Class) {
  return Object.getPrototypeOf(Class.prototype);
}
function superStatic(Class) {
  return Object.getPrototypeOf(Class);
} // EXAMPLE

/*
	import partsA from 'somewhere.js';
	import partsB from 'somewhereElse.js';

	class X {
		constructor(a, b, c) {
			partsB.intercept(a, c);
			const {x, y, z} = partsA.intercept(a, b, c);
			<some interception without parts>

			super(x, y);

			partsA.instance(this, z);
			partsB.instance(this, a, c);
			<some instance initialization without parts>
		}
	}

	partsA.prototype(X);
	partsB.prototype(X);
	initPrototype(X, () => {
		<some prototype initialization without parts>
	});

	partsA.static(X);
	partsB.static(X);
	initStatic(X, () => {
		<some static initialization without parts>
	});
*/

/***/ }),

/***/ "./source/shared/utility/combinations.js":
/*!***********************************************!*\
  !*** ./source/shared/utility/combinations.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return combinations; });
function combinations(optionsObject) {
  // takes an options object with a set of own properties whose value is an array of all possible values for that property
  // returns an array of objects with all combinations of those property values
  // ensure optionsObject is an object
  if (optionsObject === null || typeof optionsObject !== 'object') {
    throw new Error('Options object is not an object.');
  } // get all own property keys


  const keys = [];
  keys.push(...Object.getOwnPropertyNames(optionsObject));
  keys.push(...Object.getOwnPropertySymbols(optionsObject)); // ensure all own properties are iterable

  for (const key of keys) {
    if (!(optionsObject[key] instanceof Array)) {
      throw new Error(`Property options for ${key} is not iterable.`);
    }
  }

  const combinations = [];
  const combination = {}; // return empty array if no own keys

  if (keys.length <= 0) return combinations; // start with the first property

  const nest = function (index = 0) {
    const key = keys[index];
    const options = optionsObject[key]; // for each option

    for (const option of options) {
      // set the option
      combination[key] = option;

      if (index < keys.length - 1) {
        // move to the next property
        nest(index + 1);
      } else {
        // or if at last property, save the combination
        combinations.push({ ...combination
        });
      }
    }
  };

  nest();
  return combinations;
}

/***/ }),

/***/ "./source/shared/utility/constants.js":
/*!********************************************!*\
  !*** ./source/shared/utility/constants.js ***!
  \********************************************/
/*! exports provided: MAX_32_BIT_INTEGER, MAX_URL_LENGTH, JSON_HEADER, URL_HEADER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_32_BIT_INTEGER", function() { return MAX_32_BIT_INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_URL_LENGTH", function() { return MAX_URL_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON_HEADER", function() { return JSON_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_HEADER", function() { return URL_HEADER; });
const MAX_32_BIT_INTEGER = 2147483647;
const MAX_URL_LENGTH = 2047;
const JSON_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});
const URL_HEADER = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
});

/***/ }),

/***/ "./source/shared/utility/deferred.js":
/*!*******************************************!*\
  !*** ./source/shared/utility/deferred.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Deferred; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _time_wait_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time/wait.js */ "./source/shared/utility/time/wait.js");
// Custom promise that can be resolve, rejected, and cancelled outside its executor.
// May be called without an executor, upon which it will never resolve.


class Deferred extends Promise {
  constructor(executor = () => {}) {
    //R Closures are used here instead of instance variables because instance variables don't exist before super is called. This is required because this super call is being intercepted to tap into the resolve/reject calls.
    const closure = {
      isPending: true,
      // If closure.isCanceled is true, instance.resolve() / instance.reject() are prevented from actually resolving/rejecting the promise.
      //R Cancel is useful specifically for deferred promises to ensure that they cannot be fulfilled/rejected in the future.
      isCanceled: false
    };

    const interceptedExecutor = (resolve, reject) => {
      closure.resolve = resolved => {
        if (!closure.isCanceled) {
          closure.isPending = false;
          resolve(resolved);
        }
      };

      closure.reject = rejected => {
        if (!closure.isCanceled) {
          closure.isPending = false;
          reject(rejected);
        }
      };

      return executor(resolve, reject);
    };

    super(interceptedExecutor); // INSTANCE VARIABLES

    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].getter(this, {
      // Read-only access to closure.isPending and closure.isCanceled.
      get isPending() {
        return closure.isPending;
      },

      get isCanceled() {
        return closure.isCanceled;
      }

    });
    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      // Access to resolve/reject functions.
      resolve: closure.resolve,
      reject: closure.reject,

      // Ability to prevent promise from settling.
      cancel() {
        closure.isCanceled = true;
        return this;
      },

      // Ability to set automatic rejection upon timeout.
      timeout(duration, onTimeout = () => new Error('Deferred promise timed out.')) {
        Object(_time_wait_js__WEBPACK_IMPORTED_MODULE_1__["default"])(duration).then(() => {
          // Don't timeout if promise has settled.
          if (closure.isPending) {
            this.reject(onTimeout());
          }
        });
        return this;
      }

    });
  }

}

/***/ }),

/***/ "./source/shared/utility/enum.js":
/*!***************************************!*\
  !*** ./source/shared/utility/enum.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Enum; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _validation_rule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation/rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object/keys-of.js */ "./source/shared/utility/object/keys-of.js");
/* harmony import */ var _keyify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keyify.js */ "./source/shared/utility/keyify.js");




class Enum {
  constructor(...keys) {
    // Non-key values are keyified.
    // Symbol-keys stay intact.
    // Duplicate keys are squashed.
    for (const key of keys) {
      this[key] = Symbol();
    }

    Object.freeze(this);
  }

}
_object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(Enum, {
  instanceRule: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    validator(value) {
      if (!(value instanceof Enum)) {
        throw new Error(`Value is not an Enum.`);
      }
    }

  }),
  keyAttributes: {
    own: true,
    named: true,
    enumerable: true,
    inherited: false,
    symbol: false,
    nonEnumerable: false
  },

  //G Useful for validating Enum values in internal code.
  hasValue(e, value) {
    this.instanceRule.validate(e);
    const enumKeys = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(e, this.keyAttributes);
    return enumKeys.some(key => e[key] === value);
  },

  //G Useful for validating Enum keys from external data (JSON).
  //! Matching values in this method have no guarantee of originating from the enum. Ie. they can be fabricated.
  hasKey(e, value) {
    this.instanceRule.validate(e);
    const enumKeys = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(e, this.keyAttributes);
    const key = Object(_keyify_js__WEBPACK_IMPORTED_MODULE_3__["default"])(value);
    return enumKeys.includes(key);
  },

  // Converts a unique enum value to its key.
  //G Useful for preparing an enum value for external data (JSON).
  //! Will return a symbol if the enum value was keyed with one.
  valueToKey(e, value) {
    this.instanceRule.validate(e);
    const enumKeys = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(e, this.keyAttributes);
    const foundKey = enumKeys.find(key => e[key] === value);

    if (typeof foundKey !== 'symbol') {
      throw new Error('Enum does not contain the passed value.');
    }

    return foundKey;
  },

  getKeys(e) {
    this.instanceRule.validate(e);
    return Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(e, this.keyAttributes);
  }

});

/***/ }),

/***/ "./source/shared/utility/format-ms.js":
/*!********************************************!*\
  !*** ./source/shared/utility/format-ms.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//TODO Unused
//TODO Format hours, days, etc.
/* harmony default export */ __webpack_exports__["default"] = (function (ms) {
  // extract
  const minutes = Math.floor(ms / 60000);
  let seconds = Math.ceil(ms % 60000); // format

  seconds = ('0' + seconds).slice(-2); // returns ...0:00 format rounded up to the nearest second

  return minutes + ':' + seconds;
});

/***/ }),

/***/ "./source/shared/utility/index.js":
/*!****************************************!*\
  !*** ./source/shared/utility/index.js ***!
  \****************************************/
/*! exports provided: any, asyncMap, dynamicSort, one, stableSort, copyProperty, deepCompare, define, forKeysOf, getKeysOf, forOwnKeysOf, getOwnKeysOf, pick, capitalizeFirstCharacter, escapeRegExp, spaceIndented, tabIndented, replaceAll, setTimer, wait, appendQueryParameters, encodeProperties, decodeProperties, encodeList, decodeList, rules, flexTest, Interface, SymbolInterface, Rule, boolCatch, clamp, ClassParts, combinations, Deferred, Enum, formatMs, constants, keyCode, keyify, reference, repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array/index.js */ "./source/shared/utility/array/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncMap", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicSort", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicSort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "one", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["one"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"]; });

/* harmony import */ var _object_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/index.js */ "./source/shared/utility/object/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "copyProperty", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["copyProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["deepCompare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["define"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["forKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["getKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forOwnKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOwnKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["getOwnKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"]; });

/* harmony import */ var _string_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string/index.js */ "./source/shared/utility/string/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstCharacter", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["capitalizeFirstCharacter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["escapeRegExp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spaceIndented", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["spaceIndented"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tabIndented", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["tabIndented"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["replaceAll"]; });

/* harmony import */ var _time_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time/index.js */ "./source/shared/utility/time/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimer", function() { return _time_index_js__WEBPACK_IMPORTED_MODULE_3__["setTimer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return _time_index_js__WEBPACK_IMPORTED_MODULE_3__["wait"]; });

/* harmony import */ var _uri_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uri/index.js */ "./source/shared/utility/uri/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendQueryParameters", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["appendQueryParameters"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeProperties", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["encodeProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeProperties", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["decodeProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeList", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["encodeList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeList", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_4__["decodeList"]; });

/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rules", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["rules"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flexTest", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["flexTest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["SymbolInterface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_5__["Rule"]; });

/* harmony import */ var _bool_catch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bool-catch.js */ "./source/shared/utility/bool-catch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolCatch", function() { return _bool_catch_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _clamp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clamp.js */ "./source/shared/utility/clamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _clamp_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _class_parts_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./class-parts.js */ "./source/shared/utility/class-parts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassParts", function() { return _class_parts_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _combinations_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./combinations.js */ "./source/shared/utility/combinations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combinations", function() { return _combinations_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _deferred_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./deferred.js */ "./source/shared/utility/deferred.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Deferred", function() { return _deferred_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _enum_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./enum.js */ "./source/shared/utility/enum.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Enum", function() { return _enum_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _format_ms_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./format-ms.js */ "./source/shared/utility/format-ms.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatMs", function() { return _format_ms_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./constants.js */ "./source/shared/utility/constants.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "constants", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_13__; });
/* harmony import */ var _key_code_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./key-code.js */ "./source/shared/utility/key-code.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "keyCode", function() { return _key_code_js__WEBPACK_IMPORTED_MODULE_14__; });
/* harmony import */ var _keyify_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./keyify.js */ "./source/shared/utility/keyify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyify", function() { return _keyify_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./reference.js */ "./source/shared/utility/reference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return _reference_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./repeat.js */ "./source/shared/utility/repeat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return _repeat_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

// NESTED





 // LOCAL









 //TODO constants aren't exported, find an elegant way to do this.







/***/ }),

/***/ "./source/shared/utility/key-code.js":
/*!*******************************************!*\
  !*** ./source/shared/utility/key-code.js ***!
  \*******************************************/
/*! exports provided: characters, create, addTo, verify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "characters", function() { return characters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTo", function() { return addTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verify", function() { return verify; });
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");
/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repeat.js */ "./source/shared/utility/repeat.js");


const packRule = new _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["Rule"]({
  validator(value) {
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].object.validate(value);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(value.key);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(value.timestamp);
    _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(value.timeout);
  }

});
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function create(length = 10) {
  // Validate input.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(length); // Create.

  let key = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    key += characters.charAt(index);
  } // Validate output.


  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(key); // Return.

  return key;
}
const defaultTimeout = 300000; // 5 minutes

const tryLimit = 1000; // Adds a new unique key to the list, returns a pack {key, timeout, timestamp}

function addTo(list, timeout = defaultTimeout) {
  // Validate inputs.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(list);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeInteger.validate(timeout); // Create.

  const key = Object(_repeat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(() => create(), {
    until: key => !list.includes(key),
    countout: tryLimit,

    onCountout() {
      throw new Error(`Failed to add key to list, took over ${tryLimit} tries.`);
    }

  });
  const timestamp = Date.now();
  const pack = {
    key,
    timestamp,
    timeout: timestamp + timeout
  }; // Validate output.

  packRule.validate(pack); // Return.

  list.push(pack);
  return pack;
} // Checks if a list has a key. Cleans up timed-out keys.

function verify(list, key) {
  // Validate inputs.
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].array.validate(list);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].string.validate(key); // Iterate over list.

  for (let i = list.length - 1; i >= 0; i--) {
    const pack = list[i]; // Validate items in the list.

    packRule.validate(pack); // Determine if item has timed out.

    const fresh = pack.timeout > Date.now();

    if (pack.key === key) {
      // If key matches,
      if (fresh) {
        // and it hasn't timed out, remove the pack from the list and return it,
        return list.splice(i, 1)[0];
      } // else throw a timeout error.


      throw new Error('Key timed out.');
    } else if (!fresh) {
      // Remove non-matching packs if they've timed out.
      list.splice(i, 1);
    }
  } // If the key isn't found, throw an error.


  throw new Error('Invalid key.');
}

/***/ }),

/***/ "./source/shared/utility/keyify.js":
/*!*****************************************!*\
  !*** ./source/shared/utility/keyify.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return keyify; });
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/keys-of.js */ "./source/shared/utility/object/keys-of.js");
//G Casts any value as an object key, using the exact same method.

function keyify(value) {
  // Create a null object with only one property.
  const nullObject = Object.create(null);
  nullObject[value] = true; // Find that objects only key.

  const [keyifiedValue] = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_0__["getKeysOf"])(nullObject, {
    own: true,
    named: true,
    symbol: true,
    enumerable: true,
    nonEnumerable: false,
    inherited: false
  });
  return keyifiedValue;
}

/***/ }),

/***/ "./source/shared/utility/object/copy-property.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/object/copy-property.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return copyProperty; });
function copyProperty(key, from, to) {
  const descriptor = Object.getOwnPropertyDescriptor(key, from);
  Object.defineProperty(to, descriptor);
}

/***/ }),

/***/ "./source/shared/utility/object/deep-compare.js":
/*!******************************************************!*\
  !*** ./source/shared/utility/object/deep-compare.js ***!
  \******************************************************/
/*! exports provided: defaultOptions, default, compareUnorderedArrays */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deepCompare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareUnorderedArrays", function() { return compareUnorderedArrays; });
/* harmony import */ var _validation_rules_objects_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/rules/objects/index.js */ "./source/shared/utility/validation/rules/objects/index.js");
/* harmony import */ var _validation_rules_arrays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/rules/arrays.js */ "./source/shared/utility/validation/rules/arrays.js");



const compareDeeper = function (a, b, options) {
  const {
    depth
  } = options;
  return deepCompare(a, b, { ...options,
    depth: depth - 1
  });
};

const logDifferenceFunction = function (key, aValue, bValue) {
  console.log(`deepCompare property difference - ${key}: ${aValue}, ${bValue}`);
};

const defaultOptions = {
  // 0 based, will call depth+1 layers of comparisons
  depth: 1,
  // Used for custom comparisons (like un-ordered lists).
  //! Do not use a compare function that is or contains deepCompare, else falsy comparisons will run deepCompare twice per property.
  compareFunction: (a, b) => a === b,
  // Used to compare object keys with specific attributes (enumerable, symbol, inherited, etc.)
  // Used for custom key selection (inherited, enumerable, symbol, etc.)
  selectFunction: Object.keys,
  // true:  compare selected key-values on x to the same key-values anywhere on y.
  // false: compare selected key-values on x to the same key-values selected on y.
  anywhere: false,
  // true:  compares a against b.
  // false: compares a against b and b against a.
  //? What if subsetting needs to stop a specific depth?
  //R No need to specify dual-subset, because then a and b would be identical sets, which is equivalent to specifying no subset
  subset: false,
  // Compare result for values that are too deep.
  resultIfTooDeep: false,
  logDifference: false
};
function deepCompare(a, b, options = {}) {
  const {
    depth,
    compareFunction,
    selectFunction,
    anywhere,
    subset,
    resultIfTooDeep,
    logDifference
  } = { ...defaultOptions,
    ...options
  }; // limit to depth

  if (depth < 0) return resultIfTooDeep; // compare values

  if (compareFunction(a, b, options)) return true; // compare properties

  if (_validation_rules_objects_index_js__WEBPACK_IMPORTED_MODULE_0__["object"].test(a) && _validation_rules_objects_index_js__WEBPACK_IMPORTED_MODULE_0__["object"].test(b)) {
    let result = true; // selected keys

    const aSelectedKeys = selectFunction(a);
    const bSelectedKeys = selectFunction(b); // Compare all selected key-values of a to the same (any or selected) key-value of b.

    for (const key of aSelectedKeys) {
      const aValue = a[key];
      const bValue = anywhere || bSelectedKeys.includes(key) ? b[key] : undefined;

      if (!compareDeeper(aValue, bValue, options)) {
        result = false;
        if (logDifference) logDifferenceFunction(key, aValue, bValue);
      }
    }

    if (!subset) {
      // Compare remaining selected key-values of b to the same (any or non-existent) key-value of a.
      // Compare
      //R prevents shared selected keys from being compared twice
      for (const key of bSelectedKeys) {
        if (!aSelectedKeys.includes(key)) {
          // Exclude shared selected keys.
          // No need to check for the same selected key in a, they have been excluded.
          const aValue = anywhere ? a[key] : undefined;
          const bValue = b[key]; //! Value order is not flipped, this would cause the subset to go both ways.

          if (!compareDeeper(aValue, bValue, options)) {
            result = false;
            if (logDifference) logDifferenceFunction(key, aValue, bValue);
          }
        }
      }
    }

    return result;
  }

  return false;
} // COMPARE FUNCTIONS
//TODO This function doesn't appear to have been tested (specifically with subset).

function compareUnorderedArrays(a, b, options) {
  //R The 'anywhere' option isn't relevant here because arrays cannot inherit index properties. (Even with a replaced prototype, deleted 'hole', etc.)
  // If a and b are arrays:
  if (_validation_rules_arrays_js__WEBPACK_IMPORTED_MODULE_1__["array"].test(a) && _validation_rules_arrays_js__WEBPACK_IMPORTED_MODULE_1__["array"].test(b)) {
    // Match if:
    let result = true; // All items of a exist in b.

    if (a.some(item => !b.includes(item))) result = false; // And if not a subset comparison.

    if (!options.subset) {
      // All items of b exist in a.
      if (b.some(item => !a.includes(item))) result = false;
    }

    return result;
  } // Else use the default compare function.


  return defaultOptions.compareFunction(a, b, options);
} //L diagrams: https://www.figma.com/file/57kSw6SaPX3qJUSdzMpfJo/Object-Property-Locations-Comparison?node-id=0%3A1

/* differences from original
	renamed to 'deepCompare'
	deep option removed
	depth decreased by 1 (depth 0 now compares a, b; depth 1 compares a.foo, b.foo, and so on)
	top-level NaN equality removed
	renamed matchIfTooDeep to resultIfTooDeep
	renamed matchIfSubset to subset
	no-longer compares against b keys from anywhere by default, set anywhere: true, otherwise just compares against same selection from b
*/

/***/ }),

/***/ "./source/shared/utility/object/define.js":
/*!************************************************!*\
  !*** ./source/shared/utility/object/define.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* //! Duplicated functionality avoid circular dependencies:
	keys-of.js,
	../validation/rules/objects/object.js,
	../validation/rules/functions.js,
*/
const ownKeys = function (object) {
  //! Duplicated from keys-of.js
  return [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
}; // Define is a container for less verbose versions of Object.defineProperty()
//G if modifications are required, write a different define function

/* //R
	Initially thought it would be useful to have configurable (loose) constants and non-configurable variables. However:

	{writable: true, configurable: false} (permanent variable)
	These don't function as desired, because even when configurable is set to false, writable can be changed from true to false.
	//L https://stackoverflow.com/questions/52892105/why-configurablefalse-allows-to-change-writable-flag-but-doesnt-for-enumerable

	{writable: false, configurable: true} (loose constant)
	These don't really have a use-case and only existed to form a clean pair with permanent variables, and therefore have also been excluded.
*/


/* harmony default export */ __webpack_exports__["default"] = ({
  //G Same as object property assignment.
  //! Can be re-configured.
  writable(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: true,
        enumerable: true,
        configurable: true
      });
    }

    return target;
  },

  //G Intended for properties that will soon be re-defined as constants.
  //! Can be re-configured.
  nonWritable(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: false,
        enumerable: true,
        configurable: true
      });
    }

    return target;
  },

  // Guaranteed to be variable.
  //! Has an accessor-descriptor.
  //! Will cause Vue's (at least version 2) reactivity to break if used in a place where a normal property is expected.
  //R A data descriptor with {writable: true, configurable: false} is not used here because the ECMAScript standard still allows writable to be set to false, despite configurable being false.
  variable(target, properties) {
    for (const key of ownKeys(properties)) {
      let closureValue = properties[key];
      Object.defineProperty(target, key, {
        get() {
          return closureValue;
        },

        set(value) {
          closureValue = value;
        },

        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  // Guaranteed to be constant.
  constant(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: false,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  // Non-enumerable versions.
  hiddenWritable(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: true,
        enumerable: false,
        configurable: true
      });
    }

    return target;
  },

  hiddenNonWritable(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: false,
        enumerable: false,
        configurable: true
      });
    }

    return target;
  },

  hiddenVariable(target, properties) {
    for (const key of ownKeys(properties)) {
      let closureValue = properties[key];
      Object.defineProperty(target, key, {
        get() {
          return closureValue;
        },

        set(value) {
          closureValue = value;
        },

        enumerable: false,
        configurable: false
      });
    }

    return target;
  },

  hiddenConstant(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, {
        value: properties[key],
        writable: false,
        enumerable: false,
        configurable: false
      });
    }

    return target;
  },

  getter(target, properties) {
    for (const key of ownKeys(properties)) {
      // enforce getter, strip setter
      const {
        get
      } = Object.getOwnPropertyDescriptor(properties, key);
      if (typeof get !== 'function') throw new Error('getter property is missing a getter function');
      Object.defineProperty(target, key, {
        get,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  setter(target, properties) {
    for (const key of ownKeys(properties)) {
      // enforce setter, strip getter
      const {
        set
      } = Object.getOwnPropertyDescriptor(properties, key);
      if (typeof set !== 'function') throw new Error('setter property is missing a setter function');
      Object.defineProperty(target, key, {
        set,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  accessor(target, properties) {
    for (const key of ownKeys(properties)) {
      // enforce getter and setter
      const {
        get,
        set
      } = Object.getOwnPropertyDescriptor(properties, key);
      const noGetter = typeof get !== 'function';
      const noSetter = typeof set !== 'function';

      if (noGetter || noSetter) {
        throw new Error(`accessor property ${key} is missing a ${noGetter ? 'getter' : ''} ${noGetter && noSetter ? 'and' : ''} ${noSetter ? 'setter' : ''} function`);
      }

      Object.defineProperty(target, key, {
        get,
        set,
        enumerable: true,
        configurable: false
      });
    }

    return target;
  },

  identity(target, properties) {
    for (const key of ownKeys(properties)) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(properties, key));
    }

    return target;
  },

  validatedVariable(target, properties) {
    //? It doesn't seem possible to modify this variable's descriptor to writable: false, because its not a data property. Wouldn't this make it even more variable-like than a variable it self? Maybe consider this approach for a 'guaranteed variable'? Then consider renaming define.variable to define.property.
    //TODO Change 'value' to 'initialValue' as that is more clear.
    for (const key of ownKeys(properties)) {
      const config = properties[key]; //! Duplicated from ../validation/rules/objects/object.js

      if (config === null || !(typeof config === 'object' || typeof config === 'function')) {
        throw new Error('Config is not an object.');
      }

      const {
        validator
      } = config; //! Duplicated from ../validation/rules/functions.js

      if (typeof validator !== 'function') {
        throw new Error('Validator is not a function.');
      } // Create a closure value for the accessor.


      let closureValue = config.value; // Validate the initial value.
      //R Without the setter because these functions use 'define' semantics.

      validator(closureValue);
      Object.defineProperty(target, key, {
        get() {
          return closureValue;
        },

        set(value) {
          validator(value);
          closureValue = value;
        },

        enumerable: true,
        configurable: false
      });
    }

    return target;
  }

});

/***/ }),

/***/ "./source/shared/utility/object/index.js":
/*!***********************************************!*\
  !*** ./source/shared/utility/object/index.js ***!
  \***********************************************/
/*! exports provided: copyProperty, deepCompare, define, forKeysOf, getKeysOf, forOwnKeysOf, getOwnKeysOf, pick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _copy_property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./copy-property.js */ "./source/shared/utility/object/copy-property.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "copyProperty", function() { return _copy_property_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _deep_compare_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deep-compare.js */ "./source/shared/utility/object/deep-compare.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return _deep_compare_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./define.js */ "./source/shared/utility/object/define.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _define_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _keys_of_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keys-of.js */ "./source/shared/utility/object/keys-of.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_3__["forKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_3__["getKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forOwnKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_3__["forOwnKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOwnKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_3__["getOwnKeysOf"]; });

/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pick.js */ "./source/shared/utility/object/pick.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _pick_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./source/shared/utility/object/keys-of.js":
/*!*************************************************!*\
  !*** ./source/shared/utility/object/keys-of.js ***!
  \*************************************************/
/*! exports provided: forKeysOf, getKeysOf, forOwnKeysOf, getOwnKeysOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return forKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return getKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forOwnKeysOf", function() { return forOwnKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnKeysOf", function() { return getOwnKeysOf; });
/* harmony import */ var _validation_flex_test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/flex-test.js */ "./source/shared/utility/validation/flex-test.js");
/* harmony import */ var _validation_rules_objects_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/rules/objects/object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _validation_rules_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validation/rules/functions.js */ "./source/shared/utility/validation/rules/functions.js");
// forKeysOf calls a function for all keys of an object that match the specified attributes.
// getKeysOf returns an array of  all keys of an object that match the specified attributes and filter.
// Attributes default to own, named, enumerable keys. This is the same as Object.keys().
//R These functions have no short-circuiting and probably can be optimized, but objects shouldn't be having excessively large amounts of keys anyways.
//G To check if a key is in an object with a filter. Use getKeysOf(...args).includes(key);
//! Duplicated code in define.js to remove a circular dependency.
 // Importing directly instead of from ../validation/rules/index.js to avoid circular reference.



const rules = {
  object: _validation_rules_objects_object_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  func: _validation_rules_functions_js__WEBPACK_IMPORTED_MODULE_2__["func"]
};
function forKeysOf(object, optionsOrCallback = {}) {
  // OPTIONS / VALIDATION
  const options = typeof optionsOrCallback === 'function' ? {
    callback: optionsOrCallback
  } : optionsOrCallback;
  rules.object.validate(object);
  rules.object.validate(options);
  const {
    own = true,
    inherited = false,
    named = true,
    symbol = false,
    enumerable = true,
    nonEnumerable = false,
    callback = () => {}
  } = options;
  rules.func.validate(callback); // OWN / INHERITED

  const chain = [];
  if (own) chain.push(object);

  if (inherited) {
    let target = Object.getPrototypeOf(object);

    while (target !== null) {
      chain.push(target);
      target = Object.getPrototypeOf(target);
    }
  }

  const visitedKeys = [];

  for (const target of chain) {
    const targetKeys = []; // NAMED / SYMBOL

    if (named) targetKeys.push(...Object.getOwnPropertyNames(target));
    if (symbol) targetKeys.push(...Object.getOwnPropertySymbols(target));

    for (const targetKey of targetKeys) {
      // ENUMERABLE / NON-ENUMERABLE
      const isEnumerable = Object.prototype.propertyIsEnumerable.call(target, targetKey);
      const keyMatchesAttributes = enumerable && isEnumerable || nonEnumerable && !isEnumerable; // UNIQUE

      if (keyMatchesAttributes && !visitedKeys.includes(targetKey)) {
        // Don't iterate over the same key more than once.
        visitedKeys.push(targetKey); // Execute callback.

        callback(target, targetKey);
      }
    }
  }
}
function getKeysOf(object, optionsOrFilter = {}) {
  // OPTIONS / VALIDATION
  const options = typeof optionsOrFilter === 'function' ? {
    filter: optionsOrFilter
  } : optionsOrFilter;
  rules.object.validate(object);
  rules.object.validate(options);
  const {
    filter = (object, key) => true,
    ...rest
  } = options;
  rules.func.validate(filter); // ARRAY

  const keys = []; // undefined & null return empty array

  if (object == null) return keys; // FILTER

  forKeysOf(object, {
    callback(object, key) {
      if (Object(_validation_flex_test_js__WEBPACK_IMPORTED_MODULE_0__["default"])(filter, object, key)) {
        keys.push(key);
      }
    },

    ...rest
  });
  return keys;
}
const own = {
  own: true,
  named: true,
  symbol: true,
  enumerable: true,
  nonEnumerable: true,
  inherited: false
};
function forOwnKeysOf(object, callback) {
  return forKeysOf(object, { ...own,
    callback
  });
}
function getOwnKeysOf(object, filter) {
  return getKeysOf(object, { ...own,
    filter
  });
}

/***/ }),

/***/ "./source/shared/utility/object/pick.js":
/*!**********************************************!*\
  !*** ./source/shared/utility/object/pick.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pick; });
/* harmony import */ var _validation_rules_objects_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/rules/objects/index.js */ "./source/shared/utility/validation/rules/objects/index.js");
/* harmony import */ var _validation_rules_arrays_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/rules/arrays.js */ "./source/shared/utility/validation/rules/arrays.js");
// Copies all non-undefined properties of an object onto a new object.
//! Invokes getters.
//! Does not copy descriptors.
//! Copies inherited properties directly onto the new object.
//R Why not use destructuring?
//R It wouldn't be possible to store a preset list of properties to pick.


function pick(oldObject, keys) {
  _validation_rules_objects_index_js__WEBPACK_IMPORTED_MODULE_0__["object"].validate(oldObject);
  _validation_rules_arrays_js__WEBPACK_IMPORTED_MODULE_1__["array"].validate(keys); //R Keys can be anything, and will be converted to the proper format.

  const newObject = {};

  for (const key of keys) {
    const value = oldObject[key];
    if (value !== undefined) newObject[key] = value;
  }

  return newObject;
}

/***/ }),

/***/ "./source/shared/utility/reference.js":
/*!********************************************!*\
  !*** ./source/shared/utility/reference.js ***!
  \********************************************/
/*! exports provided: Reference, default, formReferences, extractValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formReferences", function() { return formReferences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractValues", function() { return extractValues; });
class Reference {
  constructor(value) {
    this.value = value;
    Object.seal(this);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (Reference);
function formReferences(values) {
  return values.map(item => item instanceof Reference ? item : new Reference(item));
}
function extractValues(references) {
  return references.map(item => item instanceof Reference ? item.value : item);
}

/***/ }),

/***/ "./source/shared/utility/repeat.js":
/*!*****************************************!*\
  !*** ./source/shared/utility/repeat.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation/index.js */ "./source/shared/utility/validation/index.js");

/**
 * Repeats a function until a condition is met or the call times-out or counts-out.
 * Guaranteed to call the function at least once.
 *
 * @param {Function} func               - Function to repeat.
 * @param {Object}   options
 * @param {Function} options.until      - Condition upon which the function will stop.
 * @param {number}   options.timeout    - Number of milliseconds the function may repeat for.
 * @param {number}   options.countout   - Number of times the function may execute.
 * @param {Function} options.onTimeout  - Called when repeat times out.
 * @param {Function} options.onCountout - Called when repeat counts out.
 */

function repeat(func, options = {}) {
  const {
    until = () => false,
    timeout = Infinity,
    countout = Infinity,
    onTimeout = () => {
      throw new Error('Repeat function call timed out.');
    },
    onCountout = () => {
      throw new Error('Repeat function call counted out.');
    }
  } = options;
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(func);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(until);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeNumber.validate(timeout); // >= 0

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].positiveNumber.validate(countout); // >= 1

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onTimeout);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onCountout);
  let result;
  let counter = 0;
  let time = Date.now();
  const timeLimit = time + timeout;
  const countLimit = Math.floor(countout);

  while (true) {
    result = func(result); //R Evaluating until(result) after function instead of as the while condition because it wouldn't make sense to evaluate 'until' before the function has run. This way the function is guaranteed to run at least once.

    if (until(result)) break; // Update

    time = Date.now();
    counter++;

    if (time >= timeLimit) {
      onTimeout(result);
      break;
    }

    if (counter >= countLimit) {
      onCountout(result);
      break;
    }
  }

  return result;
} // Async Variation


repeat.sync = repeat;

repeat.async = async function (func, options = {}) {
  const {
    until = () => false,
    // Condition upon which the function will stop.
    timeout = Infinity,
    // Number of milliseconds the function may repeat for.
    countout = Infinity,
    // Number of times the function may execute.
    onTimeout = () => {
      throw new Error('Repeat function call timed out.');
    },
    onCountout = () => {
      throw new Error('Repeat function call counted out.');
    }
  } = options;
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(func);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(until);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].nonNegativeNumber.validate(timeout); // >= 0

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].positiveNumber.validate(countout); // >= 1

  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onTimeout);
  _validation_index_js__WEBPACK_IMPORTED_MODULE_0__["rules"].func.validate(onCountout);
  let result;
  let counter = 0;
  let time = Date.now();
  const timeLimit = time + timeout;
  const countLimit = Math.floor(countout);

  while (true) {
    result = await func(result); //R Evaluating until(result) after function instead of as the while condition because it wouldn't make sense to evaluate 'until' before the function has run. This way the function is guaranteed to run at least once.

    if (await until(result)) break; // Update

    time = Date.now();
    counter++;

    if (time >= timeLimit) {
      await onTimeout(result);
      break;
    }

    if (counter >= countLimit) {
      await onCountout(result);
      break;
    }
  }

  return result;
};

/* harmony default export */ __webpack_exports__["default"] = (repeat);

/***/ }),

/***/ "./source/shared/utility/string/capitalize-first-character.js":
/*!********************************************************************!*\
  !*** ./source/shared/utility/string/capitalize-first-character.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return capitalizeFirstCharacter; });
function capitalizeFirstCharacter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/***/ }),

/***/ "./source/shared/utility/string/escape-reg-exp.js":
/*!********************************************************!*\
  !*** ./source/shared/utility/string/escape-reg-exp.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return escapeRegExp; });
function escapeRegExp(string) {
  //L from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/***/ }),

/***/ "./source/shared/utility/string/indented-template.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/string/indented-template.js ***!
  \***********************************************************/
/*! exports provided: tabIndented, spaceIndented */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabIndented", function() { return tabIndented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spaceIndented", function() { return spaceIndented; });
//G VS Code may remove empty whitespace lines inside string templates. This will set the base indentation to 0. To avoid this, un-check the 'trim auto whitespace' setting.
const tabIndented = (strings, ...expressions) => indented(strings, expressions, '	');
const spaceIndented = (strings, ...expressions) => indented(strings, expressions, ' ');

function indented(stringsFrozen, expressions, indentCharacter) {
  let strings = [...stringsFrozen];
  const firstIndex = 0;
  const lastIndex = strings.length - 1; // If the template ends with a new-line character followed by zero or many indent characters, remove those characters.

  strings[lastIndex] = strings[lastIndex].replace(new RegExp(`\n${indentCharacter}*$`, 'u'), ''); // Match indents.

  const indents = [];

  for (const string of strings) {
    /* Matches 0 or many indent characters.
    	- Following a new-line.
    	- Preceding a non-indent, non-new-line character.
    		//R Ignores 'indent-only' lines.
    			//R Don't follow start (^) or precede end ($), because otherwise indentation characters in single line strings and strings between variables will get matched.
    */
    const matches = string.match(new RegExp(`(?<=\n)(${indentCharacter}*)(?=([^${indentCharacter}\n]|$))`, 'gu'));
    if (matches !== null) indents.push(...matches);
  } // Get the smallest indent amount.


  let smallestIndentAmount = Math.min(...indents.map(indent => indent.length));
  if (smallestIndentAmount === Infinity) smallestIndentAmount = 0; // Remove smallest indent from all lines.

  /* Matches the smallest indent.
  	- Following a new line.
  	//! Not required to precede a non-indent or non-new-line character. This ensures 'excessively-indented' and 'indent-only' lines can be matched and only have part of their indentation removed.
  */

  strings = strings.map(string => string.replace(new RegExp(`(?<=\n)(${indentCharacter}{${smallestIndentAmount}})`, 'gu'), ''));
  /* Remove leading newline if it exists.
  	//R Must happen after removing indentation, because it is required to identify the first line's indentation.
  	//R Must happen before construction, because otherwise a newline could be removed from a leading expression.
  */

  strings[firstIndex] = strings[firstIndex].replace(/^\n/u, '');
  /* Construct template.
  	//R Must happen after the indentation is removed, because expressions should be considered as using the 'adjusted' indentation.
  */

  let template = '';

  for (let i = 0; i < strings.length; i++) {
    template += strings[i];
    if (expressions[i] !== undefined) template += expressions[i];
  }

  return template;
}

/***/ }),

/***/ "./source/shared/utility/string/index.js":
/*!***********************************************!*\
  !*** ./source/shared/utility/string/index.js ***!
  \***********************************************/
/*! exports provided: capitalizeFirstCharacter, escapeRegExp, spaceIndented, tabIndented, replaceAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capitalize_first_character_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize-first-character.js */ "./source/shared/utility/string/capitalize-first-character.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstCharacter", function() { return _capitalize_first_character_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _escape_reg_exp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./escape-reg-exp.js */ "./source/shared/utility/string/escape-reg-exp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return _escape_reg_exp_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _indented_template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indented-template.js */ "./source/shared/utility/string/indented-template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "spaceIndented", function() { return _indented_template_js__WEBPACK_IMPORTED_MODULE_2__["spaceIndented"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tabIndented", function() { return _indented_template_js__WEBPACK_IMPORTED_MODULE_2__["tabIndented"]; });

/* harmony import */ var _replace_all_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./replace-all.js */ "./source/shared/utility/string/replace-all.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _replace_all_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./source/shared/utility/string/replace-all.js":
/*!*****************************************************!*\
  !*** ./source/shared/utility/string/replace-all.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return replaceAll; });
function replaceAll(input, search, replace) {
  return input.split(search).join(replace);
}

/***/ }),

/***/ "./source/shared/utility/time/index.js":
/*!*********************************************!*\
  !*** ./source/shared/utility/time/index.js ***!
  \*********************************************/
/*! exports provided: setTimer, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _set_timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-timer.js */ "./source/shared/utility/time/set-timer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimer", function() { return _set_timer_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _wait_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wait.js */ "./source/shared/utility/time/wait.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return _wait_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ }),

/***/ "./source/shared/utility/time/set-timer.js":
/*!*************************************************!*\
  !*** ./source/shared/utility/time/set-timer.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setTimer; });
/* harmony import */ var _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/rules/index.js */ "./source/shared/utility/validation/rules/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./source/shared/utility/constants.js");
/* //! Differences from setTimeout:
	Delay comes before callback.
	Doesn't accept negative numbers or NaN for the delay.
	Doesn't accept callback arguments. //G Wrap the callback in an arrow function instead.
*/


/**
 * Executes a function after a delay time.
 * Supports times longer than 2147483647 milliseconds, unlike setTimeout.
 *
 * @param  {number}   delay - Delay in milliseconds, or Infinity.
 * @param  {function} callback  - Function executed after delay.
 *
 * @returns {function}        Function that clears the timer.
 */

function setTimer(delay, callback) {
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["nonNegativeNumber"].validate(delay);
  _validation_rules_index_js__WEBPACK_IMPORTED_MODULE_0__["func"].validate(callback);

  if (delay === 0) {
    // Execute callback immediately.
    callback(); // Return empty function, as an instantaneous timeout cannot be cleared.

    return () => {};
  }

  if (delay === Infinity) {
    // Never execute the function.
    // Return empty function, as an infinite timeout is effectively cleared already.
    return () => {};
  } // Remainder


  const remainder = delay % _constants_js__WEBPACK_IMPORTED_MODULE_1__["MAX_32_BIT_INTEGER"]; // Quotient

  let overflowChunkCount = BigInt((delay - remainder) / _constants_js__WEBPACK_IMPORTED_MODULE_1__["MAX_32_BIT_INTEGER"]); // Current timeout ID.

  let timeoutId;

  (function nestTimeout() {
    if (overflowChunkCount > 0) {
      // If there are chunks of overflowed time left:
      // Set a timeout for the full chunk of time.
      timeoutId = setTimeout(() => {
        // Upon finishing:
        // Mark the time chunk as 'finished' by reducing the count.
        overflowChunkCount--; // Evaluate the time state again.

        nestTimeout();
      }, _constants_js__WEBPACK_IMPORTED_MODULE_1__["MAX_32_BIT_INTEGER"]);
    } else {
      // Else, there are no chunks of overflowed time left:
      // Set a timeout for the remaining time.
      timeoutId = setTimeout(callback, remainder);
    }
  })();

  return function clear() {
    clearTimeout(timeoutId);
  };
}

/***/ }),

/***/ "./source/shared/utility/time/wait.js":
/*!********************************************!*\
  !*** ./source/shared/utility/time/wait.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return wait; });
/* harmony import */ var _set_timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-timer.js */ "./source/shared/utility/time/set-timer.js");
//G Used for basic async waiting.
//! Cannot be canceled.

/**
 * Asynchronously waits a period of time, then resolves.
 *
 * @param {number} duration - Time to wait, in milliseconds.
 *
 * @returns {Promise} Promise that resolves after wait duration.
 */

async function wait(duration) {
  return new Promise(resolve => {
    Object(_set_timer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(duration, () => {
      resolve();
    });
  });
}

/***/ }),

/***/ "./source/shared/utility/uri/append-query-parameters.js":
/*!**************************************************************!*\
  !*** ./source/shared/utility/uri/append-query-parameters.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendQueryParameters; });
/* harmony import */ var _validation_rules_strings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/rules/strings.js */ "./source/shared/utility/validation/rules/strings.js");
// Appends more query parameters to a URL that may or may not already have query parameters.
//TODO Consider fully validating.

function appendQueryParameters(url, ...queryParameters) {
  _validation_rules_strings_js__WEBPACK_IMPORTED_MODULE_0__["string"].validate(url);

  for (const queryParameter of queryParameters) {
    _validation_rules_strings_js__WEBPACK_IMPORTED_MODULE_0__["string"].validate(queryParameter);
  }

  const appendCharacter = url.includes('?') ? '&' : '?';
  return `${url}${appendCharacter}${queryParameters.join('&')}`;
}

/***/ }),

/***/ "./source/shared/utility/uri/decode-list.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/uri/decode-list.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return decodeList; });
/* harmony import */ var _decode_properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decode-properties.js */ "./source/shared/utility/uri/decode-properties.js");
/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/index.js */ "./source/shared/utility/validation/index.js");


function decodeList(encoded) {
  // decodes a list of encoded objects with '-i' suffixed property keys
  //! any key not matching the format will be discarded
  const indexed = Object(_decode_properties_js__WEBPACK_IMPORTED_MODULE_0__["default"])(encoded);
  const list = [];
  const indexedKeys = Object.keys(indexed);

  for (let i = 0; i < indexedKeys.length; i++) {
    // validate delimiter
    const delimiterIndex = indexedKeys[i].lastIndexOf('-');

    if (delimiterIndex < 0) {
      break;
    } // validate index


    const objectIndex = parseInt(indexedKeys[i].slice(delimiterIndex + 1)); // handles multiple digits & no digits properly

    if (!_validation_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].integer.test(objectIndex)) {
      break;
    } // get the real key


    const key = indexedKeys[i].slice(0, delimiterIndex);

    if (_validation_index_js__WEBPACK_IMPORTED_MODULE_1__["rules"].object.test(list[objectIndex])) {
      // otherwise add the prop to the existing object
      list[objectIndex][key] = indexed[indexedKeys[i]];
    } else {
      // if the obj doesn't exist yet, add it with the prop
      list[objectIndex] = {
        [key]: indexed[indexedKeys[i]]
      };
    }
  }

  return list;
}

/***/ }),

/***/ "./source/shared/utility/uri/decode-properties.js":
/*!********************************************************!*\
  !*** ./source/shared/utility/uri/decode-properties.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return decodeProperties; });
// Decodes every value as a string.
function decodeProperties(encodedString) {
  const keyValuePairs = encodedString.split('&');
  const object = {};
  keyValuePairs.forEach(keyValuePair => {
    const [key, value] = keyValuePair.split('=');
    object[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return object;
}

/***/ }),

/***/ "./source/shared/utility/uri/encode-list.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/uri/encode-list.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return encodeList; });
/* harmony import */ var _array_any_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array/any.js */ "./source/shared/utility/array/any.js");
/* harmony import */ var _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encode-properties.js */ "./source/shared/utility/uri/encode-properties.js");


function encodeList(list) {
  // return a string of uri encoded key-value pairs for each property of each item, their keys suffixed with '-[index]'
  //! not called automatically by request() because its useful to see when a encodeList exists as it needs to be unpacked on the other end
  const indexed = {};
  Object(_array_any_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list).forEach((object, index) => {
    Object.keys(object).forEach(key => {
      indexed[`${key}-${index}`] = object[key];
    });
  });
  return Object(_encode_properties_js__WEBPACK_IMPORTED_MODULE_1__["default"])(indexed);
}

/***/ }),

/***/ "./source/shared/utility/uri/encode-properties.js":
/*!********************************************************!*\
  !*** ./source/shared/utility/uri/encode-properties.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return encodeProperties; });
// Encodes values as strings, objects as [object Object] and arrays as comma delimited strings.
function encodeProperties(object) {
  return Object.keys(object).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join('&');
}

/***/ }),

/***/ "./source/shared/utility/uri/index.js":
/*!********************************************!*\
  !*** ./source/shared/utility/uri/index.js ***!
  \********************************************/
/*! exports provided: appendQueryParameters, encodeProperties, decodeProperties, encodeList, decodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _append_query_parameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./append-query-parameters.js */ "./source/shared/utility/uri/append-query-parameters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendQueryParameters", function() { return _append_query_parameters_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encode-properties.js */ "./source/shared/utility/uri/encode-properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeProperties", function() { return _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _decode_properties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decode-properties.js */ "./source/shared/utility/uri/decode-properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeProperties", function() { return _decode_properties_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _encode_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./encode-list.js */ "./source/shared/utility/uri/encode-list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeList", function() { return _encode_list_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _decode_list_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./decode-list.js */ "./source/shared/utility/uri/decode-list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeList", function() { return _decode_list_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./source/shared/utility/validation/flex-test.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/validation/flex-test.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return flexTest; });
// Executes tests that take either 1 (value) argument or 2 (object, key) arguments with either 1 or 2 arguments.
// If the test takes 2 arguments but 2 arguments weren't passed, the first argument is simulated as an object property.
//R Using (length === 2 else) rather than (length === 1 else) because otherwise if no arguments are passed undefined[undefined] won't work.
//TODO consider a one-time operation rather than a runtime function
function flexTest(test, ...args) {
  if (test.length === 0) {
    // Pass no arguments if test takes none.
    return test();
  } else if (test.length === 1) {
    let value;

    if (args.length === 0) {
      value = undefined;
    } else if (args.length === 1) {
      value = args[0];
    } else if (args.length === 2) {
      value = args[0][args[1]];
    } else {
      throw new Error(`${args.length} arguments not supported for tests with 1 parameter.`);
    }

    return test(value);
  } else if (test.length === 2) {
    let object;
    let key;

    if (args.length === 2) {
      [object, key] = args;
    } else {
      throw new Error(`${args.length} arguments not supported for tests with 2 parameters.`);
    }

    return test(object, key);
    /* //OLD Value to property simulation.
    	object = Object.create(null);
    	key = Symbol('simulated key');
    	object[key] = value;
    */
  }

  throw new Error(`Tests with ${test.length} arguments are not supported.`);
}

/***/ }),

/***/ "./source/shared/utility/validation/index.js":
/*!***************************************************!*\
  !*** ./source/shared/utility/validation/index.js ***!
  \***************************************************/
/*! exports provided: rules, flexTest, Interface, SymbolInterface, Rule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rules_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules/index.js */ "./source/shared/utility/validation/rules/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "rules", function() { return _rules_index_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _flex_test_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flex-test.js */ "./source/shared/utility/validation/flex-test.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flexTest", function() { return _flex_test_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface.js */ "./source/shared/utility/validation/interface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _interface_js__WEBPACK_IMPORTED_MODULE_2__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return _interface_js__WEBPACK_IMPORTED_MODULE_2__["SymbolInterface"]; });

/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return _rule_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "./source/shared/utility/validation/interface.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/validation/interface.js ***!
  \*******************************************************/
/*! exports provided: Interface, SymbolInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return Interface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return SymbolInterface; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../object/keys-of.js */ "./source/shared/utility/object/keys-of.js");
/* harmony import */ var _flex_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flex-test.js */ "./source/shared/utility/validation/flex-test.js");
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _rules_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rules/index.js */ "./source/shared/utility/validation/rules/index.js");






class VirtualInterface extends _rule_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(packs, options = {}) {
    // Throw if a validator option is passed.
    if ('validator' in options) {
      throw new Error('Interface options cannot include a validator, as it will be overwritten with a generated validator for interfaces.');
    }

    const keys = {};
    const tests = {};

    for (const [key, subKey, test] of packs) {
      _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["func"].validate(test); // Store subKeys on instance under their original key so that they can be used for implementations: {[interface.keys.<key>]: implementation}

      keys[key] = subKey; // Freeze the test length property so that it can be relied upon to determine if the [value] or [object, key] parameters should be passed.

      Object.defineProperty(test, 'length', {
        value: test.length,
        writable: false,
        enumerable: false,
        configurable: false
      }); // Store tests on instance, also under their original key.
      // Convert tests to use two arguments.
      //R Converting the tests here preserves the benefit of being able to pass single-argument value tests while also knowing that the stored tests always take two arguments.

      tests[key] = (o, k) => {
        return Object(_flex_test_js__WEBPACK_IMPORTED_MODULE_2__["default"])(test, o, k);
      };
    }

    Object.freeze(keys);
    Object.freeze(tests); // Create an pass validator to Rule constructor.

    super({ // Pass other rule options to Rule.
      ...options,

      // Use a custom validator for interfaces.
      validator(object) {
        _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["object"].validate(object);
        Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(this.tests, (tests, key) => {
          const test = this.tests[key];
          const subKey = this.keys[key];

          if (!test(object, subKey)) {
            throw new Error(`Object does not fully implement interface. Object: ${JSON.stringify(object)}, Key: ${key}, SubKey: ${subKey}`);
          }
        });
        /* //OLD
        	//R Unnecessarily complicated for a feature that can probably just be permanently set to 'validate'.
        	if (precision === 'validate') {
        		// Validate all keys on object.
        		return testKeys.every((key) => (
        			validate(key)
        		));
        	} else if (precision === 'all') {
        		// All keys are present (or valid).
        		return testKeys.every((key) => (
        			exists(object, key) ||
        			validate(key)
        		));
        	} else if (precision === 'any') {
        		// Any key is present (or valid).
        		return testKeys.some((key) => (
        			exists(object, key) ||
        			validate(key)
        		));
        	} else {
        		throw new Error(`Precision argument must be 'validate', 'all', or 'any'`);
        	}
        */
      }

    });
    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      keys,
      tests
    });
  } // Minimal test to ensure interface property exists in object.


  static exists(object, key) {
    return key in object;
  }

}
/*
	Interface and SymbolInterface take a single tests object.

	This tests object should have keys as the interface property names and values as the validator functions for those interface properties.

	Tests have two signatures: (value) and (object, key).
	When they are stored on the interface.tests object, both signatures will be wrapped in a function with a (object, key) signature.

	//G Use tests with the (object, key) signature when the getter for object[key] should not be invoked during validation of the interface.
	//! Be aware that default and rest parameters are not counted.
	//G Manually re-define the validator.length property if a specific behavior is desired.
	//! The validator.length property will be set to non-configurable when it is passed in.

*/


class Interface extends VirtualInterface {
  // Interface accepts both named and symbol keys.
  // The same keys must be used for implementations.
  constructor(properties, options) {
    _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["object"].validate(properties);
    const packs = [];
    Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(properties, (properties, key) => {
      const subKey = key;
      const test = properties[key];
      packs.push([key, subKey, test]);
    });
    super(packs, options);
  }

}
class SymbolInterface extends VirtualInterface {
  // SymbolInterface creates substitute symbols for ALL interface keys.
  // Implementations must use the substituted symbols as the property keys.
  // This prevents name collision on implementations.
  constructor(properties, options) {
    _rules_index_js__WEBPACK_IMPORTED_MODULE_4__["object"].validate(properties);
    const packs = [];
    Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["forOwnKeysOf"])(properties, (properties, key) => {
      const subKey = Symbol(key); // Create a symbol subKey instead.

      const test = properties[key];
      packs.push([key, subKey, test]);
    });
    super(packs, options);
  }

}

/***/ }),

/***/ "./source/shared/utility/validation/rule.js":
/*!**************************************************!*\
  !*** ./source/shared/utility/validation/rule.js ***!
  \**************************************************/
/*! exports provided: Rule, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/define.js */ "./source/shared/utility/object/define.js");
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reference.js */ "./source/shared/utility/reference.js");
/* harmony import */ var _bool_catch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bool-catch.js */ "./source/shared/utility/bool-catch.js");
//TODO consider changing the method name 'validateCast' it is not intuitive that this is the main casting function and that it returns a value. That or make validate return the passed values.
//TODO consider adding the cast modifier onto the end of the validate/test functions like: rule.validate.cast() and rule.test.cast()
//TODO ensure that validate and validateCast both return values
//TODO rename to .validate(), .test(), .cast(), .testCast()
//TODO consider duplicating define here, so that define can use rules
//TODO consider allowing a shorthand parameter, where a single function argument defaults to the validator.



class Rule {
  constructor({
    /* //G
    	Should do nothing on success, throw on failure.
    	Should have one or many sequential and/or parallel conditions.
    	May be sync or async.
    			If using other rules' validators, use validate() and pass the same arguments.
    */
    validator = function () {
      throw new Error('A validator has not been created for this rule.');
    },

    /* //G
    	Receives Reference instances as its arguments.
    	Should modify Reference instance 'value' property on success, throw on failure.
    	Should have one or many sequential mutations.
    	May be sync or async.
    	//! Caster does not implicitly exclude redundant casts. Ie, for a symbol rule, if x is already a symbol, the caster for the symbol will still execute and throw a type error as symbols cannot be converted to strings. Must include a redundancy check for rules that require it.
    			If using other rules' casters, use validateCast() and pass the same References.
    	Do not pass reference.value and do not set any reference.value as the result of a validateCast(), the nested caster will mutate the passed arguments directly.
    			//! If the References are mutated or passed incorrectly validateCast() may not have the correct value to validate could throw incorrect errors for upstream values: '4' validateCasted to an odd number would fail as 'not a number' instead of 'not odd'.
    */
    caster = function () {},
    //R Indexed reasons, placeholder reasons, etc. should not be used, its too complicated. Just create sub-rules for each failure type or store custom, identifiable errors directly on the rule by including more option properties.
    ...rest
  }) {
    const errors = [];
    if (typeof validator !== 'function') errors.push('validator is not a function');
    if (typeof caster !== 'function') errors.push('caster is not a function');
    if (errors.length > 0) throw new Error(errors.join(' and ')); // store

    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].identity(this, rest);
    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
      validator,
      caster
    }); // false when x.constructor.name === 'AsyncFunction'

    const validatorIsSynchronous = this.validator.constructor.name === 'Function';
    const casterIsSynchronous = this.caster.constructor.name === 'Function'; // Validate/test functions are bound to the instance because they may be copied to another object.

    if (validatorIsSynchronous) {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validate: function validate(...args) {
          this.validator(...args);
          return args;
        }.bind(this),
        test: function test(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.validate(...args));
        }.bind(this)
      });
    } else {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validate: async function validate(...args) {
          await this.validator(...args);
          return args;
        }.bind(this),
        test: async function test(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(async () => this.validate(...args));
        }.bind(this)
      });
    }

    if (validatorIsSynchronous && casterIsSynchronous) {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validateCast: function validateCast(...args) {
          // If call is the entry-point, will convert values to reference-values. If call is nested, nothing will change.
          const references = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["formReferences"])(args);

          try {
            this.caster(...references);
          } catch (e) {} // Suppress casting errors, just get as far as possible.


          const values = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["extractValues"])(references);
          this.validate(...values);
          return values;
        }.bind(this),
        testCast: function testCast(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.validateCast(...args));
        }.bind(this)
      });
    } else {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validateCast: async function validateCast(...args) {
          const references = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["formReferences"])(args);

          try {
            await this.caster(...references);
          } catch (e) {}

          const values = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["extractValues"])(references);
          await this.validate(...values);
          return values;
        }.bind(this),
        testCast: async function testCast(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(async () => this.validateCast(...args));
        }.bind(this)
      });
    }
  }

}
/* harmony default export */ __webpack_exports__["default"] = (Rule);

/***/ }),

/***/ "./source/shared/utility/validation/rules/arrays.js":
/*!**********************************************************!*\
  !*** ./source/shared/utility/validation/rules/arrays.js ***!
  \**********************************************************/
/*! exports provided: array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

const array = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  //L Why not instanceof? - http://web.mit.edu/jwalden/www/isArray.html
  //TODO Doesn't this then apply to all classes? Should all classes use validators like this or just use instanceof?
  validator(value) {
    if (!Array.isArray(value)) {
      throw new Error('Value is not an array.');
    }
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/boolean.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/validation/rules/boolean.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'boolean') {
      throw new Error('Value is not a boolean.');
    }
  },

  caster(reference) {
    reference.value = Boolean(reference.value);
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/constructor.js":
/*!***************************************************************!*\
  !*** ./source/shared/utility/validation/rules/constructor.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    try {
      class Test extends value {}
    } catch (e) {
      throw new Error('Value is not a constructor.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/functions.js":
/*!*************************************************************!*\
  !*** ./source/shared/utility/validation/rules/functions.js ***!
  \*************************************************************/
/*! exports provided: func */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "func", function() { return func; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
//L Doesn't seem proper to distinguish async vs sync functions: https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async, async operations can handle sync function returns
// sync func
// async func

const func = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'function') throw new Error('Value is not a function.');
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/http/body.js":
/*!*************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/body.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../strings.js */ "./source/shared/utility/validation/rules/strings.js");


/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (!_strings_js__WEBPACK_IMPORTED_MODULE_1__["string"].test(value)) {
      throw new Error('Request body is not a string.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/http/headers.js":
/*!****************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/headers.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _objects_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../strings.js */ "./source/shared/utility/validation/rules/strings.js");
/* //TODO This isn't 100% complete:
	Are non-enumerable / symbol properties used?
	Are all strings compatible 'ByteString's?
*/
//R Not using the native Header interface here because it doesn't validate header names or values.



/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    _objects_object_js__WEBPACK_IMPORTED_MODULE_1__["default"].validate(value);

    for (const key in value) {
      const headerValue = value[key]; // Header value must be a string.

      _strings_js__WEBPACK_IMPORTED_MODULE_2__["string"].validate(headerValue); // Header name must not be forbidden.
      //L Forbidden header names: https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name

      if (key.startsWith('Proxy-')) {
        throw new Error(`The HTTP header ${key} is invalid because it starts with 'Proxy-'`);
      }

      if (key.startsWith('Sec-')) {
        throw new Error(`The HTTP header ${key} is invalid because it starts with 'Sec-'`);
      }

      for (const forbiddenName of ['Accept-Charset', 'Accept-Encoding', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Connection', 'Content-Length', 'Cookie', 'Cookie2', 'Date', 'DNT', 'Expect', 'Feature-Policy', 'Host', 'Keep-Alive', 'Origin', 'Referer', 'TE', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via']) {
        if (key === forbiddenName) {
          throw new Error(`The HTTP header ${key} is forbidden.`);
        }
      }
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/http/index.js":
/*!**************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/index.js ***!
  \**************************************************************/
/*! exports provided: body, headers, queryParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body.js */ "./source/shared/utility/validation/rules/http/body.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "body", function() { return _body_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _headers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./headers.js */ "./source/shared/utility/validation/rules/http/headers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headers", function() { return _headers_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _query_parameters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query-parameters.js */ "./source/shared/utility/validation/rules/http/query-parameters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryParameters", function() { return _query_parameters_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./source/shared/utility/validation/rules/http/query-parameters.js":
/*!*************************************************************************!*\
  !*** ./source/shared/utility/validation/rules/http/query-parameters.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _objects_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/index.js */ "./source/shared/utility/validation/rules/objects/index.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../strings.js */ "./source/shared/utility/validation/rules/strings.js");
/* harmony import */ var _numbers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../numbers.js */ "./source/shared/utility/validation/rules/numbers.js");
/* harmony import */ var _boolean_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../boolean.js */ "./source/shared/utility/validation/rules/boolean.js");
/* harmony import */ var _object_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../object/index.js */ "./source/shared/utility/object/index.js");






/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (!_objects_index_js__WEBPACK_IMPORTED_MODULE_1__["object"].test(value)) {
      throw new Error('Query parameters is not an object.');
    }

    Object(_object_index_js__WEBPACK_IMPORTED_MODULE_5__["forKeysOf"])(value, {
      own: true,
      named: true,
      enumerable: true,
      inherited: false,
      symbol: false,
      nonEnumerable: false,

      callback(obj, key) {
        const parameterValue = obj[key];

        if (!(_strings_js__WEBPACK_IMPORTED_MODULE_2__["string"].test(parameterValue) || _numbers_js__WEBPACK_IMPORTED_MODULE_3__["number"].test(parameterValue) || _boolean_js__WEBPACK_IMPORTED_MODULE_4__["default"].test(parameterValue))) {
          throw new Error(`Query parameter '${key}' is not a string, number, or boolean.`);
        }
      }

    });
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/index.js":
/*!*********************************************************!*\
  !*** ./source/shared/utility/validation/rules/index.js ***!
  \*********************************************************/
/*! exports provided: body, headers, queryParameters, object, emptyObject, populatedObject, array, boolean, constructor, func, key, number, nonNaNNumber, integer, nonNegativeNumber, nonPositiveNumber, positiveNumber, negativeNumber, nonNegativeInteger, nonPositiveInteger, positiveInteger, negativeInteger, unitInterval, string, trimmedString, visibleString, invisibleString, populatedString, symbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _http_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http/index.js */ "./source/shared/utility/validation/rules/http/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "body", function() { return _http_index_js__WEBPACK_IMPORTED_MODULE_0__["body"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headers", function() { return _http_index_js__WEBPACK_IMPORTED_MODULE_0__["headers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryParameters", function() { return _http_index_js__WEBPACK_IMPORTED_MODULE_0__["queryParameters"]; });

/* harmony import */ var _objects_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/index.js */ "./source/shared/utility/validation/rules/objects/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "object", function() { return _objects_index_js__WEBPACK_IMPORTED_MODULE_1__["object"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyObject", function() { return _objects_index_js__WEBPACK_IMPORTED_MODULE_1__["emptyObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populatedObject", function() { return _objects_index_js__WEBPACK_IMPORTED_MODULE_1__["populatedObject"]; });

/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrays.js */ "./source/shared/utility/validation/rules/arrays.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "array", function() { return _arrays_js__WEBPACK_IMPORTED_MODULE_2__["array"]; });

/* harmony import */ var _boolean_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boolean.js */ "./source/shared/utility/validation/rules/boolean.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolean", function() { return _boolean_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constructor.js */ "./source/shared/utility/validation/rules/constructor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "constructor", function() { return _constructor_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions.js */ "./source/shared/utility/validation/rules/functions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "func", function() { return _functions_js__WEBPACK_IMPORTED_MODULE_5__["func"]; });

/* harmony import */ var _key_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./key.js */ "./source/shared/utility/validation/rules/key.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "key", function() { return _key_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _numbers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./numbers.js */ "./source/shared/utility/validation/rules/numbers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "number", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["number"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonNaNNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonNaNNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["integer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonNegativeNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonNegativeNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonPositiveNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonPositiveNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positiveNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["positiveNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "negativeNumber", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["negativeNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonNegativeInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonNegativeInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nonPositiveInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["nonPositiveInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "positiveInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["positiveInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "negativeInteger", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["negativeInteger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unitInterval", function() { return _numbers_js__WEBPACK_IMPORTED_MODULE_7__["unitInterval"]; });

/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./strings.js */ "./source/shared/utility/validation/rules/strings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "string", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["string"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trimmedString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["trimmedString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "visibleString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["visibleString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invisibleString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["invisibleString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populatedString", function() { return _strings_js__WEBPACK_IMPORTED_MODULE_8__["populatedString"]; });

/* harmony import */ var _symbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./symbol.js */ "./source/shared/utility/validation/rules/symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return _symbol_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

//G Include anything here that is possible to implement incorrectly, even for basic types.
//R Rules for basic types are also useful for custom casting, errors, and consistency.











/***/ }),

/***/ "./source/shared/utility/validation/rules/key.js":
/*!*******************************************************!*\
  !*** ./source/shared/utility/validation/rules/key.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _keyify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../keyify.js */ "./source/shared/utility/keyify.js");


/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  // Keys that won't be cast / have already been cast as a result of being used as a property key.
  //! Does not include numbers, those get cast to strings.
  validator(value) {
    const keyifiedValue = Object(_keyify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);

    if (value !== keyifiedValue) {
      throw new Error('Value is not keyified.');
    }
  },

  caster(reference) {
    reference.value = Object(_keyify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.value);
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/numbers.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/validation/rules/numbers.js ***!
  \***********************************************************/
/*! exports provided: number, nonNaNNumber, integer, nonNegativeNumber, nonPositiveNumber, positiveNumber, negativeNumber, nonNegativeInteger, nonPositiveInteger, positiveInteger, negativeInteger, unitInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNaNNumber", function() { return nonNaNNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integer", function() { return integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNegativeNumber", function() { return nonNegativeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonPositiveNumber", function() { return nonPositiveNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positiveNumber", function() { return positiveNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negativeNumber", function() { return negativeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonNegativeInteger", function() { return nonNegativeInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonPositiveInteger", function() { return nonPositiveInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "positiveInteger", function() { return positiveInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negativeInteger", function() { return negativeInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unitInterval", function() { return unitInterval; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
//TODO Create a lint rule to warn against ".validateCast(reference.value);" inside casters. This doesn't pass the nested cast value back up to the parent cast function.
//TODO Create tests for this.

const number = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'number') {
      throw new Error('Value is not a number.');
    }
  },

  caster(reference) {
    // Parse strings for floats.
    const n = Number.parseFloat(reference.value); // But do not cast non-numbers to NaN.

    if (!Number.isNaN(n)) reference.value = n;
  }

});
const nonNaNNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);

    if (Number.isNaN(value)) {
      throw new Error('Number is NaN.');
    }
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const integer = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (!Number.isInteger(value)) throw new Error('Number is not an integet.');
  },

  caster(reference) {
    number.validateCast(reference);
    reference.value = Number.parseInt(reference.value, 10);
  }

}); //! Defining 0 as neither positive or negative.
//L Don't worry about NaN: https://stackoverflow.com/a/26982925 (//!but be careful about negating comparisons)

const nonNegativeNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value < 0) throw new Error('Number is negative.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const nonPositiveNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value > 0) throw new Error('Number is positive.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const positiveNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value <= 0) throw new Error('Number is not positive.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const negativeNumber = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    number.validate(value);
    if (value >= 0) throw new Error('Number is not negative.');
  },

  caster(reference) {
    number.validateCast(reference); // Cannot cast any further than a number.
  }

});
const nonNegativeInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    nonNegativeNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    nonNegativeNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});
const nonPositiveInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    nonPositiveNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    nonPositiveNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});
const positiveInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    positiveNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    positiveNumber.validateCast(reference);
    integer.validateCast(reference);
  }

});
const negativeInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    negativeNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    negativeNumber.validateCast(reference);
    integer.validateCast(reference);
  }

}); //? Is there a better name for this?

const unitInterval = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (!(0 <= value && value <= 1)) {
      throw new Error('Value is not a number between 0 and 1.');
    }
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/empty-object.js":
/*!************************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/empty-object.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../object/keys-of.js */ "./source/shared/utility/object/keys-of.js");



/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    _object_js__WEBPACK_IMPORTED_MODULE_1__["default"].validate(value);

    if (Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(value, {
      own: true,
      enumerable: true,
      nonEnumerable: true,
      named: true,
      symbol: true,
      inherited: false
    }).length > 0) {
      throw new Error('Object is not empty.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/index.js":
/*!*****************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/index.js ***!
  \*****************************************************************/
/*! exports provided: object, emptyObject, populatedObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "object", function() { return _object_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _empty_object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty-object.js */ "./source/shared/utility/validation/rules/objects/empty-object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyObject", function() { return _empty_object_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _populated_object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./populated-object.js */ "./source/shared/utility/validation/rules/objects/populated-object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "populatedObject", function() { return _populated_object_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/object.js":
/*!******************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/object.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");

/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  //L https://stackoverflow.com/a/22482737
  validator(value) {
    if (value === null || !(typeof value === 'object' || typeof value === 'function')) {
      throw new Error('Value is not an object.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/objects/populated-object.js":
/*!****************************************************************************!*\
  !*** ./source/shared/utility/validation/rules/objects/populated-object.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "./source/shared/utility/validation/rules/objects/object.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../object/keys-of.js */ "./source/shared/utility/object/keys-of.js");



/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    _object_js__WEBPACK_IMPORTED_MODULE_1__["default"].validate(value);

    if (Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"])(value, {
      own: true,
      enumerable: true,
      nonEnumerable: true,
      named: true,
      symbol: true,
      inherited: false
    }).length === 0) {
      throw new Error('Object is not populated.');
    }
  }

}));

/***/ }),

/***/ "./source/shared/utility/validation/rules/strings.js":
/*!***********************************************************!*\
  !*** ./source/shared/utility/validation/rules/strings.js ***!
  \***********************************************************/
/*! exports provided: string, trimmedString, visibleString, invisibleString, populatedString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimmedString", function() { return trimmedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibleString", function() { return visibleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invisibleString", function() { return invisibleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "populatedString", function() { return populatedString; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");

const string = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'string') {
      throw new Error('Value is not a string.');
    }
  },

  caster(reference) {
    // Stringify if able to.
    if (typeof reference.value === 'object') {
      try {
        reference.value = JSON.stringify(reference.value);
      } catch (e) {}
    }

    reference.value = String(reference.value);
  }

});
const trimmedString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value); //TODO Create a thorough test for this.
    //TODO See https://en.wikipedia.org/wiki/Whitespace_character
    //! If this gets changed, ensure the caster .trim() function is updated too.
    //L From the trim() polyfill at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

    if (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/gu.test(value)) {
      throw new Error('String has leading and/or trailing whitespace.');
    }
  },

  caster(reference) {
    string.validateCast(reference);
    reference.value = reference.value.trim();
  }

});
const visibleString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value);

    if (trimmedString.validateCast(value) === '') {
      throw new Error('String is not visible.');
    }
  },

  caster(reference) {
    string.validateCast(reference); // Cannot cast any further than a string.
  }

});
const invisibleString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value);

    if (trimmedString.validateCast(value) !== '') {
      throw new Error('String is visible.');
    }
  },

  caster(reference) {
    string.validateCast(reference); // Cannot cast any further than a string.
  }

});
const populatedString = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    string.validate(value);

    if (value === '') {
      throw new Error('String is not populated.');
    }
  },

  caster(reference) {
    string.validateCast(reference); // Cannot cast any further than a string.
  }

});

/***/ }),

/***/ "./source/shared/utility/validation/rules/symbol.js":
/*!**********************************************************!*\
  !*** ./source/shared/utility/validation/rules/symbol.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule.js */ "./source/shared/utility/validation/rule.js");
/* harmony import */ var _strings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strings.js */ "./source/shared/utility/validation/rules/strings.js");


/* harmony default export */ __webpack_exports__["default"] = (new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    //L If transpiling to ES5, an additional check is required: https://stackoverflow.com/questions/46479169/check-if-value-is-a-symbol-in-javascript
    if (typeof value !== 'symbol') {
      throw new Error('Value is not a symbol.');
    }
  },

  caster(reference) {
    // Non-symbol values cast as the stringified description of a new symbol.
    if (!this.validate(reference.value)) {
      // Symbol(x) cannot convert symbols to strings, but String(x) in string.validateCast() can.
      _strings_js__WEBPACK_IMPORTED_MODULE_1__["string"].validateCast(reference.value);
      reference.value = Symbol(reference.value);
    }
  }

}));

/***/ }),

/***/ "./source/shared/warn.js":
/*!*******************************!*\
  !*** ./source/shared/warn.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Warn; });
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility/index.js */ "./source/shared/utility/index.js");

class Warn {
  constructor(options = {}) {
    const {
      log = true,
      message,
      reason,
      content
    } = options;
    _utility_index_js__WEBPACK_IMPORTED_MODULE_0__["define"].writable(this, {
      log,
      message,
      reason,
      content
    });
  }

}

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fclone":
/*!*************************!*\
  !*** external "fclone" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fclone");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-send":
/*!***************************!*\
  !*** external "koa-send" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-send");

/***/ }),

/***/ "koa-session":
/*!******************************!*\
  !*** external "koa-session" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "spotify-web-api-node":
/*!***************************************!*\
  !*** external "spotify-web-api-node" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("spotify-web-api-node");

/***/ }),

/***/ "valid-url":
/*!****************************!*\
  !*** external "valid-url" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("valid-url");

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.cjs.map