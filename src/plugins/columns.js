import { detectGrid } from "../utils/detect-grid";
import { $ } from "../utils/dom";
import { _ } from '../utils/objects';
import { createPlugin } from '../plugins';

export var columnPlugin = createPlugin(
    /*by: */ 'cols',
    /*depends: */ _,
    /*key: */ "col", 
    /*split: */ function(el, options) {
        return detectGrid(el, options, "offsetLeft");
    }
);

