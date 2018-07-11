import { $, appendChild } from "./dom";

/**
 * # Splitting.split
 * Split an element's innerText into individual elements
 * @param el {Node} Element to split
 * @param options {{ key: string, by: string, space: boolean }}
 */
export function split(el, options) {
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
