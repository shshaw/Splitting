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
      if (el.classList) {
        el.classList.add("splitting");
      }
    }
    return el._splitting;
  });
}

/**
 * # Splitting.$
 * Convert selector or NodeList to array for easier manipulation.
 *
 * @param {*} els - HTMLElement, NodeList or String selector
 * @param {*} parent
 */
function $(els, parent) {
  // Null argument or empty array
  if (!els || els.length == 0) {
    return [];
  } else if (els.nodeName) {
    // Single HTMLElement
    els = [els];
  } else if (els.charAt) {
    //} else if (typeof els === "string") {
    //else if (!els[0].nodeName) {
    // String selector
    els = (parent || document).querySelectorAll(els);
  }
  return [].slice.call(els);
}
Splitting.$ = $;

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
    splits.map(function(el, i) {
      setCSSVar(el, key + "-index", i);
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
  // Remove element from DOM to prevent unnecessary thrashing.
  var parent = el.parentNode;
  if (parent) {
    var temp = document.createTextNode("");
    parent.replaceChild(temp, el);
  }

  // Combine any strange text nodes or empty whitespace.
  el.normalize();

  // Loop through all children to split them up.
  var children = $(el.childNodes).reduce(function(val, child) {
    // Recursively run through child nodes
    if (child && child.childNodes && child.childNodes.length) {
      el.appendChild(child);
      return val.concat(split(child, key, splitBy, space));
    }

    // Get the text to split, trimming out the whitespace
    var text = (child.wholeText || "").trim();

    // If there's no text left after trimming whitespace, continue the loop
    if (!text.length) {
      el.appendChild(child);
      return val;
    }

    el.removeChild(child);

    // Concatenate the split text children back into the full array
    return val.concat(
      text.split(splitBy).map(function(split) {
        // Create a span
        var splitEl = document.createElement("span");
        // Give it the key as a class
        splitEl.className = key;
        splitEl.innerText = split;
        // Populate data-{{key}} with the split value
        splitEl.setAttribute("data-" + key, split);
        el.appendChild(splitEl);
        // If items should be spaced out (Splitting.words, primarily), insert
        // the space into the parent before the element.
        if (space) {
          splitEl.insertAdjacentText("afterend", " ");
        }
        return splitEl;
      })
    );
  }, []);

  // Put the element back into the DOM
  if (parent) {
    parent.replaceChild(el, temp);
  }

  return children;
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

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
Splitting.words = function(els) {
  return Splitting(els).map(function(s, i) {
    return s.words ? s : index(s, "word", split(s.el, "word", /\s+/, true));
  });
};

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
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

  els.map(function(w) {
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

Splitting.lines = function(els, children, key) {
  key = children ? key || "item" : "word";

  return (children
    ? Splitting.children(els, children, key)
    : Splitting.words(els)
  ).map(function(s) {
    s.lines = splitLines(s[key + "s"]);
    setCSSVar(s.el, "line-total", s.lines.length);
    return s;
  });
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

Splitting.fromString = function(str, opts) {
  opts = opts || {};
  var el = document.createElement("span");
  el.innerHTML = str;
  Splitting[opts.type || "chars"].apply(null, [el].concat(opts.args || []));
  return opts.element ? el : el.outerHTML;
};

export default Splitting;
