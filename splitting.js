/*! Splitting, ${npm_package_version} https://github.com/shshaw/splitting/ @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Splitting = factory());
}(this, (function () { 'use strict';

var root = document;

/**
 * # setCSSVar
 * Apply a CSS var
 * @param {*} el
 * @param {*} varName
 * @param {*} value
 */
function setCSSVar(el, varName, value) {
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
function index(s, key, splits) {
    if (splits) {
        s[key + "s"] = splits;
        setCSSVar(s.el, key + "-total", splits.length);
        splits.some(function(el, i) {
            setCSSVar(el, key + "-index", i);
        });
    }
    return s;
}

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param {Node} el - Element to split
 * @param {String} key -
 * @param {String|RegEx} by - string or regex to split the innerText by
 * @param {Boolean} space - Add a space to each split if index is greater than 0. Mainly for `Splitting.words`
 */
function split(el, key, by, space) {
    // Use fragment to prevent unnecessary DOM thrashing.
    var fragment = document.createDocumentFragment();

    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Loop through all children to split them up.
    var children = $(el.childNodes).reduce(function(val, child) {
        // Recursively run through child nodes
        if (child && child.childNodes && child.childNodes.length) {
            fragment.appendChild(child);
            return val.concat(split(child, key, by, space));
        }

        // Get the text to split, trimming out the whitespace
        var text = (child.wholeText || "").trim();

        // If there's no text left after trimming whitespace, continue the loop
        if (!text.length) {
            fragment.appendChild(child);
            return val;
        }

        // Concatenate the split text children back into the full array
        var newItems = text.split(by).map(function(split) {
            // Create a span
            var splitEl = document.createElement("span");
            // Give it the key as a class
            splitEl.className = key;
            splitEl.innerText = split;
            // Populate data-{{key}} with the split value
            splitEl.setAttribute("data-" + key, split);
            fragment.appendChild(splitEl);
            // If items should be spaced out (Splitting.words, primarily), insert
            // the space into the parent before the element.
            if (space) {
                splitEl.insertAdjacentText("afterend", " ");
            }
            return splitEl;
        });
        val.push.apply(val, newItems);
        return val;
    }, []);

    // Clear out the existing element
    el.innerHTML = "";
    // Append elements back into the parent
    el.appendChild(fragment);

    return children;
}

function splitElement(els) {
    return $(els).map(function(el, i) {
      if (!el._splitting) {
          el._splitting = {
              el: el
          };
          if (el.classList) {
              el.classList.add("splitting");
          }
      }
      return el._splitting;
    });
  }

/**
 * # Splitting.children
 * Add CSS Var indexes to a DOM element's children. Useful for lists.
 * @param {String|NodeList} parent - Parent element(s) or selector
 * @param {String|NodeList} children - Child element(s) or selector
 * @param {String} key -
 * @example `Splitting.children('ul','li','item'); // Index every unordered list's items with the --item CSS var.`
 */
function children(parent, options) {
    var children = options.children;
    var key = options.key;
    return splitElement(parent).map(function(s) {
        return index(s, key, $(children, s.el));
    });
}

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
function words(els) {
    return splitElement(els).map(function(s, i) {
        return s.words ? s : index(s, "word", split(s.el, "word", /\s+/, true));
    });
}

/**
 * # Splitting.lines
 * Index each word by line. Does not automatically update on resize, so retrigger `Splitting.lines` again _with debouncing_ when the element's line width may have changed.
 * @param {*} els
 */

function splitLines(els) {
    var lines = [],
        lineIndex = -1,
        lastTop = -1,
        top;

    els.some(function(w) {
        top = w.offsetTop;
        if (top > lastTop) {
            lineIndex++;
            lastTop = top;
        }
        lines[lineIndex] = lines[lineIndex] || [];
        lines[lineIndex].push(w);
        setCSSVar(w, "line-index", lineIndex);
    });

    return lines;
}

function lines(els, options) { 
    var childs = options.children;
    var key = childs ? options.key || "item" : "word";

    var parts = childs ? children(els, { children: childs, key: key }) : words(els);

    return parts.map(function(s) {
        s.lines = splitLines(s[key + "s"]);
        setCSSVar(s.el, "line-total", s.lines.length);
        return s;
    });
}

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
function chars(els) {
    return words(els).map(function(s) {
        return s.chars
            ? s
            : index(
                  s,
                  "char",
                  s.words.reduce(function(val, word, i) {
                      return val.concat(split(word, "char", ""));
                  }, [])
              );
    });
}

var plugins = {
  children: children,
  index: index, 
  lines: lines,
  chars: chars,
  words: words
};

/**
 * # Splitting.fromString
 * Splits a string and returns the processed HTML with elements and CSS Vars.
 * @param {String} str - String to split
 * @param {Object} opts - Options
 * @param {String} opts.type - Type of splitting to do, 'words' or 'chars';
 * @param {Boolean} opts.element - Return an element. Defaults to `false` to receive a string
 *  default is chars
 */
function innerHTML(str, opts) {
    opts = typeof opts === 'string' ? { by: opts } : opts;
    var el = document.createElement("span");
    el.innerHTML = str; 
    options.target = el;
    Splitting(options);
    return el.outerHTML;
}

/**
 * # Splitting
 * CSS vars for split words & chars!
 * `Splitting` fn handles array-ifying the
 * @param {*} options
 */
function Splitting(options) {
  options = options || {};
  var by = options.by || 'chars';
  return $(options.target).reduce(function(c, n) {
    var results = plugins[by](n, options);
    if (results){
      c.push.apply(c, results);
    }
    return c;
  }, []) 
}

Splitting.innerHTML = innerHTML;

return Splitting;

})));
