declare global {
    interface Window {
        Splitting: splitting.ISplittingStatic
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
    chars?: ISplittingInstance[];
    words?: ISplittingInstance[];
    lines?: ISplittingInstance[];
    items?: ISplittingInstance[];
    children?: ISplittingInstance[];
} 

export interface ISplittingOptions {
    target?: Target;
    by?: string;
    options?: Record<string, any>
}