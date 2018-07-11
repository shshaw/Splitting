import { detectGrid } from '../utils/detect-grid' 

/** @type {import('../types').ISplittingPlugin} */
export var linePlugin = {
  by: 'lines',
  key: 'line',
  alias: 1,
  depends: ['words'],
  split: function(el, _options, ctx) {
      return detectGrid(ctx.words, 'offsetTop')
  }
}