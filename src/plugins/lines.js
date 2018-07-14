import { detectGrid } from '../utils/detect-grid' 
import { WORDS } from './words';

/** @type {import('../types').ISplittingPlugin} */
export var linePlugin = {
  by: 'lines',
  key: 'line',
  alias: 1,
  depends: [WORDS],
  split: function(el, _options, ctx) {
      return detectGrid(ctx[WORDS], 'offsetTop')
  }
}