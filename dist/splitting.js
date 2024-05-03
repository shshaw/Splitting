(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Splitting = factory());
}(this, (function () { 'use strict';

let root = document;
let createText = root.createTextNode.bind(root);

/**
 * # setProperty
 * Apply a CSS var
 * @param {HTMLElement} el
 * @param {string} varName 
 * @param {string|number} value 
 */
function setProperty(el, varName, value) {
    el.style.setProperty(varName, value);
} 

/**
 * 
 * @param {!HTMLElement} el 
 * @param {!HTMLElement} child 
 */
function appendChild(el, child) {
  return el.appendChild(child);
}

/**
 * 
 * @param {!HTMLElement} parent 
 * @param {string} key 
 * @param {string} text 
 * @param {boolean} whitespace 
 */
function createElement(parent, key, text, whitespace) {
  let el = root.createElement('span');
  key && (el.className = key); 
  if (text) { 
      !whitespace && el.setAttribute("data-" + key, text);
      el.textContent = text; 
  }
  return (parent && appendChild(parent, el)) || el;
}

/**
 * 
 * @param {!HTMLElement} el 
 * @param {string} key 
 */
function getData(el, key) {
  return el.getAttribute("data-" + key)
}

/**
 * 
 * @param {import('../types').Target} e 
 * @param {!HTMLElement} parent
 * @returns {!Array<!HTMLElement>}
 */
function $(e, parent) {
    return !e || e.length == 0
        ? // null or empty string returns empty array
          []
        : e.nodeName
            ? // a single element is wrapped in an array
              [e]
            : // selector and NodeList are converted to Element[]
              [].slice.call(e[0].nodeName ? e : document.querySelectorAll(e));
}

/**
 * Creates and fills an array with the value provided
 * @param {number} len
 * @param {() => T} valueProvider
 * @return {T}
 * @template T
 */
function Array2D(len) {
    let a = [];
    for (; len--; ) {
        a[len] = [];
    }
    return a;
}

/**
 * A for loop wrapper used to reduce js minified size.
 * @param {!Array<T>} items 
 * @param {function(T):void} consumer
 * @template T
 */
function each(items, consumer) {
    items && items.some(consumer);
}

/**
 * @param {T} obj 
 * @return {function(string):*}
 * @template T
 */
function selectFrom(obj) {
    return function (key) {
        return obj[key];
    }
}

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param {HTMLElement} element
 * @param {string} key 
 * @param {!Array<!HTMLElement> | !Array<!Array<!HTMLElement>>} items 
 */
function index(element, key, items) {
    let prefix = '--' + key;
    let cssVar = prefix + "-index";

    each(items, function (items, i) {
        if (Array.isArray(items)) {
            each(items, function(item) {
                setProperty(item, cssVar, i);
            });
        } else {
            setProperty(items, cssVar, i);
        }
    });

    setProperty(element, prefix + "-total", items.length);
}

/**
 * @type {Record<string, import('./types').ISplittingPlugin>}
 */
let plugins = {};

/**
 * @param {string} by
 * @param {string} parent
 * @param {!Array<string>} deps
 * @return {!Array<string>}
 */
function resolvePlugins(by, parent, deps) {
    // skip if already visited this dependency
    let index = deps.indexOf(by);
    if (index == -1) {
        // if new to dependency array, add to the beginning
        deps.unshift(by);

        // recursively call this function for all dependencies
        let plugin = plugins[by];
        if (!plugin) {
            throw new Error("plugin not loaded: " + by);
        }
        each(plugin.depends, function(p) {
            resolvePlugins(p, by, deps);
        });
    } else {
        // if this dependency was added already move to the left of
        // the parent dependency so it gets loaded in order
        let indexOfParent = deps.indexOf(parent);
        deps.splice(index, 1);
        deps.splice(indexOfParent, 0, by);
    }
    return deps;
}

/**
 * Internal utility for creating plugins... essentially to reduce
 * the size of the library
 * @param {string} by 
 * @param {string} key 
 * @param {string[]} depends 
 * @param {Function} split 
 * @returns {import('./types').ISplittingPlugin}
 */
function createPlugin(by, depends, key, split) {
    return {
        by: by,
        depends: depends,
        key: key,
        split: split
    }
}

/**
 *
 * @param {string} by
 * @returns {import('./types').ISplittingPlugin[]}
 */
function resolve(by) {
    return resolvePlugins(by, 0, []).map(selectFrom(plugins));
}

/**
 * Adds a new plugin to splitting
 * @param {import('./types').ISplittingPlugin} opts
 */
function add(opts) {
    plugins[opts.by] = opts;
}

/**
 * # Splitting.split
 * Split an element's textContent into individual elements
 * @param {!HTMLElement} el  Element to split
 * @param {string} key 
 * @param {string} splitOn 
 * @param {boolean} includePrevious 
 * @param {boolean} preserveWhitespace
 * @return {!Array<!HTMLElement>}
 */
function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    let elements = [];
    let F = document.createDocumentFragment();

    if (includePrevious) {
        elements.push(el.previousSibling);
    }

    let allElements = [];
    $(el.childNodes).some(function(next) {
        if (next.tagName && !next.hasChildNodes()) {
            // keep elements without child nodes (no text and no children)
            allElements.push(next);
            return;
        }
        // Recursively run through child nodes
        if (next.childNodes && next.childNodes.length) {
            allElements.push(next);
            elements.push.apply(elements, splitText(next, key, splitOn, includePrevious, preserveWhitespace));
            return;
        }

        // Get the text to split, trimming out the whitespace
        /** @type {string} */
        let wholeText = next.wholeText || '';
        let contents = wholeText.trim();

        // If there's no text left after trimming whitespace, continue the loop
        if (contents.length) {
            // insert leading space if there was one
            if (wholeText[0] === ' ') {
                allElements.push(createText(' '));
            }
            // Concatenate the split text children back into the full array
            each(contents.split(splitOn), function(splitText, i) {
                if (i && preserveWhitespace) {
                    allElements.push(createElement(F, "whitespace", " ", preserveWhitespace));
                }
                let splitEl = createElement(F, key, splitText);
                elements.push(splitEl);
                allElements.push(splitEl);
            }); 
            // insert trailing space if there was one
            if (wholeText[wholeText.length - 1] === ' ') {
                allElements.push(createText(' '));
            }
        }
    });

    each(allElements, function(el) {
        appendChild(F, el);
    });

    // Clear out the existing element
    el.innerHTML = "";
    appendChild(el, F);
    return elements;
}

/** an empty value */
let _ = 0;

function copy(dest, src) {
    for (let k in src) {
        dest[k] = src[k];
    }
    return dest;
}

let WORDS = 'words';

let wordPlugin = createPlugin(
    /* by= */ WORDS,
    /* depends= */ _,
    /* key= */ 'word', 
    /* split= */ function(el) {
        return splitText(el, 'word', /\s+/, 0, 1)
    }
);

let CHARS = "chars";

let charPlugin = createPlugin(
    /* by= */ CHARS,
    /* depends= */ [WORDS],
    /* key= */ "char", 
    /* split= */ function(el, options, ctx) {
        let results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
        });

        return results;
    }
);

