import { split, PRESERVE_SPACE } from '../utils/split'; 

export var WORDS = 'words'

/** @type {import('../types').ISplittingPlugin} */
export var wordPlugin = {
    by: WORDS,
    key: 'word',
    split: function(el, options) {
        return split(el, 'word', /\s+/, PRESERVE_SPACE)
    }
}