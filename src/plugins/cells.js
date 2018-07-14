import { createPlugin } from '../core/plugin-manager';
import { _ } from '../utils/objects';
import { LAYOUT } from './layout';

export var cellPlugin = createPlugin(
    /*by: */ "cells",
    /*depends: */ ['cellRows', 'cellColumns'],
    /*key: */ "cell", 
    /*split: */ function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx[LAYOUT];
    }
);
