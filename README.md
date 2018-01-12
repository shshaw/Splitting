# Splitting

_CSS Vars for split words and chars!_

Splitting is a JavaScript microlibrary (1.2kb min, 0.6kb gzipped) to split a DOM element's words and characters into elements. The word and character elements are populated with CSS vars to assist with transitions and animations that were previously not feasible with CSS.

---

## Installation

Add Splitting to a projects with [npm](https://npmjs.org):

```
npm install -s splitting
```

for easy embedding on platforms like [Codepen](https://codepen.io), use [unpkg](https://unpkg.com)

```html
<script src="https://unpkg.com/splitting/index.js"></script>
```

---

## Methods

All methods can accept a selector, element, or a NodeList/Array of elements. The parent/targetted element will receive a `splitting` class.

* [Splitting.words](#splittingwords)
* [Splitting.chars](#splittingchars)
* [Splitting.children](#splittingchildren)

---

# Splitting.words

Divide an element's `innerText` into words.

Parent element receives a `--total-words` CSS var containing the total number of words. Each word is wrapped in an `<span>` element with a `--word-index` containing the word's position, and a `data-word` attribute containing the actual word.

### Example

```js
Splitting.words("[data-splitting-words]");
```

_Input:_

```html
<h1 data-splitting-words>Splitting words!</h1>
```

_Output:_

```html
<h1 class="splitting" data-splitting-chars style="--total-words:1;">
  <span class="word" data-word="Splitting" style="--word-index:0;">Splitting</i>
  <span class="word" data-word="words!" style="--word-index:1;">words!</i>
</h1>
```

---

# Splitting.chars

Divide an element's `innerText` into words and characters. `Splitting.words` is called on the element first to prevent characters from wrapping to the next line unnecessarily, then each word is divided into characters.

Parent element receives a `--total-char` CSS var containing the total number of characters. Each character is wrapped in an `<span>` element with a `--char-index` containing the characters's position, and a `data-char` attribute containing the actual character.

### Example

```js
Splitting.chars("[data-splitting-chars]");
```

_Input:_

```html
<h1 data-splitting-chars>SPLITTING!</h1>
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

# Splitting.children

Apply CSS var indexes to an element's children.

### Example

```js
Splitting.children(".list", ".list-item", "item");
```

_Input:_

```html
<ul class="list">
  <li class="list-item">1</li>
  <li class="list-item">2</li>
  <li class="list-item">3</li>
</ul>
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

### Recommended Styles

Many CSS properties, like `transform`, will not work by default on `display: inline` elements like `<span>`, so applying `display: inline-block` give you the most flexibility in transitions and animations while keeping your words and character layout mostly the same.

```css
.splitting .word,
.splitting .char {
  display: inline-block;
}
```

### Pseudo Elements

You may have noticed that `Splitting.words` and `Splitting.chars` apply `data-word` and `data-char` attributes, respectively.

This allows for great flexibility in your CSS by using Psuedo elements with `content: attr(data-char)`.

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
  display: none;
  transition: inherit;
  user-select: none;
}
```
