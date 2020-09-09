/* eslint-disable */
//! Specifically don't want eslint to auto-fix the indentation in this file.

import test from 'ava';
import {tabIndented, spaceIndented} from './indented-template.js';

//! Be careful about auto indentation when moving these tests around.
//! Be careful about blank lines being auto shortened.
//! This file was created with tab indentation by default.

//   ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗     ███████╗██╗  ██╗
//  ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║     ██╔════╝╚██╗██╔╝
//  ██║     ██║   ██║██╔████╔██║██████╔╝██║     █████╗   ╚███╔╝ 
//  ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝   ██╔██╗ 
//  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ███████╗███████╗██╔╝ ██╗
//   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝

// COMMON INDENT
test('removes excess indent', (t) => {
		t.is(tabIndented`
			foo
		`, `foo`);
		t.is(spaceIndented`
            foo
        `, `foo`);
});
test('removes minimum indent', (t) => {
		t.is(tabIndented`
				foo
			bar
					baz
		`, `	foo\nbar\n		baz`);
		t.is(spaceIndented`
                foo
            bar
                    baz
        `, `    foo\nbar\n        baz`);
});
test('does not remove if mixed', (t) => {
t.is(tabIndented`
	tabs
    spaces
`, `	tabs\n    spaces`);
t.is(spaceIndented`
	tabs
    spaces
`, `	tabs\n    spaces`);
});
test('does not factor in or modify top indent', (t) => {
	t.is(tabIndented`			foo
		bar
	`, `			foo\nbar`);
	t.is(spaceIndented`            foo
        bar
    `, `            foo\nbar`);
});

// BLANK LINES
test('ignores smaller blank lines', (t) => {
	t.is(tabIndented`
		foo

		bar
	`, `foo\n\nbar`);
	t.is(spaceIndented`
        foo

        bar
    `, `foo\n\nbar`);
});
test('ignores same blank lines', (t) => {
	t.is(tabIndented`
		foo
\t\t
		bar
	`, `foo\n\nbar`);
	t.is(spaceIndented`
        foo
        
        bar
    `, `foo\n\nbar`);
});
test('ignores bigger blanks lines, but adjusts them', (t) => {
	t.is(tabIndented`
		foo
\t\t\t\t
		bar
	`, `foo\n\t\t\nbar`);
	t.is(spaceIndented`
        foo
                
        bar
    `, `foo\n        \nbar`);
});

// EXPRESSIONS
test('single line expression', (t) => {
	t.is(tabIndented`
		foo
		${'bar'}
		baz
	`, `foo\nbar\nbaz`);
	t.is(spaceIndented`
        foo
        ${'bar'}
        baz
    `, `foo\nbar\nbaz`);
});
test('expression followed by indent characters', (t) => {
	t.is(tabIndented`
		foo
		${'bar'}		
		baz
	`, `foo\nbar		\nbaz`);
	t.is(spaceIndented`
        foo
        ${'bar'}        
        baz
    `, `foo\nbar        \nbaz`);
});
test('expression with same indentation does not get shortened', (t) => {
	t.is(tabIndented`
		foo
		${'bar\n		baz'}
	`, `foo\nbar\n		baz`);
	t.is(spaceIndented`
        foo
        ${'bar\n        baz'}
    `, `foo\nbar\n        baz`);
});
test('expressions only', (t) => {
	t.is(tabIndented`
		${'foo'}
		${'bar'}
		${'baz'}
	`, `foo\nbar\nbaz`);
	t.is(spaceIndented`
        ${'foo'}
        ${'bar'}
        ${'baz'}
    `, `foo\nbar\nbaz`);
});

//  ███████╗███████╗██████╗  ██████╗ 
//  ╚══███╔╝██╔════╝██╔══██╗██╔═══██╗
//    ███╔╝ █████╗  ██████╔╝██║   ██║
//   ███╔╝  ██╔══╝  ██╔══██╗██║   ██║
//  ███████╗███████╗██║  ██║╚██████╔╝
//  ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ 

// EMPTY
test('empty = empty', (t) => {
t.is(tabIndented``, ``);
t.is(spaceIndented``, ``);
});

//   ██████╗ ███╗   ██╗███████╗
//  ██╔═══██╗████╗  ██║██╔════╝
//  ██║   ██║██╔██╗ ██║█████╗  
//  ██║   ██║██║╚██╗██║██╔══╝  
//  ╚██████╔╝██║ ╚████║███████╗
//   ╚═════╝ ╚═╝  ╚═══╝╚══════╝

// NEW-LINE
test('new-line = empty', (t) => {
t.is(tabIndented`
`, ``);
t.is(spaceIndented`
`, ``);
});

// INDENT
test('indent = indent', (t) => {
t.is(tabIndented`	`, `	`);
t.is(spaceIndented` `, ` `);
});

// TEXT
test('text = text', (t) => {
t.is(tabIndented`foo`, `foo`);
t.is(spaceIndented`foo`, `foo`);
});

//  ████████╗██╗    ██╗ ██████╗ 
//  ╚══██╔══╝██║    ██║██╔═══██╗
//     ██║   ██║ █╗ ██║██║   ██║
//     ██║   ██║███╗██║██║   ██║
//     ██║   ╚███╔███╔╝╚██████╔╝
//     ╚═╝    ╚══╝╚══╝  ╚═════╝ 

// NEW-LINE & NEW-LINE
test('new-line, new-line = empty', (t) => {
t.is(tabIndented`

`, ``);
t.is(spaceIndented`

`, ``);
});

