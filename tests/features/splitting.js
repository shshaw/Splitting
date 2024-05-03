import Splitting from '../../src/all';

test("no arguments", function () {
  let result = Splitting();
  expect(result).toEqual([]);
});
 

test("passing an element", function () {
  let el = document.createElement("div");
  let els = Splitting({ target: el });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);
});

test("passing a nodelist", function () {

  let id = 'test-element';
  let el = document.createElement("div");
  el.setAttribute('id', id);
  document.body.appendChild(el);

  let els = Splitting({ target: document.querySelectorAll("#" + id) });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);

  document.body.removeChild(el);
});

test("passing a class selector", function () {
  let className = "passing-class-selector"
  let el = document.createElement("div");
  el.className = className;
  document.body.appendChild(el);

  let els = Splitting({ target: "." + className });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);

  document.body.removeChild(el);
});

test("passing a non-existant selector", function () {

  let els = Splitting({ target: ".nonexistant-class-selector" });
  expect(els.length).toEqual(0);

});

test("passing an attribute selector", function () {
  let el = document.createElement("span");
  el.setAttribute("data-attribute", true);
  document.body.appendChild(el);

  let els = Splitting({ target: "[data-attribute]" });
  expect(els.length).toEqual(1);
  expect(els[0].el).toBe(el);

  document.body.removeChild(el);
});

test("returns the same thing if split more than once", function () {
  let el = document.createElement("span"); 
  el.innerHTML = "Hello World";

  let els1 = Splitting({ target: el });
  let els2 = Splitting({ target: el });
  expect(els1[0]).toBe(els2[0]);
});

test("returns a different thing if force split", function () {
  let el = document.createElement("span"); 
  el.innerHTML = "Hello World"; 

  let els1 = Splitting({ target: el, by: 'grid' });
  let els2 = Splitting({ target: el, by: 'grid', force: true });
  expect(els1[0]).not.toBe(els2[0]);
});

test("A plugin of \"true\" is assumed to be the default value", () => {
  let el = document.createElement("span");
  el.setAttribute("data-splitting", "true");
  el.innerHTML = "TEST";

  let els1 = Splitting({ target: el });
  expect(els1[0].chars.length).toBe(4);
});

test("throw a specific error when the plugin is not loaded", () => {
  let el = document.createElement("span");
  el.setAttribute("data-splitting", "not-valid");

  try {
    Splitting({ target: el })
    throw new Error("did not throw");
  } catch (err) {
    expect(err.message).toBe("plugin not loaded: not-valid")
  }
}); 