//TODO Move into config.
//TODO Convert to module.

/*  //G When using a custom location for the config file:
	The eslint CLI must be called from the command line with the '--config' option:
		--config ./source/config/.eslintrc.cjs
	The VSCode ESLint extension must set the eslint.options.configFile option:
		"eslint.options": {
			"configFile": "source/config/.eslintrc.cjs"
		}
*/

const off = 'off';
const on = 'warn';

/* eslint-disable quote-props */

//G Organize by generic theme.
//G //TODO Organize by groups of similar rules. ie. Brace and bracket spacing would go in the same group rather than separate object and array groups.


const rules = {
	variables: {
		'no-delete-var': [on],
		//R builtinGlobals triggers for all properties of 'window', some of which are very generic like 'name'.
		//R There are also many common uses for shadowing that won't cause issues but cannot be exempt from this rule.
		'no-shadow':     [off],
		// 'no-shadow':     [on, {
		// 	//TODO //?
		// 	builtinGlobals: true,
		// 	hoist:          'functions',
		// 	allow:          [],
		// }],
		'no-shadow-restricted-names': [on],
		'no-undef':                   [on],
		//G If triggered by a de-structured array, values can be ignored with commas: const [x, , y] = foo;
		'no-unused-vars':             [on, {
			vars:               'all',
			args:               'after-used',
			ignoreRestSiblings: true,
			caughtErrors:       'none',
		}],
		'no-use-before-define': [on, {
			functions: false,
			classes:   true,
			variables: true,
		}],
		identifiers: {
			'camelcase': [on, {
				properties:          'always',
				ignoreDestructuring: false,
				ignoreImports:       false,
				allow:               [],
			}],
			'new-cap': [on, {
				newIsCap:           true,
				capIsNew:           true,
				newIsCapExceptions: [],
				capIsNewExceptions: [],
			}],
			'no-underscore-dangle': [on],
			'no-useless-rename':    [on, {
				ignoreDestructuring: false,
				ignoreImport:        false,
				ignoreExport:        false,
			}],
			'id-blacklist': [off],
			'id-length':    [off],
			'id-match':     [off],
		},
		declarations: {
			'no-redeclare': [on, {
				builtinGlobals: true,
			}],
			'no-case-declarations': [on],
			'one-var':              [on, 'never'],
			'prefer-const':         [on, {
				destructuring:          'all',
				ignoreReadBeforeAssign: true,
			}],
			// Both are fine.
			'init-declarations':            [off],
			'one-var-declaration-per-line': [off],
			var:                            {
				'no-var':           [on],
				// Avoid vars, but if used, its probably wanted for its special behavior.
				'block-scoped-var': [off],
				'vars-on-top':      [off],
			},
		},
		assignments: {
			'no-cond-assign':    [on, 'except-parens'],
			'no-func-assign':    [on],
			'no-param-reassign': [on, {
				props: false,
			}],
			'no-return-assign': [on, 'except-parens'],
			'no-self-assign':   [on, {
				// May want to re-invoke setter and pass self.
				props: false,
			}],
			'no-multi-assign':   [on],
		},
		destructuring: {
			'no-empty-pattern':     [on],
			'prefer-destructuring': [on, {
				array:  true,
				// Object destructuring doesn't really make the assignment any clearer. Plus it is not compatible with optional chaining ?.
				object: false,
			}, {
				enforceForRenamedProperties: false,
			}],
		},
	},
	literals: {
		undefined: {
			'no-undef-init': [on],
			// Would rather just compare to undefined than use typeof. Shadowing issue is taken care of by the 'no-shadow-restricted-names' rule.
			'no-undefined':  [off],
		},
		string: {
			'no-multi-str':      [on],
			'no-octal-escape':   [on],
			'no-useless-concat': [on],
			'no-useless-escape': [on],
			'quotes':            [on, 'single', {
				avoidEscape:           true,
				allowTemplateLiterals: true,
			}],
			template: {
				//G Meant to overridden if intentional.
				'no-template-curly-in-string': [on],
				'template-tag-spacing':        [on, 'never'],
				'template-curly-spacing':      [on, 'never'],
			},
		},
		regex: {
			'no-empty-character-class':      [on],
			'no-invalid-regexp':             [on],
			'no-misleading-character-class': [on],
			'prefer-named-capture-group':    [on],
			'prefer-regex-literals':         [on],
			'require-unicode-regexp':        [on],
			// Easily discoverable if unintentional.
			'no-control-regex':              [off],
			// Easily discoverable if unintentional.
			'no-regex-spaces':               [off],
			'no-div-regex':                  [off], //?
			'wrap-regex':                    [off],
		},
		number: {
			'no-floating-decimal': [on],
			'no-magic-numbers':    [on, {
				ignore: [-1, 0, 1],
				ignoreArrayIndexes: true,
			}],
			'no-octal':                [on],
			'prefer-numeric-literals': [on],
		},
		object: {
			'no-dupe-keys':     [on],
			'quote-props':      [on, 'consistent-as-needed'],
			'object-shorthand': [on, 'always', {
				avoidQuotes:               false,
				ignoreConstructors:        false,
				avoidExplicitReturnArrows: false,
			}],
		},
		array: {
			'no-sparse-arrays': [on],
		},
	},
	operators: {
		// Relates to 'dot-location'.
		'operator-linebreak': [on, 'before'],
		'no-bitwise':         [on],
		'no-sequences':       [on],
		// This rule is only useful for avoiding ASI problems. Since semi-colons is mandatory, this isn't needed.
		'no-plusplus':        [off],
		logic:                {
			'no-extra-boolean-cast': [on],
			'no-unsafe-negation':    [on],
		},
		equality: {
			'no-compare-neg-zero': [on],
			'eqeqeq':              [on, 'always', {
				null: 'ignore',
			}],
			'yoda': [on, 'never', {
				exceptRange: true,
			}],
			'no-eq-null': [off],
		},
		binary: {
			'no-mixed-operators': [on, {
				allowSamePrecedence: true,
			}],
			'operator-assignment':            [on, 'always'],
			'prefer-exponentiation-operator': [on],
		},
		ternary: {
			'multiline-ternary':   [on, 'always-multiline'],
			'no-nested-ternary':   [on],
			'no-unneeded-ternary': [on, {
				defaultAssignment: true,
			}],
		},
	},
	keywords: {
		'keyword-spacing': [on, {
			before: true,
			after:  true,
		}],
		'valid-typeof':     [on],
		'no-void':          [on],
		//? Feasible?
		'no-throw-literal': [on],
		'no-debugger':      [on],
		'consistent-this':  [off],
		new:                {
			'no-new':          [on],
			'no-new-func':     [on],
			'no-new-wrappers': [on],
			'new-parens':      [on, 'always'],
			'no-new-object':   [on],
			'no-new-symbol':   [on],
		},
	},
	controlFlow: {
		'no-with':                          [on],
		'nonblock-statement-body-position': [on, 'beside'],
		if:                                 {
			'no-else-return': [on, {
				allowElseIf: true,
			}],
			'no-lonely-if':         [on],
			'no-negated-condition': [on],
		},
		switchCase: {
			'no-duplicate-case':    [on],
			// Personal preference.
			'no-fallthrough':       [on],
			'switch-colon-spacing': [on, {
				before: false,
				after:  true,
			}],
			// Switch without default is clear. Same as if without else
			'default-case': [off],
		},
		tryCatch: {
			'no-ex-assign':      [on],
			'no-unsafe-finally': [on],
			'no-useless-catch':  [on],
		},
		loops: {
			//? Feasible? How does this work with side effects?
			'no-unmodified-loop-condition': [on],
			'no-loop-func':                 [on],
			'no-continue':                  [on],
			'for-direction':                [on],
			// Those using for-in should know how to use it.
			'guard-for-in':                 [off],
		},
		labels: {
			'no-labels':        [on],
			'no-label-var':     [on],
			'no-extra-label':   [on],
			'no-unused-labels': [on],
		},
	},
	spreadRest: {
		'prefer-object-spread': [on],
		'prefer-rest-params':   [on],
		'prefer-spread':        [on],
	},
	modules: {
		'no-import-assign':     [on],
		'no-duplicate-imports': [on, {
			includeExports: false,
		}],
	},
	syntax: {
		parentheses: {
			// Parentheses help clarify code.
			'no-extra-parens': [off],
		},
		blocks: {
			'no-lone-blocks': [on],
			'curly':          [on, 'multi-line'],
			'brace-style':    [on, '1tbs', {
				allowSingleLine: true,
			}],
			// Has uses: overwrite methods, empty functions.
			'no-empty': [off],
		},
		semicolons: {
			'no-unexpected-multiline': [on],
			'no-extra-semi':           [on],
			'semi':                    [on, 'always', {
				omitLastInOneLineBlock: true,
			}],
			'semi-spacing': [on, {
				before: false,
				after:  true,
			}],
			'semi-style':             [on, 'last'],
		},
		dot: {
			// Relates to 'operator-linebreak' rule.
			'dot-location': [on, 'property'],
			// Easily noticeable. Can be used for consistency with other accessor statements.
			'dot-notation': [off],
		},
		computedProperty: {
			'no-useless-computed-key': [on],
		},
		comma: {
			'comma-dangle':  [on, 'always-multiline'],
			'comma-spacing': [on, {
				before: false,
				after:  true,
			}],
			'comma-style':   [on, 'last'],
		},
	},
	functions: {
		'no-dupe-args':          [on],
		'no-inner-declarations': [on],
		'consistent-return':     [on, {
			treatUndefinedAsUnspecified: false,
		}],
		'no-caller':         [on],
		'no-invalid-this':   [on],
		'no-useless-return': [on],
		'wrap-iife':         [on, 'inside', {
			functionPrototypeMethods: true,
		}],
		//? Feasibility?
		'func-name-matching':       [on],
		//? Feasibility?
		'func-names':               [on, 'as-needed'],
		//? Feasibility?
		'func-style':               [off],
		'newline-per-chained-call': [off],
		'no-empty-function':        [off],
		// Re-introducing 'this' to a function that had bind removed will cause more issues than removing bind from a function without 'this'.
		'no-extra-bind':            [off],
		'default-param-last':       [off],
		// .call(null, ...) is useful for functions that shouldn't be referencing `this`. Also for consistency, all functions in a group may want to be invoked with .call() even if some don't need it.
		'no-useless-call':          [off],
		arrow:                      {
			'implicit-arrow-linebreak': [on, 'beside'],
			// Requires parentheses in all cases except when there is one parameter and an implicit return.
			'arrow-parens':             [on, 'as-needed', {
				requireForBlockBody: true,
			}],
			'prefer-arrow-callback':    [on, {
				allowNamedFunctions: false,
				allowUnboundThis:    true,
			}],
			'arrow-body-style': [off],
		},
		async: {
			// Use .then() or elevate logic to parent async function instead.
			'no-async-promise-executor':    [on],
			'no-await-in-loop':             [on], //?
			'require-atomic-updates':       [on],
			'no-return-await':              [on],
			//? Feasible?
			'prefer-promise-reject-errors': [on],
			'require-await':                [off],
		},
		generator: {
			'generator-star-spacing': [on, {
				before: false,
				after:  true,
			}],
			'yield-star-spacing': [on, {
				before: false,
				after:  true,
			}],
			'require-yield': [off],
		},
		accessor: {
			//TODO Create a rule like this, but that only allows no getter return if its completely empty.
			'getter-return':  [off],
			'accessor-pairs': [off],
		},
		classes: {
			'no-class-assign':       [on],
			'no-dupe-class-members': [on],
		},
		constructor: {
			'no-constructor-return':  [on],
			'no-this-before-super':   [on],
			'no-useless-constructor': [on],
		},
		methods: {
			'class-methods-use-this': [on],
		},

	},
	builtIn: {
		'no-obj-calls':          [on],
		'no-prototype-builtins': [on],
		'no-proto':              [on],
		'no-extend-native':      [on],
		'no-global-assign':      [on],
		'no-implicit-coercion':  [on],
		'no-eval':               [on],
		'no-implied-eval':       [on],
		'no-console':            [off],
		'no-alert':              [off],
		symbol:                  {
			'symbol-description': [off],
		},
		number: {
			'radix':     [on],
			//TODO Add lint rule to use Number.isNaN() instead of isNan()
			'use-isnan': [on, {
				enforceForSwitchCase: true,
				enforceForIndexOf:    true,
			}],
		},
		array: {
			'array-callback-return': [on, {
				// Implicit return is explicit enough.
				allowImplicit: true,
				checkForEach:  true,
			}],
			'no-array-constructor': [on],
		},
		nonStandard: {
			'no-iterator': [on],
		},
	},
	general: {
		'no-unused-expressions': [on, {
			// Personal preference for all these options.
			allowShortCircuit:    true,
			allowTernary:         true,
			allowTaggedTemplates: true,
		}],
		'no-constant-condition': [on],
		'no-unreachable':        [on],
	},
	misc: {
		'strict':        [on],
		'no-script-url': [on],
		'unicode-bom':   [on], //?
		'jsx-quotes':    [on, 'prefer-single'],
	},
	sorting: {
		'sort-imports': [off],
		'sort-vars':    [off],
		'sort-keys':    [off],
	},
	whitespace: {
		'no-irregular-whitespace': [on, {
			skipStrings:   true,
			skipComments:  true,
			skipRegExps:   true,
			skipTemplates: true,
		}],
		'no-tabs': [off],
		lines:     {
			'eol-last':                [on, 'always'],
			'linebreak-style':         [on, 'windows'],
			'no-multiple-empty-lines': [on, {
				max:    2,
				maxBOF: 0,
				maxEOF: 0,
			}],
			'padded-blocks':                   [on, 'never'],
			'function-call-argument-newline':  [on, 'consistent'],
			'function-paren-newline':          [on, 'multiline-arguments'],
			'lines-around-comment':            [off],
			'lines-between-class-members':     [off],
			'padding-line-between-statements': [off],
			brackets:                          {
				'array-bracket-newline': [on, 'consistent'],
				'array-element-newline': [on, 'consistent'],
			},
			braces: {
				'object-curly-newline': [on, {
					ObjectExpression:  {consistent: true},
					ObjectPattern:     {consistent: true},
					ImportDeclaration: {consistent: true},
					ExportDeclaration: {consistent: true},
				}],
				'object-property-newline': [on, {
					allowAllPropertiesOnSameLine: true,
				}],
			},
		},
		indentation: {
			// Interacts better with git tools and file joins.
			'indent':                   [on, 'tab'],
			'no-mixed-spaces-and-tabs': [on, 'smart-tabs'],
		},
		spaces: {
			'no-trailing-spaces': [on, {
				skipBlankLines: false,
				ignoreComments: false,
			}],

			'space-before-function-paren': [on, {
				named:      'never',
				anonymous:  'always',
				asyncArrow: 'always',
			}],
			'arrow-spacing': [on, {
				before: true,
				after:  true,
			}],
			'func-call-spacing':   [on, 'never'],
			'space-before-blocks': [on, 'always'],
			'rest-spread-spacing': [on, 'never'],
			'space-unary-ops':     [on, {
				words:    true,
				nonwords: false,
			}],
			'space-infix-ops':              [on],

			'key-spacing': [on, {
				beforeColon: false,
				afterColon:  true,
				mode: 'minimum',
				// Align not turned on because it can't be limited to same-type-properties.
				/* With align:
					singleLine: {
						beforeColon: false,
						afterColon:  true,
						mode:        'minimum',
					},
					multiLine: {
						beforeColon: false,
						afterColon:  true,
						mode:        'minimum',
					},
					align: {
						beforeColon: false,
						afterColon:  true,
						mode:        'strict',
						on:          'value',
					},
				*/
			}],
			'no-whitespace-before-property': [on],

			'space-in-parens':           [on, 'never'],
			'object-curly-spacing':      [on, 'never'],
			'array-bracket-spacing':     [on, 'never'],
			'computed-property-spacing': [on, 'never'],

			'block-spacing':  [on, 'always'],
			'spaced-comment': [on, 'always', {
				exceptions: [
					'-',
				],
				markers:    [
					'/',
					'TODO',
					'G',
					'L',
					'R',
					'!',
					'?',
					'OLD',
				],
			}],

			// Horizontal alignment used in many different places.
			'no-multi-spaces': [off],
		},
	},
	comments: {
		// Not feasible as there are too many cases where a lowercase comment is valid (literals).
		'capitalized-comments':  [off],
		'no-warning-comments':   [off],
		'line-comment-position': [off],
		'no-inline-comments':    [off],
	},
	custom: {
		limits: {
			'complexity':              [off],
			'max-classes-per-file':    [off],
			'max-depth':               [off],
			'max-len':                 [off],
			'max-lines':               [off],
			'max-lines-per-function':  [off],
			'max-nested-callbacks':    [off],
			'max-params':              [off],
			'max-statements':          [off],
			'max-statements-per-line': [off],
			'multiline-comment-style': [off],
		},
		restrictions: {
			'no-restricted-globals':    [off],
			'no-restricted-properties': [off],
			'no-restricted-imports':    [off],
			'no-restricted-exports':    [off],
			'no-restricted-syntax':     [off],
		},
	},
};

function selectRules(nestedRules, selection = '*') {
	const selectAll = selection === '*';
	const selectedRules = {};
	for (const key in nestedRules) {
		const value = nestedRules[key];
		const isTarget = selectAll || key === selection;
		const isRuleGroup = typeof value === 'object' && !Array.isArray(value);
		if (isRuleGroup) {
			let deeperSelectedRules;
			if (isTarget) {
				// If the group is targeted, select all rules and sub-groups under the group.
				deeperSelectedRules = selectRules(value, '*');
			} else {
				// If the group is not targeted, go deeper with the selection.
				deeperSelectedRules = selectRules(value, selection);
			}
			Object.assign(selectedRules, deeperSelectedRules);
		} else if (isTarget) {
			// If the rule is targeted, add the rule to the list;
			selectedRules[key] = value;
		}
	}
	return selectedRules;
}

module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module',
		// allowImportExportEverywhere: true,
		ecmaFeatures: {
			impliedStrict: true,
		},
	},
	env: {
		browser: true,
		es2020:  true, // Automatically sets parserOptions.ecmaVersion to 11
		node:    true, //TODO Consider splitting lint rules into client and server. This would catch accidental cross over errors.
	},
	rules: selectRules(rules),
};
