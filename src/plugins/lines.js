import { detectGrid } from '../utils/detect-grid' 
import { WORDS } from './words';
import { createPlugin } from '../plugins';

export var linePlugin = createPlugin(
    /*by: */ 'lines',
    /*depends: */ [WORDS],
    /*key: */ 'line', 
    /*split: */ function(el, options, ctx) {
      return detectGrid(ctx[WORDS], options, 'offsetTop')
    }
);
