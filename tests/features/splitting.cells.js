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