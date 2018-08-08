import Splitting from '../../src/all'
import { $create } from '../utils/dom';

test('creates a 4 x 3 grid correctly', function() { 
  var el = $create`
    <div>
        <img src="http://placehold.it/1/1" />
    </div>
  `

  var actual = Splitting({ 
      target: el, 
      by: 'cells',
      rows: 4,
      columns: 3,
      image: true
    })[0];

  expect(actual.el.style.backgroundImage).toBe('url(http://placehold.it/1/1)');
  
  expect(actual.cells.length).toBe(12);
  expect(actual.cellColumns.length).toBe(3);
  expect(actual.cellRows.length).toBe(4);
  expect(actual.cells[0].classList.contains('cell')).toBeTruthy();
});

test('initializes multiple cell zones', function() { 
  var els = [
    $create`<div data-splitting="cells" data-rows="3">
      <img src="http://placehold.it/1/1" />
    </div>`,
    $create`<div data-splitting="cells" data-columns="4">
      <img src="http://placehold.it/1/1" />
    </div>`
  ]; 

  debugger;

  var actual = Splitting({
    target: els,
    image: true
  });
     
  expect(actual[0].cells.length).toBe(3);
  expect(actual[0].cellRows.length).toBe(3);
  expect(actual[0].cellColumns.length).toBe(1);

  expect(actual[1].cells.length).toBe(4);
  expect(actual[1].cellColumns.length).toBe(4);
  expect(actual[1].cellRows.length).toBe(1);
});