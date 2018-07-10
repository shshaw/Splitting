import { index } from "../utils/index";
import { $ } from "../utils/dom";

function getItems(options) {
    var el = options.el;
    return $(options.matching || el.children, el);
}

export function grid(el, items, key, side, threshold) {
    threshold = threshold || 1;
    var c = {};
    items.some(function(w) {
        var val = Math.round(w[side] * threshold) / threshold;
        var list = c[val] || (c[val] = [])
        list.push(w);
    }); 

    var results = Object.keys(c)
        .map(Number)
        .sort()
        .map(function(key) {
            return c[key];
        }); 

    index(el, key, results);
    return results;
}

export function columnPlugin(options) {
    var columns = grid(options.el, getItems(options), "column", "offsetLeft");
    return {
        el: el,
        columns: columns
    };
}

export function rowPlugin(options) {
    var rows = grid(options.el, getItems(options), "row", "offsetTop");
    return {
        el: el,
        rows: rows
    };
}

export function gridPlugin(options) {
    var el = options.el;
    var items = getItems(options);
    var columns = grid(el, items, "column", "offsetLeft");
    var rows = grid(el, items, "row", "offsetTop");
    return {
        el: el,
        columns: columns,
        rows: rows
    };
}
