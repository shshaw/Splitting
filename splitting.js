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
 * @template T extends {}
 * @param {Partial<T>} source 
 * @param {Partial<T>} dest
 * @returns {T}
 */
function inherit(source, dest) {
    for (var k in source) {
        if (!dest.hasOwnProperty(k)) {
            dest[k] = source[k];
        }
    }
    return dest;
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
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
function index(element, key, items) {
    items.forEach(function(items, i) {
        eachDeep(items, function(item) {
            setProperty(item, key + "-index", i);
        });
    });

    setProperty(element, key + "-total", items.length);
}

function itemsPlugin (options) { 
    var el = options.el;
    var items = $(options.matching || el.children, el);
    index(el, options.key || 'item', items);

    return {
        el: options.el,
        items: items
    }
}

function getItems(options) {
    var el = options.el;
    return $(options.matching || el.children, el);
}

function grid(el, items, key, side, threshold) {
    threshold = threshold || 1;
    var c = {};
    items.some(function(w) {
        var val = Math.round(w[side] * threshold) / threshold;
        var list = c[val] || (c[val] = []);
        list.push(w);
    }); 

    var results = Object.keys(c)
        .map(Number)
        .sort()
        .map(function(key) {
            return c[key];
        }); 

    index(el, key, results);
    return results;
}

function columnPlugin(options) {
    var columns = grid(options.el, getItems(options), "column", "offsetLeft");
    return {
        el: el,
        columns: columns
    };
}

function rowPlugin(options) {
    var rows = grid(options.el, getItems(options), "row", "offsetTop");
    return {
        el: el,
        rows: rows
    };
}

function gridPlugin(options) {
    var el = options.el;
    var items = getItems(options);
    var columns = grid(el, items, "column", "offsetLeft");
    var rows = grid(el, items, "row", "offsetTop");
    return {
        el: el,
        columns: columns,
        rows: rows
    };
}

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param el {Node} Element to split
 * @param options {{ key: string, by: string, space: boolean }}
 */
function split(el, options) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var result = $(el.childNodes).reduce(splitElements, {
        $: [],
        _: options,
        F: document.createDocumentFragment()
    });

    // Clear out the existing element
    el.innerHTML = result.F.innerHTML;
    return result.$;
}

/**
 * Loop through all children to split them up. (move this to a reusable function)
 * @param current {{ $: HTMLElement[], parent: HTMLElement, _: { key: string, by: string, space: boolean } }}
 * @param next {HTMLElement}
 */
function splitElements(current, next) {
    // Recursively run through child nodes
    if (next && next.childNodes && next.childNodes.length) {
        appendChild(current.F, next);
        pushAll(current.$, split(next, current._));
        return current;
    }

    // Get the text to split, trimming out the whitespace
    var text = (next.wholeText || "").trim();

    // If there's no text left after trimming whitespace, continue the loop
    if (!text.length) {
        appendChild(current.F, next);
        return current;
    }

    // Concatenate the split text children back into the full array
    var newItems = text.split(current._.by).map(function(splitText) {
        // Create a span
        var splitEl = document.createElement("span");
        // Give it the key as a class
        splitEl.className = current._.key;
        splitEl.innerText = splitText;
        // Populate data-{{key}} with the split value
        splitEl.setAttribute("data-" + current._.key, splitText);
        appendChild(current.F, splitEl);
        // If items should be spaced out (Splitting.words, primarily), insert
        // the space into the parent before the element.
        if (current._.space) {
            splitEl.insertAdjacentText("afterend", " ");
        }
        return splitEl;
    });

    pushAll(current.$, newItems);
    return current;
}

function pushAll(list, newItems) {
    list.push.apply(list, newItems);
}

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 * @return {Element[]}
 */
function words(el) {
    var wordResults = split(el, { 
        key: "word", 
        by: /\s+/, 
        space: true 
    });
    
    index(el, "word", wordResults);
    return wordResults;
}

function wordPlugin (options) {
    return {
        el: options.el,
        words: words(options.el)
    }
}

function linePlugin (options) {
  var el = options.el;
  var wordResults = words(el); 
  var lineResults = grid(el, wordResults, 'line', 'offsetTop');

  return {
    el: el,
    lines: lineResults,
    words: wordResults
  };
}

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
function charPlugin(options) {
    var el = options.el;
    var wordResults = words(el);
    var charResults = wordResults.reduce(function(val, word, i) {
        val.push.apply(val, split(word, { key: 'char', by: ''  }));
        return val;
    }, []);

    index(el, "char", charResults);
    
    return {
        el: el,
        words: wordResults,
        chars: charResults
    };
}

/** @typedef {import('./splitting.d.ts')} */

var plugins = {
  items: itemsPlugin, 
  lines: linePlugin,
  chars: charPlugin,
  words: wordPlugin,
  rows: rowPlugin,
  columns: columnPlugin,
  grid: gridPlugin
};

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};

  return $(opts.target || '[data-splitting]').map(function(el) { 
    var by = opts.by || el.dataset.splitting || 'chars';
    var options =  inherit(opts, { el: el });
    return plugins[by](options)
  })
}

/**
 * Adds a new plugin to splitting
 * @param opts {import('./types').ISplittingPlugin} 
 */
function add(opts) {
  plugins[opts.name] = opts;
}
Splitting.add = add;

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

return Splitting;

})));
