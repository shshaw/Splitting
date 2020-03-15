import { createPlugin } from '../core/plugin-manager';
import { $ } from '../utils/dom'; 
import { _ } from '../utils/objects';

export var itemPlugin = createPlugin(
    /* by= */ 'items',
    /* depends= */ _,
    /* key= */ 'item', 
    /* split= */ function(el, options) {
        return $(options.matching || el.children, el)
    }
);
