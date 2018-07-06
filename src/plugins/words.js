import { index } from '../utils/index';
import { split } from '../utils/split'; 

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 * @return {Element[]}
 */
export function words(el) {
    return index(el, "word", split(el, "word", /\s+/, true))
}

export function wordPlugin (el) {
    return {
        el: el,
        words: words(el)
    }
}