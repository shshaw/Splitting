import { split } from "../utils/split";

/** @type {import('../types').ISplittingPlugin} */
export var charPlugin = {
    by: 'chars',
    key: 'char',
    depends: ['words'],
    split: function(_el, _options, ctx) {
        return ctx.words.reduce(function(val, word, i) {
            val.push.apply(val, split(word, { key: 'char', by: ''  }))
            return val;
        }, []);
    }
}