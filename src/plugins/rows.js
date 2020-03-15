import { createPlugin } from '../core/plugin-manager';
import { detectGrid } from "../utils/detect-grid"; 
import { _ } from '../utils/objects';

export var rowPlugin = createPlugin(
    /* by= */ 'rows',
    /* depends= */ _,
    /* key= */ 'row', 
    /* split= */ function(el, options) {
        return detectGrid(el, options, "offsetTop");
    }
);
