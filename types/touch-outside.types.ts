export type TouchOutsideCallback = (id: string) => void

export interface TouchOutsideHandler {
    id: string;
    callback: TouchOutsideCallback
}

export interface TouchOutsideCtx {
    handlers: TouchOutsideHandler[]
    addHandler: (id: string, callback: TouchOutsideCallback) => void
    removeHandler: (id: string) => void
}