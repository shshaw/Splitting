---
title: Guide
sidebar: auto
---

## API

### Configuration

| Options | Description |
| :------ | :---------  |
| target | An optional list of elements or a css selector. By default, this is `[data-splitting]` |
| by | The splitting plugin to use. See the plugin page for a full list.  If not specified, the value of the data-splitting attribute will be use. If that is not present, the ```chars``` plugin will be used. |
| key | An optional key used as a prefix on on CSS Variables. For instance when a key of ```hero``` is used with the ```chars``` plugin, it will changethe CSS variable ```--char-index``` to ```--hero-char-index```. This should be used if multiple splits have been performed on the same element, or to resolve conflicts with other libraries.   |
| matching | Used by the following plugins to select children to index:  ```items```, ```grid```, ```cols```, ```rows```, ```cellRows```, ```cellCols```, and ```cells```. If not specified, the immediate child elements will be selected. |
| cols | The number of columns to create or detect.  This is used by the following plugins: ```cols```, ```cellCols```, ```grid```, and ```cells``` |
| rows | The number of rows to create or detect.  This is used by the following plugins: ```rows```, ```cellRows```, ```grid```, and ```cells``` |
| whitespace | If true, the ```chars``` plugin will count whitespace while indexing characters. |

### Splitting Classes

| ClassName | Description |
| :---------| :---------- |
| ```splitting``` | Applied to the element targeted by the split operation.  The plugin name is also applied as a classname. |
| ```char``` | Applied by the ```chars``` plugin on new char elements |
| ```word``` | Applied by the ```words```, ```lines```, and ```chars``` plugin on new word elements |
 