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

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param {*} s
 * @param {*} key
 * @param {*} splits
 */
function index (element, key, splits) {
  setProperty(element, key + '-total', splits.length);
  splits.forEach(function (s, i) {
    setProperty(s, key + '-index', i);
  });
  return splits
}

/**
 * # Splitting.children
 * Add CSS Var indexes to a DOM element's children. Useful for lists.
 * @param {String|NodeList} parent - Parent element(s) or selector
 * @param {String|NodeList} children - Child element(s) or selector
 * @param {String} key -
 * @example `Splitting.children('ul','li','item'); // Index every unordered list's items with the --item CSS var.`
 */
function children(el, options) { 
    return index(el, options.key || 'item', $(options.children || el.children, el));
}

function childrenPlugin (el, options) { 
    return {
        el: el,
        children: children(el, options)
    }
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
    return index(el, "word", split(el, "word", /\s+/, true))
}

function wordPlugin (el) {
    return {
        el: el,
        words: words(el)
    }
}

function linePlugin (el, options) {
  var childs = options.children;
  var key = childs ? options.key || 'item' : 'word';

  var parts = childs ? children(el, { children: childs, key: key }) : words(el);
  var lines = [];
  var lineIndex = -1;
  var lastTop = -1;

  parts.forEach(function (w) {
    var top = w.offsetTop;
    if (top > lastTop) {
      lineIndex++;
      lastTop = top;
    }
    lines[lineIndex] = lines[lineIndex] || [];
    lines[lineIndex].push(w);
    setProperty(w, 'line-index', lineIndex);
  });

  setProperty(el, 'line-total', lines.length);
  var result = {
      el: el,
      lines: lines
  };
  result[key + 's'] = parts;
  return result;
}

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
function charPlugin (el) {
  var wordResults = words(el);
  var charResults = index(
    el,
    'char',
    wordResults.reduce(function (val, word, i) {
      val.push.apply(val, split(word, 'char', ''));
      return val;
    }, [])
  );
  return {
      el: el,
      words: wordResults,
      chars: charResults
  }
}

/** import('./splitting.d.ts'); */

var plugins = {
  children: childrenPlugin, 
  lines: linePlugin,
  chars: charPlugin,
  words: wordPlugin
};

/**
 * Normalizes options between the three parameter methods and the single object mode.
 * @returns {ISplittingStatic}
 */
function getOptions (args) {
  // todo: simplify
  var firstArg = args[0];
  var isOptions = firstArg != null 
    && typeof firstArg == 'object'
    && !(firstArg instanceof Node)
    && !firstArg.length;
  return {
    target: (isOptions ? firstArg.target : firstArg) || '[data-splitting]',
    by: (isOptions ? firstArg.by : args[1]) || 'chars',
    options: (isOptions ? firstArg.options : args[2]) || {}
  }
}

function splittingInner (opts) {
  return $(opts.target).map(function (n) {
    return plugins[opts.by](n, opts)
  })
}

/**
 * # Splitting.html
 * 
 * @param {ISplittingOptions} options
 */
function html (options) {
  var el = document.createElement('span');
  el.innerHTML = str;
  opts.target = el;

  splittingInner(getOptions(arguments));
  return el.outerHTML
}

/**
 * # Splitting
 * 
 * @param {ISplittingOptions} options
 */
function Splitting (options) {
  return splittingInner(getOptions(arguments))
}

Splitting.html = html;

return Splitting;

})));
