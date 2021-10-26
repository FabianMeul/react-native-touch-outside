export type TouchOutsideCallback = (id: string) => void

export interface TouchOutsideHandler {
    id: string;
    childrenTags: string[];
    callback: TouchOutsideCallback
}

export interface TouchOutsideCtx {
    handlers: TouchOutsideHandler[]
    addHandler: (id: string, childrenTags: string[], callback: TouchOutsideCallback) => void
    removeHandler: (id: string) => void
}