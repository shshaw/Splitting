import { setProperty } from "../utils/dom";
import { eachDeep } from "./arrays";

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
export function index(element, key, items) {
    items.forEach(function(items, i) {
        eachDeep(items, function(item) {
            setProperty(item, key + "-index", i);
        });
    });

    setProperty(element, key + "-total", items.length);
}
