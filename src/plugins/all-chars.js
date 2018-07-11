import { split } from '../utils/split'; 

/** @type {import('../types').ISplittingPlugin} */
export var allCharPlugin = {
    by: 'all-chars',
    key: 'all-char',
    split: function(el) {
        return split(el, 'word', '')
    }
}