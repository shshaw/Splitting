import { setCSSVar } from '../utils/dom';
import { children } from './children'; 
import { words } from './words';

/**
 * # Splitting.lines
 * Index each word by line. Does not automatically update on resize, so retrigger `Splitting.lines` again _with debouncing_ when the element's line width may have changed.
 * @param {*} els
 */

function splitLines(els) {
    var lines = [],
        lineIndex = -1,
        lastTop = -1,
        top;

    els.some(function(w) {
        top = w.offsetTop;
        if (top > lastTop) {
            lineIndex++;
            lastTop = top;
        }
        lines[lineIndex] = lines[lineIndex] || [];
        lines[lineIndex].push(w);
        setCSSVar(w, "line-index", lineIndex);
    });

    return lines;
}

export function lines(els, options) { 
    var childs = options.children;
    var key = childs ? options.key || "item" : "word";

    var parts = childs ? children(els, { children: childs, key: key }) : words(els);

    return parts.map(function(s) {
        s.lines = splitLines(s[key + "s"]);
        setCSSVar(s.el, "line-total", s.lines.length);
        return s;
    });
}