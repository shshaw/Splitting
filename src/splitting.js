/** import('./splitting.d.ts'); */

import { $ } from './utils/dom'
import { itemsPlugin } from './plugins/items' 
import { linePlugin } from './plugins/lines'
import { charPlugin } from './plugins/chars'
import { wordPlugin } from './plugins/words'
import { rowPlugin, columnPlugin, gridPlugin } from './plugins/grid';

var plugins = {
  items: itemsPlugin, 
  lines: linePlugin,
  chars: charPlugin,
  words: wordPlugin,
  rows: rowPlugin,
  columns: columnPlugin,
  grid: gridPlugin
}
 

/**
 * # Splitting.html
 * 
 * @param {ISplittingOptions} options
 */
function html (opts) {
  opts = opts || {}
  var el = document.createElement('span')
  el.innerHTML = opts.content;
  opts.target = el
  Splitting(opts)
  return el.outerHTML
}

/**
 * # Splitting
 * 
 * @param {ISplittingOptions} options
 */
function Splitting (opts) {
  opts = opts || {};

  return $(opts.target || '[data-splitting]').map(function(el) { 
    var by = opts.by || el.dataset.splitting || 'chars';
    return plugins[by](
      inherit(opts, { el: el })
    )
  })
}

function inherit(source, dest) {
  for (var k in source) {
    if (!dest.hasOwnProperty(k)) {
      dest[k] = source[k]
    }
  }
  return dest;
}

Splitting.html = html;

export default Splitting
