function Splitting(els, callback, splitChars = true) {
  els = els.nodeName
    ? [els]
    : els[0].nodeName ? els : document.querySelectorAll(els);

  return Array.prototype.map.call(els, function(el) {
    if (!el._splitting) {
      var words = el.innerText.split(/\s+/);
      var chars = [];

      el.innerHTML = "";
      el.className += " splitting";

      words = words.map(function(word, i) {
        word = word + (i !== words.length - 1 ? " " : "");
        var wordChars = word.split(""),
          wordEl = document.createElement("i");

        wordEl.className = "word";
        wordEl.setAttribute("data-word", word);
        wordEl.style.setProperty("--word-index", i);
        wordEl.style.setProperty("--word-length", wordChars.length);

        if (splitChars) {
          chars = chars.concat(
            wordChars.map(function(c, i) {
              var char = document.createElement("i");
              char.className = "char";
              char.setAttribute("data-char", c);
              char.innerText = c;
              wordEl.appendChild(char);
              return char;
            })
          );
        }

        el.appendChild(wordEl);

        return wordEl;
      });

      chars.map(function(letter, i) {
        letter.style.setProperty("--char-index", i);
      });

      el.style.setProperty("--total-words", words.length);
      el.style.setProperty("--total-chars", chars.length);

      el._splitting = { el: el, word: words, chars: chars };
    }

    if (callback) {
      callback(el, el._splitting);
    }

    return el._splitting;
  });
}
