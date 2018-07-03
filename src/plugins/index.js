import { setCSSVar } from '../utils/dom';

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param {*} s
 * @param {*} key
 * @param {*} splits
 */
export function index(s, key, splits) {
    if (splits) {
        s[key + "s"] = splits;
        setCSSVar(s.el, key + "-total", splits.length);
        splits.some(function(el, i) {
            setCSSVar(el, key + "-index", i);
        });
    }
    return s;
}
