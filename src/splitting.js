/** @typedef {import('./splitting.d.ts')} */

import { $ } from './utils/dom'
import { inherit } from './utils/objects'
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
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};

  return $(opts.target || '[data-splitting]').map(function(el) { 
    var by = opts.by || el.dataset.splitting || 'chars';
    var options =  inherit(opts, { el: el });
    return plugins[by](options)
  })
}

/**
 * Adds a new plugin to splitting
 * @param opts {import('./types').ISplittingPlugin} 
 */
function add(opts) {
  plugins[opts.name] = opts;
}
Splitting.add = add;

/**
 * # Splitting.html
 * 
 * @param opts {import('./types').ISplittingOptions}
 */
function html(opts) {
  opts = opts || {}
  var el = document.createElement('span')
  el.innerHTML = opts.content;
  opts.target = el
  Splitting(opts)
  return el.outerHTML
}
Splitting.html = html;

export default Splitting
