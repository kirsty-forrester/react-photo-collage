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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./components/CollageLayers/CollageLayers.test.js": 2,
	"./components/ImageToolbar/ImageToolbar.test.js": 3,
	"./components/Layout/Layout.test.js": 4,
	"./components/PhotoLayers/PhotoLayers.test.js": 5,
	"./components/TemplateLayers/TemplateLayers.test.js": 6
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 0;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


    var testsContext = __webpack_require__(0);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kirsty/WebstormProjects/collage/src/components/CollageLayers/CollageLayers.test.js Unexpected token (31:20)\nYou may need an appropriate loader to handle this file type.\n|   const waitForTestDiv = createWaitForElement('#test-div');\n| \n|   component = mount(<CollageLayers templateImage=\"4circles\" containerWidth={1000}/>);\n| \n| ");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kirsty/WebstormProjects/collage/src/components/ImageToolbar/ImageToolbar.test.js Unexpected token (24:6)\nYou may need an appropriate loader to handle this file type.\n|     ];\n|     const renderImageToolbar = render(\n|       <App context={{ insertCss: () => {}, fetch: () => {} }}>\n|         <Layout>\n|           <ImageToolbar");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kirsty/WebstormProjects/collage/src/components/Layout/Layout.test.js Unexpected token (23:6)\nYou may need an appropriate loader to handle this file type.\n|   it('renders children correctly', () => {\n|     const wrapper = render(\n|       <App context={{ insertCss: () => {}, fetch: () => {} }}>\n|         <Layout>\n|           <div className=\"child\" />");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kirsty/WebstormProjects/collage/src/components/PhotoLayers/PhotoLayers.test.js Unexpected token (65:20)\nYou may need an appropriate loader to handle this file type.\n| describe('PhotoLayers', function() {\n|   const waitForImageCropper = createWaitForElement('.image-cropper');\n|   component = mount(<PhotoLayers {...props}/>);\n| \n|   it('renders image croppers', function() {");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/kirsty/WebstormProjects/collage/src/components/TemplateLayers/TemplateLayers.test.js Unexpected token (43:45)\nYou may need an appropriate loader to handle this file type.\n|   beforeEach(() => {\n|     //clock = sinon.useFakeTimers();\n|     component = TestUtils.renderIntoDocument(<TemplateLayers\n|       {...props}\n|       containerWidth={1000}");

/***/ })
/******/ ]);