/*jslint node:true*/
(function () {
  'use strict';

  var
    utils = {};

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

  module.exports = utils;

}());
