import { Splitting } from './core/splitting';
import { add } from './core/plugin-manager';

import { wordPlugin } from "./plugins/words";
import { charPlugin } from "./plugins/chars";
import { linePlugin } from "./plugins/lines";

// install plugins

// word/char plugins
add(wordPlugin)
add(charPlugin) 
add(linePlugin) 

export default Splitting;