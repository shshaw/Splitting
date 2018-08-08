/** an empty value */
export var _ = 0

export function copy(dest, src) {
    for (var k in src) {
        dest[k] = src[k]
    }
    return dest;
}
