import { createPlugin } from '../core/plugin-manager';
import { splitText } from "../utils/split-text";
import { each } from "../utils/arrays";
import { WORDS } from './words';

export let CHARS = "chars";

export let charPlugin = createPlugin(
    /* by= */ CHARS,
    /* depends= */ [WORDS],
    /* key= */ "char", 
    /* split= */ function(el, options, ctx) {
        let results = [];

        each(ctx[WORDS], function(word, i) {
            results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
        });

        return results;
    }
);