/**
 * # Splitting
 * 
 * @param {import('./types').ISplittingOptions} opts
 * @return {!Array<*>}
 */
function Splitting (opts) {
  opts = opts || {};
  let key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    let ctx = el['🍌'];  
    if (!opts.force && ctx) {
      return ctx;
    }

    ctx = el['🍌'] = { el: el };
    let by = opts.by || getData(el, 'splitting');
    if (!by || by == 'true') {
      by = CHARS;
    }
    let items = resolve(by);
    let opts2 = copy({}, opts);
    each(items, function(plugin) {
      if (plugin.split) {
        let pluginBy = plugin.by;
        let key2 = (key ? '-' + key : '') + plugin.key;
        let results = plugin.split(el, opts2, ctx);
        key2 && index(el, key2, results);
        ctx[pluginBy] = results;
        el.classList.add(pluginBy);
      } 
    });

    el.classList.add('splitting');
    return ctx;
  })
}

/**
 * # Splitting.html
 * 
 * @param {import('./types').ISplittingOptions} opts
 */
function html(opts) {
  opts = opts || {};
  let parent = opts.target =  createElement();
  parent.innerHTML = opts.content;
  Splitting(opts);
  return parent.outerHTML
}

Splitting.html = html;
Splitting.add = add;

/**
 * Detects the grid by measuring which elements align to a side of it.
 * @param {!HTMLElement} el 
 * @param {import('../core/types').ISplittingOptions} options
 * @param {*} side 
 */
