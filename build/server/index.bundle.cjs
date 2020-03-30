/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/environment-variables.js":
/*!*****************************************!*\
  !*** ./config/environment-variables.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);
//! this needs to be in its own file (not at the top of index.js) because imports are hoisted, which causes dotenv.config() to run after any module that uses environment variables immediately, which makes them undefined
//L https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import

dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config({
  path: './config/.env'
}); //C relative to root apparently

/***/ }),

/***/ "./config/project-paths.js":
/*!*********************************!*\
  !*** ./config/project-paths.js ***!
  \*********************************/
/*! exports provided: clientIndexFileName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientIndexFileName", function() { return clientIndexFileName; });
//G Put any commonly needed paths/filenames in here.
//G Require sourcePath if needed.
const clientIndexFileName = 'index.html';

/***/ }),

/***/ "./node-utility/source-path.cjs":
/*!**************************************!*\
  !*** ./node-utility/source-path.cjs ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {//C Returns an absolute path relative to the source directory.
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
*/

const {resolve} = __webpack_require__(/*! path */ "path");
module.exports = (...relativePaths) => resolve(__dirname, '../', ...relativePaths);

/* WEBPACK VAR INJECTION */}.call(this, "C:\\Users\\Thomas\\Documents\\Personal-Work\\StreamJockey.git\\source\\node-utility"))

/***/ }),

/***/ "./public/js/constants.js":
/*!********************************!*\
  !*** ./public/js/constants.js ***!
  \********************************/
/*! exports provided: SERVER_URL, API_URL, JSON_HEADER, URL_HEADER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_URL", function() { return SERVER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON_HEADER", function() { return JSON_HEADER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_HEADER", function() { return URL_HEADER; });
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

/***/ }),

/***/ "./public/js/fclone.js":
/*!*****************************!*\
  !*** ./public/js/fclone.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// see if it looks and smells like an iterable object, and do accept length === 0
function isArrayLike(item) {
  if (Array.isArray(item)) return true;
  const len = item && item.length;
  return typeof len === 'number' && (len === 0 || len - 1 in item) && typeof item.indexOf === 'function';
}

function fclone(obj, refs) {
  if (!obj || "object" !== typeof obj) return obj;

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(obj)) {
    return new Buffer(obj);
  } // typed array Int32Array etc.


  if (typeof obj.subarray === 'function' && /[A-Z][A-Za-z\d]+Array/.test(Object.prototype.toString.call(obj))) {
    return obj.subarray(0);
  }

  if (!refs) {
    refs = [];
  }

  if (isArrayLike(obj)) {
    refs[refs.length] = obj;
    let l = obj.length;
    let i = -1;
    let copy = [];

    while (l > ++i) {
      copy[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : fclone(obj[i], refs);
    }

    refs.length && refs.length--;
    return copy;
  }

  refs[refs.length] = obj;
  let copy = {};

  if (obj instanceof Error) {
    copy.name = obj.name;
    copy.message = obj.message;
    copy.stack = obj.stack;
  }

  let keys = Object.keys(obj);
  let l = keys.length;

  while (l--) {
    let k = keys[l];
    copy[k] = ~refs.indexOf(obj[k]) ? '[Circular]' : fclone(obj[k], refs);
  }

  refs.length && refs.length--;
  return copy;
}

/* harmony default export */ __webpack_exports__["default"] = (fclone);

/***/ }),

/***/ "./public/js/global.js":
/*!*****************************!*\
  !*** ./public/js/global.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfill.js */ "./public/js/polyfill.js");
/* harmony import */ var _polyfill_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfill_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility/index.js */ "./public/js/utility/index.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./public/js/constants.js");
/* harmony import */ var _fclone_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fclone.js */ "./public/js/fclone.js");
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//G JAVASCRIPT GUIDES
		//L Default arguments and parameter destructuring: https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6/
		
		//L nesting optimization: https://thorstenlorenz.wordpress.com/2012/06/02/performance-concerns-for-nested-javascript-functions/

		Promises: promises always return more promises (that are resolved or rejected), await (and furthermore async) is only needed to transform those resolved or rejected promises in to useable values, promises can be called and returned within a synchronous function (like map) they just pass on their evaluation to whatever they were returned to (see the implementation of Promise.all(...map()))
		//G catches should be attached behind every async function and not paired next to .then() - this straightens out the chain ordering (as opposed to two steps forward, one step back -style), this also stops upstream errors from triggering all downstream catches and nesting every error
		
		//L Arrow Functions: when not to use - https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/

		//L es modules: https://developers.google.com/web/fundamentals/primers/modules, http://2ality.com/2014/09/es6-modules-final.html
		//L export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
		//L import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
		//L es modules in node (VERY USEFUL FOR HOW TO CONVERT TO ES MODULES): https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71

		//G Object.assign(sj.Base, {...}) is used to assign static variables and methods
		//G (function () {..}).call(sj.Base); is better 

		//G use guard clauses over else statements where possible - because they keep the relative error close by in the script (rather than way down below at the bottom of an else statement or early escape function (using positively phrased clauses)) - see sj.rebuild()

		//C arrow functions can have an implicit return, but for object literals, they need to be wrapped in parenthesis to be distinguished from the function block 
		//L https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

		//L classes: https://medium.com/@robertgrosse/how-es6-classes-really-work-and-how-to-build-your-own-fd6085eb326a

		//L prototypes explained: https://hackernoon.com/understand-nodejs-javascript-object-inheritance-proto-prototype-class-9bd951700b29
		'The prototype is a property on a constructor function that sets what will become the __proto__ property on the constructed object.'

		//L beware the comma operator in if-statements: https://stackoverflow.com/questions/5347995/why-does-javascript-accept-commas-in-if-statements

	//G STYLE GUIDES
		//R use null in places where there should be an manually placed empty value - distinguishes between unintentional empty values: undefined, and intentional empty values: null
		//L "To distinguish between the two, you may want to think of undefined as representing an unexpected absence of value and null as representing an expected absence of value."
    	//L http://ryanmorr.com/exploring-the-eternal-abyss-of-null-and-undefined/
		

	//L DEV TOOLS
		//L ASCII TITLE GENERATOR: http://patorjk.com/software/taag/#p=display&c=c%2B%2B&f=ANSI%20Shadow&t=playlist
		//L Console css formatting https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
	
	//L LIBRARIES
		//L fetch vs axios: https://www.reddit.com/r/javascript/comments/6e0o99/fetch_polyfill_or_axios/
		//R axios is high level, fetch is middle level - i want this because its less magic, i actually want the functionality of fetch to be able to distinguish between failed requests and bad requests, i'm making a wrapper function anyways so the extra detail doesn't matter
*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/* 
	// BIG
		Break every single part of every module, see if all possible outcomes are caught and handled properly.

		Ensure everything has an error handler - most of the time 'throw sj.propagate(rejected);'.

		Fill in and make consistent content for all success, error, data objects.

		Add timeouts to async functions.

		Replace all 'var' with 'let' and 'const'


	// SMALL
		eslint + prettier configuration
		//L https://medium.com/@pgivens/write-cleaner-code-using-prettier-and-eslint-in-vscode-d04f63805dcd
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// BUILT-IN
// INTERNAL
 // side effects


 // EXTERNAL

 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

const sj = {}; // POLYFILL

if (typeof fetch !== 'undefined') {
  //L typeof doesn't throw reference error: https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
  //L fetch also needs the window context: https://stackoverflow.com/questions/10743596/why-are-certain-function-calls-termed-illegal-invocations-in-javascript
  sj.fetch = fetch.bind(window);
} else {
  sj.fetch = async function () {
    throw new sj.Error({
      log: true,
      origin: 'global.js init',
      reason: 'fetch is not defined'
    });
  };
} // CONSTANTS


_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(sj, _constants_js__WEBPACK_IMPORTED_MODULE_2__); //  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗   ██╗
//  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
//  ██║   ██║   ██║   ██║██║     ██║   ██║    ╚████╔╝ 
//  ██║   ██║   ██║   ██║██║     ██║   ██║     ╚██╔╝  
//  ╚██████╔╝   ██║   ██║███████╗██║   ██║      ██║   
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   
//C these don't reference any sj.Bases
// TESTING

_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(sj, {
  test: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["test"],
  wait: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["wait"]
});

sj.trace = function () {
  try {
    throw Error('');
  } catch (e) {
    //TODO figure out how to properly display newlines as strings inside objects
    //C get stack
    const stackTrace0 = e.stack; //C 'file:///' is removed (so that the URIs are clickable in node)

    const stackTrace1 = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(stackTrace0, 'file:///', ''); //C remove leading 'Error\n    ', to reduce confusion because trace isn't an error

    const stackTrace2 = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(stackTrace1, 'Error\n', ''); //C removes any line with Object.sj.trace

    let ignore = ['Object.sj.trace', 'new Base', 'new Error', 'Object.sj.catchUnexpected', 'Object.sj.propagate', 'sj.Error.announce'];
    ignore = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(ignore.join('|'), '.', '\.');
    const exp = new RegExp(`(?:(?:\\n|\n|\r|$)* *at(?: |\\n|\n|\r|$))(?:${ignore})(?:.+?(?=\\n|\n|\r|$))`, 'g');
    const stackTrace3 = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(stackTrace2, exp, '');
    return stackTrace0;
  }
};

sj.image = function (value) {
  if (typeof value === null || typeof value !== 'object') return value;
  return JSON.parse(JSON.stringify(sj.deepClone(value))); //? Why is a deepClone needed here?
}; // HTTP


_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(sj, {
  encodeProps: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["encodeProperties"],
  //TODO
  decodeProps: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["decodeProperties"],
  //TODO
  encodeList: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["encodeList"],
  decodeList: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["decodeList"]
}); // MISC

sj.deepAccess = function (thing, ...args) {
  const path = args.flat(); //C accesses nested properties of any variable type
  //C prevents errors from being thrown on property access of undefined or null, instead returns undefined

  return path.reduce((accumulator, key) => {
    //C only undefined and null will throw errors for property access
    if (accumulator === undefined || accumulator === null) return undefined;else return accumulator[key];
  }, thing);
};

sj.deepClone = function (...args) {
  //C deep clones objects (root & nested objects aren't the same reference)
  //C drops circular references and replaces with '[Circular]'
  return Object(_fclone_js__WEBPACK_IMPORTED_MODULE_3__["default"])(...args);
};

sj.Deferred = class Deferred extends Promise {
  //C custom promise that can be resolved, rejected, and canceled outside it's resolver
  //G may be called without a resolver
  //TODO//? cancel-able promises might not be the best idea
  constructor(executor = (resolve, reject) => {}) {
    //C closure is used here instead of instance variables because they cannot be defined before super is called (which requires such variables)
    const closure = {
      pending: true,
      //! doesn't stop additional resolve/reject calls, they still reach the parent promise, just acts as a readable state
      canceled: false
    }; //C intercept executor function

    super((resolve, reject) => {
      closure.resolve = function (resolved) {
        if (!closure.canceled) {
          closure.pending = false;
          resolve(resolved);
        }
      };

      closure.reject = function (rejected) {
        if (!closure.canceled) {
          closure.pending = false;
          reject(rejected);
        }
      };

      return executor(resolve, reject);
    }); //C instance .resolve() and .reject() functions will use the closure to fulfill the promise from outside it's executor

    this.resolve = closure.resolve;
    this.reject = closure.reject; //C prevents promise from being resolved or rejected in the future

    this.cancel = function () {
      closure.canceled = true;
    }; //C rejects the result of the passed function on timeout


    this.timeout = function (ms, onTimeout = () => 'Deferred promise timed out') {
      sj.wait(ms).then(() => {
        //! doesn't call onTimeout() if the promise is already fulfilled, to avoid side-effects
        if (closure.pending) closure.reject(onTimeout());
      });
      return this;
    }; //C allow read-only access of pending and canceled directly on the deferred promise


    Object.defineProperty(this, 'pending', {
      get() {
        return closure.pending;
      }

    });
    Object.defineProperty(this, 'canceled', {
      get() {
        return closure.canceled;
      }

    });
  }

}; //   ██████╗██╗      █████╗ ███████╗███████╗    ██╗   ██╗████████╗██╗██╗     
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝    ██║   ██║╚══██╔══╝██║██║     
//  ██║     ██║     ███████║███████╗███████╗    ██║   ██║   ██║   ██║██║     
//  ██║     ██║     ██╔══██║╚════██║╚════██║    ██║   ██║   ██║   ██║██║     
//  ╚██████╗███████╗██║  ██║███████║███████║    ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝     ╚═════╝    ╚═╝   ╚═╝╚══════╝
//C these reference sj.Bases, don't call these until classes are defined

sj.setTimeout = function (f, delay, ...args) {
  //C allows the use of Infinity for setTimeout()
  //! this will be clamped to 2147483647
  //L https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
  //L https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
  if (delay > 2147483647) {
    delay = 2147483647; // new sj.Warn({
    // 	origin: 'setTimeout()',
    // 	message: 'setTimeout delay clamped to 2147483647 (24.8) days',
    // });
  }

  return setTimeout(f, delay, ...args);
}; // SESSION //C holds login, get, logout, etc. methods


sj.session = {}; // TYPE

sj.isType = function (input, type) {
  //C matches 'input' type or super-type to 'type' value or string representation or builtin object
  //!//! will not match arrays to Object
  //! will not match typeof input to typeof type, unless their exact values match - don't rely on this
  //R this intentional because it would be difficult to separate string identifiers from typeof 'anyString'
  //TODO also go back and fix the sj validation class of number, int, floats with this too
  //TODO see if this can be even more cleanly structured
  //TODO consider allowing the user of builtin objects
  //TODO make a list of reserved strings as identifiers (problem is for using a variable as the type to compare to, if it lands on any of these reserved words it wont match typeof type but the reserved meaning) //? actually I dont think this is needed because 'typeof type' is never used, type is only matching by value or its identifier

  /*	//R
  	created new typeOf function - there are two use cases: (minimal, similar to typeof keyword but fixes null & NaN) (extended, fleshes out sj.Base types etc.), both are probably needed but they cant exist at the same time - instead do something like isType(input, 'type') which can then be used to check many-to-one matches unlike a string comparison (x === 'y'), this will distance this function from typeof (which is a good thing)
  */
  // value
  if (input === type) {
    //!//TODO this will cause issues with ('object', 'object') and inconsistencies like true === (sj.Entity, sj.Entity) vs false == (sj.Track, sj.Entity)
    return true;
  } // instanceof


  if (typeof type === 'function' && input instanceof type && !Array.isArray(input)) {
    return true;
  } // no sub-types
  //C these early return false to skip more expensive checks below


  if (input === undefined) {
    //! won't catch undeclared variables because they cannot be passed to functions without throwing a reference error
    return type === undefined || type === 'undefined';
  }

  if (input === null) {
    return type === null || type === 'null';
  }

  if (Array.isArray(input)) {
    return type === Array || type === 'array';
  }

  let t = typeof input; //! typeof fixes must go above this (null = 'object', array = 'object')

  if (t === 'boolean') {
    return type === Boolean || type === 'boolean';
  }

  if (t === 'string') {
    return type === String || type === 'string';
  } // sub-types


  if (t === type) {
    return true;
  }

  if (t === 'object') {
    if (type === Object || type === 'object') {
      return true;
    } // sj.Base & sub-types
    //R this implementation removes the need for a custom object list, because if everything extends sj.Base, everything can also be compared as an instanceof sj.Base - keeping a list of string names (to reduce the need for building an object) wont work in the long run because inheritance cant be checked that way


    let tempInput = input;
    let tempType = type;

    if ((input instanceof sj.Base || typeof input.constructorName === 'string' && (() => {
      //C input or input.constructorName is an instance of a constructible
      let Target = sj[input.constructorName];

      if (typeof Target === 'function') {
        tempInput = new Target({
          log: false
        });
        return true;
      }

      return false;
    })()) && (typeof type === 'function' || typeof type === 'string' && (() => {
      //C and type is constructible
      let Target = sj[type];

      if (typeof Target === 'function') {
        tempType = Target;
        return true;
      }

      return false;
    })())) {
      if (tempInput instanceof tempType) {
        //C catch [input instance] instanceof [type constructible]
        return true;
      }
    }
  }

  if (t === 'number') {
    //C Infinity is a number
    if (type === Number || type === 'number') {
      return true;
    } // NaN


    if (Number.isNaN(input) && (Number.isNaN(type) || type === 'NaN' || type === 'nan')) {
      //! isNaN() and Number.isNaN() are slightly different: //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
      return true;
    } // integer


    if (Number.isInteger(input) && (type === 'integer' || type === 'int')) {
      return true;
    } // float


    if (!Number.isInteger(input) && type === 'float') {
      return true;
    }
  }

  return false;
};

sj.isEmpty = function (input) {
  //C null, undefined, and whitespace-only strings are 'empty' //! also objects and arrays
  return !(sj.isType(input, 'boolean') || sj.isType(input, 'number') || //C check for empty and whitespace strings and string conversions of null and undefined
  //TODO //! this will cause issues if a user inputs any combination of these values, ban them at the user input step
  sj.isType(input, 'string') && input.trim() !== '' && input.trim() !== 'null' && input.trim() !== 'undefined' || sj.isType(input, 'object') && Object.keys(input).length > 0 || sj.isType(input, 'array') && input.length > 0);
}; //TODO extract this, matchOrder is not supported in the new deepCompare() function, so must think of a work around.
//TODO consider using Object.is() (where +0 !== -0 and NaN === NaN) //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is


sj.deepMatch = function (a, b, {
  deep = true,
  depth = 10,
  matchIfTooDeep = false,
  matchIfSubset = false,
  //C matches objects and arrays if a is a subset of b
  matchOrder = true,
  logDifference = false //C logs first difference found if not matching

} = {
  deep: true,
  depth: 10,
  matchIfTooDeep: false,
  matchIfSubset: false,
  matchOrder: true,
  logDifference: false
}) {
  if (depth <= 0) return matchIfTooDeep;
  if (a === b) return true; // primitives & references

  if (sj.isType(a, NaN) && sj.isType(b, NaN)) return true; // NaN

  if (deep) {
    let matchDeeper = function (a, b) {
      return sj.deepMatch(a, b, {
        deep,
        depth: depth - 1,
        matchIfTooDeep,
        matchIfSubset,
        matchOrder
      });
    };

    if (sj.isType(a, Object) && sj.isType(b, Object)) {
      // objects
      let matches = true;
      Object.keys(a).forEach(key => {
        //C match all keys of a to the same keys in b
        if (!matchDeeper(a[key], b[key])) {
          matches = false;
          if (logDifference) console.log(`deepMatch property difference - ${key}: ${a[key]}, ${b[key]}`);
        }
      });

      if (!matchIfSubset) {
        Object.keys(b).forEach(key => {
          //C match all keys of b to the same keys in a //TODO optimize here
          if (!matchDeeper(a[key], b[key])) {
            matches = false;
            if (logDifference) console.log(`deepMatch property difference - ${key}: ${a[key]}, ${b[key]}`);
          }
        });
      }

      return matches;
    }

    if (sj.isType(a, Array) && sj.isType(b, Array)) {
      // arrays
      let matches = true;
      a.forEach((inA, i) => {
        if (matchOrder) {
          if (!matchDeeper(a[i], b[i])) {
            matches = false;
            if (logDifference) console.log(`deepMatch index difference - ${i}: ${a[i]}, ${b[i]}`);
          }
        } else {
          //C match any inB to current inA
          if (!b.some(inB => matchDeeper(inA, inB))) {
            matches = false;
            if (logDifference) console.log(`deepMatch extra item in b - ${inB}`);
          }
        }
      });

      if (!matchIfSubset) {
        b.forEach((inB, i) => {
          if (matchOrder) {
            if (!matchDeeper(a[i], b[i])) {
              matches = false;
              if (logDifference) console.log(`deepMatch index difference - ${i}: ${a[i]}, ${b[i]}`);
            }
          } else {
            if (!a.some(inA => matchDeeper(inA, inB))) {
              matches = false;
              if (logDifference) console.log(`deepMatch extra item in a - ${inA}`);
            }
          }
        });
      }

      return matches;
    }
  }

  return false;
};

sj.deepMatch.test = function () {
  let oA = {
    a: 'a',
    b: 'b'
  };
  let oB = {
    a: 'a',
    b: 'b'
  };
  let oC = {
    a: 'a',
    b: 'b',
    c: 'c'
  };
  let oD = {
    a: 'a',
    b: 'not b'
  };
  let aA = ['a', 'b'];
  let aB = ['a', 'b'];
  let aC = ['a', 'b', 'c'];
  let aD = ['a', 'not b'];
  let aE = ['a', 'c', 'b'];
  let nA = {
    a: {
      a: {
        a: {
          a: 'a'
        }
      }
    }
  };
  let nB = {
    a: {
      a: {
        a: {
          a: 'a'
        }
      }
    }
  }; //C aF is subset of aG at first level, but then aG is a subset of aF at second level, this should fail matchIfSubset

  let aF = [{
    a: 'a',
    b: 'b'
  }];
  let aG = [{
    a: 'a'
  }, {
    b: 'b'
  }];
  sj.test([['match positive number', true === sj.deepMatch(1, 1)], ['match zero', true === sj.deepMatch(0, 0)], ['match negative number', true === sj.deepMatch(-1, -1)], ['match infinity', true === sj.deepMatch(Infinity, Infinity)], ['match negative infinity', true === sj.deepMatch(-Infinity, -Infinity)], ['match NaN', true === sj.deepMatch(NaN, NaN)], ['mismatch positive number', false === sj.deepMatch(4, 3193)], ['mismatch positive negative', false === sj.deepMatch(-3, 0)], ['mismatch infinity, number', false === sj.deepMatch(Infinity, 2345678909875498765456789)], ['mismatch infinity, -infinity', false === sj.deepMatch(Infinity, -Infinity)], ['mismatch NaN, zero', false === sj.deepMatch(NaN, 0)], ['match true', true === sj.deepMatch(true, true)], ['match false', true === sj.deepMatch(false, false)], ['mismatch true, false', false === sj.deepMatch(true, false)], ['match string', true === sj.deepMatch('test', 'test')], ['match empty', true === sj.deepMatch('', '')], ['match "undefined"', true === sj.deepMatch('undefined', 'undefined')], ['match "null"', true === sj.deepMatch('null', 'null')], ['mismatch string', false === sj.deepMatch('string', 'test')], ['mismatch empty and filled', false === sj.deepMatch('', 'test')], ['match object reference', true === sj.deepMatch(oA, oA)], ['match object items', true === sj.deepMatch(oA, oB)], ['match object subset', true === sj.deepMatch(oA, oC, {
    matchIfSubset: true
  })], ['mismatch object not deep', false === sj.deepMatch(oA, oB, {
    deep: false
  })], ['mismatch object, not subset', false === sj.deepMatch(oA, oC)], ['mismatch object props', false === sj.deepMatch(oA, oD)], ['match array reference', true === sj.deepMatch(aA, aA)], ['match array items', true === sj.deepMatch(aA, aB)], ['match array subset', true === sj.deepMatch(aA, aC, {
    matchIfSubset: true
  })], ['match array, not order', true === sj.deepMatch(aC, aE, {
    matchOrder: false
  })], ['mismatch array, not deep', false === sj.deepMatch(aA, aB, {
    deep: false
  })], ['mismatch array, not subset', false === sj.deepMatch(aA, aC)], ['mismatch array items', false === sj.deepMatch(aA, aD)], ['mismatch array, order', false === sj.deepMatch(aC, aE)], ['mismatch object, array', false === sj.deepMatch({}, [])], ['match nested', true === sj.deepMatch(nA, nB)], ['match nested if too deep', true === sj.deepMatch(nA, nB, {
    depth: 2,
    matchIfTooDeep: true
  })], ['mismatch nested if too deep', false === sj.deepMatch(nA, nB, {
    depth: 2
  })], ['mismatch subset switch', false === sj.deepMatch(aF, aG, {
    matchIfSubset: true
  })]], 'deepMatch');
}; // ERROR


sj.catchUnexpected = function (input) {
  //C determines type of input, creates, announces, and returns a proper sj.Error object
  //C use in the final Promise.catch() to handle any unexpected variables or errors that haven't been caught yet
  var error = new sj.Error({
    log: false,
    origin: 'sj.catchUnexpected()',
    message: 'an unexpected error ocurred',
    content: input
  });

  if (sj.isType(input, null)) {
    error.reason = 'unexpected null';
  } else if (sj.isType(input, Object)) {
    if (input instanceof Error) {
      //C this is going to catch the majority of unexpected inputs
      //! JSON.stringify() does not work on native Error objects as they have no enumerable properties therefore these cannot be passed between client & server,so when catching a native Error object properly convert it to a string with Error.toString() then save that in reason
      //L https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
      error.reason = input.toString(); //C replace trace with actual trace (which has clickable URIs)

      error.trace = Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(input.stack, 'file:///', '');
    } else if (sj.isType(input, sj.Base)) {
      error.reason = `unexpected ${input.constructorName}`;
    } else {
      error.reason = 'unexpected object';
    }
  } else {
    error.reason = `unexpected ${typeof input}`;
  }

  error.announce();
  return error;
};

sj.propagate = function (input, overwrite) {
  //C wraps bare data caught by sj.catchUnexpected(), optionally overwrites properties
  if (!sj.isType(input, sj.Error)) {
    //C wrap any non-sj errors, let sj.Errors flow through
    input = sj.catchUnexpected(input);
  }

  if (sj.isType(overwrite, Object)) {
    //C overwrite properties (for example making a more specific message)
    Object.assign(input, overwrite); //OLD this would recreate the trace, dont want to do this input = new input.constructor({...input, log: false, ...overwrite}); //C re-stuff, but don't announce again
  }

  throw input; //TODO //? why not just use Object.assign(input) instead?
  //TODO better yet, why not just use a spread operator at the top?
};

sj.andResolve = function (rejected) {
  //C resolves/returns any errors thrown by sj.propagate()
  //G someAsyncFunction().catch(sj.andResolve);
  try {
    return sj.propagate(rejected);
  } catch (e) {
    return e;
  }
}; // FORMAT


_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["define"].constant(sj, {
  any: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["any"],
  one: _utility_index_js__WEBPACK_IMPORTED_MODULE_1__["one"]
});

sj.content = function (resolved) {
  //C shorter syntax for immediately returning the content property of a resolved object in a promise chain
  return resolved.content;
}; // RECURSION
//TODO consider using Promise.race //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race


sj.recursiveSyncTime = async function (n, loopCondition, f, ...args) {
  //L rest parameters	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
  let timestamp = Date.now();

  function loop() {
    if (Date.now() > timestamp + n) {
      throw new sj.Error({
        log: true,
        origin: 'recursiveSyncTime()',
        reason: 'recursive function timed out',
        content: f
      });
    }

    let result = f(...args);

    if (loopCondition(result)) {
      result = loop();
    }

    return result;
  }

  return loop();
};

sj.recursiveSyncCount = async function (n, loopCondition, f, ...args) {
  let count = 0;

  function loop(count) {
    if (count >= n) {
      throw new sj.Error({
        log: true,
        origin: 'recursiveSyncCount',
        reason: 'recursive function counted out',
        content: f
      });
    }

    let result = f(...args);

    if (loopCondition(result)) {
      result = loop(++count);
    }

    return result;
  }

  return loop(count);
};

