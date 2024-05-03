import { createPlugin } from "../core/plugin-manager";
import { $, createElement, appendChild, setProperty, getData } from "../utils/dom";
import { _ } from '../utils/objects';

export let LAYOUT = "layout";

export let layoutPlugin = createPlugin(
    /* by= */ LAYOUT,
    /* depends= */ _,
    /* key= */ _,
    /* split= */ function(el, opts) {
        // detect and set options
        let rows =  opts.rows = +(opts.rows || getData(el, 'rows') || 1);
        let columns = opts.columns = +(opts.columns || getData(el, 'columns') || 1);

        // Seek out the first <img> if the value is true 
        opts.image = opts.image || getData(el, 'image') || el.currentSrc || el.src;
        if (opts.image) {
            let img = $("img", el)[0];
            opts.image = img && (img.currentSrc || img.src);
        }

        // add optional image to background
        if (opts.image) {
            setProperty(el, "background-image", "url(" + opts.image + ")");
        }

        let totalCells = rows * columns;
        let elements = [];

        let container = createElement(_, "cell-grid");
        while (totalCells--) {
            // Create a span
            let cell = createElement(container, "cell");
            createElement(cell, "cell-inner");
            elements.push(cell);
        }

        // Append elements back into the parent
        appendChild(el, container);

        return elements;
    }
);
