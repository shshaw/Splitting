import { split } from '../utils/split';
import { words } from './words';
import { index } from './index';
/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
export function chars(els) {
    return words(els).map(function(s) {
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
}