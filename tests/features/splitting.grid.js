// polyfill JSDOM for testing
import '../_polyfill';
import Splitting from '../../src/splitting'

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
  
  el.innerHTML = `
    <div class="item2">1</div>
    <div class="item2">2</div>
  `;

  document.body.appendChild(el);

  var results = Splitting({ target: el, by: 'grid', matching: '.item2' });

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
