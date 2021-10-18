import { createContext } from "react";
import type { TouchOutsideCtx } from "../../types/touchOutside.types";

export const TouchOutsideContext = createContext<TouchOutsideCtx>({
    childHandlers: [],
    addChildHandler: () => { },
    removeChildHandler: () => { }
});