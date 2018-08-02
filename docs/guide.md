---
title: Guide
sidebar: auto
---


## Installation

### Using a CDN

Include the following dependencies:

```html
<link src="https://unpkg.com/splitting/splitting.css" /> <!-- Recommended styles for text effects -->
<link src="https://unpkg.com/splitting/splitting-cells.css" /> <!-- Recommended styles for grid based effects -->
<script src="https://unpkg.com/shshaw/dist/splitting.min.js"></script>
```

On document load/ready or in a script at the bottom the of the `<body>`, do the following:

```js
Splitting();
```

### Using NPM

Install Splitting from NPM:

```bash
npm i splitting -S
```

Import Splitting from the package and call it. The CSS imports may vary depending on your bundler.

```js
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from "splitting";

Splitting({
  /* options */
});
```

## Basic Usage

The premise of Splitting is dividing an element into a series of `<span>`s populated with CSS variables to handle.

Splitting can be called without any parameters to automatically split all elements with `data-splitting` attributes by the default of [`chars`](#chars).

### Example

| Initial HTML | JavaScript | Result |
| - | - | - |
| ``` <div data-splitting>ABC</div> ``` | ``` Splitting(); ``` | ``` <div data-splitting class="words chars splitting" style="--word-total:1; --char-total:3;"><span class="word" data-word="ABC" style="--word-index:0;"><span class="char" data-char="A" style="--char-index:0;">A</span><span class="char" data-char="B" style="--char-index:1;">B</span><span class="char" data-char="C" style="--char-index:2;">C</span></span></div> ``` |

The aftermath may seem a bit verbose, but this won't be visible to the end user. They'll still just see "ABC", but now you can

### `[data-splitting]` Attribute

Fill the `data-splitting` attribute with [specific plugin names](#plugins) to split the element with that plugin when you call `Splitting()`.
```html
<h1 data-splitting>Split by default chars!</h1>
<p data-splitting="words">Split by words.</p>
```
```js
Splitting();
```

### Options

`Splitting()` takes a single parameter as an [`options` object](#splitting). The default options are shown below, and some plugins offer [expanded options](#splitting).

```
Splitting({
  target: '[data-splitting]', /* String selector, single Element, Array of Elements, or NodeList */
  by: 'chars', /* String of the plugin name */
  key: null /* String to prefix the CSS variables by */
})
```


## Plugins

Plugins are the heart of Splitting, each performing a specific split on the targeted element(s). Some plugins have dependencies that will automatically run when called. For example `chars` will automatically split by `words` to prevent issues with text wrapping.

Each plugin should [return a property matching the plugin name](#returns) containing the split elements. Some plugins have [additional options](#splitting) you can pass directly in the main options object for specific uses.




### chars

*Dependency: `words`*

The `chars` plugin splits an element into separate characters. Before it can run, it splits each word into a separate element. This is the default plugin if a plugin name is not specified in the `by` options.

Passing `whitespace: true` causes the space between words to be counted toward the character index, though whitespace is collapsed while splitting so that there won't be more than one space character between words.


### words

The `words` plugin splits an element into separate words.

*Usage*

```html
<div id="target">Splitting Text</div>

<script>
const target = document.querySelector('#target');
const results = Splitting({ target: target, by: 'words' });

target // <div id="target" class="splitting words" style="--word-total: 2">...</div>
results[0].words[0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span>
results[0].words[1] // <span class="word" data-word="Text" style="--word-index: 1">...</span>
</script>
```

### lines


The `lines` plugin splits an element into separate words and then groups them by the line. It automatically runs the `words` plugin.

*Usage*

```html
<div id="target">Splitting Text</div>

<script>
const target = document.querySelector('#target');
const results = Splitting({ target: target, by: 'lines' });

target // <div id="target" class="splitting lines" style="--line-total: 1; --word-total: 2">...</div>
results[0].words[0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span>
results[0].words[1] // <span class="word" data-word="Text" style="--word-index: 1">...</span>

results[0].lines[0] // [ <span>Splitting</span>, <span>Text</span> ]
</script>
```

### items

The `items` plugin indexes existing elements. It applies an `--item-index` to each matching element and `--item-total` to the target. If `matching` is not specified, the direct element children will be selected.

*Usage*

```html
<div class="container">
  <ul>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ul>
</div>

<script>
const results = Splitting({
  target: '.container',
  by: 'items',
  matching: 'li'
});

results[0].items[0] // <li style="--item-index: 0">One</li>
results[0].items[1] // <li style="--item-index: 1">Two</li>
results[0].items[2] // <li style="--item-index: 2">Three</li>
</script>
```

### grid

The `grid` plugin detects the cols and rows of a layout by comparing the distance from the edges of the container. Plainly speaking, it assigns each selected element a row and column index. It automatically runs the `rows` and `cols` plugins.

*Usage*

```html
<div class="container">
  <div>
    <div class="col" id="1"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
  <div>
    <div class="col" id="2"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
</div>

<script>
const results = Splitting({
  target: '.container',
  by: 'grid',
  matching: '.col'
});

results[0].rows[0][0] // <div id="1" style="--row-index: 0; --col-index: 0">...</div>
results[0].rows[0][1] // <div style="--row-index: 0; --col-index: 1">...</div>
results[0].rows[0][2] // <div style="--row-index: 0; --col-index: 2">...</div>

results[0].rows[1][1] // <div id="2" style="--row-index: 1; --col-index: 0">...</div>
results[0].rows[1][2] // <div style="--row-index: 1; --col-index: 1">...</div>
results[0].rows[1][3] // <div style="--row-index: 1; --col-index: 2">...</div>

results[0].cols[0][0] // <div id="1" style="--row-index: 0; --col-index: 0">...</div>
results[0].cols[1][0] // <div style="--row-index: 0; --col-index: 1">...</div>
results[0].cols[2][0] // <div style="--row-index: 0; --col-index: 2">...</div>

results[0].cols[0][1] // <div id="2" style="--row-index: 1; --col-index: 0">...</div>
results[0].cols[1][1] // <div style="--row-index: 1; --col-index: 1">...</div>
results[0].cols[2][1] // <div style="--row-index: 1; --col-index: 2">...</div>
</script>
```

### cols

The `cols` plugin detects the cols of a layout by comparing the distance from the left of the container.

*Usage*

```html
<div class="container">
  <div>
    <div class="col" id="1"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
  <div>
    <div class="col" id="2"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
</div>

<script>
const results = Splitting({
  target: '.container',
  by: 'cols',
  matching: '.col'
});

results[0].cols[0][0] // <div id="1" style="--row-index: 0; --col-index: 0">...</div>
results[0].cols[1][0] // <div style="--row-index: 0; --col-index: 1">...</div>
results[0].cols[2][0] // <div style="--row-index: 0; --col-index: 2">...</div>

results[0].cols[0][1] // <div id="2" style="--row-index: 1; --col-index: 0">...</div>
results[0].cols[1][1] // <div style="--row-index: 1; --col-index: 1">...</div>
results[0].cols[2][1] // <div style="--row-index: 1; --col-index: 2">...</div>
</script>
```


### rows

The `rows` plugin detects the cols of a layout by comparing the distance from the top of the container.

*Usage*

```html
<div class="container">
  <div>
    <div class="col" id="1"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
  <div>
    <div class="col" id="2"></div>
    <div class="col"></div>
    <div class="col"></div>
  </div>
</div>

<script>
const results = Splitting({
  target: '.container',
  by: 'rows',
  matching: '.col'
});

results[0].rows[0][0] // <div id="1" style="--row-index: 0; --col-index: 0">...</div>
results[0].rows[0][1] // <div style="--row-index: 0; --col-index: 1">...</div>
results[0].rows[0][2] // <div style="--row-index: 0; --col-index: 2">...</div>

results[0].rows[1][1] // <div id="2" style="--row-index: 1; --col-index: 0">...</div>
results[0].rows[1][2] // <div style="--row-index: 1; --col-index: 1">...</div>
results[0].rows[1][3] // <div style="--row-index: 1; --col-index: 2">...</div>
</script>
```


### cells

> Cells requires an additional .css file to properly split images. Please include /dist/splitting-cells.css in your page to use this feature.

The `cells` plugin splits an element into number of rows and columns and is capable with `image: true` of appearing to split images through simple CSS.

*Usage*

```html
<div class="image">
  <img src="http://unsplash.it/200/200?random" />
</div>

<script>
const results = Splitting({
  target: '.image',
  by: 'cells',
  image: true,
  cols: 3,
  rows: 2
});

result[0].cells[0] // <span class="cell" style="--cell-index: 0; --row-index: 0; --col-index: 0"></span>
result[0].cells[1] // <span class="cell" style="--cell-index: 1; --row-index: 0; --col-index: 1"></span>
result[0].cells[2] // <span class="cell" style="--cell-index: 2; --row-index: 0; --col-index: 2"></span>
result[0].cells[3] // <span class="cell" style="--cell-index: 3; --row-index: 1; --col-index: 0"></span>
result[0].cells[4] // <span class="cell" style="--cell-index: 4; --row-index: 1; --col-index: 1"></span>
result[0].cells[5] // <span class="cell" style="--cell-index: 5; --row-index: 1; --col-index: 2"></span>
</script>
```

## API

### Splitting()

#### Options

| Options | Description |
| :------ | :---------  |
| target | An optional list of elements or a css selector. By default, this is `[data-splitting]` |
| by | The splitting plugin to use. See the plugin page for a full list. If not specified, the value of the data-splitting attribute will be use. If that is not present, the `chars` plugin will be used. |
| key | An optional key used as a prefix on on CSS Variables. For instance when a key of `hero` is used with the `chars` plugin, it will changethe CSS variable `--char-index` to `--hero-char-index`. This should be used if multiple splits have been performed on the same element, or to resolve conflicts with other libraries.  |

#### Plugin-specific Options

| Options | Description |
| :------ | :---------  |
| matching | Used by the following plugins to select children to index:  `items`, `grid`, `cols`, `rows`, `cellRows`, `cellCols`, and `cells`. If not specified, the immediate child elements will be selected. |
| cols | The number of columns to create or detect. This is used by the following plugins: `cols`, `cellCols`, `grid`, and `cells` |
| rows | The number of rows to create or detect. This is used by the following plugins: `rows`, `cellRows`, `grid`, and `cells` |
| whitespace | If true, the `chars` plugin will count whitespace while indexing characters. |

#### Returns

The `Splitting` fucntion always returns an array of objects with the following properties based on plugin name, giving you access to each element's splits to use with JavaScript animation libraries or for additional processing.

```html
<div data-splitting>Splitting Text</div>

<script>
const results = Splitting();
results[0].el // <div data-splitting  class="splitting chars words" style="--word-total: 2; --char-total: 13">...</div>
results[0].words[0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span>
results[0].words[1] // <span class="word" data-word="Text" style="--word-index: 1">...</span>

results[0].chars[0] // <span class="char" data-char="S" style="--char-index: 0">S</span>
results[0].chars[1] // <span class="char" data-char="p" style="--char-index: 1">p</span>
</script>
```


| Property | Type     | Description |
| :- | :- | :- |
| `chars` | `HTMLElement[]` | An array of all characters created by the `chars` plugin |
| `words` | `HTMLElement[]` | An array of all words created by the `words` and `lines` plugin |
| `lines` | `HTMLElement[][]` | An array of element arrays by the line, returned by the `lines` plugin |
| `items` | `HTMLElement[]` | An array of elements returned by the `items` plugin. |
| `rows` | `HTMLElement[][]` | An array of element arrays by row, returned by the `rows` and `grid` plugin |
| `cols` | `HTMLElement[][]` | An array of element arrays by column, returned by the `cols` and `grid` plugin |
| `cells` | `HTMLElement[]` | An array of cells created by `cells`, `cellRows`, or `cellCols` plugin |
| `cellRows` | `HTMLElement[][]` | An array of element arrays by the row, returned by the `cellRows` and `cells` plugin |
| `cellCols` | `HTMLElement[][]` | An array of element arrays by the column, returned by the `cellCols` and `cells` plugin |

### Splitting.html()

The `Splitting.html()` function takes the same options as `Spitting()` but has a required property of `content`. The `content` property should be an html string to be used as the splitting target. The `Splitting.html()` function returns a string of the rendered HTML instead of returning a result object. This function is intended to be used inside of JS Framework DSL's such as the Vue templating language:

```html
<div v-html="Splitting.html({ content: myContentString, by: 'chars' })"></div>
```

### Splitting.add()

| Options | Description |
| :------ | :---------  |
| `by` | The name of the plugin. It must be unique. |
| `key` | The prefix to set when adding index/total css custom properties to the elements. |
| `split` | The function to call when this plugin is used. The return value is set in the result of `Splitting()` as the same name as the `by` in the plugin. |
| `depends` | The plugins that must run prior to this plugin. |

### Splitting Classes

| ClassName | Description |
| :---------| :---------- |
| `spitting` | Applied to the element targeted by the split operation. The plugin name is also applied as a classname. |
| `char` | Applied by the `chars` plugin on new char elements |
| `word` | Applied by the `words`, `lines`, and `chars` plugin on new word elements |
| `cell` | Applied by the `cellRows`, `cellCols`, and `cells` plugin on new cell elements |

