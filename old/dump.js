sj.typeOf = function (input) { //TODO legacy
	if (input === null) {
		return 'null';
	}

	let t = typeof input;

	if (t === 'object') {
		if (sj.isType(input, 'sj.Object')) {
			return input.objectType;
		} else {
			return 'object';
		}
	}

	if (t === 'number' && isNaN(input)) {
			return 'NaN';
	}

	return typeof input;
}
sj.filterList = async function (list, type, successList, errorList) { //TODO legacy
	//TODO go over this

	//C sorts through a list of both successes and errors (usually received from Promise.all and sj.sj.andResolve() to avoid fail-fast behavior to process all promises).
	//C returns either a sj.Success with content as the original list if all match the desired object, or a sj.Error with content as all the items that did not match.
	//! do not log either the successList or errorList objects, these are announced later


	//C ensure errorList.content is an array (though this is currently default)
	errorList.content = [];
	successList.content = list;

	//C if item does not match desired type, push it to errorList.content
	list.forEach(item => {
		//TODO consider using sj.isType() here, and also implement instanceof into sj.isType() (also allowing to pass objects to use instance of)
		if (!sj.isType(item, type)) {
			errorList.content.push(sj.propagate(item));
		}
	});

	//C throw errorList if there are any errors
	if (!(errorList.content.length === 0)) {
		errorList.announce();
		throw errorList;
	}

	successList.announce();
	return successList;
}
sj.wrapAll = async function (list, type, success, error) {
	//C wraps a list in a success or error object based on it's contents, keeps all contents on error
	//! do not log success or error objects, one of the two is announced by this function
	//L array.every: https://codedam.com/just-so-you-know-array-methods/

	success.content = error.content = list;

	if (list.every(item => sj.isType(item, type))) {
		success.announce();
		return success;
	} else {
		error.announce();
		throw error;
	}
}
sj.wrapPure = async function (list, type, success, error) {
	//C like sj.wrapAll, however discards non-errors on error

	success.content = list;
	error.content = [];

	list.forEach(item => {
		if (!sj.isType(item, type)) {
			error.content.push(item);
		}
	});

	if (error.content.length === 0) {
		success.announce();
		return success;
	} else {
		error.announce();
		throw error;
	}
}