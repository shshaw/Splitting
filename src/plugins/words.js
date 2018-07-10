import { index } from '../utils/index';
import { split } from '../utils/split'; 

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 * @return {Element[]}
 */
export function words(el) {
    var wordResults = split(el, "word", /\s+/, true);
    index(el, "word", wordResults)
    return wordResults;
}

export function wordPlugin (options) {
    return {
        el: options.el,
        words: words(options.el)
    }
}