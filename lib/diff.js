var sort = function(a,b) { return a-b; },
	ret = function(item) { return item; };

module.exports = function(targetData, cbs) {

	cbs = cbs || { toAdd : ret, toRemove : ret, toLeave : ret };

	var right = targetData.sort(sort),
		toAdd = [],
		toRemove = [],
		toLeave = [],
		left = Array.prototype.slice.call(this).sort(sort);

	for(var l=0, r=0; l < left.length || r < right.length; ) {

		if(r >= right.length || left[l] < right[r]) {
			toRemove.push(left[l]);
			l++;
		} else if(l >= left.length || left[l] > right[r]) {
			toAdd.push(right[r]);
			r++;
		} else if(left[l] == right[r]) {
			toLeave.push(left[l]);
			l++; r++;
		}
	}

	return {
		toAdd : toAdd.map(cbs.toAdd),
		toRemove : toRemove.map(cbs.toRemove),
		toLeave : toLeave.map(cbs.toLeave)
	};
};