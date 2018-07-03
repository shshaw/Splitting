// polyfill JSDOM for testing
require('../_polyfill');

var Splitting = require('../../splitting');

test('no arguments', function() {
  var result = Splitting();
  expect(result).toEqual([]);
});

test('passing an element', function() {
  // todo
});

test('passing a nodelist', function() {
  // todo
});

test('passing a class selector', function() {
  var el = document.createElement('div');
  el.classList.add('passing-class-selector');
  document.body.appendChild(el);

  var els = Splitting('.passing-class-selector');
  expect(els.length).toEqual(1);
  expect(els[0].el.tagName).toBe('DIV');

  document.body.removeChild(el);
});

test('passing an attribute selector', function() {
  var el = document.createElement('span');
  el.setAttribute('is-an-attribute', true);
  document.body.appendChild(el);

  var els = Splitting('[is-an-attribute]');
  expect(els.length).toEqual(1);
  expect(els[0].el.tagName).toBe('SPAN');

  document.body.removeChild(el);
});
