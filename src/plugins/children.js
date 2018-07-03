import { index } from './index';
import { $ } from '../utils/dom';
import { splitElement } from '../utils/split';

/**
 * # Splitting.children
 * Add CSS Var indexes to a DOM element's children. Useful for lists.
 * @param {String|NodeList} parent - Parent element(s) or selector
 * @param {String|NodeList} children - Child element(s) or selector
 * @param {String} key -
 * @example `Splitting.children('ul','li','item'); // Index every unordered list's items with the --item CSS var.`
 */
export function children(parent, options) {
    var children = options.children;
    var key = options.key;
    return splitElement(parent).map(function(s) {
        return index(s, key, $(children, s.el));
    });
}