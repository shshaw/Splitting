import { fill, arrayProvider } from '../utils/arrays';

/** @type {import('../types').ISplittingPlugin} */
export var cellRowPlugin = {
    by: "cellRows",
    key: 'row',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var rowCount = opts.rows; 
        var result = fill(rowCount, arrayProvider);
        ctx.layout.some(function(cell, i, src) {
            result[Math.floor(i / (src.length / rowCount))].push(cell)
        });
        return result;
    }
}

