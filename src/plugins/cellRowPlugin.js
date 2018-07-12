export var cellRowPlugin = {
    by: "cell-rows",
    key: 'cell-row',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var rowCount = opts.rows; 
        var result = Array(rowCount).map(function() { return [] })
        ctx.layout.some(function(cell, i) {
            results[Math.floor(i / rowCount)].push(cell)
        });
        return results;
    }
}

