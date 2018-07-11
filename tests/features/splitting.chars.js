import Splitting from '../../src/splitting'
import { $create } from '../utils/dom';

test('an empty element', function() {
  var $el = document.createElement('div');

  var els = Splitting({ target: $el, by: 'chars' });
  expect(els.length).toBe(1); 
  expect(els[0].words.length).toBe(0);
  expect(els[0].chars.length).toBe(0);
});

test('an element with a single character', function() {
  var $el = document.createElement('div');
  $el.innerHTML = 'C'

  var els = Splitting({ target: $el, by: 'chars' });
  expect(els.length).toBe(1);  
  expect(els[0].words[0].innerText).toBe('C');
});

test('an element with a single word', function() {
  var $el = document.createElement('div');
  $el.innerHTML = 'SPLITTING';

  var els = Splitting({ target: $el, by: 'chars' });
  expect(els.length).toBe(1); 
  expect(els[0].words[0].innerText).toBe('SPLITTING');
});

test('an element with a multiple words', function() {
  var $el = $create(`<div>with multiple words</div>`);

  var els = Splitting({ target: $el, by: 'chars' });
  expect(els.length).toBe(1);  
  expect(els[0].words[0].innerText).toBe('with');
  expect(els[0].words[1].innerText).toBe('multiple');
  expect(els[0].words[2].innerText).toBe('words');
});

test('a nested empty element', function() {
  var $el = document.createElement('div');
  var $el2 = document.createElement('div');
  $el.appendChild($el2)
  $el2.innerHTML = ''

  var results = Splitting({ target: $el, by: 'chars' });

  expect(results.length).toBe(1)
  expect(results[0].words.length).toBe(0);
});

test('a multi-level nested empty element', function() {
  // todo
});

test('a multi-level nested element', function() {
  // todo
});

test('retriggering on already split element', function() {
  // todo
});
