import Splitting from '../../src/all';

test('an empty element', function () {
  let el = document.createElement('div');
  let results = Splitting({ target: el, by: 'items' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(0); 
});

test('an element with one element', function () {
  let el = document.createElement('div');
  let el2 = document.createElement('div');
  el.appendChild(el2);
  let results = Splitting({ target: el, by: 'items' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(1); 
});

test('an element with multiple elements', function () {
  let el = document.createElement('div');
  let el2 = document.createElement('div');
  let el3 = document.createElement('div');
  el.appendChild(el2);
  el.appendChild(el3);
  let results = Splitting({ target: el, by: 'items' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(2); 
});

test('an element with nested elements', function () {
  let el = document.createElement('div');
  let el1 = document.createElement('div');
  el.appendChild(el1);

  let el2 = document.createElement('div');
  el2.classList.add('item')
  el1.appendChild(el2);

  let el3 = document.createElement('div');
  el3.classList.add('item')
  el1.appendChild(el3);

  let results = Splitting({ target: el, by: 'items', matching: '.item' });

  expect(results.length).toBe(1)
  expect(results[0].items.length).toBe(2); 
});

test('no child selector', function () {
  // todo
});

test('no key', function () {
  // todo
});
