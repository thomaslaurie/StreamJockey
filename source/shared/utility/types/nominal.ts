//G Name the symbol variable similar (lowercase, etc.) to the nominal type as sometimes it will be the only identifying part of the type that is displayed.

/* //L Inspired by:
	Rulr https://github.com/ryansmith94/rulr
	ts-brand https://github.com/kourge/ts-brand
	Simply Typed https://github.com/andnp/SimplyTyped/blob/master/src/types/utils.ts#L30-L41
	Michal Zalecki https://michalzalecki.com/nominal-typing-in-typescript
*/

/* //R Implementation Justifications
	Must use symbols in come capacity to avoid global naming collisions.

	Must use typeof Symbol() and 'S extends Symbol' to pass in Symbol value. This makes it act almost like a string or number 'literal type'. But currently there are no literal types for symbols and the 'unique symbol' is not applicable in this case.

	Different from both Rulr and ts-brand as this implementation also use the symbol for the property key which ensures that keys never overlap. This was necessary because nested nominal types would reduce to 'never' because the keys are the same but the values are different, which Typescript rightfully interprets as impossible.

	Using the Record utility type to allow for symbol indexing.

	Does not need to be readonly, because typeof Symbol() cannot be assigned to anything other than that specific symbol.
*/


export type Nominal<T, S extends symbol> = T & Record<S, S>;


// Manual Type Tests

const foo = Symbol();
type Foo = Nominal<number, typeof foo>;
const bar = Symbol();
type Bar = Nominal<number, typeof bar>;

let a = 1 as Foo;
a = 2 as Bar; // Should error 'Type 'Bar' is not assignable to type 'Foo'.'

type Baz = Foo & Bar; // Type should be 'number & Record<typeof foo, typeof foo> & Record<typeof bar, typeof bar>'.
