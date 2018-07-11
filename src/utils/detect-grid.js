export function detectGrid(items, side, threshold) {
    threshold = threshold || 1;
    var c = {};
    items.some(function(w) {
        var val = Math.round(w[side] * threshold) / threshold;
        var list = c[val] || (c[val] = []);
        list.push(w);
    });

    var results = Object.keys(c)
        .map(Number)
        .sort()
        .map(function(key) {
            return c[key];
        });
 
    return results;
}
