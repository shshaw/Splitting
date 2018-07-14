import { split, INCLUDE_PREVIOUS } from "../utils/split";
import { each } from "../utils/arrays";
import { WORDS } from './words';

export var CHARS = "chars";

/** @type {import('../types').ISplittingPlugin} */
export var charPlugin = {
    by: CHARS,
    key: "char",
    depends: [WORDS],
    split: function(el, options, ctx) {
        var results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, split(word, "char", "", options.whitespace && i ? INCLUDE_PREVIOUS : 0));
        });

        return results;
    }
};
