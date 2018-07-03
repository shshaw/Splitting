import { children } from './plugins/children';
import { index } from './plugins/index'; 
import { lines } from './plugins/lines';
import { chars } from './plugins/chars';
import { words } from './plugins/words';
import { $ } from './utils/dom';

var plugins = {
  children: children,
  index: index, 
  lines: lines,
  chars: chars,
  words: words
}

/**
 * # Splitting.fromString
 * Splits a string and returns the processed HTML with elements and CSS Vars.
 * @param {String} str - String to split
 * @param {Object} opts - Options
 * @param {String} opts.type - Type of splitting to do, 'words' or 'chars';
 * @param {Boolean} opts.element - Return an element. Defaults to `false` to receive a string
 *  default is chars
 */
function innerHTML(str, opts) {
    opts = typeof opts === 'string' ? { by: opts } : opts;
    var el = document.createElement("span");
    el.innerHTML = str; 
    options.target = el;
    Splitting(options)
    return el.outerHTML;
}

/**
 * # Splitting
 * CSS vars for split words & chars!
 * `Splitting` fn handles array-ifying the
 * @param {*} options
 */
function Splitting(options) {
  options = options || {};
  var by = options.by || 'chars';
  return $(options.target).reduce(function(c, n) {
    var results = plugins[by](n, options);
    if (results){
      c.push.apply(c, results)
    }
    return c;
  }, []) 
}

Splitting.innerHTML = innerHTML;
export default Splitting;
