import Splitting from '../../src/all';

test('an empty element', function () {
  let $el = document.createElement('div')

  let els = Splitting({ target: $el, by: 'lines' })
  expect(els.length).toBe(1)
  expect(els[0].lines.length).toBe(0)
  expect(els[0].words.length).toBe(0)
})

test('an element with a single line', function () {
  let $el = document.createElement('div')
  $el.innerHTML = 'SPLITTING'

  let els = Splitting({ target: $el, by: 'lines' })
  expect(els.length).toBe(1)
  expect(els[0].words[0].textContent).toBe('SPLITTING')
})

test('a nested empty element', function () {
  // todo
})

test('a multi-level nested empty element', function () {
  // todo
})

test('a multi-level nested element', function () {
  // todo
})

test('retriggering on already split element', function () {
  // todo
})
