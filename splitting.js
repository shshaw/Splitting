/*! Splitting, ${npm_package_version} https://github.com/shshaw/splitting/ @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Splitting = factory());
}(this, (function () { 'use strict';

var root = document;

/**
 * # setProperty
 * Apply a CSS var
 * @param el{HTMLElement} 
 * @param varName {string} 
 * @param value {string|number}  
 */
function setProperty(el, varName, value) {
    el.style.setProperty(varName, value);
} 

/**
 * 
 * @param {Node} el 
 * @param {Node} child 
 */
function appendChild(el, child) {
  return el.appendChild(child);
}

function createElement(parent, key, text) {
  var el = document.createElement('span');
  el.className = key; 
  if (text) {
      el.setAttribute("data-" + key, text);
      el.textContent = text; 
  }
  return (parent && appendChild(parent, el)) || el;
}

/**
 * 
 * @param e {import('../types').Target} 
 * @param parent {HTMLElement}
 * @returns {HTMLElement[]}
 */
function $(e, parent) {
    return !e || e.length == 0
        ? // null or empty string returns empty array
          []
        : e.nodeName
            ? // a single element is wrapped in an array
              [e]
            : // selector and NodeList are converted to Element[]
              [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e));
}

/**
 * Creates and fills an array with the value provided
 * @template {T}
 * @param {number} len
 * @param {() => T} valueProvider
 * @return {T}
 */
function Array2D(len) {
    var a = [];
    for (; len--; ) {
        a[len] = [];
    }
    return a;
}

function each(items, fn) {
    items && items.some(fn);
}

function selectFrom(obj) {
    return function (key) {
        return obj[key];
    }
}

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
function index(element, key, items) {
    var prefix = '--' + key;
    var cssVar = prefix + "-index";

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
var plugins = {};

/**
 * @param by {string}
 * @param parent {string}
 * @param deps {string[]}
 * @return {string[]}
 */
function resolvePlugins(by, parent, deps) {
    // skip if already visited this dependency
    var index = deps.indexOf(by);
    if (index == -1) {
        // if new to dependency array, add to the beginning
        deps.unshift(by);

        // recursively call this function for all dependencies
        each(plugins[by].depends, function(p) {
            resolvePlugins(p, by, deps);
        });
    } else {
        // if this dependency was added already move to the left of
        // the parent dependency so it gets loaded in order
        var indexOfParent = deps.indexOf(parent);
        deps.splice(index, 1);
        deps.splice(indexOfParent, 0, by);
    }
    return deps;
}

/**
 *
 * @param by {string}
 * @returns {import('./types').ISplittingPlugin[]}
 */
function resolve(by) {
    return resolvePlugins(by, 0, []).map(selectFrom(plugins));
}

/**
 * Adds a new plugin to splitting
 * @param opts {import('./types').ISplittingPlugin}
 */
function add(opts) {
    plugins[opts.by] = opts;
}

var PRESERVE_SPACE = 1;
var INCLUDE_PREVIOUS = 2; 

/**
 * # Splitting.split
 * Split an element's textContent into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param splitOn {string}
 * @param includeSpace {boolean}
 * @returns {HTMLElement[]}
 */
function split(el, key, splitOn, mode) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var elements = [];
    var F = document.createDocumentFragment();
    
    if (mode === INCLUDE_PREVIOUS) {
        elements.push(el.previousSibling);
    }

    el.childNodes.forEach(function(next) {
        // Recursively run through child nodes
        if (next && next.childNodes && next.childNodes.length) {
            appendChild(F, next);
            elements.push.apply(elements, split(next, key, splitOn, mode));
            return;
        }

        // Get the text to split, trimming out the whitespace
        /** @type {string} */
        var text = (next.wholeText || "").trim();

        // If there's no text left after trimming whitespace, continue the loop
        if (!text.length) {
            appendChild(F, next);
            return;
        }

        // Concatenate the split text children back into the full array
        each(text.split(splitOn), function(splitText, i) {
            if (i && mode === PRESERVE_SPACE) {
                createElement(F, key, ' ');
            }
            elements.push(createElement(F, key, splitText)); 
        });
    });

    // Clear out the existing element
    el.innerHTML = "";
    appendChild(el, F);
    return elements;
}

var WORDS = 'words';

/** @type {import('../types').ISplittingPlugin} */
var wordPlugin = {
    by: WORDS,
    key: 'word',
    split: function(el, options) {
        return split(el, 'word', /\s+/, PRESERVE_SPACE)
    }
};

