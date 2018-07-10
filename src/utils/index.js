import { setProperty } from "../utils/dom";
import { eachDeep } from "./arrays";

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param {*} s
 * @param {*} key
 * @param {*} splits
 */
export function index(element, key, splits) {
    splits.forEach(function(items, i) {
        eachDeep(items, function(item) {
            setProperty(item, key + "-index", i);
        });
    });

    setProperty(element, key + "-total", splits.length);
}


