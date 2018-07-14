import { detectGrid } from "../utils/detect-grid";
import { $ } from "../utils/dom";

/** @type {import('../types').ISplittingPlugin} */
export var columnPlugin = {
    by: "cols",
    key: "col", 
    split: function(el, options, ctx) {
        return detectGrid($(options.matching || el.children, el), "offsetLeft");
    }
};
