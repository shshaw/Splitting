import { createPlugin } from '../core/plugin-manager';
import { Array2D, each } from "../utils/arrays";
import { LAYOUT } from './layout';

export var cellRowPlugin = createPlugin(
    /* by= */ "cellRows",
    /* depends= */ [LAYOUT],
    /* key= */ "row",
    /* split= */ function(el, opts, ctx) {
        var rowCount = opts.rows;
        var result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
);
