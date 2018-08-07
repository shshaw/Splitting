import Splitting from '../../src/all';

test('an empty element', function () {
  var el = document.createElement('div');
  var results = Splitting({ target: el, by: 'items' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(0); 
});

test('an element with one element', function () {
  var el = document.createElement('div');
  var el2 = document.createElement('div');
  el.appendChild(el2);
  var results = Splitting({ target: el, by: 'items' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(1); 
});

test('an element with multiple elements', function () {
  var el = document.createElement('div');
  var el2 = document.createElement('div');
  var el3 = document.createElement('div');
  el.appendChild(el2);
  el.appendChild(el3);
  var results = Splitting({ target: el, by: 'items' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(2); 
});

test('an element with nested elements', function () {
  var el = document.createElement('div');
  var el1 = document.createElement('div');
  el.appendChild(el1);

  var el2 = document.createElement('div');
  el2.classList.add('item')
  el1.appendChild(el2);

  var el3 = document.createElement('div');
  el3.classList.add('item')
  el1.appendChild(el3);

  var results = Splitting({ target: el, by: 'items', matching: '.item' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(2); 
});

test('no child selector', function () {
  // todo
});

test('no key', function () {
  // todo
});
