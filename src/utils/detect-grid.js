import { selectFrom, each } from "./arrays";

export function detectGrid(items, side) {
    var c = {};

    each(items, function(w) {
        var val = Math.round(w[side]);
        c[val] || (c[val] = []).push(w);
    });

    return Object.keys(c).map(Number).sort().map(selectFrom(c));
}
