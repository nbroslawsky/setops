var assert = require('chai').assert,
	setops = require('../index');

describe('intersect', function() {
	it('should return an array of intersecting values when an intersection is present', function() {

		assert.sameMembers(setops([1, 2, 3]).intersect([3, 4, 5]),[3]);
	});

	it('should return an empty array when there is no intersection', function() {
		assert.lengthOf(setops([1, 2, 3]).intersect([4, 5]),0);
	});
});