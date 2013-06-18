module.exports = function(field, nestAsArrays) {
	var map = {};
	this.forEach(function(row) {
		if(nestAsArrays) {
			if(!map[row[field]]) map[row[field]] = [];
			map[row[field]].push(row);
		} else {
			map[row[field]] = row;
		}
	});
	return map;
};
