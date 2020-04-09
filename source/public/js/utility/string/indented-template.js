export const tabIndented   = (strings, ...expressions) => indented(strings, expressions, '	');
export const spaceIndented = (strings, ...expressions) => indented(strings, expressions, ' ');

function indented(stringsFrozen, expressions, indentCharacter) {
	let strings = [...stringsFrozen];
	const firstIndex = 0;
	const lastIndex = strings.length - 1;
	
	// If the template ends with a new-line character followed by zero or many indent characters, remove those characters.
	strings[lastIndex] = strings[lastIndex].replace(
		new RegExp(`\n${indentCharacter}*$`), 
		'',
	);

	// Match indents.
	const indents = [];
	for (const string of strings) {
		/* Matches 0 or many indent characters.
			- Following a new-line. 
			- Preceding a non-indent, non-new-line character. 
				//R Ignores 'indent-only' lines.
			
			//R Don't follow start (^) or precede end ($), because otherwise indentation characters in single line strings and strings between variables will get matched.
		*/
		const matches = string.match(
			new RegExp(`(?<=\n)(${indentCharacter}*)(?=[^${indentCharacter}\n])`, 'g')
		);

		if (matches !== null) indents.push(...matches);
	}

	// Get the smallest indent amount.
	let smallestIndentAmount = Math.min(...indents.map((indent) => indent.length));
	if (smallestIndentAmount === Infinity) smallestIndentAmount = 0;

	
	// Remove smallest indent from all lines.
	/* Matches the smallest indent.
		- Following a new line.
		//! Not required to precede a non-indent or non-new-line character. This ensures 'excessively-indented' and 'indent-only' lines can be matched and only have part of their indentation removed.
	*/
	strings = strings.map((string) => string.replace(
		new RegExp(`(?<=\n)(${indentCharacter}{${smallestIndentAmount}})`, 'g'), 
	''));

	/* Remove leading newline if it exists.
		//R Must happen after removing indentation, because it is required to identify the first line's indentation.
		//R Must happen before construction, because otherwise a newline could be removed from a leading expression.	
	*/
	strings[firstIndex] = strings[firstIndex].replace(new RegExp(`^\n`), '');

	/* Construct template.
		//R Must happen after the indentation is removed, because expressions should be considered as using the 'adjusted' indentation.
	*/
	let template = '';
	for (let i = 0; i < strings.length; i++) {
		template += strings[i];
		if (expressions[i] !== undefined) template += expressions[i];
	}

	return template;
};
