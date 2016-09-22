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

  module.exports = utils;

}());