// NEW-LINE & INDENT
test('new-line, indent = empty', (t) => {
t.is(tabIndented`
	`, ``);
t.is(spaceIndented`
 `, ``);
});
test('indent, new-line = indent', (t) => {
t.is(tabIndented`	
`, `	`);
t.is(spaceIndented` 
`, ` `);
});

// NEW-LINE & TEXT
test('new-line, text = text', (t) => {
t.is(tabIndented`
foo`, `foo`);
t.is(spaceIndented`
foo`, `foo`);
});
test('text, new-line = text', (t) => {
t.is(tabIndented`foo
`, `foo`);
t.is(spaceIndented`foo
`, `foo`);
});

// INDENT & INDENT ✓ ~ INDENT

// INDENT & TEXT
test('indent, text = text', (t) => {
t.is(tabIndented`	foo`, `	foo`);
t.is(spaceIndented` foo`, ` foo`);
});
test('text, indent = text, indent', (t) => {
t.is(tabIndented`foo	`, `foo	`);
t.is(spaceIndented`foo `, `foo `);
});

// TEXT & TEXT ✓ ~ TEXT

//  ████████╗██╗  ██╗██████╗ ███████╗███████╗
//  ╚══██╔══╝██║  ██║██╔══██╗██╔════╝██╔════╝
//     ██║   ███████║██████╔╝█████╗  █████╗  
//     ██║   ██╔══██║██╔══██╗██╔══╝  ██╔══╝  
//     ██║   ██║  ██║██║  ██║███████╗███████╗
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝

// NEW-LINE & NEW-LINE & NEW-LINE
test('new-line, new-line, new-line = new-line', (t) => {
t.is(tabIndented`


`, `\n`);
t.is(spaceIndented`


`, `\n`);
});

// NEW-LINE & NEW-LINE & INDENT
test('new-line, new-line, indent = empty', (t) => {
t.is(tabIndented`

	`, ``);
t.is(spaceIndented`

 `, ``);
});
test('new-line, indent, new-line = empty', (t) => {
t.is(tabIndented`
	
`, ``);
t.is(spaceIndented`
 
`, ``);
});
test('indent, new-line, new-line = indent, new-line', (t) => {
t.is(tabIndented`	

`, `	\n`);
t.is(spaceIndented` 

`, ` \n`);
});

// NEW-LINE & NEW-LINE & TEXT ?
test('new-line, new-line, text = new-line, text', (t) => {
t.is(tabIndented`

foo`, `\nfoo`);
t.is(spaceIndented`

foo`, `\nfoo`);
});
test('new-line, text, new-line = text', (t) => {
t.is(tabIndented`
foo
`, `foo`);
t.is(spaceIndented`
foo
`, `foo`);
});
test('text, new-line, new-line = text, new-line', (t) => {
t.is(tabIndented`foo

`, `foo\n`);
t.is(spaceIndented`foo

`, `foo\n`);
});


// NEW-LINE & INDENT & INDENT
test('new-line, indent, indent = empty', (t) => {
t.is(tabIndented`
		`, ``);
t.is(spaceIndented`
  `, ``);
});
test('indent, new-line, indent = indent', (t) => {
t.is(tabIndented`	
	`, `	`);
t.is(spaceIndented` 
 `, ` `);
});
test('indent, indent, new-line = indent, indent', (t) => {
t.is(tabIndented`		
`, `		`);
t.is(spaceIndented`  
`, `  `);
});

// NEW-LINE & INDENT & TEXT ?
test('new-line, indent, text = indent, text', (t) => {
t.is(tabIndented`
	foo`, `foo`);
t.is(spaceIndented`
 foo`, `foo`);
});
test('new-line, text, indent = text, indent', (t) => {
t.is(tabIndented`
foo	`, `foo	`);
t.is(spaceIndented`
foo `, `foo `);
});
test('indent, new-line, text = indent, new-line, text', (t) => {
t.is(tabIndented`	
foo`, `	\nfoo`);
t.is(spaceIndented` 
foo`, ` \nfoo`);
});
test('indent, text, new-line = indent, text', (t) => {
t.is(tabIndented`	foo
`, `	foo`);
t.is(spaceIndented` foo
`, ` foo`);
});
test('text, new-line, indent = text', (t) => {
t.is(tabIndented`foo
	`, `foo`);
t.is(spaceIndented`foo
 `, `foo`);
});
test('text, indent, new-line = text, indent', (t) => {
t.is(tabIndented`foo	
`, `foo	`);
t.is(spaceIndented`foo 
`, `foo `);
});

// NEW-LINE & TEXT & TEXT ✓ ~ NEW-LINE & TEXT

// INDENT & INDENT & INDENT ✓ ~ INDENT

// INDENT & INDENT & TEXT
test('indent, indent, text = indent, indent, text', (t) => {
t.is(tabIndented`		foo`, `		foo`);
t.is(spaceIndented`  foo`, `  foo`);
});
test('indent, text, indent = indent, text, indent', (t) => {
t.is(tabIndented`	foo	`, `	foo	`);
t.is(spaceIndented` foo `, ` foo `);
});
test('text, indent, indent = text, indent, indent', (t) => {
t.is(tabIndented`foo		`, `foo		`);
t.is(spaceIndented`foo  `, `foo  `);
});

// INDENT & TEXT & TEXT ✓ ~ INDENT & TEXT

// TEXT & TEXT & TEXT  ✓ ~ TEXT
