import { $ } from '../utils/dom'; 
import { createPlugin } from '../plugins';
import { _ } from '../utils/objects';

export var itemPlugin = createPlugin(
    /*by: */ 'items',
    /*depends: */ _,
    /*key: */ 'item', 
    /*split: */ function(el, options) {
        return $(options.matching || el.children, el)
    }
);
