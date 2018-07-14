/** @typedef {import('./splitting.d.ts')} */

import { $, createElement } from './utils/dom' 
import { index } from './utils/css-vars'
import { each } from './utils/arrays'

import { add, resolve } from './plugins';
import { wordPlugin } from './plugins/words'; 
import { CHARS, charPlugin } from './plugins/chars';
import { linePlugin } from './plugins/lines';
import { itemPlugin } from './plugins/items';
import { rowPlugin } from './plugins/rows';
import { columnPlugin } from './plugins/columns';
import { gridPlugin } from './plugins/grid';
import { layoutPlugin } from './plugins/layout';
import { cellColumnPlugin } from './plugins/cellColumns'
import { cellRowPlugin } from './plugins/cellRows' 
import { cellPlugin } from './plugins/cells';

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
function Splitting (opts) {
  opts = opts || {};
  var key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = { el: el };
    var items = resolve(opts.by || el.dataset.splitting || CHARS);

    each(items, function(plugin) {
      if (plugin.split) {
        var pluginBy = plugin.by;
        var key2 = pluginBy + (key ? '-' + key : '');
        var results = plugin.split(el, opts, ctx);
        key2 && index(el, key2, results);
        ctx[pluginBy] = results;
        el.classList.add(pluginBy);
      } 
    });

    el.classList.add('splitting');
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
  var el = opts.target = createElement();
  el.innerHTML = opts.content;
  Splitting(opts)
  return el.outerHTML
}

Splitting.html = html;
Splitting.add = add;

// install plugins
// word/char plugins
add(wordPlugin)
add(charPlugin) 
add(linePlugin)
// grid plugins
add(itemPlugin)
add(rowPlugin)
add(columnPlugin)
add(gridPlugin)
// cell-layout plugins
add(layoutPlugin)
add(cellRowPlugin)
add(cellColumnPlugin)
add(cellPlugin)

export default Splitting
