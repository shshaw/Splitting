import { split } from "../utils/split";
import { words } from "./words";
import { index } from "../utils/index";

/**
 * # Splitting.chars
 * Split an element into words and those words into chars.
 * @param {String|Node|NodeList|Array} els - Element(s) or selector to target.
 */
export function charPlugin(options) {
    var el = options.el;
    var wordResults = words(el);
    var charResults = wordResults.reduce(function(val, word, i) {
        val.push.apply(val, split(word, { key: 'char', by: ''  }))
        return val;
    }, []);

    index(el, "char", charResults);
    
    return {
        el: el,
        words: wordResults,
        chars: charResults
    };
}
