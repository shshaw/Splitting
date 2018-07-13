Element.prototype.insertAdjacentElement = function(position, container) {
  var ref = this;
  var ref_parent = ref.parentNode;
  var node;
  var first_child;
  var next_sibling;

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
}

Element.prototype.insertAdjacentText = function(position, html) { 
  var container =  this.ownerDocument.createElementNS('http://www.w3.org/1999/xhtml', '_');
  container.innerHTML = html;
  this.insertAdjacentElement(position, container);
};

// polyfill css variables
var originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
var originalPropValue = CSSStyleDeclaration.prototype.getPropertyValue;
CSSStyleDeclaration.prototype.setProperty = function(key, value) {
  if (!key.startsWith('--')) {
    return originalSetProperty.call(this, key, value);
  }
  var maps = (this._maps || (this._maps = {}));
  maps[key] = value;
}
CSSStyleDeclaration.prototype.getPropertyValue = function(key) {
  return (this._maps || {})[key] || originalPropValue.call(this, key);
}

// MOCK the layout properties. These are not implemented in JSDOM
Object.defineProperties(HTMLElement.prototype, { 
  offsetLeft: {
    get: function() { return this._offsetLeft|| getComputedStyle(this).marginLeft; },
    set: function(v) { this._offsetLeft = v; }
  },
  offsetTop: {
    get: function() { return this._offsetTop || getComputedStyle(this).marginTop; },
    set: function(v) { this._offsetTop = v; }
  },
  offsetHeight: {
    get: function() { return this._offsetHeight || getComputedStyle(this).offsetHeight; },
    set: function(v) { this._offsetHeight = v; }
  },
  offsetWidth: {
    get: function() { return this._offsetWidth || getComputedStyle(this).offsetWidth; },
    set: function(v) { this._offsetWidth = v; }
  }
});