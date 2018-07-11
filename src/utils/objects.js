/**
 * @template T extends {}
 * @param {Partial<T>} source 
 * @param {Partial<T>} dest
 * @returns {T}
 */
export function inherit(source, dest) {
    for (var k in source) {
        if (!dest.hasOwnProperty(k)) {
            dest[k] = source[k];
        }
    }
    return dest;
}
