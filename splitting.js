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
 * @param {*} el
 * @param {*} varName
 * @param {*} value
 */
function setProperty(el, varName, value) {
    el.style.setProperty("--" + varName, value);
}

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
 * @param {*} s
 * @param {*} key
 * @param {*} splits
 */
function index(element, key, splits) {
    splits.forEach(function(items, i) {
        eachDeep(items, function(item) {
            setProperty(item, key + "-index", i);
        });
    });

    setProperty(element, key + "-total", splits.length);
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
        (c[val] = c[val] || []).push(w);
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
 * @param {Node} el - Element to split
 * @param {String} key -
 * @param {String|RegEx} by - string or regex to split the innerText by
 * @param {Boolean} space - Add a space to each split if index is greater than 0. Mainly for `Splitting.words`
 */
function split (el, key, by, space) {
  // Use fragment to prevent unnecessary DOM thrashing.
  var fragment = document.createDocumentFragment();

  // Combine any strange text nodes or empty whitespace.
  el.normalize();

  // Loop through all children to split them up.
  var children = $(el.childNodes).reduce(function (val, child) {
    // Recursively run through child nodes
    if (child && child.childNodes && child.childNodes.length) {
      fragment.appendChild(child);
      val.push.apply(val, split(child, key, by, space));
      return val
    }

    // Get the text to split, trimming out the whitespace
    var text = (child.wholeText || '').trim();

    // If there's no text left after trimming whitespace, continue the loop
    if (!text.length) {
      fragment.appendChild(child);
      return val
    }

    // Concatenate the split text children back into the full array
    var newItems = text.split(by).map(function (split) {
      // Create a span
      var splitEl = document.createElement('span');
      // Give it the key as a class
      splitEl.className = key;
      splitEl.innerText = split;
      // Populate data-{{key}} with the split value
      splitEl.setAttribute('data-' + key, split);
      fragment.appendChild(splitEl);
      // If items should be spaced out (Splitting.words, primarily), insert
      // the space into the parent before the element.
      if (space) {
        splitEl.insertAdjacentText('afterend', ' ');
      }
      return splitEl
    });
    
    val.push.apply(val, newItems);
    return val
  }, []);

  // Clear out the existing element
  el.innerHTML = '';
  // Append elements back into the parent
  el.appendChild(fragment);

  return children
}

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 * @return {Element[]}
 */
function words(el) {
    var wordResults = split(el, "word", /\s+/, true);
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
        val.push.apply(val, split(word, "char", ""));
        return val;
    }, []);

    index(el, "char", charResults);
    
    return {
        el: el,
        words: wordResults,
        chars: charResults
    };
}

/** import('./splitting.d.ts'); */

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
 * # Splitting.html
 * 
 * @param {ISplittingOptions} options
 */
function html (opts) {
  opts = opts || {};
  var el = document.createElement('span');
  el.innerHTML = opts.content;
  opts.target = el;
  Splitting(opts);
  return el.outerHTML
}

/**
 * # Splitting
 * 
 * @param {ISplittingOptions} options
 */
function Splitting (opts) {
  opts = opts || {};

  return $(opts.target || '[data-splitting]').map(function(el) { 
    var by = opts.by || el.dataset.splitting || 'chars';
    return plugins[by](
      inherit(opts, { el: el })
    )
  })
}

function inherit(source, dest) {
  for (var k in source) {
    if (!dest.hasOwnProperty(k)) {
      dest[k] = source[k];
    }
  }
  return dest;
}

Splitting.html = html;

return Splitting;

})));
