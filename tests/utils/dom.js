export function $create(content) {
    var el = document.createElement('div');
    el.innerHTML = content;
    return el.firstElementChild;
}