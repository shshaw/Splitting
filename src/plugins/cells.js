import { createPlugin } from '../plugins';
import { LAYOUT } from './layout';
import { _ } from '../utils/objects';

export var cellPlugin = createPlugin(
    /*by: */ "cells",
    /*depends: */ _,
    /*key: */ "cell", 
    /*split: */ function(el, opt, ctx) { 
        // re-index the layout as the cells
        return ctx[LAYOUT];
    }
);
