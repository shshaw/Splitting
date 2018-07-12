import { split, INCLUDE_PREVIOUS } from "../utils/split";

/** @type {import('../types').ISplittingPlugin} */
export var charPlugin = {
    by: "chars",
    key: "char",
    depends: ["words"],
    split: function(el, options, ctx) {
        return ctx.words.reduce(function(val, word, i) { 
            val.push.apply(val, split(word, "char", "", options.whitespace && i ? INCLUDE_PREVIOUS : 0));
            return val;
        }, []);
    }
};
