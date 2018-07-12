import { split, PRESERVE_SPACE } from '../utils/split'; 

/** @type {import('../types').ISplittingPlugin} */
export var wordPlugin = {
    by: 'words',
    key: 'word',
    split: function(el, options) {
        return split(el, 'word', /\s+/, PRESERVE_SPACE)
    }
}