import { grid } from '../plugins/grid' 
import { words } from './words'

export function linePlugin (options) {
  var el = options.el;
  var wordResults = words(el); 
  var lineResults = grid(el, wordResults, 'line', 'offsetTop');

  return {
    el: el,
    lines: lineResults,
    words: wordResults
  };
}
