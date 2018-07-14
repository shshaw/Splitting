import { $, createElement, appendChild, setProperty } from '../utils/dom'; 

export var LAYOUT = 'layout';

/** @type {import('../types').ISplittingPlugin} */
export var layoutPlugin = {
    by: LAYOUT,
    split: function(el, opts) { 
        // detect and set options
        opts.image = opts.image || (el.dataset.image) || el.currentSrc || el.src;
        var rows = opts.rows = +(opts.rows || el.dataset.rows || 1);
        var columns = opts.columns = +(opts.columns || el.dataset.columns || 1);
 
        // Seek out the first <img> if the value is true
        if (opts.image) {
            var img = $('img', el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }
        
        // add optional image to background
        if (opts.image) {
            setProperty(el, 'background-image', 'url(' + opts.image + ')');
        }

        var totalCells = rows * columns;
        var elements = [];
        
        var container = createElement(0, 'cell-grid');
        while(totalCells--) {
            // Create a span
            var cell = createElement(container, 'cell');
            createElement(cell, 'cell-inner')
            elements.push(cell);
        }

        // Append elements back into the parent
        appendChild(el, container); 

        return elements;
    }
};
