import { fill, arrayProvider } from '../utils/arrays';

/** @type {import('../types').ISplittingPlugin} */
export var cellColumnPlugin = {
    by: "cellColumns",
    key: 'column',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var columnCount = opts.columns; 
        var result = fill(columnCount, arrayProvider);
        ctx.layout.some(function(cell, i) {
            result[i % columnCount].push(cell)
        });
        return result;
    }
}