sj.recursiveAsyncTime = async function (n, loopCondition, f, ...args) {
  let timestamp = Date.now();

  async function loop() {
    if (Date.now() > timestamp + n) {
      throw new sj.Error({
        log: true,
        origin: 'recursiveAsyncTime()',
        reason: 'recursive function timed out',
        content: f
      });
    }

    let result = await f(...args);

    if (loopCondition(result)) {
      result = await loop();
    }

    return result;
  }

  ;
  return await loop();
};

sj.recursiveAsyncCount = async function (n, loopCondition, f, ...args) {
  let count = 0;

  async function loop(count) {
    if (count >= n) {
      throw new sj.Error({
        log: true,
        origin: 'recursiveAsyncCount()',
        reason: 'recursive function counted out',
        content: f
      });
    }

    let result = await f(...args);

    if (loopCondition(result)) {
      result = await loop(++count);
    }

    return result;
  }

  return await loop(count);
}; //C uses recursiveAsyncTime to periodically check a condition


sj.waitForCondition = async function ({
  interval = 100,
  scaling = 1,
  delay = 0,
  timeout = 2000,
  condition = () => false
}) {
  await sj.recursiveAsyncTime(timeout, () => !condition(), async o => {
    await sj.wait(o.time);
    o.time = o.time * scaling;
    return;
  }, {
    time: interval + delay
  });
}; // HTTP


sj.rebuild = function (input, strict) {
  //C turns a bare object back into its custom class if it has a valid constructorName property
  if (sj.isType(input, String)) {
    //C parse if string
    try {
      input = JSON.parse(input);
    } catch (e) {
      return new sj.Error({
        log: true,
        origin: 'sj.rebuild()',
        message: 'failed to recreate object',
        reason: e,
        content: input
      });
    }
  }

  if (!sj.isType(input, Object)) {
    //C throw if not object
    return new sj.Error({
      log: true,
      origin: 'sj.rebuild()',
      message: 'failed to recreate object',
      reason: 'data is not an object',
      content: input
    });
  }

  let rebuilt = input;

  if (sj.isType(input, sj.Base)) {
    //C rebuild if possible
    rebuilt = new sj[input.constructorName](input);
  } else if (strict) {
    //C throw if not possible and strict
    return new sj.Error({
      log: true,
      origin: 'sj.rebuild()',
      message: 'failed to recreate object',
      reason: 'object is not a valid sj.Base',
      content: input
    });
  }

  return rebuilt;
};

sj.request = async function (method, url, body, headers = sj.JSON_HEADER) {
  /* //! use UPPERCASE HTTP methods...
  	//! ...because in the fetch api 'PATCH' is case-sensitive where get, post, delete aren't
  	//L its absurd, but apparently intentional: https://stackoverflow.com/questions/34666680/fetch-patch-request-is-not-allowed
  	//L https://github.com/whatwg/fetch/issues/50
  	//L https://github.com/github/fetch/pull/243
  */
  let options = {
    method,
    headers,
    body
  };

  if (method === 'GET') {
    if (sj.isType(body, Object)) {
      url += `?${sj.encodeProps(body)}`;
    }

    delete options.body;
  }

  if (sj.isType(options.body, Object) || sj.isType(options.body, Array)) {
    //C stringify body
    try {
      options.body = JSON.stringify(sj.deepClone(options.body));
    } catch (e) {
      //C catch stringify error (should be a cyclic reference)
      throw new sj.Error({
        origin: 'request()',
        message: 'could not send request',
        reason: e.message,
        content: options.body
      });
    }
  }

  let result = await sj.fetch(url, options).catch(rejected => {
    //L fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //C catch network error
    //L when fetch errors: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    //TODO properly parse
    throw sj.propagate(rejected);
  }); //TODO sort out the codes and parsing below
  //C catch ok, no content code

  if (result.status === 204) {
    return new sj.Success({
      origin: 'sj.request()',
      code: '204',
      message: 'success',
      reason: 'request successful, no content returned'
    });
  } //C parse via fetch .json()
  //L https://developer.mozilla.org/en-US/docs/Web/API/Body/json


  let raw = await result.clone().text();
  let parsedResult = await result.clone().json().catch(rejected => {
    throw sj.propagate(rejected, {
      content: raw
    });
  }); //C catch non-ok status codes

  if (!result.ok) {
    //TODO properly parse
    throw sj.propagate(parsedResult);
  } //C rebuild and throw if error


  let build = function (item) {
    item = sj.rebuild(item);

    if (sj.isType(item, sj.Error)) {
      throw item;
    }

    return item;
  };

  if (sj.isType(parsedResult, Array)) {
    return await Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["asyncMap"])(parsedResult, item => build(item));
  } else {
    return build(parsedResult);
  }
}; // LIVE DATA


sj.Subscriptions = function () {
  //C creates an array for each Entity type
  sj.Entity.children.forEach(child => {
    this[child.table] = [];
  });
}; // RANDOM KEY GENERATION //TODO this is only public for testing


sj.makeKey = function (length) {
  //C use only characters allowed in URLs
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';

  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return key;
};

sj.addKey = async function (list, timeout) {
  let pack = {};
  let defaultTimeout = 300000; //C default 5 minutes

  pack.key = await sj.recursiveSyncCount(100, key => {
    let found = false;

    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        found = true;
        break;
      }
    }

    return found;
  }, sj.makeKey, 10);
  pack.timestamp = Date.now();
  pack.timeout = pack.timestamp;
  sj.isType(timeout, 'number') ? pack.timeout += timeout : pack.timeout += defaultTimeout;
  list.push(pack);
  return pack;
};

sj.checkKey = async function (list, key) {
  //C checks a list for a key, will remove and return if found, will clean up timed-out keys
  for (let i = 0; i < list.length; i++) {
    //C check if timed out
    let fresh = list[i].timeout > Date.now() ? true : false; //C if the key is found and not timed out, take it out and return it

    if (list[i].key === key && fresh) {
      return list.splice(i, 1)[0];
    } //C remove timed-out keys //TODO check that this works


    if (!fresh) {
      list.splice(i, 1);
    }
  }

  throw new sj.Error({
    log: true,
    origin: 'checkKey()',
    message: 'request timeout, or just an invalid key'
  });
}; //   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

/* //TODO
	//G wrapper objects vs bare return
		simple functions should just return the bare result, for testing purposes these can also have guard clauses and throw a more descriptive sj.Error
		more complex functions (async, error-able, client-server transfer) should wrap their result:
			sj.Success / sj.SuccessList
				wraps empty content, arrays of other objects, misc content
				or is a descendant item object
			or a sj.Error / sj.ErrorList
				wraps empty content, arrays of other objects with at least one error, non-sj errors
				or is a custom error

		//R
		client-server transfer is the one place where the resolve/reject state of promises won't work - this is the big reason why wrappers are needed
		even though resolve and rejections don't need to be the same format, its still useful to have the ability influence resolved values with a success wrapper for say logging or debugging

	reconsider the default values of class properties - semantics of undefined & null, error handling of placeholders '', [], {}, inequality of Symbol(), 'emptiness' sj.isEmpty()

	possibly a cyclical reference preservation function between client and server that replaces a reference to self with 'self1' keyword and also can find lower-level cyclical references by recursively calling the function on each layer with memory for which layer its on

*/
//L functional classes: https://stackoverflow.com/questions/15192722/javascript-extending-class

/* //R Thought Process
	//R Initially only static methods and variables I decided to define outside the class because static variables requires the use of a getter, which felt hacky.
	//R But when I needed to augment the constructor of a class I ran into problems, so I decided to define classes like this - with an anonymous function being called on a minimal class. It makes the location of instance methods, instance variables, static methods, and static variables more clear. It also makes augmenting (not extending) a class easier (specifically the defaults), this is important for divergent client and server classes.
	//R finally I found that I was repeating some parts of this anonymous function like const parent = Object.getPrototypeOf(this); and return this;, so I decided to make a factory function for all descendants of sj.Base, and a similar augmentation function, this was also done partly so that defaults, instanceMethods, and statics can be laid out with similar hierarchy.
*/
//C manually create sj.Base
//TODO - consider changing all the constructorParts into functions (like static/prototypeProperties) that return an object to be assigned, (I think this may help with the defaults reference issue), but that also still can execute code. Maybe when this is done, then these parts can be brought up to the top level because they will now have their own closure context to process in


sj.Base = class Base {
  constructor(options) {
    //! defaults are retrieved in the function via the static this.constructor.defaults property
    this.constructor.construct.call(this, options);
  }

};
(function () {
  //G use makeClass and augmentClass with assignment functions that can manually assign properties via this.x = 'x', and/or return an object that has those properties assigned (may use an arrow function to shorten the syntax). both work the same way, but the manual assignment has is able to do more - make getters, execute 'on create' functionality, create closures for extension, and delete properties (//! don't do this though)
  //TODO consider deep defaults
  this.makeClass = function (name, parent, {
    //G may contain functions: beforeInitialize, afterInitialize; boolean: allowUnknown; and object: defaults
    //! anything in here (including stuff that shouldn't be) will overwrite staticProperties 
    constructorParts = parent => ({}),
    //G instance methods
    prototypeProperties = parent => ({}),
    //G static properties & methods
    staticProperties = parent => ({})
  }) {
    //C creates a descendant class of sj.Base with easily accessible properties for later augmentation, applies staticProperties, before/afterInitialize, allowUnknown, and defaults to static self and instanceMethods to instance prototype
    // VALIDATE
    if (!sj.isType(name, String)) throw 'sj.Base.makeClass() - cannot make class, name is not a string'; //! don't convert sj.Base to this here, it will break ChildClass.makeClass({'X', sj.Base, {...}})

    if (!(parent === sj.Base || parent.prototype instanceof sj.Base)) throw 'sj.Base.makeClass() - cannot make class, parent is not of type sj.Base'; //C dynamically create class using inferred function names
    //L https://stackoverflow.com/questions/33605775/es6-dynamic-class-names/33611096\
    //G sj.Base descendants pass new static constructorParts to extend from their parent's constructorParts rather than having an extended constructor
    //C the allows sj.Base.construct() to only be called once, which simplifies their 'on create' functionality

    const MadeClass = {
      [name]: class extends parent {
        constructor(options) {
          super(options);
        }

      }
    }[name]; // ASSIGN
    //C use .call to set 'this' as MadeClass, pass parent for ease of use and to avoid repeating Object.getPrototypeOf(this)
    //C undefined properties won't be passed, and parent's will be used when looked up
    //! ensure each part is only called once, as they may also have alternative assignment methods (such as on create functionality and getter/setter assignment)
    //! staticProperties is assigned before constructorParts so that constructorParts will take priority if there are collisions

    Object.assign(MadeClass, staticProperties.call(MadeClass, parent));
    /* //R thoughts on defaults
    	//R my first thought was to have default values that are undefined to be undeclared as well, so that properties the properties won't show up and will be more useful when overwriting another
    	//R I wanted to mimic this behavior with instance options - however, this would be inconsistent when using the spread operator, as it functions like Object.assign
    	//R however I'm now realizing that this would be more consistent and clear
    	//R I thought about doing three different 'defaults' objects, invisible (wont be declared if undefined, ie default undefined), normal, and 'fixed'(?), ones that cannot be changed by options
    	//R but this doesn't seem right, for invisible: when making a new object I should really stay away from using the literal undefined value, and any spread operators used will still function as expected, for fixed, these can just be defaults as they are, because I really shouldn't be overwriting them with options anyways, and they can always be changed later anyways
    */

    Object.assign(MadeClass, {
      //C constructorParts defaults
      //! these require empty defaults because of how construct() works - they are composed together rather than inheriting from the parent
      beforeInitialize() {},

      afterInitialize() {},

      defaults: {} //! allowUnknown DOES inherit from the parent and should not have a default to avoid overwriting the parent's true value with an undefined value defaulted to false

    }, constructorParts.call(MadeClass, parent)); //C instance methods are assigned to the instance.prototype so that new methods aren't created for each instance

    Object.assign(MadeClass.prototype, prototypeProperties.call(MadeClass.prototype, parent)); //? shouldn't the this reference be the parent.prototype?

    return MadeClass;
  };

  this.augmentClass = function ({
    constructorParts = parent => ({}),
    prototypeProperties = parent => ({}),
    staticProperties = parent => ({})
  }) {
    //C add or overwrite existing properties with new ones
    //G to extend: store old property in a variable not attached to this (a closure) and then compose the new property with it
    //! when not just returning an object for assignment, ensure existing properties aren't being deleted, it goes against what this method should do
    //! make sure each part is ony called once (see makeClass)
    const parent = Object.getPrototypeOf(this);
    Object.assign(this, staticProperties.call(this, parent)); //C don't overwrite defaults, assign them too

    const constructorPartsResult = constructorParts.call(this, parent);

    if (sj.isType(constructorPartsResult, Object)) {
      //! Object.assign can handle undefined, but destructuring can't which is why constructorPartsResult needs to be checked
      const {
        defaults = {},
        ...rest
      } = constructorPartsResult;
      Object.assign(this, rest);
      Object.assign(this.defaults, defaults);
    }

    Object.assign(this.prototype, prototypeProperties.call(this.prototype, parent.prototype));
  };

  this.defaults = {
    // debug
    log: false,
    // info
    code: 200,
    type: 'Ok',
    origin: '',
    trace: '',
    //sj.trace(), //! this traces when the object is created, not where announce is called - this might have to be changed, this on create property could replace origin though
    // content
    message: '',
    reason: '',
    content: {}
  };
  this.allowUnknown = false;

  this.beforeInitialize = function (accessory) {
    //C rebuild content if is of type sj.Base
    //!//G all classes are responsible for rebuilding their other properties if they are also sj.Base class instances
    if (sj.isType(accessory.options.content, sj.Base)) {
      accessory.options.content = sj.rebuild(accessory.options.content);
    } else if (sj.isType(accessory.options.content, Array)) {
      accessory.options.content.forEach((item, i, list) => {
        if (sj.isType(item, sj.Base)) list[i] = sj.rebuild(item);
      });
    }
  };

  this.afterInitialize = function (accessory) {};

  this.prototype.announce = function () {
    //R this replaces a need to log the result of functions and removes the intermediate steps need to do so (let result = new Object;, log;, return;)
    if (sj.isType(this, sj.Error)) {
      console.error(`✗ ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ ✗ `);
    } else if (sj.isType(this, sj.Warn)) {
      console.warn(`W ▮ ${this.constructorName} ${this.origin} ${this.message} \n`, this, `\n▮ W `);
    } else {
      console.log(`✓ ▮ ${this.constructorName} ${this.origin} ${this.message}\n${sj.trace()}`); //
    }
  };

  this.construct = function (options = {}) {
    const accessory = {
      options
    }; //C get prototype chain

    const chain = [this.constructor]; //C push the prototype of the last item in the chain until sj.Base is reached

    while (chain[chain.length - 1] !== sj.Base) chain.push(Object.getPrototypeOf(chain[chain.length - 1])); //C call ancestor's and own beforeInitialize() in descending order


    for (let i = chain.length - 1; i >= 0; i--) chain[i].beforeInitialize.call(this, accessory); //C store constructor.name on this instance as constructorName so that it can be stringified and rebuilt


    this.constructorName = this.constructor.name; //C assign the ancestor's and own defaults in descending order

    const extendedDefaults = {};

    for (let i = chain.length - 1; i >= 0; i--) Object.assign(extendedDefaults, chain[i].defaults);

    const composed = {}; //C assign all properties from options

    if (this.allowUnknown) Object.assign(composed, extendedDefaults, options); //C or only assign properties declared in defaults
    else Object.assign(composed, extendedDefaults, Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(options, Object.keys(extendedDefaults))); //C then assign to instance non-undefined properties (so that anything that has the value undefined, will be undeclared)
    //? is this preferable to simply using assign defined in places where it's needed?

    Object.keys(composed).forEach(key => {
      if (composed[key] !== undefined) this[key] = composed[key];
    }); //C call ancestor's and own afterInitialize in order

    for (let i = chain.length - 1; i >= 0; i--) chain[i].afterInitialize.call(this, accessory);

    if (this.log) this.announce();
  };
}).call(sj.Base);

sj.Base.test = async function () {
  let calledConstructorParts = false;
  let calledBeforeInitialize = false;
  let calledAfterInitialize = false;
  let calledPrototypeProperties = false;
  let calledStaticProperties = false;
  let calledExtraFunction = false;
  const A = sj.Base.makeClass('A', sj.Base, {
    //C testing options functions and properties
    constructorParts(parent) {
      calledConstructorParts = true;
      return {
        beforeInitialize() {
          calledBeforeInitialize = true;
          this.beforeFoo = Symbol();
        },

        defaults: {
          defaultFoo: Symbol(),
          passedFoo: 'passed as not default',
          undefinedFoo: undefined,
          undefinedOptionFoo: 'passed as undefined' // undeclaredFoo is not declared

        },

        afterInitialize() {
          calledAfterInitialize = true;
          this.afterFoo = Symbol();
        }

      };
    },

    prototypeProperties(parent) {
      calledPrototypeProperties = true;
      return {
        prototypeFoo: Symbol()
      };
    },

    staticProperties(parent) {
      calledStaticProperties = true;
      return {
        staticFoo: Symbol()
      };
    },

    extraFunction() {
      calledExtraFunction = true;
    }

  });
  const a = new A({
    passedFoo: Symbol(),
    undefinedOptionFoo: undefined
  });
  const a2 = new A({
    passedFoo: Symbol()
  });
  const AA = sj.Base.makeClass('AA', A, {
    //C testing property inheritance and extension
    constructorParts: parent => ({
      beforeInitialize() {
        this.beforeFoo2 = Symbol();
      },

      defaults: {
        defaultFoo2: Symbol()
      },

      afterInitialize() {
        this.afterFoo2 = Symbol();
      }

    }),
    prototypeProperties: parent => ({
      prototypeFoo2: Symbol()
    }),
    staticProperties: parent => ({
      staticFoo2: Symbol()
    })
  });
  const aa = new AA();
  const AAA = sj.Base.makeClass('AAA', AA, {});
  const aaa = new AAA();
  const AAB = sj.Base.makeClass('AAB', AA, {});
  const aab = new AAB();
  const AB = sj.Base.makeClass('AB', A, {
    //C testing child overwrites
    constructorParts: parent => ({
      beforeInitialize() {
        this.beforeFoo = Symbol();
      },

      defaults: {
        defaultFoo: Symbol()
      },

      afterInitialize() {
        this.afterFoo = Symbol();
      }

    }),
    prototypeProperties: parent => ({
      prototypeFoo: Symbol()
    }),
    staticProperties: parent => ({
      staticFoo: Symbol()
    })
  });
  const ab = new AB();
  const B = sj.Base.makeClass('B', sj.Base, {});
  const b = new B();
  const BA = sj.Base.makeClass('BA', B, {});
  const ba = new BA();
  const BB = sj.Base.makeClass('BB', B, {});
  const bb = new BB();
  const C = sj.Base.makeClass('C', sj.Base, {
    //C testing augmented properties
    constructorParts: parent => ({
      beforeInitialize() {
        this.beforeBar = Symbol();
      },

      defaults: {
        defaultBar: Symbol()
      },

      afterInitialize() {
        this.afterBar = Symbol();
      }

    }),
    prototypeProperties: parent => ({
      prototypeBar: Symbol()
    }),
    staticProperties: parent => ({
      staticBar: Symbol()
    })
  });
  const c = new C();
  C.augmentClass({
    constructorParts: parent => ({
      beforeInitialize() {
        this.beforeBar = Symbol();
      },

      defaults: {
        defaultBar: Symbol()
      },

      afterInitialize() {
        this.afterBar = Symbol();
      }

    }),
    prototypeProperties: parent => ({
      prototypeBar: Symbol()
    }),
    staticProperties: parent => ({
      staticBar: Symbol()
    })
  });
  const c2 = new C();
  await sj.test([// INHERITANCE
  ['A prototype is sj.Base', Object.getPrototypeOf(A) === sj.Base], ['AA prototype is A', Object.getPrototypeOf(AA) === A], ['AAAA prototype is AA', Object.getPrototypeOf(AAA) === AA], ['a isType sj.Base', sj.isType(a, sj.Base)], ['aa isType sj.Base', sj.isType(aa, sj.Base)], ['aaa isType sj.Base', sj.isType(aaa, sj.Base)], // SIBLINGS
  ['a !isType B', !sj.isType(a, B)], ['aa !isType AB', !sj.isType(aa, AB)], ['aaa !isType AAB', !sj.isType(aaa, AAB)], // COUSINS
  ['aa !isType BA', !sj.isType(aa, BA)], // INSTANCES
  ['a.constructor === A', a.constructor === A], ['aa.constructor === AA', aa.constructor === AA], ['aaa.constructor === AAA', aaa.constructor === AAA], // MAKE CLASS FUNCTIONS
  ['called constructorParts', calledConstructorParts], ['called beforeInitialize', calledBeforeInitialize], ['called afterInitialize', calledAfterInitialize], ['called prototypeProperties', calledPrototypeProperties], ['called staticProperties', calledStaticProperties], ['did not call extraFunction', !calledExtraFunction], // PROPERTIES EXIST
  ['a before property', a.hasOwnProperty('beforeFoo')], ['a default property', a.hasOwnProperty('defaultFoo')], ['a after property', a.hasOwnProperty('afterFoo')], ['A.prototype property', Object.getPrototypeOf(a).hasOwnProperty('prototypeFoo')], ['A static property', A.hasOwnProperty('staticFoo')], // PROPERTY INHERITANCE
  //! before and after will generate new instances, even if function is inherited
  ['aa.beforeFoo === a.beforeFoo', aa.beforeFoo !== undefined && aa.beforeFoo !== a.beforeFoo], ['aa.defaultFoo === a.defaultFoo', aa.defaultFoo === a.defaultFoo], ['aa.afterFoo === a.afterFoo', aa.defaultFoo !== undefined && aa.afterFoo !== a.afterFoo], ['AA.prototype foo === A.prototype foo', AA.prototype.prototypeFoo === A.prototype.prototypeFoo], ['AA static foo === A static foo', AA.staticFoo === A.staticFoo], // PROPERTY EXTENSION
  ['aa.beforeFoo2 exists', aa.afterFoo2 !== undefined && aa.afterFoo2 !== aa.afterFoo], ['aa.defaultFoo2 exists', aa.defaultFoo2 !== undefined && aa.defaultFoo2 !== aa.defaultFoo], ['aa.afterFoo2 exists', aa.afterFoo2 !== undefined && aa.beforeFoo2 !== aa.beforeFoo], ['AA.prototype foo2 exists', AA.prototype.prototypeFoo2 !== undefined && AA.prototype.prototypeFoo2 !== AA.prototype.prototypeFoo], ['AA static foo2 exists', AA.staticFoo2 !== undefined && AA.staticFoo2 !== AA.staticFoo], // PROPERTY OVERWRITE
  ['ab.beforeFoo exists and !== a.beforeFoo', ab.beforeFoo !== undefined && ab.beforeFoo !== a.beforeFoo], ['ab.defaultFoo exists and !== a.defaultFoo', ab.defaultFoo !== undefined && ab.defaultFoo !== a.defaultFoo], ['ab.afterFoo exists and !== a.afterFoo', ab.afterFoo !== undefined && ab.afterFoo !== a.afterFoo], ['AB.prototype foo exists !== B.prototype foo', AB.prototype.prototypeFoo !== undefined && AB.prototype.prototypeFoo !== A.prototype.prototypeFoo], ['AB static foo exists !== A static foo', AB.staticFoo !== undefined && AB.staticFoo !== A.staticFoo], // AUGMENT CLASS
  ['c2.beforeBar exists and !== c.beforeBar', c2.beforeBar !== undefined && c2.beforeBar !== c.beforeBar], ['c2.defaultBar exists and !== c.defaultBar', c2.defaultBar !== undefined && c2.defaultBar !== c.defaultBar], ['c2.afterBar exists and !== c.afterBar', c2.afterBar !== undefined && c2.afterBar !== c.afterBar], ['c.constructor.prototype === c2.constructor.prototype', Object.getPrototypeOf(c) === Object.getPrototypeOf(c2)], ['c.constructor === c2.constructor', c.constructor === c2.constructor], // PASSED OPTIONS
  ['a.passedFoo !== a2.passedFoo', a.passedFoo !== a2.passedFoo], ['undefined default', !a.hasOwnProperty('undefinedFoo')], ['undeclared default', !a.hasOwnProperty('undeclaredFoo')], ['undefined option', !a.hasOwnProperty('undefinedFoo')]], 'sj.Base Classes');
}; // ERROR


sj.Error = sj.Base.makeClass('Error', sj.Base, {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      log: true,
      //TODO remove log: true from errors
      code: 400,
      type: 'Bad Request'
    }
  })
});
sj.ErrorList = sj.Base.makeClass('ErrorList', sj.Error, {
  constructorParts: parent => ({
    //C wrapper for an array with one or more errors
    defaults: {
      // OVERWRITE
      reason: 'one or more errors occurred with items',
      content: []
    }
  })
}); // CUSTOM ERROR

sj.SilentError = sj.Base.makeClass('SilentError', sj.Error, {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      log: false
    }
  })
});
sj.AuthRequired = sj.Base.makeClass('AuthRequired', sj.Error, {
  //C used to communicate to client that the server does not have the required tokens and that the client must authorize
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      message: 'authorization required'
    }
  })
});
sj.Unreachable = sj.Base.makeClass('Unreachable', sj.Error, {
  //C used to indicate an unreachable place in the code
  constructorParts: parent => ({
    defaults: {
      message: 'code reached a place that should be unreachable'
    }
  })
});
sj.Timeout = sj.Base.makeClass('Timeout', sj.Error, {
  //C used to indicate a timed-out function
  constructorParts: parent => ({
    defaults: {
      message: 'request timed out'
    }
  })
}); // RULE

