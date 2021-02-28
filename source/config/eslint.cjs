/*  
	//G When using a custom location for the config file:
	The eslint CLI must be called from the command line with the '--config' option:
		--config ./source/config/.eslintrc.cjs
	The VSCode ESLint extension must set the eslint.options.configFile option:
		"eslint.options": {
			"configFile": "source/config/.eslintrc.cjs"
		}
	and for Typescript linting, the eslint.validate option:
		"eslint.validate": ["javascript", "typescript"]
		
	//G Organize by generic theme.
	//G //TODO Organize by groups of similar rules. ie. Brace and bracket spacing would go in the same group rather than separate object and array groups.

	//G For TS extension rules, don't set any extra non-ts specific options. This keeps the rules consistent between languages.
	//G Typescript extension rules with extra options are marked with //EO
	
	//L eslint rules: https://eslint.org/docs/rules/
	//L @typescript-eslint rules: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
	
	//TODO Convert to module.
	
	//TODO Create test that ensures all typescript rules have the same option as their JS alternative.
	
	//TODO Can typescript rules that don't require type information be used on javascript? Check that all the extended rules require types.
*/

/* eslint-disable quote-props */

const {
	babelConfigFile,
	typescriptConfigFile,
} = require('./project-paths.cjs');

const off = 'off';
const on = 'warn';

