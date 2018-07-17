---
title: Guide
sidebar: auto
---

## Plugins

Each plugin performs a different split on the targeted element.  Some plugins such as ```chars``` will automatically run additional plugins (```words```) in order to complete properly.  Each plugin should return a property matching the plugin name.  For instance:

```js
const result = Splitting({ by: 'chars' });
results.chars // an array of 'char' elements
results.words // an array of 'word' elements
```

### chars

The ```chars``` plugin splits an element into separate characters.  Before it can run, it splits each word into a separate element.  This is the default plugin if a plugin name is not specified in the ```by``` options.  Passing ```whitespace: true``` causes the spaces and tabs to be counted toward the character index.

*Usage*

```html
<div id="target">Splitting Text</div>

<script>
const target = document.querySelector('#target');
const result = Splitting({ target: target, by: 'chars' });

target // <div id="target" class="splitting chars words" style="--word-total: 2; --char-total: 13">...</div>
result.words[0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span> 
result.words[1] // <span class="word" data-word="Text" style="--word-index: 1">...</span> 

result.chars[0] // <span class="char" data-char="S" style="--char-index: 0">S</span>
result.chars[1] // <span class="char" data-char="p" style="--char-index: 1">p</span>
/* ... */
</script>
``` 

### words

The ```words``` plugin splits an element into separate words. 

*Usage*

```html
<div id="target">Splitting Text</div>

<script>
const target = document.querySelector('#target');
const result = Splitting({ target: target, by: 'words' });

target // <div id="target" class="splitting words" style="--word-total: 2">...</div>
result.words[0] // <span class="word" data-word="Splitting" style="--word-index: 0">...</span> 
result.words[1] // <span class="word" data-word="Text" style="--word-index: 1">...</span> 
</script>
``` 

### lines

// todo

### items

// todo

### grid

// todo

### cols

// todo

### rows

// todo

### cells

// todo

### cellCols

// todo

### cellRows

// todo

## API

### Splitting()

#### Options

| Options | Description |
| :------ | :---------  |
| target | An optional list of elements or a css selector. By default, this is `[data-splitting]` |
| by | The splitting plugin to use. See the plugin page for a full list.  If not specified, the value of the data-splitting attribute will be use. If that is not present, the ```chars``` plugin will be used. |
| key | An optional key used as a prefix on on CSS Variables. For instance when a key of ```hero``` is used with the ```chars``` plugin, it will changethe CSS variable ```--char-index``` to ```--hero-char-index```. This should be used if multiple splits have been performed on the same element, or to resolve conflicts with other libraries.   |
| matching | Used by the following plugins to select children to index:  ```items```, ```grid```, ```cols```, ```rows```, ```cellRows```, ```cellCols```, and ```cells```. If not specified, the immediate child elements will be selected. |
| cols | The number of columns to create or detect.  This is used by the following plugins: ```cols```, ```cellCols```, ```grid```, and ```cells``` |
| rows | The number of rows to create or detect.  This is used by the following plugins: ```rows```, ```cellRows```, ```grid```, and ```cells``` |
| whitespace | If true, the ```chars``` plugin will count whitespace while indexing characters. |

#### Returns

The ```Splitting``` function returns an object with the following properties based on the plugin name:

| Property | Type        | Description |
| :------ | :---------  | :---------  |
| ```chars``` | ```HTMLElement[]``` | An array of all characters created by the ```chars``` plugin |
| ```words``` | ```HTMLElement[]``` | An array of all words created by the ```words``` and ```lines``` plugin |
| ```lines``` | ```HTMLElement[][]``` | An array of element arrays by the line.  This is returned by the ```lines``` plugin |
| ```items``` | ```HTMLElement[]``` | An array of elements returned by the ```items``` plugin. |
| ```rows``` | ```HTMLElement[][]``` | An array of element arrays by row.  This is returned by the ```rows``` and ```grid``` plugin |
| ```cols``` | ```HTMLElement[][]``` | An array of element arrays by column.  This is returned by the ```cols``` and ```grid``` plugin |
| ```cells``` | ```HTMLElement[]``` | An array of cells created by ```cells```, ```cellRows```, or ```cellCols``` plugin |
| ```cellRows``` | ```HTMLElement[][]``` | An array of element arrays by the row.  This is returned by the ```cellRows``` and ```cells``` plugin |
| ```cellCols``` | ```HTMLElement[][]``` | An array of element arrays by the column.  This is returned by the ```cellCols``` and ```cells``` plugin |

### Splitting.html()

The ```Splitting.html()``` function takes the same options as ```Splitting``` but has a required property of ```content```.  The ```content``` property should be an html string to be used as the splitting target.  The ```Splitting.html()``` function returns a string of the rendered HTML instead of returning a result object.  This function is intended to be used inside of JS Framework DSL's such as the Vue templating language:

```html
<div v-html="Splitting.html({ content: myContentString, by: 'chars' })">
</div>
```

### Splitting.add()

| Options | Description |
| :------ | :---------  | 
| ```by``` | The name of the plugin.  It must be unique. |
| ```key``` | The prefix to set when adding index/total css custom properties to the elements. |
| ```split``` | The function to call when this plugin is used.  The return value is set in the result of ```Splitting()``` as the same name as the ```by``` in the plugin. |
| ```depends``` | The plugins that must run prior to this plugin. |

### Splitting Classes

| ClassName | Description |
| :---------| :---------- |
| ```splitting``` | Applied to the element targeted by the split operation.  The plugin name is also applied as a classname. |
| ```char``` | Applied by the ```chars``` plugin on new char elements |
| ```word``` | Applied by the ```words```, ```lines```, and ```chars``` plugin on new word elements |
| ```cell``` | Applied by the ```cellRows```, ```cellCols```, and ```cells``` plugin on new cell elements |
 
