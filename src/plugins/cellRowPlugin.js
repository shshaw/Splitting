export var cellRowPlugin = {
    by: "cell-rows",
    key: 'cell-row',
    depends: ['layout'],
    split: function(el, opts, ctx) {
        var rowCount = opts.rows; 
        return ctx.layout.reduce(function(rows, cell, i) {
            if (i % rowCount == 0) {
                rows.push([]);
            }
            rows[Math.floor(i / rowCount)][i % rowCount] = cell
            return rows;
        }, []);
    }
}

