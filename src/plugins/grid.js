import { createPlugin } from '../plugins';
import { _ } from '../utils/objects';

export var gridPlugin = createPlugin(
    /*by: */ 'grid',
    /*depends: */ ['rows', 'cols']
);
