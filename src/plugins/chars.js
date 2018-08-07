import { createPlugin } from '../core/plugin-manager';
import { splitText } from "../utils/split-text";
import { each } from "../utils/arrays";
import { WORDS } from './words';

export var CHARS = "chars";

export var charPlugin = createPlugin(
    /*by: */ CHARS,
    /*depends: */ [WORDS],
    /*key: */ "char", 
    /*split: */ function(el, options, ctx) {
        var results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
        });

        return results;
    }
);
