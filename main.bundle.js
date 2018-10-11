/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var getMeals = function getMeals() {
	  fetch('https://fast-meadow-36413.herokuapp.com/api/v1/meals').then(function (response) {
	    return response.json();
	  }).then(function (meals) {
	    return listMeals(meals);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	};

	var listMeals = function listMeals(meals) {
	  meals.forEach(function (meal) {
	    appendMeal(meal);
	  });
	};

	var appendMeal = function appendMeal(meal) {
	  $('.meals-list').append('\n      <tr>\n        <th class="meal">' + meal['name'] + '</th>\n      </tr>\n  ');
	};

	getMeals();

/***/ })
/******/ ]);
