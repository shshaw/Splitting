// polyfill JSDOM for testing
require("../_polyfill");

var Splitting = require("../../splitting");

test("no arguments", function () {
  var result = Splitting();
  expect(result).toEqual([]);
});

test("passing an element", function () {
  var el = document.createElement("div");
  var els = Splitting({ target: el });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);
});

test("passing a nodelist", function () {

  var id = 'test-element';
  var el = document.createElement("div");
  el.setAttribute('id', id);
  document.body.appendChild(el);

  var els = Splitting({ target: document.querySelectorAll("#" + id) });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);

  document.body.removeChild(el);
});

test("passing a class selector", function () {
  var className = "passing-class-selector"
  var el = document.createElement("div");
  el.className = className;
  document.body.appendChild(el);

  var els = Splitting({ target: "." + className });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);

  document.body.removeChild(el);
});

test("passing a non-existant selector", function () {

  var els = Splitting({ target: ".nonexistant-class-selector" });
  expect(els.length).toEqual(0);

});

test("passing an attribute selector", function () {
  var el = document.createElement("span");
  el.setAttribute("data-attribute", true);
  document.body.appendChild(el);

  var els = Splitting({ target: "[data-attribute]" });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);

  document.body.removeChild(el);
});