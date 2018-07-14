import { detectGrid } from "../utils/detect-grid";
import { $ } from "../utils/dom";

/** @type {import('../types').ISplittingPlugin} */
export var gridPlugin = {
    by: "grid",
    depends: ["rows", "cols"]
};
