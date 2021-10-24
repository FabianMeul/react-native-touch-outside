import { createContext } from "react";
import type { TouchOutsideCtx } from "../../types/touch-outside.types";

export const TouchOutsideContext = createContext<TouchOutsideCtx>({
    handlers: [],
    addHandler: () => { },
    removeHandler: () => { }
});