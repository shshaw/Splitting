import { createPlugin } from '../core/plugin-manager';
import { detectGrid } from '../utils/detect-grid'
import { WORDS } from './words';

export let linePlugin = createPlugin(
    /* by= */ 'lines',
    /* depends= */ [WORDS],
    /* key= */ 'line',
    /* split= */ function(el, options, ctx) {
      return detectGrid(el, { matching: ctx[WORDS] }, 'offsetTop')
    }
);