sj.Rule = sj.Base.makeClass('Rule', sj.Base, {
  //G//! arrow functions may be used to shorten object returns, however they should must not use 'this'
  constructorParts: parent => ({
    //G//! 'this' refers to the static class inside constructorParts(), however 'this' refers to the instance inside before/afterInitialize()
    defaults: {
      // NEW
      valueName: 'input',
      trim: false,
      dataTypes: ['string'],
      min: 0,
      max: Infinity,
      //! remember to set useAgainst: true, if passing a value2 to use
      useAgainst: false,
      //C this is a reference value and should not be able to be equal to anything,
      //R this is to prevent a user from somehow passing in boolean false, thus making it equal to the against value and passing a password check
      againstValue: {},

      get againstMessage() {
        //! this reveals password2 when checking two passwords - simply overwrite this get function to a custom message
        let againstValueName = this.againstValue; //C join array of values if matching against multiple values

        if (Array.isArray(this.againstValue)) {
          againstValueName = this.againstValue.join(', ');
        }

        return `${this.valueName} did not match against these values: ${againstValueName}`;
      },

      //! remember to set useFilter: true, if passing a value2 to use
      useFilter: false,
      //C match nothing //TODO verify this
      //L https://stackoverflow.com/questions/2930182/regex-to-not-match-any-characters
      filterExpression: '\\b\\B',
      filterRequirements: 'none',

      get filterMessage() {
        return `${this.valueName} did not meet these requirements: ${this.filterRequirements}`;
      },

      custom: undefined
    }
  }),
  prototypeProperties: parent => ({
    //TODO how to deal with returning the password field since its sensitive
    async checkType(value) {
      //C check against each datatype
      for (let i = 0; i < this.dataTypes.length; i++) {
        if (sj.isType(value, this.dataTypes[i])) {
          return new sj.Success({
            origin: `${this.origin}.checkType()`,
            message: 'validated data type',
            content: value
          });
        } //C parse strings for numbers


        if (sj.isType(value, String)) {
          let parsed = Number.parseFloat(value);

          if (this.dataTypes[i] === 'number' && !Number.isNaN(parsed) || this.dataTypes[i] === 'integer' && Number.isInteger(parsed)) {
            return new sj.Success({
              origin: `${this.origin}.checkType()`,
              message: 'validated data type',
              content: parsed
            });
          } //TODO parse strings for boolean & symbols & other?

        }
      } //C throw if no matches


      throw new sj.Error({
        log: true,
        origin: `${this.origin}.checkType()`,
        message: `${this.valueName} must be a ${this.dataTypes.join(' or ')}`,
        content: value
      });
    },

    async checkSize(value) {
      let m = `${this.valueName} must be between ${this.min} and ${this.max}`;

      if (sj.isType(value, String)) {
        //C string length
        if (!(value.length >= this.min && value.length <= this.max)) {
          throw new sj.Error({
            log: true,
            origin: `${this.origin}.checkSize()`,
            message: `${m} characters long`,
            content: value
          });
        }
      } else if (sj.isType(value, Number)) {
        //C number size
        if (!(value >= this.min && value <= this.max)) {
          throw new sj.Error({
            log: true,
            origin: `${this.origin}.checkSize()`,
            message: `${m} items long`,
            content: value
          });
        }
      }

      return new sj.Success({
        origin: `${this.origin}.checkSize()`,
        content: value
      });
    },

    async checkAgainst(value, value2) {
      //C custom againstValue
      if (!sj.isType(value2, undefined)) {
        this.againstValue = value2;
      }

      if (Array.isArray(this.againstValue)) {
        //C arrays
        //R indexOf apparently uses === so this should be fine
        //L https://stackoverflow.com/questions/44172530/array-indexof-insensitive-data-type
        if (this.againstValue.indexOf(value) === -1) {
          throw new sj.Error({
            log: true,
            origin: `${this.origin}.checkAgainst() array`,
            message: this.againstMessage,
            content: value
          });
        }
      } else {
        //C base value
        if (!(value === this.againstValue)) {
          throw new sj.Error({
            log: true,
            origin: `${this.origin}.checkAgainst() non-array`,
            message: this.againstMessage,
            content: value
          });
        }
      }

      return new sj.Success({
        origin: `${this.origin}.checkAgainst()`,
        content: value
      });
    },

    async checkFilter(value, value2) {
      //C custom againstValue
      if (sj.isType(value2, undefined)) {
        this.filterExpression = value2;
      } //TODO


      return new sj.Success({
        origin: `${this.origin}.checkAgainst()`,
        content: value
      });
    },

    async checkCustom(value) {
      if (typeof this.custom === 'function') {
        return this.custom(value);
      } else {
        return new sj.Success({
          origin: `${this.origin}.checkCustom()`,
          content: value
        });
      }
    },

    /* //OLD
    	//TODO //! convert this.dataType to this.dataTypes forEach loop if re implementing this as in checkType()
    	checkType(value) {
    		let t = sj.typeOf(value);
    				//C if value is a string and dataType is a number or integer
    				if (this.dataType === 'number' && t === 'string') {
    			//C	try to parse the string and check if it is a number
    			//L	https://www.w3schools.com/jsref/jsref_parsefloat.asp
    			let p = parseFloat(value);
    			if (!Number.isNaN(p)) {
    				//C if so, convert it to the parsed number and return
    				value = p;
    				return true;
    			}
    			return false;
    		}
    		if (this.dataType === 'integer') {
    			if (t === 'string') {
    				let p = parseInt(value);
    				if (Number.isInteger(p)) {
    					value = p;
    					return true;
    				}
    				return false;
    			}
    					// if not a string, just see if its an integer
    			return Number.isInteger(value);
    		}
    				return t === this.dataType;
    	}
    	checkSize(value) {
    		if (sj.typeOf(value) === 'string' || sj.typeOf(value) === 'array') {
    			return value.length >= this.min && value.length <= this.max;
    		} else if (sj.typeOf(value) === 'number') {
    			return value >= this.min && value <= this.max;
    		} else {
    			return true;
    		}
    	}	
    	checkAgainst(value, value2) {
    		// allow custom check against value
    		if (sj.typeOf(value2) !== 'undefined') {
    			this.againstValue = value2;
    		}
    				if (Array.isArray(this.againstValue)) {
    			return this.againstValue.indexOf(value) !== -1;
    		} else {
    			//! no type coercion
    			return value === this.againstValue;
    		}
    	}	
    	checkFilter(value, value2) {
    		//TODO regex, similar to checkAgainst
    		return true;
    	}
    */
    //! validation and type conversion (and //TODO security, and database checks) are all part of this Rules check
    //TODO should sj.Rule be exposed in globals if it contains the security checks? is that safe? - ideally, database checks should also be implemented so 'name already taken' errors show up at the same time basic validation errors do. Basically theres three waves in most cases - isLoggedIn (ok to be in a separate wave because it should rarely happen, and assumes the user knows what they're doing except being logged in - or would this be useful in the same wave too?), basic validation, database validation. < SHOULD ALL VALIDATION CHECKS BE IN ONE WAVE?
    //! to use the possibly modified value from check(), set the input value to equal the result.content
    async check(value, value2) {
      //L Guard Clauses: https://medium.com/@scadge/if-statements-design-guard-clauses-might-be-all-you-need-67219a1a981a
      //C Guard clauses (for me) should be positively-phrased conditions - but wrapped in a single negation: if(!(desiredCondition)) {}
      //C trim
      if (this.trim && sj.isType(value, String)) {
        value = value.trim();
      } //C checks & possibly modifies


      value = await this.checkType(value).then(sj.content); //R no need to catch and return the content as it will be in the thrown error anyways

      await this.checkSize(value);

      if (this.useAgainst) {
        await this.checkAgainst(value, value2);
      }

      if (this.useFilter) {
        await this.checkFilter(value, value2);
      }

      if (typeof this.custom === 'function') {
        await this.checkCustom(value);
      }
      /*
      	if (!this.checkType(value)) {
      		throw new sj.Error({
      			log: this.log,
      			origin: this.origin,
      			message: `${this.valueName} must be a ${this.dataType}`,
      		})
      	}
      	if (this.trim && sj.typeOf(value) === 'string') {
      		value = value.trim();
      	}
      
      	if (!this.checkSize(value)) {
      		let message = `${this.valueName} must be between ${this.min} and ${this.max}`;
      		if (sj.typeOf(value) === 'string') {
      			message = `${message} characters long`;
      		} else if (sj.typeOf(value) === 'array') {
      			message = `${message} items long`;
      		}
      				throw new sj.Error({
      			log: this.log,
      			origin: this.origin,
      			message: message,
      		});
      	}
      	if (this.useAgainst && !this.checkAgainst(value, value2)) {
      		throw new sj.Error({
      			log: this.log,
      			origin: this.origin,
      			message: this.againstMessage,
      		});
      	}
      	if (this.useFilter && !this.checkFilter(value, value2)) {
      		throw new sj.Error({
      			log: this.log,
      			origin: this.origin,
      			message: this.filterMessage,
      		});
      	}
      */
      //C remove error-related properties


      this.target = undefined; //TODO consider inputCorrect styling

      this.cssClass = undefined;
      this.content = value; //C transform object (this will strip any irrelevant properties away)

      return new sj.Success(this);
    }
    /* //OLD decided this was redundant
    	//C checks an object's property and possibly modify it, this is done so that properties can be passed and modified by reference for lists
    	//? this may not be needed over check(), see sj.Rule.checkRuleSet() in global-server.js
    	async checkProperty(obj, prop, value2) {
    		//C validate arguments
    		if (!sj.isType(obj, 'object')) {
    			throw new sj.Error({
    				log: true,
    				origin: 'sj.Rule.checkProperty()',
    				message: 'validation error',
    				reason: `sj.Rule.checkProperty()'s first argument is not an object`,
    				content: obj,
    			});
    		}
    		if (!prop in obj) {
    			//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
    			throw new sj.Error({
    				log: true,
    				origin: 'sj.Rule.checkProperty()',
    				message: 'validation error',
    				reason: `sj.Rule.checkProperty()'s object argument is missing a '${prop}' property`,
    				content: obj,
    			});
    		}
    				//C check rules
    		let result = this.check(obj[prop], value2).catch(rejected => {
    			//C throw error if failed 
    			//! do not modify the original property, so that sj.Error.content is not relied upon to always be the original property
    			throw sj.propagate(rejected);
    		});
    				//C modify and return if successful
    		obj[prop] = result.content;
    		return result;
    	}
    */

    /* //OLD, new check ruleset was created in global-server.js
    	static async checkRuleSet(ruleSet) {
    		//C takes a 2D array of [[sj.Rule, obj, propertyName, value2(optional)], [], [], ...]
    		return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => {
    			//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    					//C validate arguments
    			if (!rules instanceof this) {
    				return new sj.Error({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() is missing a sj.Rule object`,
    					content: rules,
    				});
    			}
    					//C check, return errors too
    			return await rules.checkProperty(obj, prop, value2).catch(sj.andResolve);
    		})).then(resolved => {
    			//C filter for sj.Success objects
    			return sj.filterList(resolved, sj.Success, new sj.Success({
    				origin: 'sj.Rule.checkRuleSet()',
    				message: 'all rules validated',
    			}), new sj.Error({
    				origin: 'sj.Rule.checkRuleSet()',
    				message: 'one or more issues with rules',
    				reason: 'validation functions returned one or more errors',
    			}));
    		}).catch(rejected => {
    			throw sj.propagate(rejected);
    		});
    	}
    */

    /* //OLD
    	//! checkRuleSet takes a reference object and the property name, value modification is then done automatically
    	static async checkRuleSet(ruleSet) {
    		//C takes a 2D array of [[sj.Rule, obj, propertyName, value2(optional)], [], [], ...]
    				return Promise.all(ruleSet.map(async ([rules, obj, prop, value2]) => { 
    			//L destructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    					//C validate arguments
    			if (!(rules instanceof sj.Rule)) {
    				//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
    				//? is it possible to dynamically get this class
    				return new sj.Error({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() is missing a sj.Rule object`,
    					content: rules,
    				});
    			}
    			if (!(typeof obj === 'object' && sj.typeOf(obj) !== 'null')) {
    				//R cannot use just sj.typeOf(obj) here because it won't properly recognize any 'object'
    				return new sj.Error({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() is missing an object argument`,
    					content: obj,
    				});
    			}
    			if (!(prop in obj)) {
    				//L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
    				return new sj.Error({
    					log: true,
    					origin: 'checkRuleSet()',
    					message: 'validation error',
    					reason: `checkRuleSet() obj is missing a '${prop}' property`,
    					content: obj,
    				});
    			}
    					let result = new sj.Error(); //? why is this here
    					//C call check() with 1 or 2 values
    			if (sj.typeOf(value2) === 'undefined') {
    				result = await rules.check(obj[prop]).then(sj.sj.andResolve());
    			} else {
    				result = await rules.check(obj[prop], value2).then(sj.sj.andResolve());
    			}
    					//C pass the possibly modified value back to the original object
    			obj[prop] = result.content;
    					return result;
    		})).then(resolved => {
    			return sj.filterList(resolved, sj.Success, new sj.Success({
    				origin: 'checkRuleSet()',
    				message: 'all rules validated',
    			}), new sj.Error({
    				origin: 'checkRuleSet()',
    				message: 'one or more issues with fields',
    				reason: 'validation functions returned one or more errors',
    			}));
    		}).catch(rejected => {
    			throw sj.propagate(rejected);
    		});
    	}
    */


  }),
  staticProperties: parent => ({
    //! string to be hashed must not be greater than 72 characters (//? or bytes???),
    stringMaxLength: 100,
    bigStringMaxLength: 2000,
    nameMinLength: 3,
    nameMaxLength: 16,
    defaultColor: '#ffffff',
    visibilityStates: ['public', 'private', 'linkOnly']
  })
});
sj.Rule.augmentClass({
  //C add custom sj.Rules as statics of sj.Rule
  staticProperties: parent => ({
    none: new sj.Rule({
      origin: 'noRules',
      message: 'value validated',
      valueName: 'Value',
      dataTypes: ['string', 'number', 'boolean', 'array'] //TODO etc. or just make functionality for this

    }),
    posInt: new sj.Rule({
      origin: 'positiveIntegerRules',
      message: 'number validated',
      valueName: 'Number',
      dataTypes: ['integer']
    }),
    id: new sj.Rule({
      origin: 'idRules',
      message: 'id validated',
      valueName: 'id',
      dataTypes: ['integer']
    }),
    image: new sj.Rule({
      origin: 'imageRules',
      message: 'image validated',
      target: 'playlistImage',
      cssClass: 'inputError',
      valueName: 'image',
      trim: true,
      max: sj.Rule.bigStringMaxLength,
      // TODO filter: ___,
      filterMessage: 'Image must be a valid url'
    }),
    color: new sj.Rule({
      origin: 'colorRules',
      message: 'color validated',
      target: 'playlistColor',
      cssClass: 'inputError',
      valueName: 'color',
      trim: true,
      filter: '/#([a-f0-9]{3}){1,2}\b/',
      //TODO is this correct?
      filterMessage: 'Color must be in hex format #XXXXXX'
    }),
    visibility: new sj.Rule({
      origin: 'visibilityRules',
      message: 'visibility validated',
      target: 'playlistVisibility',
      cssClass: 'inputError',
      valueName: 'Visibility',
      useAgainst: true,
      againstValue: sj.Rule.visibilityStates,
      againstMessage: 'please select a valid visibility level'
    }),
    //TODO other / old
    //? not sure what these were used for
    self: new sj.Rule({
      origin: 'selfRules',
      message: 'self validated',
      target: 'notify',
      cssClass: 'notifyError',
      valueName: 'Id',
      dataTypes: ['integer'],
      useAgainst: true,
      //! ctx.session.user.id shouldn't be used here because there is no guarantee ctx.session.user exists
      againstMessage: 'you are not the owner of this'
    }),
    setPassword: new sj.Rule({
      origin: 'setPasswordRules',
      message: 'password validated',
      target: 'registerPassword',
      cssClass: 'inputError',
      valueName: 'Password',
      min: 6,
      max: 72,
      //! as per bcrypt
      useAgainst: true,

      get againstMessage() {
        return 'Passwords do not match';
      }

    })
  })
});
sj.Rule2 = sj.Base.makeClass('Rule2', sj.Base, {
  constructorParts: parent => ({
    beforeInitialize(accessory) {
      if (typeof accessory.options.baseValidate !== 'function' || typeof accessory.options.baseCast !== 'function') throw new sj.Error({
        origin: 'sj.Rule2.beforeInit()',
        reason: 'baseValidate or baseCast is not a function',
        content: sj.image(accessory.options)
      });
    },

    defaults: {
      //G baseValidate() and baseCast() may be synchronous or async, the caller should know which. But if it doesn't, call with await, as it wont affect the result of synchronous functions.
      //G baseValidate() should have one or many, sequential and/or parallel conditions that do nothing if passed and throw a specific error (with placeholders) if failed, this error should be SilentError/log: false, as it is caught and processed in validate()
      baseValidate(value, accessory) {
        throw new sj.SilentError({
          origin: 'sj.Rule2.baseValidate()',
          reason: `a baseValidate() function has not been created for this rule: ${this.name}`
        });
      },

      //G baseCast() should have one or more sequential casting functions (which may error freely) that modify accessory.castValue
      //G baseCast() may use other rule's casting methods. but because they have their own internal casting steps, pass the castValue and the accessory object so that even if the casting function fails, the castValue will still retain any modifications: rule.validateCast(accessory.castValue, accessory); 
      //R this is important because otherwise the casting method will just fail, leaving the castValue as the original, causing unexpected error messages (casting '4' as an integer would fail with 'not a number' instead of 'not an integer' because first the number casting would fail, leaving the castValue as a string, then validation would return the 'not a number' error).
      baseCast(accessory) {
        new sj.Warn({
          log: true,
          origin: 'sj.Rule2.baseCast()',
          reason: `a baseCast() function has not been created for this rule: ${this.name}`
        });
      },

      //C string or array of strings used to replace $0, $1, $2... of specific properties (reason and message so far) of an error and it's content errors if error is an ErrorList
      fill: 'Value'
    },

    afterInitialize() {
      //C baseValidate and baseCast are guaranteed to be functions, this distinguishes between 'Function' and 'AsyncFunction'
      const isValidateSync = this.baseValidate.constructor.name === 'Function';
      const isCastSync = this.baseCast.constructor.name === 'Function'; //C try-catch blocks are used for both async and sync to increase clarity

      if (isValidateSync) {
        //C calls baseValidate(), returns value on pass, throws a processed error on fail
        this.validate = function (value, accessory = {}) {
          try {
            this.baseValidate(value, accessory);
            return value;
          } catch (e) {
            throw this.processError(e, accessory);
          }
        }; //C calls validate but instead returns true on pass and false on error


        this.check = function (value, accessory = {}) {
          try {
            this.validate(value, accessory);
            return true;
          } catch (e) {
            return false;
          }
        };
      } else {
        this.validate = async function (value, accessory = {}) {
          try {
            await this.baseValidate(value, accessory);
            return value;
          } catch (e) {
            throw this.processError(e, accessory);
          }
        };

        this.check = async function (value, accessory = {}) {
          try {
            await this.validate(value, accessory);
            return true;
          } catch (e) {
            return false;
          }
        };
      }

      if (isValidateSync && isCastSync) {
        //C validate that uses the value from cast() instead of the original value, also returns the cast value
        this.validateCast = function (value, accessory = {}) {
          //C Casted values are stored on the accessory object so that upon error, the last successfully cast value can be used. 
          //R This removes the need to write a bunch of try/catch blocks inside the baseCast method.
          //R cast() was originally it's own function, however it was moved into validateCast() because it wasn't supposed to be used on its own as the casted value wasn't guaranteed to be correctly cast without throwing an error, as some values cannot be cast (negative to positive) it would've involved just re-validating the cast inside the function which is redundant.
          //C The castValue starts as the original value.
          accessory.castValue = value;

          try {
            //C Don't throw upon baseCast() error, just use the last successful castValue and apply the respective validate() error.

            /* //R 
            	why not just throw the error and forget about the last successfully cast value?
            	
            	casting errors aren't very user friendly (because the user won't know what cast means), so just delegate the error handling to whats already written in the validate function
            	
            	Example: while '2.35' can be cast to the number, it cannot (in this example) be cast to an integer. the validator will throw 'number is not an integer' for this STRING, rather than having cast throw 'cannot cast number to integer'.
            */
            this.baseCast(accessory);
          } catch (e) {}

          ;

          try {
            return this.validate(accessory.castValue, accessory);
          } catch (e) {
            throw this.processError(e, accessory);
          }
        }; //C same as check(), just uses validateCast() instead of validate()


        this.checkCast = function (value, accessory = {}) {
          try {
            this.validateCast(value, accessory);
            return true;
          } catch (e) {
            return false;
          }
        };
      } else {
        this.validateCast = async function (value, accessory = {}) {
          accessory.castValue = value;

          try {
            await this.baseCast(accessory);
          } catch (e) {}

          ;

          try {
            return await this.validate(accessory.castValue, accessory);
          } catch (e) {
            throw this.processError(e, accessory);
          }
        };

        this.checkCast = async function (value, accessory = {}) {
          try {
            await this.validateCast(value, accessory);
            return true;
          } catch (e) {
            return false;
          }
        };
      }
    }

  }),

  prototypeProperties(parent) {
    //C name property is tied to the rule-instance's key inside sj.Rule2, otherwise undefined
    Object.defineProperty(this, 'name', {
      get() {
        return Object.keys(this.constructor).find(key => this.constructor[key] === this);
      }

    });
    return {
      fillError(error, fill) {
        //C replace placeholders
        sj.any(fill).forEach((item, index) => {
          const string = String(item);
          error.reason = error.reason.replace(`$${index}`, string);
          error.message = error.message.replace(`$${index}`, string);
        });
      },

      processError(targetError, {
        fill = this.fill,
        error,
        origin
      }) {
        //C may receive custom fill, error, and origin fields from accessory at call invocation
        //C fill error
        this.fillError(targetError, fill); //C if ErrorList

        if (sj.isType(targetError, sj.ErrorList)) {
          //C fill each item
          for (const listError of targetError.content) {
            this.fillError(listError, fill);
          }
        }

        throw new sj.Error({ ...targetError,
          //C custom properties //! will overwrite any filled properties
          ...error,
          //C fixed properties
          origin
        });
      }

    };
  }

});
sj.Rule2.augmentClass({
  staticProperties: parent => ({
    // STRING
    string: new sj.Rule2({
      baseValidate(value) {
        if (!sj.isType(value, String)) throw new sj.SilentError({
          origin: 'sj.Rule2.string.baseValidate()',
          reason: '$0 is not a string',
          message: '$0 must be text.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        //C a failed stringify can still be turned in to a string
        if (typeof accessory.castValue === 'object') {
          try {
            accessory.castValue = JSON.stringify(accessory.castValue);
          } catch (e) {}
        }

        accessory.castValue = String(accessory.castValue);
      }

    }),
    trimmed: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.string.validate(value); //TODO ensure that this regExp checks for all possible white space
        //L from the trim() polyfill at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

        if (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g.test(value)) throw new sj.SilentError({
          origin: 'sj.Rule2.trimmed.baseValidate()',
          reason: '$0 is not trimmed',
          message: '$0 must not have any leading or trailing whitespace.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.string.validateCast(accessory.castValue, accessory);
        accessory.castValue = accessory.castValue.trim();
      }

    }),
    nonEmptyString: new sj.Rule2({
      //C string has any non-whitespace characters
      baseValidate(value) {
        sj.Rule2.string.validate(value);
        if (value.trim() === '') throw new sj.SilentError({
          origin: 'sj.Rule2.nonEmptyString.baseValidate()',
          reason: '$0 is empty or only has whitespace',
          message: '$0 must not be empty.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.string.validateCast(accessory.castValue, accessory); //! cannot cast any further than a string
      }

    }),
    // NUMBER
    number: new sj.Rule2({
      baseValidate(value) {
        if (!sj.isType(value, Number)) throw new sj.SilentError({
          origin: 'sj.Rule2.number.baseValidate()',
          reason: '$0 is not a number',
          message: '$0 must be a number.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        //C parse strings for floats
        //! do not cast to NaN
        const n = Number.parseFloat(accessory.castValue);
        if (!Number.isNaN(n)) accessory.castValue = n;
      }

    }),
    nonNaNNumber: new sj.Rule2({
      baseValidate(value) {
        if (!sj.isType(value, Number) || Number.isNaN(value)) throw new sj.SilentError({
          origin: 'sj.Rule2.nonNaNNumber.baseValidate()',
          reason: '$0 is not a number or is NaN',
          message: '$0 must be a number.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.number.validateCast(accessory.castValue, accessory); //! don't cast NaN to a non-NaN number
      }

    }),
    nonNegativeNumber: new sj.Rule2({
      baseValidate(value) {
        //L don't worry about NaN here: https://stackoverflow.com/a/26982925
        sj.Rule2.number.validate(value);
        if (value < 0) throw new sj.SilentError({
          origin: 'sj.Rule2.nonNegativeNumber.baseValidate()',
          reason: '$0 is negative',
          message: '$0 must not be negative.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.number.validateCast(accessory.castValue, accessory); //! don't cast negative number to a non-negative number
      }

    }),
    nonPositiveNumber: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.number.validate(value);

        if (0 < value) {
          throw new sj.SilentError({
            origin: 'sj.Rule2.nonPositiveNumber.baseValidate()',
            reason: '$0 is positive',
            message: '$0 must not be positive.',
            content: sj.image(value)
          });
        }
      },

      baseCast(accessory) {
        sj.Rule2.number.validateCast(accessory.castValue, accessory); //! don't cast positive number to a non-positive number
      }

    }),
    positiveNumber: new sj.Rule2({
      baseValidate(value) {
        //L don't worry about NaN here: https://stackoverflow.com/a/26982925
        sj.Rule2.number.validate(value);
        if (value <= 0) throw new sj.SilentError({
          origin: 'sj.Rule2.positiveNumber.baseValidate()',
          reason: '$0 is negative or 0',
          message: '$0 must be positive.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.number.validateCast(accessory.castValue, accessory); //! don't cast non-positive number to a positive number
      }

    }),
    negativeNumber: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.number.validate(value);
        if (0 <= value) throw new sj.SilentError({
          origin: 'sj.Rule2.negativeNumber.baseValidate()',
          reason: '$0 is positive or 0',
          message: '$0 must be negative.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.number.validateCast(accessory.castValue, accessory); //! don't cast non-negative number to a negative number
      }

    }),
    // INTEGER
    integer: new sj.Rule2({
      baseValidate(value) {
        //L don't worry about NaN here: https://stackoverflow.com/a/26982925
        sj.Rule2.number.validate(value);
        if (!Number.isInteger(value)) throw new sj.SilentError({
          origin: 'sj.Rule2.integer.baseValidate()',
          reason: '$0 is not an integer',
          message: '$0 must be an integer.',
          content: sj.image(value)
        });
      },

      baseCast(accessory) {
        sj.Rule2.number.validateCast(accessory.castValue, accessory); //C chops any decimal off of floats
        //! this may give misleading errors, as the value will no longer fail because it's not an integer but because it's chopped value fails some other condition

        accessory.castValue = Number.parseInt(accessory.castValue);
      }

    }),
    nonNegativeInteger: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.nonNegativeNumber.validate(value);
        sj.Rule2.integer.validate(value);
      },

      baseCast(accessory) {
        sj.Rule2.nonNegativeNumber.validateCast(accessory.castValue, accessory);
        sj.Rule2.integer.validateCast(accessory.castValue, accessory);
      }

    }),
    nonPositiveInteger: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.nonPositiveNumber.validate(value);
        sj.Rule2.integer.validate(value);
      },

      baseCast(accessory) {
        sj.Rule2.nonPositiveNumber.validateCast(accessory.castValue, accessory);
        sj.Rule2.integer.validateCast(accessory.castValue, accessory);
      }

    }),
    positiveInteger: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.positiveNumber.validate(value);
        sj.Rule2.integer.validate(value);
      },

      baseCast(accessory) {
        sj.Rule2.positiveNumber.validateCast(accessory.castValue, accessory);
        sj.Rule2.integer.validateCast(accessory.castValue, accessory);
      }

    }),
    negativeInteger: new sj.Rule2({
      baseValidate(value) {
        sj.Rule2.negativeNumber.validate(value);
        sj.Rule2.integer.validate(value);
      },

      baseCast(accessory) {
        sj.Rule2.negativeNumber.validateCast(accessory.castValue, accessory);
        sj.Rule2.integer.validateCast(accessory.castValue, accessory);
      }

    })
  })
}); // SUCCESS //C success and error objects are returned from functions (mostly async ones)

