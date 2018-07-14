import { appendChild, createElement } from "./dom";
import { each } from "./arrays"; 

/**
 * # Splitting.split
 * Split an element's textContent into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param splitOn {string}
 * @param includeSpace {boolean}
 * @returns {HTMLElement[]}
 */
export function splitText(el, key, splitOn, includePrevious, preserveWhitespace) {
    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var elements = [];
    var F = document.createDocumentFragment();
    
    if (includePrevious) {
        elements.push(el.previousSibling);
    }

    el.childNodes.forEach(function(next) {
        // Recursively run through child nodes
        if (next && next.childNodes && next.childNodes.length) {
            appendChild(F, next);
            elements.push.apply(elements, splitText(next, key, splitOn, includePrevious, preserveWhitespace));
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
        each(text.split(splitOn), function(splitText, i) {
            if (i && preserveWhitespace) {
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

