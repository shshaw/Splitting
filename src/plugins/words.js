import { split, PRESERVE_SPACE } from '../utils/split'; 
import { _ } from '../utils/objects';
import { createPlugin } from '../plugins';

export var WORDS = 'words'

export var wordPlugin = createPlugin(
    /*by: */ WORDS,
    /*depends: */ _,
    /*key: */ 'word', 
    /*split: */ function(el) {
        return split(el, 'word', /\s+/, 0, 1)
    }
);
