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
    el.style.setProperty("--" + varName, value);
}

/**
 * 
 * @param {Node} el 
 * @param {Node} child 
 */
function appendChild(el, child) {
  el.appendChild(child);
  return child;
}

function createElement(parent, key, text) {
  var el = document.createElement('span');
  el.setAttribute("data-split", key);
  if (text) {
      el.setAttribute("data-" + key, text);
      el.textContent = text; 
  }
  parent.appendChild(el);
  return el;
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
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
function index(element, key, items) { 
    items.some(function(items, i) {
        eachDeep(items, function(item) {
            setProperty(item, key + "-index", i);
        });
    });

    setProperty(element, key + "-total", items.length);
}

function eachDeep(items, fn) {
    if (Array.isArray(items)) {
        items.some(function(item) {
            eachDeep(item, fn);
        });
    } else {
        fn(items);
    }
}

/**
 * @type {Record<string, import('./types').ISplittingPlugin>}
 */
var plugins = {};

/**
 * @param by {string}
 * @param parent {string}
 * @param deps {string[]}
 */
function resolvePlugins(by, parent, deps) {
    // skip if already visited this dependency
    var index = deps.indexOf(by);
    if (index == -1) { 
       // if new to dependency array, add to the beginning
       deps.unshift(by);
       
       // lookup the plugin dependencies
       var plugin = plugins[by];
       
       // recursively call this function for all dependencies
       (plugin.depends || []).some(function(p) {
          resolvePlugins(p, by, deps);
       });
    } else {
       // if this dependency was added already move to the left of
       // the parent dependency so it gets loaded in order
       var indexOfParent = deps.indexOf(parent);
       deps.splice(index, 1);
       deps.splice(indexOfParent, 0, by);
    }
    return deps
 }

 /**
  * 
  * @param by {string} 
  * @returns {import('./types').ISplittingPlugin[]}
  */
 function resolve(by) {
    return resolvePlugins(by, 0, []).map(function(pluginName) {
        return plugins[pluginName];
    });
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
    if (splitOn === '') {
        debugger
    }

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
        text.split(splitOn).some(function(splitText, i) {
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

/** @type {import('../types').ISplittingPlugin} */
var wordPlugin = {
    by: 'words',
    key: 'word',
    split: function(el, options) {
        return split(el, 'word', /\s+/, PRESERVE_SPACE)
    }
};

/** @type {import('../types').ISplittingPlugin} */
var charPlugin = {
    by: "chars",
    key: "char",
    depends: ["words"],
    split: function(el, options, ctx) {
        return ctx.words.reduce(function(val, word, i) { 
            val.push.apply(val, split(word, "char", "", options.whitespace && i ? INCLUDE_PREVIOUS : 0));
            return val;
        }, []);
    }
};

function detectGrid(items, side, threshold) {
    threshold = threshold || 1;
    var c = {};
    items.some(function(w) {
        var val = Math.round(w[side] * threshold) / threshold;
        var list = c[val] || (c[val] = []);
        list.push(w);
    });

    return Object.keys(c)
        .map(Number)
        .sort()
        .map(function(key) { return c[key]; });
}

/** @type {import('../types').ISplittingPlugin} */
var linePlugin = {
  by: 'lines',
  key: 'line',
  alias: 1,
  depends: ['words'],
  split: function(el, _options, ctx) {
      return detectGrid(ctx.words, 'offsetTop')
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
    by: "columns",
    key: "column", 
    split: function(el, options, ctx) {
        return detectGrid($(options.matching || el.children, el), "offsetLeft");
    }
};

/** @type {import('../types').ISplittingPlugin} */
var gridPlugin = {
    by: "grid",
    depends: ["rows", "columns"]
};

var layoutPlugin = {
    by: "layout",
    split: function(el, opts) { 
        // detect and set options
        opts.image = opts.image || (el.dataset && el.dataset.image) || el.currentSrc || el.src;
        opts.rows = opts.rows || (el.dataset && el.dataset.rows) || 1;
        opts.cols =  opts.cols || (el.dataset && el.dataset.cols) || 1;
 
        if (!opts.image) {
            var img = el.querySelector("img");
            opts.image = img && (img.currentSrc || img.src);
        }

        var totalCells = opts.rows * opts.cols;
        var elements = [];
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < totalCells; i++) {
            // Create a span
            var cell = createElement(fragment, 'cell');
            inner = createElement(cell, 'cell-inner');
            elements.push(cell);
        }

        // Append elements back into the parent
        el.appendChild(fragment);

        // add optional image to background
        if (opts.image) {
            el.style.setProperty("background-image", "url(" + opts.image + ")");
        } 

        return elements;
    }
};

var cellColumnPlugin = {
    by: "cell-columns",
    key: 'cell-column',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var columnCount = opts.rows; 
        var result = Array(columnCount).map(function() { return [] });
        ctx.layout.some(function(cell) {
            columns[i % columnCount].push(cell);
        });
        return result;
    }
};

var cellRowPlugin = {
    by: "cell-rows",
    key: 'cell-row',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var rowCount = opts.rows; 
        var result = Array(rowCount).map(function() { return [] });
        ctx.layout.some(function(cell, i) {
            results[Math.floor(i / rowCount)].push(cell);
        });
        return results;
    }
};

var cellPlugin = {
    by: "cells",
    key: "cell",
    depends: ['cell-rows', 'cell-columns'],
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

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = { el: el };
    resolve(opts.by || el.dataset.splitting || 'chars').some(function(plugin) {
      if (plugin.split) {
        var results = plugin.split(el, opts, ctx); 
        var key = (plugin.key || '') + (opts.key ? '-' + opts.key : '');
        key && index(el, key, results);
        ctx[plugin.by] = results;
      } 
    });
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
  var el = document.createElement('span');
  el.innerHTML = opts.content;
  opts.target = el;
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
