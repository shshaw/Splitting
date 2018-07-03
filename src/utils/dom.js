export var root = document;

/**
 * # setCSSVar
 * Apply a CSS var
 * @param {*} el
 * @param {*} varName
 * @param {*} value
 */
export function setCSSVar(el, varName, value) {
    el.style.setProperty("--" + varName, value);
}

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
