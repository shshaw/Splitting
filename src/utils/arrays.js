/**
 * Creates and fills an array with the value provided
 * @template {T}
 * @param {number} len
 * @param {() => T} valueProvider
 * @return {T}
 */
export function Array2D(len) {
    var a = [];
    for (; len--; ) {
        a[len] = []
    }
    return a;
}

export function each(items, fn) {
    items && items.some(fn);
}

export function selectFrom(obj) {
    return function (key) {
        return obj[key];
    }
}