import { split, INCLUDE_PREVIOUS } from "../utils/split";
import { each } from "../utils/arrays";
import { _ } from "../utils/objects";
import { WORDS } from './words';
import { createPlugin } from '../plugins';

export var CHARS = "chars";

export var charPlugin = createPlugin(
    /*by: */ CHARS,
    /*depends: */ [WORDS],
    /*key: */ "char", 
    /*split: */ function(el, options, ctx) {
        var results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, split(word, "char", "", options.whitespace && i));
        });

        return results;
    }
);
