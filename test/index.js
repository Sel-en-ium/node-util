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
  this.timeout(3000);
    var
      result;
    beforeEach(function () {
      result = undefined;
    });

    describe('#doWhen', function () {
      var
        temp,
        truthy,
        condCalls,
        cond;
      beforeEach(function () {
        temp = undefined;
        truthy = false;
        condCalls = 0;
        cond = function () {
          condCalls += 1;
          return truthy;
        }
      });
      it('should exist', function () {
        should.exist(utils.doWhen);
        (typeof utils.doWhen).should.equal('function');
        utils.doWhen.length.should.equal(2);
      });
      it('should wait until the condition becomes true', function (done) {
        utils.doWhen(cond, function () {
          condCalls.should.greaterThan(1);
          temp.should.equal('it waited!');
          done();
        });

        setTimeout(function () {
          temp = 'it waited!';
          truthy = true;
        }, 50);
      });
    });

    describe("#forEach()", function () {
      var
        calls;
      beforeEach(function () {
        calls = 0;
      });
      it('should exist', function () {
        should.exist(utils.forEach);
        (typeof utils.forEach).should.equal('function');
        utils.forEach.length.should.equal(2);
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
        should.exist(utils.isArray);
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

    describe('#isEqual(obj1, obj2)', function () {
      it('should exist', function () {
        should.exist(utils.isEqual);
        (typeof utils.isEqual).should.equal('function');
        utils.isEqual.length.should.equal(2);
      });
      it('should return false for non-matching non-objects', function () {
        utils.isEqual('9', 9).should.equal(false);
      });
      it('should return true for matching non-objects', function () {
        utils.isEqual(9, 9).should.equal(true);
        utils.isEqual('9', '9').should.equal(true);
      });
      it('should return false for non-matching objects', function () {
        utils.isEqual({}, {1: 1}).should.equal(false);
        utils.isEqual({1: 1}, {}).should.equal(false);
        utils.isEqual({1: 1}, {1: '1'}).should.equal(false);
        utils.isEqual({1: [1]}, {1: []}).should.equal(false);
        utils.isEqual({1: {b: 'b', c: 'c'}}, {1: {c: 'c', b: 'D'}}).should.equal(false);
      });
      it('should return true for matching objects', function () {
        utils.isEqual({}, {}).should.equal(true);
        utils.isEqual({1: 1}, {1: 1}).should.equal(true);
        utils.isEqual({1: 1}, {'1': 1}).should.equal(true);
        utils.isEqual({1: [1]}, {1: [1]}).should.equal(true);
        utils.isEqual({1: {b: 'b', c: 'c'}}, {1: {c: 'c', b: 'b'}}).should.equal(true);
      });
    });

    describe('#isNumber(val)', function () {
      it('should exist', function () {
        should.exist(utils.isNumber);
        (typeof utils.isNumber).should.equal('function');
        utils.isNumber.length.should.equal(1);
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
        should.exist(utils.isObject);
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

    describe('#isString(val)', function () {
      it('should exist', function () {
        should.exist(utils.isString);
        (typeof utils.isString).should.equal('function');
        utils.isString.length.should.equal(1);
      });
      it('should return false for NaN', function () {
        utils.isString(Number.NaN).should.equal(false);
      });
      it('should return false for integers', function () {
        utils.isString(0).should.equal(false);
      });
      it('should return false for floats', function () {
        utils.isString(0.123).should.equal(false);
      });
      it('should return false for negative numbers', function () {
        utils.isString(-0.123).should.equal(false);
      });
      it('should return false for functions', function () {
        utils.isString(function () {}).should.equal(false);
      });
      it('should return false for objects', function () {
        utils.isString({}).should.equal(false);
      });
      it('should return false for Arrays', function () {
        utils.isString([]).should.equal(false);
      });
      it('should return true for strings', function () {
        utils.isString('9').should.equal(true);
      });
    });

    describe("#merge(obj1, obj2, untouched)", function () {
      it('should exist', function () {
        should.exist(utils.merge);
        (typeof utils.merge).should.equal('function');
        utils.merge.length.should.equal(3);
      });
      it("obj2 does not exist", function () {
        var
          obj = {key3: 3, key4: 4},
          expected = {key3: 3, key4: 4};
        result = utils.merge(obj, undefined);

        JSON.stringify(expected).should.equal(JSON.stringify(result));
      });
      it("obj1 does not exist", function () {
        var
          obj = {key3: 3, key4: 4},
          expected = {key3: 3, key4: 4};
        result = utils.merge(undefined, obj);

        JSON.stringify(result).should.equal(JSON.stringify(expected));
      });
      it("should return an object with all key-vals from both objs if all unique keys", function () {
        var
          obj1 = {key1: 1, key2: 2},
          obj2 = {key3: 3, key4: 4},
          expected = {key1: 1, key2: 2, key3: 3, key4: 4};
        result = utils.merge(obj1, obj2);

        JSON.stringify(result).should.equal(JSON.stringify(expected));
      });
      it("should overwrite the values non-unique values of the first object", function () {
        var
          obj1 = {key1: 1, key2: 2},
          obj2 = {key2: 3333, key4: 4},
          expected = {key1: 1, key2: 3333, key4: 4};
        result = utils.merge(obj1, obj2);

        JSON.stringify(result).should.equal(JSON.stringify(expected));
      });
      it("should apply changes in-place to obj1", function () {
        var
          obj1 = {key: 1},
          original = JSON.stringify(obj1),
          obj2 = {key: 2};

        utils.merge(obj1, obj2);

        JSON.stringify(obj1).should.not.equal(original);
      });
      it("should not apply changes to obj1", function () {
        var
          obj1 = {key: 1},
          original = JSON.stringify(obj1),
          obj2 = {key: 2};

        utils.merge(obj1, obj2, true);

        JSON.stringify(obj1).should.equal(original);
      });
      it("should not link to obj2", function () {
        var
          obj1 = {key1: 1},
          obj2 = {key1: {key2: {key3: {key4: 4}}}},
          original = JSON.stringify(obj2);
        result = utils.merge(obj1, obj2);
        result.key1.key2.key3 = 'blah';
        JSON.stringify(obj2).should.equal(original);
      });
      it("should not clobber nested values", function () {
        var
          obj1 = {key1: 1},
          obj2 = {key2: {key3: {key4: 4}}},
          expected = {key1: 1, key2: {key3: {key4: 4}}};
        result = utils.merge(obj1, obj2);

        JSON.stringify(expected).should.equal(JSON.stringify(result));
      });
      it("should return an object identical to obj2 if obj2 is nested deeper", function () {
        var
          obj1 = {},
          obj2 = {key: {}},
          expected = {key: {}};
        result = utils.merge(obj1, obj2);

        JSON.stringify(result).should.equal(JSON.stringify(expected));
      });
      it("should not fail if obj2 is nested way deeper", function () {
        var
          obj1 = {key1: 1},
          obj2 = {key1: {key2: {key3: {key4: 4}}}},
          expected = {key1: {key2: {key3: {key4: 4}}}};
        result = utils.merge(obj1, obj2);
        JSON.stringify(result).should.equal(JSON.stringify(expected));
      });
      it("should return an object identical to obj2 (when obj2 has nulls)", function () {
        var
          obj1 = {key1: 1},
          obj2 = {key1: null},
          expected = {key1: null};
        result = utils.merge(obj1, obj2);
        JSON.stringify(result).should.equal(JSON.stringify(expected));
      });
    });

    describe('#syncBarrier(syncCalls, callback)', function () {
      var
        barrier,
        count;
      beforeEach(function () {
        count = undefined;
      });
      it('should exist', function () {
        should.exist(utils.syncBarrier);
        (typeof utils.syncBarrier).should.equal('function');
        utils.syncBarrier.length.should.equal(2);
      });
      it('should return a function', function () {
        result = utils.syncBarrier(1, function () {});
        (typeof result).should.equal('function');
        result.length.should.equal(1);
      });
      it('should throw an error if the count is not a number', function (done) {
        try {
          utils.syncBarrier(undefined, function (err) { });
        } catch (e) {
          should.exist(e);
          done();
        }
      });
      it('should throw an error if the count is NaN', function (done) {
        try {
          utils.syncBarrier(NaN, function (err) { });
        } catch (e) {
          should.exist(e);
          done();
        }
      });
      it('should throw an error if the count is a float', function (done) {
        try {
          utils.syncBarrier(2.5, function (err) { });
        } catch (e) {
          should.exist(e);
          done();
        }
      });
      it('should call the callback immediately if the count is 0', function (done) {
        utils.syncBarrier(0, function (err) {
          should.not.exist(err);
          done();
        });
      });
      it('should not call the callback until the "barrier" has been called the required number of times', function (done) {
        count = 3;
        barrier = utils.syncBarrier(count, function (err) {
          count.should.equal(0);
          should.not.exist(err);
          done();
        });
        while (count > 0) {
          count -= 1;
          barrier();
        }
      });
      it('should put errors in an array', function (done) {
        var
          count = 3,
          sem = utils.syncBarrier(count, function (err) {
            count.should.equal(0);
            should.exist(err);
            err.length.should.equal(3);
            done();
          });
        while (count > 0) {
          count -= 1;
          sem(count);
        }
      });
      it('should not add errs to err array if undefined or null', function (done) {
        var
          barrier = utils.syncBarrier(2, function (err) {
            should.not.exist(err);
            done();
          });
        barrier(null);
        barrier(undefined);
      });
      it('should not conflict if multiple barriers are in use', function (done) {
        var
          barrier1,
          barrier2,
          barrier3;
        barrier1 = utils.syncBarrier(2, function (err) {
          should.not.exist(err);
          barrier3();
        }),
        barrier2 = utils.syncBarrier(2, function (err) {
          should.not.exist(err);
          barrier3();
        }),
        barrier3 = utils.syncBarrier(2, function (err) {
          should.not.exist(err);
          done();
        });

        barrier1();
        barrier2();
        barrier1();
        barrier2();
      });
    });


  });

}());
