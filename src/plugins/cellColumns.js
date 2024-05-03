import { createPlugin } from "../core/plugin-manager";
import { Array2D, each } from "../utils/arrays";
import { LAYOUT } from "./layout";

export let cellColumnPlugin = createPlugin(
    /* by= */ "cellColumns",
    /* depends= */ [LAYOUT],
    /* key= */ "col",
    /* split= */ function(el, opts, ctx) {
        let columnCount = opts.columns;
        let result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell);
        });

        return result;
    }
);
