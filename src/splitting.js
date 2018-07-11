/** @typedef {import('./splitting.d.ts')} */

import { $ } from './utils/dom' 
import { index } from './utils/index'
import { add, resolve } from './plugins';
import { wordPlugin } from './plugins/words';
import { charPlugin } from './plugins/chars';
import { linePlugin } from './plugins/lines';
import { itemPlugin } from './plugins/items';
import { rowPlugin } from './plugins/rows';
import { columnPlugin } from './plugins/columns';
import { gridPlugin } from './plugins/grid';

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = { el: el };
    resolve(opts.by || el.dataset.splitting || 'chars').some(function(plugin) {
      if (plugin.split) {
        var results = plugin.split(el, opts, ctx); 
        index(el, (plugin.key || "item") + (opts.key ? '-' + opts.key : ''), results);
        ctx[plugin.by] = results;
      } 
    });
    return ctx;
  })
}

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
Splitting.add = add;

// install plugins
add(wordPlugin)
add(charPlugin)
add(linePlugin)
add(itemPlugin)
add(rowPlugin)
add(columnPlugin)
add(gridPlugin)

export default Splitting
