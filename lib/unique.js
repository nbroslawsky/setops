module.exports = function() {
	var uniques = [];
	this.forEach(function(item) {
		if(!~uniques.indexOf(item)) uniques.push(item);
	});
	return uniques;
};
