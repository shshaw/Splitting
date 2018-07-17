import { $, createElement } from '../utils/dom' 
import { index } from '../utils/css-vars'
import { each } from '../utils/arrays'

import { add, resolve } from './plugin-manager'; 
import { CHARS } from '../plugins/chars'; 

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
export function Splitting (opts) {
  opts = opts || {};
  var key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = { el: el };
    var items = resolve(opts.by || el.dataset.splitting || CHARS);

    each(items, function(plugin) {
      if (plugin.split) {
        var pluginBy = plugin.by;
        var key2 = (key ? '-' + key : '') + plugin.key;
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