sj.Success = sj.Base.makeClass('Success', sj.Base, {
  constructorParts: parent => ({
    defaults: {
      // NEW
      timestamp: undefined
    }
  })
});
sj.SuccessList = sj.Base.makeClass('SuccessList', sj.Success, {
  constructorParts: parent => ({
    //C wrapper for an array of successful items
    defaults: {
      // OVERWRITE
      reason: 'all items successful',
      content: []
    }
  })
});
sj.Warn = sj.Base.makeClass('Warn', sj.Success, {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      log: true
    }
  })
});
sj.Credentials = sj.Base.makeClass('Credentials', sj.Success, {
  constructorParts: parent => ({
    //TODO allowUnknown: true,
    defaults: {
      //TODO this part should only be server-side 
      //TODO consider finding a way to delete these properties if they aren't passed in so that Object.assign() can work without overwriting previous values with empty defaults, at the moment im using a plain object instead of this class to send credentials
      authRequestKey: Symbol(),
      //! this shouldn't break sj.checkKey(), but also shouldn't match anything
      authRequestTimestamp: 0,
      authRequestTimeout: 300000,
      //C default 5 minutes
      authRequestURL: '',
      authCode: Symbol(),
      accessToken: Symbol(),
      expires: 0,
      refreshToken: Symbol(),
      refreshBuffer: 60000,
      //C 1 minute //TODO figure out what the expiry time is for these apis and change this to a more useful value
      scopes: []
    }
  })
}); // ENTITIES

sj.Entity = sj.Base.makeClass('Entity', sj.Success, {
  constructorParts: parent => ({
    afterInitialize(accessory) {
      const that = this; //? is this necessary?

      this.filters = {};
      Object.keys(that.constructor.filters).forEach(key => {
        Object.defineProperties(that.filters, {
          [key]: {
            get: function () {
              return Object(_utility_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(that, that.constructor.filters[key]);
            }
          }
        });
      });
    },

    defaults: {
      // NEW
      id: undefined
    }
  }),

  staticProperties(parent) {
    // GETTER
    Object.defineProperty(this, 'table', {
      get: function () {
        return `${this.name.charAt(0).toLowerCase() + this.name.slice(1)}s`; //! lowercase, plural of name
      }
    });
    return {
      //TODO how to make these immutable?
      //C list of references to child classes, these should be added in the child's static constructor
      children: [],
      filters: {
        id: ['id']
      },

      //C automatically create new filters based on schema
      updateFilters() {
        let methodNames = ['add', 'get', 'edit', 'remove'];
        let types = ['in', 'out', 'check'];
        let schemaFilters = {};
        Object.keys(this.schema).forEach(key => {
          //C for each property
          methodNames.forEach(methodName => {
            //C for each crud method
            types.forEach(type => {
              //C for each filter type
              if (this.schema[key][methodName][type]) {
                //C if property is optional or required
                let filterName = methodName + type.charAt(0).toUpperCase() + type.slice(1); //C add it to the specific filter

                if (!schemaFilters[filterName]) schemaFilters[filterName] = [];
                schemaFilters[filterName].push(key);
              }
            });
          });
        });
        this.filters = { ...this.filters,
          ...schemaFilters
        };
      },

      tableToEntity(tableName) {
        const Entity = this.children.find(child => child.table === tableName);
        if (!sj.isType(new Entity(), sj.Entity)) throw new sj.Error({
          origin: 'sj.Entity.tableToEntity()',
          reason: `table is not recognized: ${tableName}`,
          content: tableName
        });
        return Entity; //R get requests should be a raw object, not an sj.Entity, because the queries are sensitive to extra/default information
        //R any metadata (table) should be sent separately (or implicitly) from the query
      }

    };
  }

}); // schema property states //TODO could these be static on sj.Entity and called via this.x ?

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
sj.User = sj.Base.makeClass('User', sj.Entity, {
  constructorParts: parent => ({
    defaults: {
      // NEW
      name: '',
      email: '',
      password: '',
      password2: '',
      spotifyRefreshToken: null,
      socketId: null
    }
  }),

  staticProperties(parent) {
    parent.children.push(this);
    this.schema = {
      //G 0 = unused, 1 = optional, 2 = required
      id: {
        columnName: 'id',
        rule: sj.Rule.id,
        add: auto,
        get: optional,
        edit: required,
        remove: required
      },
      name: {
        columnName: 'name',
        rule: new sj.Rule({
          origin: 'userNameRules',
          message: 'username validated',
          target: 'registerUserName',
          cssClass: 'inputError',
          valueName: 'Username',
          trim: true,
          min: sj.Rule.nameMinLength,
          max: sj.Rule.nameMaxLength
        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      email: {
        columnName: 'email',
        rule: new sj.Rule({
          origin: 'emailRules',
          message: 'email validated',
          target: 'registerEmail',
          cssClass: 'inputError',
          valueName: 'E-mail',
          trim: true,
          min: 3,
          max: sj.Rule.stringMaxLength //TODO useFilter: ___, filterMessage: ___, 
          //L https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      password: {
        columnName: 'password',
        rule: new sj.Rule({
          origin: 'passwordRules',
          message: 'password validated',
          target: 'registerPassword',
          cssClass: 'inputError',
          valueName: 'Password',
          min: 6,
          max: 72 //! as per bcrypt

        }),
        add: required,
        get: unused,
        edit: {
          in: true,
          out: false,
          check: 1
        },
        remove: unused
      },
      spotifyRefreshToken: {
        columnName: 'spotifyRefreshToken',
        rule: new sj.Rule({
          origin: 'spotifyRefreshTokenRules',
          message: 'token validated',
          valueName: 'Token' //TODO empty for now

        }),
        add: unused,
        get: {
          in: false,
          out: true,
          check: 0
        },
        edit: optional,
        remove: unused
      }
    };
    this.updateFilters();
  }

});
sj.Playlist = sj.Base.makeClass('Playlist', sj.Entity, {
  constructorParts: parent => ({
    defaults: {
      // OVERWRITE
      content: [],
      //? is this required to be an array, tracks aren't stored here anymore
      // NEW
      userId: undefined,
      name: '',
      visibility: '',
      description: '',
      color: '',
      image: ''
    }
  }),

  staticProperties(parent) {
    parent.children.push(this);
    this.schema = {
      id: {
        columnName: 'id',
        rule: sj.Rule.id,
        add: auto,
        get: optional,
        edit: required,
        remove: required
      },
      userId: {
        columnName: 'userId',
        rule: sj.Rule.id,
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      name: {
        columnName: 'name',
        rule: new sj.Rule({
          origin: 'playlistNameRules()',
          message: 'name validated',
          target: 'playlistName',
          cssClass: 'inputError',
          valueName: 'Name',
          trim: true,
          min: sj.Rule.nameMinLength,
          max: sj.Rule.stringMaxLength
        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      description: {
        columnName: 'description',
        rule: new sj.Rule({
          origin: 'descriptionRules()',
          message: 'description validated',
          target: 'playlistDescription',
          cssClass: 'inputError',
          valueName: 'Description',
          max: sj.Rule.bigStringMaxLength,
          trim: true
        }),
        add: optional,
        get: optional,
        edit: optional,
        remove: unused
      },
      visibility: {
        columnName: 'visibility',
        rule: sj.Rule.visibility,
        add: optional,
        get: optional,
        edit: optional,
        remove: unused
      },
      image: {
        columnName: 'image',
        rule: sj.Rule.image,
        add: optional,
        get: optional,
        edit: optional,
        remove: unused
      },
      color: {
        columnName: 'color',
        rule: sj.Rule.color,
        add: optional,
        get: optional,
        edit: optional,
        remove: unused
      }
    };
    this.updateFilters();
  }

});
sj.Track = sj.Base.makeClass('Track', sj.Entity, {
  constructorParts: parent => ({
    beforeInitialize(accessory) {
      //C find existing source by track.source.name and set it as the reference
      if (sj.isType(accessory.options.source, Object)) {
        const found = sj.Source.instances.find(source => source.name === accessory.options.source.name);
        if (found) accessory.options.source = found;else new sj.Warn({
          origin: 'sj.Track.beforeInitialize()',
          reason: 'source was passed but it is not an existing source',
          content: accessory.options.source
        });
      }

      ;
    },

    defaults: {
      // NEW
      playlistId: null,
      position: null,
      source: null,
      //! before was sj.noSource, but this creates a circular reference error (only sometimes??)
      sourceId: null,
      // TODO assumes ids are unique, even across all sources
      artists: [],
      name: null,
      duration: null,
      //! cannot be 0 or else it will not trigger sj.isEmpty() and will actually be set as 0
      link: null
    }
  }),

  staticProperties(parent) {
    parent.children.push(this);
    this.schema = {
      id: {
        columnName: 'id',
        rule: sj.Rule.id,
        add: auto,
        get: optional,
        edit: required,
        remove: required
      },
      playlistId: {
        columnName: 'playlistId',
        rule: sj.Rule.id,
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      position: {
        columnName: 'position',
        rule: sj.Rule.posInt,
        add: optional,
        get: optional,
        edit: optional,
        remove: unused
      },
      name: {
        columnName: 'name',
        rule: new sj.Rule({
          origin: 'trackNameRules()',
          message: 'name validated',
          valueName: 'Name',
          trim: true,
          min: sj.Rule.nameMinLength,
          max: sj.Rule.stringMaxLength
        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      duration: {
        columnName: 'duration',
        rule: sj.Rule.posInt,
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      source: {
        columnName: 'source',
        rule: new sj.Rule({
          origin: 'sourceRules',
          message: 'source validated',
          valueName: 'Source',
          useAgainst: false,
          //TODO sourceList isn't populated in global.js, but main.js
          custom: function (value) {
            return sj.Source.instances.some(source => value === source.name);
          }
        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      sourceId: {
        columnName: 'sourceId',
        rule: new sj.Rule({
          origin: 'sourceIdRules',
          message: 'source id validated',
          valueName: 'Source ID' //? any source id rules (other than being a string)? length? trim?

        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      },
      artists: {
        columnName: 'artists',
        rule: new sj.Rule({
          origin: 'sj.Rules.artists',
          message: 'artists validated',
          valueName: 'Artists',
          dataTypes: ['array']
        }),
        add: required,
        get: optional,
        edit: optional,
        remove: unused
      }
    };
    this.updateFilters(); //G localMetadata is track properties that aren't derived from the source data, but instead created by the app or user. It must be preserved when using source data.

    this.filters.localMetadata = ['id', 'playlistId', 'position'];
  }

});
sj.Source = sj.Base.makeClass('Source', sj.Base, {
  constructorParts: parent => ({
    defaults: {
      // NEW
      name: undefined,
      //! source.name is a unique identifier
      nullPrefix: '',
      idPrefix: '',
      credentials: new sj.Credentials(),
      //TODO this should only be server-side
      api: {},
      scopes: [],
      authRequestManually: true,
      makeAuthRequestURL: function () {}
    },

    afterInitialize(accessory) {
      //C add source to static source list: sj.Source.instances
      this.constructor.instances.push(this);
    }

  }),
  staticProperties: parent => ({
    instances: [],

    find(name) {
      return this.instances.find(instance => instance.name === name);
    }

  })
}); // LIVE DATA

sj.LiveTable = sj.Base.makeClass('LiveTable', sj.Base, {
  constructorParts: parent => ({
    defaults: {
      Entity: undefined
    },

    afterInitialize() {
      Object.assign(this, {
        liveQueries: [],
        cachedEntities: []
      });
    }

  }),
  staticProperties: parent => ({
    makeTables(tableKeys) {
      return new Map(sj.Entity.children.map(Entity => [Entity, new this({
        Entity
      })]));
    }

  })
});
sj.CachedEntity = sj.Base.makeClass('CachedEntity', sj.Base, {
  constructorParts: parent => ({
    defaults: {
      table: undefined,
      entity: undefined
    },

    afterInitialize() {
      Object.assign(this, {
        liveQueryRefs: [],
        timestamp: 0
      });
    }

  })
});
sj.LiveQuery = sj.Base.makeClass('LiveQuery', sj.Base, {
  constructorParts: parent => ({
    beforeInitialize(accessory) {
      if (sj.isType(accessory.options.query, Array)) accessory.options.query = sj.any(accessory.options.query);
    },

    defaults: {
      table: undefined,
      query: undefined
    },

    afterInitialize() {
      Object.assign(this, {
        cachedEntityRefs: [],
        subscriptions: [],
        timestamp: 0
      });
    }

  })
});
sj.Subscription = sj.Base.makeClass('Subscription', sj.Base, {
  //? should this inherit from sj.Success since it will be returned from a function>
  constructorParts: parent => ({
    defaults: {
      liveQuery: undefined,

      onUpdate() {},

      //C any update
      onAdd() {},

      //C entities added
      onEdit() {},

      //C entities data changed
      onRemove() {} //C entities removed


    }
  })
});
/* harmony default export */ __webpack_exports__["default"] = (sj);

/***/ }),

/***/ "./public/js/polyfill.js":
/*!*******************************!*\
  !*** ./public/js/polyfill.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (Array.prototype.flat === undefined) {
  //L https://github.com/jonathantneal/array-flat-polyfill
  Object.defineProperties(Array.prototype, {
    flat: {
      configurable: true,
      value: function flat() {
        let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
        const stack = Array.prototype.slice.call(this);
        const result = [];

        while (depth && stack.length) {
          const next = stack.pop();

          if (Object(next) instanceof Array) {
            --depth;
            Array.prototype.push.apply(stack, next);
          } else {
            result.unshift(next);
          }
        }

        return result.concat(stack);
      },
      writable: true
    },
    flatMap: {
      configurable: true,
      value: function flatMap(callback) {
        return Array.prototype.map.apply(this, arguments).flat();
      },
      writable: true
    }
  });
}

/***/ }),

/***/ "./public/js/utility/array/any.js":
/*!****************************************!*\
  !*** ./public/js/utility/array/any.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
// Wraps a value in an array. If the value is already an array, its items get spread into a fresh one.

/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  return _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["array"].test(value) ? [...value] : [value];
});

/***/ }),

/***/ "./public/js/utility/array/async-map.js":
/*!**********************************************!*\
  !*** ./public/js/utility/array/async-map.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
// Executes an async function for each item in an array.
// When all async functions are settled, returns an array of results if all are fulfilled, but throws the array of results if any reject.
//G Callback takes same argument order as Array.map callback.
//! Can mutate the original array.
//TODO The semantics of this might not be correct - why would a mixed list of fulfilled and rejected values be useful? The rejected promises are also all caught so basic throws aren't useful. Maybe explicitly filtering out fulfillments from the thrown array would be better? To fix this would require going in and ensuring all uses work with this change.

/* harmony default export */ __webpack_exports__["default"] = (async function (array, callback) {
  // Validate.
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["array"].validate(array);
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["func"].validate(callback); // Wait for every promise to settle.

  const promises = array.map((item, index, self) => callback(item, index, self));
  const outcomes = await Promise.allSettled(promises); // Extract fulfillment and results.

  const allFulfilled = outcomes.every(outcome => outcome.status === 'fulfilled');
  const results = outcomes.map(outcome => outcome.status === 'fulfilled' ? outcome.value : outcome.reason); // Return fulfilled results or reject mixed results.

  if (allFulfilled) {
    return results;
  } else {
    throw results;
  }
});
;

/***/ }),

/***/ "./public/js/utility/array/dynamic-sort.js":
/*!*************************************************!*\
  !*** ./public/js/utility/array/dynamic-sort.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stable_sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stable-sort.js */ "./public/js/utility/array/stable-sort.js");
//TODO add validation
//TODO consider replacing typechecks with a 'comparable' rule.

/* harmony default export */ __webpack_exports__["default"] = (function (list, ascending, prop) {
  //C sorts a list in ascending or descending order by the numeric or string-converted value of its items or their properties if a prop is defined
  //C ascending will flip the list into descending if false
  if (ascending) {
    ascending = 1;
  } else {
    ascending = -1;
  }

  let compare;

  if (typeof prop === 'string') {
    //C if prop is defined, compare props
    if (list.every(item => typeof item[prop] === 'number' || typeof item[prop] === 'boolean')) {
      //C if values are numbers or boolean, do number compare
      compare = function (a, b) {
        return (a[prop] - b[prop]) * ascending;
      };
    } else {
      //C if values are strings, other, or mixed, do a string conversion and string compare
      compare = function (a, b) {
        //C convert to strings
        let as = a[prop] + '';
        let bs = b[prop] + ''; //C string compare
        //L https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

        return as.localeCompare(bs, 'en', {
          sensitivity: 'base'
        }) * ascending;
      };
    }
  } else {
    //C if no prop is defined, compare values
    //! this is the exact same as above, just without the property
    if (list.every(item => typeof item === 'number' || typeof item === 'boolean')) {
      compare = function (a, b) {
        return (a - b) * ascending;
      };
    } else {
      compare = function (a, b) {
        let as = a + '';
        let bs = b + '';
        return as.localeCompare(bs, 'en', {
          sensitivity: 'base'
        }) * ascending;
      };
    }
  }

  return Object(_stable_sort_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, compare);
});
;

/***/ }),

/***/ "./public/js/utility/array/index.js":
/*!******************************************!*\
  !*** ./public/js/utility/array/index.js ***!
  \******************************************/
/*! exports provided: any, asyncMap, dynamicSort, one, stableSort */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _any_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./any.js */ "./public/js/utility/array/any.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _any_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _async_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./async-map.js */ "./public/js/utility/array/async-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncMap", function() { return _async_map_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _dynamic_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-sort.js */ "./public/js/utility/array/dynamic-sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicSort", function() { return _dynamic_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _one_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./one.js */ "./public/js/utility/array/one.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "one", function() { return _one_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _stable_sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stable-sort.js */ "./public/js/utility/array/stable-sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return _stable_sort_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/***/ }),

/***/ "./public/js/utility/array/one.js":
/*!****************************************!*\
  !*** ./public/js/utility/array/one.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
// Returns the first item of an array, or the value otherwise.
//G If exactly one item is required, instead of undefined, use a validator.

/* harmony default export */ __webpack_exports__["default"] = (function (value) {
  return _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["array"].test(value) ? value[0] : value;
});

/***/ }),

/***/ "./public/js/utility/array/stable-sort.js":
/*!************************************************!*\
  !*** ./public/js/utility/array/stable-sort.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
//L https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
//L https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
//L https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f

/* harmony default export */ __webpack_exports__["default"] = (function (array, compare = (a, b) => {
  //C low to high
  return a - b;
}) {
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["array"].validate(array);
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["func"].validate(compare); //C Create new array where the original index is preserved.

  const preservedArray = array.map((value, index) => ({
    value,
    index
  }));

  const stableCompare = (a, b) => {
    const order = compare(a.value, b.value); //C If equal, sort based on original order, otherwise sort normally.

    return order === 0 ? a.index - b.index : order;
  };

  preservedArray.sort(stableCompare); //C Overwrite original array with sorted values.

  for (let i = 0; i < array.length; i++) {
    array[i] = preservedArray[i].value;
  }

  return array;
});
;

/***/ }),

/***/ "./public/js/utility/bool-catch.js":
/*!*****************************************!*\
  !*** ./public/js/utility/bool-catch.js ***!
  \*****************************************/
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
;

/***/ }),

/***/ "./public/js/utility/clamp.js":
/*!************************************!*\
  !*** ./public/js/utility/clamp.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (input, min, max) {
  if (min > max) throw `min: ${min} must not be greater than max: ${max}`;else if (input < min) return min;else if (input > max) return max;else return input;
});
;

/***/ }),

/***/ "./public/js/utility/combinations.js":
/*!*******************************************!*\
  !*** ./public/js/utility/combinations.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return combinations; });
function combinations(optionsObject) {
  //C takes an options object with a set of own properties whose value is an array of all possible values for that property
  //C returns an array of objects with all combinations of those property values
  //C ensure optionsObject is an object
  if (optionsObject === null || typeof optionsObject !== 'object') {
    throw new Error('Options object is not an object.');
  } //C get all own property keys


  const keys = [];
  keys.push(...Object.getOwnPropertyNames(optionsObject));
  keys.push(...Object.getOwnPropertySymbols(optionsObject)); //C ensure all own properties are iterable

  for (const key of keys) {
    if (!(optionsObject[key] instanceof Array)) {
      throw new Error(`Property options for ${key} is not iterable.`);
    }
  }

  const combinations = [];
  const combination = {}; //C return empty array if no own keys

  if (keys.length <= 0) return combinations; //C start with the first property

  const nest = function (index = 0) {
    const key = keys[index];
    const options = optionsObject[key]; //C for each option

    for (const option of options) {
      //C set the option
      combination[key] = option;

      if (index < keys.length - 1) {
        //C move to the next property
        nest(index + 1);
      } else {
        //C or if at last property, save the combination
        combinations.push({ ...combination
        });
      }
    }
  };

  nest();
  return combinations;
}
;

/***/ }),

/***/ "./public/js/utility/constants.js":
/*!****************************************!*\
  !*** ./public/js/utility/constants.js ***!
  \****************************************/
/*! exports provided: MAX_SAFE_32_BIT_INTEGER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SAFE_32_BIT_INTEGER", function() { return MAX_SAFE_32_BIT_INTEGER; });
const MAX_SAFE_32_BIT_INTEGER = 2147483647;

/***/ }),

/***/ "./public/js/utility/dynamic-class.js":
/*!********************************************!*\
  !*** ./public/js/utility/dynamic-class.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/define.js */ "./public/js/utility/object/define.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/keys-of.js */ "./public/js/utility/object/keys-of.js");
/* harmony import */ var _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation/rule.js */ "./public/js/utility/validation/rule.js");
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interface.js */ "./public/js/utility/interface.js");
/* //R
	CLASS COMPOSITION (
		This module seem like it would work well with composition: 'class composition'.
		Use for shallow but present class structures.
	)

	CLASS V FUNCTION DIFFERENCES (
		//L https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420
		//L Native classes are actually different: see classtraphobic

		class             <---> function
		super(...args);   <---> Parent.call(this, ...args);

		if child:
		_                 <---> prototype of Class is Parent.
		_                 <---> Class           has a non-writable, non-enumerable, non-configurable prototype property that is an object with its prototype as Parent.prototype.
		_                 <---> Class.prototype has a non-writable, non-enumerable, non-configurable constructor property that points to Class.
		if not child:
		_                 <---> Class.prototype must have it's writable attribute changed from true to false.

		not reproducible:
		this before super <---> All interactions except direct references to this can be trapped with a Proxy.
		Class() cannot be called directly <---> Cannot reproduce this behaviour without wrapping the Class itself in a proxy.

		FUNCTIONAL IMPLEMENTATION (
			const Class = {[name]: function (...args) {
				// INTERCEPT
				const interceptedArgs = this.constructor[iface.intercept].call(proxy, ...args);

				// EXTEND
				if (isChild) Parent.call(this, ...interceptedArgs);

				// INSTANCE
				const transfers = this.constructor[iface.instance].call(this, ...interceptedArgs);
				this.constructor[iface.transferToInstance](transfers, this);
			}}[name];

			if (isChild) {
				// Set prototype.
				Object.setPrototypeOf(Class, Parent);
				// Set Class.prototype to a new object that inherits from Parent.prototype and set writable, enumerable, configurable as false.
				define.hiddenConstant(Class, {prototype: Object.create(Parent.prototype)});
				// Give Class.prototype a constant constructor property.
				define.hiddenConstant(Class.prototype, {constructor: Class});
			} else {
				// Set Class.prototype to itself and set writable to false. function prototypes are writable but Class prototypes are not.
				define.hiddenConstant(Class, {prototype: Class.prototype});
			}
		)
	)

	//OLD INTERCEPT PROXY (
		Removed this from intercept.call(proxy, ...args); because Proxy cannot be as easily poly-filled as classes can.

		This is also more consistent: referencing this in any way will work, but not actually point to this. Instead of throwing an error in all cases except when it is directly referenced.

		const throwOnThisReference = function () {
			throw new ReferenceError(`Cannot use 'this' keyword in intercept.`);
		};
		const proxy = new Proxy({}, {
			// all possible traps
			getPrototypeOf:           throwOnThisReference,
			setPrototypeOf:           throwOnThisReference,
			isExtensible:             throwOnThisReference,
			preventExtensions:        throwOnThisReference,
			getOwnPropertyDescriptor: throwOnThisReference,
			defineProperty:           throwOnThisReference,
			has:                      throwOnThisReference,
			get:                      throwOnThisReference,
			set:                      throwOnThisReference,
			deleteProperty:           throwOnThisReference,
			ownKeys:                  throwOnThisReference,
			apply:                    throwOnThisReference,
			construct:                throwOnThisReference,
		});
	)
*/




 // INTERFACE

const dynamicClass = new _interface_js__WEBPACK_IMPORTED_MODULE_4__["SymbolInterface"]({
  intercept: value => _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value),
  instance: value => _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value),
  prototype: value => _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value),
  static: value => _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value)
}); // VALIDATION

