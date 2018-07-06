import { split } from '../utils/split'
import { words } from './words'
import { index } from '../utils/index';

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
export function charPlugin (el) {
  var wordResults = words(el)
  var charResults = index(
    el,
    'char',
    wordResults.reduce(function (val, word, i) {
      val.push.apply(val, split(word, 'char', ''))
      return val;
    }, [])
  );
  return {
      el: el,
      words: wordResults,
      chars: charResults
  }
}
