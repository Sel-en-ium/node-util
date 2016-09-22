/*jslint node:true*/
(function () {
  'use strict';

  var
    utils = {};

  /**
   * Calls the callback when cond evaluates to a truthy value
   * @param {function()} cond - should return truthy when the callback should be called
   * @param {function()} callback
   */
  utils.doWhen = function (cond, callback) {
    var interval = setInterval(function () {
      if (cond()) {
        clearInterval(interval);
        callback();
      }
    }, 0);
  };

  /**
   * Calls the callback for each entry in an array / keys of an object
   *
   * @param {object} obj - The object/array to iterate through
   * @param callback(index, obj[index])
   */
  utils.forEach = function (obj, callback) {
    var
      key;

    if (utils.isArray(obj)) {
      for (key = 0; key < obj.length; key += 1) {
        callback(key, obj[key]);
      }
    } else if (utils.isObject(obj)) {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          callback(key, obj[key]);
        }
      }
    }
  };

  /**
   * Returns true if val is an Array.
   * @param {*} val
   * @returns {boolean} - true if val is an Array
   */
  utils.isArray = function (val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  };

  /**
   * Returns true if val is a finite number. (int, float, negative)
   * @param {*} val
   * @returns {boolean} - true if val is a number
   */
  utils.isNumber = function (val) {
    return Number.isFinite(val);
  };

  /**
   * Returns true if val is an Object.
   * @param {*} val
   * @returns {boolean} - true if val is an Object
   */
  utils.isObject = function (val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  };

  /**
   * Recursively checks if 2 variables are the same
   * @param {*} var1
   * @param {*} var2
   * @returns {boolean} - true if the variables are the same
   */
  utils.isEqual = function (var1, var2) {
    if (utils.isObject(var1) && utils.isObject(var2)) {
      var
        i,
        key,
        keys = [];
      keys = keys.concat(Object.keys(var1), Object.keys(var2));
      for (i in keys) {
        key = keys[i];
        if (!utils.isEqual(var1[key], var2[key])) {
          return false;
        }
      }
    } else {
      return JSON.stringify(var1) === JSON.stringify(var2);
    }
    return true;
  };

  /**
   * Recursively merges two objects.
   *
   * @param {Object} obj1 - Acts as the base object. It may have non-unique properties overwritten.
   * @param {Object} obj2 - Object whose properties will be added to obj1.
   * @param {boolean} untouched - If true, don't modify obj1.
   * @returns {Object} obj1 with all of obj2 properties.
   */
  utils.merge = function (obj1, obj2, untouched) {
    obj1 = obj1 || {};

    var
      result;

    if (untouched) {
      result = JSON.parse(JSON.stringify(obj1));
    } else {
      result = obj1;
    }

    // Apply obj2 properties
    utils.forEach(obj2, function (key, val) {
      if (utils.isObject(val) && utils.isObject(result[key])) {
        // merge the sub object
        result[key] = utils.merge(result[key], val);
      } else {
        result[key] = JSON.parse(JSON.stringify(val));
      }
    });

    return result;
  };

  module.exports = utils;

}());

