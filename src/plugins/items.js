import { $ } from '../utils/dom'; 

/** @type {import('../types').ISplittingPlugin} */
export var itemPlugin = {
    by: 'items',
    key: 'item',
    split: function(el, options) {
        return $(options.matching || el.children, el)
    }
}