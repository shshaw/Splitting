import { createElement } from '../utils/dom';

export var layoutPlugin = {
    by: "layout",
    split: function(el, opts) { 
        // detect and set options
        opts.image = opts.image || (el.dataset && el.dataset.image) || el.currentSrc || el.src;
        opts.rows = opts.rows || (el.dataset && el.dataset.rows) || 1;
        opts.cols =  opts.cols || (el.dataset && el.dataset.cols) || 1;
 
        if (!opts.image) {
            var img = el.querySelector("img");
            opts.image = img && (img.currentSrc || img.src);
        }

        var totalCells = opts.rows * opts.cols;
        var elements = [];
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < totalCells; i++) {
            // Create a span
            var cell = createElement(fragment, 'cell');
            inner = createElement(cell, 'cell-inner');
            elements.push(cell);
        }

        // Append elements back into the parent
        el.appendChild(fragment);

        // add optional image to background
        if (opts.image) {
            el.style.setProperty("background-image", "url(" + opts.image + ")");
        } 

        return elements;
    }
};