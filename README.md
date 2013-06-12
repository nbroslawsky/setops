setops
======

[![Build Status](https://secure.travis-ci.org/nbroslawsky/setops.png?branch=master)](http://travis-ci.org/nbroslawsky/setops)

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
