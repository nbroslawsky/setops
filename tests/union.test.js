var assert = require('chai').assert,
	setops = require('../index');

describe('union', function() {

	it('should return a new array', function() {
		var a1 = [],
			a2 = [],
			result = setops(a1).union(a2);

		assert.notStrictEqual(result, a1);
		assert.notStrictEqual(result, a2);
		assert.lengthOf(a1, 0);
		assert.lengthOf(a2, 0);
	});

	it('should combine multiple flat arrays', function() {
		var a1 = [1, 2, 3],
			a2 = [1, 2, 4],
			a3 = [1, 2, 5],
			result = setops(a1).union(a2, a3);

		assert.deepEqual(result, [1, 2, 3, 4, 5]);
	});

	it('should combine arrays of mixed types', function() {
		var o1 = { foo: 'bar' },
			o2 = { grr: 'argh' },
			a1 = [1, 2, 3],
			a2 = [4, 6, 1],
			arr1 = [o1, a1, 'foo', 1, 'bar'],
			arr2 = [o2, a2, 'blah', 3, 1, o1],
			result = setops(arr1).union(arr2);

		assert.deepEqual(result, [o1, a1, 'foo', 1, 'bar', o2, a2, 'blah', 3]);
	});

});