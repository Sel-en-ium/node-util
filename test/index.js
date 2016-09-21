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

    describe('#isArray(val)', function () {
      it('should exist', function () {
        (!!utils.isArray).should.equal(true);
        (typeof utils.isArray).should.equal('function');
        utils.isArray.length.should.equal(1);
      });
      it('should return false for NaN', function () {
        utils.isArray(Number.NaN).should.equal(false);
      });
      it('should return false for strings', function () {
        utils.isArray('9').should.equal(false);
      });
      it('should return false for integers', function () {
        utils.isArray(0).should.equal(false);
      });
      it('should return false for floats', function () {
        utils.isArray(0.123).should.equal(false);
      });
      it('should return false for functions', function () {
        utils.isArray(function () {}).should.equal(false);
      });
      it('should return false for objects', function () {
        utils.isArray({}).should.equal(false);
      });
      it('should return true for Arrays', function () {
        utils.isArray([]).should.equal(true);
      });
    });

    describe('#isObject(val)', function () {
      it('should exist', function () {
        (!!utils.isObject).should.equal(true);
        (typeof utils.isObject).should.equal('function');
        utils.isObject.length.should.equal(1);
      });
      it('should return false for NaN', function () {
        utils.isObject(Number.NaN).should.equal(false);
      });
      it('should return false for strings', function () {
        utils.isObject('9').should.equal(false);
      });
      it('should return false for integers', function () {
        utils.isObject(0).should.equal(false);
      });
      it('should return false for floats', function () {
        utils.isObject(0.123).should.equal(false);
      });
      it('should return false for Arrays', function () {
        utils.isObject([]).should.equal(false);
      });
      it('should return false for functions', function () {
        utils.isObject(function () {}).should.equal(false);
      });
      it('should return true for objects', function () {
        utils.isObject({}).should.equal(true);
      });
    });

  });

}());