const rules = {
	variables: {
		'no-delete-var': [on],
		//R builtinGlobals triggers for all properties of 'window', some of which are very generic like 'name'.
		//R There are also many common uses for shadowing that won't cause issues but cannot be exempt from this rule.
		// 'no-shadow':     [on, {
		// 	//TODO //?
		// 	builtinGlobals: true,
		// 	hoist:          'functions',
		// 	allow:          [],
		// }],
		'no-shadow':                    [off],
		'@typescript-eslint/no-shadow': [off], //EO
		'no-shadow-restricted-names': [on],
		'no-undef':                   [on],
		//G If triggered by a de-structured array, values can be ignored with commas: const [x, , y] = foo;
		'no-unused-vars':             [on, {
			vars:               'all',
			args:               'after-used',
			ignoreRestSiblings: true,
			caughtErrors:       'none',
		}],
		'@typescript-eslint/no-unused-vars': [on, { //EO
			vars:               'all',
			args:               'after-used',
			ignoreRestSiblings: true,
			caughtErrors:       'none',
		}],
		'no-use-before-define': [on, {
			functions: false, // Functions are hoisted.
			classes:   true,  // Classes are not hoisted.
			variables: true,  // var is hoisted but const and let are not.
		}],
		'@typescript-eslint/no-use-before-define': [on, { //EO
			functions: false,
			classes:   true,
			variables: true,
			//TODO Not sure if these are hoisted:
			enums:     true,
			typedefs:  true,
			ignoreTypeReferences: false,
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
				// It is useful to capitalize factory functions. They usually come from external modules.
				capIsNew:           false,
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
			'@typescript-eslint/naming-convention': [off], //TODO Consider
		},
		declarations: {
			'no-redeclare': [on, {
				builtinGlobals: true,
			}],
			'@typescript-eslint/no-redeclare': [on, { //EO
				builtinGlobals: true,
				ignoreDeclarationMerge: false,
			}],
			'no-case-declarations': [on],
			'one-var':              [on, 'never'],
			'prefer-const':         [on, {
				destructuring:          'all',
				ignoreReadBeforeAssign: true,
			}],
			// Both are fine.
			'init-declarations':                    [off],
			'@typescript-eslint/init-declarations': [off],
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
			'quotes': [on, 'single', {
				avoidEscape:           true,
				allowTemplateLiterals: true,
			}],
			'@typescript-eslint/quotes': [on, 'single', {
				avoidEscape:           true,
				allowTemplateLiterals: true,
			}],
			template: {
				'no-template-curly-in-string': [on], //G Meant to overridden if intentional.
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
			'no-magic-numbers': [on, {
				ignore: [-1, 0, 1],
				ignoreArrayIndexes: true,
			}],
			'@typescript-eslint/no-magic-numbers': [on, { //EO
				ignore: [-1, 0, 1],
				ignoreArrayIndexes:            true,
				ignoreEnums:                   true,
				ignoreNumericLiteralTypes:     true,
				ignoreReadonlyClassProperties: false,
			}],
			'no-octal':                [on],
			'prefer-numeric-literals': [on],
			'no-loss-of-precision': [on],
			'@typescript-eslint/no-loss-of-precision': [on],
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
		'operator-linebreak': [on, 'before'], // Relates to 'dot-location'.
		'no-bitwise':         [on],
		'no-sequences':       [on],
		'no-plusplus':        [off], // This rule is only useful for avoiding ASI problems. Since semi-colons is mandatory, this isn't needed.
		'@typescript-eslint/no-dynamic-delete': [on],
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
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': [on],
		},
		binary: {
			'no-mixed-operators': [on, {
				allowSamePrecedence: true,
			}],
			'operator-assignment':            [on, 'always'],
			'prefer-exponentiation-operator': [on],
			'@typescript-eslint/prefer-nullish-coalescing': [on],
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
		'@typescript-eslint/keyword-spacing': [on, {
			before: true,
			after:  true,
		}],
		'valid-typeof':     [on],
		'no-void':          [on],
		//? Feasible?
		'no-throw-literal':                    [on],
		'@typescript-eslint/no-throw-literal': [on],
		'no-debugger':      [on],
		'consistent-this':  [off],
		'@typescript-eslint/no-this-alias': [on],
		new: {
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
			'no-fallthrough':       [on], // Personal preference.
			'switch-colon-spacing': [on, {
				before: false,
				after:  true,
			}],
			'@typescript-eslint/switch-exhaustiveness-check': [on],
			'default-case': [off], // Switch without default is clear. Same as if without else
		},
		tryCatch: {
			'no-ex-assign':      [on],
			'no-unsafe-finally': [on],
			'no-useless-catch':  [on],
			'@typescript-eslint/no-implicit-any-catch': [on, {
				allowExplicitAny: false,
			}],
		},
		loops: {
			'no-unmodified-loop-condition':       [on], //? Feasible? How does this work with side effects?
			'no-loop-func':                       [on],
			'@typescript-eslint/no-loop-func':    [on],
			'no-continue':                        [on],
			'for-direction':                      [on],
			'guard-for-in':                       [off], // Those using for-in should know how to use it.
			'@typescript-eslint/no-for-in-array': [on],
			'@typescript-eslint/prefer-for-of':   [on],
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
		'@typescript-eslint/consistent-type-imports': [on, {
			prefer: 'type-imports',
		}],
		'@typescript-eslint/no-duplicate-imports':   [on, {
			includeExports: false,
		}],
		'@typescript-eslint/no-require-imports':     [on],
		'@typescript-eslint/no-var-requires':        [on],
		'@typescript-eslint/triple-slash-reference': [on, {
			path:  'never',
			types: 'never',
			lib:   'never',
		}],
	},
	syntax: {
		'@typescript-eslint/member-delimiter-style': [on, {
			multiline: {
				delimiter: 'comma',
				requireLast: true,
			},
			singleline: {
				delimiter: 'comma',
				requireLast: false,
			},
		}],
		parentheses: {
			// Parentheses help clarify code.
			'no-extra-parens': [off],
			'@typescript-eslint/no-extra-parens': [off],
		},
		blocks: {
			'no-lone-blocks': [on],
			'curly':          [on, 'multi-line'],
			'brace-style':    [on, '1tbs', {
				allowSingleLine: true,
			}],
			'@typescript-eslint/brace-style': [on, '1tbs', {
				allowSingleLine: true,
			}],
			// Has uses: overwrite methods, empty functions.
			'no-empty': [off],
		},
		semicolons: {
			'no-unexpected-multiline': [on],
			'no-extra-semi':                    [on],
			'@typescript-eslint/no-extra-semi': [on],
			'semi': [on, 'always', {
				omitLastInOneLineBlock: true,
			}],
			'@typescript-eslint/semi': [on, 'always', {
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
			'dot-notation':                    [off],
			'@typescript-eslint/dot-notation': [off], //EO
			'@typescript-eslint/prefer-optional-chain': [on],
		},
		computedProperty: {
			'no-useless-computed-key': [on],
		},
		comma: {
			'comma-dangle':                    [on, 'always-multiline'],
			'@typescript-eslint/comma-dangle': [on, 'always-multiline'], //EO
			'comma-spacing': [on, {
				before: false,
				after:  true,
			}],
			'@typescript-eslint/comma-spacing': [on, {
				before: false,
				after:  true,
			}],
			'comma-style':   [on, 'last'],
		},
	},
	functions: {
		'no-inner-declarations': [on],
		'consistent-return': [on, {
			treatUndefinedAsUnspecified: false,
		}],
		'no-caller': [on],
		'no-invalid-this':                    [on],
		'@typescript-eslint/no-invalid-this': [on],
		'no-useless-return': [on],
		'wrap-iife': [on, 'inside', {
			functionPrototypeMethods: true,
		}],
		//? Feasibility?
		'func-name-matching': [on],
		//? Feasibility?
		'func-names': [on, 'as-needed'],
		'func-style': [off], //? Feasible?
		'newline-per-chained-call': [off],
		'no-empty-function':                    [off],
		'@typescript-eslint/no-empty-function': [off], //EO
		// Re-introducing 'this' to a function that had bind removed will cause more issues than removing bind from a function without 'this'.
		'no-extra-bind': [off],
		// .call(null, ...) is useful for functions that shouldn't be referencing `this`. Also for consistency, all functions in a group may want to be invoked with .call() even if some don't need it.
		'no-useless-call': [off],
		
		signature: {	
			'no-dupe-args': [on],
			'@typescript-eslint/adjacent-overload-signatures': [on],
			'@typescript-eslint/unified-signatures':           [on],
			'default-param-last':                    [off],
			'@typescript-eslint/default-param-last': [off],
			'@typescript-eslint/prefer-readonly-parameter-types': [off], //R Probably not feasible.
		},
		arrow: {
			'implicit-arrow-linebreak': [on, 'beside'],
			// Only use parentheses if needed. This is similar to how two body styles are allowed.
			'arrow-parens':             [on, 'as-needed'],
			'prefer-arrow-callback':    [on, {
				allowNamedFunctions: false,
				allowUnboundThis:    true,
			}],
			'arrow-body-style': [off],
		},
		async: {
			'no-async-promise-executor':    [on], // Use .then() or elevate logic to parent async function instead.
			'no-await-in-loop':             [on],
			'require-atomic-updates':       [on],
			'no-return-await':              [on],
			'@typescript-eslint/return-await': [on, 'never'], //EO
			'prefer-promise-reject-errors': [on], //? Feasible?
			'@typescript-eslint/await-thenable':         [on],
			'@typescript-eslint/no-floating-promises':   [on], //? Feasible?
			'@typescript-eslint/no-misused-promises':    [on],
			'@typescript-eslint/promise-function-async': [on],
			'require-await':                    [off],
			'@typescript-eslint/require-await': [off],

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
			'no-dupe-class-members':                    [on],
			'@typescript-eslint/no-dupe-class-members': [on],
			'@typescript-eslint/class-literal-property-style': [off],
			'@typescript-eslint/explicit-member-accessibility': [off],
			'@typescript-eslint/no-extraneous-class': [on, {
				allowConstructorOnly: false,
				allowEmpty:           false,
				allowStaticOnly:      false,
				allowWithDecorator:   false,
			}],
			'@typescript-eslint/prefer-readonly': [on],
		},
		constructor: {
			'no-constructor-return':  [on],
			'no-this-before-super':   [on],
			'no-useless-constructor':                    [on],
			'@typescript-eslint/no-useless-constructor': [on],
			'@typescript-eslint/no-parameter-properties': [off], //? How do private parameter properties interop with the ECMA # private syntax?
		},
		methods: {
			'class-methods-use-this': [on],
			'@typescript-eslint/method-signature-style': [on, 'property'],
			'@typescript-eslint/unbound-method': [on, {
				ignoreStatic: false,
			}],
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
		'no-implied-eval':                       [on],
		'@typescript-eslint/no-base-to-string':  [on],
		'@typescript-eslint/no-implied-eval':    [on],
		'@typescript-eslint/prefer-includes':    [on],
		'@typescript-eslint/prefer-regexp-exec': [on],
		'@typescript-eslint/prefer-string-starts-ends-with': [on],
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
			'no-array-constructor':                    [on],
			'@typescript-eslint/no-array-constructor': [on],
			'@typescript-eslint/prefer-reduce-type-parameter': [on],
			'@typescript-eslint/require-array-sort-compare': [on, {
				ignoreStringArrays: true,
			}],
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
		'@typescript-eslint/no-unused-expressions': [on, {
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
		//R Rules turned off here because of semantic grouping.
		'sort-imports': [off],
		'sort-vars':    [off],
		'sort-keys':    [off],
		'@typescript-eslint/member-ordering': [off],
		'@typescript-eslint/sort-type-union-intersection-members': [off],
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
			'padding-line-between-statements': [off],
			'lines-between-class-members':                    [off],
			'@typescript-eslint/lines-between-class-members': [off], //EO
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
			'indent':                    [on, 'tab'],
			'@typescript-eslint/indent': [on, 'tab'],
			'no-mixed-spaces-and-tabs':  [on, 'smart-tabs'],
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
			'@typescript-eslint/space-before-function-paren': [on, {
				named:      'never',
				anonymous:  'always',
				asyncArrow: 'always',
			}],
			'arrow-spacing': [on, {
				before: true,
				after:  true,
			}],
			'func-call-spacing':                    [on, 'never'],
			'@typescript-eslint/func-call-spacing': [on, 'never'],
			'space-before-blocks': [on, 'always'],
			'rest-spread-spacing': [on, 'never'],
			'space-unary-ops':     [on, {
				words:    true,
				nonwords: false,
			}],
			'space-infix-ops':                    [on],
			'@typescript-eslint/space-infix-ops': [on],

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

			'space-in-parens':                         [on, 'never'],
			'object-curly-spacing':                    [on, 'never'],
			'@typescript-eslint/object-curly-spacing': [on, 'never'],
			'array-bracket-spacing':                   [on, 'never'],
			'computed-property-spacing':               [on, 'never'],

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
			'@typescript-eslint/type-annotation-spacing': [on],

			// Horizontal alignment used in many different places.
			'no-multi-spaces': [off],
		},
	},
	comments: {
		'@typescript-eslint/ban-ts-comment':         [on],
		'@typescript-eslint/ban-tslint-comment':     [on],
		'@typescript-eslint/prefer-ts-expect-error': [on],
		'capitalized-comments':  [off], // Not feasible as there are too many cases where a lowercase comment is valid (literals).
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
	types: {
		'@typescript-eslint/array-type': [on, {
			default: 'array',
		}],
		'@typescript-eslint/ban-types': [on], //L See default options: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
		'@typescript-eslint/consistent-indexed-object-style': [on, 'index-signature'],
		'@typescript-eslint/consistent-type-assertions': [on, {
			assertionStyle: 'as',
			objectLiteralTypeAssertions: 'never',
		}],
		'@typescript-eslint/consistent-type-definitions': [on, 'interface'],
		
		'@typescript-eslint/no-confusing-void-expression': [on, {
			ignoreArrowShorthand: false,
			ignoreVoidOperator: false,
		}],
		'@typescript-eslint/no-inferrable-types': [on, {
			ignoreParameters: false,
			ignoreProperties: false,
		}],
		'@typescript-eslint/no-invalid-void-type': [on],
		'@typescript-eslint/no-misused-new': [on],
		'@typescript-eslint/no-unnecessary-condition': [on],
		'@typescript-eslint/no-unnecessary-type-assertion': [on],
		'@typescript-eslint/no-unnecessary-type-constraint': [on],
		'@typescript-eslint/prefer-as-const': [on],
		'@typescript-eslint/explicit-function-return-type': [off],
		'@typescript-eslint/explicit-module-boundary-types': [off], //? //TODO
		'@typescript-eslint/no-type-alias': [off], //? Useful?
		'@typescript-eslint/no-unnecessary-type-arguments': [off], // Explicity is good.
		'@typescript-eslint/prefer-function-type': [off], //TODO //?
		'@typescript-eslint/typedef': [off],
		restrictions: {
			'@typescript-eslint/restrict-plus-operands': [on, {
				checkCompoundAssignments: true,
			}],
			'@typescript-eslint/restrict-template-expressions': [on, {
				allowNumber:  true,
				allowBoolean: false,
				allowAny:     false,
				allowNullish: false,
			}],
			'@typescript-eslint/strict-boolean-expressions': [on],
		},
		any: {
			'@typescript-eslint/no-explicit-any': [on, {
				fixToUnknown: true,
				ignoreRestArgs: false,
			}],
			'@typescript-eslint/no-unsafe-assignment':    [on],
			'@typescript-eslint/no-unsafe-call':          [on],
			'@typescript-eslint/no-unsafe-member-access': [on],
			'@typescript-eslint/no-unsafe-return':        [on],
		},
		nonNull: {
			'@typescript-eslint/no-non-null-assertion':               [on], //? Feasible?
			'@typescript-eslint/no-confusing-non-null-assertion':     [on],
			'@typescript-eslint/no-extra-non-null-assertion':         [on],
			'@typescript-eslint/no-non-null-asserted-optional-chain': [on],
			'@typescript-eslint/non-nullable-type-assertion-style':   [on], //? Possible conflict with no-non-null-assertion?
		},
	},
	typescript: {
		'@typescript-eslint/no-empty-interface': [on],
		namespace: {
			'@typescript-eslint/no-namespace': [on, {
				allowDeclarations: false,
				allowDefinitionFiles: false,
			}],
			'@typescript-eslint/no-unnecessary-qualifier': [on],
			'@typescript-eslint/prefer-namespace-keyword': [on],
		},
		enum: {
			'@typescript-eslint/prefer-enum-initializers': [on],
			'@typescript-eslint/prefer-literal-enum-member': [on],
		},
	},
};

function selectRules(nestedRules, selection = '*', language = 'js') {
	const selectAll = selection === '*';
	const selectedRules = {};
	for (const key in nestedRules) {
		const value = nestedRules[key];
		const isSelected = selectAll || key === selection;
		const isRuleGroup = typeof value === 'object' && !Array.isArray(value);
		if (isRuleGroup) {
			let deeperSelectedRules;
			if (isSelected) {
				// If the group is targeted, select all rules and sub-groups under the group.
				deeperSelectedRules = selectRules(value, '*', language);
			} else {
				// If the group is not targeted, go deeper with the selection.
				deeperSelectedRules = selectRules(value, selection, language);
			}
			Object.assign(selectedRules, deeperSelectedRules);
		} else if (isSelected) {
			// If the rule is selected and meets the language requirements, add it to the list.
			
			const isTSRule                    = /^@typescript-eslint\//u.test(key);
			const tsAlternative = `@typescript-eslint/${key}`;
			const hasTSAlternative = tsAlternative in nestedRules;
			
			//R //! Rules cannot simply be omitted because when used with override the underlying rules will still be applied.
			if(language === 'js') {
				if (isTSRule) {
					// In JS, turn off TS rules.
					selectedRules[key] = [off];
				} else {
					selectedRules[key] = value;
				}
			} else if (language === 'ts') {
				if (isTSRule) {
					selectedRules[key] = value;
				} else {
					if (hasTSAlternative) {
						// In TS, turn off JS rules if they have a TS alternative.
						selectedRules[key] = [off];
					} else {
						selectedRules[key] = value;
					}
				}
			}
		}
	}
	return selectedRules;
}

module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@babel/eslint-parser',
		babelOptions: {
			configFile: babelConfigFile,
		},
		ecmaFeatures: {
			impliedStrict: true,
		},
	},
	env: {
		browser: true,
		es2020:  true, // Automatically sets parserOptions.ecmaVersion to 11
		node:    true, //TODO Consider splitting lint rules into client and server. This would catch accidental cross over errors.
	},
	rules: selectRules(rules, '*', 'js'),
	ignorePatterns: ['**/*.js', '**/*.cjs', '**/*.vue'],
	overrides: [{
		// @babel-eslint/parser cannot handle some Typescript syntax (Enums, Interfaces) even if using @babel/plugin-transform-typescript. Therefore @typescript-eslint/parser is used instead.
		//! This means that Typescript files are linted based on a transpilation from tsc rather than babel.
		files: ['**/*.ts'],
		plugins: ['@typescript-eslint'],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			project: typescriptConfigFile,
		},
		rules: {
			// Typescript Rules
			//L https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md#supported-rules


			// Extensions
			// Some rules require further extension to properly report on Typescript files.
			//L https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md#extension-rules
			// 'no-unused-vars': [off],
			// '@typescript-eslint/no-unused-vars': rules.variables['no-unused-vars'],
			...selectRules(rules, '*', 'ts'),
		},
	}],
};
