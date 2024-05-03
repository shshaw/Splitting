import { createPlugin } from '../core/plugin-manager';

export let gridPlugin = createPlugin(
    /* by= */ 'grid',
    /* depends= */ ['rows', 'cols']
);
