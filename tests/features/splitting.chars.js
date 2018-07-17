import Splitting from '../../src/all';
import { $create } from '../utils/dom';

test('an empty element', function() {
  var $el = document.createElement('div');

  var els = Splitting({ target: $el, by: 'chars' });
  expect(els.length).toBe(1); 
  expect(els[0].words.length).toBe(0);
  expect(els[0].chars.length).toBe(0);
});

test('an element with a single character', function() {
  var el = $create`<div>C</div>`

  var actual = Splitting({ target: el, by: 'chars' });
  expect(actual.length).toBe(1);  
  expect(actual[0].words[0].textContent).toBe('C'); 
});

test('an element with a single word', function() {
  var $el = document.createElement('div');
  $el.innerHTML = 'SPLITTING';

  var els = Splitting({ target: $el, by: 'chars' });
  expect(els.length).toBe(1); 
  expect(els[0].words[0].textContent).toBe('SPLITTING');
});

test('an element with a multiple words', function() {
  var input = $create`<div>with multiple words</div>`;

  var actual = Splitting({ target: input, by: 'chars' });
  expect(actual.length).toBe(1);  
  expect(actual[0].words[0].textContent).toBe('with');
  expect(actual[0].words[1].textContent).toBe('multiple');
  expect(actual[0].words[2].textContent).toBe('words');
});

test('an element with a multiple words with spaces', function() {
  var input = document.createElement('div');
  input.innerHTML = 'with many';

  var actual = Splitting({ target: input, by: 'chars' }); 
  expect(actual.length).toBe(1);  
  expect(actual[0].chars.length).toBe(8);
  expect(actual[0].chars[0].textContent).toBe('w');
  expect(actual[0].chars[1].textContent).toBe('i');
  expect(actual[0].chars[2].textContent).toBe('t');
  expect(actual[0].chars[3].textContent).toBe('h');  
  expect(actual[0].chars[4].textContent).toBe('m');
  expect(actual[0].chars[5].textContent).toBe('a');
  expect(actual[0].chars[6].textContent).toBe('n');
  expect(actual[0].chars[7].textContent).toBe('y');
});

test('an element with a multiple words with spaces', function() {
  var input = document.createElement('div');
  input.textContent = 'with many';

  var actual = Splitting({ target: input, by: 'chars', whitespace: true }); 
  expect(actual.length).toBe(1);
  expect(actual[0].chars[0].textContent).toBe('w');
  expect(actual[0].chars[1].textContent).toBe('i');
  expect(actual[0].chars[2].textContent).toBe('t');
  expect(actual[0].chars[3].textContent).toBe('h');  
  expect(actual[0].chars[4].textContent).toBe(' ');  
  expect(actual[0].chars[5].textContent).toBe('m');
  expect(actual[0].chars[6].textContent).toBe('a');
  expect(actual[0].chars[7].textContent).toBe('n');
  expect(actual[0].chars[8].textContent).toBe('y');
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
