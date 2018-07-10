import { index } from '../utils/index';
import { $ } from '../utils/dom'; 

export function itemsPlugin (options) { 
    var el = options.el;
    var items = $(options.matching || el.children, el);
    index(el, options.key || 'item', items);

    return {
        el: options.el,
        items: items
    }
}