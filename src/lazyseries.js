'use strict';

//
// Implements a time series data structure.
//

var BaseSeries = require('./baseseries');

var assert = require('chai').assert;
var E = require('linq');
var inherit = require('./inherit');

var LazySeries = function (indexFn, valuesFn) {
	assert.isFunction(indexFn, "Expected 'indexFn' parameter to LazySeries constructor be a function.");
	assert.isFunction(valuesFn, "Expected 'valuesFn' parameter to LazySeries constructor be a function.");

	var self = this;
	self._indexFn = indexFn;
	self._valuesFn = valuesFn;	
};

var parent = inherit(LazySeries, BaseSeries);

LazySeries.prototype.index = function () {
	var self = this;
	return self._indexFn();
};

LazySeries.prototype.values = function () {
	var self = this;
	return self._valuesFn();
};

//
// Bake the lazy series to a normal seris. 
//
LazySeries.prototype.bake = function () {
	var Series = require('./series'); // Local require, to prevent circular reference.
	
	var self = this;
	return new Series(self.index(), self.values());
};

module.exports = LazySeries;