const customRules = {
  name: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["string"].test(value)) {
        throw new Error(`'name' option must be a string, not a ${typeof value}`);
      }
    }

  }),
  extends: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["constructor"].test(value)) {
        throw new Error(`'extends' option must be a constructor, not a ${typeof value}`);
      }
    }

  }),
  intercept: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!dynamicClass.validators[dynamicClass.intercept](value)) {
        throw new Error(`'intercept' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  instance: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!dynamicClass.validators[dynamicClass.instance](value)) {
        throw new Error(`'instance' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  prototype: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!dynamicClass.validators[dynamicClass.prototype](value)) {
        throw new Error(`'prototype' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  static: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!dynamicClass.validators[dynamicClass.static](value)) {
        throw new Error(`'static' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  transferToInstance: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value)) {
        throw new Error(`'transferToInstance' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  transferToPrototype: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value)) {
        throw new Error(`'transferToPrototype' option must be a function, not a ${typeof value}`);
      }
    }

  }),
  transferToStatic: new _validation_rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    validator(value) {
      if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_3__["func"].test(value)) {
        throw new Error(`'transferToStatic' option must be a function, not a ${typeof value}`);
      }
    }

  })
}; // TRANSFER FUNCTIONS

const baseTransfer = (properties, target, enumerableCondition) => {
  //TODO replace with forKeysOf()
  for (const key of Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["getKeysOf"])(properties, {
    own: true,
    named: true,
    symbol: true,
    enumerable: true,
    nonEnumerable: true,
    inherited: false
  })) {
    const descriptor = Object.getOwnPropertyDescriptor(properties, key);
    /* force descriptors
    	writable:     true (for data descriptors),
    	configurable: true,
    	enumerable:   conditional (
    		instance value     = enumerable    - [[Define]] semantics of the class fields proposal, same as assignment
    		instance function  = enumerable    - ? deferred to value, same as assignment
    		instance accessor  = enumerable    - ? deferred to value/function, same as object literal
    				prototype value    = nonEnumerable - ? deferred to method/accessor
    		prototype function = nonEnumerable - class method
    		prototype accessor = nonEnumerable - class accessor
    				static value       = enumerable    - static class field of the class fields proposal
    		static function    = nonEnumerable - static class method
    		static accessor    = nonEnumerable - static accessor
    	)
    */

    if (descriptor.writable === false) descriptor.writable = true;
    descriptor.configurable = true;
    descriptor.enumerable = enumerableCondition(descriptor);
    Object.defineProperty(target, key, descriptor);
  }
};

const defaultTransferToInstance = (properties, target) => baseTransfer(properties, target, () => true);

const defaultTransferToPrototype = (properties, target) => baseTransfer(properties, target, () => false);

const defaultTransferToStatic = (properties, target) => baseTransfer(properties, target, descriptor => {
  return descriptor.writable !== undefined && typeof descriptor.value !== 'function';
});

const wrapParts = function (parts) {
  for (const [key, transferKey, defaultTransfer] of [['instance', 'transferToInstance', defaultTransferToInstance], ['prototype', 'transferToPrototype', defaultTransferToPrototype], ['static', 'transferToStatic', defaultTransferToStatic]]) {
    //C If a part is defined,
    if (parts[key] !== undefined) {
      if (parts[transferKey] === undefined) {
        parts[transferKey] = defaultTransfer;
      } //C validate it and it's transfer function,


      customRules[key].validate(parts[key]);
      customRules[transferKey].validate(parts[transferKey]); //C then wrap.

      const coreFunction = parts[key];
      const transferFunction = parts[transferKey];

      parts[key] = function (...args) {
        const transfers = coreFunction.call(this, ...args);
        transferFunction(transfers, this);
      };
    }
  }
}; // UTILITY


function joinFunctions(oldFunction, newFunction) {
  return function (...args) {
    oldFunction.call(this, ...args);
    newFunction.call(this, ...args);
  };
}

; // FACTORY

_object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(dynamicClass, {
  baseCreate({
    //C function and class default 'name' property is an empty string.
    name = '',
    extends: Parent,
    //G Any changes to 'this' inside intercept() cannot impact the true instance.
    intercept = () => [],
    instance = () => ({}),
    prototype = () => ({}),
    static: $static = () => ({}) //R Passing an existing class is not supported because it won't aid augmentation and static properties on the class would interfere with the part defaults.
    //R Object literals for the prototype and static options are not supported because it would allow mutation of the part functions. It's also more consistent to require all parts to be functions.

  } = {}) {
    const isChild = Parent !== undefined; // VALIDATION

    customRules.name.validate(name);
    if (isChild) customRules.extends.validate(Parent);
    customRules.intercept.validate(intercept);
    customRules.instance.validate(instance);
    customRules.prototype.validate(prototype);
    customRules.static.validate($static); // DEFINITION
    //R class syntax was necessary because it doesn't seem possible to replicate the non-callable nature of classes without using a Proxy.
    //R This ensures that no undiscovered differences slip by.
    //R Definition still had to be duplicated because optional extension and super calls don't seem possible.

    let Class;

    if (isChild) {
      Class = {
        [name]: class extends Parent {
          constructor(...args) {
            // INTERCEPT
            const interceptedArgs = Class[dynamicClass.intercept].call({}, ...args);
            super(...interceptedArgs); // INSTANCE

            Class[dynamicClass.instance].call(this, ...interceptedArgs);
          }

        }
      }[name];
    } else {
      Class = {
        [name]: class {
          constructor(...args) {
            // INTERCEPT
            const interceptedArgs = Class[dynamicClass.intercept].call({}, ...args); // INSTANCE

            Class[dynamicClass.instance].call(this, ...interceptedArgs);
          }

        }
      }[name];
    } // STORE PARTS
    //R The reason class parts are stored on the class then referenced directly instead of with a closure is to make augmentation easier. Augmenting with closures only was turning out to be a hassle and complicated how the 'augmentation' tree would be preserved. Mutating the class parts directly is much easier to reason about. This way the constructor parts can be modified while also keeping the reference to the same class.


    _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].hiddenVariable(Class, {
      [dynamicClass.intercept]: intercept,
      [dynamicClass.instance]: instance,
      [dynamicClass.prototype]: prototype,
      [dynamicClass.static]: $static
    });
    /* //G//!
    	The 'duper' parameter should replace uses of 'super' in methods.
    	Unlike 'super', 'duper' can also be used on regular functions.
    			Because 'duper' is a closure, it is a valid replacement for 'super' because they both are not dynamic. 
    	The object that they reference does not change even if the method assigned on a different object.
    			If a dynamic behavior is desired, use Object.getPrototypeOf(Object.getPrototypeOf(this)); instead.
    */
    //TODO consider not putting duper in an options container, I don't believe there should be any more arguments
    // PROTOTYPE

    Class[dynamicClass.prototype].call(Class.prototype, {
      duper: Object.getPrototypeOf(Class.prototype)
    }); // STATIC

    Class[dynamicClass.static].call(Class, {
      duper: Object.getPrototypeOf(Class)
    });
    return Class;
  },

  create(parts = {}) {
    //G If custom transfer functions are desired, create a container object and spread it over the parts.
    wrapParts(parts);
    return dynamicClass.baseCreate(parts);
  },

  /* //R
  	The augmentation function exists for two main reasons:
  	It brings any closure setup back inside to the single function call.
  	It removes the risk of implementing the augmentation wrong (say by forgetting to use a closure and instead referencing the class that is being mutated, this would cause a recursive function).
  */
  baseAugment(Class, {
    intercept,
    instance,
    prototype,
    static: $static
  } = {}) {
    if (intercept !== undefined) {
      customRules.intercept.validate(intercept); //C//! If the previous intercept function discarded arguments, it isn't possible to recover them in a subsequent intercept function.

      Class[dynamicClass.intercept] = joinFunctions(Class[dynamicClass.intercept], intercept);
    }

    if (instance !== undefined) {
      customRules.instance.validate(instance);
      Class[dynamicClass.instance] = joinFunctions(Class[dynamicClass.instance], instance);
    }

    if (prototype !== undefined) {
      customRules.prototype.validate(prototype);
      Class[dynamicClass.prototype] = joinFunctions(Class[dynamicClass.prototype], prototype); //C New prototype and static parts must be called immediately, as they are only called once. They get stored on the class for reference.

      prototype.call(Class.prototype, {
        duper: Object.getPrototypeOf(Class.prototype)
      });
    }

    if ($static !== undefined) {
      customRules.static.validate($static);
      Class[dynamicClass.static] = joinFunctions(Class[dynamicClass.static], $static);
      $static.call(Class, {
        duper: Object.getPrototypeOf(Class)
      });
    }
  },

  augment(Class, parts = {}) {
    wrapParts(parts);
    return dynamicClass.baseAugment(Class, parts);
  }

});
/* harmony default export */ __webpack_exports__["default"] = (dynamicClass);

/***/ }),

/***/ "./public/js/utility/format-ms.js":
/*!****************************************!*\
  !*** ./public/js/utility/format-ms.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//TODO Unused
//TODO Format hours, days, etc.
/* harmony default export */ __webpack_exports__["default"] = (function (ms) {
  // extract
  var minutes = Math.floor(ms / 60000);
  var seconds = Math.ceil(ms % 60000); // format

  seconds = ('0' + seconds).slice(-2); // returns ...0:00 format rounded up to the nearest second

  return minutes + ':' + seconds;
});

/***/ }),

/***/ "./public/js/utility/index.js":
/*!************************************!*\
  !*** ./public/js/utility/index.js ***!
  \************************************/
/*! exports provided: any, asyncMap, dynamicSort, one, stableSort, deepCompare, define, forKeysOf, getKeysOf, pick, capitalizeFirstCharacter, escapeRegExp, replaceAll, encodeProperties, decodeProperties, encodeList, decodeList, commonRules, flexValidate, Rule, boolCatch, clamp, combinations, DynamicClass, formatMs, constants, Interface, SymbolInterface, reference, test, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array/index.js */ "./public/js/utility/array/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["any"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncMap", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dynamicSort", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["dynamicSort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "one", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["one"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return _array_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"]; });

/* harmony import */ var _object_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/index.js */ "./public/js/utility/object/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["deepCompare"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["define"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["forKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["getKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _object_index_js__WEBPACK_IMPORTED_MODULE_1__["pick"]; });

/* harmony import */ var _string_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string/index.js */ "./public/js/utility/string/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstCharacter", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["capitalizeFirstCharacter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["escapeRegExp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _string_index_js__WEBPACK_IMPORTED_MODULE_2__["replaceAll"]; });

/* harmony import */ var _uri_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uri/index.js */ "./public/js/utility/uri/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeProperties", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_3__["encodeProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeProperties", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_3__["decodeProperties"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeList", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_3__["encodeList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeList", function() { return _uri_index_js__WEBPACK_IMPORTED_MODULE_3__["decodeList"]; });

/* harmony import */ var _validation_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation/index.js */ "./public/js/utility/validation/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commonRules", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_4__["commonRules"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flexValidate", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_4__["flexValidate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return _validation_index_js__WEBPACK_IMPORTED_MODULE_4__["Rule"]; });

/* harmony import */ var _bool_catch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bool-catch.js */ "./public/js/utility/bool-catch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolCatch", function() { return _bool_catch_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _clamp_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clamp.js */ "./public/js/utility/clamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _clamp_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _combinations_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./combinations.js */ "./public/js/utility/combinations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combinations", function() { return _combinations_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _dynamic_class_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dynamic-class.js */ "./public/js/utility/dynamic-class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicClass", function() { return _dynamic_class_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _format_ms_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./format-ms.js */ "./public/js/utility/format-ms.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatMs", function() { return _format_ms_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./constants.js */ "./public/js/utility/constants.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "constants", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_10__; });
/* harmony import */ var _interface_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./interface.js */ "./public/js/utility/interface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return _interface_js__WEBPACK_IMPORTED_MODULE_11__["Interface"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return _interface_js__WEBPACK_IMPORTED_MODULE_11__["SymbolInterface"]; });

/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reference.js */ "./public/js/utility/reference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reference", function() { return _reference_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./test.js */ "./public/js/utility/test.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "test", function() { return _test_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _wait_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./wait.js */ "./public/js/utility/wait.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return _wait_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

// NESTED




 // LOCAL








 //TODO constants aren't exported, find an elegant way to do this.





/***/ }),

/***/ "./public/js/utility/interface.js":
/*!****************************************!*\
  !*** ./public/js/utility/interface.js ***!
  \****************************************/
/*! exports provided: VALIDATORS, IS_IMPLEMENTED_BY, ALL_VALID, ALL, ANY, exists, Interface, SymbolInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATORS", function() { return VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_IMPLEMENTED_BY", function() { return IS_IMPLEMENTED_BY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL_VALID", function() { return ALL_VALID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALL", function() { return ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANY", function() { return ANY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists", function() { return exists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return Interface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInterface", function() { return SymbolInterface; });
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object/keys-of.js */ "./public/js/utility/object/keys-of.js");
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/define.js */ "./public/js/utility/object/define.js");
//TODO make validator keys the string keys not the literal keys, easier to access
//TODO implement poly-validate.

 // EXPORT CONSTANTS
//TODO export these in a better way (maybe attach them to VirtualInterface as static properties).

const VALIDATORS = Symbol('VALIDATORS');
const IS_IMPLEMENTED_BY = Symbol('IS_IMPLEMENTED_BY');
const ALL_VALID = 'all valid';
const ALL = 'all';
const ANY = 'any';
const exists = function (object, key) {
  return key in object;
}; // PRIVATE UTILITIES

function getValidatorKeys(validators) {
  return Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_0__["getKeysOf"])(validators, {
    own: true,
    named: true,
    symbol: true,
    enumerable: true,
    inherited: false,
    nonEnumerable: false
  });
}

;

function validateValidator(validator, key) {
  if (key === VALIDATORS || key === IS_IMPLEMENTED_BY) {
    throw new Error(`Using ${key} as a key is forbidden.`);
  }

  if (typeof validator !== 'function') {
    throw new Error(`Interface property ${key} is not a validator function: ${typeof validator}`);
  }
}

;

function freezeSpecialProperties(object) {
  Object.defineProperties(object, {
    validators: { ...Object.getOwnPropertyDescriptor(object, 'validators'),
      configurable: false
    },
    isImplementedBy: { ...Object.getOwnPropertyDescriptor(object, 'isImplementedBy'),
      configurable: false
    }
  });
}

; // INHERITABLES

function isImplementedBy(object, strength = ALL_VALID) {
  if (object === null || typeof object !== 'object') {
    throw new Error(`First argument is not an object: ${object}`);
  }

  const validatorKeys = getValidatorKeys(this[VALIDATORS]);

  const validate = key => {
    const validator = this[VALIDATORS][key];

    if (validator.length === 1) {
      // Pass the value (invokes getter) if the validator has one parameter.
      return validator(object[key]);
    } else {
      // Pass the object and key if the validator has any other number of parameters.
      return validator(object, key);
    }
  };

  if (strength === ALL_VALID) {
    // all keys are valid on the object
    return validatorKeys.every(key => validate(key));
  } else if (strength === ALL) {
    // all keys are present or valid on the object
    return validatorKeys.every(key => exists(object, key) || validate(key));
  } else if (strength === ANY) {
    // at least one key is present or valid on the object
    return validatorKeys.some(key => exists(object, key) || validate(key));
  } else {
    throw new Error(`Strength argument must be ${ALL_VALID}, ${ALL}, or ${ANY}`);
  }
}

;

class VirtualInterface {
  constructor() {
    const validators = {};
    Object.defineProperties(this, {
      validators: {
        value: validators,
        writable: false,
        enumerable: false,
        configurable: true
      },
      isImplementedBy: {
        value: isImplementedBy,
        writable: false,
        enumerable: false,
        configurable: true
      }
    }); // Special properties are also accessible from a symbol in-case their string key gets used as an interface key.

    _object_define_js__WEBPACK_IMPORTED_MODULE_1__["default"].hiddenConstant(this, {
      [VALIDATORS]: validators,
      [IS_IMPLEMENTED_BY]: isImplementedBy
    });
  }

}

; // EXPORT CLASSES
// Interface and SymbolInterface take a single validators parameter.
// This validators object should have keys as the interface property names and values as the validator functions for those interface properties.
// If a validator has 1 parameter, it will be passed a (value) argument, the evaluation of object[key].
// If a validator has 2 (or any other number of parameters), it will be passed the (object, key) arguments.
//G Use a validator with 2 parameters when the getter for object[key] should not be invoked during isImplementedBy().
//! Be aware that default and rest parameters are not counted. 
//G Manually re-define the validator.length property if a specific behavior is desired.
//! The validator.length property will be set to non-configurable when it is passed in.

class Interface extends VirtualInterface {
  // Interface accepts both named and symbol keys. 
  // The same keys must be used for implementations.
  constructor(validators) {
    super(validators);

    for (const key of getValidatorKeys(validators)) {
      const validator = validators[key];
      validateValidator(validator, key); // Freeze the length property so that it can be relied upon to determine if the [value] or [object, key] parameters should be passed.

      Object.defineProperty(validator, 'length', {
        value: validator.length,
        writable: false,
        enumerable: false,
        configurable: false
      }); // Store validators on instance.

      _object_define_js__WEBPACK_IMPORTED_MODULE_1__["default"].constant(this[VALIDATORS], {
        [key]: validator
      });
    }

    freezeSpecialProperties(this);
  }

}
;
class SymbolInterface extends VirtualInterface {
  // SymbolInterface creates symbols for ALL interface keys.
  // Implementations must use the symbols as the property keys.
  // This prevents name collision on implementations.
  constructor(validators) {
    super(validators);

    for (const key of getValidatorKeys(validators)) {
      const validator = validators[key];
      validateValidator(validator, key);
      Object.defineProperty(validator, 'length', {
        value: validator.length,
        writable: false,
        enumerable: false,
        configurable: false
      }); // Create substitute symbol key.

      const symbol = Symbol(key); // Store symbol keys on instance under their original key so that they can be used for implementations: {[interface.key]: implementation}

      _object_define_js__WEBPACK_IMPORTED_MODULE_1__["default"].constant(this, {
        [key]: symbol
      }); // Store validators on instance.

      _object_define_js__WEBPACK_IMPORTED_MODULE_1__["default"].constant(this[VALIDATORS], {
        [symbol]: validator
      });
    }

    freezeSpecialProperties(this);
  }

}
;

/***/ }),

/***/ "./public/js/utility/object/deep-compare.js":
/*!**************************************************!*\
  !*** ./public/js/utility/object/deep-compare.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deepCompare; });
const isObject = function (v) {
  return v !== null && typeof v === 'object';
};

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

function deepCompare(a, b, options = {}) {
  const {
    //C 0 based, will call depth+1 layers of comparisons
    depth = 1,
    //C used for custom comparisons (like un-ordered lists)
    //! do not use a compare function that is or contains deepCompare, else falsy comparisons will run deepCompare twice per property
    compareFunction = (a, b) => a === b,
    //C used to compare object keys with specific attributes (enumerable, symbol, inherited, etc.)
    //C used for custom key selection (inherited, enumerable, symbol, etc.)
    selectFunction = Object.keys,
    //C true:  compare selected key-values on x to the same key-values anywhere on y
    //C false: compare selected key-values on x to the same key-values selected on y
    anywhere = false,
    //C true:  compares a against b 
    //C false: compares a against b and b against a
    //? what if subsetting needs to stop a specific depth?
    //R no need to specify dual-subset, because then a and b would be identical sets, which is equivalent to specifying no subset
    subset = false,
    //C compare result for values that are too deep
    resultIfTooDeep = false,
    logDifference = false
  } = options; // limit to depth

  if (depth < 0) return resultIfTooDeep; // compare values

  if (compareFunction(a, b, options)) return true; // compare properties

  if (isObject(a) && isObject(b)) {
    let result = true; // selected keys

    const aSelectedKeys = selectFunction(a);
    const bSelectedKeys = selectFunction(b); //C compare all selected key-values of a to the same (any or selected) key-value of b

    for (const key of aSelectedKeys) {
      const aValue = a[key];
      const bValue = anywhere || bSelectedKeys.includes(key) ? b[key] : undefined;

      if (!compareDeeper(aValue, bValue, options)) {
        result = false;
        if (logDifference) logDifferenceFunction(key, aValue, bValue);
      }
    }

    if (!subset) {
      //C compare remaining selected key-values of b to the same (any or non-existent) key-value of a
      //C compare 
      //R prevents shared selected keys from being compared twice
      for (const key of bSelectedKeys) {
        if (!aSelectedKeys.includes(key)) {
          //C exclude shared selected keys
          //C no need to check for the same selected key in a, they have been excluded
          const aValue = anywhere ? a[key] : undefined;
          const bValue = b[key]; //! value order is not flipped, this would cause the subset to go both ways

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
}
; //L diagrams: https://www.figma.com/file/57kSw6SaPX3qJUSdzMpfJo/Object-Property-Locations-Comparison?node-id=0%3A1

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

/***/ "./public/js/utility/object/define.js":
/*!********************************************!*\
  !*** ./public/js/utility/object/define.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ownKeys = function (object) {
  /* //R//! Not using getKeysOf() here to avoid a circular dependency.
  	define.js > Rule.js > common-rules.js > keys-of.js > define.js
  	Out of these dependencies, keys-of.js > define.js seemed the simplest to duplicate.
  */
  return [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
}; //C define is a container for less verbose versions of Object.defineProperty()
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

  variable(target, properties) {
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

  hiddenVariable(target, properties) {
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
      Object.defineProperty(target, key, Object.getOwnPropertyKey(properties, key));
    }

    return target;
  }

});

/***/ }),

/***/ "./public/js/utility/object/index.js":
/*!*******************************************!*\
  !*** ./public/js/utility/object/index.js ***!
  \*******************************************/
/*! exports provided: deepCompare, define, forKeysOf, getKeysOf, pick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deep_compare_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deep-compare.js */ "./public/js/utility/object/deep-compare.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCompare", function() { return _deep_compare_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./define.js */ "./public/js/utility/object/define.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "define", function() { return _define_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _keys_of_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys-of.js */ "./public/js/utility/object/keys-of.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_2__["forKeysOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return _keys_of_js__WEBPACK_IMPORTED_MODULE_2__["getKeysOf"]; });

/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pick.js */ "./public/js/utility/object/pick.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _pick_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./public/js/utility/object/keys-of.js":
/*!*********************************************!*\
  !*** ./public/js/utility/object/keys-of.js ***!
  \*********************************************/
/*! exports provided: forKeysOf, getKeysOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forKeysOf", function() { return forKeysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeysOf", function() { return getKeysOf; });
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
/* harmony import */ var _validation_flex_validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/flex-validate.js */ "./public/js/utility/validation/flex-validate.js");
// forKeysOf calls a function for all keys of an object that match the specified attributes.
// getKeysOf returns an array of  all keys of an object that match the specified attributes and filter.
// Attributes default to own, named, enumerable keys. This is the same as Object.keys().
//! Duplicated code in define.js to remove a circular dependency.


function forKeysOf(object, optionsOrCallback = {}) {
  // OPTIONS / VALIDATION
  const options = typeof optionsOrCallback === 'function' ? {
    callback: optionsOrCallback
  } : optionsOrCallback;
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["object"].validate(object);
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["object"].validate(options);
  const {
    own = true,
    inherited = false,
    named = true,
    symbol = false,
    enumerable = true,
    nonEnumerable = false,
    callback = () => {}
  } = options;
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["func"].validate(callback); // OWN / INHERITED

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
;
function getKeysOf(object, optionsOrFilter = {}) {
  // OPTIONS / VALIDATION
  const options = typeof optionsOrFilter === 'function' ? {
    filter: optionsOrFilter
  } : optionsOrFilter;
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["object"].validate(object);
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["object"].validate(options);
  const {
    filter = (object, key) => true,
    ...rest
  } = options;
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["func"].validate(filter); // ARRAY

  const keys = []; // undefined & null return empty array

  if (object == null) return keys; // FILTER

  forKeysOf(object, {
    callback(object, key) {
      if (Object(_validation_flex_validate_js__WEBPACK_IMPORTED_MODULE_1__["default"])(filter, object, key)) {
        keys.push(key);
      }
    },

    ...rest
  });
  return keys;
}
;

/***/ }),

/***/ "./public/js/utility/object/pick.js":
/*!******************************************!*\
  !*** ./public/js/utility/object/pick.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");
// Copies all non-undefined properties of an object onto a new object.
//! Invokes getters.
//! Does not copy descriptors.
//! Copies inherited properties directly onto the new object.
//R Why not use destructuring?
//R It wouldn't be possible to store a preset list of properties to pick.

/* harmony default export */ __webpack_exports__["default"] = (function (oldObject, keys) {
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["object"].validate(oldObject);
  _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_0__["array"].validate(keys);
  const newObject = {};

  for (const key of keys) {
    const value = oldObject[key];
    if (value !== undefined) newObject[key] = value;
  }

  return newObject;
});
;

/***/ }),

/***/ "./public/js/utility/reference.js":
/*!****************************************!*\
  !*** ./public/js/utility/reference.js ***!
  \****************************************/
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
;
/* harmony default export */ __webpack_exports__["default"] = (Reference);
function formReferences(values) {
  return values.map(item => item instanceof Reference ? item : new Reference(item));
}
;
function extractValues(references) {
  return references.map(item => item instanceof Reference ? item.value : item);
}
;

/***/ }),

/***/ "./public/js/utility/string/capitalize-first-character.js":
/*!****************************************************************!*\
  !*** ./public/js/utility/string/capitalize-first-character.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

/***/ }),

/***/ "./public/js/utility/string/escape-reg-exp.js":
/*!****************************************************!*\
  !*** ./public/js/utility/string/escape-reg-exp.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (string) {
  //L from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
});
;

/***/ }),

/***/ "./public/js/utility/string/index.js":
/*!*******************************************!*\
  !*** ./public/js/utility/string/index.js ***!
  \*******************************************/
/*! exports provided: capitalizeFirstCharacter, escapeRegExp, replaceAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capitalize_first_character_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize-first-character.js */ "./public/js/utility/string/capitalize-first-character.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirstCharacter", function() { return _capitalize_first_character_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _escape_reg_exp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./escape-reg-exp.js */ "./public/js/utility/string/escape-reg-exp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return _escape_reg_exp_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _replace_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replace-all */ "./public/js/utility/string/replace-all.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceAll", function() { return _replace_all__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/***/ }),

/***/ "./public/js/utility/string/replace-all.js":
/*!*************************************************!*\
  !*** ./public/js/utility/string/replace-all.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (input, search, replace) {
  return input.split(search).join(replace);
});
;

/***/ }),

/***/ "./public/js/utility/test.js":
/*!***********************************!*\
  !*** ./public/js/utility/test.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return test; });
async function test(tests, origin) {
  let failCount = 0;

  for (const [name, test] of tests) {
    if (!test) {
      console.error(`${origin} - test failed: ${name}`);
      failCount++;
    }
  }

  if (failCount === 0) {
    console.log(`%c${origin} - all tests passed`, 'background-color: #d0efd8');
    return true;
  } else {
    return false;
  }
}
;

/***/ }),

/***/ "./public/js/utility/uri/decode-list.js":
/*!**********************************************!*\
  !*** ./public/js/utility/uri/decode-list.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decode_properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decode-properties.js */ "./public/js/utility/uri/decode-properties.js");
/* harmony import */ var _validation_common_rules_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/common-rules.js */ "./public/js/utility/validation/common-rules.js");


/* harmony default export */ __webpack_exports__["default"] = (function (encoded) {
  //C decodes a list of encoded objects with '-i' suffixed property keys
  //! any key not matching the format will be discarded
  const indexed = Object(_decode_properties_js__WEBPACK_IMPORTED_MODULE_0__["default"])(encoded);
  const list = [];
  const indexedKeys = Object.keys(indexed);

  for (let i = 0; i < indexedKeys.length; i++) {
    //C validate delimiter
    const delimiterIndex = indexedKeys[i].lastIndexOf('-');

    if (delimiterIndex < 0) {
      break;
    } //C validate index


    const objectIndex = parseInt(indexedKeys[i].slice(delimiterIndex + 1)); //C handles multiple digits & no digits properly

    if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_1__["integer"].test(objectIndex)) {
      break;
    } //C get the real key


    const key = indexedKeys[i].slice(0, delimiterIndex);

    if (!_validation_common_rules_js__WEBPACK_IMPORTED_MODULE_1__["object"].test(list[objectIndex])) {
      //C if the obj doesn't exist yet, add it with the prop
      list[objectIndex] = {
        [key]: indexed[indexedKeys[i]]
      };
    } else {
      //C otherwise add the prop to the existing object
      list[objectIndex][key] = indexed[indexedKeys[i]];
    }
  }

  return list;
});
;

/***/ }),

/***/ "./public/js/utility/uri/decode-properties.js":
/*!****************************************************!*\
  !*** ./public/js/utility/uri/decode-properties.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Decodes every value as a string.
/* harmony default export */ __webpack_exports__["default"] = (function (encodedString) {
  const keyValuePairs = encodedString.split('&');
  const object = {};
  keyValuePairs.forEach(keyValuePair => {
    const [key, value] = keyValuePair.split('=');
    object[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return object;
});
;

/***/ }),

/***/ "./public/js/utility/uri/encode-list.js":
/*!**********************************************!*\
  !*** ./public/js/utility/uri/encode-list.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_any_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array/any.js */ "./public/js/utility/array/any.js");
/* harmony import */ var _encode_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./encode-properties.js */ "./public/js/utility/uri/encode-properties.js");


/* harmony default export */ __webpack_exports__["default"] = (function (list) {
  //C return a string of uri encoded key-value pairs for each property of each item, their keys suffixed with '-[index]'
  //! not called automatically by sj.request() because its useful to see when a encodeList exists as it needs to be unpacked on the other end
  const indexed = {};
  Object(_array_any_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list).forEach((object, index) => {
    Object.keys(object).forEach(key => {
      indexed[`${key}-${index}`] = object[key];
    });
  });
  return Object(_encode_properties_js__WEBPACK_IMPORTED_MODULE_1__["default"])(indexed);
});
;

/***/ }),

/***/ "./public/js/utility/uri/encode-properties.js":
/*!****************************************************!*\
  !*** ./public/js/utility/uri/encode-properties.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Encodes values as strings, objects as [object Object] and arrays as comma delimited strings.
/* harmony default export */ __webpack_exports__["default"] = (function (object) {
  return Object.keys(object).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join('&');
});
;

/***/ }),

/***/ "./public/js/utility/uri/index.js":
/*!****************************************!*\
  !*** ./public/js/utility/uri/index.js ***!
  \****************************************/
/*! exports provided: encodeProperties, decodeProperties, encodeList, decodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _encode_properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encode-properties.js */ "./public/js/utility/uri/encode-properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeProperties", function() { return _encode_properties_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _decode_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decode-properties.js */ "./public/js/utility/uri/decode-properties.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeProperties", function() { return _decode_properties_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _encode_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./encode-list.js */ "./public/js/utility/uri/encode-list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encodeList", function() { return _encode_list_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _decode_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decode-list.js */ "./public/js/utility/uri/decode-list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decodeList", function() { return _decode_list_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./public/js/utility/validation/common-rules.js":
/*!******************************************************!*\
  !*** ./public/js/utility/validation/common-rules.js ***!
  \******************************************************/
/*! exports provided: object, array, func, string, trimmedString, visibleString, symbol, number, nonNaNNumber, integer, nonNegativeNumber, nonPositiveNumber, positiveNumber, negativeNumber, nonNegativeInteger, nonPositiveInteger, positiveInteger, negativeInteger, constructor, key */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object", function() { return object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "array", function() { return array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "func", function() { return func; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimmedString", function() { return trimmedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibleString", function() { return visibleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return symbol; });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constructor", function() { return constructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "key", function() { return key; });
/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rule.js */ "./public/js/utility/validation/rule.js");
/* harmony import */ var _object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../object/keys-of.js */ "./public/js/utility/object/keys-of.js");

 //G Include anything here that is possible to implement incorrectly, even for basic types.
//R Rules for basic types are also useful for custom casting, errors, and consistency.
//TODO ensure that import * can be tree shaken
//L Doesn't seem proper to distinguish async vs sync functions: https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async, async operations can handle sync function returns
// sync func
// async func
// BUILT-IN RULES
// OBJECTS

const object = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  //L https://stackoverflow.com/a/22482737
  validator(value) {
    if (value === null || !(typeof value === 'object' || typeof value === 'function')) {
      throw new Error('Value is not an object.');
    }
  }

}); // ARRAYS

const array = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  //L Why not instanceof? - http://web.mit.edu/jwalden/www/isArray.html
  //TODO Doesn't this then apply to all classes? Should all classes use validators like this or just use instanceof?
  validator(value) {
    if (!Array.isArray(value)) {
      throw new Error('Value is not an array.');
    }
  }

}); // FUNCTIONS

const func = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    if (typeof value !== 'function') throw new Error('Value is not a function.');
  }

}); // STRINGS

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
    //L from the trim() polyfill at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill

    if (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g.test(value)) {
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
      throw 'String is empty.';
    }
  },

  caster(reference) {
    string.validateCast(reference); // Cannot cast any further than a string.
  }

}); // SYMBOLS

const symbol = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
      string.validateCast(reference.value);
      reference.value = Symbol(reference.value);
    }
  }

}); // NUMBERS

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
    reference.value = Number.parseInt(reference.value);
  }

}); // Defining 0 as neither positive or negative.
//L Don't worry about NaN: https://stackoverflow.com/a/26982925

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

}); //? This calls the number validator twice, any way to optimize this?

const nonNegativeInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    nonNegativeNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    nonNegativeNumber.validateCast(reference.value);
    integer.validateCast(reference.value);
  }

});
const nonPositiveInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    nonPositiveNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    nonPositiveNumber.validateCast(reference.value);
    integer.validateCast(reference.value);
  }

});
const positiveInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    positiveNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    positiveNumber.validateCast(reference.value);
    integer.validateCast(reference.value);
  }

});
const negativeInteger = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    negativeNumber.validate(value);
    integer.validate(value);
  },

  caster(reference) {
    negativeNumber.validateCast(reference.value);
    integer.validateCast(reference.value);
  }

}); // SPECIAL

const constructor = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  validator(value) {
    try {
      const Test = class extends value {};
    } catch (e) {
      throw new Error('Value is not a constructor.');
    }
  }

});

const keyify = function (value) {
  // Create a null object with only one property.
  const nullObject = Object.create(null);
  nullObject[value] = true; // Find that only property's key.

  const [keyifiedValue] = Object(_object_keys_of_js__WEBPACK_IMPORTED_MODULE_1__["getKeysOf"])(nullObject, {
    own: true,
    named: true,
    symbol: true,
    enumerable: true,
    nonEnumerable: false,
    inherited: false
  });
  return keyifiedValue;
};

const key = new _rule_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  // Keys that won't be cast / have already been cast as a result of being used as a property key.
  //! Does not include numbers, those get cast to strings.
  validator(value) {
    const keyifiedValue = keyify(value);

    if (value !== keyifiedValue) {
      throw 'Value is not keyified.';
    }
  },

  caster(reference) {
    reference.value = keyify(reference.value);
  }

});

/***/ }),

/***/ "./public/js/utility/validation/flex-validate.js":
/*!*******************************************************!*\
  !*** ./public/js/utility/validation/flex-validate.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return flexValidate; });
// Executes validators that take either 1 (value) argument or 2 (object, key) arguments with either 1 or 2 arguments. 
// If the validator takes 2 arguments but 2 arguments weren't passed, the first argument is simulated as an object property.
//R Using (length === 2 else) rather than (length === 1 else) because otherwise if no arguments are passed undefined[undefined] won't work.
function flexValidate(validator, ...args) {
  if (validator.length === 0) {
    // Pass no arguments if validator takes none.
    return validator();
  } else if (validator.length === 1) {
    let value;

    if (args.length === 0) {
      value = undefined;
    } else if (args.length === 1) {
      value = args[0];
    } else if (args.length === 2) {
      value = args[0][args[1]];
    } else {
      throw new Error(`${args.length} arguments not supported for validators with 1 parameter.`);
    }

    return validator(value);
  } else if (validator.length === 2) {
    let object;
    let key;

    if (args.length === 2) {
      object = args[0];
      key = args[1];
    } else {
      throw new Error(`${args.length} arguments not supported for validators with 2 parameters.`);
    }

    return validator(object, key);
    /* //OLD Value to property simulation.
    	object = Object.create(null);
    	key = Symbol('simulated key');
    	object[key] = value;
    */
  } else {
    throw new Error(`Validators with ${validator.length} arguments are not supported.`);
  }
}
;

/***/ }),

/***/ "./public/js/utility/validation/index.js":
/*!***********************************************!*\
  !*** ./public/js/utility/validation/index.js ***!
  \***********************************************/
/*! exports provided: commonRules, flexValidate, Rule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-rules.js */ "./public/js/utility/validation/common-rules.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "commonRules", function() { return _common_rules_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _flex_validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flex-validate.js */ "./public/js/utility/validation/flex-validate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flexValidate", function() { return _flex_validate_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _rule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rule.js */ "./public/js/utility/validation/rule.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return _rule_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./public/js/utility/validation/rule.js":
/*!**********************************************!*\
  !*** ./public/js/utility/validation/rule.js ***!
  \**********************************************/
/*! exports provided: Rule, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony import */ var _object_define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../object/define.js */ "./public/js/utility/object/define.js");
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reference.js */ "./public/js/utility/reference.js");
/* harmony import */ var _bool_catch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bool-catch.js */ "./public/js/utility/bool-catch.js");
//TODO consider changing the method name 'validateCast' it is not intuitive that this is the main casting function and that it returns a value. That or make validate return the passed values.



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
    const casterIsSynchronous = this.caster.constructor.name === 'Function';

    if (validatorIsSynchronous) {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validate(...args) {
          this.validator(...args);
        },

        test(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.validate(...args));
        }

      });
    } else {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        async validate(...args) {
          await this.validator(...args);
        },

        async test(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(async () => await this.validate(...args));
        }

      });
    }

    if (validatorIsSynchronous && casterIsSynchronous) {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        validateCast(...args) {
          // If call is the entry-point, will convert values to reference-values. If call is nested, nothing will change.
          const references = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["formReferences"])(args);

          try {
            this.caster(...references);
          } catch (e) {} // Suppress casting errors, just get as far as possible.


          const values = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["extractValues"])(references);
          this.validate(...values);
          return values;
        },

        testCast(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.validateCast(...args));
        }

      });
    } else {
      _object_define_js__WEBPACK_IMPORTED_MODULE_0__["default"].constant(this, {
        async validateCast(...args) {
          const references = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["formReferences"])(args);

          try {
            await this.caster(...references);
          } catch (e) {}

          const values = Object(_reference_js__WEBPACK_IMPORTED_MODULE_1__["extractValues"])(references);
          await this.validate(...values);
          return values;
        },

        async testCast(...args) {
          return Object(_bool_catch_js__WEBPACK_IMPORTED_MODULE_2__["default"])(async () => await this.validateCast(...args));
        }

      });
    }
  }

}
;
/* harmony default export */ __webpack_exports__["default"] = (Rule);

/***/ }),

/***/ "./public/js/utility/wait.js":
/*!***********************************!*\
  !*** ./public/js/utility/wait.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./public/js/utility/constants.js");
// Basic wait promise.
//! Does not resolve if timeout is larger than MAX_SAFE_32_BIT_INTEGER
//TODO Maybe think about functionality for handling larger numbers, infinity, negative numbers, etc.

/* harmony default export */ __webpack_exports__["default"] = (async function (ms) {
  //C used for basic waiting, //! should not be used if the callback needs to be canceled
  return new Promise(resolve => {
    //L maximum timeout length: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value
    if (ms <= _constants_js__WEBPACK_IMPORTED_MODULE_0__["MAX_SAFE_32_BIT_INTEGER"]) {
      sj.setTimeout(() => {
        resolve();
      }, ms);
    }
  });
});
;

/***/ }),

/***/ "./server/auth.js":
/*!************************!*\
  !*** ./server/auth.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! spotify-web-api-node */ "spotify-web-api-node");
/* harmony import */ var spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_server_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global-server.js */ "./server/global-server.js");
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //TODO consider just writing native api functions, because they are fairly simple, and the spotify-web-api-node
    //L https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/

    //TODO remove exports. from internal functions

*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// builtin
 // external
//import btoa from 'btoa';

 //L https://github.com/thelinmichael/spotify-web-api-node
// internal

 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   
// events

const emitter = new events__WEBPACK_IMPORTED_MODULE_0___default.a();
let auth = {}; //   █████╗ ██╗   ██╗████████╗██╗  ██╗
//  ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
//  ███████║██║   ██║   ██║   ███████║
//  ██╔══██║██║   ██║   ██║   ██╔══██║
//  ██║  ██║╚██████╔╝   ██║   ██║  ██║
//  ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
//C generics

auth.requestTimeout = 300000; //C 5 minutes

auth.requestKeys = [];

auth.addRequestKey = async function () {
  return await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].addKey(this.requestKeys, this.requestTimeout);
};

auth.checkRequestKey = async function (key) {
  let pack = await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].checkKey(this.requestKeys, key);
  return {
    authRequestKey: pack.key,
    authRequestTimestamp: pack.timestamp
  };
}; //  ███████╗ ██████╗ ██╗   ██╗██████╗  ██████╗███████╗
//  ██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔════╝██╔════╝
//  ███████╗██║   ██║██║   ██║██████╔╝██║     █████╗  
//  ╚════██║██║   ██║██║   ██║██╔══██╗██║     ██╔══╝  
//  ███████║╚██████╔╝╚██████╔╝██║  ██║╚██████╗███████╗
//  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝
//TODO consider moving this over to the globals-server stuff
//C this is only used in auth.startAuthRequest() for its spotify.makeAuthRequestURL() function


_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].spotify = new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Source({
  name: 'spotify',
  api: new spotify_web_api_node__WEBPACK_IMPORTED_MODULE_1___default.a({
    //C create api object and set credentials in constructor
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
  makeAuthRequestURL: function (key) {
    //TODO make a better catch & handle, this is a temporary catch for undefined credentials as the error is silent until it arrives on spotify's end: 'Missing required parameter: client_id'
    if (!_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isType(this.api._credentials.clientId, String) || !_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isType(this.api._credentials.clientSecret, String) || !_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isType(this.api._credentials.redirectUri, String)) {
      throw new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Error({
        log: true,
        origin: 'spotify.makeAuthRequestURL()',
        message: 'one or more api credentials are missing or of the wrong type',
        content: {
          clientId: this.api._credentials.clientId,
          clientSecret: this.api._credentials.clientSecret,
          redirectUri: this.api._credentials.redirectUri
        }
      });
    } //! the show_dialog query parameter isn't available in the createAuthorizeURL, so it is manually added


    return this.api.createAuthorizeURL(this.scopes, key) + `&show_dialog=${this.authRequestManually}`;
  }
}); //TODO make any property available for sj.Source

Object.assign(_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].spotify, {
  startAuthRequest: async function () {
    let pack = await auth.addRequestKey();
    return new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Credentials({
      authRequestKey: pack.key,
      authRequestTimestamp: pack.timestamp,
      authRequestTimeout: pack.timeout,
      authRequestURL: this.makeAuthRequestURL(pack.key)
    });
  },
  receiveAuthRequest: async function (query) {
    //C receives and transforms credentials from spotify after the user confirms the authorization

    /*//C spotify authorization guide
    	//L https://developer.spotify.com/documentation/general/guides/authorization-guide/
    			if the user accepts the request:
    	code	An authorization code that can be exchanged for an access token.
    	state	The value of the state parameter supplied in the request.
    			if the user denies the request, or if an error has occured
    	error	The reason authorization failed, for example: “access_denied” 
    	state	The value of the state parameter supplied in the request.
    			//TODO create error parser for spotify api
    */
    //C ensure key is recognized, if its not (or timed out), nothing can be done, let it timeout on the client side too
    await auth.checkRequestKey(query.state); //C ensure that spotify sent the code

    if (_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isType(query.code, undefined)) {
      emitter.emit(query.state, new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Error({
        log: true,
        origin: 'receiveAuthRequest()',
        message: 'spotify authorization failed',
        reason: 'code is missing',
        content: query
      }));
    } //C ensure that spotify didn't send an error


    if (!_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isType(query.error, undefined)) {
      emitter.emit(query.state, new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Error({
        log: true,
        origin: 'receiveAuthRequest()',
        message: 'spotify authorization failed',
        reason: query.error,
        content: query
      }));
    } //C send the event and credentials for endAuthRequest() to pick up


    emitter.emit(query.state, new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Credentials({
      //? sj.success here?
      authRequestKey: query.state,
      //? is this needed anymore?
      authCode: query.code
    }));
  },
  endAuthRequest: async function (credentials) {
    //C catches events emitted by receiveAuthRequest() and sends them to the waiting router request
    return await new Promise((resolve, reject) => {
      //! needs to be a promise wrapper because emitter.once uses a callback function
      //C setup listener for authRequestKey
      emitter.once(credentials.authRequestKey, result => {
        resolve(result);
      }); //C setup timeout

      _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].wait(credentials.authRequestTimeout).then(() => {
        reject(new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Error({
          log: true,
          origin: 'sj.spotify.endAuthRequest()',
          message: 'request timeout'
        }));
      });
    });
  },
  exchangeToken: async function (ctx, credentials) {
    //C exchange auth code for access and refresh tokens
    //C exchangeToken() is only outside of endAuthRequest() because the auth window should close and not have to wait for the exchange to happen - to reduce flickering of the redirect page
    //C grab timestamp before sending request so that the recorded expiry time is before the actual expiry time
    let timestamp = Date.now(); //C exchange the auth code for tokens
    //L https://developer.spotify.com/documentation/general/guides/authorization-guide/

    let result = await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].request('POST', 'https://accounts.spotify.com/api/token', _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].encodeProps({
      grant_type: 'authorization_code',
      code: credentials.authCode,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      //C only used for validation, no need to make a second redirect handler
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET // alternative to client_id and client_secret properties, put this in header: 'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,

    }), _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].URL_HEADER).catch(rejected => {
      throw new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Error({
        log: true,
        message: 'failed to authorize spotify',
        reason: 'token exchange failed',
        content: rejected
      });
    }); //C store refresh token in database
    //C while the client triggers the refresh of the accessToken (so that the server doesn't have to keep track of which users are online), the refreshToken is stored server side so that the user doesn't have to re-auth between sessions

    let me = await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].session.get(ctx).then(_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].content);
    await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].User.edit({
      id: me.id,
      spotifyRefreshToken: result.refresh_token
    }).then(resolved => {}); //C repack and return

    return new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Credentials({
      accessToken: result.access_token,
      expires: timestamp + result.expires_in,
      //refreshToken: result.refresh_token,
      scopes: result.scope.split(' ') //C result.token_type is the only omitted property, this is always 'Bearer'

    });
  },
  refreshToken: async function (ctx) {
    //C get the refresh token from the database
    let me = await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].session.get(ctx).then(_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].content);
    let refreshToken = await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].User.get(me).then(_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].content).then(_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].one).then(resolved => resolved.spotifyRefreshToken); //C if there isn't one, throw the specific AuthRequired error, this will be identified on the client side and trigger spotify.auth()

    if (_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isEmpty(refreshToken)) {
      throw new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].AuthRequired();
    } //C send a refresh request to spotify to get new access token, expiry time, and possible refresh token


    let timestamp = Date.now();
    let result = await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].request('POST', 'https://accounts.spotify.com/api/token', _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].encodeProps({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }), _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].URL_HEADER).catch(rejected => {
      throw new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Error({
        log: true,
        message: 'failed to authorize spotify',
        reason: 'token refresh failed',
        content: rejected
      });
    }); //C if a new refresh token was sent

    if (_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].isType(result.refresh_token, 'string')) {
      //? better validation?
      //C store it
      await _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].User.edit({
        id: me.id,
        spotifyRefreshToken: result.refresh_token
      });
    } //C send only the accessToken and the expiry time


    return new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Credentials({
      origin: 'sj.spotify.refreshToken()',
      accessToken: result.access_token,
      expires: timestamp + result.expires_in
    });
  }
});
_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].youtube = new _global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].Source({
  name: 'youtube'
});
Object.assign(_global_server_js__WEBPACK_IMPORTED_MODULE_2__["default"].youtube, {
  getCredentials: async function () {
    return {
      apiKey: process.env.YOUTUBE_API_KEY,
      clientId: process.env.YOUTUBE_CLIENT_ID
    };
  }
});
/* harmony default export */ __webpack_exports__["default"] = (auth);

/***/ }),

/***/ "./server/db.js":
/*!**********************!*\
  !*** ./server/db.js ***!
  \**********************/
/*! exports provided: default, pgp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pgp", function() { return pgp; });
/* harmony import */ var pg_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg-promise */ "pg-promise");
/* harmony import */ var pg_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg_promise__WEBPACK_IMPORTED_MODULE_0__);
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// builtin
// external

const pgp = pg_promise__WEBPACK_IMPORTED_MODULE_0___default()({//TODO initialization options here: //L http://vitaly-t.github.io/pg-promise/module-pg-promise.html
}); //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

const config = {
  // https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
  // TODO create new db user with restricted capabilities
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_NAME || 'test',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'pgPassword'
};
const db = pgp(config); //C create a single db object for entire app

/* harmony default export */ __webpack_exports__["default"] = (db);

const schema = {
  name: 'sj',
  tables: {
    users: {
      name: 'users',
      columns: {
        id: {
          name: 'id'
        },
        name: {
          name: 'name'
        },
        password: {
          name: 'password'
        },
        email: {
          name: 'email'
        },
        spotifyRefreshToken: {
          name: 'spotify_refresh_token'
        }
      }
    }
  }
};

/***/ }),

/***/ "./server/global-server.js":
/*!*********************************!*\
  !*** ./server/global-server.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../public/js/utility/index.js */ "./public/js/utility/index.js");
/* harmony import */ var _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../public/js/global.js */ "./public/js/global.js");
/* harmony import */ var _db_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db.js */ "./server/db.js");
/* harmony import */ var _live_data_server_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./live-data-server.js */ "./server/live-data-server.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_5__);
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //G CRUD MAP
    Create = add
    Retrieve = get
    Update = edit
    Delete = remove

    //R CRUD DATA FORMAT
		get functions will be allowed to get multiple resources (just a simple query based on matches), for example getting a playlist with only userId will get all playlists by that user
		
		there is some confusion about what is 'known' information - because playlists hold data on the tracks they contain, but users don't hold data on the playlists they have. get needs the ability for multiple matches because it is not 'known' by the client what it contains (playlist is only able to do this because the multiple query is done manually server-side when getting the original playlist, this is not done for user)
	
		two directions - either make user retrieve all of it's containing playlists (lots of data being passed around here, no way to do a different query for playlists or tracks separated from user), or allow multiple querying (creates a difference between get and the other CRUD methods (add, edit, and remove could be done in multiple but these are all methods where the client 'knows' the exact resource they're manipulating and can be done iteratively on the client-side)
	
		maybe make all CRUD methods multiply possible (for admin stuff? remove all tracks in a playlist (at once) without doing them iteratively client-side), all of these would have to fail if any one part fails (using that postgres thing (transaction commit?))

		all CRUD will return an array of any number of rows

		GET should be the only method used for search/query. EDIT & DELETE (& ADD) should not, therefore, editing or deleting a resource should only be done when it's id is known (after probably GETing it), (this clears up confusion: say we want to edit a track where its property is x, this is done in the GET method, but here is an issue when determining what data is the replacement data and what data is the query data - therefore only the id should be used as the query data (because it cant be changed), an the rest is the replacement data)

		because of this it becomes: get | add, edit, remove   or   get, remove | add, edit    (because it could make sense for remove to query too because it doesn't have replacement data, but not add because it doesn't need a query), it comes down to consistency, get could take a single object, add, edit, remove, could take an array of objects (and return single success/failure?), what about get taking an array and returning an array
		
		//L multiple resources with one request: https://stackoverflow.com/questions/32098423/rest-updating-multiple-resources-with-one-request-is-it-standard-or-to-be-avo


	//R sj.ErrorList
		ErrorList should not be a wrapper for a list of errors, ErrorList should be a version of a single error that has multiple 'parallel' parts (ie: adding a user and having an issue with multiple fields - its still a single error with one resource (a user) but there are multiple parts to the error that need to be evaluated in parallel not in sequence)
		
		would this not mean that requests are also evaluated in parallel? that response arrays should all have Success or ErrorList wrappers?, wouldn't this be redundant - if everything is already an array why have a wrapper for it? what would be the default wrapper for request data like editTracks([{}, {}, ...]) ?

	//G JAVASCRIPT GUIDELINES
		when returning a promise / async function, use return await Promise()
		//L https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
		//L https://www.reddit.com/r/javascript/comments/7idasp/await_vs_return_vs_return_await/ 
		
		//L proper use of array methods: https://medium.com/front-end-weekly/stop-array-foreach-and-start-using-filter-map-some-reduce-functions-298b4dabfa09
	
	//R CLASS NAMESPACES
		I started using Object.assign() to supplement sj.Entity (and other classes) for server-specific functionality, however it was limiting me to shallow assignment - which required a bunch of functions to have prefixes (addPrepare, getPrepare, etc.), and I really wanted to avoid calling these functions like: this[`${method}Prepare`](), I wanted functional assignment much like class constructors, so I decided to switch to using  (function () {}).call()  which acts kind of reverse to how its used as 'super' in function classes, basically calling another constructor(?) later
		
		two ways to implement: namespace within the class - this requires those namespaced functions to be called via this.namespace.fn.call(this, ...), or just prefix the functions which requires them to be called via this[`${namespace}Fn`](...), still not sure which is better
		
		actually - don't do that namespace thing, as the namespace is still a reference to an object, so if a child class changes one of its properties, it changes it for all classes with that same namespace

	//G FUNCTION MODIFICATION VS RETURN NEW
		modifying & returning passed objects in functions, in general I'm deciding to modify passed objects in functions and return the same reference, however when the data-structure changes (nesting, cloning, etc.), the passed object should not be modified. this can be seen in sj.Entity.common() validation, where any nested validated properties are flattened into a root object
*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝  

/*
	// PRODUCTION
		tree-shake any objects that don't need to be exported (remove from sj.x, just hae them locally defined)
		after functions are mostly debugged - remove a lot of the .catch(sj.propagate) - this is mainly tracing and unhandled error

	// BEST PRACTICE
		//L best practices: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
		//L review common pg-promise mistakes: https://github.com/vitaly-t/pg-promise/wiki/Common-Mistakes#invalid-query-formatting-with-manual-string-concatenation-and-es6-template-strings

	// SECURITY

		issue for private query variables (eg password), if someone queries for users where password = x, the passwords wont be returned, but they will still receive a list of users that that query matches

		//? user id being in the session.user object is basically the user's access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out - I think this info is never sent to the client, just stored in the server and accessed via cookie key
		
		permissions: [admin, self, password, link, public, etc.]

		track names that don't fit the requirements (too short, too long, etc. will throw an error when trying to add, this isn't desirable because all the track names will be external) should use casting if those restrictions are necesary

	// CONSIDER
    	delegating unexpected error catches to only top-level entry points, (so that catchUnexpected() doesn't have to be repeated for every single 

	// GENERAL
		//! IMPORTANT //! check any CRUD functions (like addTrack()) that rely on the current state of the database for information - because asyncMap() functions are executed in parallel, and not in series, this could cause collisions
		replace all database variables, column names, etc. with constants inside this file (or the db file)
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝ 
// BUILT-IN
// INTERNAL



 // EXTERNAL

 //C global.js uses fetch

 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝    

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].fetch = node_fetch__WEBPACK_IMPORTED_MODULE_4___default.a; // BCRYPT

const saltRounds = 10; // DATABASE

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db = _db_js__WEBPACK_IMPORTED_MODULE_2__["default"]; //C for use of db with globals so that db doesn't have to be imported twice
// LIVE DATA

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].liveData = _live_data_server_js__WEBPACK_IMPORTED_MODULE_3__["default"]; //  ██╗   ██╗████████╗██╗██╗     
//  ██║   ██║╚══██╔══╝██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝ 
// POSTGRES
//? this should be called once on startup, where should this go?

(async () => {
  /*
  	const schema = {
  		name: 'sj',
  		tables: {
  			users: {
  				name: 'users',
  				columns: {
  					id: {
  						name: 'id',
  					},
  					name: {
  						name: 'name',
  					},
  					password: {
  						name: 'password',
  					},
  					email: {
  						name: 'email',
  					},
  					spotifyRefreshToken: {
  						name: 'spotifyRefreshToken',
  					},
  				},
  			},
  		},
  	};
  */
  // initialize
  return _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db.tx(async function (t) {
    // TODO this will not alter tables if they do already exist (save this for migration)
    // schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
    // constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
    // foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
    // ON DELETE CASCADE also removes any referencing rows when the referenced row is removed
    // TODO CHECK constraint that visibility, source matches possible  states
    // quotes: https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql
    // default constraint names: https://stackoverflow.com/questions/4107915/postgresql-default-constraint-names
    if (false) {} // TODO add self, public, & private VIEWs for tables (if relevant)
    // !!!  remember to add error messages for constraint violations to parsePostgresError() in functions.js
    // !!! column names are camelCase (because they get converted to properties), everything else is underscore


    return t.none(`CREATE SCHEMA IF NOT EXISTS "sj"`).catch(rejected => {
      throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
        log: true,
        origin: 'schema initialization',
        message: 'database error',
        reason: rejected.message,
        content: rejected,
        target: 'notify',
        cssClass: 'notifyError'
      });
    }).then(resolved => {
      // https://www.postgresql.org/docs/9.1/static/sql-createtable.html
      //! spotifyRefreshToken is specifically pascal case to match object property names
      return t.none(`CREATE TABLE IF NOT EXISTS "sj"."users" (
				"id" SERIAL CONSTRAINT "users_id_pkey" PRIMARY KEY,
                "name" text CONSTRAINT "users_name_key" UNIQUE,
                "password" text,
				"email" text CONSTRAINT "users_email_key" UNIQUE,
				"spotifyRefreshToken" text
            );`).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: true,
          origin: 'users table initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      //L views: https://www.postgresql.org/docs/8.1/static/tutorial-views.html
      //L create or replace: https://stackoverflow.com/questions/48662843/what-is-the-equivalent-of-create-view-if-not-exists-in-postresql
      return t.none(`CREATE OR REPLACE VIEW "sj"."users_self" AS
                SELECT id, name, email 
                FROM "sj"."users"
            ;`).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: true,
          origin: 'users_self initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      return t.none(`CREATE OR REPLACE VIEW "sj"."users_public" AS
                SELECT id, name
                FROM "sj"."users"
            ;`).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: true,
          origin: 'users_public initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      return t.none(`CREATE TABLE IF NOT EXISTS "sj"."playlists" (
                "id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
                "userId" integer CONSTRAINT "playlists_userId_fkey" REFERENCES "sj"."users" ON DELETE CASCADE ON UPDATE CASCADE,
                "name" text,
                "visibility" text,
                "description" text,
                "image" text,
                "color" text,
                
                CONSTRAINT "playlists_userId_name_key" UNIQUE ("userId", "name")
            );`).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: true,
          origin: 'playlists table initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).then(resolved => {
      return t.none(`CREATE TABLE IF NOT EXISTS "sj"."tracks" (
                "id" SERIAL CONSTRAINT "tracks_id_pkey" PRIMARY KEY,
                "playlistId" integer CONSTRAINT "tracks_playlistId_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE ON UPDATE CASCADE,
                "position" integer,
                "source" text,
                "sourceId" text,
                "name" text,
                "duration" integer,
                "artists" text ARRAY DEFAULT ARRAY[]::text[],

                CONSTRAINT "tracks_playlistId_position_key" UNIQUE ("playlistId", "position") DEFERRABLE INITIALLY IMMEDIATE 
            );`).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: true,
          origin: 'tracks table initialization',
          message: 'database error',
          reason: rejected.message,
          content: rejected,
          target: 'notify',
          cssClass: 'notifyError'
        });
      });
    }).catch(rejected => {
      throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate(rejected);
    });
  }).catch(rejected => {
    throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate(rejected);
  });
})().then(resolved => {
  new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
    origin: 'initialize database',
    message: 'database initialized'
  });
}).catch(rejected => {
  console.log(rejected);
});

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError = function (pgError, sjError) {
  //TODO any validation needed here?
  //TODO consider separating insertion checks into Conditions so multiple parameters are checked
  //TODO add targets and cssClasses to each violation case too
  sjError.code = pgError.code;
  sjError.reason = pgError.message;
  sjError.content = pgError; // https://www.postgresql.org/docs/9.6/static/errcodes-appendix.html
  // Class 23 — Integrity Constraint Violation

  if (pgError.code === '23505') {
    // unique_violation
    // users
    if (pgError.constraint === 'users_name_key') {
      sjError.message = 'this user name is already taken';
    }

    if (pgError.constraint === 'users_email_key') {
      sjError.message = 'this email is already in use';
    } // playlists


    if (pgError.constraint === 'playlists_userId_name_key') {
      sjError.message = 'you already have a playlist with this name';
    } // tracks


    if (pgError.constraint === 'tracks_position_key') {
      sjError.message = 'a track already exists at this position';
    }
  }

  if (pgError.code === '23503') {
    // foreign_key_violation
    // playlists
    if (pgError.constraint === 'playlists_userId_fkey') {
      sjError.message = 'cannot add a playlist for an unknown user';
    } // tracks


    if (pgError.constraint === 'tracks_playlistId_fkey') {
      sjError.message = 'cannot add a track for an unknown playlist';
    }
  }

  sjError.announce();
  return sjError;
};

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildValues = function (mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    //C this shouldn't insert anything
    return `("id") SELECT 0 WHERE 0 = 1`;
  } else {
    let columns = [];
    let values = [];
    let placeholders = [];
    Object.keys(mappedEntity).forEach((key, i) => {
      columns.push(key);
      values.push(mappedEntity[key]);
      placeholders.push(`$${i + 1}`); //C $1 based placeholders
    });
    columns = columns.join('", "'); //C inner delimiter

    columns = `("${columns}")`; //C outer

    placeholders = placeholders.join(', ');
    placeholders = `(${placeholders})`; //? this should be able to format arrays just as any other value, otherwise the format is: ARRAY[value1, value2, ...]

    return _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`${columns} VALUES ${placeholders}`, values);
  }
};

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildWhere = function (mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    //TODO hacky
    //C return a false clause
    return '0 = 1';
  } else {
    //C pair as formatted string
    let pairs = [];
    pairs = Object.keys(mappedEntity).map(key => {
      //C wrap array in another array so that pgp doesn't think its values are for separate placeholders
      let input = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(mappedEntity[key], Array) ? [mappedEntity[key]] : mappedEntity[key];
      return _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`"${key}" = $1`, input); //! if the value here is undefined, it wont format, it will simply leave the string as '"key" = $1'
    }); //C join with ' AND '

    return pairs.join(' AND ');
  }
};

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildSet = function (mappedEntity) {
  if (Object.keys(mappedEntity).length === 0) {
    //TODO hacky
    //C don't make any change
    //! this does have to reference a column that always exists (id)
    return '"id" = "id"';
  } else {
    let pairs = []; //C pair as formatted string

    pairs = Object.keys(mappedEntity).map(key => {
      let input = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(mappedEntity[key], Array) ? [mappedEntity[key]] : mappedEntity[key];
      return _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`"${key}" = $1`, input);
    }); //C join with ', '

    return pairs.join(', ');
  }
}; //  ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
//  ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
//  ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
//  ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
//  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ 
// CRUD


_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].session.login = async function (db, ctx, user) {
  //C validate
  user.name = await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User.schema.name.rule.check(user.name).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].content);
  user.password = await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User.schema.password.rule.check(user.password).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].content); //! this will error on stuff like 'password must be over x characters long' when really it should just be 'password incorrect', maybe just have a string check rule?
  //C get password

  let existingPassword = await db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).then(resolved => {
    return resolved.password;
  }).catch(rejected => {
    throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      log: false,
      origin: 'login()',
      message: 'could not login, database error'
    }));
  }); //C check password

  let isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_5___default.a.compare(user.password, existingPassword).catch(rejected => {
    throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      log: true,
      origin: 'login()',
      message: 'server error',
      reason: 'hash compare failed',
      content: rejected,
      target: 'loginPassword',
      cssClass: 'inputError'
    });
  });

  if (!isMatch) {
    throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      log: true,
      origin: 'login()',
      message: 'incorrect password',
      target: 'loginPassword',
      cssClass: 'inputError'
    });
  } //C get user


  user = await db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', user.name).catch(rejected => {
    throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      log: false,
      origin: 'login()',
      message: 'could not login, database error'
    }));
  });
  ctx.session.user = new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User(user);
  return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
    origin: 'login()',
    message: 'user logged in',
    content: ctx.session.user
  });
};

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].session.get = async function (ctx) {
  await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn(ctx);
  return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
    origin: 'getMe()',
    content: ctx.session.user
  });
};

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].session.logout = async function (ctx) {
  delete ctx.session.user;
  return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
    origin: 'logout()',
    message: 'user logged out'
  });
}; // UTIL


_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLoggedIn = async function (ctx) {
  if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(ctx.session.user, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User) || !_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(ctx.session.user.id, 'integer')) {
    throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      log: true,
      origin: 'isLoggedIn()',
      code: 403,
      message: 'you must be logged in to do this',
      reason: 'user is not logged in',
      target: 'notify',
      cssClass: 'notifyError' // TODO consider denial error rather than error error (you messed up vs I messed up)

    });
  } //C redundancy check to make sure id is right format


  await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Rule.id.check(ctx.session.user.id); //TODO this doesn't check if the user exists however, though wouldn't this be expensive? searching the database everytime the user wants to know if they're logged in, (every page)

  return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
    origin: 'isLoggedIn()',
    message: 'user is logged in'
  });
}; //   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ 


_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Entity.augmentClass({
  prototypeProperties: parent => ({
    async add(db) {
      return await this.constructor.add(this, db);
    },

    async get(db) {
      return await this.constructor.get(this, db);
    },

    async edit(db) {
      return await this.constructor.edit(this, db);
    },

    async remove(db) {
      return await this.constructor.remove(this, db);
    }

  }),

  staticProperties(parent) {
    // CRUD METHODS
    this.add = async function (query, db = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db) {
      return await this.frame(db, query, 'add');
    };

    this.get = async function (query, db = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db) {
      return await this.frame(db, query, 'get');
    };

    this.edit = async function (query, db = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db) {
      return await this.frame(db, query, 'edit');
    };

    this.remove = async function (query, db = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db) {
      return await this.frame(db, query, 'remove');
    };

    this.getMimic = async function (query, db = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db) {
      //C getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in sj.liveData.notify()
      return await this.frame(db, query, 'getMimic');
    }; // FRAME


    this.frame = async function (db, anyEntities, methodName) {
      //C catch sj.Entity
      if (this === _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Entity) throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
        origin: 'sj.Entity.[CRUD]',
        reason: `cannot call CRUD method directly on sj.Entity`
      }); //C cast as array

      const entities = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any(anyEntities); //C shorthand

      const isGetMimic = methodName === 'getMimic'; //C store getMimic

      if (isGetMimic) methodName = 'get'; //C 'getMimic' === 'get' for functions: [methodName+'Function']

      const isGet = methodName === 'get';
      const accessory = {};
      const after = await db.tx(async t => {
        //C process
        const beforeEntities = await this[methodName + 'Before'](t, entities, accessory); //C validate

        const validatedEntities = await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(beforeEntities, async entity => await this.validate(entity, methodName).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate)); //C prepare

        const preparedEntities = await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(validatedEntities, async entity => await this[methodName + 'Prepare'](t, entity, accessory).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate)); //C accommodate

        const influencedEntities = !isGet ? await this[methodName + 'Accommodate'](t, preparedEntities, accessory).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate) : []; //C map

        const inputMapped = this.mapColumns(preparedEntities);
        const influencedMapped = !isGet ? this.mapColumns(influencedEntities) : []; //C execute SQL for inputs

        const inputBefore = [];
        const inputAfter = isGetMimic ? inputMapped : [];

        if (!isGetMimic) {
          await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(inputMapped, async entity => {
            //C before, ignore add
            if (!isGet && methodName !== 'add') {
              const before = await this.getQuery(t, Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(entity, this.filters.id)).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate);
              inputBefore.push(...before);
            } //C after, ignore remove (still needs to execute though)


            const after = await this[methodName + 'Query'](t, entity).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate);
            if (methodName !== 'remove') inputAfter.push(...after);
          }).catch(rejected => {
            throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate(new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].ErrorList({ ...this[methodName + 'Error'](),
              content: rejected
            }));
          });
        } //C execute SQL for influenced


        const influencedBefore = [];
        const influencedAfter = [];

        if (!isGet) {
          await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(influencedMapped, async influencedEntity => {
            const before = await this.getQuery(t, Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(influencedEntity, this.filters.id)).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate);
            influencedBefore.push(...before);
            const after = await this.editQuery(t, influencedEntity).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate);
            influencedAfter.push(...after);
          }).catch(rejected => {
            throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate(new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].ErrorList({ ...this[methodName + 'Error'](),
              content: rejected
            }));
          });
        } //C group for iteration


        const all = [inputBefore, inputAfter, influencedBefore, influencedAfter]; //C unmap

        const unmapped = all.map(list => this.unmapColumns(list)); //C process

        return await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(unmapped, async list => await this[methodName + 'After'](t, list, accessory).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate));
      }).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate); //! finish the transaction here so that notify won't be called before the database has updated
      //C shake for subscriptions with getOut filter

      const shookGet = after.map(list => _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any(list).map(item => Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(item, this.filters.getOut))); //C timestamp, used for ignoring duplicate notifications in the case of before and after edits, and overlapping queries

      const timestamp = Date.now(); //C if get, don't notify

      if (!isGet) shookGet.forEach(list => _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].liveData.notify(this, list, timestamp, methodName)); //C if getMimic, return shookGet-after
      else if (isGetMimic) return shookGet[1]; //C shake for return

      const shook = after.map(list => _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any(list).map(item => Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["pick"])(item, this.filters[methodName + 'Out']))); //C rebuild

      const built = shook.map(list => list.map(entity => new this(entity)));
      return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].SuccessList({ ...this[methodName + 'Success'](),
        //R content is the inputAfter, for removals this will be an empty array, if in the future some 'undo' functionality is needed consider: returned data should still be filtered by removeOut, and therefore might destroy data if this returned data is used to restore it
        content: built[1],
        timestamp
      });
    }; // FRAME PARTS
    //G all of these parts are dependant on each other (eg. accessory), so it is ok to make assumptions between these functions
    //C processes all before validation


    this.addBefore = this.getBefore = this.editBefore = this.removeBefore = async function (t, entities, accessory) {
      return entities.slice();
    }; //C validates each using sj.Entity.schema


    this.validate = async function (entity, methodName) {
      const validated = {};
      await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(Object.keys(this.schema), async key => {
        const prop = this.schema[key]; //C catches

        if (!(prop.rule instanceof _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Rule)) {
          // sj.Rule
          throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
            log: true,
            origin: 'sj.Entity.validate()',
            message: 'validation error',
            reason: `${key}'s rule is not an sj.Rule`,
            content: prop
          });
        } //C check if optional and not empty, or if required


        if (prop[methodName].check && !_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(entity[key]) || prop[methodName].check === 2) {
          //G the against property can be specified in the schema and then assigned to the entity[againstName] before validation
          const checked = await prop.rule.check(entity[key], entity[prop.against]);
          validated[key] = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].content(checked);
          return checked;
        } else {
          //C don't pack into validated
          return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
            origin: 'sj.Entity.validate()',
            message: `optional ${key} is empty, skipped validation`
          });
        }
      }).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].ErrorList({
          origin: 'sj.Entity.validate()',
          message: 'one or more issues with properties',
          reason: 'validating properties returned one or more errors',
          content: rejected
        });
      });
      return validated;
    }; //C modifies each after validation


    this.addPrepare = this.getPrepare = this.editPrepare = this.removePrepare = async function (t, entity, accessory) {
      return Object.assign({}, entity);
    }; //C modifies input entities, returns other influenced entities. checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities


    this.addAccommodate = this.getAccommodate = this.editAccommodate = this.removeAccommodate = async function (t, entities, accessory) {
      return [];
    }; //C maps js property names to database column names


    this.mapColumns = function (entities) {
      //C switches entities' js named keys for column named keys based on schema
      return entities.map(entity => {
        //C for each entity
        let mappedEntity = {};
        Object.keys(entity).forEach(key => {
          //C for each property
          if (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(this.schema[key], Object) && _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(this.schema[key].columnName, String)) {
            //C if schema has property 
            mappedEntity[this.schema[key].columnName] = entity[key]; //C set mappedEntity[columnName] as property value
          } else {
            console.warn(`sj.Entity.mapColumns() - property ${key} in entity not found in schema`);
          }
        });
        return mappedEntity;
      });
    };

    this.unmapColumns = function (mappedEntities) {
      //C inverse of mapColumns()
      return mappedEntities.map(mappedEntity => {
        //C for each entity
        let entity = {};
        Object.keys(mappedEntity).forEach(columnName => {
          //C for each columnName
          let key = Object.keys(this.schema).find(key => this.schema[key].columnName === columnName); //C find key in schema with same columnName

          if (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(key, String)) {
            //C set entity[key] as value of mappedEntity[columnName]
            entity[key] = mappedEntity[columnName];
          } else {
            console.warn(`sj.Entity.unmapColumns() - column ${columnName} in mappedEntity not found in schema`);
          }
        });
        return entity;
      });
    }; //! this should be overwritten with different ORDER BY columns


    this.queryOrder = `ORDER BY "id" ASC`; //C executes SQL queries

    this.addQuery = async function (t, mappedEntity) {
      let values = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildValues(mappedEntity); //? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
      //L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text

      let row = await t.one(`
				INSERT INTO "sj"."${this.table}" 
				$1:raw 
				RETURNING *
			`, [values]).catch(rejected => {
        throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: false,
          origin: `sj.${this.name}.add()`,
          message: `could not add ${this.name}s`
        }));
      });
      return row;
    };

    this.getQuery = async function (t, mappedEntity) {
      let where = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildWhere(mappedEntity);
      let rows = await t.any(`
				SELECT * 
				FROM "sj"."${this.table}" 
				WHERE $1:raw
				${this.queryOrder}
			`, [where]).catch(rejected => {
        throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: false,
          origin: `sj.${this.name}.get()`,
          message: `could not get ${this.name}s`
        }));
      });
      return rows;
    };

    this.editQuery = async function (t, mappedEntity) {
      let {
        id,
        ...mappedEntitySet
      } = mappedEntity;
      let set = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildSet(mappedEntitySet);
      let where = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildWhere({
        id
      });
      let row = await t.one(`
				UPDATE "sj"."${this.table}" 
				SET $1:raw 
				WHERE $2:raw 
				RETURNING *
			`, [set, where]).catch(rejected => {
        throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: false,
          origin: `sj.${this.name}.edit()`,
          message: `could not edit ${this.names}`
        }));
      });
      return row;
    };

    this.removeQuery = async function (t, mappedEntity) {
      let where = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].buildWhere(mappedEntity);
      let row = await t.one(`
				DELETE FROM "sj"."${this.table}" 
				WHERE $1:raw 
				RETURNING *
			`, where).catch(rejected => {
        throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: false,
          origin: `sj.${this.name}.remove()`,
          message: `could not remove ${this.names}s`
        }));
      });
      return row;
    }; //C processes all after execution


    this.addAfter = this.getAfter = this.editAfter = this.removeAfter = async function (t, entities, accessory) {
      return entities.slice();
    }; //C custom SuccessList and ErrorList


    this.addSuccess = function () {
      return {
        origin: `sj.${this.name}.add()`,
        message: `added ${this.name}s`
      };
    };

    this.getSuccess = function () {
      return {
        origin: `sj.${this.name}.get()`,
        message: `retrieved ${this.name}s`
      };
    };

    this.editSuccess = function () {
      return {
        origin: `sj.${this.name}.edit()`,
        message: `edited ${this.name}s`
      };
    };

    this.removeSuccess = function () {
      return {
        origin: `sj.${this.name}.get()`,
        message: `removed ${this.name}s`
      };
    };

    this.addError = function () {
      return {
        origin: `sj.${this.name}.add()`,
        message: `failed to add ${this.name}s`
      };
    };

    this.getError = function () {
      return {
        origin: `sj.${this.name}.get()`,
        message: `failed to retrieve ${this.name}s`
      };
    };

    this.editError = function () {
      return {
        origin: `sj.${this.name}.edit()`,
        message: `failed to edit ${this.name}s`
      };
    };

    this.removeError = function () {
      return {
        origin: `sj.${this.name}.remove()`,
        message: `failed to remove ${this.name}s`
      };
    };
  }

});
_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Source.augmentClass({
  constructorProperties: parent => ({
    defaults: {
      serverTestProp: null
    }
  })
}); //  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ 

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User.augmentClass({
  staticProperties(parent) {
    // CRUD
    this.addPrepare = this.editPrepare = async function (t, user) {
      let newUser = Object.assign([], user); //C hash password
      //TODO might be a vulnerability here with this string check

      if (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(newUser.password, String)) newUser.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_5___default.a.hash(newUser.password, saltRounds).catch(rejected => {
        throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: true,
          origin: 'sj.User.add()',
          message: 'failed to add user',
          reason: 'hash failed',
          content: rejected
        });
      });
      return newUser;
    };

    this.queryOrder = 'ORDER BY "id" ASC';
  }

}); //  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝    

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Playlist.augmentClass({
  staticProperties: parent => ({
    // CRUD
    queryOrder: 'ORDER BY "userId" ASC, "id" ASC'
  })
}); //  ████████╗██████╗  █████╗  ██████╗██╗  ██╗
//  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//     ██║   ██████╔╝███████║██║     █████╔╝ 
//     ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
//     ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ 

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Track.augmentClass({
  prototypeProperties(parent) {
    this.order = async function (db = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].db) {
      return await this.constructor.order(db, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].any(this));
    };
  },

  staticProperties(parent) {
    // CRUD
    this.addBefore = this.getBefore = this.editBefore = this.removeBefore = async function (t, entities) {
      let newEntities = entities.slice();
      newEntities.forEach(entity => {
        entity.source = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(entity.source, Object) && _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(entity.source.name, String) ? entity.source.name : undefined;
      });
      return newEntities;
    };

    this.addPrepare = async function (t, track) {
      //C set id of tracks to be added as a temporary symbol, so that sj.Track.order() is able to identify tracks
      let newTrack = { ...track,
        id: Symbol()
      };

      if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(newTrack.position, 'integer')) {
        let existingTracks = await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Track.get({
          playlistId: newTrack.playlistId
        }, t).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].content);
        newTrack.position = existingTracks.length;
      }

      return newTrack;
    };

    this.removePrepare = async function (t, track) {
      //C set position of tracks to be removed as null, so that sj.Track.order() recognizes them as tracks to remove
      return { ...track,
        position: null
      };
    };

    this.queryOrder = 'ORDER BY "playlistId" ASC, "position" ASC';

    this.addAccommodate = this.editAccommodate = this.removeAccommodate = async function (t, tracks) {
      //L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
      //L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
      //L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
      await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
        throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
          log: false,
          origin: 'sj.Track.move()',
          message: 'could not order tracks, database error',
          target: 'notify',
          cssClass: 'notifyError'
        }));
      });
      return await this.order(t, tracks).then(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].content).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].propagate);
    };

    this.addAfter = this.getAfter = this.editAfter = this.deleteAfter = async function (t, entities) {
      let newEntities = entities.slice();
      newEntities.forEach(entity => {
        entity.source = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Source.instances.find(source => source.name === entity.source);
      });
      return newEntities;
    }; // UTIL


    this.order = async function (db, tracks) {
      //C takes a list of input tracks for an INSERT, UPDATE, or DELETE query
      //! properties should be validated at this point
      //! tracks to be added must have a Symbol() id, this will be removed
      //! tracks to be deleted must have a null position, this will be removed
      //C modifies the input track's positions, if needed
      //C returns a list of influenced tracks with modified positions, if needed
      //C out-of-bounds positions will be repositioned at the start or end of the playlist
      //C duplicate positions will be repositioned in order of input order
      //C in the case of repositioned tracks that still overlap with other input tracks, all will be repositioned in order of input position
      //C filter out tracks
      let inputTracks = tracks.filter(track => //C without an id (including symbol)
      (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(track.id) || typeof track.id === 'symbol') && ( //C and without a position (including null) or playlistId
      !_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(track.position) || track.position === null || !_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isEmpty(track.playlistId))); //C filter out duplicate tracks (by id, keeping last), by filtering for tracks where every track after does not have the same id

      inputTracks = inputTracks.filter((track, index, self) => self.slice(index + 1).every(trackAfter => track.id !== trackAfter.id)); //C return early if none are moving

      if (inputTracks.length === 0) {
        return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].SuccessList({
          origin: 'sj.Track.order()',
          message: 'track positions did not need to be set'
        });
      } //console.log('inputTracks.length:', inputTracks.length, '\n ---');


      return await db.tx(async t => {
        const playlists = [];
        const influencedTracks = [];
        const inputIndex = Symbol(); //C retrieve track's playlist, group each track by playlist & moveType

        await Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["asyncMap"])(inputTracks, async (track, index) => {
          const storePlaylist = function (playlistId, existingTracks) {
            if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(playlistId, 'integer')) throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
              origin: 'sj.Track.order()',
              reason: `playlistId is not an integer: ${playlistId}`
            });
            if (!Array.isArray(existingTracks)) throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
              origin: 'sj.Track.order()',
              reason: `existingTracks is not an array: ${existingTracks}`
            }); //C stores playlist in playlists if not already stored

            let existingPlaylist = playlists.find(playlist => playlist.id === playlistId);

            if (!existingPlaylist) {
              playlists.push({
                id: playlistId,
                original: existingTracks,
                //C move actions, these have priority positioning
                inputsToMove: [],
                inputsToAdd: [],
                inputsToRemove: []
              });
              existingPlaylist = playlists[playlists.length - 1];
            }

            return existingPlaylist;
          }; //C temporarily store inputIndex on track, this is required as the input order is lost when tracks are grouped by playlist


          track[inputIndex] = index; //C determine move action

          const action = typeof track.id === 'symbol' ? 'Add' : track.position === null ? 'Remove' : 'Move'; //C get current playlist by playlistId if action === 'add', else by track.id using a sub-query
          //L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery

          const currentQuery = action === 'Add' ? _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = $1
					`, track.playlistId) : _db_js__WEBPACK_IMPORTED_MODULE_2__["pgp"].as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = (
							SELECT "playlistId"
							FROM "sj"."tracks"
							WHERE "id" = $1
						)
					`, track.id);
          const currentPlaylist = await t.any('$1:raw', currentQuery).catch(rejected => {
            throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
              log: false,
              origin: 'sj.Track.order()',
              message: 'could not move tracks'
            }));
          }); //C store

          const currentPlaylistStored = storePlaylist(action === 'Add' ? track.playlistId : currentPlaylist[0].playlistId, currentPlaylist); //! track.playlistId might not be currentPlaylistId
          //C strip playlistId from playlist, this is done so that only modified properties will remain on the track objects

          currentPlaylistStored.original.forEach(t => {
            delete t.playlistId;
          });

          if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(track.playlistId, 'integer') || track.playlistId === currentPlaylistStored.id) {
            //C if not switching playlists
            //C group by action
            currentPlaylistStored['inputsTo' + action].push(track);
          } else {
            //C if switching playlists
            //C this should catch tracks with playlistIds but no position
            const anotherPlaylist = await t.any(`
							SELECT "id", "position", "playlistId"
							FROM "sj"."tracks" 
							WHERE "playlistId" = $1
						`, track.playlistId).catch(rejected => {
              throw _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].parsePostgresError(rejected, new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
                log: false,
                origin: 'sj.Track.order()',
                message: 'could not move tracks'
              }));
            });
            const anotherPlaylistStored = storePlaylist(track.playlistId, anotherPlaylist);
            anotherPlaylistStored.original.forEach(t => {
              delete t.playlistId;
            }); //C track is removed from its current playlist, and added to another playlist

            currentPlaylistStored.inputsToRemove.push(track);
            anotherPlaylistStored.inputsToAdd.push(track);
          }

          return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
            origin: 'sj.Track.order()',
            message: "retrieved track's playlist"
          });
        }).catch(rejected => {
          throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].ErrorList({
            origin: 'sj.Track.order() - movingTracks iterator',
            message: `could not retrieve some track's playlist`,
            content: rejected
          });
        }); //console.log('playlists.length:', playlists.length, '\n ---');
        //C calculate new track positions required to accommodate input tracks' positions

        playlists.forEach(playlist => {
          //C populate others with tracks in original that are not in inputsTo Add, Remove, or Move
          //! inputsToRemove can be ignored from this point on, these tracks aren't included in others and wont be added to the final ordered list
          playlist.others = playlist.original.filter(originalTrack => !playlist.inputsToAdd.some(addingTrack => addingTrack.id === originalTrack.id) && !playlist.inputsToRemove.some(trackToRemove => trackToRemove.id === originalTrack.id) && !playlist.inputsToMove.some(movingTrack => movingTrack.id === originalTrack.id)); //console.log('playlist.others.length:', playlist.others.length);
          //C combine both adding and moving, 

          playlist.inputsToPosition = [...playlist.inputsToAdd, ...playlist.inputsToMove]; //C give tracks with no position an Infinite position so they get added to the bottom of the playlist

          playlist.inputsToPosition.forEach(trackToPosition => {
            if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(trackToPosition.position, Number)) {
              trackToPosition.position === Infinity;
            }
          }); //C sort

          Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"])(playlist.others, (a, b) => a.position - b.position); //C stable sort by inputIndex then position to resolve clashes by position then inputIndex

          Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"])(playlist.inputsToPosition, (a, b) => a[inputIndex] - b[inputIndex]);
          Object(_public_js_utility_index_js__WEBPACK_IMPORTED_MODULE_0__["stableSort"])(playlist.inputsToPosition, (a, b) => a.position - b.position); //console.log('playlist.inputsToAdd.length:', playlist.inputsToAdd.length);
          //console.log('playlist.inputsToRemove.length:', playlist.inputsToRemove.length);
          //console.log('playlist.inputsToMove.length:', playlist.inputsToMove.length, '\n ---');
          //console.log('playlist.inputsToPosition.length:', playlist.inputsToPosition.length, '\n ---');
          //C inputIndex is no longer needed, remove it from anything it was added to

          playlist.inputsToPosition.forEach(trackToPosition => {
            delete trackToPosition[inputIndex];
          });
          playlist.inputsToRemove.forEach(trackToRemove => {
            delete trackToRemove[inputIndex];
          }); //C populate merged by filling others tracks around combined tracks

          playlist.merged = []; //! these are copies that will be emptied below

          playlist.inputsToPositionCopy = [...playlist.inputsToPosition];
          playlist.othersCopy = [...playlist.others];
          let i = 0;

          while (playlist.othersCopy.length > 0) {
            if (playlist.inputsToPositionCopy.length > 0 && playlist.inputsToPositionCopy[0].position <= i) {
              //C if the next adding or moving track's position is at (or before, in the case of a duplicated position) the current index, transfer it to the merged list
              //C this will properly handle negative and duplicate positions
              //G shift removes the first item of an array and returns that item
              playlist.merged.push(playlist.inputsToPositionCopy.shift());
            } else {
              //C else - transfer the next others track
              playlist.merged.push(playlist.othersCopy.shift());
            }

            i++;
          } //C push rest of combined tracks
          //R this method was chosen over including combined.length > 0 in the while condition to prevent needless loops caused by ridiculously high positions, this was also chosen over original.length because adding + moving tracks could be greater the playlist length
          //L .push() and spread: https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating


          playlist.merged.push(...playlist.inputsToPositionCopy);
          playlist.inputsToPositionCopy.length = 0; //! remove combined tracks for consistent behavior
          //C populate playlist.influenced with all non-input tracks that have moved

          playlist.influenced = playlist.merged.filter((mergedTrack, index) => {
            let inOthers = playlist.others.find(otherTrack => otherTrack.id === mergedTrack.id);
            let influenced = inOthers && index !== inOthers.position; //C assign new positions (inputTracks too)

            mergedTrack.position = index;
            return influenced;
          }); //console.log('playlist.merged.length:', playlist.merged.length);
          //console.log('playlist.merged:\n', playlist.merged, '\n ---');
          //console.log('playlist.influenced.length:', playlist.influenced.length);
          //console.log('playlist.influenced:\n', playlist.influenced, '\n ---');

          influencedTracks.push(...playlist.influenced);
        }); //C remove temporary symbol id from add tracks and null position from delete tracks

        inputTracks.forEach(inputTrack => {
          if (typeof inputTrack.id === 'symbol') {
            delete inputTrack.id;
          }

          if (inputTrack.position === null) {
            delete inputTrack.position;
          }
        });
        return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].SuccessList({
          origin: 'sj.Track.order()',
          message: 'influenced tracks calculated',
          content: influencedTracks
        });
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
      	
      		for sj.Track.order()
      			there is a recursive loop hazard in here (basically if sj.Track.get() is the function that calls sj.Track.order() - sj.Track.order() itself needs to call sj.Track.get(), therefore a loop), however if everything BUT sj.Track.get() calls sj.Track.order(), then sj.Track.order() can safely call sj.Track.get(), no, the same thing happens with sj.Track.edit() - so just include manual queries, no have it so: sj.Track.get() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.Track.get(), and then have each use their own manual update queries - basically add, edit, remove can use these and sj.Track.get() but not each other - this is written down in that paper chart
      	
      		//R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:
      					//C for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
      		//! requires the INSERT command to be executed one at at a time for each input track
      		//R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks
      */
    };
  }

});
/* harmony default export */ __webpack_exports__["default"] = (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_environment_variables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/environment-variables.js */ "./config/environment-variables.js");
/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! minimist */ "minimist");
/* harmony import */ var minimist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(minimist__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-webpack */ "koa-webpack");
/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_webpack__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! koa-session */ "koa-session");
/* harmony import */ var koa_session__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(koa_session__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! socket.io */ "socket.io");
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _global_server_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global-server.js */ "./server/global-server.js");
/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes.js */ "./server/routes.js");
// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
	//L process.env: https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
	//L dotenv:  https://www.npmjs.com/package/dotenv
