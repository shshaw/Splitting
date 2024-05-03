/** an empty value */
export let _ = 0

export function copy(dest, src) {
    for (let k in src) {
        dest[k] = src[k]
    }
    return dest;
}
