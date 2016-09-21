/*jslint node:true*/
/*globals describe, it, before, beforeEach, after, afterEach*/

(function () {
  'use strict';

  var
    sinonOriginal = require('sinon'),
    sinon,
    should = require('should'),
    utils = require('../index.js');

  beforeEach(function () {
    sinon = sinonOriginal.sandbox.create();
  });

  afterEach(function () {
    sinon.restore();
  });

  describe("utils", function () {

  });

}());
