export var root = document;

/**
 * # setProperty
 * Apply a CSS var
 * @param el{HTMLElement} 
 * @param varName {string} 
 * @param value {string|number}  
 */
export function setProperty(el, varName, value) {
    el.style.setProperty("--" + varName, value);
}

/**
 * 
 * @param {Node} el 
 * @param {Node} child 
 */
export function appendChild(el, child) {
  el.appendChild(child);
  return child;
}

/**
 * 
 * @param e {import('../types').Target} 
 * @param parent {HTMLElement}
 * @returns {HTMLElement[]}
 */
export function $(e, parent) {
    return !e || e.length == 0
        ? // null or empty string returns empty array
          []
        : e.nodeName
            ? // a single element is wrapped in an array
              [e]
            : // selector and NodeList are converted to Element[]
              [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e));
}