function detectGrid(el, options, side) {
    let items = $(options.matching || el.children, el);
    let c = {};

    each(items, function(w) {
        let val = Math.round(w[side]);
        (c[val] || (c[val] = [])).push(w);
    });

    return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
}

/**
 * Sorting function for numbers.
 * @param {number} a 
 * @param {number} b
 * @return {number} 
 */
function byNumber(a, b) {
    return a - b;
}

let linePlugin = createPlugin(
    /* by= */ 'lines',
    /* depends= */ [WORDS],
    /* key= */ 'line',
    /* split= */ function(el, options, ctx) {
      return detectGrid(el, { matching: ctx[WORDS] }, 'offsetTop')
    }
);

let itemPlugin = createPlugin(
    /* by= */ 'items',
    /* depends= */ _,
    /* key= */ 'item', 
    /* split= */ function(el, options) {
        return $(options.matching || el.children, el)
    }
);

let rowPlugin = createPlugin(
    /* by= */ 'rows',
    /* depends= */ _,
    /* key= */ 'row', 
    /* split= */ function(el, options) {
        return detectGrid(el, options, "offsetTop");
    }
);

let columnPlugin = createPlugin(
    /* by= */ 'cols',
    /* depends= */ _,
    /* key= */ "col", 
    /* split= */ function(el, options) {
        return detectGrid(el, options, "offsetLeft");
    }
);

let gridPlugin = createPlugin(
    /* by= */ 'grid',
    /* depends= */ ['rows', 'cols']
);

let LAYOUT = "layout";

let layoutPlugin = createPlugin(
    /* by= */ LAYOUT,
    /* depends= */ _,
    /* key= */ _,
    /* split= */ function(el, opts) {
        // detect and set options
        let rows =  opts.rows = +(opts.rows || getData(el, 'rows') || 1);
        let columns = opts.columns = +(opts.columns || getData(el, 'columns') || 1);

        // Seek out the first <img> if the value is true 
        opts.image = opts.image || getData(el, 'image') || el.currentSrc || el.src;
        if (opts.image) {
            let img = $("img", el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }

        // add optional image to background
        if (opts.image) {
            setProperty(el, "background-image", "url(" + opts.image + ")");
        }

        let totalCells = rows * columns;
        let elements = [];

        let container = createElement(_, "cell-grid");
        while (totalCells--) {
            // Create a span
            let cell = createElement(container, "cell");
            createElement(cell, "cell-inner");
            elements.push(cell);
        }

        // Append elements back into the parent
        appendChild(el, container);

        return elements;
    }
);

let cellRowPlugin = createPlugin(
    /* by= */ "cellRows",
    /* depends= */ [LAYOUT],
    /* key= */ "row",
    /* split= */ function(el, opts, ctx) {
        let rowCount = opts.rows;
        let result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
);

let cellColumnPlugin = createPlugin(
    /* by= */ "cellColumns",
    /* depends= */ [LAYOUT],
    /* key= */ "col",
    /* split= */ function(el, opts, ctx) {
        let columnCount = opts.columns;
        let result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell);
        });

        return result;
    }
);

let cellPlugin = createPlugin(
    /* by= */ "cells",
    /* depends= */ ['cellRows', 'cellColumns'],
    /* key= */ "cell", 
    /* split= */ function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx[LAYOUT];
    }
);

// Plugins
// install plugins

// word/char plugins
add(wordPlugin);
add(charPlugin);
add(linePlugin);

// grid plugins
add(itemPlugin);
add(rowPlugin);
add(columnPlugin);
add(gridPlugin);

// cell-layout plugins
add(layoutPlugin);
add(cellRowPlugin);
add(cellColumnPlugin);
add(cellPlugin);

return Splitting;

})));
