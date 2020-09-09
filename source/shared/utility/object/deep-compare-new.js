const strictEquality = (a, b) => a === b;

const baseDeepCompare = function (a, b, options) {
	const {
		compareFunction = strictEquality,
		//G Any wrapper function should pass itself as the nestingFunction.
		nestingFunction = () => {
			throw new Error('baseDeepCompare was not passed a nesting function.');
		},
	} = options;

	//TODO Validate compare and nesting functions.

	if (compareFunction(a, b, options)) return true;
	if (nestingFunction(a, b, options)) return true;
	return false;
};

function depthDeepCompare(a, b, options) {
	const {
		nestingFunction = depthDeepCompare,
		depth,
	} = options;

	//TODO Validate depth.

	if (depth < 0) return false;

	return baseDeepCompare(a, b, {
		...options,
		nestingFunction,
		depth: depth - 1,
	});
}

function nestDeepCompare(a, b, options) {
	const {
		selectFunction = Object.keys,
		nestingFunction = nestDeepCompare,
	} = options;
	
	//TODO Validate selectFunction.
	
	return baseDeepCompare(a, b, {
		...options,
		selectFunction,
		nestingFunction,
	});
}


//R Writing the wrapper logic in the nesting option won't work because the wrappers would overwrite each-other. The logic must go in the function body.

//---------- this is complicated, currently split between a nesting pattern and a framework pattern (each wrapper uses the base, ie no multiple nesting)

function nest(a, b, options) {

}


function base2DeepCompare(a, b, {
	primitiveComparator,
	objectComparator,
	keySelector,
	...options
}) {
	
	
	const selectedKeysOfA = keySelector(a);
	const selectedKeysOfB = keySelector(b);
}


export default function depthDeepCompare(a, b, {
	depth = 0,
	primitiveComparator = strictEquality,
}) {
	if (depth < 0) return false;

	return baseDeepCompare(a, b, {
		primitiveComparator,
		objectComparator: () => depthDeepCompare(a, b, {
			depth: depth - 1,
			primitiveComparator,
		}),
	});
}


/*
deep compare: create a primitive compare function that simply replaces the default === comparison and gets passed to nested calls, but for objects this can only really be a function that wraps deep compare, or else once the first nesting starts, the base deep compare is finished  so anything passed as the object compare function should wrap deepcompare. what gets passed to the object compare function parameter is the wrapper function itself (in the base case this defaults to deep compare). with this new strategy it may be helpful to extract the selection logic (enumerable, inherited, subset, etc.) to a higher wrapper layer so that this base functionality is clear.
maybe consider a 'selection' component where an array of pairs gets built to then call the nested compare function on. this wouldn't have to be limited to keys and would allow other stuff like 'instanceof'' to be added


base compare function
	manages nesting (and depth?)
		is depth possible outside of base compare function?
	is passed itself as an argument (rather than a closure)
		so that wrapper functions can be used
		this could be called the 'object compare function' (though that may be confusing)
	see if selection logic can be extracted
consider a 'selection' component where two arrays of values get built to then call the nested compare function on
	this wouldn't have to be limited to keys and would allow for other stuff like 'instanceof'
	*/