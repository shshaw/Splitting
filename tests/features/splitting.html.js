import Splitting from '../../src/all';

test('basic test', function () {
  const content = "<div>Hello World!</div>";
  const actual = Splitting.html({ content });

  // jsdom isn't outputting css custom properties, so this is as correct as we can go
  const expected = 
  `<span class="words chars splitting">` +
    '<div>' +
        '<span class="word" data-word="Hello">' +
            '<span class="char" data-char="H">H</span>' +
            '<span class="char" data-char="e">e</span>' +
            '<span class="char" data-char="l">l</span>' +
            '<span class="char" data-char="l">l</span>' +
            '<span class="char" data-char="o">o</span>' +
        '</span>' +
        '<span class="whitespace"> </span>' +
        '<span class="word" data-word="World!">' +
            '<span class="char" data-char="W">W</span>' +
            '<span class="char" data-char="o">o</span>' +
            '<span class="char" data-char="r">r</span>' +
            '<span class="char" data-char="l">l</span>' +
            '<span class="char" data-char="d">d</span>' +
            '<span class="char" data-char="!">!</span>' +
        '</span>' +
    '</div>' + 
    `</span>`;

  expect(actual).toBe(expected);
});

test('splitting textContent works properly', () => {
    const content = "Hello!";
    const actual = Splitting.html({ content }); 
    
    const expected = `<span class="words chars splitting">`
        + `<span class="word" data-word="Hello!">`
            + `<span class="char" data-char="H">H</span>`
            + `<span class="char" data-char="e">e</span>`
            + `<span class="char" data-char="l">l</span>`
            + `<span class="char" data-char="l">l</span>`
            + `<span class="char" data-char="o">o</span>`
            + `<span class="char" data-char="!">!</span>`
        + `</span>`
    + `</span>`;

    expect(actual).toBe(expected);
});
