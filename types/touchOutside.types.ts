export type ChildHandlerCallback = (id: string) => void

export interface ChildHandler {
    id: string;
    callback: ChildHandlerCallback
}

export interface TouchOutsideCtx {
    childHandlers: ChildHandler[]
    addChildHandler: (id: string, callback: ChildHandlerCallback) => void
    removeChildHandler: (id: string) => void
}