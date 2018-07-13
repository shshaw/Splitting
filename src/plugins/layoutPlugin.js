import { $, createElement } from '../utils/dom';

/** @type {import('../types').ISplittingPlugin} */
export var layoutPlugin = {
    by: "layout",
    split: function(el, opts) { 
        // detect and set options
        opts.image = opts.image || (el.dataset && el.dataset.image) || el.currentSrc || el.src;
        opts.rows = +(opts.rows || (el.dataset && el.dataset.rows) || 1);
        opts.columns = +(opts.columns || (el.dataset && el.dataset.columns) || 1);
 
        // Seek out the first <img> if the value is true
        if (opts.image) {
            var img = $('img', el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }
        
        // add optional image to background
        if (opts.image) {
            el.style.setProperty("background-image", "url(" + opts.image + ")");
        }

        var totalCells = opts.rows * opts.columns;
        var elements = [];
        
        var container = createElement(0, 'cell-grid');
        for (var i = 0; i < totalCells; i++) {
            // Create a span
            var cell = createElement(container, 'cell');
            createElement(cell, 'cell-inner')
            elements.push(cell);
        }

        // Append elements back into the parent
        el.appendChild(container);

        return elements;
    }
};
