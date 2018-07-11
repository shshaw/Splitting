import { split } from '../utils/split'; 

/** @type {import('../types').ISplittingPlugin} */
export var wordPlugin = {
    by: 'words',
    key: 'word',
    split: function(el, options) {
        return split(el, { 
            key: "word", 
            by: /\s+/, 
            space: true 
        })
    }
}