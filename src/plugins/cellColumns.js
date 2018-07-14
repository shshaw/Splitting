import { Array2D, each } from '../utils/arrays';
import { LAYOUT } from './layout';

/** @type {import('../types').ISplittingPlugin} */
export var cellColumnPlugin = {
    by: "cellColumns",
    key: 'col',
    depends: [LAYOUT],
    split: function(el, opts, ctx) {
        var columnCount = opts.columns; 
        var result = Array2D(columnCount);

        each(ctx[LAYOUT], function(cell, i) {
            result[i % columnCount].push(cell)
        });
        
        return result;
    }
}
