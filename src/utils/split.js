import { appendChild } from "./dom";

export var PRESERVE_SPACE = 1;
export var INCLUDE_PREVIOUS = 2; 

/**
 * # Splitting.split
 * Split an element's textContent into individual elements
 * @param el {Node} Element to split
 * @param key {string}
 * @param splitOn {string}
 * @param includeSpace {boolean}
 * @returns {HTMLElement[]}
 */
export function split(el, key, splitOn, mode) {
    if (splitOn === '') {
        debugger
    }

    // Combine any strange text nodes or empty whitespace.
    el.normalize();

    // Use fragment to prevent unnecessary DOM thrashing.
    var elements = [];
    var F = document.createDocumentFragment();
    
    if (mode === INCLUDE_PREVIOUS) {
        elements.push(el.previousSibling);
    }

    el.childNodes.forEach(function(next) {
        // Recursively run through child nodes
        if (next && next.childNodes && next.childNodes.length) {
            appendChild(F, next);
            elements.push.apply(elements, split(next, key, splitOn, mode));
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
        text.split(splitOn).some(function(splitText, i) {
            if (i && mode === PRESERVE_SPACE) {
                createElement(F, key, ' ');
            }
            elements.push(createElement(F, key, splitText)); 
        });
    });

    // Clear out the existing element
    el.innerHTML = "";
    el.appendChild(F);
    return elements;
}

function createElement(parent, key, text) {
    var el = document.createElement('span');
    el.textContent = text; 
    el.setAttribute("data-split", key);
    el.setAttribute("data-" + key, text);
    parent.appendChild(el);
    return el;
}