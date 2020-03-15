/**
 * Creates and fills an array with the value provided
 * @param {number} len
 * @param {() => T} valueProvider
 * @return {T}
 * @template T
 */
export function Array2D(len) {
    var a = [];
    for (; len--; ) {
        a[len] = []
    }
    return a;
}

/**
 * A for loop wrapper used to reduce js minified size.
 * @param {!Array<T>} items 
 * @param {function(T):void} consumer
 * @template T
 */
export function each(items, consumer) {
    items && items.some(consumer);
}

/**
 * @param {T} obj 
 * @return {function(string):*}
 * @template T
 */
export function selectFrom(obj) {
    return function (key) {
        return obj[key];
    }
}