import { $ } from './dom';

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param {Node} el - Element to split
 * @param {String} key -
 * @param {String|RegEx} by - string or regex to split the innerText by
 * @param {Boolean} space - Add a space to each split if index is greater than 0. Mainly for `Splitting.words`
 */
export function split(el, key, by, space) {
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

export function splitElement(els) {
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
  
  