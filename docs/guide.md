---
title: Guide
sidebar: auto
---

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
| ```chars``` | HTMLElement[] | An array of all characters created by the ```chars``` plugin |
| ```words``` | HTMLElement[] | An array of all words created by the ```words``` and ```lines``` plugin |
| ```lines``` | HTMLElement[][] | An array of element arrays by the line.  This is returned by the ```lines``` plugin |
| ```rows``` | HTMLElement[][] | An array of element arrays by row.  This is returned by the ```rows``` and ```grid``` plugin |
| ```cols``` | HTMLElement[][] | An array of element arrays by column.  This is returned by the ```cols``` and ```grid``` plugin |
| ```cells``` | HTMLElement[] | An array of cells created by ```cells```, ```cellRows```, or ```cellCols``` plugin |
| ```cellRows``` | HTMLElement[][] | An array of element arrays by the row.  This is returned by the ```cellRows``` and ```cells``` plugin |
| ```cellCols``` | HTMLElement[][] | An array of element arrays by the column.  This is returned by the ```cellCols``` and ```cells``` plugin |

### Splitting.html()

The ```Splitting.html()``` function takes the same options as ```Splitting``` but has a required property of ```content```.  The ```content``` property should be an html string to be used as the splitting target.  The ```Splitting.html()``` function returns a string of the rendered HTML instead of returning a result object.  This function is intended to be used inside of JS Framework DSL's such as the Vue templating language:

```html
<div v-html="Splitting.html({ content: myContentString, by: 'chars' })"></div>
```

### Splitting.add()

| Options | Description |
| :------ | :---------  |
| ```target``` | (TODO) |
| ```by``` | (TODO) |
| ```split``` | (TODO) |
| ```depends``` | (TODO) |

### Splitting Classes

| ClassName | Description |
| :---------| :---------- |
| ```splitting``` | Applied to the element targeted by the split operation.  The plugin name is also applied as a classname. |
| ```char``` | Applied by the ```chars``` plugin on new char elements |
| ```word``` | Applied by the ```words```, ```lines```, and ```chars``` plugin on new word elements |
| ```cell``` | Applied by the ```cellRows```, ```cellCols```, and ```cells``` plugin on new cell elements |
 
