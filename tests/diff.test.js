var assert = require('chai').assert,
	setops = require('../index.js');

function getFreshDataSet() {
	return [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 ]
		.sort(function(a,b) { return Math.random() - Math.random(); });
}

describe('getting operations to replace set', function() {

	it('should have add operations', function() {
		var operations = setops(getFreshDataSet()).diff([1,2,3,4,5,6,7,8,9,10]);
		assert.sameMembers(operations.toAdd, [ 1, 4, 6, 8, 9, 10 ]);
	});
	it('should have remove operations', function() {
		var operations = setops(getFreshDataSet()).diff([1,2,3,4,5,6,7,8,9,10]);
		assert.sameMembers(operations.toRemove, [ 11, 13, 17, 19, 23, 29, 31, 37 ]);
	});
	it('should have noop operations', function() {
		var operations = setops(getFreshDataSet()).diff([1,2,3,4,5,6,7,8,9,10]);
		assert.sameMembers(operations.toLeave, [ 2, 3, 5, 7 ]);
	});

});