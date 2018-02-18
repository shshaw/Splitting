- [ ] `Splitting.children`: Default `key`?
- [ ] `Splitting.$` support for `Splitting` arrays?

---

# Tests
All functions, unless otherwise specified should return an empty Array or Array of objects containing `{ el: `Element` }` and any relevant splits.

## `Splitting()`

- [x] No arguments
- [x] `Element`
- [x] `NodeList`
- [x] `".class"` class selector
- [x] `"[data-splitting]"` attribute selector


## `Splitting.words()`

- [ ] Empty `Element`
- [ ] `Element` with a single word
- [ ] `Element` with multiple words
- [ ] Nested empty `Element`s
- [ ] Nested `Element`s
- [ ] Multi-Level nested empty `Element`s
- [ ] Multi-Level nested `Element`s
- [ ] Retriggering on already split element


## `Splitting.chars()`

- [ ] _Relevant tests from `Splitting.words`_
- [ ] `Element` with a single char


## `Splitting.lines`

- [ ] _Relevant tests from `Splitting.words`_
- [ ] Retriggering `Splitting.lines`


## `Splitting.children`

- [ ] Empty `Element`
- [ ] `Element` with one element
- [ ] `Element` with multiple elements
- [ ] `Element` with nested elements
- [ ] No child selector
- [ ] No key


## `Splitting.fromString`
This method will return a String or `Element` instead of an Array.

- [ ] _Relevant tests from `Splitting.words`, adapted to Strings_
- [ ] Empty string
- [ ] `Splitting.fromString(..., { element: true })` returning an `Element`
- [ ] `Splitting.fromString(..., { type: 'words' })`
- [ ] `Splitting.fromString(..., { type: 'chars' })
- [ ] `Splitting.fromString(..., { type: 'children', args: ['.child-selector', 'key'] })`

