(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Splitting = factory());
}(this, (function () { 'use strict';

/**
 * # Splitting
 * CSS vars for split words & chars!
 * `Splitting` fn handles array-ifying the
 * @param {*} els
 */
function Splitting(els) {
  return $(els).map(function(el, i) {
    if (!el._splitting) {
      el._splitting = {
        el: el
      };
      el.className += " splitting";
    }
    return el._splitting;
  });
}

/**
 * # Splitting.$
 * Convert selector or NodeList to array for easier manipulation.
 *
 * @param {*} els - Elements or selector
 * @param {*} parent
 */
function $(els, parent) {
  return Array.prototype.slice.call(
    els.nodeName
    ? [els]
    : els[0].nodeName ? els : (parent || document).querySelectorAll(els),
    0
  );
}
Splitting.$ = $;

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
    s.el.style.setProperty("--total-" + key + "s", splits.length);
    splits.map(function(el, i) {
      el.style.setProperty("--" + key + "-index", i);
    });
  }
  return s;
}
Splitting.index = index;

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param {Node} el - Element to split
 * @param {String} key -
 * @param {String|RegEx} splitBy - string or regex to split the innerText by
 * @param {Boolean} space - Add a space to each split if index is greater than 0. Mainly for `Splitting.words`
 */
function split(el, key, splitBy, space) {

  var children = $(el.childNodes);

  el.innerHTML = '';

  return children.reduce(function(val, child) {

    var isEl = child.innerText;
    var text = child[ isEl ? 'innerText' : 'wholeText' ].trim();

    if ( !text.length ) { return val; }

    if ( isEl ) {
      child.innerHTML = '';
      el.appendChild(child);
    }

    return val.concat(
      text.split(splitBy).map(function(split) {
        var splitEl = document.createElement("span");
        splitEl.className = key;
        splitEl.setAttribute("data-" + key, split);
        splitEl.innerText = split;
        ( isEl ? child : el ).appendChild(splitEl);
        if (space) {
          splitEl.insertAdjacentText("beforebegin", " ");
        }
        return splitEl;
      })
    );

  }, []);

}
Splitting.split = split;

/**
 * # Splitting.children
 * Add CSS Var indexes to a DOM element's children. Useful for lists.
 * @param {String|NodeList} parent - Parent element(s) or selector
 * @param {String|NodeList} children - Child element(s) or selector
 * @param {String} key -
 * @example `Splitting.children('ul','li','item'); // Index every unordered list's items with the --item CSS var.`
 */
Splitting.children = function(parent, children, key) {
  return Splitting(parent).map(function(s) {
    return index(s, key, $(children, s.el));
  });
};

Splitting.words = function(els) {
  return Splitting(els).map(function(s, i) {
    return s.words ? s : index(s, "word", split(s.el, "word", /\s+/, true));
  });
};

/**
 * # Splitting.chars
 * Split an element into words and those words into chars
 */
Splitting.chars = function(els) {
  return Splitting.words(els).map(function(s) {
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
};

return Splitting;

})));
