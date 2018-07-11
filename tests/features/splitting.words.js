import Splitting from '../../src/splitting';

test("an empty element", function() {
  var $el = document.createElement("div");

  var els = Splitting({ target: $el, by: 'words' });
  expect(els.length).toBe(1);
  expect(els[0].words.length).toBe(0);
});

test("an element with a single word", function() {
  var $el = document.createElement("div");
  $el.innerHTML = "SPLITTING";

  var els = Splitting({ target: $el, by: 'words' });
  expect(els.length).toBe(1);
  expect(els[0].words[0].innerText).toBe("SPLITTING");
});

test("an element with a multiple words", function() {
  var $el = document.createElement("div");
  $el.innerHTML = "with multiple words";

  var els = Splitting({ target: $el, by: 'words' });
  expect(els.length).toBe(1);
  expect(els[0].words.length).toBe(3);
  expect(els[0].words[0].innerText).toBe("with");
  expect(els[0].words[1].innerText).toBe("multiple");
  expect(els[0].words[2].innerText).toBe("words");
});

test("a nested empty element", function() {
  // todo
});

test("a multi-level nested empty element", function() {
  // todo
});

test("a multi-level nested element", function() {
  // todo
});

test("retriggering on already split element", function() {
  // todo
});
