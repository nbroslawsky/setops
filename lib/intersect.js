module.exports = function(/* arguments */) {
	return Array.prototype.slice.call(arguments).reduce(function(init, r){
		return init.filter(function(i) { return !!~r.indexOf(i); });
	}, this);
};