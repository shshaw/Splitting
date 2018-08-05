---
title: Guide
sidebar: auto
---

## What is Splitting?

Splitting is a collection of small [plugins](#plugins) designed to split (section off) an element in a variety of ways, such as [words](#words), [characters](#chars), [child nodes](#items), and [more](#plugins)!

Most plugins utilize a series of `<span>`s populated with CSS variables and data attributes that empower you to build all kinds of animations, transitions and interactions.

The general flow is:

1.  `Splitting()` is called on a `target` (see: [Basic Usage](#basic-usage))
1.  Create `<span>`s to inject into `target`, or querying children of `target`
1.  Index with CSS variables ( `<span class="word" style="--item-index: 0">` )
1.  Add the total to the target ( `<div data-splitting style="--word-total: 3">` )
1.  Return an array of the splits (see: [Returns](#returns))

## Installation

### CodePen Template

Why bother with build systems or files? Make your own Splitting demo on [CodePen](https://codepen.io) using this template with all of the essentials included!

<form action="https://codepen.io/pen/define" method="POST" target="_blank">
  <input type="hidden" name="data" value='{"title": "Splitting Demo", "description": "_Built with [Splitting](https://splitting.js.org)_", "tags": ["splitting"], "html": "<div data-splitting>Hello World!</div>", "css": "/* Clear out these styles to start fresh or use this as a base! */\n\n@import url(https://fonts.googleapis.com/css?family=Kanit:600);\n\nhtml { height: 100%; display: flex; }\nbody { margin: auto; }\nhtml, body {\n  background: #00043C;\n  color: #FFF;\n  font: normal 600 10vw/1.5 Kanit, sans-serif;\n}\n\n.splitting .char {\n  animation: slide-in 1s cubic-bezier(.5, 0, .5, 1) both;\n  animation-delay: calc(60ms * var(--char-index));\n}\n\n@keyframes slide-in {\n  from {\n    transform: translateY(-1em) rotate(-.5turn) scale(0.5);\n    opacity: 0;\n  }\n}", "css_external": "https://unpkg.com/splitting@next/dist/splitting.css;https://unpkg.com/splitting@next/dist/splitting-cells.css", "js": "Splitting();", "js_external": "https://unpkg.com/splitting@next/dist/splitting.min.js" }'>
  <input type="submit" class="action-button" value="Open Template on CodePen →">
</form>

### Using NPM

Install Splitting from NPM:

```bash
npm install splitting --save
```

Import Splitting from the package and call it. The CSS imports may vary depending on your bundler.

```js
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

Splitting();
```

### Using a CDN

_CDN use is only recommended for demos / experiments on platforms like [CodePen](https://codepen.io). For production use, bundle Splitting using the [NPM package](#using-npm) with Webpack or your preferred code bundler._

You can get the latest version of Splitting off of the [unpkg CDN](https://unpkg.com) and include the necessary files as follows.

```html
<link rel="stylesheet" src="https://unpkg.com/splitting/dist/splitting.css" />
<link rel="stylesheet" src="https://unpkg.com/splitting/dist/splitting-cells.css" />
<script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
```

Then call Splitting on document load/ready or in a script at the bottom the of the `<body>`.

```js
<script> Splitting(); </script>
```

### Recommended Styles

Included in the package are two small stylesheets of recommended CSS that will make text and grid based effects much easier. These styles are non-essential, but provide a lot of value.

- `splitting.css` includes many extra CSS Variables and psuedo elements that help power advanced animations, especially for text.
- `splitting-cells.css` contain the basic setup styles for cell/grid based effects you'd otherwise need to implement yourself.

### Browser Support

Splitting should be thought of as a progressive enhancer. The basic functions work in any halfway decent browser (IE11+). Browsers that support CSS Variables ( [~85% of the current browser market share](https://caniuse.com/#feat=css-variables) ) will have the best experience. Browsers without CSS Variable support can still have a nice experience with at least some animation, but features like index-based staggering may not be feasible without JavaScript.

The styles in `splitting-cells.css` for the [`cells` plugin](#cells) rely on `display: grid`, so there may be additional browser limitations. In general, [all browsers that support CSS variables also support grid](https://caniuse.com/#feat=css-variables,css-grid) so you should be in the clear.

## Basic Usage

Splitting can be called without parameters, automatically splitting all elements with `data-splitting` attributes by the default of [`chars`](#chars) which wraps the element's text in `<span>`s with relevant CSS vars.

_Initial DOM_

```html
<div data-splitting>ABC</div>
<script> Splitting(); </script>
```

_DOM Output_

```html
<div data-splitting class="words chars splitting" style="--word-total:1; --char-total:3;"><span class="word" data-word="ABC" style="--word-index:0;"><span class="char" data-char="A" style="--char-index:0;">A</span><span class="char" data-char="B" style="--char-index:1;">B</span><span class="char" data-char="C" style="--char-index:2;">C</span></span></div>
```

The aftermath may seem verbose, but this won't be visible to the end user. They'll still just see "ABC", but now you can style, animate and transition all of those characters individually!

Splitting will automatically add a `splitting` class to the targetted element after it's been run. Each [plugin](#plugins) will add their own classes to splits/parent as needed ( `char` for `chars`, `word` for `words`, etc. ).

### `[data-splitting]` Attribute

Fill the `data-splitting` attribute with [specific plugin names](#plugins) to split the element with that plugin when you call `Splitting()`.

```html
<h1 data-splitting>Split by chars (default)</h1>
<p data-splitting="words">Split by words</p>
<ul data-splitting="items">
  <li>Split</li>
  <li>by</li>
  <li>children!</li>
</ul>
<script> Splitting(); </script>
```

### Options

`Splitting()` takes a single Object parameter for [options](#splitting). The default options are shown below, and some plugins offer [expanded options](#splitting).

```js
Splitting({
  /* target: String selector, Element, Array of Elements, or NodeList */
  target: "[data-splitting]",
  /* by: String of the plugin name */
  by: "chars",
  /* key: Optional String to prefix the CSS variables */
  key: null
});
```

## Plugins

Plugins are the heart of Splitting, each performing a specific split on the targeted element(s). Some plugins have dependencies that will automatically run when called. For example `chars` will automatically split by `words` to prevent issues with text wrapping.

Each plugin should [return a property matching the plugin name](#returns) containing the split elements. Some plugins have [additional options](#splitting) you can pass directly in the main options object for specific uses.

### words

The `words` plugin splits an element's text into separate words, wrapping each in a `<span>` populated with CSS variables and data attributes.

|                  |                                     |
| :--------------- | :---------------------------------- |
| **Dependencies** | None                                |
| **Classes**      | `.word` added to each word `<span>` |

_Usage_

```html
<div id="target">Splitting Text</div>

<script>
const target = document.querySelector('#target');
const results = Splitting({ target: target, by: 'words' });

// results[0].el = <div id="target" class="splitting words" style="--word-total: 2">...</div>
// results[0].words[0] = <span class="word" data-word="Splitting" style="--word-index: 0">...</span>
// results[0].words[1] = <span class="word" data-word="Text" style="--word-index: 1">...</span>
</script>
```

### chars

_Dependency: `words`_

The `chars` plugin splits an element's text into separate characters. Before it can run, it splits by [words](#words) to prevent issues with text wrapping. `chars` is the default plugin if no other plugin is specified.

Passing `whitespace: true` causes the space between words to be counted toward the character index, though whitespace is collapsed while splitting so that there won't be more than one space character between words.

### lines

_Dependency: `words`_

The `lines` plugin splits an element into separate words and then groups them by the line. It automatically runs the `words` plugin.

_Usage_

```html
<div id="target">Splitting<br /> Text</div>

<script>
const target = document.querySelector('#target');
const results = Splitting({ target: target, by: 'lines' });

results[0].el // <div id="target" class="splitting lines" style="--line-total: 1; --word-total: 2">...</div>
results[0].words[0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span>
results[0].words[1] // <span class="word" data-word="Text" style="--word-index: 1">...</span>

results[0].lines[0][0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span>
</script>
```

### items

The `items` plugin indexes existing elements. It applies an `--item-index` to each matching element and `--item-total` to the target. If `matching` is not specified, the direct element children will be selected.

_Usage_

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

_Dependency: `cols`, `rows`_

The `grid` plugin detects the cols and rows of a layout by comparing the distance from the edges of the container. Plainly speaking, it assigns each selected element a row and column index. It automatically runs the `rows` and `cols` plugins.

_Usage_

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

_Usage_

```html
<div class="container">
  <div>
    <div class="col" id="1"></div>
    <div class="col"></div>
  </div>
  <div>
    <div class="col" id="2"></div>
    <div class="col"></div>
  </div>
</div>

<script>
const results = Splitting({
  target: '.container',
  by: 'cols',
  matching: '.col'
});

results[0].cols[0][0] // <div id="1" style="--col-index: 0">...</div>
results[0].cols[1][0] // <div style="--col-index: 1">...</div>

results[0].cols[0][1] // <div id="2" style="--col-index: 0">...</div>
results[0].cols[1][1] // <div style=" --col-index: 1">...</div>
</script>
```

### rows

The `rows` plugin detects the rows of a layout by comparing the distance from the top of the container.

_Usage_

```html
<div class="container">
  <div>
    <div class="col" id="1"></div>
    <div class="col"></div>
  </div>
  <div>
    <div class="col" id="2"></div>
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
results[0].rows[0][1] // <div style="--row-index: 0;">...</div>

results[0].rows[1][1] // <div id="2" style="--row-index: 1; --col-index: 0">...</div>
results[0].rows[1][2] // <div style="--row-index: 1;">...</div>
</script>
```

### cells

> Cells requires an additional .css file to properly split images. Please include /dist/splitting-cells.css in your page to use this feature.

The `cells` plugin generates `<span>`s based on the number of rows and columns provided. This plugin is perfect for splitting an picture with the `image` option, which applies an image as a `background-image` to the `target`. Set a specific image with `image: 'http://url-to-image'` or use `image: true` detect the first `<img />` in the container for use.

_Usage_

```html
<div class="image">
  <img src="http://unsplash.it/200/200?random" />
</div>

<script>
const results = Splitting({
  target: '.image',
  by: 'cells',
  image: true,
  cols: 2,
  rows: 2
});

results[0].el // <div class="image splitting cells" style="background-image: url(http://unsplash.it/200/200?random); --cell-total: 4; --row-total: 2; --col-total: 2;">...</div>
results[0].cells[0] // <span class="cell" style="--cell-index: 0; --row-index: 0; --col-index: 0"></span>
results[0].cells[1] // <span class="cell" style="--cell-index: 1; --row-index: 0; --col-index: 1"></span>
results[0].cells[3] // <span class="cell" style="--cell-index: 2; --row-index: 1; --col-index: 0"></span>
results[0].cells[4] // <span class="cell" style="--cell-index: 3; --row-index: 1; --col-index: 1"></span>
</script>
```

## API

### `Splitting()`

#### Options

| Options  | Description                                                                                                                                                                                                                                                                                                                  |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target` | An optional list of elements or a css selector. By default, this is `[data-splitting]`                                                                                                                                                                                                                                       |
| `by`     | The splitting plugin to use. See the plugin page for a full list. If not specified, the value of the data-splitting attribute will be use. If that is not present, the `chars` plugin will be used.                                                                                                                          |
| `key`    | An optional key used as a prefix on on CSS Variables. For instance when a key of `hero` is used with the `chars` plugin, it will changethe CSS variable `--char-index` to `--hero-char-index`. This should be used if multiple splits have been performed on the same element, or to resolve conflicts with other libraries. |

#### Plugin-specific Options

| Options      | Description                                                                                                                                                                                       |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `matching`   | Used by the following plugins to select children to index: `items`, `grid`, `cols`, `rows`, `cellRows`, `cellCols`, and `cells`. If not specified, the immediate child elements will be selected. |
| `cols`       | The number of columns to create or detect. This is used by the following plugins: `cols`, `cellCols`, `grid`, and `cells`                                                                         |
| `rows`       | The number of rows to create or detect. This is used by the following plugins: `rows`, `cellRows`, `grid`, and `cells`                                                                            |
| `whitespace` | If true, the `chars` plugin will count whitespace while indexing characters.                                                                                                                      |

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

| Property   | Type              | Description                                                                             |
| :--------- | :---------------- | :-------------------------------------------------------------------------------------- |
| `chars`    | `HTMLElement[]`   | An array of all characters created by the `chars` plugin                                |
| `words`    | `HTMLElement[]`   | An array of all words created by the `words` and `lines` plugin                         |
| `lines`    | `HTMLElement[][]` | An array of element arrays by the line, returned by the `lines` plugin                  |
| `items`    | `HTMLElement[]`   | An array of elements returned by the `items` plugin.                                    |
| `rows`     | `HTMLElement[][]` | An array of element arrays by row, returned by the `rows` and `grid` plugin             |
| `cols`     | `HTMLElement[][]` | An array of element arrays by column, returned by the `cols` and `grid` plugin          |
| `cells`    | `HTMLElement[]`   | An array of cells created by `cells`, `cellRows`, or `cellCols` plugin                  |
| `cellRows` | `HTMLElement[][]` | An array of element arrays by the row, returned by the `cellRows` and `cells` plugin    |
| `cellCols` | `HTMLElement[][]` | An array of element arrays by the column, returned by the `cellCols` and `cells` plugin |

### `Splitting.html()`

The `Splitting.html()` function takes the same options as `Spitting()` but has a required property of `content`. The `content` property should be an html string to be used as the splitting target. The `Splitting.html()` function returns a string of the rendered HTML instead of returning a result object. This function is intended to be used inside of JS Framework DSL's such as the Vue templating language:

```html
<div v-html="Splitting.html({ content: myContentString, by: 'chars' })"></div>
```

### `Splitting.add()`

| Options   | Description                                                                                                                                       |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `by`      | The name of the plugin. It must be unique.                                                                                                        |
| `key`     | The prefix to set when adding index/total css custom properties to the elements.                                                                  |
| `split`   | The function to call when this plugin is used. The return value is set in the result of `Splitting()` as the same name as the `by` in the plugin. |
| `depends` | The plugins that must run prior to this plugin.                                                                                                   |
