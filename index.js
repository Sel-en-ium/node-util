/*jslint node:true*/
(function () {
  'use strict';

  var
    utils = {};

  /**
   * Returns true if val is an Array.
   * @param {*} val
   * @returns {boolean} - true if val is an Array
   */
  utils.isArray = function (val) {
    return Object.prototype.toString.call(val) === '[object Array]';
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
