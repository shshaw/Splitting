import Splitting from "../../src/all";

test("an empty element", () => {
  var $el = document.createElement("div");

  var els = Splitting({ target: $el, by: "words" });
  expect(els.length).toBe(1);
  expect(els[0].words.length).toBe(0);
});

test("an element with a single word", () => {
  var $el = document.createElement("div");
  $el.innerHTML = "SPLITTING";

  var els = Splitting({ target: $el, by: "words" });
  expect(els.length).toBe(1);
  expect(els[0].words[0].textContent).toBe("SPLITTING");
});

test("an element with a multiple words", () => {
  var $el = document.createElement("div");
  $el.innerHTML = "with multiple words";

  var els = Splitting({ target: $el, by: "words" });
  expect(els.length).toBe(1);
  expect(els[0].words.length).toBe(3);
  expect(els[0].words[0].textContent).toBe("with");
  expect(els[0].words[1].textContent).toBe("multiple");
  expect(els[0].words[2].textContent).toBe("words");
});

test("mixed content with spaces around words", () => {
  const input = '<div>Are <b>We</b> Good?</div>'
  const actual = Splitting.html({ content: input, by: 'words' });
  // prettier-ignore
  const expected = 
    `<span class=\"words splitting\">`
      + `<div>`
      + `<span class=\"word\" data-word=\"Are\">Are</span>`
      + ' ' // <- space preserved
      + `<b>` 
        + `<span class=\"word\" data-word=\"We\">We</span>`
      + `</b>`
      + ' ' // <- space preserved
      + `<span class=\"word\" data-word=\"Good?\">Good?</span>` 
      + `</div>`
    + `</span>`;

  expect(actual).toBe(expected);
});

test("a nested empty element", () => {
  // todo
});

test("a multi-level nested empty element", () => {
  // todo
});

test("a multi-level nested element", () => {
  // todo
});

test("retriggering on already split element", () => {
  // todo
});
