import { createPlugin } from '../core/plugin-manager';
import { detectGrid } from "../utils/detect-grid"; 
import { _ } from '../utils/objects';

export var columnPlugin = createPlugin(
    /*by: */ 'cols',
    /*depends: */ _,
    /*key: */ "col", 
    /*split: */ function(el, options) {
        return detectGrid(el, options, "offsetLeft");
    }
);

