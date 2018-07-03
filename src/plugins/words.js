import { index } from './index';
import { split, splitElement } from '../utils/split'; 

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
export function words(els) {
    return splitElement(els).map(function(s, i) {
        return s.words ? s : index(s, "word", split(s.el, "word", /\s+/, true));
    });
}