*/
//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/* 
	Put api keys into .env after creating methods to access them
	Some best practices: https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja
	Middleware best practices https://github.com/koajs/koa/blob/master/docs/guide.md

	errors thrown in some places (like routes) still aren't caught
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// TOP
 // BUILT-IN
// EXTERNAL


 //L https://github.com/koajs


 //L https://github.com/koajs/bodyparser

 //L https://github.com/koajs/session
//L https://github.com/socketio/socket.io#in-conjunction-with-koa

 //L socket io: https://socket.io/docs/emit-cheatsheet

 //TODO consider changing to the https module?
// INTERNAL
// import { clientOptions, clientIndexFileName } from '../config/webpack.config.js';


 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

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

(async function () {
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
  			const filename = path.resolve(config.output.path, clientIndexFileName);
  			ctx.response.type = 'html';
  			ctx.response.body = koaWebpackMiddleware.devMiddleware.fileSystem.createReadStream(filename);
  		};
  	}
  */

  const router = Object(_routes_js__WEBPACK_IMPORTED_MODULE_9__["default"])(routerOptions);
  const PORT = process.env.PORT || 3000; // KOA

  const app = new koa__WEBPACK_IMPORTED_MODULE_2___default.a();
  app.keys = [process.env.APP_KEY || 'imJustSomeKey'];
  const sessionConfig = {
    //TODO random keys: //L https://randomkeygen.com/
    //C (string)(default is koa:sess) cookie key
    key: 'koa:sess',
    //C (number || 'session')(default is 1 days) maxAge in ms, 'session' will result in a cookie that expires when session/browser is closed, Warning: If a session cookie is stolen, this cookie will never expire
    maxAge: 86400000,
    //C (boolean)(default true) can overwrite or not
    overwrite: true,
    //C (boolean)(default true) httpOnly or not , httpOnly cookies tell the browser not to expose them to client-side script (so that they can only be opened by the server)
    httpOnly: true,
    //C (boolean)(default true) signed or not , signed cookies verify that the data is unchanged on the client side
    signed: true,
    //C (boolean)(default false) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. , I think this means that the session is reset after every request? (that is that the maxAge is basically since the last time the user made a request)
    rolling: true,
    //C (boolean)(default is false) renew session when session is nearly expired, so we can always keep user logged in, //? does this mean never expiring sessions?
    renew: false
  }; //L https://github.com/socketio/socket.io#in-conjunction-with-koa

  const server = http__WEBPACK_IMPORTED_MODULE_7___default.a.createServer(app.callback()); // SOCKET IO

  const socketIO = new socket_io__WEBPACK_IMPORTED_MODULE_6___default.a(server);
  _global_server_js__WEBPACK_IMPORTED_MODULE_8__["default"].liveData.socket = socketIO.of('/live-data'); //  ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
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

  app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default()()); // SESSION

  app.use(koa_session__WEBPACK_IMPORTED_MODULE_5___default()(sessionConfig, app));
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

  _global_server_js__WEBPACK_IMPORTED_MODULE_8__["default"].liveData.start({
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
  }); //L unhandled errors: https://stackoverflow.com/questions/43834559/how-to-find-which-promises-are-unhandled-in-node-js-unhandledpromiserejectionwar

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, '\n Reason:', reason); //TODO handle
  });
})();

