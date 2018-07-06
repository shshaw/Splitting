import { setProperty } from '../utils/dom'
import { children } from './children'
import { words } from './words'

export function linePlugin (el, options) {
  var childs = options.children
  var key = childs ? options.key || 'item' : 'word'

  var parts = childs ? children(el, { children: childs, key: key }) : words(el)
  var lines = [];
  var lineIndex = -1;
  var lastTop = -1;

  parts.forEach(function (w) {
    var top = w.offsetTop
    if (top > lastTop) {
      lineIndex++
      lastTop = top
    }
    lines[lineIndex] = lines[lineIndex] || []
    lines[lineIndex].push(w)
    setProperty(w, 'line-index', lineIndex)
  });

  setProperty(el, 'line-total', lines.length)
  var result = {
      el: el,
      lines: lines
  }
  result[key + 's'] = parts;
  return result;
}
