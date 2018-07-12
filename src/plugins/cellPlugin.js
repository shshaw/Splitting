export var cellPlugin = {
    by: "cells",
    key: "cell",
    depends: ['cell-rows', 'cell-columns'],
    split: function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx.layout;
    }
};