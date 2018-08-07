import Splitting from '../../src/all';
import { $create } from '../utils/dom';

test('an empty element', function () {
  var el = document.createElement('div');
  var results = Splitting({ target: el, by: 'grid' });

  expect(results.length).toBe(1)
  expect(results[0].cols.length).toBe(0); 
  expect(results[0].rows.length).toBe(0); 
});

test('an element with one element', function () {
  var el = $create`
    <div><div></div></div>
  `

  var results = Splitting({ target: el, by: 'grid' });

  expect(results.length).toBe(1)
  expect(results[0].cols.length).toBe(1); 
  expect(results[0].rows.length).toBe(1); 
});

test('an element with multiple elements', function () {
  var el = $create`
  <div>
    <div>1</div>
    <div>2</div>
  </div>`

  el.children[1].offsetTop = 10;

  var results = Splitting({ target: el, by: 'grid' });

  expect(results.length).toBe(1)
  expect(results[0].rows.length).toBe(2); 
  expect(results[0].cols.length).toBe(1); 
});

test('an element with nested elements', function () {
  var el = $create`
    <div>
      <div class="item2">1</div>
      <div class="item2">2</div>
    </div>
  `

  el.children[1].offsetTop = 10;

  document.body.appendChild(el);

  var results = Splitting({ target: el, by: 'grid', matching: '.item2' });

  expect(results.length).toBe(1)
  expect(results[0].rows.length).toBe(2); 
  expect(results[0].cols.length).toBe(1); 

  document.body.removeChild(el);
});

test('no child selector', function () {
  // todo
});

test('no key', function () {
  // todo
});
