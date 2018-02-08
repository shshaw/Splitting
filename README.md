# Splitting

### _CSS Vars for split words and chars!_

Splitting is a JavaScript microlibrary (1.4kb min, 0.7kb gzipped) to split a DOM element's words and characters into `<span>`s with CSS variables, unlocking transitions and animations that were previously not feasible with CSS.

---

## Installation

Add Splitting to a projects with [npm](https://npmjs.org):

```
npm install -s splitting
```

For easy embedding on platforms like [Codepen](https://codepen.io), use [unpkg](https://unpkg.com)

```html
<script src="https://unpkg.com/splitting/splitting.js"></script>
```

Be sure to include `splitting.css` for some helpful defaults to make building effects easier.

---

## Methods

All methods can accept a selector, element, or a NodeList/Array of elements. The parent/targetted element will receive a `splitting` class.

* [Splitting.words()](#splittingwords)
* [Splitting.chars()](#splittingchars)
* [Splitting.fromString()](#splittingfromstring)
* [Splitting.children()](#splittingchildren)

---

# Splitting.words(el)

Divide an element's contents into words.

Parent element receives a `--total-words` CSS var containing the total number of words. Each word is wrapped in an `<span>` element with a `--word-index` containing the word's position, and a `data-word` attribute containing the actual word.

### Example

_Input:_

```html
<h1 data-splitting-words>Splitting words!</h1>
```

```js
Splitting.words("[data-splitting-words]");
```

_Output:_

```html
<h1 class="splitting" data-splitting-chars style="--total-words:1;">
  <span class="word" data-word="Splitting" style="--word-index:0;">Splitting</i>
  <span class="word" data-word="words!" style="--word-index:1;">words!</i>
</h1>
```

---

# Splitting.chars(el)

Divide an element's contents into words and characters. `Splitting.words` is called on the element first to prevent characters from wrapping to the next line unnecessarily, then each word is divided into characters.

Parent element receives a `--total-char` CSS var containing the total number of characters. Each character is wrapped in an `<span>` element with a `--char-index` containing the characters's position, and a `data-char` attribute containing the actual character.

### Example

_Input:_

```html
<h1 data-splitting-chars>SPLITTING!</h1>
```

```js
Splitting.chars("[data-splitting-chars]");
```

_Output:_

```html
<h1 class="splitting" data-splitting-chars style="--total-words:1; --total-chars:9;">
  <span class="word" data-word="SPLITTING!" style="--word-index:0;">
    <span class="char" data-char="S" style="--char-index:0;">S</i>
    <span class="char" data-char="P" style="--char-index:1;">P</i>
    <span class="char" data-char="L" style="--char-index:2;">L</i>
    <span class="char" data-char="I" style="--char-index:3;">I</i>
    <span class="char" data-char="T" style="--char-index:4;">T</i>
    <span class="char" data-char="T" style="--char-index:5;">T</i>
    <span class="char" data-char="I" style="--char-index:6;">I</i>
    <span class="char" data-char="N" style="--char-index:7;">N</i>
    <span class="char" data-char="G" style="--char-index:8;">G</i>
    <span class="char" data-char="G" style="--char-index:8;">!</i>
  </i>
</h1>
```

---

# Splitting.lines(el)

Splits an element by words, if not already done so, and adds an extra `--line-index` variable to each `.word`. The parent element also gets a `--line-total` var.

_Does not update automatically on resize._ You'll need to attach your own event listeners _with debouncing_ for when the element's line width may have changed. Simply call `Splitting.lines` again on the element and the indexes will be updated.

### Example

```js
Splitting.lines("p[data-splitting]");
```

---

# Splitting.fromString(str, opts)

Split a string and receive back the HTML as a string for splitting before hitting the DOM. Useful for frameworks like Vue where you may be splitting a dynamic value.

### Options

Provide an Object as the second parameter to change the options:

```js
Splitting.fromString("", {
  type: "chars", // Change to "words" to split only words
  element: false // Change to true to receive an Element back instead of a String.
});
```

### Example

_Input_

```html
<h1 class="heading">I'm not split.</h1>
```

```js
var heading = document.querySelector(".heading");
heading.innerHTML = Splitting.fromString("I am split");
```

_Output_

```html
<h1 class="heading">
  <span class=" splitting" style="--word-total:3; --char-total:8;">
    <span class="word" data-word="I" style="--word-index:0;">
      <span class="char" data-char="I" style="--char-index:0;">I</span>
    </span>
    <span class="word" data-word="am" style="--word-index:1;">
      <span class="char" data-char="a" style="--char-index:1;">a</span>
      <span class="char" data-char="m" style="--char-index:2;">m</span>
    </span>
    <span class="word" data-word="split" style="--word-index:2;">
      <span class="char" data-char="s" style="--char-index:3;">s</span>
      <span class="char" data-char="p" style="--char-index:4;">p</span>
      <span class="char" data-char="l" style="--char-index:5;">l</span>
      <span class="char" data-char="i" style="--char-index:6;">i</span>
      <span class="char" data-char="t" style="--char-index:7;">t</span>
    </span>
  </span>
</h1>
```

---

# Splitting.children(el)

Apply CSS var indexes to an element's children.

### Example

_Input:_

```html
<ul class="list">
  <li class="list-item">1</li>
  <li class="list-item">2</li>
  <li class="list-item">3</li>
</ul>
```

```js
Splitting.children(".list", ".list-item", "item");
```

_Output:_

```html
<ul class="list" style="--total-items:3;">
  <li class="list-item" style="--item-index:0;">1</li>
  <li class="list-item" style="--item-index:1;">2</li>
  <li class="list-item" style="--item-index:2;">3</li>
</ul>
```

---

## Styles

The included `splitting.css` file contains all the recommended styles and easy setup for more complex CSS vars. You can include that entire stylesheet or copy what you need. Some of the styles are broken out and explained below.

### Recommended Styles

Many CSS properties, like `transform`, will not work by default on `display: inline` elements like `<span>`, so applying `display: inline-block` give you the most flexibility in transitions and animations while keeping your words and character layout mostly the same.

```css
.splitting .word,
.splitting .char {
  display: inline-block;
}
```

### Pseudo Elements

You may have noticed that `Splitting.words` and `Splitting.chars` apply `data-word` and `data-char` attributes, respectively. This allows for great flexibility in your CSS by using Psuedo elements with `content: attr(data-char)`.

```css
.splitting .char {
  position: relative;
}

/* Populate the psuedo elements with the character to allow for expanded effects */
.splitting .char:before,
.splitting .char:after {
  content: attr(data-char);
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  transition: inherit;
  user-select: none;
}
```
