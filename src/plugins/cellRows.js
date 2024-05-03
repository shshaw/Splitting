import { createPlugin } from '../core/plugin-manager';
import { Array2D, each } from "../utils/arrays";
import { LAYOUT } from './layout';

export let cellRowPlugin = createPlugin(
    /* by= */ "cellRows",
    /* depends= */ [LAYOUT],
    /* key= */ "row",
    /* split= */ function(el, opts, ctx) {
        let rowCount = opts.rows;
        let result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
);