var CHARS = "chars";

/** @type {import('../types').ISplittingPlugin} */
var charPlugin = {
    by: CHARS,
    key: "char",
    depends: [WORDS],
    split: function(el, options, ctx) {
        var results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, split(word, "char", "", options.whitespace && i ? INCLUDE_PREVIOUS : 0));
        });

        return results;
    }
};

function detectGrid(items, side) {
    var c = {};

    each(items, function(w) {
        var val = Math.round(w[side]);
        c[val] || (c[val] = []).push(w);
    });

    return Object.keys(c).map(Number).sort().map(selectFrom(c));
}

/** @type {import('../types').ISplittingPlugin} */
var linePlugin = {
  by: 'lines',
  key: 'line',
  alias: 1,
  depends: [WORDS],
  split: function(el, _options, ctx) {
      return detectGrid(ctx[WORDS], 'offsetTop')
  }
};

/** @type {import('../types').ISplittingPlugin} */
var itemPlugin = {
    by: 'items',
    key: 'item',
    split: function(el, options) {
        return $(options.matching || el.children, el)
    }
};

/** @type {import('../types').ISplittingPlugin} */
var rowPlugin = {
    by: "rows",
    key: "row",
    split: function(el, options, ctx) {
        return detectGrid($(options.matching || el.children, el), "offsetTop");
    }
};

/** @type {import('../types').ISplittingPlugin} */
var columnPlugin = {
    by: "cols",
    key: "col", 
    split: function(el, options, ctx) {
        return detectGrid($(options.matching || el.children, el), "offsetLeft");
    }
};

/** @type {import('../types').ISplittingPlugin} */
var gridPlugin = {
    by: "grid",
    depends: ["rows", "cols"]
};

var LAYOUT = 'layout';

/** @type {import('../types').ISplittingPlugin} */
var layoutPlugin = {
    by: LAYOUT,
    split: function(el, opts) { 
        // detect and set options
        opts.image = opts.image || (el.dataset.image) || el.currentSrc || el.src;
        var rows = opts.rows = +(opts.rows || el.dataset.rows || 1);
        var columns = opts.columns = +(opts.columns || el.dataset.columns || 1);
 
        // Seek out the first <img> if the value is true
        if (opts.image) {
            var img = $('img', el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }
        
        // add optional image to background
        if (opts.image) {
            setProperty(el, 'background-image', 'url(' + opts.image + ')');
        }

        var totalCells = rows * columns;
        var elements = [];
        
        var container = createElement(0, 'cell-grid');
        while(totalCells--) {
            // Create a span
            var cell = createElement(container, 'cell');
            createElement(cell, 'cell-inner');
            elements.push(cell);
        }

        // Append elements back into the parent
        appendChild(el, container); 

        return elements;
    }
};

/** @type {import('../types').ISplittingPlugin} */
var cellColumnPlugin = {
    by: "cellColumns",
    key: 'col',
    depends: [LAYOUT],
    split: function(el, opts, ctx) {
        var columnCount = opts.columns; 
        var result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell);
        });
        
        return result;
    }
};

/** @type {import('../types').ISplittingPlugin} */
var cellRowPlugin = {
    by: "cellRows",
    key: "row",
    depends: [LAYOUT],
    split: function(el, opts, ctx) {
        var rowCount = opts.rows;
        var result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
};

/** @type {import('../types').ISplittingPlugin} */
var cellPlugin = {
    by: "cells",
    key: "cell",
    depends: ['cellRows', 'cellColumns'],
    split: function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx.layout;
    }
};

/** @typedef {import('./splitting.d.ts')} */

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};
  var key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = { el: el };
    var items = resolve(opts.by || el.dataset.splitting || CHARS);

    each(items, function(plugin) {
      if (plugin.split) {
        var key2 = (plugin.key || '') + (key ? '-' + key : '');
        var results = plugin.split(el, opts, ctx);
        key2 && index(el, key2, results);
        ctx[plugin.by] = results;
        el.classList.add(plugin.by);
      } 
    });

    el.classList.add('splitting');
    return ctx;
  })
}

/**
 * # Splitting.html
 * 
 * @param opts {import('./types').ISplittingOptions}
 */
function html(opts) {
  opts = opts || {};
  var el = opts.target = createElement();
  el.innerHTML = opts.content;
  Splitting(opts);
  return el.outerHTML
}

Splitting.html = html;
Splitting.add = add;

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
