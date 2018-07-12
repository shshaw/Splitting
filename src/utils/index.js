import { setProperty } from "./dom"; 

/**
 * # Splitting.index
 * Index split elements and add them to a Splitting instance.
 *
 * @param element {HTMLElement}
 * @param key {string}
 * @param items {HTMLElement[] | HTMLElement[][]}
 */
export function index(element, key, items) { 
    items.some(function(items, i) {
        eachDeep(items, function(item) {
            setProperty(item, key + "-index", i);
        });
    });

    setProperty(element, key + "-total", items.length);
}

function eachDeep(items, fn) {
    if (Array.isArray(items)) {
        items.some(function(item) {
            eachDeep(item, fn);
        });
    } else {
        fn(items);
    }
}