export var cellColumnPlugin = {
    by: "cell-columns",
    key: 'cell-column',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var columnCount = opts.rows; 
        var result = Array(columnCount).map(function() { return [] });
        ctx.layout.some(function(cell) {
            columns[i % columnCount].push(cell)
        });
        return result;
    }
}
