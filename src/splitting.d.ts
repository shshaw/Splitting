declare global {
    interface Window {
        Splitting: splitting.ISplittingStatic
    }
}

export type Target = string | Node | NodeList | Element[];

export interface ISplittingStatic {
    (options?: ISplittingOptions): SplittingInstance[];
    (target?: Target, by?: string, options?: {}): SplittingInstance[];
    html(options?: ISplittingOptions): string;
    html(target?: Target, by?: string, options?: {}): string;
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