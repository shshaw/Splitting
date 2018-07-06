/** import('./splitting.d.ts'); */

import { childrenPlugin } from './plugins/children' 
import { linePlugin } from './plugins/lines'
import { charPlugin } from './plugins/chars'
import { wordPlugin } from './plugins/words'
import { $ } from './utils/dom'

var plugins = {
  children: childrenPlugin, 
  lines: linePlugin,
  chars: charPlugin,
  words: wordPlugin
}

/**
 * Normalizes options between the three parameter methods and the single object mode.
 * @returns {ISplittingStatic}
 */
function getOptions (args) {
  // todo: simplify
  var firstArg = args[0]
  var isOptions = firstArg != null 
    && typeof firstArg == 'object'
    && !(firstArg instanceof Node)
    && !firstArg.length
  return {
    target: (isOptions ? firstArg.target : firstArg) || '[data-splitting]',
    by: (isOptions ? firstArg.by : args[1]) || 'chars',
    options: (isOptions ? firstArg.options : args[2]) || {}
  }
}

function splittingInner (opts) {
  return $(opts.target).map(function (n) {
    return plugins[opts.by](n, opts)
  })
}

/**
 * # Splitting.html
 * 
 * @param {ISplittingOptions} options
 */
function html (options) {
  var el = document.createElement('span')
  el.innerHTML = str
  opts.target = el

  splittingInner(getOptions(arguments))
  return el.outerHTML
}

/**
 * # Splitting
 * 
 * @param {ISplittingOptions} options
 */
function Splitting (options) {
  return splittingInner(getOptions(arguments))
}

Splitting.html = html;

export default Splitting
