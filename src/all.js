import { Splitting } from "./core/splitting";
import { add } from "./core/plugin-manager";

import { wordPlugin } from "./plugins/words";
import { charPlugin } from "./plugins/chars";
import { linePlugin } from "./plugins/lines";
import { itemPlugin } from "./plugins/items";
import { rowPlugin } from "./plugins/rows";
import { columnPlugin } from "./plugins/columns";
import { gridPlugin } from "./plugins/grid";
import { layoutPlugin } from "./plugins/layout";
import { cellRowPlugin } from "./plugins/cellRows";
import { cellColumnPlugin } from "./plugins/cellColumns";
import { cellPlugin } from "./plugins/cells";

// install plugins
// word/char plugins
add(wordPlugin);
add(charPlugin);
add(linePlugin);
// grid plugins
add(itemPlugin);
add(rowPlugin);
add(columnPlugin);
add(gridPlugin);
// cell-layout plugins
add(layoutPlugin);
add(cellRowPlugin);
add(cellColumnPlugin);
add(cellPlugin);

export default Splitting;
