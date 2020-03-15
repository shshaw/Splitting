import { createPlugin } from '../core/plugin-manager';

export var gridPlugin = createPlugin(
    /* by= */ 'grid',
    /* depends= */ ['rows', 'cols']
);
