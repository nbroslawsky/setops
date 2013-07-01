setops
======

[![Build Status](https://secure.travis-ci.org/nbroslawsky/setops.png?branch=master)](http://travis-ci.org/nbroslawsky/setops)
[![browser support](http://ci.testling.com/nbroslawsky/setops.png)](http://ci.testling.com/nbroslawsky/setops)

Various set operations in the CommonJS model: `npm install setops`

###`transform(oldToNewMap, toChange [, generateNext])`

Run `setops` with an array of existing values.

* `oldToNewMap` is an object where the keys exist in the 'existing values' data set.
* `toChange` is a function that will be called with the old value and the new value.
* `generateNext` is an optional function that will be called in the event of a circular reference:
	* For example: the instruction is to change `1` to `2`, but `2` is already in the existing data set. The `generateNext` function will be called to change the `2` value to something not in the existing data set so that the `1` to `2` conversion can happen. By default, it will add 1 to the max value in the existing (or target) data set.
* The return value is an array of the outputs of the provided `toChange` function.

###`diff(targetData [, cbs])`

Run `setops` with an array of existing values

* `targetData` is an array of new values
* `cbs` is an optional parameter: it is an object with three function/callback properties that will be executed for every operation that needs to be performed: `toAdd`, `toRemove`, and `toLeave`. If not provided, the functions defined in this object will just return the values passed in.
* The return value is an object with three array properties: `toAdd`, `toRemove`, and `toLeave`. Each item in these arrays is the returned value of the callback functions. For example, if the operations necessary to convert the existing data set into the target data set were to add the values `1`, `2`, and `3`, the `cbs.toAdd` callback function will be called with each of those values, and those outputs will be the resulting `toAdd` property.

###`keyBy(property [, nestAsArrays])`

Run `setops` with an array values

* `property` is a string that will be dereferenced off of every item in the array
* `nestAsArrays` is a boolean value that will determine if the items in the map that get returned are arrays
* The return value is an object mapped off of the field you chose with the string `property`. If you chose to `nestAsArrays`, then each item in the array will be an array of items whose property were the same. If not, then each value will be just the item in the array whose property matched the key.

###`unique()`

Run `setops` with an array values

* The return value is an array with unique values (using a === comparison to other values in the array), with the order maintained.

###`union(/* arguments */)`

Run `setops` with an array of values

* `union` takes in a variable number of arrays that will be unioned onto the array that setops() was initialized with and deduped
* The return value will be a single array of all of the unique values between the initial array and the arrays passed into `union()`
