/** @type {import('../types').ISplittingPlugin} */
export var cellPlugin = {
    by: "cells",
    key: "cell",
    depends: ['cellRows', 'cellColumns'],
    split: function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx.layout;
    }
};