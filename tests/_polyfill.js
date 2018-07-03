/*
 * insertAdjacentHTML.js
 *   Cross-browser full HTMLElement.insertAdjacentHTML implementation.
 *
 * 2011-10-10
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

Element.prototype.insertAdjacentText = function(position, html) {
  'use strict';

  var ref = this,
    container = ref.ownerDocument.createElementNS('http://www.w3.org/1999/xhtml', '_'),
    ref_parent = ref.parentNode,
    node,
    first_child,
    next_sibling;

  container.innerHTML = html;

  switch (position.toLowerCase()) {
    case 'beforebegin':
      while ((node = container.firstChild)) {
        ref_parent.insertBefore(node, ref);
      }
      break;
    case 'afterbegin':
      first_child = ref.firstChild;
      while ((node = container.lastChild)) {
        first_child = ref.insertBefore(node, first_child);
      }
      break;
    case 'beforeend':
      while ((node = container.firstChild)) {
        ref.appendChild(node);
      }
      break;
    case 'afterend':
      next_sibling = ref.nextSibling;
      while ((node = container.lastChild)) {
        next_sibling = ref_parent.insertBefore(node, next_sibling);
      }
      break;
  }
};
