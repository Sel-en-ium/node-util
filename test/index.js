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

    describe("#forEach()", function () {
      var
        calls;
      beforeEach(function () {
        calls = 0;
      });
      it("should iterate over an array", function () {
        utils.forEach(['val1', 'val2'], function (index, value) {
          index.should.equal(calls);
          value.should.match(/val/);
          calls += 1;
        });
        calls.should.equal(2);
      });
      it("should iterate over an object's keys", function () {
        utils.forEach({key1: 'val1', key2: 'val2'}, function (index, value) {
          index.should.match(/key/);
          value.should.match(/val/);
          calls += 1;
        });
        calls.should.equal(2);
      });
      it("should not call callback if passed undefined", function () {
        utils.forEach(undefined, function (index, value) {
          should.not.exist('should not get here');
        });
      });
      it("should not call callback if passed null", function () {
        utils.forEach(null, function (index, value) {
          should.not.exist('should not get here');
        });
      });
    });

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

    describe('#isNumber', function () {
      it('should exist', function () {
        (!!utils.isNumber).should.equal(true);
      });
      it('should return false for NaN', function () {
        utils.isNumber(Number.NaN).should.equal(false);
      });
      it('should return false for strings', function () {
        utils.isNumber('9').should.equal(false);
      });
      it('should return true for integers', function () {
        utils.isNumber(0).should.equal(true);
      });
      it('should return true for floats', function () {
        utils.isNumber(0.123).should.equal(true);
      });
      it('should return true for negative numbers', function () {
        utils.isNumber(-0.123).should.equal(true);
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
