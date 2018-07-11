import { split } from "../utils/split";

/** @type {import('../types').ISplittingPlugin} */
export var charPlugin = {
    by: 'chars',
    key: 'char',
    depends: ['words'],
    split: function(_el, _options, ctx) {
        return ctx.words.reduce(chars, []);
    }
}

function chars(val, word) {
    val.push.apply(val, split(word, 'char', ''))
    return val;
}
