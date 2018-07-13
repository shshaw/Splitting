/**
 * Creates and fills an array with the value provided
 * @template {T}
 * @param {number} count
 * @param {() => T} valueProvider
 * @return {T}
 */
export function fill(count, valueProvider) {
    var a = [];
    for (; count--; ) {
        a[count] = valueProvider();
    }
    return a;
}

export function arrayProvider() {
    return [];
}
