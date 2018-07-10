// polyfill JSDOM for testing
require('../_polyfill');

var Splitting = require('../../splitting');

test('an empty element', function () {
  var el = document.createElement('div');
  var results = Splitting({ target: el, by: 'grid' });

  expect(results.length).toBe(1)
  expect(results[0].columns.length).toBe(0); 
  expect(results[0].rows.length).toBe(0); 
});

test('an element with one element', function () {
  var el = document.createElement('div');
  var el2 = document.createElement('div');
  el.appendChild(el2);
  var results = Splitting({ target: el, by: 'grid' });

  expect(results.length).toBe(1)
  expect(results[0].columns.length).toBe(1); 
  expect(results[0].rows.length).toBe(1); 
});

test('an element with multiple elements', function () {
  var el = document.createElement('div');
  var el2 = document.createElement('div');
  el2.innerHTML = '1';
  el.appendChild(el2);

  var el3 = document.createElement('div');
  el3.innerHTML = '2';
  el.appendChild(el3);

  var results = Splitting({ target: el, by: 'grid' });

  expect(results.length).toBe(1)
  expect(results[0].rows.length).toBe(1); 
  expect(results[0].columns.length).toBe(1); 
});

test('an element with nested elements', function () {
  var el = document.createElement('div');
  var el1 = document.createElement('div');
  el.appendChild(el1);

  var el2 = document.createElement('div');
  el2.classList.add('item')
  el2.innerHTML = '1';
  el1.appendChild(el2);

  var el3 = document.createElement('div');
  el3.classList.add('item')
  el3.innerHTML = '2';
  el1.appendChild(el3);

  document.body.appendChild(el);

  var results = Splitting({ target: el, by: 'grid', matching: '.item' });

  expect(results.length).toBe(1)
  expect(results[0].rows.length).toBe(1); 
  expect(results[0].columns.length).toBe(1); 

  document.body.removeChild(el);
});

test('no child selector', function () {
  // todo
});

test('no key', function () {
  // todo
});
