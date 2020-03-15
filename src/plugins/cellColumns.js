import { createPlugin } from "../core/plugin-manager";
import { Array2D, each } from "../utils/arrays";
import { LAYOUT } from "./layout";

export var cellColumnPlugin = createPlugin(
    /* by= */ "cellColumns",
    /* depends= */ [LAYOUT],
    /* key= */ "col",
    /* split= */ function(el, opts, ctx) {
        var columnCount = opts.columns;
        var result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell);
        });

        return result;
    }
);
