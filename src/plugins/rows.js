import { detectGrid } from "../utils/detect-grid";
import { $ } from "../utils/dom";

/** @type {import('../types').ISplittingPlugin} */
export var rowPlugin = {
    by: "rows",
    key: "row",
    split: function(el, options, ctx) {
        return detectGrid($(options.matching || el.children, el), "offsetTop");
    }
};
