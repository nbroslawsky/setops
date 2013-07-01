var unique = require('./unique');
module.exports = function(/* arguments */) {
	if(!arguments.length) return this;
	return unique.call(Array.prototype.concat.apply(this.slice(), arguments));
};