module.exports = function(oldToNewMap, toChange, generateNext) {

	var existingValues = this.map(function(v) { return ''+v; }),
		tmpMax = null, operations = [], stack = [],
		oldKeys = Object.keys(oldToNewMap);

	generateNext = generateNext || function() {
		if(tmpMax === null) tmpMax = Math.max.apply(Math, existingValues);
		tmpMax++;
		return ''+tmpMax;
	};

	function getNext() {

		var next,
			equals = function(n) { return n == next; },
			newValues = Object.keys(oldToNewMap)
				.map(function(o) { return oldToNewMap[o]; });

		while(next = generateNext()) {
			if(!newValues.filter(equals).length) return next;
		}

		throw new Error('could not generate next value');
	}

	function removeOldValue(oldValue) {
		delete oldToNewMap[oldValue];
		oldKeys.splice(oldKeys.indexOf(oldValue), 1);
	}

	function check(oldValue, newValue) {

		oldValue = ''+oldValue;
		newValue = ''+newValue;

		var tmpVal, stackVar;
		if(!!~stack.indexOf(oldValue)) {

			tmpVal = getNext();
			operations.push(toChange(oldValue, tmpVal));
			existingValues[existingValues.indexOf(oldValue)] = tmpVal;
			existingValues.push(tmpVal);

			oldKeys.push(tmpVal);
			oldToNewMap[tmpVal] = oldToNewMap[oldValue];

			removeOldValue(oldValue);

			stack[stack.indexOf(oldValue)] = tmpVal;

		} else if(!!~existingValues.indexOf(newValue)) {

			if(newValue in oldToNewMap) {
				stack.push(oldValue);
				check(newValue, oldToNewMap[newValue]);
				while(stackVar = stack.pop()) {
					check(stackVar, oldToNewMap[stackVar]);
				}
			} else {
				tmpVal = getNext();
				operations.push(toChange(newValue, tmpVal));
				operations.push(toChange(oldValue, newValue));
				removeOldValue(oldValue);
			}
		} else {
			operations.push(toChange(oldValue, newValue));
			existingValues[existingValues.indexOf(oldValue)] = newValue;
			removeOldValue(oldValue);
		}
	}


	var newValue, oldValue;
	while(oldKeys.length) {
		oldValue = oldKeys[0];
		newValue = oldToNewMap[oldValue];
		if(oldValue == newValue) {
			removeOldValue(oldValue);
			continue;
		}
		check(oldValue, newValue);
	}

	return operations;
};