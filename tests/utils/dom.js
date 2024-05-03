export function $create(content) {
    let el = document.createElement('div');
    el.innerHTML = content;
    return el.firstElementChild;
}