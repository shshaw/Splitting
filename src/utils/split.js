import { $, appendChild } from "./dom";

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param by {string}
 * @param space {boolean}
 */
export function split(el, key, by, space) {
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
