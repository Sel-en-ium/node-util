# node-util #

* [doWhen](#markdown-header-doWhen)
* [forEach](#markdown-header-foreach)
* [isArray](#markdown-header-isArray)
* [isEqual](#markdown-header-isEqual)
* [isNumber](#markdown-header-isNumber)
* [isObject](#markdown-header-isObject)
* [isString](#markdown-header-isString)
* [merge](#markdown-header-merge)
* [syncBarrier](#markdown-header-syncBarrier)

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

#### isEqual
param {*} var1  
param {*} var2  
returns {boolean} - true if the variables have the same value. It recursively checks Objects' keys+values and stringify's the rest for comparison.

#### isNumber  
param {*} val  
returns {boolean} - true if val is a finite number. (int, float, negative)

#### isObject
param {*} val  
returns {boolean} - true if val is an Object.

#### isString
param {*} val  
returns {boolean} - true if val is a string.

#### merge
param {Object} obj1 - Acts as the base object. It may have non-unique properties overwritten.  
param {Object} obj2 - Object whose properties will be added to obj1.  
param {boolean} untouched - If true, don't modify obj1.  
returns {Object} obj1 with all of obj2 properties.

Recursively merges two objects.

#### syncBarrier
param {number} syncCalls - The number of calls to "barrier" before we can proceed.  
param {function(errs)} callback - Called after "barrier" has been called syncCalls number 
of times. "errs" will contain an array of errors reported by the "barrier" calls.  
returns {function(err)} barrier - Should be called by each asynchronous "thread".

Used as a barrier to synchronize multiple asynchronous "threads".

```
var
    barrier = syncBarrier(2, function (errs) {
        console.log('2 runs of asyncFunc are all done!');
    });
    
asyncFunc(function (err) {
    console.log('finished asyncFunc');
    barrier(err);
});
asyncFunc(function (err) {
    console.log('finished asyncFunc');
    barrier(err);
});

// Outputs:
// finished asyncFunc
// finished asyncFunc
// 2 runs of asyncFunc are all done!
```
