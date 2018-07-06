import { index } from '../utils/index';
import { $ } from '../utils/dom'; 

/**
 * # Splitting.children
 * Add CSS Var indexes to a DOM element's children. Useful for lists.
 * @param {String|NodeList} parent - Parent element(s) or selector
 * @param {String|NodeList} children - Child element(s) or selector
 * @param {String} key -
 * @example `Splitting.children('ul','li','item'); // Index every unordered list's items with the --item CSS var.`
 */
export function children(el, options) { 
    return index(el, options.key || 'item', $(options.children || el.children, el));
}

export function childrenPlugin (el, options) { 
    return {
        el: el,
        children: children(el, options)
    }
}