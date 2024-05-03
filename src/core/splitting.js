import { $, createElement, getData } from '../utils/dom' 
import { index } from '../utils/css-vars'
import { each } from '../utils/arrays'

import { add, resolve } from './plugin-manager'; 
import { CHARS } from '../plugins/chars';
import { copy } from '../utils/objects'; 

/**
 * # Splitting
 * 
 * @param {import('./types').ISplittingOptions} opts
 * @return {!Array<*>}
 */
export function Splitting (opts) {
  opts = opts || {};
  let key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    let ctx = el['🍌'];  
    if (!opts.force && ctx) {
      return ctx;
    }

    ctx = el['🍌'] = { el: el };
    let by = opts.by || getData(el, 'splitting');
    if (!by || by == 'true') {
      by = CHARS;
    }
    let items = resolve(by);
    let opts2 = copy({}, opts);
    each(items, function(plugin) {
      if (plugin.split) {
        let pluginBy = plugin.by;
        let key2 = (key ? '-' + key : '') + plugin.key;
        let results = plugin.split(el, opts2, ctx);
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
 * @param {import('./types').ISplittingOptions} opts
 */
function html(opts) {
  opts = opts || {}
  let parent = opts.target =  createElement();
  parent.innerHTML = opts.content;
  Splitting(opts)
  return parent.outerHTML
}

Splitting.html = html;
Splitting.add = add;
