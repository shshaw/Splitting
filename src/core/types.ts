declare global {
    interface Window {
        Splitting: ISplittingStatic
    }
}

export type Target = string | Node | NodeList | Element[];

export interface ISplittingPlugin {
    by: string;
    key?: string;
    depends?: string[]; 
    split?: (el: HTMLElement, options?: ISplittingOptions) => HTMLElement[];
}

export interface ISplittingStatic {
    (options?: ISplittingOptions): SplittingInstance[]; 
    add(options?: ISplittingPlugin): void;
    html(options?: ISplittingOptions): string;
}

export interface SplittingInstance {
    el: Element;
    chars?: SplittingInstance[];
    words?: SplittingInstance[];
    lines?: SplittingInstance[];
    items?: SplittingInstance[];
    cols?: SplittingInstance[][];
    rows?: SplittingInstance[][];
    cells?: SplittingInstance[][];
    cellColumns?: SplittingInstance[][];
    cellRows?: SplittingInstance[][];
} 

export interface ISplittingOptions {
    target?: Target;
    by?: string;
    options?: Record<string, any>
}