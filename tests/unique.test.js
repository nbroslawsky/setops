var assert = require('chai').assert,
	setops = require('../index');

describe('unique', function() {

	it('should return a new array', function() {
		var arr = [],
			result = setops(arr).unique();

		assert.notStrictEqual(result, arr);
	});

	it('should handle numbers', function() {
		var arr = [ 1, 2, 1, 2, 1, 2 ];

		var result = setops(arr).unique();

		assert.deepEqual(result, [1, 2]);
	});

	it('should handle strings', function() {
		var arr = [ 'one', 'two', 'three', 'one', 'three', 'one'],
			result = setops(arr).unique();

		assert.deepEqual(result, ['one', 'two', 'three']);
	});

	it('should handle objects', function() {
		var o1 = {foo: 'bar'},
			o2 = {biz: 'baz'},
			o3 = {boingo: 'bongo'},
			arr = [ o1, o1, o2, o1, o3, o2, o1, o3],
			result = setops(arr).unique();

		assert.deepEqual(result, [o1, o2, o3]);
		assert.strictEqual(result[0], o1);
		assert.strictEqual(result[1], o2);
		assert.strictEqual(result[2], o3);
	});

	it('should handle arrays', function() {
		var a1 = ['foo', 1],
			a2 = ['baz', 3],
			a3 = ['bongo', 6, 'blast'],
			arr = [ a1, a1, a2, a1, a3, a2, a1, a3],
			result = setops(arr).unique();

		assert.deepEqual(result, [a1, a2, a3]);
		assert.strictEqual(result[0], a1);
		assert.strictEqual(result[1], a2);
		assert.strictEqual(result[2], a3);
	});

	it('should handle mixed types', function() {
		var o = { foo: 'bar' },
			a = ['blap', 1, 'oink'],
			arr = [1, 'one', o, a, 1, 'one', 'two', 3, o, 4, a],
			result = setops(arr).unique();

		assert.deepEqual(result, [1, 'one', o, a, 'two', 3, 4]);
	});

	it('should maintain order', function() {
		var arr = [2, 3, 1, 2, 2, 1, 1, 3, 4],
			result = setops(arr).unique();

		assert.deepEqual(result, [2, 3, 1, 4]);
	});

});