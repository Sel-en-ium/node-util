# node-util #

* [doWhen](#markdown-header-doWhen)
* [forEach](#markdown-header-foreach)
* [isArray](#markdown-header-isArray)
* [isNumber](#markdown-header-isNumber)
* [isObject](#markdown-header-isObject)
* [isEqual](#markdown-header-isEqual)
* [merge](#markdown-header-merge)

#### doWhen
param {function()} cond - should return truthy when the callback should be called  
param {function()} callback

Calls the callback when cond evaluates to a truthy value

#### forEach
param {object} obj - The object/array to iterate through  
param callback(index, obj[index])

Calls the callback for each entry in an array / keys of an object

#### isArray
param {*} val  
returns {boolean} - true if val is an Array

#### isNumber  
param {*} val  
returns {boolean} - true if val is a finite number. (int, float, negative)

#### isObject
param {*} val  
returns {boolean} - true if val is an Object.

#### isEqual
param {*} var1  
param {*} var2  
returns {boolean} - true if the variables have the same value.  
It recursively checks Objects and stringify's the rest for comparison.

#### merge
param {Object} obj1 - Acts as the base object. It may have non-unique properties overwritten.  
param {Object} obj2 - Object whose properties will be added to obj1.  
param {boolean} untouched - If true, don't modify obj1.  
returns {Object} obj1 with all of obj2 properties.

Recursively merges two objects.

