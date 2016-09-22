# node-util #

* [forEach](#markdown-header-foreach)
* [isArray](#markdown-header-isArray)
* [isNumber](#markdown-header-isNumber)
* [isObject](#markdown-header-isObject)
* [isEqual](#markdown-header-isEqual)

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
It recursively checks Objects and stringifies the rest for comparison.

Recursively checks if 2 variables are the same.

