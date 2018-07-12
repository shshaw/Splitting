export var cellColumnPlugin = {
    by: "cell-columns",
    key: 'cell-column',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var columnCount = opts.rows; 
        return ctx.layout.reduce(function(columns, cell, i) {
            if (i % columnCount == 0) {
                columns.push([]);
            }
            columns[Math.floor(i / columnCount)][i % columnCount] = cell
            return columns;
        }, []);
    }
}
