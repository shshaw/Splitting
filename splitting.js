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

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param by {string}
 * @param space {boolean}
 */
function split(el, key, by, space) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var elements = [];
    var F = document.createDocumentFragment();

    $(el.childNodes).some(function(next) {
        // Recursively run through child nodes
        if (next && next.childNodes && next.childNodes.length) {
            appendChild(F, next);
            elements.push.apply(elements, split(next, key, by, space));
        } else {
            // Get the text to split, trimming out the whitespace
            var text = (next.wholeText || "").trim();

            // If there's no text left after trimming whitespace, continue the loop
            if (!text.length) {
                appendChild(F, next);
            } else {
                // Concatenate the split text children back into the full array
                text.split(by).some(function(splitText) {
                    // Create a span
                    var splitEl = document.createElement("span");
                    // Give it the key as a class
                    splitEl.className = key;
                    splitEl.innerText = splitText;
                    // Populate data-{{key}} with the split value
                    splitEl.setAttribute("data-" + key, splitText);
                    appendChild(F, splitEl);
                    // If items should be spaced out (Splitting.words, primarily), insert
                    // the space into the parent before the element.
                    if (space) {
                        splitEl.insertAdjacentText("afterend", " ");
                    }
                    elements.push(splitEl);
                });
            }
        }
    });

    // Clear out the existing element
    el.innerHTML = F.innerHTML;
    return elements;
}

/** @type {import('../types').ISplittingPlugin} */
var wordPlugin = {
    by: 'words',
    key: 'word',
    split: function(el, options) {
        return split(el, 'word', /\s+/, 1)
    }
};

/** @type {import('../types').ISplittingPlugin} */
var allCharPlugin = {
    by: 'all-chars',
    key: 'all-char',
    split: function(el) {
        return split(el, 'word', '')
    }
};

/** @type {import('../types').ISplittingPlugin} */
var charPlugin = {
    by: 'chars',
    key: 'char',
    depends: ['words'],
    split: function(_el, _options, ctx) {
        return ctx.words.reduce(chars, []);
    }
};

function chars(val, word) {
    val.push.apply(val, split(word, 'char', ''));
    return val;
}

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
        index(el, (plugin.key || "item") + (opts.key ? '-' + opts.key : ''), results);
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
add(wordPlugin);
add(charPlugin);
add(allCharPlugin);
add(linePlugin);
add(itemPlugin);
add(rowPlugin);
add(columnPlugin);
add(gridPlugin);

return Splitting;

})));
