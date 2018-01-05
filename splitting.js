/**
 * # Splitting
 * CSS vars for split words & chars!
 * `Splitting` fn handles array-ifying the
 * @param {*} els
 * @param {*} callback
 */

function Splitting(els) {
  els = els.nodeName
    ? [els]
    : els[0].nodeName ? els : document.querySelectorAll(els);
  return Array.prototype.map.call(els, function(el, i) {
    if (!el._splitting) {
      el._splitting = { el: el };
      el.className += " splitting";
    }
    return el._splitting;
  });
}

Splitting.split = function(el, key, splitBy, space) {
  var text = (space ? " " : "") + el.innerText;
  el.innerHTML = "";

  return text.split(splitBy).map(function(split, i) {
    var splitEl = document.createElement("i");
    splitEl.className = key;
    splitEl.setAttribute("data-" + key, split);
    splitEl.innerText = split;
    el.appendChild(splitEl);
    return splitEl;
  });
};

Splitting.index = function(s, key, splits) {
  if (splits) {
    s[key + "s"] = splits;
    s.el.style.setProperty("--total-" + key + "s", splits.length);
    splits.map(function(el, i) {
      el.style.setProperty("--" + key + "-index", i);
    });
  }
  return s;
};

Splitting.words = function(els) {
  return Splitting(els).map(function(s, i) {
    return s.words
      ? s
      : Splitting.index(s, "word", Splitting.split(s.el, "word", /\s+/));
  });
};

Splitting.chars = function(els) {
  return Splitting.words(els).map(function(s) {
    return s.chars
      ? s
      : Splitting.index(
          s,
          "char",
          s.words.reduce(function(val, word, i) {
            return val.concat(Splitting.split(word, "char", "", i));
          }, [])
        );
  });
};
