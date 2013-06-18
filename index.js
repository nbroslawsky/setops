function extend(a /*,b ...*/) {
	var args = Array.prototype.slice.call(arguments,1);
	args.forEach(function(b) {
		for(var key in b) {
			// a[key] = b[key];
			Object.defineProperty(a, key, {
				value: b[key],
				enumerable: false
			});
		}
	});
	return a;
}

function go(r, methods) {

	function SetOps(additionalMethods) {
		extend(this, go.methods, additionalMethods);
	}

	SetOps.prototype = r;
	return new SetOps(methods);
}

go.methods = {
	transform : require('./lib/transform.js'),
	diff : require('./lib/diff.js'),
	keyBy : require('./lib/key-by.js')
};

module.exports = go;