/***/ }),

/***/ "./server/live-data-server.js":
/*!************************************!*\
  !*** ./server/live-data-server.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../public/js/global.js */ "./public/js/global.js");
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// EXTERNAL
 //TODO consider changing to the https module?
// INTERNAL
//! depends on the common global.js not the global-server.js because global-server.js uses this module

 //  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   
//TODO there is a stack overflow error here somewhere, recursive loop?, usually lead by this error: 'no subscriber found for this user'
// when refreshing the playlist page, all the lists will subscribe fine, until at some point unsubscribe is called (for an empty query [ {} ] , or maybe could be anything) upon which no subscriber is called, and the thing goes to a 'RangeError: Maximum call stack size exceeded' error
//TODO this may be unrelated but it seems the liveQueries here are also piling up

_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Subscription.augmentClass({
  constructorParts: parent => ({
    defaults: {
      user: null
    }
  })
});
/* harmony default export */ __webpack_exports__["default"] = ({
  app: null,
  socket: null,
  tables: _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveTable.makeTables(),

  start({
    app,
    socket
  }) {
    this.app = app;
    this.socket = socket;
    this.socket.use((socket, next) => {
      //C give the cookie session to the socket
      //C uses a temporary koa context to decrypt the session
      //L https://medium.com/@albertogasparin/sharing-koa-session-with-socket-io-8d36ac877bc2
      //L https://github.com/koajs/session/issues/53#issuecomment-311601304
      //!//? socket.session is static, whereas koa ctx.session is dynamic, that is I'm not sure that this is linked in any way to the cookie session
      //L https://socket.io/docs/server-api/#namespace-use-fn
      socket.session = this.app.createContext(socket.request, new http__WEBPACK_IMPORTED_MODULE_0___default.a.OutgoingMessage()).session;
      next();
    });
    this.socket.on('connect', socket => {
      console.log('CONNECT', socket.id); //C if user is logged in, give the socketId to the session
      //! I don't think the cookie session receives this, though it isn't needed there so far

      if (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(socket.session.user, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User)) socket.session.user.socketId = socket.id;
      socket.on('disconnect', async reason => {
        console.log('DISCONNECT', socket.id);
        await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].liveData.disconnect(socket.id).catch(rejected => {
          //TODO handle better
          if (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(rejected, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Base)) rejected.announce();else console.error('subscription disconnect error:', rejected);
        }); //? socket won't be used anymore, so does anything really need to be deleted here?

        if (_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(socket.session.user, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User)) socket.session.user.socketId = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User.defaults.socketId;
      });
      socket.on('subscribe', async ({
        table,
        query
      }, callback) => {
        console.log('SUBSCRIBE', socket.id); //C if user is not logged in, create an empty user with just it's socketId (this is how subscribers are identified)
        //TODO socketId validator, this is all that really matters here

        const user = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(socket.session.user, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User) ? socket.session.user : new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User({
          socketId: socket.id
        }); //! using sj.Entity.tableToEntity(table) instead of just a table string so that the function can basically function as a validator

        const result = await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].liveData.add(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Entity.tableToEntity(table), query, user).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].andResolve); //!//G do not send back circular data in the acknowledgment callback, SocketIO will cause a stack overflow
        //L https://www.reddit.com/r/node/comments/8diy81/what_is_rangeerror_maximum_call_stack_size/dxnkpf7?utm_source=share&utm_medium=web2x
        //C using sj.deepClone (fClone) to drop circular references

        callback(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].deepClone(result));
      });
      socket.on('unsubscribe', async ({
        table,
        query
      }, callback) => {
        console.log('UNSUBSCRIBE', socket.id);
        const user = _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(socket.session.user, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User) ? socket.session.user : new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].User({
          socketId: socket.id
        });
        const result = await _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].liveData.remove(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Entity.tableToEntity(table), query, user).catch(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].andResolve);
        callback(_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].deepClone(result));
      });
      socket.on('error', reason => {
        console.error('ERROR', socket.id, reason);
      });
    });
  },

  findTable(Entity) {
    return this.tables.get(Entity);
  },

  findLiveQuery(table, query) {
    return table.liveQueries.find(liveQuery => _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].deepMatch(query, liveQuery.query, {
      matchOrder: false
    }));
  },

  findSubscription(liveQuery, user) {
    return liveQuery.subscriptions.find(subscription => subscription.user.socketId === user.socketId);
  },

  //C subscribers/users are identified by their socketId, this is so that not-logged-in clients can still subscribe to data, while still allowing the full user object to be the subscriber
  async add(Entity, query, user) {
    //C process query
    //TODO//? getMimic was being called with this query: [{playlistId: null}], twice, very rapidly, however even though they are the same query, the one called second resolves before the first one, why? afaik this isn't causing any issues, but it could later
    const processedQuery = await Entity.getMimic(query); //C find table

    const table = this.findTable(Entity);
    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(table, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveTable)) throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      origin: 'sj.liveData.add()',
      reason: 'table is not an sj.LiveTable'
    }); //C find liveQuery, add if it doesn't exist

    let liveQuery = this.findLiveQuery(table, processedQuery);

    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(liveQuery, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveQuery)) {
      liveQuery = new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveQuery({
        table,
        query: processedQuery
      });
      this.findTable(Entity).liveQueries.push(liveQuery);
    } //C find subscription, add if it doesn't exist


    let subscription = this.findSubscription(liveQuery, user);

    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(subscription, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Subscription)) {
      subscription = new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Subscription({
        liveQuery,
        user
      });
      liveQuery.subscriptions.push(subscription);
    } //C update user


    Object.assign(subscription.user, user);
    return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
      origin: 'sj.addSubscriber()',
      message: 'added subscriber',
      content: processedQuery
    });
  },

  async remove(Entity, query, user) {
    //? if the client unsubscribes on the client-side but is unable to unsubscribe on the server-side, the subscription will sit there (and send messages) until the client disconnects, is this ok? maybe consider a timeout system?
    //C process query
    const processedQuery = await Entity.getMimic(query); //C find table

    const table = this.findTable(Entity);
    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(table, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveTable)) throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      origin: 'sj.liveData.remove()',
      reason: 'table is not an sj.LiveTable'
    }); //C find liveQuery index

    const liveQuery = this.findLiveQuery(table, processedQuery);
    const liveQueryIndex = this.findTable(Entity).liveQueries.indexOf(liveQuery);
    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(liveQuery, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveQuery) || liveQueryIndex < 0) return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Warn({
      origin: 'sj.subscriptions.remove()',
      message: 'no subscription found for this query',
      content: {
        Entity,
        query: processedQuery,
        liveQueryIndex
      }
    }); //C find subscription

    const subscription = this.findSubscription(liveQuery, user);
    const subscriptionIndex = liveQuery.subscriptions.indexOf(subscription);
    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(subscription, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Subscription) || subscriptionIndex < 0) return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Warn({
      origin: 'sj.subscriptions.remove()',
      message: 'no subscriber found for this user',
      content: {
        liveQuerySubscriptions: liveQuery.subscriptions,
        socketId: user.socketId,
        subscriptionIndex
      }
    }); //C remove subscription

    liveQuery.subscriptions.splice(subscriptionIndex, 1); //C if no more subscriptions, remove liveQuery

    if (liveQuery.subscriptions.length <= 0) {
      this.findTable(Entity).liveQueries.splice(liveQueryIndex, 1);
    }

    return new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Success({
      origin: 'sj.removeSubscriber()',
      message: 'removed subscriber',
      content: processedQuery
    });
  },

  async notify(Entity, entities, timestamp) {
    //C for each liveQuery
    const table = this.findTable(Entity);
    if (!_public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].isType(table, _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].LiveTable)) throw new _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error({
      origin: 'sj.liveData.notify()',
      reason: 'table is not an sj.LiveTable'
    });

    for (const liveQuery of table.liveQueries) {
      //C for each passed entity
      for (const entity of entities) {
        //C if any part of the liveQuery.query matches the entity as a subset && if the notification timestamp is new
        //R query is an array of object queries, must iterate each then subset match, or else nothing will match because query switches from superset to subset
        if (liveQuery.query.some(part => _public_js_global_js__WEBPACK_IMPORTED_MODULE_1__["default"].deepMatch(part, entity, {
          matchOrder: false,
          matchIfSubset: true,
          matchIfTooDeep: true
        })) && timestamp > liveQuery.timestamp) {
          //C set the new timestamp
          liveQuery.timestamp = timestamp; //C for each subscription

          for (const subscription of liveQuery.subscriptions) {
            //C emit a socket notification to the subscriber
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
    for (const pair of this.tables) {
      const table = pair[1];

      for (let i = table.liveQueries.length - 1; i > -1; i--) {
        const liveQuery = table.liveQueries[i]; //C for each subscription

        for (let j = liveQuery.subscriptions.length - 1; j > -1; j--) {
          const subscription = liveQuery.subscriptions[j]; //C if it matches the passed user (by socketId), remove it

          if (subscription.user.socketId === socketId) {
            liveQuery.subscriptions.splice(j, 1);
          }
        } //C if the liveQuery no longer has any subscriptions, remove it


        if (liveQuery.subscriptions.length <= 0) table.liveQueries.splice(i, 1);
      }
    }
  }

});
/* //TODO test:
	no duplicate live queries
	subscriptions get removed on disconnect
	single refreshed liveQuery only ever has one subscription (user)
*/

/***/ }),

