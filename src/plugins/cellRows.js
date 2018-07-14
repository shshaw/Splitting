import { Array2D, each } from "../utils/arrays";
import { LAYOUT } from './layout';

/** @type {import('../types').ISplittingPlugin} */
export var cellRowPlugin = {
    by: "cellRows",
    key: "row",
    depends: [LAYOUT],
    split: function(el, opts, ctx) {
        var rowCount = opts.rows;
        var result = Array2D(rowCount);

        each(ctx[LAYOUT], function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell);
        });

        return result;
    }
};