/***/ "./server/routes.js":
/*!**************************!*\
  !*** ./server/routes.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-send */ "koa-send");
/* harmony import */ var koa_send__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_send__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node-utility/source-path.cjs */ "./node-utility/source-path.cjs");
/* harmony import */ var _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config_project_paths_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/project-paths.js */ "./config/project-paths.js");
/* harmony import */ var _global_server_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global-server.js */ "./server/global-server.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth.js */ "./server/auth.js");
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

	error converting sj.Track() to JSON because of circular reference
*/
//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝
// builtin

 // external

 //L https://github.com/alexmingoia/koa-router

 //L https://github.com/koajs/send
// internal




 // side-effects
//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

/* harmony default export */ __webpack_exports__["default"] = (function ({
  replaceIndex
}) {
  // path
  //L make own __dirname since it isn't exposed in modules: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
  //L remove 'file:///' because it messes up the parsing and creates 'C:/C:/': https://github.com/tc39/proposal-import-meta/issues/13
  //TODO there has to be a cleaner way of doing this (especially the replace manipulation)
  //R this was needed when running raw modules as __dirname was not accessible, however webpack now handles that
  // const __dirname = path.dirname(new URL(import.meta.url.replace(/^file:\/\/\//, '')).pathname);
  const root = _node_utility_source_path_cjs__WEBPACK_IMPORTED_MODULE_4___default()('../build/public');
  const app = `/${_config_project_paths_js__WEBPACK_IMPORTED_MODULE_5__["clientIndexFileName"]}`; // router

  const router = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a();
  const apiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a(); //   █████╗ ██████╗ ██╗
  //  ██╔══██╗██╔══██╗██║
  //  ███████║██████╔╝██║
  //  ██╔══██║██╔═══╝ ██║
  //  ██║  ██║██║     ██║
  //  ╚═╝  ╚═╝╚═╝     ╚═╝
  //TODO consider putting .catch(sj.andResolve) as a middleware?

  /*
  	let listenerList = [
  	];
  
  	async function addListener(depth) {
  		//TODO this is a mess, there has to be a much better way to do this
  
  		//C stop recursion if 10 layers deep
  		depth = depth || 0;
  		if (depth >= 10) {
  			throw new sj.Error({
  				log: true,
  				origin: 'addListener()',
  				message: 'could not handle request, timeout error',
  				reason: 'addListener timeout',
  			});
  		}
  
  		let f = Math.random();
  
  		if (listeners.indexOf(f) !== -1) {
  			f = await addListener(depth+1); //! recursive call
  		}
  
  		if (depth === 0) {
  			listeners.push(f);
  		}
  
  		return f;
  	}
  */
  // server-side data & processing requests

  apiRouter.post('/log', async (ctx, next) => {
    console.log('CLIENT LOG:', ctx.request.body.message);
    ctx.response.body = new _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Success({
      origin: 'routes.js /log POST',
      message: 'received client log message'
    });
  }) // auth
  .get('/spotify/authRequestStart', async (ctx, next) => {
    //C retrieves an auth request URL and it's respective local key (for event handling)
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].spotify.startAuthRequest().catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get('/spotify/authRedirect', async (ctx, next) => {
    //C receives credentials sent from spotify, emits an event & payload that can then be sent back to the original client
    //! this URL is sensitive to the url given to spotify developer site (i think)
    await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].spotify.receiveAuthRequest(ctx.request.query).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
    await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, app, {
      root: root
    });
  }).post('/spotify/authRequestEnd', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].spotify.endAuthRequest(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).post('/spotify/exchangeToken', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].spotify.exchangeToken(ctx, ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get('/spotify/refreshToken', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].spotify.refreshToken(ctx).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get('/youtube/credentials', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].youtube.getCredentials().catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }) // session
  //R //L login/logout are create/remove for sessions: https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch, https://stackoverflow.com/questions/5868786/what-method-should-i-use-for-a-login-authentication-request
  //? what is the 'update' equivalent of user session? isn't this all done server-side by refreshing the cookie? or is this just the login put because there is no post equivalent instead
  .post('/session', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].session.login(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].db, ctx, ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get('/session', async (ctx, next) => {
    //R thought about moving this to user, but with 'self' permissions, but if its a me request, the user specifically needs to know who they are - in get user cases, the user already knows what they're searching for an just needs the rest of the information
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].session.get(ctx).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).delete('/session', async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].session.logout(ctx).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }) // user
  .post(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.add(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.get(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].decodeList(ctx.querystring)).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).patch(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.edit(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).delete(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].User.remove(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }) // playlist
  .post(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.add(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.get(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].decodeList(ctx.querystring)).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).patch(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.edit(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).delete(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Playlist.remove(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }) // track
  .post(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.add(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).get(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.get(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].decodeList(ctx.querystring)).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).patch(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.edit(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }).delete(`/${_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.table}`, async (ctx, next) => {
    ctx.response.body = await _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Track.remove(ctx.request.body).catch(_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].andResolve);
  }) // catch
  .all('/*', async (ctx, next) => {
    ctx.response.body = new _global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].Error({
      log: true,
      origin: 'apiRouter',
      message: 'could not process request',
      reason: 'invalid api command',
      content: ctx.request.body
    });
  }); //L nested routers: https://github.com/alexmingoia/koa-router#nested-routers

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods()); //  ██████╗  █████╗  ██████╗ ███████╗
  //  ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
  //  ██████╔╝███████║██║  ███╗█████╗  
  //  ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
  //  ██║     ██║  ██║╚██████╔╝███████╗
  //  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝

  router.get('/*', async (ctx, next) => {
    /*
    	//C pages are accessed through the base GET method, serve any public files here
    	//! static resource references in index.html should be absolute '/foo', not relative './foo'
    			//! "Note: To deploy .mjs on the web, your web server needs to be configured to serve files with this extension using the appropriate Content-Type: text/javascript header"
    	//L https://developers.google.com/web/fundamentals/primers/modules
    			//TODO //! errors thrown here aren't caught - fix this here and everywhere else
    */
    //L temporarily ignore favicon request: https://stackoverflow.com/questions/35408729/express-js-prevent-get-favicon-ico
    if (ctx.request.path === '/favicon.ico') {
      ctx.response.status = 204;
      return; //TODO add it and remove this block
    } //C serve resources


    if (fs__WEBPACK_IMPORTED_MODULE_1___default.a.existsSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(root, ctx.request.path)) && ctx.request.path.indexOf('.') >= 0) {
      await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, ctx.request.path, {
        root: root
      });
      return; //TODO find a better way to differentiate a valid file from a just a valid path (other than indexOf('.'))
      //TODO webpack might have a better way to identify static resources
    } //C redirect if not logged in


    if (_global_server_js__WEBPACK_IMPORTED_MODULE_6__["default"].isEmpty(ctx.session.user) && ctx.request.path !== '/login' && ctx.request.path !== '/database') {
      //TODO this should use sj.isLoggedIn, though that isn't perfect yet and it's async
      ctx.request.path = '/'; //! ctx.redirect() will not redirect if ctx.request.path is anything but '/', no idea why

      ctx.redirect('/login');
      return;
    }
    /* webpack-dev-middleware
    	if (replaceIndex !== undefined) {
    		replaceIndex(ctx);
    	} 
    	else {
    */
    //C otherwise always return the index.js file, this is the root app and vue will handle the routing client-side
    //L https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations


    await koa_send__WEBPACK_IMPORTED_MODULE_3___default()(ctx, app, {
      root: root
    });
  }).all('/*', async (ctx, next) => {
    ctx.body = ctx.body + '.all /* reached'; //G only use	await next();	when we want the request to be further processed down the chain (ie. to finally result at .all)
  });
  return router;
});
;

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

/***/ "koa-webpack":
/*!******************************!*\
  !*** external "koa-webpack" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-webpack");

/***/ }),

/***/ "minimist":
/*!***************************!*\
  !*** external "minimist" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("minimist");

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

/***/ })

/******/ });